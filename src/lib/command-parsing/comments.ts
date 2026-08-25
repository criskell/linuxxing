import { isQuoteCharacter, indicesOf, WHITESPACE_PATTERN } from './characters';

interface CommentScanAccumulator {
  quote: string | null;
  foundIndex: number;
}

const commentScanStep = (accumulator: CommentScanAccumulator, index: number, line: string) => {
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
};

export const findCommentStart = (line: string) => {
  const initial: CommentScanAccumulator = { quote: null, foundIndex: -1 };
  return indicesOf(line).reduce((accumulator, index) => commentScanStep(accumulator, index, line), initial).foundIndex;
};
