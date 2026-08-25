export const isQuoteCharacter = (character: string) => character === '"' || character === "'";

export const indicesOf = (text: string) => Array.from({ length: text.length }, (_, index) => index);

export const WHITESPACE_PATTERN = /\s/;
