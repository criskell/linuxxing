import type { LabExercise, LabTrack } from './types';

export const filesystemsAndMountsTrack: LabTrack = {
  id: 'filesystems-and-mounts',
  objectiveCode: '104.1, 104.3',
  title: { en: 'Filesystems and mounts', pt: 'Sistemas de arquivos e montagens' },
};

export const filesystemsAndMountsExercises: LabExercise[] = [
  {
    id: 'mount-a-memory-filesystem',
    track: 'filesystems-and-mounts',
    title: { en: 'Mount a filesystem in memory', pt: 'Monte um sistema de arquivos em memória' },
    task: {
      en: 'Mount a tmpfs on /mnt/scratch, which already exists, limited to 8 megabytes, and prove it works by creating a file inside it.',
      pt: 'Monte um tmpfs em /mnt/scratch, que já existe, limitado a 8 megabytes, e prove que funciona criando um arquivo lá dentro.',
    },
    hint: {
      en: 'mount takes the type after -t and the mount options after -o, with size accepting a suffix like m. A tmpfs needs no device, so any word can sit in the device position.',
      pt: 'O mount recebe o tipo depois do -t e as opções depois do -o, com o size aceitando um sufixo como m. Um tmpfs não precisa de dispositivo, então qualquer palavra serve na posição dele.',
    },
    setupCommand: 'umount /mnt/scratch 2>/dev/null; rm -rf /mnt/scratch; mkdir -p /mnt/scratch; true',
    checks: [
      {
        label: { en: '/mnt/scratch is a mounted tmpfs', pt: '/mnt/scratch é um tmpfs montado' },
        command: 'grep -q " /mnt/scratch tmpfs " /proc/mounts',
      },
      {
        label: { en: 'the size limit is 8 megabytes', pt: 'o limite de tamanho é 8 megabytes' },
        command: 'grep " /mnt/scratch tmpfs " /proc/mounts | grep -q "size=8192k"',
      },
      {
        label: { en: 'a file can be written inside it', pt: 'dá para escrever um arquivo lá dentro' },
        command: '[ -n "$(ls -A /mnt/scratch)" ]',
      },
    ],
    solutionCommand: 'mount -t tmpfs -o size=8m tmpfs /mnt/scratch && touch /mnt/scratch/hello',
  },
  {
    id: 'unmount-a-filesystem',
    track: 'filesystems-and-mounts',
    title: { en: 'Unmount a filesystem', pt: 'Desmonte um sistema de arquivos' },
    task: {
      en: 'A tmpfs is mounted on /mnt/scratch and holds a file. Detach it so the kernel no longer lists the mount, leaving the empty directory /mnt/scratch behind.',
      pt: 'Um tmpfs está montado em /mnt/scratch e guarda um arquivo. Desconecte ele para que o kernel não liste mais a montagem, deixando o diretório vazio /mnt/scratch para trás.',
    },
    hint: {
      en: 'umount takes the mount point and detaches whatever is mounted there, and the files stored in a tmpfs vanish with it because they only lived in memory. The directory that served as mount point stays.',
      pt: 'O umount recebe o ponto de montagem e desconecta o que estiver ali, e os arquivos guardados em um tmpfs somem junto porque só viviam em memória. O diretório que serviu de ponto de montagem fica.',
    },
    setupCommand:
      'umount /mnt/scratch 2>/dev/null; mkdir -p /mnt/scratch; mount -t tmpfs -o size=8m tmpfs /mnt/scratch; touch /mnt/scratch/data.bin; true',
    checks: [
      {
        label: { en: 'the kernel no longer lists the mount', pt: 'o kernel não lista mais a montagem' },
        command: '! grep -q " /mnt/scratch " /proc/mounts',
      },
      {
        label: { en: 'the directory is still there and empty', pt: 'o diretório continua lá e vazio' },
        command: '[ -d /mnt/scratch ] && [ -z "$(ls -A /mnt/scratch)" ]',
      },
    ],
    solutionCommand: 'umount /mnt/scratch',
  },
  {
    id: 'bind-a-directory-somewhere-else',
    track: 'filesystems-and-mounts',
    title: { en: 'Show one directory in two places', pt: 'Mostre um diretório em dois lugares' },
    task: {
      en: 'Make the content of /root/lab/data appear at /mnt/data as well, without copying anything, so a file created on one side shows up immediately on the other.',
      pt: 'Faça o conteúdo de /root/lab/data aparecer também em /mnt/data, sem copiar nada, de modo que um arquivo criado de um lado apareça na hora do outro.',
    },
    hint: {
      en: 'A bind mount attaches a directory that already exists at a second point in the tree, and mount takes --bind with the source and the target. Both names then reach the very same files.',
      pt: 'Uma montagem bind liga um diretório que já existe a um segundo ponto da árvore, e o mount recebe o --bind com a origem e o destino. Os dois nomes passam a alcançar exatamente os mesmos arquivos.',
    },
    setupCommand:
      'umount /mnt/data 2>/dev/null; rm -rf /root/lab/data; mkdir -p /root/lab/data /mnt/data; printf "shared\\n" > /root/lab/data/note.txt; true',
    checks: [
      {
        label: { en: 'the kernel lists /mnt/data as a mount', pt: 'o kernel lista /mnt/data como montagem' },
        command: 'grep -q " /mnt/data " /proc/mounts',
      },
      {
        label: { en: 'the note is visible through /mnt/data', pt: 'a nota é visível por /mnt/data' },
        command: 'grep -qx shared /mnt/data/note.txt',
      },
      {
        label: {
          en: 'a file created on one side appears on the other',
          pt: 'um arquivo criado de um lado aparece do outro',
        },
        command: 'touch /root/lab/data/probe && [ -e /mnt/data/probe ] && rm -f /root/lab/data/probe',
      },
    ],
    solutionCommand: 'mount --bind /root/lab/data /mnt/data',
  },
  {
    id: 'write-an-fstab-entry',
    track: 'filesystems-and-mounts',
    title: { en: 'Describe a mount in /etc/fstab', pt: 'Descreva uma montagem no /etc/fstab' },
    task: {
      en: 'Add a line to /etc/fstab describing a tmpfs mounted on /mnt/scratch with the option size=8m, no dump and no filesystem check, keeping every line that was already there.',
      pt: 'Acrescente ao /etc/fstab uma linha descrevendo um tmpfs montado em /mnt/scratch com a opção size=8m, sem dump e sem checagem de sistema de arquivos. Mantenha todas as linhas que já estavam lá.',
    },
    hint: {
      en: 'Each line of /etc/fstab carries six fields, the device, the mount point, the type, the options, the dump number and the pass number, separated by spaces or tabs. A zero in the last two fields turns both off.',
      pt: 'Cada linha do /etc/fstab carrega seis campos, o dispositivo, o ponto de montagem, o tipo, as opções, o número de dump e o número de checagem, separados por espaços ou tabulações. Um zero nos dois últimos campos desliga ambos.',
    },
    setupCommand: 'sed -i "/mnt\\/scratch/d" /etc/fstab; mkdir -p /mnt/scratch; true',
    checks: [
      {
        label: { en: 'a line describes the scratch mount', pt: 'uma linha descreve a montagem scratch' },
        command:
          'awk \'$2 == "/mnt/scratch" && $3 == "tmpfs" && $5 == "0" && $6 == "0" {found = 1} END {exit !found}\' /etc/fstab',
      },
      {
        label: { en: 'the options carry size=8m', pt: 'as opções trazem size=8m' },
        command: 'awk \'$2 == "/mnt/scratch" {print $4}\' /etc/fstab | grep -q "size=8m"',
      },
      {
        label: { en: 'the comment header survived', pt: 'o cabeçalho de comentário sobreviveu' },
        command: 'grep -q "^# <file system>" /etc/fstab',
      },
    ],
    solutionCommand: 'printf "tmpfs\\t/mnt/scratch\\ttmpfs\\tsize=8m\\t0\\t0\\n" >> /etc/fstab',
  },
  {
    id: 'count-the-hard-links',
    track: 'filesystems-and-mounts',
    title: { en: 'Give an inode three names', pt: 'Dê três nomes a um inode' },
    task: {
      en: 'The file /root/lab/data/report.txt has one name today. Give the same inode two more names in the same directory, backup.txt and copy.txt, so the link count reported by ls reaches three.',
      pt: 'O arquivo /root/lab/data/report.txt tem um nome hoje. Dê ao mesmo inode mais dois nomes no mesmo diretório, backup.txt e copy.txt, de modo que a contagem de links informada pelo ls chegue a três.',
    },
    hint: {
      en: 'ln without -s creates another name for the same inode, and the second column of ls -l counts how many names an inode has. Copying with cp would raise the count nowhere, since it makes a new inode.',
      pt: 'O ln sem o -s cria outro nome para o mesmo inode, e a segunda coluna do ls -l conta quantos nomes um inode tem. Copiar com cp não aumentaria nada, já que cria um inode novo.',
    },
    setupCommand:
      'rm -rf /root/lab/data; mkdir -p /root/lab/data; printf "quarterly report\\n" > /root/lab/data/report.txt',
    checks: [
      {
        label: { en: 'the link count is three', pt: 'a contagem de links é três' },
        command: '[ "$(ls -l /root/lab/data/report.txt | awk \'{print $2}\')" = "3" ]',
      },
      {
        label: {
          en: 'the three names share one inode',
          pt: 'os três nomes dividem um inode',
        },
        command:
          '[ "$(ls -i /root/lab/data/report.txt /root/lab/data/backup.txt /root/lab/data/copy.txt | awk \'{print $1}\' | sort -u | wc -l)" = "1" ]',
      },
    ],
    solutionCommand:
      'ln /root/lab/data/report.txt /root/lab/data/backup.txt && ln /root/lab/data/report.txt /root/lab/data/copy.txt',
  },
  {
    id: 'send-data-through-a-named-pipe',
    track: 'filesystems-and-mounts',
    title: { en: 'Send data through a named pipe', pt: 'Mande dados por um pipe nomeado' },
    task: {
      en: 'Create the named pipe /root/lab/queue, then send the word delivered through it so that a reader writes it into /root/lab/received.txt. Start the reader in the background before writing, because a pipe blocks until both ends are open.',
      pt: 'Crie o pipe nomeado /root/lab/queue e mande a palavra delivered por ele, de modo que um leitor escreva isso em /root/lab/received.txt. Inicie o leitor em segundo plano antes de escrever, porque um pipe bloqueia até as duas pontas estarem abertas.',
    },
    hint: {
      en: 'mkfifo creates a file that lives in the filesystem and carries bytes instead of storing them, and ls shows it with a p in the first column. Redirecting cat from the pipe in the background opens the reading end.',
      pt: 'O mkfifo cria um arquivo que vive no sistema de arquivos e carrega bytes em vez de guardar, e o ls mostra ele com um p na primeira coluna. Redirecionar o cat a partir do pipe em segundo plano abre a ponta de leitura.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/queue /root/lab/received.txt; true',
    checks: [
      {
        label: { en: '/root/lab/queue is a named pipe', pt: '/root/lab/queue é um pipe nomeado' },
        command: '[ -p /root/lab/queue ]',
      },
      {
        label: { en: 'the word came out on the other side', pt: 'a palavra saiu do outro lado' },
        command: 'grep -qx delivered /root/lab/received.txt',
      },
    ],
    solutionCommand:
      'mkfifo /root/lab/queue && (cat /root/lab/queue > /root/lab/received.txt &) && echo delivered > /root/lab/queue && sleep 1',
  },
];
