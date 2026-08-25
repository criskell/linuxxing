import type { CommandDef, ValueKind } from '../commands/types';
import { parseRedirect } from './redirects';
import { extractCommandSubstitution, extractVariableExpansion } from './expansions';

const COMBINED_SHORT_FLAG_LETTERS_PATTERN = /^[a-zA-Z]+$/;
const KEY_VALUE_PATTERN = /^([a-zA-Z]+)=(.*)$/;

export interface CommandTokenState {
  subcommandClaimed: boolean;
  pendingValueFlag: { flag: string; kind: ValueKind } | null;
  pendingRedirectTarget: boolean;
}

export const createCommandTokenState = () =>
  ({ subcommandClaimed: false, pendingValueFlag: null, pendingRedirectTarget: false }) as CommandTokenState;

export type CommandTokenClassification =
  | { type: 'redirect' }
  | { type: 'substitution'; inner: string }
  | { type: 'variable'; name: string }
  | { type: 'flag-long'; flagName: string; flagValue: string | null }
  | { type: 'flag-short'; flagName: string; combinedLetters: string[] | null }
  | { type: 'subcommand'; name: string }
  | { type: 'unknown' }
  | {
      type: 'arg';
      consumedValueFlag: { flag: string; kind: ValueKind } | null;
      keyValueMatch: [string, string] | null;
      isRedirectTarget: boolean;
    };

export interface CommandTokenOutcome {
  classification: CommandTokenClassification;
  state: CommandTokenState;
}

const classifyRedirect = (token: string, state: CommandTokenState) => {
  const info = parseRedirect(token);
  if (!info) return null;

  const nextState = info.target === '' ? { ...state, pendingRedirectTarget: true } : state;
  return { classification: { type: 'redirect' as const }, state: nextState };
};

const classifySubstitution = (token: string, state: CommandTokenState) => {
  const inner = extractCommandSubstitution(token);
  if (inner === null) return null;
  return { classification: { type: 'substitution' as const, inner }, state };
};

const classifyVariable = (token: string, state: CommandTokenState) => {
  const name = extractVariableExpansion(token);
  if (name === null) return null;
  return { classification: { type: 'variable' as const, name }, state };
};

const classifyLongFlag = (token: string, knowledgeBase: CommandDef | undefined, state: CommandTokenState) => {
  if (!token.startsWith('--')) return null;

  const equalsIndex = token.indexOf('=');
  const flagName = equalsIndex === -1 ? token : token.slice(0, equalsIndex);
  const flagValue = equalsIndex === -1 ? null : token.slice(equalsIndex + 1);
  const pendingKind = flagValue === null ? knowledgeBase?.valueFlags?.[flagName] : undefined;
  const nextState = pendingKind ? { ...state, pendingValueFlag: { flag: flagName, kind: pendingKind } } : state;

  return { classification: { type: 'flag-long' as const, flagName, flagValue }, state: nextState };
};

const classifyKnownShortFlag = (token: string, knowledgeBase: CommandDef | undefined, state: CommandTokenState) => {
  const known = knowledgeBase?.flags[token];
  if (!known) return null;

  const pendingKind = knowledgeBase?.valueFlags?.[token];
  const nextState = pendingKind ? { ...state, pendingValueFlag: { flag: token, kind: pendingKind } } : state;

  return { classification: { type: 'flag-short' as const, flagName: token, combinedLetters: null }, state: nextState };
};

const classifyShortFlag = (token: string, knowledgeBase: CommandDef | undefined, state: CommandTokenState) => {
  const isShortFlagToken = token.startsWith('-') && token.length > 1 && token !== '-';
  if (!isShortFlagToken) return null;

  const known = classifyKnownShortFlag(token, knowledgeBase, state);
  if (known) return known;

  const body = token.slice(1);
  const isCombinable = body.length > 1 && COMBINED_SHORT_FLAG_LETTERS_PATTERN.test(body);
  const combinedLetters = isCombinable ? body.split('') : null;

  return { classification: { type: 'flag-short' as const, flagName: token, combinedLetters }, state };
};

const classifyLoneDash = (token: string, knowledgeBase: CommandDef | undefined, state: CommandTokenState) => {
  if (token !== '-') return null;

  const known = knowledgeBase?.flags['-'];
  const classification = known
    ? { type: 'flag-short' as const, flagName: '-', combinedLetters: null }
    : { type: 'arg' as const, consumedValueFlag: null, keyValueMatch: null, isRedirectTarget: false };

  return { classification, state };
};

const classifySubcommand = (token: string, knowledgeBase: CommandDef | undefined, state: CommandTokenState) => {
  if (state.subcommandClaimed || !knowledgeBase) return null;

  if (knowledgeBase.subcommands[token]) {
    return {
      classification: { type: 'subcommand' as const, name: token },
      state: { ...state, subcommandClaimed: true },
    };
  }

  const hasSubcommands = Object.keys(knowledgeBase.subcommands).length > 0;
  if (!hasSubcommands) return null;

  return { classification: { type: 'unknown' as const }, state: { ...state, subcommandClaimed: true } };
};

const classifyArgument = (
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
  consumedValueFlag: { flag: string; kind: ValueKind } | null,
  isRedirectTarget: boolean,
) => {
  const keyValueRegexMatch = knowledgeBase?.flags ? token.match(KEY_VALUE_PATTERN) : null;
  const keyValueMatch: [string, string] | null = keyValueRegexMatch
    ? [keyValueRegexMatch[1], keyValueRegexMatch[2]]
    : null;

  return { classification: { type: 'arg' as const, consumedValueFlag, keyValueMatch, isRedirectTarget }, state };
};

export const classifyCommandToken = (
  token: string,
  knowledgeBase: CommandDef | undefined,
  state: CommandTokenState,
) => {
  const consumedValueFlag = state.pendingValueFlag;
  const consumedRedirectTarget = state.pendingRedirectTarget;
  const clearedState: CommandTokenState = { ...state, pendingValueFlag: null, pendingRedirectTarget: false };

  return (
    classifyRedirect(token, clearedState) ??
    classifySubstitution(token, clearedState) ??
    classifyVariable(token, clearedState) ??
    classifyLongFlag(token, knowledgeBase, clearedState) ??
    classifyShortFlag(token, knowledgeBase, clearedState) ??
    classifyLoneDash(token, knowledgeBase, clearedState) ??
    classifySubcommand(token, knowledgeBase, clearedState) ??
    classifyArgument(token, knowledgeBase, clearedState, consumedValueFlag, consumedRedirectTarget)
  );
};
