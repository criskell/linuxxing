import type { LabExercise, LabTrack } from './types';
import { filesAndDirectoriesTrack, filesAndDirectoriesExercises } from './files-and-directories';
import { textProcessingTrack, textProcessingExercises } from './text-processing';
import { processesTrack, processesExercises } from './processes';
import { usersAndPermissionsTrack, usersAndPermissionsExercises } from './users-and-permissions';
import { shellAndAutomationTrack, shellAndAutomationExercises } from './shell-and-automation';
import { systemAndKernelTrack, systemAndKernelExercises } from './system-and-kernel';
import { networkingTrack, networkingExercises } from './networking';
import { archivesAndIntegrityTrack, archivesAndIntegrityExercises } from './archives-and-integrity';
import { filesystemsAndMountsTrack, filesystemsAndMountsExercises } from './filesystems-and-mounts';

export const LAB_TRACKS: LabTrack[] = [
  filesAndDirectoriesTrack,
  textProcessingTrack,
  processesTrack,
  usersAndPermissionsTrack,
  shellAndAutomationTrack,
  systemAndKernelTrack,
  archivesAndIntegrityTrack,
  filesystemsAndMountsTrack,
  networkingTrack,
];

export const LAB_EXERCISES: LabExercise[] = [
  ...filesAndDirectoriesExercises,
  ...textProcessingExercises,
  ...processesExercises,
  ...usersAndPermissionsExercises,
  ...shellAndAutomationExercises,
  ...systemAndKernelExercises,
  ...archivesAndIntegrityExercises,
  ...filesystemsAndMountsExercises,
  ...networkingExercises,
];
