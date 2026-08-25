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

function indicesOf(text: string): number[] {
  return Array.from({ length: text.length }, (_, index) => index);
}

interface TokenizeAccumulator {
  tokens: string[];
  current: string;
  quote: string | null;
}

function tokenizeStep(accumulator: TokenizeAccumulator, character: string): TokenizeAccumulator {
  if (accumulator.quote) {
    const closesQuote = character === accumulator.quote;
    return closesQuote
      ? { ...accumulator, quote: null }
      : { ...accumulator, current: accumulator.current + character };
  }

  if (isQuoteCharacter(character)) {
    return { ...accumulator, quote: character };
  }

  if (character === ' ') {
    if (!accumulator.current.length) return accumulator;
    return { tokens: [...accumulator.tokens, accumulator.current], current: '', quote: null };
  }

  return { ...accumulator, current: accumulator.current + character };
}

function flushCurrentToken(accumulator: TokenizeAccumulator): string[] {
  if (!accumulator.current.length) return accumulator.tokens;
  return [...accumulator.tokens, accumulator.current];
}

export function tokenize(input: string): string[] {
  const final = Array.from(input).reduce(tokenizeStep, { tokens: [], current: '', quote: null });
  return flushCurrentToken(final);
}

interface StripQuotesAccumulator {
  result: string;
  quote: string | null;
}

function stripQuotesStep(accumulator: StripQuotesAccumulator, character: string): StripQuotesAccumulator {
  if (accumulator.quote) {
    const closesQuote = character === accumulator.quote;
    return closesQuote
      ? { ...accumulator, quote: null }
      : { ...accumulator, result: accumulator.result + character };
  }

  if (isQuoteCharacter(character)) {
    return { ...accumulator, quote: character };
  }

  return { ...accumulator, result: accumulator.result + character };
}

export function stripQuotesForClassification(word: string): string {
  return Array.from(word).reduce(stripQuotesStep, { result: '', quote: null }).result;
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
  const duplicateMatch = token.match(DUPLICATE_REDIRECT_PATTERN);
  if (duplicateMatch) return { kind: 'dup', fileDescriptor: duplicateMatch[1] ?? '1', target: duplicateMatch[2] };

  const appendMatch = token.match(APPEND_REDIRECT_PATTERN);
  if (appendMatch) return { kind: 'append', fileDescriptor: appendMatch[1] || '1', target: appendMatch[3] || '' };

  const overwriteMatch = token.match(OVERWRITE_REDIRECT_PATTERN);
  if (overwriteMatch) {
    return { kind: 'overwrite', fileDescriptor: overwriteMatch[1] || '1', target: overwriteMatch[3] || '' };
  }

  const inputMatch = token.match(INPUT_REDIRECT_PATTERN);
  if (inputMatch) return { kind: 'input', fileDescriptor: inputMatch[1] || '1', target: inputMatch[3] || '' };

  return null;
}

interface CommentScanAccumulator {
  quote: string | null;
  foundIndex: number;
}

function commentScanStep(accumulator: CommentScanAccumulator, index: number, line: string): CommentScanAccumulator {
  if (accumulator.foundIndex !== -1) return accumulator;

  const character = line[index];

  if (accumulator.quote) {
    return character === accumulator.quote ? { ...accumulator, quote: null } : accumulator;
  }

  if (isQuoteCharacter(character)) {
    return { ...accumulator, quote: character };
  }

  const precededByWhitespaceOrStart = index === 0 || WHITESPACE_PATTERN.test(line[index - 1]);
  if (character === '#' && precededByWhitespaceOrStart) {
    return { ...accumulator, foundIndex: index };
  }

  return accumulator;
}

export function findCommentStart(line: string): number {
  const initial: CommentScanAccumulator = { quote: null, foundIndex: -1 };
  return indicesOf(line).reduce((accumulator, index) => commentScanStep(accumulator, index, line), initial).foundIndex;
}

export interface RawChunk {
  text: string;
  kind: 'whitespace' | 'operator' | 'word';
}

function matchOperatorAt(code: string, index: number): string | null {
  return OPERATOR_TOKENS.find((operator) => code.startsWith(operator, index)) ?? null;
}

interface ScanAccumulator {
  chunks: RawChunk[];
  currentText: string;
  currentKind: 'whitespace' | 'word' | null;
  quote: string | null;
  skipRemaining: number;
}

function flushRun(accumulator: ScanAccumulator): ScanAccumulator {
  if (!accumulator.currentText) return accumulator;
  return {
    ...accumulator,
    chunks: [...accumulator.chunks, { text: accumulator.currentText, kind: accumulator.currentKind! }],
    currentText: '',
    currentKind: null,
  };
}

function openRun(accumulator: ScanAccumulator, kind: 'whitespace' | 'word'): ScanAccumulator {
  if (accumulator.currentKind === kind) return accumulator;
  return { ...flushRun(accumulator), currentKind: kind };
}

function scanStep(accumulator: ScanAccumulator, index: number, code: string): ScanAccumulator {
  if (accumulator.skipRemaining > 0) {
    return { ...accumulator, skipRemaining: accumulator.skipRemaining - 1 };
  }

  const character = code[index];

  if (accumulator.quote) {
    const closesQuote = character === accumulator.quote;
    return { ...accumulator, quote: closesQuote ? null : accumulator.quote, currentText: accumulator.currentText + character };
  }

  if (isQuoteCharacter(character)) {
    const opened = openRun(accumulator, 'word');
    return { ...opened, quote: character, currentText: opened.currentText + character };
  }

  const operator = matchOperatorAt(code, index);
  if (operator) {
    const flushed = flushRun(accumulator);
    return {
      ...flushed,
      chunks: [...flushed.chunks, { text: operator, kind: 'operator' }],
      skipRemaining: operator.length - 1,
    };
  }

  if (WHITESPACE_PATTERN.test(character)) {
    const opened = openRun(accumulator, 'whitespace');
    return { ...opened, currentText: opened.currentText + character };
  }

  const opened = openRun(accumulator, 'word');
  return { ...opened, currentText: opened.currentText + character };
}

export function scanChunks(code: string): RawChunk[] {
  const initial: ScanAccumulator = { chunks: [], currentText: '', currentKind: null, quote: null, skipRemaining: 0 };
  const final = indicesOf(code).reduce((accumulator, index) => scanStep(accumulator, index, code), initial);
  return flushRun(final).chunks;
}

export interface CodeSegment {
  operator: string | null;
  text: string;
}

interface SegmentAccumulator {
  segments: CodeSegment[];
  currentOperator: string | null;
  currentText: string;
}

function flushSegment(accumulator: SegmentAccumulator): SegmentAccumulator {
  const text = accumulator.currentText.trim();
  if (!text.length) return { ...accumulator, currentText: '' };
  return {
    ...accumulator,
    segments: [...accumulator.segments, { operator: accumulator.currentOperator, text }],
    currentText: '',
  };
}

function splitStep(accumulator: SegmentAccumulator, chunk: RawChunk): SegmentAccumulator {
  if (chunk.kind === 'operator') {
    return { ...flushSegment(accumulator), currentOperator: chunk.text };
  }
  return { ...accumulator, currentText: accumulator.currentText + chunk.text };
}

export function splitTopLevel(code: string): CodeSegment[] {
  const initial: SegmentAccumulator = { segments: [], currentOperator: null, currentText: '' };
  const final = scanChunks(code).reduce(splitStep, initial);
  return flushSegment(final).segments;
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

export interface CommandTokenOutcome {
  classification: CommandTokenClassification;
  state: CommandTokenState;
}

function classifyRedirect(token: string, state: CommandTokenState): CommandTokenOutcome | null {
  if (!parseRedirect(token)) return null;
  return { classification: { type: 'redirect' }, state };
}

function classifyLongFlag(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenOutcome | null {
  if (!token.startsWith('--')) return null;

  const equalsIndex = token.indexOf('=');
  const flagName = equalsIndex === -1 ? token : token.slice(0, equalsIndex);
  const flagValue = equalsIndex === -1 ? null : token.slice(equalsIndex + 1);
  const pendingKind = flagValue === null ? knowledgeBase?.valueFlags?.[flagName] : undefined;
  const nextState = pendingKind ? { ...state, pendingValueFlag: { flag: flagName, kind: pendingKind } } : state;

  return { classification: { type: 'flag-long', flagName, flagValue }, state: nextState };
}

function classifyKnownShortFlag(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenOutcome | null {
  const known = knowledgeBase?.flags[token];
  if (!known) return null;

  const pendingKind = knowledgeBase?.valueFlags?.[token];
  const nextState = pendingKind ? { ...state, pendingValueFlag: { flag: token, kind: pendingKind } } : state;

  return { classification: { type: 'flag-short', flagName: token, combinedLetters: null }, state: nextState };
}

function classifyShortFlag(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenOutcome | null {
  const isShortFlagToken = token.startsWith('-') && token.length > 1 && token !== '-';
  if (!isShortFlagToken) return null;

  const known = classifyKnownShortFlag(token, knowledgeBase, state);
  if (known) return known;

  const body = token.slice(1);
  const isCombinable = body.length > 1 && COMBINED_SHORT_FLAG_LETTERS_PATTERN.test(body);
  const combinedLetters = isCombinable ? body.split('') : null;

  return { classification: { type: 'flag-short', flagName: token, combinedLetters }, state };
}

function classifyLoneDash(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenOutcome | null {
  if (token !== '-') return null;

  const known = knowledgeBase?.flags['-'];
  const classification: CommandTokenClassification = known
    ? { type: 'flag-short', flagName: '-', combinedLetters: null }
    : { type: 'arg', consumedValueFlag: null, keyValueMatch: null };

  return { classification, state };
}

function classifySubcommand(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenOutcome | null {
  if (state.subcommandClaimed || !knowledgeBase) return null;

  if (knowledgeBase.subcommands[token]) {
    return { classification: { type: 'subcommand', name: token }, state: { ...state, subcommandClaimed: true } };
  }

  const hasSubcommands = Object.keys(knowledgeBase.subcommands).length > 0;
  if (!hasSubcommands) return null;

  return { classification: { type: 'unknown' }, state: { ...state, subcommandClaimed: true } };
}

function classifyArgument(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
  consumedValueFlag: { flag: string; kind: ValueKind } | null,
): CommandTokenOutcome {
  const keyValueRegexMatch = knowledgeBase?.flags ? token.match(KEY_VALUE_PATTERN) : null;
  const keyValueMatch: [string, string] | null = keyValueRegexMatch
    ? [keyValueRegexMatch[1], keyValueRegexMatch[2]]
    : null;

  return { classification: { type: 'arg', consumedValueFlag, keyValueMatch }, state };
}

export function classifyCommandToken(
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
): CommandTokenOutcome {
  const consumedValueFlag = state.pendingValueFlag;
  const clearedState: CommandTokenState = { ...state, pendingValueFlag: null };

  return (
    classifyRedirect(token, clearedState) ??
    classifyLongFlag(token, knowledgeBase, clearedState) ??
    classifyShortFlag(token, knowledgeBase, clearedState) ??
    classifyLoneDash(token, knowledgeBase, clearedState) ??
    classifySubcommand(token, knowledgeBase, clearedState) ??
    classifyArgument(token, knowledgeBase, clearedState, consumedValueFlag)
  );
}
