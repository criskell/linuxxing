import type { LabExercise, LabTrack } from './types';
import { filesAndDirectoriesTrack, filesAndDirectoriesExercises } from './files-and-directories';
import { textProcessingTrack, textProcessingExercises } from './text-processing';
import { processesTrack, processesExercises } from './processes';
import { usersAndPermissionsTrack, usersAndPermissionsExercises } from './users-and-permissions';
import { shellAndAutomationTrack, shellAndAutomationExercises } from './shell-and-automation';

export const LAB_TRACKS: LabTrack[] = [
  filesAndDirectoriesTrack,
  textProcessingTrack,
  processesTrack,
  usersAndPermissionsTrack,
  shellAndAutomationTrack,
];

export const LAB_EXERCISES: LabExercise[] = [
  ...filesAndDirectoriesExercises,
  ...textProcessingExercises,
  ...processesExercises,
  ...usersAndPermissionsExercises,
  ...shellAndAutomationExercises,
];
