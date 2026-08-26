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
    checks: [
      {
        label: { en: 'the owner still reads and writes it', pt: 'o dono ainda lê e escreve nele' },
        command: '[ "$(ls -ld /root/lab/secret.txt | cut -c2-4)" = "rw-" ]',
      },
      {
        label: { en: 'the group and the others got nothing', pt: 'o grupo e os outros ficaram sem nada' },
        command: '[ "$(ls -ld /root/lab/secret.txt | cut -c5-10)" = "------" ]',
      },
    ],
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
    checks: [
      {
        label: { en: 'the group deploy is in /etc/group', pt: 'o grupo deploy está no /etc/group' },
        command: 'grep -q "^deploy:" /etc/group',
      },
      {
        label: { en: 'the user ana is in /etc/passwd', pt: 'a usuária ana está no /etc/passwd' },
        command: 'grep -q "^ana:" /etc/passwd',
      },
      {
        label: { en: 'the primary group of ana is deploy', pt: 'o grupo primário de ana é deploy' },
        command: 'id -gn ana | grep -qx deploy',
      },
    ],
    solutionCommand: 'addgroup deploy && adduser -D -H -G deploy ana',
  },
  {
    id: 'use-symbolic-permissions',
    track: 'users-and-permissions',
    title: { en: 'Adjust permissions symbolically', pt: 'Ajuste permissões pela forma simbólica' },
    task: {
      en: 'The script /root/lab/deploy.sh comes as rw-r-----. Let the group run it and take the write permission away from the owner, leaving what the others can do exactly as it is. Change only the bits you were asked to change.',
      pt: 'O script /root/lab/deploy.sh vem como rw-r-----. Deixe o grupo executar ele e tire a permissão de escrita do dono, mantendo o que os outros podem fazer exatamente como está. Mexa só nos bits que foram pedidos.',
    },
    hint: {
      en: 'The symbolic form of chmod names the class, the operation and the permission, as in g+r. Several changes fit in one call when a comma separates them, and every bit you did not name stays where it was.',
      pt: 'A forma simbólica do chmod nomeia a classe, a operação e a permissão, como em g+r. Várias mudanças cabem em uma chamada quando uma vírgula separa elas, e todo bit que você não nomeou fica como estava.',
    },
    setupCommand:
      'mkdir -p /root/lab; printf "#!/bin/sh\\necho deploying\\n" > /root/lab/deploy.sh; chmod 640 /root/lab/deploy.sh',
    checks: [
      {
        label: { en: 'the owner reads but no longer writes', pt: 'o dono lê mas não escreve mais' },
        command: '[ "$(ls -ld /root/lab/deploy.sh | cut -c2-4)" = "r--" ]',
      },
      {
        label: { en: 'the group reads and runs it', pt: 'o grupo lê e executa ele' },
        command: '[ "$(ls -ld /root/lab/deploy.sh | cut -c5-7)" = "r-x" ]',
      },
      {
        label: { en: 'the others were left as they were', pt: 'os outros ficaram como estavam' },
        command: '[ "$(ls -ld /root/lab/deploy.sh | cut -c8-10)" = "---" ]',
      },
    ],
    solutionCommand: 'chmod u-w,g+x /root/lab/deploy.sh',
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
    checks: [
      {
        label: { en: 'ana owns it and deploy is its group', pt: 'ana é a dona e deploy é o grupo dele' },
        command: '[ "$(ls -ld /root/lab/shared | awk \'{print $3 $4}\')" = "anadeploy" ]',
      },
      {
        label: { en: 'owner and group have full access', pt: 'dono e grupo têm acesso completo' },
        command: '[ "$(ls -ld /root/lab/shared | cut -c2-7)" = "rwxrws" ]',
      },
      {
        label: { en: 'the others were left out', pt: 'os outros ficaram de fora' },
        command: '[ "$(ls -ld /root/lab/shared | cut -c8-10)" = "---" ]',
      },
    ],
    solutionCommand: 'chown ana:deploy /root/lab/shared && chmod 2770 /root/lab/shared',
  },
];
