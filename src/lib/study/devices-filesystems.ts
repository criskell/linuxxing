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
  },
  {
    id: 'mounting',
    topic: 'devices-filesystems',
    front: { en: 'What does mounting a filesystem mean?', pt: 'O que significa montar um sistema de arquivos?' },
    back: {
      en: "Mounting attaches a filesystem (from a disk partition, a USB drive, a network share, and so on) to a specific directory in the existing directory tree, called the mount point, making its contents accessible at that path. The mount command does this manually, and /etc/fstab lists filesystems that should be mounted automatically at boot, unlike Windows' separate drive letters, Linux presents everything under one unified tree.",
      pt: 'Montar anexa um sistema de arquivos (de uma partição de disco, um pendrive USB, um compartilhamento de rede, e assim por diante) a um diretório específico na árvore de diretórios existente, chamado ponto de montagem, tornando seu conteúdo acessível naquele caminho. O comando mount faz isso manualmente, e o /etc/fstab lista sistemas de arquivos que devem ser montados automaticamente no boot, diferente das letras de unidade separadas do Windows, o Linux apresenta tudo sob uma única árvore unificada.',
    },
  },
  {
    id: 'inode',
    topic: 'devices-filesystems',
    front: { en: 'What is an inode?', pt: 'O que é um inode?' },
    back: {
      en: "An inode is the data structure a Unix filesystem uses to store all of a file's metadata (owner, permissions, size, timestamps, and pointers to the actual data blocks on disk), everything except the file's name, which lives separately in a directory entry pointing at an inode number. This separation is exactly what makes hard links possible: two different names in two different directories can point at the very same inode.",
      pt: 'Um inode é a estrutura de dados que um sistema de arquivos Unix usa para guardar todos os metadados de um arquivo (dono, permissões, tamanho, timestamps, e ponteiros para os blocos de dados reais no disco), tudo exceto o nome do arquivo, que fica separado em uma entrada de diretório apontando para um número de inode. Essa separação é exatamente o que torna os hard links possíveis: dois nomes diferentes em dois diretórios diferentes podem apontar para o mesmíssimo inode.',
    },
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
  },
];
