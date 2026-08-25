import { isQuoteCharacter, indicesOf } from './characters';

const ASSIGNMENT_PATTERN = /^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/;

export const extractAssignment = (token: string) => {
  const match = token.match(ASSIGNMENT_PATTERN);
  return match ? { name: match[1], value: match[2] } : null;
};

const BARE_VARIABLE_PATTERN = /^\$([A-Za-z_][A-Za-z0-9_]*)$/;
const BRACED_VARIABLE_PATTERN = /^\$\{([A-Za-z_][A-Za-z0-9_]*)\}$/;

export const extractVariableExpansion = (token: string) => {
  const bareMatch = token.match(BARE_VARIABLE_PATTERN);
  if (bareMatch) return bareMatch[1];

  const bracedMatch = token.match(BRACED_VARIABLE_PATTERN);
  return bracedMatch ? bracedMatch[1] : null;
};

interface SubstitutionScanAccumulator {
  quote: string | null;
  depth: number;
  closeIndex: number | null;
}

const substitutionScanStep = (accumulator: SubstitutionScanAccumulator, index: number, text: string) => {
  if (accumulator.closeIndex !== null) return accumulator;

  const character = text[index];

  if (accumulator.quote) {
    return character === accumulator.quote ? { ...accumulator, quote: null } : accumulator;
  }

  if (isQuoteCharacter(character)) {
    return { ...accumulator, quote: character };
  }

  if (character === '(') {
    return { ...accumulator, depth: accumulator.depth + 1 };
  }

  if (character === ')') {
    const depth = accumulator.depth - 1;
    return depth === 0 ? { ...accumulator, depth, closeIndex: index } : { ...accumulator, depth };
  }

  return accumulator;
};

export const extractCommandSubstitution = (text: string) => {
  if (!(text.startsWith('$(') && text.endsWith(')'))) return null;

  const initial: SubstitutionScanAccumulator = { quote: null, depth: 1, closeIndex: null };
  const final = indicesOf(text)
    .slice(2)
    .reduce((accumulator, index) => substitutionScanStep(accumulator, index, text), initial);

  if (final.closeIndex === null || final.closeIndex !== text.length - 1) return null;
  return text.slice(2, final.closeIndex);
};
