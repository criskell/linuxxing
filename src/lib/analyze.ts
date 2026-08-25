import type { Locale } from '../i18n/languages';
import { t } from '../i18n/ui';
import { COMMANDS, type CommandDef, type ValueKind } from './commands';
import { CONTROL_KEYWORDS, OCTAL_DIGIT_MEANINGS, TEST_FLAGS } from './shell';

export type StepType =
  | 'command'
  | 'subcommand'
  | 'flag-long'
  | 'flag-short'
  | 'arg'
  | 'unknown'
  | 'comment'
  | 'control'
  | 'test'
  | 'operator'
  | 'redirect';

export interface Step {
  token: string;
  type: StepType;
  desc: string;
}

const CONDITIONAL_KEYWORDS = new Set(['if', 'elif', 'while', 'until']);

export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let quote: string | null = null;

  for (const ch of input) {
    if (quote) {
      if (ch === quote) {
        quote = null;
      } else {
        current += ch;
      }
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === ' ') {
      if (current.length) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += ch;
    }
  }
  if (current.length) tokens.push(current);
  return tokens;
}

function redirectDescription(token: string, locale: Locale): string | null {
  let m = token.match(/^(\d+)?>&(\d+)$/);
  if (m) return t(locale, 'redirect.dup')(m[1] ?? '1', m[2]);

  m = token.match(/^(\d*)(>>)(.*)$/);
  if (m) return t(locale, 'redirect.append')(m[1] || '1', m[3] || '');

  m = token.match(/^(\d*)(>)(.*)$/);
  if (m) return t(locale, 'redirect.overwrite')(m[1] || '1', m[3] || '');

  m = token.match(/^(\d*)(<)(.*)$/);
  if (m) return t(locale, 'redirect.input')(m[3] || '');

  return null;
}

function matchFstabLine(token: string): [string, string, string, string, string, string] | null {
  const parts = token.trim().split(/\s+/);
  if (parts.length !== 6) return null;
  if (!/^\d+$/.test(parts[4]) || !/^\d+$/.test(parts[5])) return null;
  return parts as [string, string, string, string, string, string];
}

function decodeOctalMode(mode: string, locale: Locale): string {
  const digits = mode.length === 4 ? mode.slice(1) : mode;
  const [owner, group, other] = digits.split('').map((d) => OCTAL_DIGIT_MEANINGS[d]?.[locale] ?? d);
  return t(locale, 'special.octalModeDecode')(owner, group, other);
}

export function analyze(tokens: string[], locale: Locale): Step[] {
  const steps: Step[] = [];
  if (!tokens.length) return steps;

  let startIndex = 0;
  if (tokens[0] === 'sudo') {
    steps.push({
      token: tokens[0],
      type: 'command',
      desc: COMMANDS.sudo.desc[locale],
    });
    startIndex = 1;
  }

  const baseCmd = tokens[startIndex];
  const kb = COMMANDS[baseCmd];

  steps.push({
    token: tokens[startIndex],
    type: 'command',
    desc: kb ? kb.desc[locale] : t(locale, 'fallback.command')(tokens[startIndex]),
  });

  let subcommandClaimed = false;
  let pendingValueFlag: { flag: string; kind: ValueKind } | null = null;

  for (let i = startIndex + 1; i < tokens.length; i++) {
    const tok = tokens[i];
    const valueFlag = pendingValueFlag;
    pendingValueFlag = null;

    const redirect = redirectDescription(tok, locale);
    if (redirect) {
      steps.push({ token: tok, type: 'redirect', desc: redirect });
      continue;
    }

    if (tok.startsWith('--')) {
      const eqIdx = tok.indexOf('=');
      const flagName = eqIdx === -1 ? tok : tok.slice(0, eqIdx);
      const flagValue = eqIdx === -1 ? null : tok.slice(eqIdx + 1);
      const known = kb?.flags[flagName]?.[locale];

      let desc = known ?? t(locale, 'fallback.flagLong')(flagName);
      if (flagValue !== null) {
        desc += t(locale, 'fallback.flagLongValue')(flagValue);
      } else {
        const kind = kb?.valueFlags?.[flagName];
        if (kind) pendingValueFlag = { flag: flagName, kind };
      }

      steps.push({ token: tok, type: 'flag-long', desc });
      continue;
    }

    if (tok.startsWith('-') && tok.length > 1 && tok !== '-') {
      const body = tok.slice(1);
      const known = kb?.flags[tok]?.[locale];

      if (known) {
        const kind = kb?.valueFlags?.[tok];
        if (kind) pendingValueFlag = { flag: tok, kind };
        steps.push({ token: tok, type: 'flag-short', desc: known });
        continue;
      }

      if (body.length > 1 && /^[a-zA-Z]+$/.test(body)) {
        const letters = body.split('');
        const explained = letters
          .map((l) => {
            const d = kb?.flags['-' + l]?.[locale];
            return d ? `-${l}: ${d}` : null;
          })
          .filter(Boolean) as string[];

        let desc = t(locale, 'fallback.flagShortCombinedKnown')(letters.map((l) => '-' + l).join(', '));
        desc += explained.length ? ' ' + explained.join(' ') : t(locale, 'fallback.flagShortCombinedUnknown');
        steps.push({ token: tok, type: 'flag-short', desc });
        continue;
      }

      steps.push({ token: tok, type: 'flag-short', desc: t(locale, 'fallback.flagShort')(tok) });
      continue;
    }

    if (tok === '-') {
      const known = kb?.flags['-']?.[locale];
      steps.push({ token: tok, type: known ? 'flag-short' : 'arg', desc: known ?? t(locale, 'fallback.dash') });
      continue;
    }

    if (!subcommandClaimed && kb && kb.subcommands[tok]) {
      steps.push({ token: tok, type: 'subcommand', desc: kb.subcommands[tok][locale] });
      subcommandClaimed = true;
      continue;
    }

    if (!subcommandClaimed && kb && Object.keys(kb.subcommands).length) {
      subcommandClaimed = true;
      const examples = Object.keys(kb.subcommands).slice(0, 3).join(', ');
      steps.push({ token: tok, type: 'unknown', desc: t(locale, 'fallback.subcommandExpected')(baseCmd, tok, examples) });
      continue;
    }

    if (baseCmd === 'chmod' && /^[0-7]{3,4}$/.test(tok)) {
      steps.push({ token: tok, type: 'arg', desc: `${t(locale, 'special.chmodOctal')} ${decodeOctalMode(tok, locale)}` });
      continue;
    }

    const fstabFields = matchFstabLine(tok);
    if (fstabFields) {
      const [device, mount, fstype, opts, dump, pass] = fstabFields;
      steps.push({ token: tok, type: 'arg', desc: t(locale, 'special.fstabLine')(device, mount, fstype, opts, dump, pass) });
      continue;
    }

    if (valueFlag) {
      const flagDesc = kb?.flags[valueFlag.flag]?.[locale] ?? '';
      let desc = `${flagDesc} ${t(locale, 'special.flagValue')(tok)}`;
      if (valueFlag.kind === 'octal-mode' && /^[0-7]{3,4}$/.test(tok)) {
        desc += ` ${decodeOctalMode(tok, locale)}`;
      }
      steps.push({ token: tok, type: 'arg', desc });
      continue;
    }

    steps.push({ token: tok, type: 'arg', desc: t(locale, 'fallback.arg') });
  }

  return steps;
}

function stripComment(line: string): { code: string; comment: string | null } {
  let quote: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === '#' && (i === 0 || /\s/.test(line[i - 1]))) {
      return { code: line.slice(0, i).trimEnd(), comment: line.slice(i).trim() };
    }
  }
  return { code: line.trimEnd(), comment: null };
}

interface Segment {
  operator: string | null;
  text: string;
}

function splitTopLevel(code: string): Segment[] {
  const parts: Segment[] = [];
  let current = '';
  let quote: string | null = null;
  let currentOperator: string | null = null;

  const flush = () => {
    const text = current.trim();
    if (text.length) parts.push({ operator: currentOperator, text });
    current = '';
  };

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (quote) {
      current += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      current += ch;
      continue;
    }
    if (ch === '&' && code[i + 1] === '&') {
      flush();
      currentOperator = '&&';
      i++;
      continue;
    }
    if (ch === '|' && code[i + 1] === '|') {
      flush();
      currentOperator = '||';
      i++;
      continue;
    }
    if (ch === '|') {
      flush();
      currentOperator = '|';
      continue;
    }
    if (ch === ';') {
      flush();
      currentOperator = ';';
      continue;
    }
    current += ch;
  }
  flush();
  return parts;
}

function operatorDesc(op: string, locale: Locale): string {
  switch (op) {
    case '&&':
      return t(locale, 'operator.and');
    case '||':
      return t(locale, 'operator.or');
    case ';':
      return t(locale, 'operator.seq');
    case '|':
      return t(locale, 'operator.pipe');
    default:
      return '';
  }
}

function buildTestStep(expr: string, locale: Locale): Step {
  const inner = expr.replace(/^\[\[?/, '').replace(/\]\]?$/, '').trim();
  const innerTokens = tokenize(inner);
  const matched = innerTokens
    .map((tok) => {
      const desc = TEST_FLAGS[tok]?.[locale];
      return desc ? `${tok}: ${desc}` : null;
    })
    .filter(Boolean) as string[];

  const desc = matched.length ? matched.join(' ') : t(locale, 'fallback.test');
  return { token: expr, type: 'test', desc };
}

function isBracketTest(text: string): boolean {
  return (text.startsWith('[[') && text.endsWith(']]')) || (text.startsWith('[') && text.endsWith(']'));
}

function processSegment(text: string, locale: Locale, steps: Step[]): void {
  const trimmed = text.trim();
  if (!trimmed) return;

  if (CONTROL_KEYWORDS[trimmed]) {
    steps.push({ token: trimmed, type: 'control', desc: CONTROL_KEYWORDS[trimmed][locale] });
    return;
  }

  const firstSpace = trimmed.indexOf(' ');
  const firstWord = firstSpace === -1 ? trimmed : trimmed.slice(0, firstSpace);
  if (CONDITIONAL_KEYWORDS.has(firstWord) && CONTROL_KEYWORDS[firstWord]) {
    steps.push({ token: firstWord, type: 'control', desc: CONTROL_KEYWORDS[firstWord][locale] });
    const rest = firstSpace === -1 ? '' : trimmed.slice(firstSpace + 1).trim();
    if (rest) processSegment(rest, locale, steps);
    return;
  }

  if (isBracketTest(trimmed)) {
    steps.push(buildTestStep(trimmed, locale));
    return;
  }

  const tokens = tokenize(trimmed);
  if (!tokens.length) return;
  steps.push(...analyze(tokens, locale));
}

function processLineCode(code: string, locale: Locale, steps: Step[]): void {
  const segments = splitTopLevel(code);
  segments.forEach((seg) => {
    if (seg.operator) {
      steps.push({ token: seg.operator, type: 'operator', desc: operatorDesc(seg.operator, locale) });
    }
    processSegment(seg.text, locale, steps);
  });
}

export function analyzeScript(input: string, locale: Locale): Step[] {
  const steps: Step[] = [];
  const lines = input.split('\n');

  for (const rawLine of lines) {
    if (!rawLine.trim()) continue;

    const { code, comment } = stripComment(rawLine);
    const trimmedCode = code.trim();

    if (!trimmedCode) {
      if (comment) steps.push({ token: comment, type: 'comment', desc: t(locale, 'comment.desc') });
      continue;
    }

    processLineCode(trimmedCode, locale, steps);

    if (comment) {
      steps.push({ token: comment, type: 'comment', desc: t(locale, 'comment.desc') });
    }
  }

  return steps;
}

export interface HighlightSpan {
  text: string;
  type: StepType | null;
}

function isRedirectToken(token: string): boolean {
  return (
    /^(\d+)?>&(\d+)$/.test(token) ||
    /^(\d*)(>>)(.*)$/.test(token) ||
    /^(\d*)(>)(.*)$/.test(token) ||
    /^(\d*)(<)(.*)$/.test(token)
  );
}

function stripQuotesForClassification(word: string): string {
  let out = '';
  let quote: string | null = null;
  for (const ch of word) {
    if (quote) {
      if (ch === quote) quote = null;
      else out += ch;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else {
      out += ch;
    }
  }
  return out;
}

interface RawChunk {
  text: string;
  kind: 'ws' | 'op' | 'word';
}

function scanChunks(code: string): RawChunk[] {
  const chunks: RawChunk[] = [];
  let current = '';
  let currentKind: 'ws' | 'word' | null = null;
  let quote: string | null = null;

  const flush = () => {
    if (current) chunks.push({ text: current, kind: currentKind! });
    current = '';
    currentKind = null;
  };

  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (quote) {
      current += ch;
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      if (currentKind !== 'word') {
        flush();
        currentKind = 'word';
      }
      quote = ch;
      current += ch;
      continue;
    }
    if (ch === '&' && code[i + 1] === '&') {
      flush();
      chunks.push({ text: '&&', kind: 'op' });
      i++;
      continue;
    }
    if (ch === '|' && code[i + 1] === '|') {
      flush();
      chunks.push({ text: '||', kind: 'op' });
      i++;
      continue;
    }
    if (ch === '|') {
      flush();
      chunks.push({ text: '|', kind: 'op' });
      continue;
    }
    if (ch === ';') {
      flush();
      chunks.push({ text: ';', kind: 'op' });
      continue;
    }
    if (/\s/.test(ch)) {
      if (currentKind !== 'ws') {
        flush();
        currentKind = 'ws';
      }
      current += ch;
      continue;
    }
    if (currentKind !== 'word') {
      flush();
      currentKind = 'word';
    }
    current += ch;
  }
  flush();
  return chunks;
}

function highlightSegment(chunks: RawChunk[], spans: HighlightSpan[]): void {
  const wordIdxs: number[] = [];
  chunks.forEach((c, i) => {
    if (c.kind === 'word') wordIdxs.push(i);
  });

  if (wordIdxs.length === 0) {
    chunks.forEach((c) => spans.push({ text: c.text, type: null }));
    return;
  }

  const logical = (i: number) => stripQuotesForClassification(chunks[i].text);
  const fullTrimmed = chunks
    .map((c) => c.text)
    .join('')
    .trim();

  if (CONTROL_KEYWORDS[fullTrimmed]) {
    chunks.forEach((c) => spans.push({ text: c.text, type: c.kind === 'word' ? 'control' : null }));
    return;
  }

  const firstWordChunkIdx = wordIdxs[0];
  const firstWordLogical = logical(firstWordChunkIdx);
  if (CONDITIONAL_KEYWORDS.has(firstWordLogical) && CONTROL_KEYWORDS[firstWordLogical]) {
    for (let i = 0; i <= firstWordChunkIdx; i++) {
      spans.push({ text: chunks[i].text, type: chunks[i].kind === 'word' ? 'control' : null });
    }
    highlightSegment(chunks.slice(firstWordChunkIdx + 1), spans);
    return;
  }

  if (isBracketTest(fullTrimmed)) {
    chunks.forEach((c) => spans.push({ text: c.text, type: 'test' }));
    return;
  }

  let sawCommand = false;
  let afterSudo = false;
  let subcommandClaimed = false;
  let kb: CommandDef | undefined;

  chunks.forEach((c) => {
    if (c.kind !== 'word') {
      spans.push({ text: c.text, type: null });
      return;
    }
    const value = stripQuotesForClassification(c.text);

    if (!sawCommand) {
      sawCommand = true;
      spans.push({ text: c.text, type: 'command' });
      if (value === 'sudo') {
        afterSudo = true;
      } else {
        kb = COMMANDS[value];
      }
      return;
    }

    if (afterSudo) {
      afterSudo = false;
      kb = COMMANDS[value];
      spans.push({ text: c.text, type: 'command' });
      return;
    }

    if (isRedirectToken(value)) {
      spans.push({ text: c.text, type: 'redirect' });
      return;
    }

    if (value.startsWith('--')) {
      spans.push({ text: c.text, type: 'flag-long' });
      return;
    }

    if (value.startsWith('-') && value.length > 1) {
      spans.push({ text: c.text, type: 'flag-short' });
      return;
    }

    if (value === '-') {
      const known = kb?.flags['-'];
      spans.push({ text: c.text, type: known ? 'flag-short' : 'arg' });
      return;
    }

    if (!subcommandClaimed && kb && kb.subcommands[value]) {
      subcommandClaimed = true;
      spans.push({ text: c.text, type: 'subcommand' });
      return;
    }

    if (!subcommandClaimed && kb && Object.keys(kb.subcommands).length) {
      subcommandClaimed = true;
      spans.push({ text: c.text, type: 'unknown' });
      return;
    }

    spans.push({ text: c.text, type: 'arg' });
  });
}

function highlightCode(code: string, spans: HighlightSpan[]): void {
  const chunks = scanChunks(code);
  let segStart = 0;

  chunks.forEach((chunk, i) => {
    if (chunk.kind === 'op') {
      if (i > segStart) highlightSegment(chunks.slice(segStart, i), spans);
      spans.push({ text: chunk.text, type: 'operator' });
      segStart = i + 1;
    }
  });

  if (segStart < chunks.length) highlightSegment(chunks.slice(segStart), spans);
}

function highlightLine(line: string, spans: HighlightSpan[]): void {
  let quote: string | null = null;
  let commentStart = -1;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quote) {
      if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === '#' && (i === 0 || /\s/.test(line[i - 1]))) {
      commentStart = i;
      break;
    }
  }

  const code = commentStart === -1 ? line : line.slice(0, commentStart);
  const comment = commentStart === -1 ? '' : line.slice(commentStart);

  highlightCode(code, spans);
  if (comment) spans.push({ text: comment, type: 'comment' });
}

export function highlightScript(input: string): HighlightSpan[] {
  const spans: HighlightSpan[] = [];
  const lines = input.split('\n');

  lines.forEach((line, idx) => {
    highlightLine(line, spans);
    if (idx < lines.length - 1) spans.push({ text: '\n', type: null });
  });

  return spans;
}
