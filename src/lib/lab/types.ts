import type { LocalizedText } from '../localized-text';

export interface LabTrack {
  id: string;
  objectiveCode: string;
  title: LocalizedText;
}

export interface LabExercise {
  id: string;
  track: string;
  title: LocalizedText;
  task: LocalizedText;
  hint: LocalizedText;
  setupCommand: string;
  checkCommand: string;
  solutionCommand: string;
}
