import type { Locale } from '../i18n/languages';
import { t } from '../i18n/ui';
import { COMMANDS } from './commands/registry';
import type { CommandDef } from './commands/types';
import { CONTROL_KEYWORDS, OCTAL_DIGIT_MEANINGS, TEST_FLAGS } from './shell';
import type { StepType } from './command-parsing/step-type';
import { tokenize } from './command-parsing/tokenize';
import { stripQuotesForClassification } from './command-parsing/strip-quotes';
import { parseRedirect } from './command-parsing/redirects';
import { findCommentStart } from './command-parsing/comments';
import { type RawChunk, scanChunks } from './command-parsing/chunks';
import { splitTopLevel } from './command-parsing/segments';
import { dispatchSegment } from './command-parsing/segment-dispatch';
import {
  type CommandTokenState,
  createCommandTokenState,
  classifyCommandToken,
} from './command-parsing/token-classification';
import { extractAssignment, extractCommandSubstitution, extractVariableExpansion } from './command-parsing/expansions';

export type { StepType } from './command-parsing/step-type';

export interface Step {
  token: string;
  type: StepType;
  desc: string;
}

function redirectDescription(token: string, locale: Locale): string | null {
  const info = parseRedirect(token);
  if (!info) return null;

  switch (info.kind) {
    case 'dup':
      return t(locale, 'redirect.dup')(info.fileDescriptor, info.target);
    case 'append':
      return t(locale, 'redirect.append')(info.fileDescriptor, info.target);
    case 'overwrite':
      return t(locale, 'redirect.overwrite')(info.fileDescriptor, info.target);
    case 'input':
      return t(locale, 'redirect.input')(info.target);
  }
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

function describeFlagLong(
  flagName: string,
  flagValue: string | null,
  knowledgeBase: CommandDef | undefined,
  locale: Locale,
): string {
  const known = knowledgeBase?.flags[flagName]?.[locale];
  let desc = known ?? t(locale, 'fallback.flagLong')(flagName);
  if (flagValue !== null) desc += t(locale, 'fallback.flagLongValue')(flagValue);
  return desc;
}

function describeFlagShort(
  flagName: string,
  combinedLetters: string[] | null,
  knowledgeBase: CommandDef | undefined,
  locale: Locale,
): string {
  if (combinedLetters) {
    const explained = combinedLetters
      .map((letter) => {
        const d = knowledgeBase?.flags['-' + letter]?.[locale];
        return d ? `-${letter}: ${d}` : null;
      })
      .filter(Boolean) as string[];

    let desc = t(locale, 'fallback.flagShortCombinedKnown')(combinedLetters.map((l) => '-' + l).join(', '));
    desc += explained.length ? ' ' + explained.join(' ') : t(locale, 'fallback.flagShortCombinedUnknown');
    return desc;
  }

  const known = knowledgeBase?.flags[flagName]?.[locale];
  return known ?? t(locale, 'fallback.flagShort')(flagName);
}

function describeArgToken(
  token: string,
  baseCmd: string,
  knowledgeBase: CommandDef | undefined,
  consumedValueFlag: { flag: string; kind: 'generic' | 'octal-mode' } | null,
  keyValueMatch: [string, string] | null,
  isRedirectTarget: boolean,
  locale: Locale,
): string {
  if (baseCmd === 'chmod' && /^[0-7]{3,4}$/.test(token)) {
    return `${t(locale, 'special.chmodOctal')} ${decodeOctalMode(token, locale)}`;
  }

  const fstabFields = matchFstabLine(token);
  if (fstabFields) {
    const [device, mount, fstype, opts, dump, pass] = fstabFields;
    return t(locale, 'special.fstabLine')(device, mount, fstype, opts, dump, pass);
  }

  if (consumedValueFlag) {
    const flagDesc = knowledgeBase?.flags[consumedValueFlag.flag]?.[locale] ?? '';
    let desc = `${flagDesc} ${t(locale, 'special.flagValue')(token)}`;
    if (consumedValueFlag.kind === 'octal-mode' && /^[0-7]{3,4}$/.test(token)) {
      desc += ` ${decodeOctalMode(token, locale)}`;
    }
    return desc;
  }

  const keyValueDesc = keyValueMatch ? knowledgeBase?.flags[keyValueMatch[0]]?.[locale] : null;
  if (keyValueMatch && keyValueDesc) {
    return `${keyValueDesc} ${t(locale, 'special.flagValue')(keyValueMatch[1])}`;
  }

  if (isRedirectTarget) {
    return t(locale, 'special.redirectTarget');
  }

  return knowledgeBase?.argHint?.[locale] ?? t(locale, 'fallback.arg');
}

function pushAssignmentSteps(
  steps: Step[],
  token: string,
  assignment: { name: string; value: string },
  locale: Locale,
): void {
  const substitutionInner = extractCommandSubstitution(assignment.value);
  if (substitutionInner !== null) {
    steps.push({ token, type: 'assignment', desc: t(locale, 'special.assignmentSubstitution')(assignment.name) });
    steps.push(...analyzeScript(substitutionInner, locale));
    return;
  }

  const sourceVariable = extractVariableExpansion(assignment.value);
  if (sourceVariable !== null) {
    steps.push({
      token,
      type: 'assignment',
      desc: t(locale, 'special.assignmentVariable')(assignment.name, sourceVariable),
    });
    return;
  }

  steps.push({
    token,
    type: 'assignment',
    desc: t(locale, 'special.assignmentLiteral')(assignment.name, assignment.value),
  });
}

export function analyze(tokens: string[], locale: Locale): Step[] {
  const steps: Step[] = [];
  if (!tokens.length) return steps;

  let startIndex = 0;
  if (tokens[0] === 'sudo') {
    steps.push({ token: tokens[0], type: 'command', desc: COMMANDS.sudo.desc[locale] });
    startIndex = 1;
  }

  while (startIndex < tokens.length) {
    const assignment = extractAssignment(tokens[startIndex]);
    if (!assignment) break;
    pushAssignmentSteps(steps, tokens[startIndex], assignment, locale);
    startIndex++;
  }

  if (startIndex >= tokens.length) return steps;

  const baseCmd = tokens[startIndex];
  const knowledgeBase = COMMANDS[baseCmd];

  steps.push({
    token: tokens[startIndex],
    type: 'command',
    desc: knowledgeBase ? knowledgeBase.desc[locale] : t(locale, 'fallback.command')(tokens[startIndex]),
  });

  tokens.slice(startIndex + 1).reduce((currentState, tok) => {
    const { classification, state: nextState } = classifyCommandToken(tok, knowledgeBase, currentState);

    switch (classification.type) {
      case 'redirect':
        steps.push({ token: tok, type: 'redirect', desc: redirectDescription(tok, locale)! });
        break;
      case 'substitution':
        steps.push({ token: tok, type: 'substitution', desc: t(locale, 'special.substitution') });
        steps.push(...analyzeScript(classification.inner, locale));
        break;
      case 'variable':
        steps.push({ token: tok, type: 'variable', desc: t(locale, 'special.variableExpansion')(classification.name) });
        break;
      case 'flag-long':
        steps.push({
          token: tok,
          type: 'flag-long',
          desc: describeFlagLong(classification.flagName, classification.flagValue, knowledgeBase, locale),
        });
        break;
      case 'flag-short':
        steps.push({
          token: tok,
          type: 'flag-short',
          desc: describeFlagShort(classification.flagName, classification.combinedLetters, knowledgeBase, locale),
        });
        break;
      case 'subcommand':
        steps.push({ token: tok, type: 'subcommand', desc: knowledgeBase!.subcommands[classification.name][locale] });
        break;
      case 'unknown': {
        const examples = Object.keys(knowledgeBase!.subcommands).slice(0, 3).join(', ');
        steps.push({
          token: tok,
          type: 'unknown',
          desc: t(locale, 'fallback.subcommandExpected')(baseCmd, tok, examples),
        });
        break;
      }
      case 'arg':
        steps.push({
          token: tok,
          type: 'arg',
          desc: describeArgToken(
            tok,
            baseCmd,
            knowledgeBase,
            classification.consumedValueFlag,
            classification.keyValueMatch,
            classification.isRedirectTarget,
            locale,
          ),
        });
        break;
    }

    return nextState;
  }, createCommandTokenState());

  return steps;
}

function buildTestStep(expr: string, locale: Locale): Step {
  const inner = expr
    .replace(/^\[\[?/, '')
    .replace(/\]\]?$/, '')
    .trim();
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

function processSegment(text: string, locale: Locale, steps: Step[]): void {
  const trimmed = text.trim();
  if (!trimmed) return;

  const dispatch = dispatchSegment(trimmed);

  if (dispatch.kind === 'control') {
    steps.push({ token: trimmed, type: 'control', desc: CONTROL_KEYWORDS[trimmed][locale] });
    return;
  }

  if (dispatch.kind === 'conditional') {
    steps.push({ token: dispatch.keyword, type: 'control', desc: CONTROL_KEYWORDS[dispatch.keyword][locale] });
    const rest = trimmed.slice(dispatch.keyword.length).trim();
    if (rest) processSegment(rest, locale, steps);
    return;
  }

  if (dispatch.kind === 'test') {
    steps.push(buildTestStep(trimmed, locale));
    return;
  }

  const tokens = tokenize(trimmed);
  if (!tokens.length) return;
  steps.push(...analyze(tokens, locale));
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

    const commentStart = findCommentStart(rawLine);
    const code = commentStart === -1 ? rawLine : rawLine.slice(0, commentStart).trimEnd();
    const comment = commentStart === -1 ? null : rawLine.slice(commentStart).trim();
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

function pushSubstitutionSpans(rawText: string, spans: HighlightSpan[]): boolean {
  const inner = extractCommandSubstitution(rawText);
  if (inner === null) return false;

  spans.push({ text: '$(', type: 'substitution' });
  highlightCode(inner, spans);
  spans.push({ text: ')', type: 'substitution' });
  return true;
}

function pushAssignmentSpans(rawText: string, spans: HighlightSpan[]): boolean {
  const assignment = extractAssignment(rawText);
  if (!assignment) return false;

  const prefixLength = assignment.name.length + 1;
  spans.push({ text: rawText.slice(0, prefixLength), type: 'assignment' });

  const valueText = rawText.slice(prefixLength);
  if (pushSubstitutionSpans(valueText, spans)) return true;

  const isVariable = extractVariableExpansion(valueText) !== null;
  spans.push({ text: valueText, type: isVariable ? 'variable' : 'assignment' });
  return true;
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

  const fullTrimmed = chunks
    .map((c) => c.text)
    .join('')
    .trim();

  const dispatch = dispatchSegment(fullTrimmed);

  if (dispatch.kind === 'control') {
    chunks.forEach((c) => spans.push({ text: c.text, type: c.kind === 'word' ? 'control' : null }));
    return;
  }

  if (dispatch.kind === 'conditional') {
    const firstWordChunkIdx = wordIdxs[0];
    for (let i = 0; i <= firstWordChunkIdx; i++) {
      spans.push({ text: chunks[i].text, type: chunks[i].kind === 'word' ? 'control' : null });
    }
    highlightSegment(chunks.slice(firstWordChunkIdx + 1), spans);
    return;
  }

  if (dispatch.kind === 'test') {
    chunks.forEach((c) => spans.push({ text: c.text, type: 'test' }));
    return;
  }

  interface HighlightWalkState {
    sawCommand: boolean;
    afterSudo: boolean;
    knowledgeBase: CommandDef | undefined;
    commandTokenState: CommandTokenState;
  }

  const initialWalkState: HighlightWalkState = {
    sawCommand: false,
    afterSudo: false,
    knowledgeBase: undefined,
    commandTokenState: createCommandTokenState(),
  };

  chunks.reduce((walkState, c): HighlightWalkState => {
    if (c.kind !== 'word') {
      spans.push({ text: c.text, type: null });
      return walkState;
    }
    const value = stripQuotesForClassification(c.text);

    if (!walkState.sawCommand) {
      if (pushAssignmentSpans(c.text, spans)) {
        return walkState;
      }

      spans.push({ text: c.text, type: 'command' });
      return value === 'sudo'
        ? { ...walkState, sawCommand: true, afterSudo: true }
        : { ...walkState, sawCommand: true, knowledgeBase: COMMANDS[value] };
    }

    if (walkState.afterSudo) {
      spans.push({ text: c.text, type: 'command' });
      return { ...walkState, afterSudo: false, knowledgeBase: COMMANDS[value] };
    }

    const { classification, state: nextCommandTokenState } = classifyCommandToken(
      value,
      walkState.knowledgeBase,
      walkState.commandTokenState,
    );

    if (classification.type !== 'substitution' || !pushSubstitutionSpans(c.text, spans)) {
      spans.push({ text: c.text, type: classification.type });
    }
    return { ...walkState, commandTokenState: nextCommandTokenState };
  }, initialWalkState);
}

function highlightCode(code: string, spans: HighlightSpan[]): void {
  const chunks = scanChunks(code);
  let segStart = 0;

  chunks.forEach((chunk, i) => {
    if (chunk.kind === 'operator') {
      if (i > segStart) highlightSegment(chunks.slice(segStart, i), spans);
      spans.push({ text: chunk.text, type: 'operator' });
      segStart = i + 1;
    }
  });

  if (segStart < chunks.length) highlightSegment(chunks.slice(segStart), spans);
}

function highlightLine(line: string, spans: HighlightSpan[]): void {
  const commentStart = findCommentStart(line);
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

function leadingCommandName(text: string): string | null {
  const tokens = tokenize(text);
  if (!tokens.length) return null;
  return tokens[0] === 'sudo' ? (tokens[1] ?? tokens[0]) : tokens[0];
}

export function extractPipelineChains(input: string): string[][] {
  const chains: string[][] = [];

  input.split('\n').forEach((rawLine) => {
    if (!rawLine.trim()) return;

    const commentStart = findCommentStart(rawLine);
    const code = commentStart === -1 ? rawLine : rawLine.slice(0, commentStart).trimEnd();
    const trimmedCode = code.trim();
    if (!trimmedCode) return;

    const segments = splitTopLevel(trimmedCode);
    let currentChain: string[] = [];

    segments.forEach((segment, index) => {
      const name = leadingCommandName(segment.text);
      if (!name) return;

      if (index === 0 || segment.operator === '|') {
        currentChain.push(name);
        return;
      }

      if (currentChain.length >= 2) chains.push(currentChain);
      currentChain = [name];
    });

    if (currentChain.length >= 2) chains.push(currentChain);
  });

  return chains;
}
