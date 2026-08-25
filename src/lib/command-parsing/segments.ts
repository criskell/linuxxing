import type { RawChunk } from './chunks';
import { scanChunks } from './chunks';

export interface CodeSegment {
  operator: string | null;
  text: string;
}

interface SegmentAccumulator {
  segments: CodeSegment[];
  currentOperator: string | null;
  currentText: string;
}

const flushSegment = (accumulator: SegmentAccumulator) => {
  const text = accumulator.currentText.trim();
  if (!text.length) return { ...accumulator, currentText: '' };
  return {
    ...accumulator,
    segments: [...accumulator.segments, { operator: accumulator.currentOperator, text }],
    currentText: '',
  };
};

const splitStep = (accumulator: SegmentAccumulator, chunk: RawChunk) => {
  if (chunk.kind === 'operator') {
    return { ...flushSegment(accumulator), currentOperator: chunk.text };
  }
  return { ...accumulator, currentText: accumulator.currentText + chunk.text };
};

export const splitTopLevel = (code: string) => {
  const initial: SegmentAccumulator = { segments: [], currentOperator: null, currentText: '' };
  const final = scanChunks(code).reduce(splitStep, initial);
  return flushSegment(final).segments;
};
