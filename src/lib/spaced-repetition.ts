export type ReviewGrade = 'again' | 'hard' | 'good' | 'easy';

export interface ReviewState {
  repetition: number;
  intervalDays: number;
  easiness: number;
  dueDate: string;
}

const GRADE_QUALITY: Record<ReviewGrade, number> = {
  again: 0,
  hard: 3,
  good: 4,
  easy: 5,
};

const MINIMUM_EASINESS = 1.3;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

export const createInitialReviewState = (referenceDate: Date = new Date()) => ({
  repetition: 0,
  intervalDays: 0,
  easiness: 2.5,
  dueDate: referenceDate.toISOString(),
});

const nextEasiness = (easiness: number, quality: number) => {
  const adjusted = easiness + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  return Math.max(adjusted, MINIMUM_EASINESS);
};

const addDays = (referenceDate: Date, days: number) => new Date(referenceDate.getTime() + days * MILLISECONDS_PER_DAY);

export const scheduleReview = (state: ReviewState, grade: ReviewGrade, referenceDate: Date = new Date()) => {
  const quality = GRADE_QUALITY[grade];
  const easiness = nextEasiness(state.easiness, quality);

  if (quality < 3) {
    return { repetition: 0, intervalDays: 1, easiness, dueDate: addDays(referenceDate, 1).toISOString() };
  }

  const repetition = state.repetition + 1;
  const intervalDays = repetition === 1 ? 1 : repetition === 2 ? 6 : Math.round(state.intervalDays * easiness);

  return { repetition, intervalDays, easiness, dueDate: addDays(referenceDate, intervalDays).toISOString() };
};

export const isDue = (state: ReviewState | undefined, referenceDate: Date = new Date()) =>
  !state || new Date(state.dueDate).getTime() <= referenceDate.getTime();
