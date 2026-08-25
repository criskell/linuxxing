import type { CommandKB } from './types';
import { fileOperations } from './file-operations';
import { permissionsUsers } from './permissions-users';
import { processSystem } from './process-system';
import { networking } from './networking';
import { packageManagers } from './package-managers';
import { developmentTools } from './development-tools';
import { shellBuiltins } from './shell-builtins';
import { archivesHashing } from './archives-hashing';
import { systemInfo } from './system-info';

export type { LocalizedText, ValueKind, CommandDef, CommandKB } from './types';

export const COMMANDS: CommandKB = {
  ...fileOperations,
  ...permissionsUsers,
  ...processSystem,
  ...networking,
  ...packageManagers,
  ...developmentTools,
  ...shellBuiltins,
  ...archivesHashing,
  ...systemInfo,
};

COMMANDS['apt-get'] = COMMANDS.apt;
COMMANDS['systemd'] = {
  ...COMMANDS.systemctl,
  desc: {
    en: "systemd is the init system and service manager. The command used to control it day-to-day is 'systemctl'. If you typed 'systemd' directly, you probably meant 'systemctl'.",
    pt: "systemd é o sistema de inicialização e gerenciador de serviços. O comando usado para controlá-lo no dia a dia é 'systemctl'. Se você digitou 'systemd' diretamente, provavelmente queria dizer 'systemctl'.",
  },
};
