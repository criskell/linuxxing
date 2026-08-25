import type { LocalizedText } from '../localized-text';
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

export interface CommandCategory {
  id: string;
  title: LocalizedText;
  commands: string[];
}

export const COMMAND_CATEGORIES: CommandCategory[] = [
  {
    id: 'file-operations',
    title: { en: 'File Operations', pt: 'Operações com Arquivos' },
    commands: Object.keys(fileOperations),
  },
  {
    id: 'permissions-users',
    title: { en: 'Permissions and Users', pt: 'Permissões e Usuários' },
    commands: Object.keys(permissionsUsers),
  },
  {
    id: 'process-system',
    title: { en: 'Processes and System', pt: 'Processos e Sistema' },
    commands: Object.keys(processSystem),
  },
  {
    id: 'networking',
    title: { en: 'Networking', pt: 'Redes' },
    commands: Object.keys(networking),
  },
  {
    id: 'package-managers',
    title: { en: 'Package Managers', pt: 'Gerenciadores de Pacotes' },
    commands: [...Object.keys(packageManagers), 'apt-get'],
  },
  {
    id: 'development-tools',
    title: { en: 'Development Tools', pt: 'Ferramentas de Desenvolvimento' },
    commands: Object.keys(developmentTools),
  },
  {
    id: 'shell-builtins',
    title: { en: 'Shell Builtins', pt: 'Comandos Internos do Shell' },
    commands: Object.keys(shellBuiltins),
  },
  {
    id: 'archives-hashing',
    title: { en: 'Archives and Hashing', pt: 'Arquivos Compactados e Hash' },
    commands: Object.keys(archivesHashing),
  },
  {
    id: 'system-info',
    title: { en: 'System Information', pt: 'Informações do Sistema' },
    commands: [...Object.keys(systemInfo), 'systemd'],
  },
];
