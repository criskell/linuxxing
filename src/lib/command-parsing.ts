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

const CONDITIONAL_KEYWORDS = new Set(['if', 'elif', 'while', 'until']);

const COMBINED_SHORT_FLAG_LETTERS_PATTERN = /^[a-zA-Z]+$/;
const KEY_VALUE_PATTERN = /^([a-zA-Z]+)=(.*)$/;
const WHITESPACE_PATTERN = /\s/;

const DUPLICATE_REDIRECT_PATTERN = /^(\d+)?>&(\d+)$/;
const APPEND_REDIRECT_PATTERN = /^(\d*)(>>)(.*)$/;
const OVERWRITE_REDIRECT_PATTERN = /^(\d*)(>)(.*)$/;
const INPUT_REDIRECT_PATTERN = /^(\d*)(<)(.*)$/;

const OPERATOR_TOKENS = ['&&', '||', '|', ';'] as const;

function isQuoteCharacter(character: string): boolean {
  return character === '"' || character === "'";
}

export function tokenize(input: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let quote: string | null = null;

  for (const character of input) {
    if (quote) {
      if (character === quote) {
        quote = null;
      } else {
        current += character;
      }
    } else if (isQuoteCharacter(character)) {
      quote = character;
    } else if (character === ' ') {
      if (current.length) {
        tokens.push(current);
        current = '';
      }
    } else {
      current += character;
    }
  }
  if (current.length) tokens.push(current);
  return tokens;
}

export function stripQuotesForClassification(word: string): string {
  let stripped = '';
  let quote: string | null = null;
  for (const character of word) {
    if (quote) {
      if (character === quote) quote = null;
      else stripped += character;
    } else if (isQuoteCharacter(character)) {
      quote = character;
    } else {
      stripped += character;
    }
  }
  return stripped;
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
  let match = token.match(DUPLICATE_REDIRECT_PATTERN);
  if (match) return { kind: 'dup', fileDescriptor: match[1] ?? '1', target: match[2] };

  match = token.match(APPEND_REDIRECT_PATTERN);
  if (match) return { kind: 'append', fileDescriptor: match[1] || '1', target: match[3] || '' };

  match = token.match(OVERWRITE_REDIRECT_PATTERN);
  if (match) return { kind: 'overwrite', fileDescriptor: match[1] || '1', target: match[3] || '' };

  match = token.match(INPUT_REDIRECT_PATTERN);
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
    if (isQuoteCharacter(character)) {
      quote = character;
      continue;
    }
    if (character === '#' && (i === 0 || WHITESPACE_PATTERN.test(line[i - 1]))) {
      return i;
    }
  }
  return -1;
}

export interface RawChunk {
  text: string;
  kind: 'whitespace' | 'operator' | 'word';
}

function matchOperatorAt(code: string, index: number): string | null {
  for (const operator of OPERATOR_TOKENS) {
    if (code.startsWith(operator, index)) return operator;
  }
  return null;
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
    if (isQuoteCharacter(character)) {
      if (currentKind !== 'word') {
        flush();
        currentKind = 'word';
      }
      quote = character;
      current += character;
      continue;
    }
    const operator = matchOperatorAt(code, i);
    if (operator) {
      flush();
      chunks.push({ text: operator, kind: 'operator' });
      i += operator.length - 1;
      continue;
    }
    if (WHITESPACE_PATTERN.test(character)) {
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

function classifyRedirect(token: string): CommandTokenClassification | null {
  return parseRedirect(token) ? { type: 'redirect' } : null;
}

function classifyLongFlag(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenClassification | null {
  if (!token.startsWith('--')) return null;

  const equalsIndex = token.indexOf('=');
  const flagName = equalsIndex === -1 ? token : token.slice(0, equalsIndex);
  const flagValue = equalsIndex === -1 ? null : token.slice(equalsIndex + 1);

  if (flagValue === null) {
    const kind = knowledgeBase?.valueFlags?.[flagName];
    if (kind) state.pendingValueFlag = { flag: flagName, kind };
  }

  return { type: 'flag-long', flagName, flagValue };
}

function classifyShortFlag(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenClassification | null {
  if (!(token.startsWith('-') && token.length > 1 && token !== '-')) return null;

  const known = knowledgeBase?.flags[token];
  if (known) {
    const kind = knowledgeBase?.valueFlags?.[token];
    if (kind) state.pendingValueFlag = { flag: token, kind };
    return { type: 'flag-short', flagName: token, combinedLetters: null };
  }

  const body = token.slice(1);
  if (body.length > 1 && COMBINED_SHORT_FLAG_LETTERS_PATTERN.test(body)) {
    return { type: 'flag-short', flagName: token, combinedLetters: body.split('') };
  }

  return { type: 'flag-short', flagName: token, combinedLetters: null };
}

function classifyLoneDash(token: string, knowledgeBase: CommandDef | undefined): CommandTokenClassification | null {
  if (token !== '-') return null;

  const known = knowledgeBase?.flags['-'];
  return known
    ? { type: 'flag-short', flagName: '-', combinedLetters: null }
    : { type: 'arg', consumedValueFlag: null, keyValueMatch: null };
}

function classifySubcommand(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenClassification | null {
  if (state.subcommandClaimed || !knowledgeBase) return null;

  if (knowledgeBase.subcommands[token]) {
    state.subcommandClaimed = true;
    return { type: 'subcommand', name: token };
  }

  if (Object.keys(knowledgeBase.subcommands).length) {
    state.subcommandClaimed = true;
    return { type: 'unknown' };
  }

  return null;
}

function classifyArgument(
  token: string,
  knowledgeBase: CommandDef | undefined,
  consumedValueFlag: { flag: string; kind: ValueKind } | null,
): CommandTokenClassification {
  const keyValueRegexMatch = knowledgeBase?.flags ? token.match(KEY_VALUE_PATTERN) : null;
  const keyValueMatch: [string, string] | null = keyValueRegexMatch
    ? [keyValueRegexMatch[1], keyValueRegexMatch[2]]
    : null;

  return { type: 'arg', consumedValueFlag, keyValueMatch };
}

export function classifyCommandToken(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenClassification {
  const consumedValueFlag = state.pendingValueFlag;
  state.pendingValueFlag = null;

  return (
    classifyRedirect(token) ??
    classifyLongFlag(token, knowledgeBase, state) ??
    classifyShortFlag(token, knowledgeBase, state) ??
    classifyLoneDash(token, knowledgeBase) ??
    classifySubcommand(token, knowledgeBase, state) ??
    classifyArgument(token, knowledgeBase, consumedValueFlag)
  );
}
