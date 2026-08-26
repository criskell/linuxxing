import type { LocalizedText } from '../localized-text';

export interface StudyTopic {
  id: string;
  objectiveCode: string;
  title: LocalizedText;
}

export interface StudyCard {
  id: string;
  topic: string;
  front: LocalizedText;
  back: LocalizedText;
  details: LocalizedText;
  keyPoints: LocalizedText[];
  commands: string[];
}
