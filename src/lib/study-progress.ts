import type { StudyCard } from './study/types';
import { isDue, type ReviewState } from './spaced-repetition';

const STORAGE_KEY = 'linuxxing:study:v1';

export type StudyProgress = Record<string, ReviewState>;

export const loadProgress = (): StudyProgress => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StudyProgress) : {};
  } catch {
    return {};
  }
};

export const saveProgress = (progress: StudyProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage may be unavailable (private browsing, quota exceeded); progress just won't persist.
  }
};

export const getDueCards = (cards: StudyCard[], progress: StudyProgress, topicId?: string) =>
  cards
    .filter((card) => !topicId || card.topic === topicId)
    .filter((card) => isDue(progress[card.id]));
