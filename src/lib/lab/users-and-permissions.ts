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
    id: 'set-the-umask',
    track: 'users-and-permissions',
    title: { en: 'Decide the mode of new files', pt: 'Decida o modo dos arquivos novos' },
    task: {
      en: 'Change the mask of this shell so that files created from now on come out readable and writable by the owner, readable by the group and closed to everyone else. Then create /root/lab/fresh.txt to prove the mask is doing its job.',
      pt: 'Mude a máscara deste shell para que os arquivos criados de agora em diante saiam legíveis e graváveis pelo dono, legíveis pelo grupo e fechados para os demais. Depois crie /root/lab/fresh.txt para provar que a máscara está funcionando.',
    },
    hint: {
      en: 'umask holds the bits the kernel takes away from the default 666 of a new file. Subtracting the mode you want from 666 gives the three digits to pass, and umask without arguments prints what is set.',
      pt: 'O umask guarda os bits que o kernel tira do padrão 666 de um arquivo novo. Subtrair o modo desejado de 666 dá os três dígitos a passar, e o umask sem argumentos imprime o que está valendo.',
    },
    setupCommand: 'umask 022; mkdir -p /root/lab; rm -f /root/lab/fresh.txt',
    checks: [
      {
        label: { en: 'the mask of this shell is 027', pt: 'a máscara deste shell é 027' },
        command: '[ "$(umask)" = "0027" ]',
      },
      {
        label: { en: 'fresh.txt came out as rw-r-----', pt: 'fresh.txt saiu como rw-r-----' },
        command: '[ "$(ls -ld /root/lab/fresh.txt | cut -c2-10)" = "rw-r-----" ]',
      },
    ],
    solutionCommand: 'umask 027 && touch /root/lab/fresh.txt',
  },
  {
    id: 'protect-a-drop-directory',
    track: 'users-and-permissions',
    title: { en: 'Protect a drop directory', pt: 'Proteja um diretório de entrega' },
    task: {
      en: 'Everyone on the machine has to be able to write into /root/lab/dropbox, and still nobody except the owner of a file may delete it. Set the directory up that way.',
      pt: 'Todo mundo na máquina precisa poder escrever em /root/lab/dropbox, e ainda assim ninguém além do dono de um arquivo pode apagar ele. Configure o diretório desse jeito.',
    },
    hint: {
      en: 'Full access for all three classes is 777, which alone would let anyone delete anyone else files. The sticky bit, the leading 1 in a four digit mode, is what restricts deletion to the owner of each file, and ls shows it as a t at the end.',
      pt: 'Acesso completo para as três classes é 777, o que sozinho deixaria qualquer um apagar arquivo dos outros. O sticky bit, o 1 na frente de um modo de quatro dígitos, é o que restringe a remoção ao dono de cada arquivo, e o ls mostra ele como um t no final.',
    },
    setupCommand: 'rm -rf /root/lab/dropbox; mkdir -p /root/lab/dropbox; chmod 755 /root/lab/dropbox',
    checks: [
      {
        label: { en: 'the three classes can write', pt: 'as três classes podem escrever' },
        command: '[ "$(ls -ld /root/lab/dropbox | cut -c2-9)" = "rwxrwxrw" ]',
      },
      {
        label: { en: 'the sticky bit is on', pt: 'o sticky bit está ligado' },
        command: '[ "$(ls -ld /root/lab/dropbox | cut -c10)" = "t" ]',
      },
    ],
    solutionCommand: 'chmod 1777 /root/lab/dropbox',
  },
  {
    id: 'write-a-file-as-another-user',
    track: 'users-and-permissions',
    title: { en: 'Write a file as another user', pt: 'Escreva um arquivo como outro usuário' },
    task: {
      en: 'The user bruno already exists and /root/lab/incoming is open to everyone. Create /root/lab/incoming/hello.txt so that bruno, and not root, owns the file, without logging out of this shell.',
      pt: 'O usuário bruno já existe e /root/lab/incoming está aberto para todos. Crie /root/lab/incoming/hello.txt de modo que o dono do arquivo seja bruno, e não o root, sem sair deste shell.',
    },
    hint: {
      en: 'su runs a command as another account when you pass -c, and -s picks the shell to use, which matters because bruno has no login shell of his own. The file inherits the identity of whoever ran the command that created it.',
      pt: 'O su roda um comando como outra conta quando você passa o -c, e o -s escolhe o shell a usar, o que importa porque bruno não tem um shell de login próprio. O arquivo herda a identidade de quem rodou o comando que criou ele.',
    },
    setupCommand:
      'adduser -D -H bruno 2>/dev/null; rm -rf /root/lab/incoming; mkdir -p /root/lab/incoming; chmod 777 /root/lab/incoming; chmod 755 /root /root/lab; true',
    checks: [
      {
        label: { en: 'hello.txt exists', pt: 'hello.txt existe' },
        command: '[ -f /root/lab/incoming/hello.txt ]',
      },
      {
        label: { en: 'bruno owns it', pt: 'o dono dele é bruno' },
        command: '[ "$(ls -ld /root/lab/incoming/hello.txt | awk \'{print $3}\')" = "bruno" ]',
      },
    ],
    solutionCommand: 'su -s /bin/sh -c "touch /root/lab/incoming/hello.txt" bruno',
  },
  {
    id: 'hand-over-a-whole-tree',
    track: 'users-and-permissions',
    title: { en: 'Hand over a whole tree', pt: 'Entregue uma árvore inteira' },
    task: {
      en: 'The directory /root/lab/app and everything inside it, at every level, has to belong to ana and to the group deploy. Change all of it with one command.',
      pt: 'O diretório /root/lab/app e tudo que está dentro dele, em todos os níveis, precisa pertencer a ana e ao grupo deploy. Mude tudo com um comando só.',
    },
    hint: {
      en: 'chown walks into subdirectories when it gets -R, and the owner:group form sets both at once. Without -R it would touch only the directory itself and leave the files inside as they were.',
      pt: 'O chown entra nos subdiretórios quando recebe o -R, e a forma dono:grupo define os dois de uma vez. Sem o -R ele mexeria só no diretório em si e deixaria os arquivos de dentro como estavam.',
    },
    setupCommand:
      'addgroup deploy 2>/dev/null; adduser -D -H -G deploy ana 2>/dev/null; rm -rf /root/lab/app; mkdir -p /root/lab/app/bin /root/lab/app/etc; touch /root/lab/app/bin/run /root/lab/app/etc/app.conf /root/lab/app/README; true',
    checks: [
      {
        label: { en: 'the top directory belongs to ana and deploy', pt: 'o diretório de cima pertence a ana e deploy' },
        command: '[ "$(ls -ld /root/lab/app | awk \'{print $3 $4}\')" = "anadeploy" ]',
      },
      {
        label: { en: 'nothing inside is still owned by root', pt: 'nada lá dentro ainda é do root' },
        command: '[ -z "$(find /root/lab/app -user root)" ]',
      },
      {
        label: { en: 'the deepest files carry the group too', pt: 'os arquivos mais fundos carregam o grupo também' },
        command: '[ -z "$(find /root/lab/app ! -group deploy)" ]',
      },
    ],
    solutionCommand: 'chown -R ana:deploy /root/lab/app',
  },
  {
    id: 'list-what-a-user-owns',
    track: 'users-and-permissions',
    title: { en: 'List what a user owns', pt: 'Liste o que um usuário tem' },
    task: {
      en: 'Under /root/lab/mixed some files belong to ana and the rest to root. Write the path of every file owned by ana into /root/lab/ana-files.txt, sorted, with the ones owned by root left out.',
      pt: 'Dentro de /root/lab/mixed alguns arquivos são da ana e o resto do root. Escreva o caminho de cada arquivo que pertence a ana em /root/lab/ana-files.txt, ordenado, deixando de fora os que são do root.',
    },
    hint: {
      en: 'find compares the owner of each entry with -user, taking either the name or the numeric identifier. Combining it with -type f keeps directories out of the result.',
      pt: 'O find compara o dono de cada entrada com o -user, aceitando tanto o nome quanto o identificador numérico. Combinar com -type f mantém os diretórios fora do resultado.',
    },
    setupCommand:
      'addgroup deploy 2>/dev/null; adduser -D -H -G deploy ana 2>/dev/null; rm -rf /root/lab/mixed /root/lab/ana-files.txt; mkdir -p /root/lab/mixed/sub; touch /root/lab/mixed/one.txt /root/lab/mixed/two.txt /root/lab/mixed/sub/three.txt /root/lab/mixed/sub/four.txt; chown ana /root/lab/mixed/one.txt /root/lab/mixed/sub/three.txt; true',
    checks: [
      {
        label: { en: 'ana-files.txt exists', pt: 'ana-files.txt existe' },
        command: '[ -f /root/lab/ana-files.txt ]',
      },
      {
        label: { en: 'it lists exactly the two files ana owns', pt: 'ele lista exatamente os dois arquivos da ana' },
        command: 'find /root/lab/mixed -type f -user ana | sort | diff - /root/lab/ana-files.txt',
      },
    ],
    solutionCommand: 'find /root/lab/mixed -type f -user ana | sort > /root/lab/ana-files.txt',
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
