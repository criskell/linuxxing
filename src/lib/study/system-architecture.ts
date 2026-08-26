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
    details: {
      en: 'Each stage hands control to the next and leaves a trace you can read later. The firmware picks a boot device, the bootloader reads its own configuration from the disk, the kernel unpacks an initial ramdisk holding the drivers it needs to reach the real root filesystem, and only then does the init system take over as process number 1. When a machine stops halfway, the stage that failed decides where you look: firmware settings, the bootloader menu, the kernel ring buffer, or the service that refused to start.',
      pt: 'Cada etapa entrega o controle à seguinte e deixa um rastro que dá para ler depois. O firmware escolhe o dispositivo de boot, o carregador lê a própria configuração do disco, o kernel descompacta um ramdisk inicial com os drivers de que precisa para chegar ao sistema de arquivos raiz de verdade, e só então o sistema de init assume como processo número 1. Quando a máquina para no meio, a etapa que falhou decide onde você procura: as configurações do firmware, o menu do carregador, o buffer do kernel ou o serviço que se recusou a subir.',
    },
    keyPoints: [
      {
        en: 'The kernel writes everything it prints during boot into a ring buffer, and dmesg reads that buffer back at any time.',
        pt: 'O kernel escreve tudo que imprime durante o boot em um buffer circular, e o dmesg lê esse buffer de volta a qualquer momento.',
      },
      {
        en: 'The initial ramdisk exists because the drivers needed to mount the root filesystem often live inside that filesystem.',
        pt: 'O ramdisk inicial existe porque os drivers necessários para montar o sistema de arquivos raiz muitas vezes moram dentro desse mesmo sistema.',
      },
      {
        en: 'The first process the kernel starts always gets process number 1, and every other process descends from it.',
        pt: 'O primeiro processo que o kernel inicia sempre recebe o número 1, e todo outro processo descende dele.',
      },
    ],
    commands: ['dmesg', 'journalctl', 'systemctl', 'uname', 'reboot'],
  },
  {
    id: 'bios-vs-uefi',
    topic: 'system-architecture',
    front: { en: 'What is the difference between BIOS and UEFI?', pt: 'Qual a diferença entre BIOS e UEFI?' },
    back: {
      en: 'BIOS is the older, simpler firmware standard, limited to booting from disks under 2TB and running in a restricted 16-bit mode before handing off to the bootloader. UEFI is its modern replacement: it understands GPT-partitioned disks larger than 2TB, can run its own small programs and drivers before an operating system even loads, and is what nearly every machine sold today ships with, sometimes with a BIOS-compatibility mode for older systems.',
      pt: 'A BIOS é o padrão de firmware mais antigo e simples, limitado a inicializar a partir de discos com menos de 2TB e rodando em um modo restrito de 16 bits antes de passar o controle para o bootloader. A UEFI é sua substituta moderna: entende discos particionados em GPT maiores que 2TB, consegue rodar seus próprios programinhas e drivers antes mesmo de um sistema operacional carregar, e é o que quase toda máquina vendida hoje traz, às vezes com um modo de compatibilidade com BIOS para sistemas mais antigos.',
    },
    details: {
      en: 'The difference shows up on disk, not only in the setup screen. A UEFI machine keeps a small FAT partition, the EFI System Partition mounted at /boot/efi, holding one .efi program per boot entry, and the firmware reads its boot order from variables stored in nonvolatile memory. A BIOS machine has nowhere to put that, so the first 512 bytes of the disk carry a tiny piece of bootloader code that chains to the rest.',
      pt: 'A diferença aparece no disco, não só na tela de configuração. Uma máquina UEFI mantém uma partição FAT pequena, a EFI System Partition montada em /boot/efi, com um programa .efi por entrada de boot, e o firmware lê a ordem de boot de variáveis guardadas em memória não volátil. Uma máquina BIOS não tem onde colocar isso, então os primeiros 512 bytes do disco carregam um pedaço mínimo de código do carregador que encadeia para o resto.',
    },
    keyPoints: [
      {
        en: 'UEFI reads its boot entries from firmware variables, which efibootmgr edits from a running system.',
        pt: 'O UEFI lê as entradas de boot de variáveis de firmware, que o efibootmgr edita a partir do sistema em execução.',
      },
      {
        en: 'A BIOS machine boots from the master boot record, which caps usable disks at 2 terabytes with the MBR partition table.',
        pt: 'Uma máquina BIOS inicia pelo registro mestre de inicialização, o que limita discos utilizáveis a 2 terabytes com a tabela de partições MBR.',
      },
      {
        en: 'Secure Boot is a UEFI feature, and it refuses to run a bootloader that carries no trusted signature.',
        pt: 'O Secure Boot é um recurso do UEFI, e ele se recusa a rodar um carregador que não traga uma assinatura confiável.',
      },
    ],
    commands: ['fdisk', 'lsblk', 'mount', 'df'],
  },
  {
    id: 'what-is-systemd',
    topic: 'system-architecture',
    front: { en: 'What is systemd?', pt: 'O que é o systemd?' },
    back: {
      en: 'systemd is the init system used by most modern Linux distributions: the very first process the kernel starts (PID 1), responsible for bringing up every other service (called a unit) in the right order, restarting ones that crash, and tracking dependencies between them (so a database can be guaranteed to start before the application that needs it). It replaced older, simpler init systems like SysV, and is controlled day to day with the systemctl command.',
      pt: 'O systemd é o sistema de inicialização usado pela maioria das distribuições Linux modernas: o primeiríssimo processo que o kernel inicia (PID 1), responsável por subir todos os outros serviços (chamados de unidades) na ordem certa, reiniciar os que travam, e rastrear dependências entre eles (para garantir, por exemplo, que um banco de dados suba antes da aplicação que precisa dele). Ele substituiu sistemas de inicialização mais antigos e simples como o SysV, e é controlado no dia a dia com o comando systemctl.',
    },
    details: {
      en: 'systemd describes work as units, plain text files ending in .service, .target, .socket, .timer or .mount, kept in /lib/systemd/system for packages and /etc/systemd/system for local overrides, where the local copy wins. Because it starts units in parallel and tracks each one in its own control group, it can report exactly which processes belong to a service and restart the service without leaving orphans behind.',
      pt: 'O systemd descreve trabalho como unidades, arquivos de texto terminados em .service, .target, .socket, .timer ou .mount, guardados em /lib/systemd/system para os pacotes e em /etc/systemd/system para sobrescritas locais, onde a cópia local vence. Como ele inicia unidades em paralelo e acompanha cada uma no próprio grupo de controle, consegue informar exatamente quais processos pertencem a um serviço e reiniciar o serviço sem deixar órfãos para trás.',
    },
    keyPoints: [
      {
        en: 'systemctl enable ties a unit to a target so it starts at boot, while systemctl start only starts it right now.',
        pt: 'O systemctl enable liga uma unidade a um target para ela subir no boot, enquanto o systemctl start só inicia ela agora.',
      },
      {
        en: 'A unit file dropped in /etc/systemd/system takes precedence over the file with the same name shipped by the package.',
        pt: 'Um arquivo de unidade colocado em /etc/systemd/system tem precedência sobre o arquivo de mesmo nome entregue pelo pacote.',
      },
      {
        en: 'After editing a unit file, systemctl daemon-reload is what makes systemd read the change.',
        pt: 'Depois de editar um arquivo de unidade, o systemctl daemon-reload é o que faz o systemd ler a mudança.',
      },
    ],
    commands: ['systemctl', 'journalctl', 'ps', 'kill'],
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
    details: {
      en: 'The mapping is not exact, and that is the part exams like to probe. A target is a named group of units rather than a number, so multi-user.target covers what runlevel 3 used to mean and graphical.target covers runlevel 5, with symbolic links named runlevel3.target kept around for habit. The old scheme numbered states from 0 to 6 and ran scripts in /etc/rc?.d in alphabetical order, which is why start order used to be encoded in the file names.',
      pt: 'O mapeamento não é exato, e é justamente essa parte que as provas gostam de cobrar. Um target é um grupo nomeado de unidades em vez de um número, então o multi-user.target cobre o que o runlevel 3 significava e o graphical.target cobre o runlevel 5, com links simbólicos chamados runlevel3.target mantidos por costume. O esquema antigo numerava estados de 0 a 6 e rodava scripts em /etc/rc?.d em ordem alfabética, e é por isso que a ordem de início ficava codificada nos nomes dos arquivos.',
    },
    keyPoints: [
      {
        en: 'Runlevel 0 halts the machine and runlevel 6 reboots it, so neither one is ever a sensible default.',
        pt: 'O runlevel 0 desliga a máquina e o runlevel 6 reinicia, então nenhum dos dois serve como padrão.',
      },
      {
        en: 'systemctl get-default prints the target the machine boots into, and set-default changes it.',
        pt: 'O systemctl get-default imprime o target em que a máquina inicia, e o set-default troca ele.',
      },
      {
        en: 'Rescue mode is the systemd name for the old single user runlevel, with only the essentials running.',
        pt: 'O modo de resgate é o nome que o systemd dá ao antigo runlevel de usuário único, com apenas o essencial rodando.',
      },
    ],
    commands: ['systemctl', 'who', 'shutdown', 'reboot'],
  },
  {
    id: 'kernel-modules',
    topic: 'system-architecture',
    front: { en: 'What is a kernel module?', pt: 'O que é um módulo de kernel?' },
    back: {
      en: 'A kernel module is a piece of code that can be loaded into (or removed from) the running Linux kernel on demand, most commonly a device driver, without needing to reboot or recompile the kernel itself. This is what lets a single kernel support an enormous range of hardware: only the modules for the hardware actually present get loaded, keeping the running kernel smaller and more manageable, tools like lsmod, modprobe, and insmod are used to inspect and manage them.',
      pt: 'Um módulo de kernel é um pedaço de código que pode ser carregado (ou removido) no kernel do Linux em execução sob demanda, mais comumente um driver de dispositivo, sem precisar reiniciar ou recompilar o kernel em si. É isso que permite que um único kernel suporte uma gama enorme de hardware: só os módulos do hardware realmente presente são carregados, mantendo o kernel em execução menor e mais gerenciável, ferramentas como lsmod, modprobe e insmod são usadas para inspecioná-los e gerenciá-los.',
    },
    details: {
      en: 'Modules live under /lib/modules followed by the kernel release, which is why a kernel upgrade needs its own matching set. The kernel also loads them on its own: when a device appears, the kernel asks userspace for the module whose alias matches the hardware identifier, and modprobe resolves that alias along with any module it depends on. Options and blacklists go in files under /etc/modprobe.d, while /proc/modules and lsmod report what is loaded right now.',
      pt: 'Os módulos moram em /lib/modules seguido da versão do kernel, e é por isso que uma atualização de kernel precisa do próprio conjunto correspondente. O kernel também carrega eles sozinho: quando um dispositivo aparece, o kernel pede ao espaço de usuário o módulo cujo alias casa com o identificador do hardware, e o modprobe resolve esse alias junto com qualquer módulo do qual ele dependa. Opções e listas de bloqueio ficam em arquivos dentro de /etc/modprobe.d, enquanto /proc/modules e o lsmod informam o que está carregado agora.',
    },
    keyPoints: [
      {
        en: 'modprobe resolves dependencies and searches by name, while insmod loads one exact file and fails if anything is missing.',
        pt: 'O modprobe resolve dependências e busca pelo nome, enquanto o insmod carrega um arquivo exato e falha se faltar qualquer coisa.',
      },
      {
        en: 'The third column of lsmod counts how many other modules use one, and a module in use cannot be removed.',
        pt: 'A terceira coluna do lsmod conta quantos outros módulos usam aquele, e um módulo em uso não pode ser removido.',
      },
      {
        en: 'Files under /etc/modprobe.d set options and blacklists, which is how you stop a driver from loading automatically.',
        pt: 'Arquivos em /etc/modprobe.d definem opções e listas de bloqueio, e é assim que se impede um driver de carregar automaticamente.',
      },
    ],
    commands: ['dmesg', 'uname', 'lspci', 'lsusb'],
  },
];
