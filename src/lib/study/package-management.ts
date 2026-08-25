import type { StudyCard, StudyTopic } from './types';

export const packageManagementTopic: StudyTopic = {
  id: 'package-management',
  objectiveCode: '102',
  title: { en: 'Installation and Package Management', pt: 'Instalação e Gerenciamento de Pacotes' },
};

export const packageManagementCards: StudyCard[] = [
  {
    id: 'package-manager',
    topic: 'package-management',
    front: { en: 'What is a package manager?', pt: 'O que é um gerenciador de pacotes?' },
    back: {
      en: 'A package manager installs, updates, and removes software in pre-built, versioned bundles (packages), while also resolving and installing whatever other packages that software depends on. It keeps a database of what is installed, so it can cleanly upgrade or remove software later, this is what apt, dnf, and pacman all do, each for a different family of Linux distributions.',
      pt: 'Um gerenciador de pacotes instala, atualiza e remove software em pacotes pré-compilados e versionados, resolvendo e instalando também qualquer outro pacote do qual aquele software dependa. Ele mantém um banco de dados do que está instalado, para conseguir depois fazer upgrade ou remover o software de forma limpa, é isso que apt, dnf e pacman fazem, cada um para uma família diferente de distribuições Linux.',
    },
  },
  {
    id: 'dpkg-vs-rpm',
    topic: 'package-management',
    front: {
      en: 'What is the difference between the Debian and RPM package families?',
      pt: 'Qual a diferença entre as famílias de pacote Debian e RPM?',
    },
    back: {
      en: 'Debian-based distributions (Debian, Ubuntu) use .deb packages, managed at the low level by dpkg and, more usually, through apt, which also resolves dependencies over the network. Red Hat-family distributions (Fedora, RHEL, CentOS) use .rpm packages, managed at the low level by rpm and, day to day, through dnf (or its predecessor yum). The two ecosystems are functionally similar but not interchangeable: a .deb will not install on an RPM-based system and vice versa.',
      pt: 'Distribuições baseadas em Debian (Debian, Ubuntu) usam pacotes .deb, gerenciados em baixo nível pelo dpkg e, mais comumente, através do apt, que também resolve dependências pela rede. Distribuições da família Red Hat (Fedora, RHEL, CentOS) usam pacotes .rpm, gerenciados em baixo nível pelo rpm e, no dia a dia, através do dnf (ou seu antecessor, o yum). Os dois ecossistemas são funcionalmente parecidos mas não intercambiáveis: um .deb não instala em um sistema baseado em RPM, e vice-versa.',
    },
  },
  {
    id: 'dependency-resolution',
    topic: 'package-management',
    front: { en: 'What does dependency resolution mean?', pt: 'O que significa resolução de dependências?' },
    back: {
      en: 'Most software relies on other software to function, a program might need a specific shared library or another tool already installed. Dependency resolution is the package manager automatically figuring out that full chain of requirements and installing every one of them alongside the package actually requested, so the user never has to track down and install prerequisites by hand.',
      pt: 'A maioria dos softwares depende de outros softwares para funcionar, um programa pode precisar de uma biblioteca compartilhada específica ou de outra ferramenta já instalada. Resolução de dependências é o gerenciador de pacotes descobrindo automaticamente essa cadeia inteira de requisitos e instalando cada um deles junto com o pacote realmente pedido, para que o usuário nunca precise caçar e instalar pré-requisitos manualmente.',
    },
  },
  {
    id: 'shared-libraries',
    topic: 'package-management',
    front: { en: 'What is a shared library?', pt: 'O que é uma biblioteca compartilhada?' },
    back: {
      en: 'A shared library (a .so file on Linux) is compiled code that multiple programs can load and use at run time instead of each one bundling its own private copy, saving disk space and memory and letting a security fix in the library benefit every program that uses it after a single update. The ldd command shows which shared libraries a given executable depends on.',
      pt: 'Uma biblioteca compartilhada (um arquivo .so no Linux) é código compilado que vários programas podem carregar e usar em tempo de execução em vez de cada um empacotar sua própria cópia privada, economizando espaço em disco e memória e fazendo com que uma correção de segurança na biblioteca beneficie todo programa que a usa após uma única atualização. O comando ldd mostra de quais bibliotecas compartilhadas um executável depende.',
    },
  },
  {
    id: 'bootloader-grub',
    topic: 'package-management',
    front: { en: 'What is GRUB?', pt: 'O que é o GRUB?' },
    back: {
      en: 'GRUB (the GRand Unified Bootloader) is the most common bootloader on Linux systems, the program that runs right after firmware and is responsible for actually loading the chosen kernel into memory and starting it. It shows the boot menu that lets a user pick between kernel versions or operating systems, and its configuration is generated from files under /etc/default/grub and /etc/grub.d/.',
      pt: 'O GRUB (GRand Unified Bootloader) é o bootloader mais comum em sistemas Linux, o programa que roda logo depois do firmware e é responsável por de fato carregar o kernel escolhido na memória e iniciá-lo. É ele que mostra o menu de boot que permite escolher entre versões de kernel ou sistemas operacionais, e sua configuração é gerada a partir de arquivos em /etc/default/grub e /etc/grub.d/.',
    },
  },
];
