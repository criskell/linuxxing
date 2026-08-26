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
    details: {
      en: 'A package manager keeps a local database of what is installed, which files each package owns and which version is in place, and that database is what lets it answer questions no directory listing can. It works from repositories described in configuration files, /etc/apt/sources.list and /etc/apt/sources.list.d on Debian systems and /etc/yum.repos.d on Red Hat ones, and it verifies the signature of what it downloads before unpacking anything.',
      pt: 'Um gerenciador de pacotes mantém um banco local do que está instalado, de quais arquivos cada pacote é dono e de qual versão está em uso, e é esse banco que permite responder perguntas que nenhuma listagem de diretório responde. Ele trabalha a partir de repositórios descritos em arquivos de configuração, /etc/apt/sources.list e /etc/apt/sources.list.d em sistemas Debian e /etc/yum.repos.d nos Red Hat, e verifica a assinatura do que baixa antes de desempacotar qualquer coisa.',
    },
    keyPoints: [
      {
        en: 'The package database answers which package owns a given file, which is how you trace a stray binary back to its source.',
        pt: 'O banco de pacotes responde qual pacote é dono de um arquivo, e é assim que se rastreia um binário perdido até a origem dele.',
      },
      {
        en: 'Updating the package list and upgrading the installed packages are two separate steps, and skipping the first one installs stale versions.',
        pt: 'Atualizar a lista de pacotes e atualizar os pacotes instalados são dois passos separados, e pular o primeiro instala versões velhas.',
      },
      {
        en: 'Configuration files marked as such survive an upgrade, so the package manager asks before replacing anything you edited.',
        pt: 'Arquivos de configuração marcados como tal sobrevivem a uma atualização, então o gerenciador pergunta antes de substituir algo que você editou.',
      },
    ],
    commands: ['apt', 'dpkg', 'dnf', 'yum', 'pacman'],
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
    details: {
      en: 'The split runs deeper than the file extension. Debian packages carry their metadata in a control file and run maintainer scripts named preinst and postinst around the unpacking, while RPM packages keep metadata in a header inside the package itself and query it with rpm -qi. The low level tool installs one file and stops at the first missing dependency, and the high level tool is the one that talks to repositories and pulls the rest.',
      pt: 'A divisão vai além da extensão do arquivo. Pacotes Debian levam os metadados em um arquivo control e rodam scripts de manutenção chamados preinst e postinst em volta do desempacotamento, enquanto pacotes RPM guardam metadados em um cabeçalho dentro do próprio pacote e consultam isso com rpm -qi. A ferramenta de baixo nível instala um arquivo e para na primeira dependência que falta, e a de alto nível é quem conversa com os repositórios e busca o resto.',
    },
    keyPoints: [
      {
        en: 'dpkg and rpm install a local file, while apt, dnf and zypper reach the network and resolve dependencies.',
        pt: 'O dpkg e o rpm instalam um arquivo local, enquanto o apt, o dnf e o zypper alcançam a rede e resolvem dependências.',
      },
      {
        en: 'dpkg -l lists installed packages and rpm -qa does the same on the Red Hat side.',
        pt: 'O dpkg -l lista pacotes instalados e o rpm -qa faz o mesmo do lado Red Hat.',
      },
      {
        en: 'A package installed by hand with the low level tool can sit half configured until the dependency it needs arrives.',
        pt: 'Um pacote instalado na mão com a ferramenta de baixo nível pode ficar meio configurado até a dependência de que ele precisa chegar.',
      },
    ],
    commands: ['dpkg', 'apt', 'dnf', 'yum'],
  },
  {
    id: 'dependency-resolution',
    topic: 'package-management',
    front: { en: 'What does dependency resolution mean?', pt: 'O que significa resolução de dependências?' },
    back: {
      en: 'Most software relies on other software to function, a program might need a specific shared library or another tool already installed. Dependency resolution is the package manager automatically figuring out that full chain of requirements and installing every one of them alongside the package actually requested, so the user never has to track down and install prerequisites by hand.',
      pt: 'A maioria dos softwares depende de outros softwares para funcionar, um programa pode precisar de uma biblioteca compartilhada específica ou de outra ferramenta já instalada. Resolução de dependências é o gerenciador de pacotes descobrindo automaticamente essa cadeia inteira de requisitos e instalando cada um deles junto com o pacote realmente pedido, para que o usuário nunca precise caçar e instalar pré-requisitos manualmente.',
    },
    details: {
      en: 'Resolution can fail in ways worth recognising. Two packages may demand incompatible versions of the same library, a held package may block an upgrade the rest of the system wants, and a partially configured package can leave the database in a state where the next install refuses to start until you repair it. The package manager always shows the full plan, what it installs, upgrades and removes, before it touches the disk.',
      pt: 'A resolução falha de formas que vale reconhecer. Dois pacotes podem exigir versões incompatíveis da mesma biblioteca, um pacote travado pode bloquear uma atualização que o resto do sistema quer, e um pacote meio configurado deixa o banco em um estado em que a próxima instalação se recusa a começar até você consertar. O gerenciador sempre mostra o plano completo, o que instala, atualiza e remove, antes de tocar no disco.',
    },
    keyPoints: [
      {
        en: 'Read the plan before confirming, because a removal list is where an unwanted dependency chain shows itself.',
        pt: 'Leia o plano antes de confirmar, porque a lista de remoção é onde uma cadeia de dependências indesejada se revela.',
      },
      {
        en: 'Packages installed only to satisfy a dependency are marked automatic, and the autoremove step is what cleans them up.',
        pt: 'Pacotes instalados só para satisfazer uma dependência são marcados como automáticos, e a limpeza deles vem do autoremove.',
      },
      {
        en: 'A held or pinned package stops upgrades on purpose, which explains an update that keeps skipping the same version.',
        pt: 'Um pacote travado ou fixado impede atualizações de propósito, o que explica uma atualização que sempre pula a mesma versão.',
      },
    ],
    commands: ['apt', 'dpkg', 'dnf'],
  },
  {
    id: 'shared-libraries',
    topic: 'package-management',
    front: { en: 'What is a shared library?', pt: 'O que é uma biblioteca compartilhada?' },
    back: {
      en: 'A shared library (a .so file on Linux) is compiled code that multiple programs can load and use at run time instead of each one bundling its own private copy, saving disk space and memory and letting a security fix in the library benefit every program that uses it after a single update. The ldd command shows which shared libraries a given executable depends on.',
      pt: 'Uma biblioteca compartilhada (um arquivo .so no Linux) é código compilado que vários programas podem carregar e usar em tempo de execução em vez de cada um empacotar sua própria cópia privada, economizando espaço em disco e memória e fazendo com que uma correção de segurança na biblioteca beneficie todo programa que a usa após uma única atualização. O comando ldd mostra de quais bibliotecas compartilhadas um executável depende.',
    },
    details: {
      en: 'At run time the dynamic linker looks for each library the program names, first in the paths compiled into the binary, then in the cache built from /etc/ld.so.conf and its directory, and it fails loudly when a name is missing. That cache does not rebuild itself: after dropping a library into a new directory you run ldconfig, and the LD_LIBRARY_PATH variable overrides the search for one command when you need to test a library before installing it.',
      pt: 'Em tempo de execução, o ligador dinâmico procura cada biblioteca que o programa nomeia, primeiro nos caminhos compilados no binário, depois no cache montado a partir de /etc/ld.so.conf e do diretório dele, e falha em alto e bom som quando um nome não aparece. Esse cache não se reconstrói sozinho: depois de colocar uma biblioteca em um diretório novo você roda o ldconfig, e a variável LD_LIBRARY_PATH sobrescreve a busca para um comando só quando você precisa testar uma biblioteca antes de instalar.',
    },
    keyPoints: [
      {
        en: 'ldd prints the libraries a binary needs and marks the ones the linker cannot find as not found.',
        pt: 'O ldd imprime as bibliotecas de que um binário precisa e marca como not found as que o ligador não acha.',
      },
      {
        en: 'The soname carries the interface version, which is why libc.so.6 and libc.so.5 can sit side by side.',
        pt: 'O soname carrega a versão da interface, e é por isso que libc.so.6 e libc.so.5 convivem lado a lado.',
      },
      {
        en: 'Static linking copies the code into the program instead, which drops the dependency and raises the file size.',
        pt: 'A ligação estática copia o código para dentro do programa, o que elimina a dependência e aumenta o tamanho do arquivo.',
      },
    ],
    commands: ['file', 'strace', 'find'],
  },
  {
    id: 'bootloader-grub',
    topic: 'package-management',
    front: { en: 'What is GRUB?', pt: 'O que é o GRUB?' },
    back: {
      en: 'GRUB (the GRand Unified Bootloader) is the most common bootloader on Linux systems, the program that runs right after firmware and is responsible for actually loading the chosen kernel into memory and starting it. It shows the boot menu that lets a user pick between kernel versions or operating systems, and its configuration is generated from files under /etc/default/grub and /etc/grub.d/.',
      pt: 'O GRUB (GRand Unified Bootloader) é o bootloader mais comum em sistemas Linux, o programa que roda logo depois do firmware e é responsável por de fato carregar o kernel escolhido na memória e iniciá-lo. É ele que mostra o menu de boot que permite escolher entre versões de kernel ou sistemas operacionais, e sua configuração é gerada a partir de arquivos em /etc/default/grub e /etc/grub.d/.',
    },
    details: {
      en: 'The file you edit is not the file GRUB reads. Settings live in /etc/default/grub and in the scripts under /etc/grub.d, and a generator writes them into /boot/grub/grub.cfg, which carries a warning against editing it by hand. At the menu you can press e to change one boot for a single run, which is how a machine with a broken graphical target still gets you a shell.',
      pt: 'O arquivo que você edita não é o arquivo que o GRUB lê. As configurações moram em /etc/default/grub e nos scripts de /etc/grub.d, e um gerador escreve tudo em /boot/grub/grub.cfg, que traz um aviso contra editar na mão. No menu dá para apertar e e mudar um boot para uma execução só, o que é como uma máquina com o target gráfico quebrado ainda entrega um shell para você.',
    },
    keyPoints: [
      {
        en: 'Regenerating grub.cfg is a separate step, and forgetting it means your change to /etc/default/grub never takes effect.',
        pt: 'Regerar o grub.cfg é um passo separado, e esquecer dele faz sua mudança em /etc/default/grub nunca valer.',
      },
      {
        en: 'Editing an entry at the menu changes that boot alone and leaves the saved configuration untouched.',
        pt: 'Editar uma entrada no menu muda só aquele boot e deixa a configuração salva intacta.',
      },
      {
        en: 'Appending single or systemd.unit=rescue.target to the kernel line boots into a minimal state for repairs.',
        pt: 'Acrescentar single ou systemd.unit=rescue.target na linha do kernel inicia em um estado mínimo para reparos.',
      },
    ],
    commands: ['dmesg', 'lsblk', 'mount', 'reboot'],
  },
];
