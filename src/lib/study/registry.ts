import type { StudyCard, StudyTopic } from './types';
import { systemArchitectureTopic, systemArchitectureCards } from './system-architecture';
import { packageManagementTopic, packageManagementCards } from './package-management';
import { gnuUnixCommandsTopic, gnuUnixCommandsCards } from './gnu-unix-commands';
import { devicesFilesystemsTopic, devicesFilesystemsCards } from './devices-filesystems';
import { shellsScriptingTopic, shellsScriptingCards } from './shells-scripting';
import { userInterfacesTopic, userInterfacesCards } from './user-interfaces';
import { administrativeTasksTopic, administrativeTasksCards } from './administrative-tasks';
import { systemServicesTopic, systemServicesCards } from './system-services';
import { networkingTopic, networkingCards } from './networking';
import { securityTopic, securityCards } from './security';

export const STUDY_TOPICS: StudyTopic[] = [
  systemArchitectureTopic,
  packageManagementTopic,
  gnuUnixCommandsTopic,
  devicesFilesystemsTopic,
  shellsScriptingTopic,
  userInterfacesTopic,
  administrativeTasksTopic,
  systemServicesTopic,
  networkingTopic,
  securityTopic,
];

export const STUDY_CARDS: StudyCard[] = [
  ...systemArchitectureCards,
  ...packageManagementCards,
  ...gnuUnixCommandsCards,
  ...devicesFilesystemsCards,
  ...shellsScriptingCards,
  ...userInterfacesCards,
  ...administrativeTasksCards,
  ...systemServicesCards,
  ...networkingCards,
  ...securityCards,
];
