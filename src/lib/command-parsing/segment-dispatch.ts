import { CONTROL_KEYWORDS } from '../shell';

const CONDITIONAL_KEYWORDS = new Set(['if', 'elif', 'while', 'until']);

export const isBracketTest = (text: string) =>
  (text.startsWith('[[') && text.endsWith(']]')) || (text.startsWith('[') && text.endsWith(']'));

export type SegmentDispatch =
  | { kind: 'control'; keyword: string }
  | { kind: 'conditional'; keyword: string }
  | { kind: 'test' }
  | { kind: 'command' };

export const dispatchSegment = (trimmedText: string) => {
  if (CONTROL_KEYWORDS[trimmedText]) return { kind: 'control' as const, keyword: trimmedText };

  const firstSpace = trimmedText.indexOf(' ');
  const firstWord = firstSpace === -1 ? trimmedText : trimmedText.slice(0, firstSpace);
  if (CONDITIONAL_KEYWORDS.has(firstWord) && CONTROL_KEYWORDS[firstWord]) {
    return { kind: 'conditional' as const, keyword: firstWord };
  }

  if (isBracketTest(trimmedText)) return { kind: 'test' as const };

  return { kind: 'command' as const };
};
