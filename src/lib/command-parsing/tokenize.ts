import { isQuoteCharacter } from './characters';

interface TokenizeAccumulator {
  tokens: string[];
  current: string;
  quote: string | null;
}

const tokenizeStep = (accumulator: TokenizeAccumulator, character: string) => {
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
};

const flushCurrentToken = (accumulator: TokenizeAccumulator) => {
  if (!accumulator.current.length) return accumulator.tokens;
  return [...accumulator.tokens, accumulator.current];
};

export const tokenize = (input: string) => {
  const initial: TokenizeAccumulator = { tokens: [], current: '', quote: null };
  const final = Array.from(input).reduce(tokenizeStep, initial);
  return flushCurrentToken(final);
};
