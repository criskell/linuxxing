import { isQuoteCharacter } from './characters';

interface StripQuotesAccumulator {
  result: string;
  quote: string | null;
}

const stripQuotesStep = (accumulator: StripQuotesAccumulator, character: string) => {
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
};

export const stripQuotesForClassification = (word: string) => {
  const initial: StripQuotesAccumulator = { result: '', quote: null };
  return Array.from(word).reduce(stripQuotesStep, initial).result;
};
