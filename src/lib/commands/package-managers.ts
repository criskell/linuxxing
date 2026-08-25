import type { CommandKB } from './types';

export const packageManagers: CommandKB = {
  docker: {
    desc: {
      en: "Tool for building, running, and managing containers, isolated, lightweight environments that package an application together with its libraries, dependencies, and configuration so it behaves the same wherever it runs. Containers share the host machine's kernel instead of virtualizing a whole operating system, which makes them far faster to start and lighter on resources than a traditional virtual machine, while still keeping applications from interfering with each other. Docker popularized this workflow with a simple image format (the Dockerfile), a registry for sharing images (Docker Hub), and a consistent CLI, which is why it became the default way to package and ship software across development, testing, and production.",
      pt: 'Ferramenta para construir, rodar e gerenciar containers, ambientes isolados e leves que empacotam uma aplicação junto com suas bibliotecas, dependências e configuração, para que ela se comporte da mesma forma em qualquer lugar onde rodar. Containers compartilham o kernel da máquina host em vez de virtualizar um sistema operacional inteiro, o que os torna muito mais rápidos para iniciar e mais leves em recursos do que uma máquina virtual tradicional, ao mesmo tempo em que mantêm as aplicações isoladas umas das outras. O Docker popularizou esse fluxo de trabalho com um formato de imagem simples (o Dockerfile), um registro para compartilhar imagens (o Docker Hub), e uma CLI consistente, motivo pelo qual se tornou a forma padrão de empacotar e distribuir software entre desenvolvimento, testes e produção.',
    },
    subcommands: {
      run: {
        en: 'Creates and starts a new container from an image.',
        pt: 'Cria e inicia um novo container a partir de uma imagem.',
      },
      start: {
        en: 'Starts a container that already exists but is stopped.',
        pt: 'Inicia um container que já existe mas está parado.',
      },
      stop: {
        en: 'Gracefully stops a running container.',
        pt: 'Para um container em execução, de forma graciosa.',
      },
      restart: {
        en: 'Stops and starts the container again.',
        pt: 'Para e inicia o container novamente.',
      },
      ps: {
        en: 'Lists running containers.',
        pt: 'Lista os containers em execução.',
      },
      images: {
        en: 'Lists locally available images.',
        pt: 'Lista as imagens disponíveis localmente.',
      },
      build: {
        en: 'Creates a new image from a Dockerfile.',
        pt: 'Cria uma nova imagem a partir de um Dockerfile.',
      },
      pull: {
        en: 'Downloads an image from a remote registry (like Docker Hub).',
        pt: 'Baixa uma imagem de um registro remoto (como o Docker Hub).',
      },
      push: {
        en: 'Sends a local image to a remote registry.',
        pt: 'Envia uma imagem local para um registro remoto.',
      },
      exec: {
        en: 'Runs a command inside a container that is already running.',
        pt: 'Executa um comando dentro de um container que já está rodando.',
      },
      logs: {
        en: 'Shows the output (stdout/stderr) produced by a container.',
        pt: 'Mostra a saída (stdout/stderr) produzida por um container.',
      },
      rm: {
        en: 'Removes one or more stopped containers.',
        pt: 'Remove um ou mais containers parados.',
      },
      rmi: {
        en: 'Removes one or more images.',
        pt: 'Remove uma ou mais imagens.',
      },
      compose: {
        en: 'Manages multiple containers defined in a docker-compose file.',
        pt: 'Gerencia múltiplos containers definidos em um arquivo docker-compose.',
      },
    },
    flags: {
      '-d': {
        en: 'Runs the container in the background (detached mode), returning control of the terminal right away.',
        pt: "Roda o container em segundo plano (modo 'detached'), devolvendo o controle do terminal na hora.",
      },
      '--detach': {
        en: 'Runs the container in the background, returning control of the terminal right away.',
        pt: 'Roda o container em segundo plano, devolvendo o controle do terminal na hora.',
      },
      '-it': {
        en: 'Combines interactive mode (-i) with a pseudo-terminal (-t), letting you type inside the container like a normal terminal.',
        pt: 'Combina modo interativo (-i) com um pseudo-terminal (-t), permitindo digitar dentro do container como se fosse um terminal normal.',
      },
      '-p': {
        en: 'Maps a port on the host machine to a port inside the container (host:container format).',
        pt: 'Mapeia uma porta da máquina host para uma porta dentro do container (formato host:container).',
      },
      '--name': {
        en: 'Gives the container a specific name, instead of an automatically generated one.',
        pt: 'Dá um nome específico ao container, em vez de um nome gerado automaticamente.',
      },
      '-v': {
        en: 'Mounts a volume or host folder inside the container, to persist or share data.',
        pt: 'Monta um volume ou pasta do host dentro do container, para persistir ou compartilhar dados.',
      },
      '--rm': {
        en: 'Automatically removes the container as soon as it finishes running.',
        pt: 'Remove o container automaticamente assim que ele terminar de rodar.',
      },
      '-e': {
        en: 'Sets an environment variable inside the container.',
        pt: 'Define uma variável de ambiente dentro do container.',
      },
    },
    valueFlags: {
      '-p': 'generic',
      '--name': 'generic',
      '-v': 'generic',
      '-e': 'generic',
    },
    commonMistake: {
      en: "'docker run' without --rm leaves a stopped container behind every single time, which quietly accumulates over weeks of testing and eventually fills up disk space, --rm is worth defaulting to for anything short-lived. The -p flag's host:container order is also easy to reverse, 'docker run -p 8080:80' maps host port 8080 to the container's 80, getting it backwards means the app is unreachable at the port actually expected.",
      pt: '"docker run" sem --rm deixa um container parado para trás toda vez, o que se acumula silenciosamente ao longo de semanas de teste e acaba enchendo o espaço em disco, --rm vale a pena usar por padrão para qualquer coisa de curta duração. A ordem host:container da flag -p também é fácil de inverter, "docker run -p 8080:80" mapeia a porta 8080 do host para a 80 do container, inverter isso faz a aplicação ficar inacessível na porta realmente esperada.',
    },
  },

  apt: {
    desc: {
      en: "The Advanced Package Tool, used on Debian, Ubuntu, and other Debian-derived distributions to install, update, and remove software from centrally maintained repositories. It resolves dependencies automatically, so installing one package that needs three others pulls all of them in the correct versions, and it tracks what is installed so packages can be cleanly removed later. Before anything can be installed, the local list of available packages and their versions has to be refreshed with 'apt update' against the configured repositories; skipping that step is a common reason an install fails or grabs an outdated version.",
      pt: 'O Advanced Package Tool, usado no Debian, Ubuntu e outras distribuições derivadas do Debian para instalar, atualizar e remover software a partir de repositórios mantidos centralmente. Ele resolve dependências automaticamente, então instalar um pacote que precisa de outros três traz todos eles nas versões corretas, e mantém registro do que está instalado para que os pacotes possam ser removidos de forma limpa depois. Antes de instalar qualquer coisa, a lista local de pacotes disponíveis e suas versões precisa ser atualizada com "apt update" contra os repositórios configurados; pular essa etapa é um motivo comum de uma instalação falhar ou trazer uma versão desatualizada.',
    },
    subcommands: {
      install: {
        en: "Installs one or more packages, first resolving their full dependency tree and asking for confirmation before downloading anything. Once confirmed, it fetches the matching .deb files from the repositories configured in /etc/apt/sources.list (and sources.list.d), verifies them against the signed checksums in the package index, exactly what 'apt update' refreshed earlier, and then hands them off to dpkg to unpack onto disk and run their configuration scripts. Multiple packages can be listed in a single call, and a specific version can be pinned with 'package=version' when more than one is available in the repositories. It writes to the system's shared package database, so it needs root privileges and is almost always run with sudo.",
        pt: 'Instala um ou mais pacotes, resolvendo primeiro a árvore de dependências completa e pedindo confirmação antes de baixar qualquer coisa. Depois de confirmado, ele busca os arquivos .deb correspondentes nos repositórios configurados em /etc/apt/sources.list (e em sources.list.d), verifica-os contra os checksums assinados no índice de pacotes, exatamente o que o "apt update" atualizou antes, e então repassa tudo para o dpkg desempacotar no disco e rodar os scripts de configuração. Vários pacotes podem ser listados numa única chamada, e uma versão específica pode ser fixada com "pacote=versao" quando mais de uma estiver disponível nos repositórios. Ele escreve no banco de dados de pacotes compartilhado do sistema, por isso precisa de privilégios de root e quase sempre roda com sudo.',
      },
      remove: {
        en: 'Removes a package, keeping its configuration files.',
        pt: 'Remove um pacote, mantendo seus arquivos de configuração.',
      },
      purge: {
        en: 'Removes a package along with its configuration files.',
        pt: 'Remove um pacote e também seus arquivos de configuração.',
      },
      update: {
        en: 'Updates the list of available packages from the configured repositories.',
        pt: 'Atualiza a lista de pacotes disponíveis a partir dos repositórios configurados.',
      },
      upgrade: {
        en: 'Installs the newest versions of every package already installed.',
        pt: 'Instala as versões mais novas de todos os pacotes já instalados.',
      },
      search: {
        en: 'Searches for packages by name or description.',
        pt: 'Procura pacotes pelo nome ou descrição.',
      },
    },
    flags: {
      '-y': {
        en: "Automatically answers 'yes' to every confirmation, without asking.",
        pt: "Responde automaticamente 'sim' para todas as confirmações, sem perguntar.",
      },
    },
  },

  npm: {
    desc: {
      en: "Node.js's default package manager, used to install libraries from the npm registry and to run the scripts defined in a project's package.json (build, test, start, and any custom ones a project defines). Dependencies get recorded in package.json and locked to exact versions in package-lock.json, so a project can be reproduced identically on another machine by running 'npm install'. It comes bundled with Node.js itself, which is why it remains the most common entry point into the JavaScript ecosystem even though faster alternatives like pnpm and yarn exist.",
      pt: 'O gerenciador de pacotes padrão do Node.js, usado para instalar bibliotecas do registro npm e para rodar os scripts definidos no package.json de um projeto (build, test, start, e quaisquer outros que o projeto definir). As dependências ficam registradas no package.json e travadas em versões exatas no package-lock.json, então um projeto pode ser reproduzido de forma idêntica em outra máquina rodando "npm install". Ele já vem junto com o próprio Node.js, motivo pelo qual continua sendo a porta de entrada mais comum para o ecossistema JavaScript, mesmo com alternativas mais rápidas como pnpm e yarn disponíveis.',
    },
    subcommands: {
      install: {
        en: "Installs the project's dependencies, or a specific package if one is given.",
        pt: 'Instala as dependências do projeto, ou um pacote específico se for informado.',
      },
      run: {
        en: 'Runs a script defined in package.json.',
        pt: 'Executa um script definido no arquivo package.json.',
      },
      start: {
        en: "Runs the 'start' script defined in package.json.",
        pt: "Executa o script 'start' definido no package.json.",
      },
      test: {
        en: "Runs the 'test' script defined in package.json.",
        pt: "Executa o script 'test' definido no package.json.",
      },
      init: {
        en: 'Creates a new package.json file in the current folder.',
        pt: 'Cria um novo arquivo package.json na pasta atual.',
      },
      uninstall: {
        en: 'Removes an installed package.',
        pt: 'Remove um pacote instalado.',
      },
    },
    flags: {
      '-g': {
        en: 'Installs the package globally, available to any project on the system.',
        pt: 'Instala o pacote globalmente, disponível em qualquer projeto do sistema.',
      },
      '--save-dev': {
        en: 'Adds the package as a development dependency, not needed in production.',
        pt: 'Adiciona o pacote como dependência de desenvolvimento, não necessária em produção.',
      },
      '-D': {
        en: '(shorthand for --save-dev) Adds the package as a development dependency.',
        pt: 'Adiciona o pacote como dependência de desenvolvimento (atalho para --save-dev).',
      },
    },
    commonMistake: {
      en: "Installing a package without -D (or --save-dev) puts it in regular 'dependencies' even when it's only a build or test tool, bloating what actually ships to production and gets installed on every deploy. It's also easy to forget that 'npm install' with no arguments reads package.json and reinstalls everything listed there, running it inside the wrong folder installs (or reinstalls) an entirely different project's dependencies.",
      pt: 'Instalar um pacote sem -D (ou --save-dev) coloca ele nas "dependencies" normais mesmo quando é só uma ferramenta de build ou teste, inchando o que de fato vai para produção e é instalado em todo deploy. Também é fácil esquecer que "npm install" sem argumentos lê o package.json e reinstala tudo que está listado ali, rodar isso na pasta errada instala (ou reinstala) as dependências de um projeto completamente diferente.',
    },
  },

  dpkg: {
    desc: {
      en: "The low-level package manager underneath apt on Debian and Ubuntu systems, the tool that actually unpacks a .deb file's contents onto disk and registers it as installed. apt is built on top of dpkg and adds the parts dpkg deliberately doesn't handle itself, resolving dependencies and downloading packages from a remote repository; dpkg only ever operates on a .deb file already sitting on disk, which is exactly why 'dpkg -i package.deb' is the standard way to install a package downloaded directly rather than from a repository, and why a dpkg install can fail with unmet dependencies that apt would normally have resolved automatically.",
      pt: 'O gerenciador de pacotes de baixo nível por trás do apt em sistemas Debian e Ubuntu, a ferramenta que de fato desempacota o conteúdo de um arquivo .deb no disco e o registra como instalado. O apt é construído em cima do dpkg e adiciona as partes que o dpkg deliberadamente não trata sozinho, resolver dependências e baixar pacotes de um repositório remoto; o dpkg só opera sobre um arquivo .deb já presente no disco, motivo exato pelo qual "dpkg -i pacote.deb" é a forma padrão de instalar um pacote baixado diretamente em vez de vir de um repositório, e por que uma instalação via dpkg pode falhar com dependências não satisfeitas que o apt normalmente teria resolvido automaticamente.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Installs a .deb package file.',
        pt: 'Instala um arquivo de pacote .deb.',
      },
      '-r': {
        en: 'Removes a package, keeping its configuration files.',
        pt: 'Remove um pacote, mantendo seus arquivos de configuração.',
      },
      '-l': {
        en: 'Lists installed packages matching a pattern.',
        pt: 'Lista os pacotes instalados que combinam com um padrão.',
      },
      '-L': {
        en: 'Lists every file installed by a given package.',
        pt: 'Lista todo arquivo instalado por um determinado pacote.',
      },
    },
    valueFlags: {
      '-i': 'generic',
      '-r': 'generic',
      '-L': 'generic',
    },
  },

  pip: {
    desc: {
      en: "Python's package installer, downloading libraries from the Python Package Index (PyPI) and installing them so they can be imported. Its most important companion is a requirements.txt file listing exact package versions, so 'pip install -r requirements.txt' can reproduce the same set of dependencies on another machine; running pip without any virtual environment active installs packages system-wide, which most modern Python workflows deliberately avoid in favor of an isolated per-project environment.",
      pt: 'O instalador de pacotes do Python, baixando bibliotecas do Python Package Index (PyPI) e as instalando para que possam ser importadas. Seu companheiro mais importante é um arquivo requirements.txt listando versões exatas de pacotes, então "pip install -r requirements.txt" consegue reproduzir o mesmo conjunto de dependências em outra máquina; rodar o pip sem nenhum ambiente virtual ativo instala pacotes no sistema inteiro, algo que a maioria dos fluxos de trabalho modernos em Python evita deliberadamente em favor de um ambiente isolado por projeto.',
    },
    subcommands: {
      install: {
        en: 'Installs one or more packages, or every package listed in a requirements file with -r.',
        pt: 'Instala um ou mais pacotes, ou todo pacote listado em um arquivo de requisitos com -r.',
      },
      uninstall: {
        en: 'Removes an installed package.',
        pt: 'Remove um pacote instalado.',
      },
      list: {
        en: 'Lists installed packages and their versions.',
        pt: 'Lista os pacotes instalados e suas versões.',
      },
      freeze: {
        en: 'Prints installed packages in requirements.txt format, commonly redirected into that file.',
        pt: 'Imprime os pacotes instalados no formato requirements.txt, normalmente redirecionado para esse arquivo.',
      },
    },
    flags: {
      '-r': {
        en: 'Installs every package listed in a requirements file.',
        pt: 'Instala todo pacote listado em um arquivo de requisitos.',
      },
      '-U': {
        en: 'Upgrades the package to the latest available version, instead of leaving an existing install alone.',
        pt: 'Atualiza o pacote para a versão mais recente disponível, em vez de deixar uma instalação existente como está.',
      },
    },
    valueFlags: {
      '-r': 'generic',
    },
  },

  yarn: {
    desc: {
      en: "An alternative package manager for JavaScript projects, created originally to fix speed and consistency problems in npm that have since mostly been fixed in npm itself, but yarn remains widely used and reads the exact same package.json a project already has. Its own lockfile format, yarn.lock, is not interchangeable with npm's package-lock.json, which is why a project should commit to using one or the other consistently rather than switching back and forth.",
      pt: 'Um gerenciador de pacotes alternativo para projetos JavaScript, criado originalmente para corrigir problemas de velocidade e consistência do npm que desde então foram em grande parte corrigidos no próprio npm, mas o yarn continua amplamente usado e lê o mesmo package.json que um projeto já tem. Seu próprio formato de lockfile, o yarn.lock, não é intercambiável com o package-lock.json do npm, motivo pelo qual um projeto deveria se comprometer a usar um ou outro de forma consistente, em vez de alternar entre eles.',
    },
    subcommands: {
      add: {
        en: "Installs a package and adds it to the project's dependencies.",
        pt: 'Instala um pacote e o adiciona às dependências do projeto.',
      },
      install: {
        en: "Installs every dependency listed in the project's package.json.",
        pt: 'Instala toda dependência listada no package.json do projeto.',
      },
      remove: {
        en: 'Uninstalls a package and removes it from the dependencies.',
        pt: 'Desinstala um pacote e o remove das dependências.',
      },
      run: {
        en: 'Runs a script defined in package.json.',
        pt: 'Executa um script definido no package.json.',
      },
    },
    flags: {
      '-D': {
        en: 'Adds the package as a development dependency, not needed in production.',
        pt: 'Adiciona o pacote como dependência de desenvolvimento, não necessária em produção.',
      },
    },
  },

  pnpm: {
    desc: {
      en: 'A JavaScript package manager built around a single shared storage of packages on disk, with projects linking to that store instead of each project keeping its own full copy of every dependency. That design is what makes it dramatically faster and lighter on disk space than npm or yarn on a machine with many JavaScript projects, since a library used by ten projects is only ever actually stored once.',
      pt: 'Um gerenciador de pacotes JavaScript construído em torno de um armazenamento único e compartilhado de pacotes no disco, com os projetos se ligando a esse armazém em vez de cada projeto guardar sua própria cópia completa de cada dependência. Esse design é o que o torna dramaticamente mais rápido e mais leve em espaço de disco do que npm ou yarn em uma máquina com muitos projetos JavaScript, já que uma biblioteca usada por dez projetos só é de fato armazenada uma vez.',
    },
    subcommands: {
      add: {
        en: "Installs a package and adds it to the project's dependencies.",
        pt: 'Instala um pacote e o adiciona às dependências do projeto.',
      },
      install: {
        en: "Installs every dependency listed in the project's package.json.",
        pt: 'Instala toda dependência listada no package.json do projeto.',
      },
      remove: {
        en: 'Uninstalls a package and removes it from the dependencies.',
        pt: 'Desinstala um pacote e o remove das dependências.',
      },
      run: {
        en: 'Runs a script defined in package.json.',
        pt: 'Executa um script definido no package.json.',
      },
    },
    flags: {
      '-D': {
        en: 'Adds the package as a development dependency, not needed in production.',
        pt: 'Adiciona o pacote como dependência de desenvolvimento, não necessária em produção.',
      },
    },
  },

  podman: {
    desc: {
      en: "A container engine that mirrors the Docker command-line interface closely enough that most 'docker' commands work unchanged as 'podman' commands, but with a fundamentally different architecture: it runs without a permanently running background daemon, and containers can run entirely as an unprivileged user rather than needing root or a root-owned daemon socket. That daemonless, rootless design is its main selling point over Docker on systems where either matters.",
      pt: 'Um motor de containers que espelha a interface de linha de comando do Docker de perto o suficiente para que a maioria dos comandos "docker" funcione sem mudanças como comandos "podman", mas com uma arquitetura fundamentalmente diferente: roda sem um daemon de segundo plano permanentemente ativo, e containers podem rodar inteiramente como um usuário sem privilégios, em vez de precisar de root ou de um socket de daemon pertencente ao root. Esse design sem daemon e sem necessidade de root é seu principal atrativo sobre o Docker em sistemas onde isso importa.',
    },
    subcommands: {
      run: {
        en: 'Creates and starts a new container from an image.',
        pt: 'Cria e inicia um novo container a partir de uma imagem.',
      },
      ps: {
        en: 'Lists running containers.',
        pt: 'Lista os containers em execução.',
      },
      build: {
        en: 'Creates a new image from a Containerfile or Dockerfile.',
        pt: 'Cria uma nova imagem a partir de um Containerfile ou Dockerfile.',
      },
      pull: {
        en: 'Downloads an image from a remote registry.',
        pt: 'Baixa uma imagem de um registro remoto.',
      },
    },
    flags: {
      '-d': {
        en: 'Runs the container in the background (detached mode).',
        pt: "Roda o container em segundo plano (modo 'detached').",
      },
      '-p': {
        en: 'Maps a port on the host machine to a port inside the container.',
        pt: 'Mapeia uma porta da máquina host para uma porta dentro do container.',
      },
    },
    valueFlags: {
      '-p': 'generic',
    },
  },

  snap: {
    desc: {
      en: "Installs and manages snap packages, a cross-distribution packaging format (developed by Canonical for Ubuntu) that bundles an application together with all its dependencies into one self-contained, sandboxed unit, trading some disk space and startup speed for an app that behaves the same across every Linux distribution it supports, without depending on that distro's own package versions.",
      pt: 'Instala e gerencia pacotes snap, um formato de empacotamento entre distribuições (desenvolvido pela Canonical para o Ubuntu) que empacota uma aplicação junto com todas as suas dependências em uma unidade autossuficiente e isolada, trocando um pouco de espaço em disco e velocidade de inicialização por uma aplicação que se comporta igual em toda distribuição Linux que suporta, sem depender das versões de pacote próprias daquela distro.',
    },
    subcommands: {
      install: {
        en: 'Installs a snap package.',
        pt: 'Instala um pacote snap.',
      },
      remove: {
        en: 'Removes an installed snap.',
        pt: 'Remove um snap instalado.',
      },
      list: {
        en: 'Lists installed snaps.',
        pt: 'Lista os snaps instalados.',
      },
      refresh: {
        en: 'Updates installed snaps to their latest available version.',
        pt: 'Atualiza os snaps instalados para a versão mais recente disponível.',
      },
    },
    flags: {
      '--classic': {
        en: 'Installs the snap without its usual sandbox confinement, needed by tools that require broader system access.',
        pt: 'Instala o snap sem seu confinamento de sandbox usual, necessário para ferramentas que exigem acesso mais amplo ao sistema.',
      },
    },
  },

  yum: {
    desc: {
      en: "The package manager traditionally used on Red Hat, CentOS, and Fedora-family distributions, the RPM-based counterpart to apt on Debian systems, resolving dependencies and installing packages from configured repositories the same way. It has been superseded by dnf on current Fedora and RHEL releases, which keeps yum's command syntax working as a compatibility layer while being a faster, more modern implementation underneath.",
      pt: 'O gerenciador de pacotes tradicionalmente usado em distribuições da família Red Hat, CentOS e Fedora, o equivalente baseado em RPM ao apt em sistemas Debian, resolvendo dependências e instalando pacotes de repositórios configurados da mesma forma. Foi substituído pelo dnf nas versões atuais do Fedora e RHEL, que mantém a sintaxe de comando do yum funcionando como camada de compatibilidade, sendo por baixo uma implementação mais rápida e moderna.',
    },
    subcommands: {
      install: {
        en: 'Installs one or more packages.',
        pt: 'Instala um ou mais pacotes.',
      },
      remove: {
        en: 'Removes a package.',
        pt: 'Remove um pacote.',
      },
      update: {
        en: 'Updates installed packages to their latest available version.',
        pt: 'Atualiza os pacotes instalados para a versão mais recente disponível.',
      },
      search: {
        en: 'Searches for packages by name or description.',
        pt: 'Procura pacotes pelo nome ou descrição.',
      },
    },
    flags: {
      '-y': {
        en: "Automatically answers 'yes' to every confirmation, without asking.",
        pt: "Responde automaticamente 'sim' para todas as confirmações, sem perguntar.",
      },
    },
  },

  dnf: {
    desc: {
      en: 'The modern package manager on Fedora and current RHEL/CentOS releases, the direct successor to yum, keeping the same general command shape (install, remove, update, search) while resolving dependencies faster and more reliably underneath.',
      pt: 'O gerenciador de pacotes moderno no Fedora e nas versões atuais do RHEL/CentOS, o sucessor direto do yum, mantendo a mesma forma geral de comando (install, remove, update, search) enquanto resolve dependências de forma mais rápida e confiável por baixo.',
    },
    subcommands: {
      install: {
        en: 'Installs one or more packages.',
        pt: 'Instala um ou mais pacotes.',
      },
      remove: {
        en: 'Removes a package.',
        pt: 'Remove um pacote.',
      },
      update: {
        en: 'Updates installed packages to their latest available version.',
        pt: 'Atualiza os pacotes instalados para a versão mais recente disponível.',
      },
      search: {
        en: 'Searches for packages by name or description.',
        pt: 'Procura pacotes pelo nome ou descrição.',
      },
    },
    flags: {
      '-y': {
        en: "Automatically answers 'yes' to every confirmation, without asking.",
        pt: "Responde automaticamente 'sim' para todas as confirmações, sem perguntar.",
      },
    },
  },

  pacman: {
    desc: {
      en: "Arch Linux's package manager, distinctive for how directly it exposes what it is doing: its flags are combinable single letters with a consistent grammar (-S to sync/install, -R to remove, -Q to query what's installed, -Sy to refresh the package database, -Syu to refresh and upgrade everything). That terseness is beloved by Arch users and bewildering to everyone else on first contact, since 'pacman -Syu' looks nothing like 'apt update && apt upgrade' despite doing roughly the same thing.",
      pt: 'O gerenciador de pacotes do Arch Linux, marcante por quão diretamente expõe o que está fazendo: suas flags são letras únicas combináveis com uma gramática consistente (-S para sincronizar/instalar, -R para remover, -Q para consultar o que está instalado, -Sy para atualizar o banco de pacotes, -Syu para atualizar e fazer upgrade de tudo). Essa concisão é adorada por usuários do Arch e desconcertante para todo mundo no primeiro contato, já que "pacman -Syu" não se parece em nada com "apt update && apt upgrade" apesar de fazer basicamente a mesma coisa.',
    },
    subcommands: {},
    flags: {
      '-S': {
        en: 'Synchronizes and installs a package from the configured repositories.',
        pt: 'Sincroniza e instala um pacote a partir dos repositórios configurados.',
      },
      '-R': {
        en: 'Removes a package.',
        pt: 'Remove um pacote.',
      },
      '-Syu': {
        en: 'Refreshes the package database and upgrades every installed package, the Arch equivalent of apt update && apt upgrade.',
        pt: 'Atualiza o banco de pacotes e faz upgrade de todo pacote instalado, o equivalente do Arch a apt update && apt upgrade.',
      },
      '-Q': {
        en: 'Queries the local package database, listing what is currently installed.',
        pt: 'Consulta o banco de pacotes local, listando o que está instalado no momento.',
      },
    },
  },
};
