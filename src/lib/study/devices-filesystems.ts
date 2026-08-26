import type { StudyCard, StudyTopic } from './types';

export const devicesFilesystemsTopic: StudyTopic = {
  id: 'devices-filesystems',
  objectiveCode: '104',
  title: { en: 'Devices, Filesystems and the FHS', pt: 'Dispositivos, Sistemas de Arquivos e o FHS' },
};

export const devicesFilesystemsCards: StudyCard[] = [
  {
    id: 'what-is-a-filesystem',
    topic: 'devices-filesystems',
    front: { en: 'What is a filesystem?', pt: 'O que é um sistema de arquivos?' },
    back: {
      en: 'A filesystem is the scheme a storage device uses to organize data into named files and directories, and to track which blocks of the disk belong to which file. Linux supports many filesystem types (ext4, xfs, btrfs, and others), each with different trade-offs around performance, journaling, and the maximum file or volume size supported.',
      pt: 'Um sistema de arquivos é o esquema que um dispositivo de armazenamento usa para organizar dados em arquivos e diretórios nomeados, e para rastrear quais blocos do disco pertencem a qual arquivo. O Linux suporta muitos tipos de sistema de arquivos (ext4, xfs, btrfs, entre outros), cada um com diferentes trocas entre desempenho, journaling, e o tamanho máximo de arquivo ou volume suportado.',
    },
    details: {
      en: 'The type you pick decides what the disk can promise. A journalling filesystem such as ext4 or xfs records what it is about to do before doing it, so a power cut leaves a recoverable state instead of a scrambled directory. Formatting writes a fresh empty structure and destroys whatever was there, and the label or UUID written at that moment is what fstab should reference, because device names like /dev/sdb can move between boots.',
      pt: 'O tipo que você escolhe decide o que o disco consegue prometer. Um sistema de arquivos com journal como ext4 ou xfs registra o que vai fazer antes de fazer, então uma queda de energia deixa um estado recuperável em vez de um diretório embaralhado. Formatar escreve uma estrutura nova e vazia e destrói o que estava lá, e o rótulo ou UUID gravado nesse momento é o que o fstab deve referenciar, porque nomes como /dev/sdb mudam entre boots.',
    },
    keyPoints: [
      {
        en: 'A UUID identifies a filesystem no matter which port the disk sits on, which is why fstab prefers it to /dev names.',
        pt: 'Um UUID identifica um sistema de arquivos não importa em que porta o disco esteja, e é por isso que o fstab prefere ele aos nomes em /dev.',
      },
      {
        en: 'Swap is not a filesystem you browse, it is a signed area the kernel uses to move memory pages out of RAM.',
        pt: 'Swap não é um sistema de arquivos que se navega, é uma área assinada que o kernel usa para mover páginas de memória para fora da RAM.',
      },
      {
        en: 'A full inode table stops file creation even when df reports free space, and df -i is what shows it.',
        pt: 'Uma tabela de inodes cheia impede criar arquivos mesmo com o df informando espaço livre, e o df -i é o que mostra isso.',
      },
    ],
    commands: ['mkfs', 'df', 'du', 'lsblk', 'mkswap'],
  },
  {
    id: 'mounting',
    topic: 'devices-filesystems',
    front: { en: 'What does mounting a filesystem mean?', pt: 'O que significa montar um sistema de arquivos?' },
    back: {
      en: "Mounting attaches a filesystem (from a disk partition, a USB drive, a network share, and so on) to a specific directory in the existing directory tree, called the mount point, making its contents accessible at that path. The mount command does this manually, and /etc/fstab lists filesystems that should be mounted automatically at boot, unlike Windows' separate drive letters, Linux presents everything under one unified tree.",
      pt: 'Montar anexa um sistema de arquivos (de uma partição de disco, um pendrive USB, um compartilhamento de rede, e assim por diante) a um diretório específico na árvore de diretórios existente, chamado ponto de montagem, tornando seu conteúdo acessível naquele caminho. O comando mount faz isso manualmente, e o /etc/fstab lista sistemas de arquivos que devem ser montados automaticamente no boot, diferente das letras de unidade separadas do Windows, o Linux apresenta tudo sob uma única árvore unificada.',
    },
    details: {
      en: 'Mounting attaches a filesystem to a directory, and whatever was already inside that directory disappears from view until you unmount, which explains a mount that seems to have eaten files. The kernel lists what is mounted in /proc/mounts, /etc/fstab describes what should be mounted at boot in six fields, and a busy filesystem refuses to unmount until the process holding it lets go.',
      pt: 'Montar liga um sistema de arquivos a um diretório, e o que já estava dentro desse diretório some da vista até você desmontar, o que explica uma montagem que parece ter comido arquivos. O kernel lista o que está montado em /proc/mounts, o /etc/fstab descreve o que deve ser montado no boot em seis campos, e um sistema de arquivos ocupado se recusa a desmontar até o processo que segura ele soltar.',
    },
    keyPoints: [
      {
        en: 'Each fstab line carries device, mount point, type, options, dump and pass, in that order.',
        pt: 'Cada linha do fstab traz dispositivo, ponto de montagem, tipo, opções, dump e pass, nessa ordem.',
      },
      {
        en: 'fuser and lsof name the process that keeps a filesystem busy when umount refuses to work.',
        pt: 'O fuser e o lsof nomeiam o processo que mantém um sistema de arquivos ocupado quando o umount se recusa a funcionar.',
      },
      {
        en: 'Remounting with mount -o remount changes options such as read only without detaching the filesystem.',
        pt: 'Remontar com mount -o remount muda opções como somente leitura sem desconectar o sistema de arquivos.',
      },
    ],
    commands: ['mount', 'umount', 'df', 'lsblk', 'fuser'],
  },
  {
    id: 'inode',
    topic: 'devices-filesystems',
    front: { en: 'What is an inode?', pt: 'O que é um inode?' },
    back: {
      en: "An inode is the data structure a Unix filesystem uses to store all of a file's metadata (owner, permissions, size, timestamps, and pointers to the actual data blocks on disk), everything except the file's name, which lives separately in a directory entry pointing at an inode number. This separation is exactly what makes hard links possible: two different names in two different directories can point at the very same inode.",
      pt: 'Um inode é a estrutura de dados que um sistema de arquivos Unix usa para guardar todos os metadados de um arquivo (dono, permissões, tamanho, timestamps, e ponteiros para os blocos de dados reais no disco), tudo exceto o nome do arquivo, que fica separado em uma entrada de diretório apontando para um número de inode. Essa separação é exatamente o que torna os hard links possíveis: dois nomes diferentes em dois diretórios diferentes podem apontar para o mesmíssimo inode.',
    },
    details: {
      en: 'The inode holds everything about a file except its name: type, permissions, owner, size, timestamps and the pointers to the data blocks. Names live in directories, which are just tables mapping a name to an inode number, and that separation is why renaming inside one filesystem costs nothing and why deleting a name only frees space once the link count and every open descriptor reach zero.',
      pt: 'O inode guarda tudo sobre um arquivo menos o nome: tipo, permissões, dono, tamanho, datas e os ponteiros para os blocos de dados. Os nomes vivem nos diretórios, que são apenas tabelas ligando um nome a um número de inode, e essa separação é por que renomear dentro de um mesmo sistema de arquivos não custa nada e por que apagar um nome só libera espaço quando a contagem de links e todo descritor aberto chegam a zero.',
    },
    keyPoints: [
      {
        en: 'ls -i prints the inode number, and two names sharing it are the same file under different labels.',
        pt: 'O ls -i imprime o número do inode, e dois nomes que dividem ele são o mesmo arquivo com rótulos diferentes.',
      },
      {
        en: 'A file deleted while a process still holds it open keeps its blocks until that process closes the descriptor.',
        pt: 'Um arquivo apagado enquanto um processo ainda tem ele aberto mantém os blocos até esse processo fechar o descritor.',
      },
      {
        en: 'Inode numbers are unique inside one filesystem only, so the same number appears again on another partition.',
        pt: 'Números de inode são únicos apenas dentro de um sistema de arquivos, então o mesmo número reaparece em outra partição.',
      },
    ],
    commands: ['ls', 'stat', 'find', 'du'],
  },
  {
    id: 'hard-link-vs-symlink',
    topic: 'devices-filesystems',
    front: {
      en: 'What is the difference between a hard link and a symbolic link?',
      pt: 'Qual a diferença entre um hard link e um link simbólico?',
    },
    back: {
      en: "A hard link is a second directory entry pointing at the exact same inode as the original file, the two names are fully equivalent and the underlying data isn't freed until every hard link to it is removed; hard links cannot cross filesystems or point at directories. A symbolic link (symlink) is a small separate file that just stores a path to another file by name, it can cross filesystems and link to directories, but it breaks if the target is ever moved or deleted.",
      pt: 'Um hard link é uma segunda entrada de diretório apontando para o mesmíssimo inode do arquivo original, os dois nomes são totalmente equivalentes e os dados por trás só são liberados quando todo hard link para eles for removido; hard links não conseguem atravessar sistemas de arquivos nem apontar para diretórios. Um link simbólico (symlink) é um pequeno arquivo separado que só guarda um caminho para outro arquivo pelo nome, ele consegue atravessar sistemas de arquivos e apontar para diretórios, mas quebra se o alvo for movido ou apagado.',
    },
    details: {
      en: 'A hard link is another name for one inode, so it cannot cross a filesystem boundary and cannot point at a directory, and the file survives until every name is gone. A symbolic link is a tiny file storing a path as text, so it crosses filesystems freely, can point anywhere including at nothing, and breaks the moment the target moves. Commands differ in how they treat them, which is why ls -l shows the arrow and find has both -type l and -follow.',
      pt: 'Um link físico é outro nome para um inode, então ele não cruza a fronteira de um sistema de arquivos nem aponta para um diretório, e o arquivo sobrevive até todos os nomes sumirem. Um link simbólico é um arquivo minúsculo guardando um caminho como texto, então cruza sistemas de arquivos à vontade, aponta para qualquer lugar inclusive para nada, e quebra no momento em que o alvo se move. Os comandos tratam os dois de forma diferente, e é por isso que o ls -l mostra a seta e o find tem tanto -type l quanto -follow.',
    },
    keyPoints: [
      {
        en: 'The second column of ls -l counts the names an inode has, and a hard link raises that number.',
        pt: 'A segunda coluna do ls -l conta os nomes que um inode tem, e um link físico aumenta esse número.',
      },
      {
        en: 'readlink prints where a symbolic link points, even when the target no longer exists.',
        pt: 'O readlink imprime para onde um link simbólico aponta, mesmo quando o alvo não existe mais.',
      },
      {
        en: 'Copying a symbolic link without -d or -a copies the target content instead of the link itself.',
        pt: 'Copiar um link simbólico sem -d ou -a copia o conteúdo do alvo em vez do próprio link.',
      },
    ],
    commands: ['ln', 'ls', 'readlink', 'cp', 'find'],
  },
  {
    id: 'fhs',
    topic: 'devices-filesystems',
    front: {
      en: 'What is the Filesystem Hierarchy Standard (FHS)?',
      pt: 'O que é o Filesystem Hierarchy Standard (FHS)?',
    },
    back: {
      en: 'The FHS is the specification that defines what each top-level directory on a Linux system is for, so that software and administrators can rely on consistent locations across different distributions: /etc for configuration, /var for data that changes over time like logs, /home for user files, /bin and /usr/bin for executables, /tmp for temporary files, and so on.',
      pt: 'O FHS é a especificação que define para que serve cada diretório de topo em um sistema Linux, para que software e administradores possam contar com locais consistentes entre diferentes distribuições: /etc para configuração, /var para dados que mudam com o tempo como logs, /home para arquivos de usuário, /bin e /usr/bin para executáveis, /tmp para arquivos temporários, e assim por diante.',
    },
    details: {
      en: 'The standard exists so a script written on one distribution finds what it needs on another. Binaries needed early live in /bin and /sbin, everything else in /usr, local software outside the package manager goes in /usr/local or /opt, machine specific configuration in /etc, variable data such as logs and spools in /var, and /proc and /sys are not on any disk at all, they are kernel interfaces presented as files.',
      pt: 'O padrão existe para que um script escrito em uma distribuição ache o que precisa em outra. Binários necessários cedo ficam em /bin e /sbin, o resto em /usr, software local fora do gerenciador de pacotes vai em /usr/local ou /opt, configuração específica da máquina em /etc, dados variáveis como logs e filas em /var, e /proc e /sys não estão em disco nenhum, são interfaces do kernel apresentadas como arquivos.',
    },
    keyPoints: [
      {
        en: 'Nothing under /tmp is guaranteed to survive a reboot, while /var/tmp is meant to outlive one.',
        pt: 'Nada em /tmp tem garantia de sobreviver a um reboot, enquanto o /var/tmp existe justamente para durar mais que um.',
      },
      {
        en: 'Files in /proc report the running kernel, and writing to some of them changes its behaviour immediately.',
        pt: 'Arquivos em /proc informam o kernel em execução, e escrever em alguns deles muda o comportamento na hora.',
      },
      {
        en: 'Software you compile yourself belongs in /usr/local, which keeps it clear of what the package manager owns.',
        pt: 'Software que você mesmo compila pertence a /usr/local, o que mantém ele longe do que o gerenciador de pacotes controla.',
      },
    ],
    commands: ['ls', 'find', 'df', 'du'],
  },
];
