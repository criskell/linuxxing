import { isQuoteCharacter, indicesOf, WHITESPACE_PATTERN } from './characters';

export interface RawChunk {
  text: string;
  kind: 'whitespace' | 'operator' | 'word';
}

const OPERATOR_TOKENS = ['&&', '||', '|', ';'] as const;

const matchOperatorAt = (code: string, index: number) =>
  OPERATOR_TOKENS.find((operator) => code.startsWith(operator, index)) ?? null;

interface ScanAccumulator {
  chunks: RawChunk[];
  currentText: string;
  currentKind: 'whitespace' | 'word' | null;
  quote: string | null;
  skipRemaining: number;
}

const flushRun = (accumulator: ScanAccumulator) => {
  if (!accumulator.currentText) return accumulator;
  return {
    ...accumulator,
    chunks: [...accumulator.chunks, { text: accumulator.currentText, kind: accumulator.currentKind! }],
    currentText: '',
    currentKind: null,
  };
};

const openRun = (accumulator: ScanAccumulator, kind: 'whitespace' | 'word') => {
  if (accumulator.currentKind === kind) return accumulator;
  return { ...flushRun(accumulator), currentKind: kind };
};

const scanStep = (accumulator: ScanAccumulator, index: number, code: string) => {
  if (accumulator.skipRemaining > 0) {
    return { ...accumulator, skipRemaining: accumulator.skipRemaining - 1 };
  }

  const character = code[index];

  if (accumulator.quote) {
    const closesQuote = character === accumulator.quote;
    return {
      ...accumulator,
      quote: closesQuote ? null : accumulator.quote,
      currentText: accumulator.currentText + character,
    };
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
      chunks: [...flushed.chunks, { text: operator, kind: 'operator' as const }],
      skipRemaining: operator.length - 1,
    };
  }

  if (WHITESPACE_PATTERN.test(character)) {
    const opened = openRun(accumulator, 'whitespace');
    return { ...opened, currentText: opened.currentText + character };
  }

  const opened = openRun(accumulator, 'word');
  return { ...opened, currentText: opened.currentText + character };
};

export const scanChunks = (code: string) => {
  const initial: ScanAccumulator = { chunks: [], currentText: '', currentKind: null, quote: null, skipRemaining: 0 };
  const final = indicesOf(code).reduce((accumulator, index) => scanStep(accumulator, index, code), initial);
  return flushRun(final).chunks;
};
