import { LAB_TRACKS } from './registry';

const majorObjective = (objectiveCode: string) => objectiveCode.split('.')[0];

export const labTracksForObjective = (objectiveCode: string) => {
  const major = majorObjective(objectiveCode);
  return LAB_TRACKS.filter((track) => track.objectiveCode.split(', ').some((code) => majorObjective(code) === major));
};
