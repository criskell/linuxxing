import type { LabExercise, LabTrack } from './types';

export const usersAndPermissionsTrack: LabTrack = {
  id: 'users-and-permissions',
  objectiveCode: '104.5, 107.1',
  title: { en: 'Users, groups and permissions', pt: 'Usuários, grupos e permissões' },
};

export const usersAndPermissionsExercises: LabExercise[] = [
  {
    id: 'lock-down-a-secret-file',
    track: 'users-and-permissions',
    title: { en: 'Lock down a secret file', pt: 'Restrinja um arquivo secreto' },
    task: {
      en: 'The file /root/lab/secret.txt holds an API key and anyone on the system can read it. Leave it readable and writable by its owner, and closed to the group and to everyone else.',
      pt: 'O arquivo /root/lab/secret.txt guarda uma chave de API e qualquer um no sistema consegue ler. Deixe ele legível e gravável para o dono, e fechado para o grupo e para os demais.',
    },
    hint: {
      en: 'In octal notation each digit covers one class, owner then group then others. Read counts 4, write counts 2 and execute counts 1, so the digits add up to the permission you want.',
      pt: 'Na notação octal cada dígito cobre uma classe, primeiro o dono, depois o grupo e depois os demais. Leitura vale 4, escrita vale 2 e execução vale 1, então os dígitos somam a permissão desejada.',
    },
    setupCommand:
      'mkdir -p /root/lab; printf "api-key=8f3a9c\\n" > /root/lab/secret.txt; chmod 644 /root/lab/secret.txt',
    checkCommand: '[ "$(ls -ld /root/lab/secret.txt | cut -c1-10)" = "-rw-------" ]',
    solutionCommand: 'chmod 600 /root/lab/secret.txt',
  },
  {
    id: 'create-a-user-and-group',
    track: 'users-and-permissions',
    title: { en: 'Create a user and a group', pt: 'Crie um usuário e um grupo' },
    task: {
      en: 'Create a group named deploy and a user named ana whose primary group is deploy.',
      pt: 'Crie um grupo chamado deploy e um usuário chamado ana cujo grupo primário seja deploy.',
    },
    hint: {
      en: 'The group has to exist before the user can join it, so addgroup runs first. On BusyBox, adduser takes -G for the primary group, -D to leave the password unset and -H to skip creating a home directory.',
      pt: 'O grupo precisa existir antes do usuário entrar nele, então o addgroup vem primeiro. No BusyBox, o adduser recebe -G para o grupo primário, -D para deixar a senha em branco e -H para não criar um diretório home.',
    },
    setupCommand: 'deluser ana 2>/dev/null; delgroup deploy 2>/dev/null; true',
    checkCommand: 'grep -q "^deploy:" /etc/group && id -gn ana | grep -qx deploy',
    solutionCommand: 'addgroup deploy && adduser -D -H -G deploy ana',
  },
  {
    id: 'set-up-a-shared-directory',
    track: 'users-and-permissions',
    title: { en: 'Set up a shared directory', pt: 'Prepare um diretório compartilhado' },
    task: {
      en: 'Hand /root/lab/shared to the user ana and the group deploy, give owner and group full access, keep everyone else out, and make every new file created inside it belong to deploy.',
      pt: 'Entregue /root/lab/shared para a usuária ana e o grupo deploy, dê acesso completo ao dono e ao grupo, mantenha os demais de fora e faça todo arquivo novo criado ali dentro pertencer ao deploy.',
    },
    hint: {
      en: 'chown takes owner and group together in the owner:group form. A four digit mode puts the special bits first, and the setgid bit is what passes the directory group down to new files.',
      pt: 'O chown recebe dono e grupo juntos na forma dono:grupo. Um modo de quatro dígitos coloca os bits especiais na frente, e o bit setgid é o que repassa o grupo do diretório para os arquivos novos.',
    },
    setupCommand:
      'addgroup deploy 2>/dev/null; adduser -D -H -G deploy ana 2>/dev/null; rm -rf /root/lab/shared; mkdir -p /root/lab/shared; true',
    checkCommand:
      '[ "$(ls -ld /root/lab/shared | cut -c1-10)" = "drwxrws---" ] && [ "$(ls -ld /root/lab/shared | awk \'{print $3 $4}\')" = "anadeploy" ]',
    solutionCommand: 'chown ana:deploy /root/lab/shared && chmod 2770 /root/lab/shared',
  },
];
