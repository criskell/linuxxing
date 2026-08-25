import { CONTROL_KEYWORDS } from './shell';
import type { CommandDef, ValueKind } from './commands';

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

export const CONDITIONAL_KEYWORDS = new Set(['if', 'elif', 'while', 'until']);

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

export function stripQuotesForClassification(word: string): string {
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

export function isBracketTest(text: string): boolean {
  return (text.startsWith('[[') && text.endsWith(']]')) || (text.startsWith('[') && text.endsWith(']'));
}

export type RedirectInfo =
  | { kind: 'dup'; fileDescriptor: string; target: string }
  | { kind: 'append'; fileDescriptor: string; target: string }
  | { kind: 'overwrite'; fileDescriptor: string; target: string }
  | { kind: 'input'; fileDescriptor: string; target: string };

export function parseRedirect(token: string): RedirectInfo | null {
  let match = token.match(/^(\d+)?>&(\d+)$/);
  if (match) return { kind: 'dup', fileDescriptor: match[1] ?? '1', target: match[2] };

  match = token.match(/^(\d*)(>>)(.*)$/);
  if (match) return { kind: 'append', fileDescriptor: match[1] || '1', target: match[3] || '' };

  match = token.match(/^(\d*)(>)(.*)$/);
  if (match) return { kind: 'overwrite', fileDescriptor: match[1] || '1', target: match[3] || '' };

  match = token.match(/^(\d*)(<)(.*)$/);
  if (match) return { kind: 'input', fileDescriptor: match[1] || '1', target: match[3] || '' };

  return null;
}

export function findCommentStart(line: string): number {
  let quote: string | null = null;
  for (let i = 0; i < line.length; i++) {
    const character = line[i];
    if (quote) {
      if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      quote = character;
      continue;
    }
    if (character === '#' && (i === 0 || /\s/.test(line[i - 1]))) {
      return i;
    }
  }
  return -1;
}

export interface RawChunk {
  text: string;
  kind: 'whitespace' | 'operator' | 'word';
}

export function scanChunks(code: string): RawChunk[] {
  const chunks: RawChunk[] = [];
  let current = '';
  let currentKind: 'whitespace' | 'word' | null = null;
  let quote: string | null = null;

  const flush = () => {
    if (current) chunks.push({ text: current, kind: currentKind! });
    current = '';
    currentKind = null;
  };

  for (let i = 0; i < code.length; i++) {
    const character = code[i];
    if (quote) {
      current += character;
      if (character === quote) quote = null;
      continue;
    }
    if (character === '"' || character === "'") {
      if (currentKind !== 'word') {
        flush();
        currentKind = 'word';
      }
      quote = character;
      current += character;
      continue;
    }
    if (character === '&' && code[i + 1] === '&') {
      flush();
      chunks.push({ text: '&&', kind: 'operator' });
      i++;
      continue;
    }
    if (character === '|' && code[i + 1] === '|') {
      flush();
      chunks.push({ text: '||', kind: 'operator' });
      i++;
      continue;
    }
    if (character === '|') {
      flush();
      chunks.push({ text: '|', kind: 'operator' });
      continue;
    }
    if (character === ';') {
      flush();
      chunks.push({ text: ';', kind: 'operator' });
      continue;
    }
    if (/\s/.test(character)) {
      if (currentKind !== 'whitespace') {
        flush();
        currentKind = 'whitespace';
      }
      current += character;
      continue;
    }
    if (currentKind !== 'word') {
      flush();
      currentKind = 'word';
    }
    current += character;
  }
  flush();
  return chunks;
}

export interface CodeSegment {
  operator: string | null;
  text: string;
}

export function splitTopLevel(code: string): CodeSegment[] {
  const chunks = scanChunks(code);
  const segments: CodeSegment[] = [];
  let currentOperator: string | null = null;
  let currentText = '';

  const flush = () => {
    const text = currentText.trim();
    if (text.length) segments.push({ operator: currentOperator, text });
    currentText = '';
  };

  chunks.forEach((chunk) => {
    if (chunk.kind === 'operator') {
      flush();
      currentOperator = chunk.text;
      return;
    }
    currentText += chunk.text;
  });
  flush();

  return segments;
}

export type SegmentDispatch =
  | { kind: 'control'; keyword: string }
  | { kind: 'conditional'; keyword: string }
  | { kind: 'test' }
  | { kind: 'command' };

export function dispatchSegment(trimmedText: string): SegmentDispatch {
  if (CONTROL_KEYWORDS[trimmedText]) return { kind: 'control', keyword: trimmedText };

  const firstSpace = trimmedText.indexOf(' ');
  const firstWord = firstSpace === -1 ? trimmedText : trimmedText.slice(0, firstSpace);
  if (CONDITIONAL_KEYWORDS.has(firstWord) && CONTROL_KEYWORDS[firstWord]) {
    return { kind: 'conditional', keyword: firstWord };
  }

  if (isBracketTest(trimmedText)) return { kind: 'test' };

  return { kind: 'command' };
}

export interface CommandTokenState {
  subcommandClaimed: boolean;
  pendingValueFlag: { flag: string; kind: ValueKind } | null;
}

export function createCommandTokenState(): CommandTokenState {
  return { subcommandClaimed: false, pendingValueFlag: null };
}

export type CommandTokenClassification =
  | { type: 'redirect' }
  | { type: 'flag-long'; flagName: string; flagValue: string | null }
  | { type: 'flag-short'; flagName: string; combinedLetters: string[] | null }
  | { type: 'subcommand'; name: string }
  | { type: 'unknown' }
  | { type: 'arg'; consumedValueFlag: { flag: string; kind: ValueKind } | null; keyValueMatch: [string, string] | null };

export function classifyCommandToken(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenClassification {
  const consumedValueFlag = state.pendingValueFlag;
  state.pendingValueFlag = null;

  if (parseRedirect(token)) {
    return { type: 'redirect' };
  }

  if (token.startsWith('--')) {
    const equalsIndex = token.indexOf('=');
    const flagName = equalsIndex === -1 ? token : token.slice(0, equalsIndex);
    const flagValue = equalsIndex === -1 ? null : token.slice(equalsIndex + 1);

    if (flagValue === null) {
      const kind = knowledgeBase?.valueFlags?.[flagName];
      if (kind) state.pendingValueFlag = { flag: flagName, kind };
    }

    return { type: 'flag-long', flagName, flagValue };
  }

  if (token.startsWith('-') && token.length > 1 && token !== '-') {
    const body = token.slice(1);
    const known = knowledgeBase?.flags[token];

    if (known) {
      const kind = knowledgeBase?.valueFlags?.[token];
      if (kind) state.pendingValueFlag = { flag: token, kind };
      return { type: 'flag-short', flagName: token, combinedLetters: null };
    }

    if (body.length > 1 && /^[a-zA-Z]+$/.test(body)) {
      return { type: 'flag-short', flagName: token, combinedLetters: body.split('') };
    }

    return { type: 'flag-short', flagName: token, combinedLetters: null };
  }

  if (token === '-') {
    const known = knowledgeBase?.flags['-'];
    return known
      ? { type: 'flag-short', flagName: '-', combinedLetters: null }
      : { type: 'arg', consumedValueFlag: null, keyValueMatch: null };
  }

  if (!state.subcommandClaimed && knowledgeBase && knowledgeBase.subcommands[token]) {
    state.subcommandClaimed = true;
    return { type: 'subcommand', name: token };
  }

  if (!state.subcommandClaimed && knowledgeBase && Object.keys(knowledgeBase.subcommands).length) {
    state.subcommandClaimed = true;
    return { type: 'unknown' };
  }

  const keyValueRegexMatch = knowledgeBase?.flags ? token.match(/^([a-zA-Z]+)=(.*)$/) : null;
  const keyValueMatch: [string, string] | null = keyValueRegexMatch
    ? [keyValueRegexMatch[1], keyValueRegexMatch[2]]
    : null;

  return { type: 'arg', consumedValueFlag, keyValueMatch };
}
