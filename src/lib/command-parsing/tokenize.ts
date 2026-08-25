import { isQuoteCharacter } from './characters';

interface TokenizeAccumulator {
  tokens: string[];
  current: string;
  quote: string | null;
  substitutionDepth: number;
  pendingDollar: boolean;
}

const tokenizeStep = (accumulator: TokenizeAccumulator, character: string): TokenizeAccumulator => {
  if (accumulator.quote) {
    const closesQuote = character === accumulator.quote;
    if (accumulator.substitutionDepth > 0) {
      return {
        ...accumulator,
        quote: closesQuote ? null : accumulator.quote,
        current: accumulator.current + character,
      };
    }
    return closesQuote ? { ...accumulator, quote: null } : { ...accumulator, current: accumulator.current + character };
  }

  if (accumulator.pendingDollar) {
    if (character === '(') {
      return {
        ...accumulator,
        current: accumulator.current + '$(',
        substitutionDepth: accumulator.substitutionDepth + 1,
        pendingDollar: false,
      };
    }
    return tokenizeStep({ ...accumulator, current: accumulator.current + '$', pendingDollar: false }, character);
  }

  if (character === '$') {
    return { ...accumulator, pendingDollar: true };
  }

  if (accumulator.substitutionDepth > 0) {
    if (isQuoteCharacter(character)) {
      return { ...accumulator, quote: character, current: accumulator.current + character };
    }
    if (character === ')') {
      return {
        ...accumulator,
        substitutionDepth: accumulator.substitutionDepth - 1,
        current: accumulator.current + character,
      };
    }
    return { ...accumulator, current: accumulator.current + character };
  }

  if (isQuoteCharacter(character)) {
    return { ...accumulator, quote: character };
  }

  if (character === ' ') {
    if (!accumulator.current.length) return accumulator;
    return {
      tokens: [...accumulator.tokens, accumulator.current],
      current: '',
      quote: null,
      substitutionDepth: 0,
      pendingDollar: false,
    };
  }

  return { ...accumulator, current: accumulator.current + character };
};

const flushCurrentToken = (accumulator: TokenizeAccumulator) => {
  const finalCurrent = accumulator.pendingDollar ? accumulator.current + '$' : accumulator.current;
  if (!finalCurrent.length) return accumulator.tokens;
  return [...accumulator.tokens, finalCurrent];
};

export const tokenize = (input: string) => {
  const initial: TokenizeAccumulator = {
    tokens: [],
    current: '',
    quote: null,
    substitutionDepth: 0,
    pendingDollar: false,
  };
  const final = Array.from(input).reduce(tokenizeStep, initial);
  return flushCurrentToken(final);
};
