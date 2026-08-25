import type { StudyCard, StudyTopic } from './types';

export const systemArchitectureTopic: StudyTopic = {
  id: 'system-architecture',
  objectiveCode: '101',
  title: { en: 'System Architecture', pt: 'Arquitetura do Sistema' },
};

export const systemArchitectureCards: StudyCard[] = [
  {
    id: 'boot-process',
    topic: 'system-architecture',
    front: {
      en: 'What happens when a Linux machine boots?',
      pt: 'O que acontece quando uma máquina Linux inicializa?',
    },
    back: {
      en: 'The firmware (BIOS or UEFI) runs a power-on self-test and hands control to a bootloader, the bootloader loads the Linux kernel into memory and starts it, the kernel initializes hardware and mounts the root filesystem, and finally the kernel starts the first user-space process (traditionally PID 1, usually systemd today), which brings up every other service in order.',
      pt: 'O firmware (BIOS ou UEFI) roda um autoteste de inicialização e passa o controle para um bootloader, o bootloader carrega o kernel do Linux na memória e o inicia, o kernel inicializa o hardware e monta o sistema de arquivos raiz, e por fim o kernel inicia o primeiro processo em espaço de usuário (tradicionalmente o PID 1, hoje geralmente o systemd), que sobe todos os outros serviços em ordem.',
    },
  },
  {
    id: 'bios-vs-uefi',
    topic: 'system-architecture',
    front: { en: 'What is the difference between BIOS and UEFI?', pt: 'Qual a diferença entre BIOS e UEFI?' },
    back: {
      en: 'BIOS is the older, simpler firmware standard, limited to booting from disks under 2TB and running in a restricted 16-bit mode before handing off to the bootloader. UEFI is its modern replacement: it understands GPT-partitioned disks larger than 2TB, can run its own small programs and drivers before an operating system even loads, and is what nearly every machine sold today ships with, sometimes with a BIOS-compatibility mode for older systems.',
      pt: 'A BIOS é o padrão de firmware mais antigo e simples, limitado a inicializar a partir de discos com menos de 2TB e rodando em um modo restrito de 16 bits antes de passar o controle para o bootloader. A UEFI é sua substituta moderna: entende discos particionados em GPT maiores que 2TB, consegue rodar seus próprios programinhas e drivers antes mesmo de um sistema operacional carregar, e é o que quase toda máquina vendida hoje traz, às vezes com um modo de compatibilidade com BIOS para sistemas mais antigos.',
    },
  },
  {
    id: 'what-is-systemd',
    topic: 'system-architecture',
    front: { en: 'What is systemd?', pt: 'O que é o systemd?' },
    back: {
      en: 'systemd is the init system used by most modern Linux distributions: the very first process the kernel starts (PID 1), responsible for bringing up every other service (called a unit) in the right order, restarting ones that crash, and tracking dependencies between them (so a database can be guaranteed to start before the application that needs it). It replaced older, simpler init systems like SysV, and is controlled day to day with the systemctl command.',
      pt: 'O systemd é o sistema de inicialização usado pela maioria das distribuições Linux modernas: o primeiríssimo processo que o kernel inicia (PID 1), responsável por subir todos os outros serviços (chamados de unidades) na ordem certa, reiniciar os que travam, e rastrear dependências entre eles (para garantir, por exemplo, que um banco de dados suba antes da aplicação que precisa dele). Ele substituiu sistemas de inicialização mais antigos e simples como o SysV, e é controlado no dia a dia com o comando systemctl.',
    },
  },
  {
    id: 'runlevels-targets',
    topic: 'system-architecture',
    front: {
      en: 'What are runlevels, and what replaced them in systemd?',
      pt: 'O que são runlevels, e o que os substituiu no systemd?',
    },
    back: {
      en: 'A runlevel is a numbered state describing which services should be running, the classic SysV scheme defined levels like 0 (halt), 1 (single-user/rescue mode), 3 (multi-user with networking), 5 (multi-user with a graphical login), and 6 (reboot). systemd replaced this numeric scheme with named targets (rescue.target, multi-user.target, graphical.target) that work the same way conceptually but can express richer dependencies between services.',
      pt: 'Um runlevel é um estado numerado que descreve quais serviços devem estar rodando, o esquema clássico do SysV definia níveis como 0 (desligar), 1 (modo de usuário único/resgate), 3 (multiusuário com rede), 5 (multiusuário com login gráfico) e 6 (reiniciar). O systemd substituiu esse esquema numérico por targets nomeados (rescue.target, multi-user.target, graphical.target) que funcionam do mesmo jeito conceitualmente, mas conseguem expressar dependências mais ricas entre serviços.',
    },
  },
  {
    id: 'kernel-modules',
    topic: 'system-architecture',
    front: { en: 'What is a kernel module?', pt: 'O que é um módulo de kernel?' },
    back: {
      en: 'A kernel module is a piece of code that can be loaded into (or removed from) the running Linux kernel on demand, most commonly a device driver, without needing to reboot or recompile the kernel itself. This is what lets a single kernel support an enormous range of hardware: only the modules for the hardware actually present get loaded, keeping the running kernel smaller and more manageable, tools like lsmod, modprobe, and insmod are used to inspect and manage them.',
      pt: 'Um módulo de kernel é um pedaço de código que pode ser carregado (ou removido) no kernel do Linux em execução sob demanda, mais comumente um driver de dispositivo, sem precisar reiniciar ou recompilar o kernel em si. É isso que permite que um único kernel suporte uma gama enorme de hardware: só os módulos do hardware realmente presente são carregados, mantendo o kernel em execução menor e mais gerenciável, ferramentas como lsmod, modprobe e insmod são usadas para inspecioná-los e gerenciá-los.',
    },
  },
];
