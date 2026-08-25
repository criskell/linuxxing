import type { Locale } from '../i18n/languages';

export type LocalizedText = Record<Locale, string>;

export type ValueKind = 'generic' | 'octal-mode';

export interface CommandDef {
  desc: LocalizedText;
  subcommands: Record<string, LocalizedText>;
  flags: Record<string, LocalizedText>;
  valueFlags?: Record<string, ValueKind>;
  argHint?: LocalizedText;
}

export type CommandKB = Record<string, CommandDef>;

export const COMMANDS: CommandKB = {
  systemctl: {
    desc: {
      en: 'Controls systemd, the init system and service manager used by most modern Linux distributions to start, stop, and supervise background programs, called units. Rather than just launching a program and forgetting about it, systemd tracks each unit\'s state, can restart it automatically if it crashes, and lets units declare dependencies on each other, so a database can be guaranteed to come up before the application that needs it. It replaced older init systems like SysV and Upstart, and today is the standard way to manage anything meant to run continuously, from web servers to scheduled timers.',
      pt: 'Controla o systemd, o sistema de inicialização e gerenciador de serviços usado pela maioria das distribuições Linux modernas para iniciar, parar e supervisionar programas em segundo plano, chamados de units. Em vez de simplesmente rodar um programa e esquecê-lo, o systemd acompanha o estado de cada unit, pode reiniciá-la automaticamente se ela travar, e permite que units declarem dependências entre si, garantindo por exemplo que um banco de dados suba antes da aplicação que depende dele. Ele substituiu sistemas de inicialização mais antigos como SysV e Upstart, e hoje é a forma padrão de gerenciar qualquer coisa que deva rodar continuamente, de servidores web a tarefas agendadas.',
    },
    subcommands: {
      start: {
        en: 'Starts the service now, with immediate effect. It does not change whether the service starts automatically on next boot.',
        pt: 'Inicia o serviço agora, com efeito imediato. Não altera se ele inicia sozinho no próximo boot.',
      },
      stop: {
        en: 'Stops the service now.',
        pt: 'Para o serviço agora.',
      },
      restart: {
        en: 'Stops and starts the service again, in sequence.',
        pt: 'Para e inicia o serviço de novo, em sequência.',
      },
      reload: {
        en: 'Asks the service to reload its configuration without killing the process.',
        pt: 'Pede ao serviço para recarregar sua configuração sem derrubar o processo.',
      },
      'reload-or-restart': {
        en: 'Reloads the configuration if the service supports it; otherwise, restarts it.',
        pt: 'Recarrega a configuração se o serviço suportar; senão, reinicia.',
      },
      enable: {
        en: 'Creates the links needed for the service to start automatically on next boot. On its own, it does not start the service now.',
        pt: 'Cria os links necessários para o serviço iniciar sozinho no próximo boot. Sozinho, não inicia o serviço agora.',
      },
      disable: {
        en: 'Removes the automatic-start links. On its own, it does not stop the service if it is already running.',
        pt: 'Remove os links de inicialização automática. Sozinho, não para o serviço se ele já estiver rodando.',
      },
      status: {
        en: 'Shows whether the service is active, its PID, and the latest log lines.',
        pt: 'Mostra se o serviço está ativo, o PID, e as últimas linhas de log.',
      },
      'is-active': {
        en: 'Quickly reports whether the service is active or not.',
        pt: 'Responde rapidamente se o serviço está ativo ou não.',
      },
      'is-enabled': {
        en: 'Quickly reports whether the service is enabled to start on boot.',
        pt: 'Responde rapidamente se o serviço está habilitado para iniciar no boot.',
      },
      mask: {
        en: 'Blocks the service entirely, preventing it from being started even manually.',
        pt: 'Bloqueia o serviço por completo, impedindo até que ele seja iniciado manualmente.',
      },
      unmask: {
        en: "Undoes the block created by 'mask'.",
        pt: "Desfaz o bloqueio feito por 'mask'.",
      },
      'daemon-reload': {
        en: 'Reloads the definitions of all units after configuration files have been edited manually.',
        pt: 'Recarrega as definições de todas as units depois que arquivos de configuração foram editados manualmente.',
      },
      'list-units': {
        en: 'Lists the units currently loaded by systemd.',
        pt: 'Lista as units atualmente carregadas pelo systemd.',
      },
    },
    flags: {
      '--user': {
        en: "Operates on the current user's systemd instance instead of the whole system. User services don't need root privileges and only exist while the user session exists.",
        pt: 'Opera no gerenciador do systemd da sessão do usuário atual, em vez do sistema inteiro. Serviços de usuário não precisam de privilégios de root e só existem enquanto a sessão do usuário existe.',
      },
      '--system': {
        en: 'Operates on the system-wide manager (root). This is the default behavior when --user is not used.',
        pt: 'Opera no gerenciador do sistema (root). É o comportamento padrão quando --user não é usado.',
      },
      '--now': {
        en: "Applies the immediate effect alongside the action: with 'enable' it also starts the service now; with 'disable' it also stops the service now.",
        pt: "Aplica o efeito imediato junto com a ação: com 'enable', também inicia o serviço agora; com 'disable', também para o serviço agora.",
      },
      '--global': {
        en: 'Applies the change to every user on the system, instead of just the current one (used together with --user).',
        pt: 'Aplica a mudança a todos os usuários do sistema, em vez de só ao usuário atual (usado junto com --user).',
      },
      '--force': {
        en: 'Forces the operation even if conflicts exist, overwriting links that already exist.',
        pt: 'Força a operação mesmo que existam conflitos, sobrescrevendo links já existentes.',
      },
      '--quiet': {
        en: 'Reduces the amount of output shown.',
        pt: 'Reduz a quantidade de mensagens exibidas na saída.',
      },
      '--no-pager': {
        en: "Doesn't use a pager (like less) on the output, printing everything straight to the terminal instead.",
        pt: 'Não usa um paginador (como o less) na saída, imprimindo tudo direto no terminal.',
      },
      '--type': {
        en: 'Filters the listing by unit type, such as service, socket, or timer.',
        pt: 'Filtra a listagem por tipo de unit, como service, socket ou timer.',
      },
    },
    valueFlags: {
      '--type': 'generic',
    },
  },

  git: {
    desc: {
      en: 'Distributed version control system that tracks every change made to a project over time, letting a team work on the same codebase without overwriting each other. Every developer holds a full copy of the project history locally, which is why git works offline and why branching and merging are cheap: creating a new line of work is just a pointer, not a copy of every file. It underpins virtually all modern software collaboration, from solo side projects to companies with thousands of contributors, usually paired with a remote host like GitHub or GitLab for sharing.',
      pt: 'Sistema de controle de versão distribuído que rastreia toda mudança feita em um projeto ao longo do tempo, permitindo que um time trabalhe no mesmo código sem sobrescrever o trabalho um do outro. Cada desenvolvedor guarda uma cópia completa do histórico do projeto localmente, e é por isso que o git funciona offline e por que criar e juntar branches é barato: uma nova linha de trabalho é só um ponteiro, não uma cópia de todos os arquivos. Ele sustenta praticamente toda a colaboração de software moderna, de projetos pessoais a empresas com milhares de contribuidores, geralmente combinado com um host remoto como GitHub ou GitLab para compartilhamento.',
    },
    subcommands: {
      status: {
        en: "Shows which files were modified, which are staged for commit, and what branch you're on.",
        pt: 'Mostra quais arquivos foram modificados, quais estão prontos para commit e em que branch você está.',
      },
      add: {
        en: 'Marks changes in files to be included in the next commit (the staging area).',
        pt: "Marca mudanças em arquivos para entrarem no próximo commit (área de 'staging').",
      },
      commit: {
        en: 'Saves the staged changes as a new point in the project history.',
        pt: 'Salva as mudanças marcadas como um novo ponto no histórico do projeto.',
      },
      push: {
        en: 'Sends local commits to a remote repository.',
        pt: 'Envia os commits locais para um repositório remoto.',
      },
      pull: {
        en: 'Fetches and applies changes from a remote repository into the local one.',
        pt: 'Traz e aplica as mudanças de um repositório remoto para o repositório local.',
      },
      fetch: {
        en: "Downloads changes from a remote repository without applying them yet.",
        pt: 'Baixa as mudanças de um repositório remoto sem aplicá-las ainda.',
      },
      clone: {
        en: 'Copies an entire repository (with history) from a remote location to the local machine.',
        pt: 'Copia um repositório inteiro (com histórico) de um lugar remoto para a máquina local.',
      },
      branch: {
        en: 'Creates, lists, or deletes branches (parallel lines of development).',
        pt: 'Cria, lista ou apaga branches (linhas paralelas de desenvolvimento).',
      },
      checkout: {
        en: 'Switches to another branch or restores files to a previous state.',
        pt: 'Troca para outra branch ou restaura arquivos para um estado anterior.',
      },
      switch: {
        en: 'Switches to another branch (a newer, more specific alternative to checkout).',
        pt: 'Troca para outra branch (alternativa mais nova e específica ao checkout).',
      },
      merge: {
        en: "Joins another branch's history into the current branch.",
        pt: 'Junta o histórico de uma branch dentro da branch atual.',
      },
      rebase: {
        en: 'Replays commits from the current branch on top of another base, rewriting history.',
        pt: 'Reaplica commits da branch atual em cima de outra base, reescrevendo o histórico.',
      },
      log: {
        en: 'Shows the commit history.',
        pt: 'Mostra o histórico de commits.',
      },
      diff: {
        en: 'Shows differences between versions of files.',
        pt: 'Mostra as diferenças entre versões de arquivos.',
      },
      stash: {
        en: 'Sets uncommitted changes aside temporarily.',
        pt: 'Guarda mudanças não commitadas de lado temporariamente.',
      },
      init: {
        en: 'Creates a new, empty Git repository in the current folder.',
        pt: 'Cria um novo repositório Git vazio na pasta atual.',
      },
      reset: {
        en: 'Undoes commits or staged changes, and can also discard changes in the working directory.',
        pt: 'Desfaz commits ou mudanças na área de staging, podendo também descartar mudanças no diretório de trabalho.',
      },
    },
    flags: {
      '-m': {
        en: 'Provides the commit message directly on the command line, without opening a text editor.',
        pt: 'Fornece a mensagem do commit diretamente na linha de comando, sem abrir um editor de texto.',
      },
      '--message': {
        en: 'Provides the commit message directly on the command line, without opening a text editor.',
        pt: 'Fornece a mensagem do commit diretamente na linha de comando, sem abrir um editor de texto.',
      },
      '-a': {
        en: "Automatically stages all already-tracked files that were modified, without needing 'git add' first.",
        pt: "Inclui automaticamente todos os arquivos já rastreados que foram modificados, sem precisar de 'git add' antes.",
      },
      '--all': {
        en: 'Includes all modified tracked files (long form of -a), or affects every branch, depending on the subcommand.',
        pt: 'Inclui todos os arquivos rastreados modificados (variante longa de -a) ou afeta todas as branches, dependendo do subcomando.',
      },
      '-b': {
        en: 'Creates a new branch while switching with checkout/switch.',
        pt: 'Cria uma nova branch ao trocar de branch com checkout/switch.',
      },
      '--force': {
        en: 'Forces the operation even when it would normally be rejected for safety (e.g. overwriting remote history).',
        pt: 'Força a operação mesmo que ela normalmente seria rejeitada por segurança (ex: sobrescrever histórico remoto).',
      },
      '-f': {
        en: 'Forces the operation even when it would normally be rejected for safety.',
        pt: 'Força a operação mesmo que ela normalmente seria rejeitada por segurança.',
      },
      '--global': {
        en: 'Applies the configuration to every repository for the user, not just the current one.',
        pt: 'Aplica a configuração para todos os repositórios do usuário, não só o atual.',
      },
      '--amend': {
        en: 'Modifies the most recent commit instead of creating a new one.',
        pt: 'Modifica o commit mais recente em vez de criar um novo.',
      },
    },
    valueFlags: {
      '-m': 'generic',
      '--message': 'generic',
      '-b': 'generic',
    },
  },

  docker: {
    desc: {
      en: 'Tool for building, running, and managing containers, isolated, lightweight environments that package an application together with its libraries, dependencies, and configuration so it behaves the same wherever it runs. Containers share the host machine\'s kernel instead of virtualizing a whole operating system, which makes them far faster to start and lighter on resources than a traditional virtual machine, while still keeping applications from interfering with each other. Docker popularized this workflow with a simple image format (the Dockerfile), a registry for sharing images (Docker Hub), and a consistent CLI, which is why it became the default way to package and ship software across development, testing, and production.',
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
        en: "Runs the container in the background (detached mode), returning control of the terminal right away.",
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
  },

  ls: {
    desc: {
      en: 'Lists the files and folders inside a directory, one of the most frequently typed commands in any Unix-like shell. On its own it prints just the visible names in the current directory, but it becomes far more useful combined with flags: -l shows a detailed table with permissions, owner, and size, -a reveals hidden dotfiles, and -h turns raw byte counts into human-readable sizes. It reads the directory entries the kernel already has in memory, so it is essentially instantaneous even on folders with thousands of files.',
      pt: 'Lista os arquivos e pastas dentro de um diretório, um dos comandos mais digitados em qualquer shell Unix. Sozinho, imprime só os nomes visíveis no diretório atual, mas se torna muito mais útil combinado com flags: -l mostra uma tabela detalhada com permissões, dono e tamanho, -a revela arquivos ocultos (dotfiles), e -h transforma contagens de bytes em tamanhos legíveis. Ele lê as entradas de diretório que o kernel já tem em memória, então é essencialmente instantâneo mesmo em pastas com milhares de arquivos.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Uses long format, showing permissions, owner, size, and date for each item.',
        pt: 'Usa o formato longo, mostrando permissões, dono, tamanho e data de cada item.',
      },
      '-a': {
        en: 'Also shows hidden files (starting with a dot).',
        pt: 'Mostra também arquivos ocultos (que começam com ponto).',
      },
      '-h': {
        en: 'Shows file sizes in human-readable form (KB, MB, GB) instead of bytes.',
        pt: 'Mostra tamanhos de arquivo em formato legível (KB, MB, GB) em vez de bytes.',
      },
      '-t': {
        en: 'Sorts items by modification date, newest first.',
        pt: 'Ordena os itens pela data de modificação, mais recente primeiro.',
      },
      '-r': {
        en: 'Reverses the listing order.',
        pt: 'Inverte a ordem da listagem.',
      },
      '-R': {
        en: 'Lists the contents of subfolders recursively.',
        pt: 'Lista o conteúdo de subpastas recursivamente.',
      },
      '--color': {
        en: 'Colors the output according to each item type (folder, executable, link, etc).',
        pt: 'Colore a saída de acordo com o tipo de cada item (pasta, executável, link, etc.).',
      },
    },
    argHint: {
      en: 'The folder to list. Defaults to the current directory when omitted.',
      pt: 'A pasta a listar. Por padrão é o diretório atual, quando omitido.',
    },
  },

  chmod: {
    desc: {
      en: "Changes the read, write, and execute permissions of a file or folder, controlling who can do what with it. Every file on a Unix-like system carries three permission sets, one each for its owner, its group, and everyone else, and chmod is the tool that edits them, either symbolically (u+x adds execute for the owner) or with the compact three or four-digit octal notation (755, 644). It is one of the first commands anyone learns, because a surprising number of everyday problems, a script that 'won't run', a web server that can't read a file, trace back to a wrong permission bit.",
      pt: 'Altera as permissões de leitura, escrita e execução de um arquivo ou pasta, controlando quem pode fazer o quê com ele. Todo arquivo em um sistema Unix carrega três conjuntos de permissão, um para o dono, um para o grupo e um para os demais, e o chmod é a ferramenta que os edita, seja de forma simbólica (u+x adiciona execução para o dono) ou pela notação octal compacta de três ou quatro dígitos (755, 644). É um dos primeiros comandos que qualquer pessoa aprende, porque um número surpreendente de problemas do dia a dia, um script que "não roda", um servidor web que não consegue ler um arquivo, tem origem em um bit de permissão errado.',
    },
    subcommands: {},
    flags: {
      '-R': {
        en: 'Applies the permission change recursively to every file inside a folder.',
        pt: 'Aplica a mudança de permissão recursivamente, a todos os arquivos dentro de uma pasta.',
      },
      '-v': {
        en: 'Shows what was changed on screen (verbose mode).',
        pt: 'Mostra na tela o que foi alterado (modo verboso).',
      },
    },
    argHint: {
      en: 'The file or folder whose permissions are being changed.',
      pt: 'O arquivo ou pasta cujas permissões estão sendo alteradas.',
    },
  },

  chown: {
    desc: {
      en: "Changes which user and group own a file or folder, separate from what chmod controls (which is what the owner and group are allowed to do). It is typically used with root privileges, since only root or the current owner can hand a file off to someone else, and it comes up constantly when deploying software: a web server process running as a low-privilege user like www-data needs to actually own the files it serves, or every read will be denied regardless of what the permission bits say.",
      pt: 'Altera qual usuário e grupo são donos de um arquivo ou pasta, algo separado do que o chmod controla (que é o que esse dono e grupo têm permissão de fazer). É normalmente usado com privilégios de root, já que só o root ou o dono atual pode transferir um arquivo para outra pessoa, e aparece constantemente no dia a dia de deploy: um processo de servidor web rodando como um usuário de baixo privilégio, como www-data, precisa realmente ser dono dos arquivos que serve, ou toda leitura será negada independente do que os bits de permissão digam.',
    },
    subcommands: {},
    flags: {
      '-R': {
        en: 'Applies the change recursively to every file inside a folder.',
        pt: 'Aplica a mudança recursivamente, a todos os arquivos dentro de uma pasta.',
      },
    },
    argHint: {
      en: 'The new owner (optionally owner:group), or the file/folder being changed. The owner spec comes first.',
      pt: 'O novo dono (opcionalmente dono:grupo), ou o arquivo/pasta sendo alterado. O dono vem primeiro.',
    },
  },

  rm: {
    desc: {
      en: "Removes (deletes) files or folders from the filesystem. Unlike deleting through a graphical file manager, there is no trash bin to recover from: once rm finishes, the space the file occupied is simply marked free, and the data is gone for all practical purposes. This is precisely what makes 'rm -rf' one of the most feared command combinations in computing: -r makes it recurse into folders and -f suppresses every confirmation prompt, so a single misplaced space or wrong path (rm -rf / instead of rm -rf ./) can erase far more than intended, with nothing to undo it.",
      pt: 'Remove (apaga) arquivos ou pastas do sistema de arquivos. Ao contrário de apagar por um gerenciador de arquivos gráfico, não existe uma lixeira para recuperar depois: assim que o rm termina, o espaço que o arquivo ocupava é simplesmente marcado como livre, e os dados somem para todos os efeitos práticos. É exatamente isso que torna o "rm -rf" uma das combinações de comando mais temidas da computação: o -r faz ele entrar recursivamente em pastas e o -f suprime toda confirmação, então um único espaço no lugar errado ou caminho errado (rm -rf / em vez de rm -rf ./) pode apagar muito mais do que o pretendido, sem nada para desfazer.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Removes folders and all their contents, recursively.',
        pt: 'Remove pastas e todo o seu conteúdo, recursivamente.',
      },
      '-R': {
        en: 'Removes folders and all their contents, recursively.',
        pt: 'Remove pastas e todo o seu conteúdo, recursivamente.',
      },
      '-f': {
        en: 'Forces removal without asking for confirmation, even for write-protected files.',
        pt: 'Força a remoção sem pedir confirmação, mesmo para arquivos protegidos contra escrita.',
      },
      '-i': {
        en: 'Asks for confirmation before deleting each file.',
        pt: 'Pede confirmação antes de apagar cada arquivo.',
      },
      '-v': {
        en: 'Shows each removed file on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo removido (modo verboso).',
      },
    },
    argHint: {
      en: 'The file or folder to remove.',
      pt: 'O arquivo ou pasta a remover.',
    },
  },

  cp: {
    desc: {
      en: "Copies files or folders from one place to another, leaving the original untouched. By default it only copies individual files; copying a folder and everything inside it requires the -r (recursive) flag, a common source of confusion for anyone coming from a graphical file manager where that distinction doesn't exist. It works purely on the local filesystem (or between paths visible to it, including mounted network drives), unlike scp or rsync which are built for copying across machines over a network.",
      pt: 'Copia arquivos ou pastas de um lugar para outro, deixando o original intacto. Por padrão só copia arquivos individuais; copiar uma pasta e tudo dentro dela exige a flag -r (recursivo), uma fonte comum de confusão para quem vem de um gerenciador de arquivos gráfico, onde essa distinção não existe. Ele trabalha só no sistema de arquivos local (ou entre caminhos visíveis a ele, incluindo unidades de rede montadas), diferente do scp ou rsync, que são feitos para copiar entre máquinas pela rede.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Copies folders and all their contents, recursively.',
        pt: 'Copia pastas e todo o seu conteúdo, recursivamente.',
      },
      '-R': {
        en: 'Copies folders and all their contents, recursively.',
        pt: 'Copia pastas e todo o seu conteúdo, recursivamente.',
      },
      '-v': {
        en: 'Shows each copied file on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo copiado (modo verboso).',
      },
      '-i': {
        en: 'Asks for confirmation before overwriting an existing file.',
        pt: 'Pede confirmação antes de sobrescrever um arquivo existente.',
      },
    },
    argHint: {
      en: 'The source path to copy, or the destination (the last argument is normally the destination).',
      pt: 'O caminho de origem a copiar, ou o destino (o último argumento normalmente é o destino).',
    },
  },

  mv: {
    desc: {
      en: "Moves or renames files and folders. There is technically no difference between the two operations from mv's point of view; renaming a file is just moving it to a new name in the same directory, which is why 'mv old-name new-name' is the standard way to rename something on the command line. Moving within the same filesystem is instantaneous (the file's location on disk never changes, only the directory entry pointing to it), but moving across filesystems (like from one mounted drive to another) forces mv to copy the data and then delete the original.",
      pt: 'Move ou renomeia arquivos e pastas. Não existe diferença técnica entre as duas operações do ponto de vista do mv; renomear um arquivo nada mais é do que movê-lo para um novo nome no mesmo diretório, e é por isso que "mv nome-antigo nome-novo" é a forma padrão de renomear algo na linha de comando. Mover dentro do mesmo sistema de arquivos é instantâneo (a localização do arquivo no disco nunca muda, só a entrada de diretório que aponta para ele), mas mover entre sistemas de arquivos diferentes (como de uma unidade montada para outra) obriga o mv a copiar os dados e depois apagar o original.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Asks for confirmation before overwriting an existing file.',
        pt: 'Pede confirmação antes de sobrescrever um arquivo existente.',
      },
      '-v': {
        en: 'Shows each moved file on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo movido (modo verboso).',
      },
    },
    argHint: {
      en: 'The source path to move or rename, or the destination (the last argument is normally the destination).',
      pt: 'O caminho de origem a mover ou renomear, ou o destino (o último argumento normalmente é o destino).',
    },
  },

  grep: {
    desc: {
      en: "Searches for a text pattern inside one or more files (or piped input), printing every matching line. Its name comes from an old ed editor command, 'g/re/p' (globally search for a regular expression and print), and that regex engine is exactly what gives grep its power: patterns can be simple literal text or full regular expressions matching entire families of strings at once. It is the backbone of countless one-liners, piped after other commands to filter their output down to just the lines that matter, whether that is scanning logs for an error, checking if a package is installed, or finding every file that mentions a function name.",
      pt: 'Procura por um padrão de texto dentro de um ou mais arquivos (ou de uma entrada recebida por pipe), imprimindo cada linha que combinar. O nome vem de um comando antigo do editor ed, "g/re/p" (busque globalmente por uma expressão regular e imprima), e esse motor de expressões regulares é exatamente o que dá poder ao grep: os padrões podem ser texto literal simples ou expressões regulares completas, combinando com famílias inteiras de strings de uma vez. É a espinha dorsal de incontáveis one-liners, encadeado depois de outros comandos para filtrar a saída deles só nas linhas que importam, seja vasculhando logs em busca de um erro, checando se um pacote está instalado, ou achando todo arquivo que menciona o nome de uma função.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Ignores case differences when searching.',
        pt: 'Ignora diferença entre maiúsculas e minúsculas na busca.',
      },
      '-r': {
        en: 'Searches recursively through all subfolders.',
        pt: 'Procura recursivamente dentro de todas as subpastas.',
      },
      '-n': {
        en: 'Shows the line number where each match was found.',
        pt: 'Mostra o número da linha onde cada resultado foi encontrado.',
      },
      '-v': {
        en: "Inverts the search, showing only the lines that DON'T match the pattern.",
        pt: 'Inverte a busca, mostrando apenas as linhas que NÃO combinam com o padrão.',
      },
      '-c': {
        en: 'Shows only the count of matching lines, instead of the lines themselves.',
        pt: 'Mostra apenas a contagem de linhas que combinam, em vez das linhas em si.',
      },
      '-l': {
        en: 'Shows only the names of files that contain a matching line.',
        pt: 'Mostra apenas os nomes dos arquivos que contêm alguma linha correspondente.',
      },
      '-E': {
        en: 'Interprets the pattern as an extended regular expression.',
        pt: 'Interpreta o padrão como uma expressão regular estendida.',
      },
    },
    argHint: {
      en: 'The search pattern, or a file to search in. The pattern normally comes first.',
      pt: 'O padrão de busca, ou um arquivo onde procurar. O padrão normalmente vem primeiro.',
    },
  },

  find: {
    desc: {
      en: "Searches for files and folders within a directory tree, based on criteria like name, type, size, or modification date, and can act on whatever it finds. Where grep searches inside file contents, find searches the filesystem structure itself: it starts at a given path and walks every subfolder, testing each entry against the filters given. Its real strength shows up combined with -exec or piped into xargs, letting you find every file matching a pattern and then delete, move, or otherwise process all of them in a single command, which is why it shows up constantly in cleanup scripts and cron jobs.",
      pt: 'Procura arquivos e pastas dentro de uma árvore de diretórios, com base em critérios como nome, tipo, tamanho ou data de modificação, e pode agir sobre o que encontrar. Enquanto o grep procura dentro do conteúdo dos arquivos, o find procura na própria estrutura do sistema de arquivos: ele começa em um caminho dado e percorre cada subpasta, testando cada item contra os filtros passados. Sua força de verdade aparece combinado com -exec ou encadeado com o xargs, permitindo achar todo arquivo que combina com um padrão e então apagar, mover ou processar todos eles em um único comando, motivo pelo qual aparece constantemente em scripts de limpeza e tarefas de cron.',
    },
    subcommands: {},
    flags: {
      '-name': {
        en: 'Filters by file name (accepts wildcards like *).',
        pt: 'Filtra pelo nome do arquivo (aceita curingas como *).',
      },
      '-type': {
        en: "Filters by type: 'f' for regular file, 'd' for directory, among others.",
        pt: "Filtra pelo tipo: 'f' para arquivo comum, 'd' para diretório, entre outros.",
      },
      '-mtime': {
        en: 'Filters by modification date, in days.',
        pt: 'Filtra por data de modificação, em dias.',
      },
      '-size': {
        en: 'Filters by file size.',
        pt: 'Filtra pelo tamanho do arquivo.',
      },
      '-exec': {
        en: 'Runs a command on each file found.',
        pt: 'Executa um comando em cada arquivo encontrado.',
      },
    },
    valueFlags: {
      '-name': 'generic',
      '-type': 'generic',
      '-mtime': 'generic',
      '-size': 'generic',
    },
    argHint: {
      en: 'The starting directory to search from, usually the first argument.',
      pt: 'O diretório inicial de onde procurar, geralmente o primeiro argumento.',
    },
  },

  ssh: {
    desc: {
      en: "Opens a secure, encrypted connection to another machine over the network, to access its terminal, run a single command remotely, or tunnel other traffic through it. It replaced older, unencrypted tools like telnet and rlogin, and is the standard way to administer remote Linux servers: everything typed and returned is encrypted end to end, and authentication can use either a password or, far more commonly in practice, a public/private key pair generated with ssh-keygen. Beyond an interactive shell, ssh also underlies tools like scp, rsync, and git's SSH remotes, since they all reuse the same encrypted channel and key-based trust.",
      pt: 'Abre uma conexão criptografada e segura com outra máquina pela rede, para acessar o terminal dela, rodar um único comando remotamente, ou encapsular outro tráfego por ela. Ele substituiu ferramentas mais antigas e sem criptografia, como telnet e rlogin, e é a forma padrão de administrar servidores Linux remotos: tudo que é digitado e retornado é criptografado de ponta a ponta, e a autenticação pode usar senha ou, muito mais comum na prática, um par de chaves pública/privada gerado com ssh-keygen. Além de um shell interativo, o ssh também é a base de ferramentas como scp, rsync e os remotes SSH do git, já que todas reaproveitam o mesmo canal criptografado e confiança baseada em chave.',
    },
    subcommands: {},
    flags: {
      '-p': {
        en: 'Specifies the port of the remote SSH server (default is 22).',
        pt: 'Especifica a porta do servidor SSH remoto (o padrão é 22).',
      },
      '-i': {
        en: 'Specifies the private key file to use for authentication.',
        pt: 'Especifica o arquivo de chave privada a ser usado para autenticação.',
      },
      '-v': {
        en: 'Shows detailed connection information (verbose mode), useful for debugging.',
        pt: 'Mostra informações detalhadas sobre a conexão (modo verboso), útil para depurar problemas.',
      },
      '-L': {
        en: 'Creates a tunnel that forwards a local port to a port on the remote machine.',
        pt: 'Cria um túnel que encaminha uma porta local para uma porta na máquina remota.',
      },
    },
    valueFlags: {
      '-p': 'generic',
      '-i': 'generic',
      '-L': 'generic',
    },
    argHint: {
      en: 'The remote host to connect to, optionally as user@host.',
      pt: 'O host remoto ao qual conectar, opcionalmente como usuario@host.',
    },
  },

  curl: {
    desc: {
      en: "Transfers data to or from a URL, supporting HTTP, HTTPS, FTP, and a long list of other protocols, all from the terminal without a browser. It is the default tool for testing and debugging APIs (setting the method, headers, and body by hand), downloading files or install scripts, and checking how a server responds at a low level, since unlike a browser it shows exactly what was sent and received. Its ubiquity, curl ships on almost every Linux and macOS system by default, is also why 'curl ... | sh' became the common (if risky) one-line install pattern for so much developer tooling.",
      pt: 'Transfere dados de ou para uma URL, suportando HTTP, HTTPS, FTP e uma longa lista de outros protocolos, tudo direto do terminal sem precisar de navegador. É a ferramenta padrão para testar e depurar APIs (definindo método, headers e corpo manualmente), baixar arquivos ou scripts de instalação, e checar como um servidor responde em baixo nível, já que, ao contrário de um navegador, mostra exatamente o que foi enviado e recebido. Sua onipresença, o curl vem instalado por padrão em quase todo sistema Linux e macOS, também é o motivo de "curl ... | sh" ter virado o padrão comum (ainda que arriscado) de instalação em uma linha para tanta ferramenta de desenvolvedor.',
    },
    subcommands: {},
    flags: {
      '-X': {
        en: 'Sets the HTTP method for the request, such as GET, POST, or DELETE.',
        pt: 'Define o método HTTP da requisição, como GET, POST ou DELETE.',
      },
      '-H': {
        en: 'Adds a custom HTTP header to the request.',
        pt: 'Adiciona um cabeçalho (header) HTTP customizado à requisição.',
      },
      '-d': {
        en: 'Sends data in the request body, usually with POST.',
        pt: 'Envia dados no corpo da requisição, geralmente usado com POST.',
      },
      '-o': {
        en: 'Saves the response to a file, instead of printing it to the screen.',
        pt: 'Salva a resposta em um arquivo, em vez de mostrar na tela.',
      },
      '-L': {
        en: 'Follows redirects automatically.',
        pt: 'Segue redirecionamentos automaticamente.',
      },
      '-s': {
        en: "Silent mode: hides the progress bar and error messages.",
        pt: 'Modo silencioso: não mostra barra de progresso nem mensagens de erro.',
      },
      '-I': {
        en: 'Fetches only the response headers, without the body.',
        pt: 'Busca apenas os cabeçalhos da resposta, sem o corpo.',
      },
      '-f': {
        en: 'Fails silently (no error page in the output) on server errors, and makes curl return a non-zero exit code, which is useful in scripts to detect failures.',
        pt: 'Falha silenciosamente (sem mostrar a página de erro) em erros do servidor, e faz o curl retornar um código de saída diferente de zero, o que é útil em scripts para detectar falhas.',
      },
      '-S': {
        en: 'Shows an error message if curl fails, even when combined with -s (silent mode).',
        pt: 'Mostra uma mensagem de erro se o curl falhar, mesmo combinado com -s (modo silencioso).',
      },
    },
    valueFlags: {
      '-X': 'generic',
      '-H': 'generic',
      '-d': 'generic',
      '-o': 'generic',
    },
    argHint: {
      en: 'The URL to request.',
      pt: 'A URL a requisitar.',
    },
  },

  kill: {
    desc: {
      en: "Sends a signal to a running process, identified by its process ID (PID). Despite the name, kill doesn't necessarily kill anything by default: it sends SIGTERM, a polite request asking the process to shut itself down and clean up first, and most well-behaved programs honor it. Only -9 (SIGKILL) is the unconditional, un-ignorable kill that the kernel enforces immediately, useful as a last resort when a process is hung and not responding to the polite version, but risky since it gives the process no chance to close files or finish writes.",
      pt: 'Envia um sinal a um processo em execução, identificado pelo seu ID de processo (PID). Apesar do nome, o kill não mata nada obrigatoriamente por padrão: ele envia SIGTERM, um pedido educado para que o processo se encerre e limpe as coisas sozinho, e a maioria dos programas bem-comportados respeita isso. Só o -9 (SIGKILL) é o encerramento incondicional e inescapável que o kernel aplica imediatamente, útil como último recurso quando um processo travou e não responde à versão educada, mas arriscado, já que não dá ao processo nenhuma chance de fechar arquivos ou terminar gravações.',
    },
    subcommands: {},
    flags: {
      '-9': {
        en: 'Sends the SIGKILL signal, forcing the process to terminate immediately, with no chance to clean up.',
        pt: 'Envia o sinal SIGKILL, que força o processo a terminar imediatamente, sem chance de limpeza.',
      },
      '-15': {
        en: 'Sends the SIGTERM signal, asking the process to terminate gracefully (this is the default).',
        pt: 'Envia o sinal SIGTERM, pedindo ao processo que termine de forma graciosa (é o padrão).',
      },
    },
    argHint: {
      en: 'The process ID (PID) to send the signal to.',
      pt: 'O ID de processo (PID) para o qual enviar o sinal.',
    },
  },

  ps: {
    desc: {
      en: "Shows a snapshot of the processes currently running on the system, each with its PID, terminal, memory and CPU usage, and the command that started it. Unlike top or htop, ps doesn't refresh continuously, it prints once and exits, which makes it easy to pipe into grep to find a specific process, or into a script that needs to check whether something is already running. Plain ps with no arguments only shows processes tied to the current terminal, which is why it is almost always used with a flag combination like 'aux' or '-ef' to see the whole system.",
      pt: 'Mostra um retrato dos processos em execução no sistema no momento, cada um com seu PID, terminal, uso de memória e CPU, e o comando que o iniciou. Diferente do top ou htop, o ps não atualiza continuamente, ele imprime uma vez e termina, o que facilita encadear com grep para achar um processo específico, ou usar em um script que precisa checar se algo já está rodando. O ps puro, sem argumentos, só mostra processos ligados ao terminal atual, e é por isso que quase sempre é usado com uma combinação de flags como "aux" ou "-ef" para ver o sistema inteiro.',
    },
    subcommands: {},
    flags: {
      '-e': {
        en: "Shows every process on the system, not just the current user's.",
        pt: 'Mostra todos os processos do sistema, não só os do usuário atual.',
      },
      '-f': {
        en: 'Shows full information about each process (full format).',
        pt: 'Mostra informações completas sobre cada processo (formato completo).',
      },
      aux: {
        en: "Classic combination that shows every process from every user, in detail, including those without a terminal.",
        pt: 'Combinação clássica que mostra todos os processos de todos os usuários, com detalhes, mesmo os sem terminal associado.',
      },
    },
  },

  sudo: {
    desc: {
      en: "Runs a single command with another user's privileges, usually the administrator (root), after checking that the calling user is authorized and (typically) asking for their own password. It exists as an alternative to logging in as root directly, which is considered bad practice: with sudo, every privileged action is tied to a specific user and logged, rules can be configured (via /etc/sudoers) to allow only certain commands, and the elevated privilege lasts only for that one command instead of an entire session. On most desktop and server Linux distributions today, root's password login is disabled entirely and sudo is the only way to gain administrative access.",
      pt: 'Executa um único comando com privilégios de outro usuário, normalmente o administrador (root), depois de checar se quem chamou está autorizado e (geralmente) pedir a senha da própria pessoa. Ele existe como alternativa a fazer login diretamente como root, prática considerada ruim: com o sudo, toda ação privilegiada fica associada a um usuário específico e é registrada em log, regras podem ser configuradas (via /etc/sudoers) para permitir só certos comandos, e o privilégio elevado dura apenas aquele comando, não uma sessão inteira. Na maioria das distribuições Linux modernas, tanto desktop quanto servidor, o login por senha do root vem desativado por padrão e o sudo é a única forma de ganhar acesso administrativo.',
    },
    subcommands: {},
    flags: {
      '-u': {
        en: 'Runs the command as a specific user, instead of root.',
        pt: 'Executa o comando como um usuário específico, em vez do root.',
      },
      '-i': {
        en: "Starts a login session simulating the target user's environment.",
        pt: 'Inicia uma sessão de login simulando o ambiente do usuário alvo.',
      },
    },
    valueFlags: {
      '-u': 'generic',
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
        en: "Adds the package as a development dependency, not needed in production.",
        pt: 'Adiciona o pacote como dependência de desenvolvimento, não necessária em produção.',
      },
      '-D': {
        en: '(shorthand for --save-dev) Adds the package as a development dependency.',
        pt: 'Adiciona o pacote como dependência de desenvolvimento (atalho para --save-dev).',
      },
    },
  },

  tar: {
    desc: {
      en: "Packs multiple files and folders into a single archive file (a .tar, short for tape archive, a name left over from when the format's main use was writing backups to magnetic tape), optionally compressing the result at the same time. Unlike zip, tar itself only concatenates files together, it doesn't compress; compression is bolted on separately via a flag like -z for gzip or -j for bzip2, which is why archives are commonly named .tar.gz. Its combination of flags is notoriously hard to remember, which is why 'tar -xzvf file.tar.gz' (extract, gzip, verbose, file) is one of the most frequently searched command incantations on the internet.",
      pt: 'Empacota vários arquivos e pastas em um único arquivo de arquivo (um .tar, de tape archive, um nome que sobrou de quando o uso principal do formato era escrever backups em fita magnética), opcionalmente compactando o resultado ao mesmo tempo. Diferente do zip, o tar sozinho só concatena arquivos, ele não compacta; a compactação é ligada separadamente por uma flag como -z para gzip ou -j para bzip2, motivo pelo qual arquivos costumam se chamar .tar.gz. Sua combinação de flags é notoriamente difícil de lembrar, e é por isso que "tar -xzvf arquivo.tar.gz" (extrair, gzip, verboso, arquivo) é uma das invocações de comando mais buscadas na internet.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Creates a new tar archive.',
        pt: 'Cria um novo arquivo tar.',
      },
      '-x': {
        en: "Extracts the contents of a tar archive.",
        pt: 'Extrai o conteúdo de um arquivo tar.',
      },
      '-v': {
        en: 'Shows each processed file on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo processado (modo verboso).',
      },
      '-f': {
        en: 'Specifies the name of the tar file to create or read.',
        pt: 'Especifica o nome do arquivo tar a ser criado ou lido.',
      },
      '-z': {
        en: 'Compresses or decompresses using gzip (.tar.gz files).',
        pt: 'Compacta ou descompacta usando gzip (arquivos .tar.gz).',
      },
      '-t': {
        en: 'Lists the contents of a tar archive without extracting it.',
        pt: 'Lista o conteúdo de um arquivo tar sem extrair.',
      },
    },
    valueFlags: {
      '-f': 'generic',
    },
    argHint: {
      en: 'A specific file inside the archive to add or extract, when not adding/extracting everything.',
      pt: 'Um arquivo específico dentro do pacote para adicionar ou extrair, quando não se está adicionando/extraindo tudo.',
    },
  },

  mkdir: {
    desc: {
      en: "Creates a new folder (directory). By default it only creates the last component of a path, and fails with an error if the parent folders in that path don't already exist, which is exactly the situation the -p flag is meant to solve, creating every missing folder along the way in one call instead of running mkdir repeatedly for each level.",
      pt: 'Cria uma nova pasta (diretório). Por padrão, só cria o último componente do caminho, e falha com erro se as pastas pai desse caminho ainda não existirem, exatamente a situação que a flag -p resolve, criando toda pasta que faltar ao longo do caminho em uma única chamada, em vez de rodar o mkdir repetidamente para cada nível.',
    },
    subcommands: {},
    flags: {
      '-p': {
        en: "Creates intermediate folders needed along the path, without erroring if one already exists.",
        pt: 'Cria pastas intermediárias necessárias no caminho, sem dar erro se alguma já existir.',
      },
    },
    argHint: {
      en: 'The folder to create.',
      pt: 'A pasta a criar.',
    },
  },

  cd: {
    desc: {
      en: "Changes the shell's current working directory, the folder that every relative path typed afterward is measured from. It is a shell builtin rather than a separate program on disk, which has to be true for a subtle reason: a program can only change its own process's working directory, never its parent shell's, so if cd were an external command, running it would have no lasting effect once it exited. Two shortcuts are worth knowing: 'cd' alone returns to the home directory, and 'cd -' jumps back to whichever directory you were in before the last cd.",
      pt: 'Muda o diretório de trabalho atual do shell, a pasta a partir da qual todo caminho relativo digitado depois é medido. É um comando interno do shell, e não um programa separado no disco, por um motivo sutil: um programa só consegue mudar o diretório de trabalho do próprio processo, nunca o do shell pai que o chamou, então se o cd fosse um comando externo, rodá-lo não teria efeito nenhum depois que ele terminasse. Vale conhecer dois atalhos: "cd" sozinho volta para o diretório home, e "cd -" pula de volta para o diretório em que você estava antes do último cd.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The directory to switch to.',
      pt: 'O diretório para o qual mudar.',
    },
  },

  cat: {
    desc: {
      en: "Prints the contents of one or more files straight to the terminal, with no pausing or scrolling controls (unlike less). Its name is short for 'concatenate': given several files, it prints them one after another as a single continuous stream, which is its actual original purpose, joining files together, and is why 'cat file1 file2 > combined' is a common idiom. For just reading a file, especially a long one, less is usually the better choice, since cat dumps everything to the screen at once.",
      pt: 'Mostra o conteúdo de um ou mais arquivos direto no terminal, sem nenhum controle de pausa ou rolagem (diferente do less). O nome é abreviação de "concatenate" (concatenar): dados vários arquivos, ele os imprime um atrás do outro como um único fluxo contínuo, que é seu propósito original de fato, juntar arquivos, e por isso "cat arquivo1 arquivo2 > combinado" é um idioma comum. Para simplesmente ler um arquivo, especialmente um longo, o less costuma ser a escolha melhor, já que o cat despeja tudo na tela de uma vez.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Numbers every line of the output.',
        pt: 'Numera todas as linhas da saída.',
      },
    },
    argHint: {
      en: 'The file to print.',
      pt: 'O arquivo a mostrar.',
    },
  },

  head: {
    desc: {
      en: "Shows the first lines of a file, 10 by default. It's the natural complement to tail, and the two are commonly used together to peek at both ends of a large file (a log, a CSV export) without opening the whole thing in an editor. Because it reads only as much as it needs and stops, head is also fast and safe on files far too large to load into memory at once.",
      pt: 'Mostra as primeiras linhas de um arquivo, 10 por padrão. É o complemento natural do tail, e os dois costumam ser usados juntos para dar uma olhada nas duas pontas de um arquivo grande (um log, uma exportação CSV) sem abrir o arquivo inteiro em um editor. Como só lê o quanto precisa e para, o head também é rápido e seguro em arquivos grandes demais para carregar na memória de uma vez.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Sets how many lines from the start of the file to show.',
        pt: 'Define quantas linhas do início do arquivo mostrar.',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The file to read.',
      pt: 'O arquivo a ler.',
    },
  },

  tail: {
    desc: {
      en: "Shows the last lines of a file, 10 by default, which is usually exactly what you want when checking a log: the most recent events are at the end, not the beginning. Its most important flag is -f ('follow'), which keeps the process running and prints new lines as they are appended in real time, making 'tail -f' the standard way to watch a log file live while debugging a running service.",
      pt: 'Mostra as últimas linhas de um arquivo, 10 por padrão, o que costuma ser exatamente o que se quer ao checar um log: os eventos mais recentes ficam no final, não no início. Sua flag mais importante é -f ("follow", seguir), que mantém o processo rodando e imprime novas linhas conforme são adicionadas em tempo real, fazendo do "tail -f" a forma padrão de acompanhar um log ao vivo enquanto se depura um serviço em execução.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Sets how many lines from the end of the file to show.',
        pt: 'Define quantas linhas do fim do arquivo mostrar.',
      },
      '-f': {
        en: 'Keeps following the file in real time, showing new lines as they are written.',
        pt: 'Continua acompanhando o arquivo em tempo real, mostrando novas linhas assim que são escritas.',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The file to read.',
      pt: 'O arquivo a ler.',
    },
  },

  df: {
    desc: {
      en: "Shows used and available disk space on each mounted filesystem, disk (short for 'disk free'), a whole-volume view rather than a per-file one. It is usually the first command reached for when a server starts complaining it is out of space, since it immediately shows which mount point (/, /var, a separate data volume) is actually full; finding which specific files or folders are responsible for that usage is du's job instead.",
      pt: 'Mostra o espaço em disco usado e disponível em cada sistema de arquivos montado, disk (abreviação de "disk free", disco livre), uma visão do volume inteiro, não por arquivo. Costuma ser o primeiro comando usado quando um servidor começa a reclamar que está sem espaço, já que mostra imediatamente qual ponto de montagem (/, /var, um volume de dados separado) está de fato cheio; descobrir quais arquivos ou pastas específicos são responsáveis por esse uso é trabalho do du.',
    },
    subcommands: {},
    flags: {
      '-h': {
        en: 'Shows sizes in human-readable form (KB, MB, GB) instead of blocks.',
        pt: 'Mostra os tamanhos em formato legível (KB, MB, GB) em vez de blocos.',
      },
    },
  },

  du: {
    desc: {
      en: "Shows disk space used by files and folders, disk usage, complementing df's whole-filesystem view with a breakdown of what is actually consuming that space. Run without flags on a large tree it prints a line for every single subfolder recursively, which is rarely what anyone wants; the idiomatic invocation is 'du -sh *' (summary, human-readable, on everything in the current folder), which gives a one-line total per top-level item, the fastest way to spot which folder is unexpectedly huge.",
      pt: 'Mostra o espaço em disco ocupado por arquivos e pastas, uso de disco, complementando a visão de sistema de arquivos inteiro do df com um detalhamento do que está de fato consumindo esse espaço. Rodado sem flags em uma árvore grande, imprime uma linha para cada subpasta recursivamente, o que raramente é o que alguém quer; a invocação idiomática é "du -sh *" (resumo, legível, em tudo na pasta atual), que dá um total de uma linha por item de nível superior, a forma mais rápida de achar qual pasta está inesperadamente enorme.',
    },
    subcommands: {},
    flags: {
      '-h': {
        en: 'Shows sizes in human-readable form (KB, MB, GB) instead of blocks.',
        pt: 'Mostra os tamanhos em formato legível (KB, MB, GB) em vez de blocos.',
      },
      '-s': {
        en: "Shows only the total for each folder, without detailing subfolders.",
        pt: 'Mostra apenas o total de cada pasta, sem detalhar subpastas.',
      },
    },
  },

  ping: {
    desc: {
      en: "Tests connectivity to another machine on the network by sending small ICMP echo request packets and timing how long each one takes to be answered. It is usually the very first diagnostic step when something seems unreachable, since it isolates whether the problem is basic network connectivity (packets aren't getting there at all) versus something higher up the stack, like a specific port being closed or a service being down. Unlike most commands, it runs forever by default, printing one line per packet until interrupted, which is why -c (a fixed packet count) shows up in almost every scripted use.",
      pt: 'Testa a conectividade com outra máquina na rede enviando pequenos pacotes ICMP echo request e cronometrando quanto tempo cada um leva para ser respondido. Costuma ser o primeiríssimo passo de diagnóstico quando algo parece inalcançável, já que isola se o problema é conectividade básica de rede (os pacotes simplesmente não estão chegando) ou algo mais acima na pilha, como uma porta específica fechada ou um serviço fora do ar. Diferente da maioria dos comandos, ele roda para sempre por padrão, imprimindo uma linha por pacote até ser interrompido, e é por isso que o -c (um número fixo de pacotes) aparece em quase todo uso em script.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Sets how many packets to send before stopping automatically.',
        pt: 'Define quantos pacotes enviar antes de parar automaticamente.',
      },
    },
    valueFlags: {
      '-c': 'generic',
    },
    argHint: {
      en: 'The host or IP address to test.',
      pt: 'O host ou endereço IP a testar.',
    },
  },

  command: {
    desc: {
      en: "A shell builtin that runs a program directly by looking it up in PATH, deliberately bypassing any shell alias or function that happens to share its name. This matters most in scripts, where an alias defined interactively in someone's shell config should never silently change what a script does, so 'command ls' guarantees the real ls binary runs regardless of what aliases exist. Its other common use, 'command -v', checks whether a program is installed and available without actually running it or producing an error if it isn't, which is why it appears constantly in install scripts as a portable alternative to which.",
      pt: 'Um comando interno do shell que executa um programa diretamente, buscando-o no PATH, contornando deliberadamente qualquer alias ou função do shell que tenha o mesmo nome. Isso importa mais em scripts, onde um alias definido interativamente na configuração de shell de alguém nunca deveria mudar silenciosamente o que um script faz, então "command ls" garante que o binário real do ls roda, independente de quais aliases existam. Seu outro uso comum, "command -v", checa se um programa está instalado e disponível sem realmente executá-lo ou gerar erro caso não esteja, motivo pelo qual aparece constantemente em scripts de instalação como alternativa portável ao which.',
    },
    subcommands: {},
    flags: {
      '-v': {
        en: 'Prints the path of the program if it exists in PATH, without running it. Commonly used to check whether a tool is installed.',
        pt: 'Imprime o caminho do programa se ele existir no PATH, sem executá-lo. Usado normalmente para checar se uma ferramenta está instalada.',
      },
      '-p': {
        en: "Uses a default, safe PATH to look up the command, ignoring any custom PATH the user has set.",
        pt: 'Usa um PATH padrão e seguro para procurar o comando, ignorando qualquer PATH customizado definido pelo usuário.',
      },
    },
  },

  fallocate: {
    desc: {
      en: "Pre-allocates disk space for a file immediately, marking the blocks as reserved at the filesystem level without actually writing any data into them. This is dramatically faster than the older trick of creating a large file by writing zeros to it (dd if=/dev/zero), since fallocate just updates the filesystem's metadata instead of pushing gigabytes of zero bytes through the disk. Its most common real-world use is creating a swap file of a specific size in one instant step, exactly as in 'fallocate -l 4G /swapfile'.",
      pt: 'Pré-aloca espaço em disco para um arquivo imediatamente, marcando os blocos como reservados no nível do sistema de arquivos sem realmente escrever dado nenhum neles. Isso é dramaticamente mais rápido do que o truque antigo de criar um arquivo grande escrevendo zeros nele (dd if=/dev/zero), já que o fallocate só atualiza os metadados do sistema de arquivos em vez de empurrar gigabytes de bytes zero pelo disco. Seu uso mais comum na prática é criar um arquivo de swap de um tamanho específico em um passo instantâneo, exatamente como em "fallocate -l 4G /swapfile".',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Sets the length/size of the space to allocate (e.g. 4G for 4 gigabytes).',
        pt: 'Define o tamanho do espaço a ser alocado (ex: 4G para 4 gigabytes).',
      },
    },
    valueFlags: {
      '-l': 'generic',
    },
    argHint: {
      en: 'The file to allocate space for.',
      pt: 'O arquivo para o qual alocar espaço.',
    },
  },

  mkswap: {
    desc: {
      en: "Formats a file or partition as swap space by writing the swap signature and metadata the kernel expects, the same way mkfs formats a partition as ext4 or xfs, but for swap specifically. This is a required middle step between creating the space (with fallocate or by partitioning a disk) and actually using it (with swapon): the kernel refuses to treat raw, unformatted space as swap, since it needs that metadata to manage it safely.",
      pt: 'Formata um arquivo ou partição como área de swap, escrevendo a assinatura e os metadados que o kernel espera, da mesma forma que o mkfs formata uma partição como ext4 ou xfs, mas especificamente para swap. É um passo intermediário obrigatório entre criar o espaço (com fallocate ou particionando um disco) e realmente usá-lo (com swapon): o kernel se recusa a tratar espaço bruto, sem formatação, como swap, já que precisa desses metadados para gerenciá-lo com segurança.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The swap file or partition to format.',
      pt: 'O arquivo ou partição de swap a formatar.',
    },
  },

  swapon: {
    desc: {
      en: "Enables a swap file or partition that has already been formatted with mkswap, telling the kernel it can start using it as virtual memory right away. This activation does not survive a reboot on its own, a line has to be added to /etc/fstab for the swap to be turned back on automatically at startup, which is exactly why swapon usually appears as the last step of a small script that also touches fstab.",
      pt: 'Ativa um arquivo ou partição de swap que já foi formatado com mkswap, avisando ao kernel que ele já pode começar a usá-lo como memória virtual. Essa ativação não sobrevive sozinha a um reinício, é preciso adicionar uma linha ao /etc/fstab para que o swap volte a ser ativado automaticamente na inicialização, e é exatamente por isso que o swapon costuma aparecer como o último passo de um pequeno script que também mexe no fstab.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The swap file or partition to enable.',
      pt: 'O arquivo ou partição de swap a ativar.',
    },
  },

  free: {
    desc: {
      en: "Shows how much physical memory (RAM) and swap space is used, free, and available on the system, broken down into a table. The 'available' column is the one that actually matters day to day, not 'free': Linux aggressively uses spare RAM for disk caching to speed up file access, which makes the raw free number look deceptively low, while 'available' accounts for cache that can be reclaimed instantly if an application needs it. It is the standard first check when a server is slow or a process is being killed unexpectedly by the kernel's out-of-memory handler.",
      pt: 'Mostra quanta memória física (RAM) e swap está usada, livre e disponível no sistema, organizado em uma tabela. A coluna "available" (disponível) é a que importa de verdade no dia a dia, não a "free" (livre): o Linux usa agressivamente a RAM sobrando para cache de disco e acelerar o acesso a arquivos, o que faz o número bruto de livre parecer enganosamente baixo, enquanto "available" já considera o cache que pode ser liberado instantaneamente se uma aplicação precisar. É a primeira checagem padrão quando um servidor está lento ou um processo está sendo morto inesperadamente pelo mecanismo de falta de memória do kernel.',
    },
    subcommands: {},
    flags: {
      '-h': {
        en: 'Shows sizes in human-readable form (KB, MB, GB) instead of bytes.',
        pt: 'Mostra os tamanhos em formato legível (KB, MB, GB) em vez de bytes.',
      },
      '-m': {
        en: 'Shows sizes in mebibytes.',
        pt: 'Mostra os tamanhos em mebibytes.',
      },
      '-g': {
        en: 'Shows sizes in gibibytes.',
        pt: 'Mostra os tamanhos em gibibytes.',
      },
    },
  },

  echo: {
    desc: {
      en: "Prints text to standard output, one of the simplest and most-used commands in any shell script, since it is how a script reports progress, prints a value, or (combined with redirection) writes a line into a file without opening an editor. Quoting matters more than it looks: unquoted text is subject to the shell's own word-splitting and wildcard expansion before echo ever sees it, which is why arguments containing spaces, variables, or special characters are almost always wrapped in quotes to be printed exactly as written.",
      pt: 'Imprime texto na saída padrão, um dos comandos mais simples e mais usados em qualquer script de shell, já que é assim que um script relata progresso, imprime um valor, ou (combinado com redirecionamento) escreve uma linha em um arquivo sem precisar abrir um editor. As aspas importam mais do que parece: texto sem aspas fica sujeito à própria divisão de palavras e expansão de curingas do shell antes mesmo do echo vê-lo, e é por isso que argumentos com espaços, variáveis ou caracteres especiais quase sempre vêm entre aspas, para serem impressos exatamente como escritos.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: "Doesn't print the trailing newline at the end.",
        pt: 'Não imprime a quebra de linha no final.',
      },
      '-e': {
        en: 'Interprets backslash escape sequences like \\n (newline) and \\t (tab).',
        pt: 'Interpreta sequências de escape com barra invertida como \\n (nova linha) e \\t (tab).',
      },
    },
  },

  sh: {
    desc: {
      en: "The POSIX shell interpreter, a smaller, more standardized language than bash, implementing only the features every POSIX-compliant shell is guaranteed to have, which makes scripts written for sh portable across systems that don't all ship bash. Piped input, as in 'curl ... | sh', is read and executed line by line as it arrives, immediately, with no chance to review it first, which is what makes that pattern convenient for one-line installers and simultaneously risky: you are trusting the remote server to send exactly what it claims to, with nothing verified beforehand.",
      pt: 'O interpretador de shell POSIX, uma linguagem menor e mais padronizada que o bash, implementando só os recursos que todo shell compatível com POSIX tem garantia de ter, o que torna scripts escritos para o sh portáveis entre sistemas que não vêm todos com bash. Entrada recebida por pipe, como em "curl ... | sh", é lida e executada linha por linha conforme chega, na hora, sem chance de revisar antes, o que torna esse padrão conveniente para instaladores de uma linha e ao mesmo tempo arriscado: você está confiando que o servidor remoto vai mandar exatamente o que diz que vai mandar, sem nada verificado antes.',
    },
    subcommands: {},
    flags: {},
  },

  wget: {
    desc: {
      en: "Downloads files from the web over HTTP, HTTPS, or FTP, built from the ground up for non-interactive, unattended downloading rather than interactive use. That focus shows in its defaults: it retries automatically on connection failures, can resume a partially downloaded file instead of restarting from zero, and can run happily in the background disconnected from a terminal, which makes it a natural fit for scripts and cron jobs. Its -r flag can even recursively follow links to mirror an entire website, a capability curl doesn't have built in.",
      pt: 'Baixa arquivos da web via HTTP, HTTPS ou FTP, construído desde o início para download não interativo e sem supervisão, em vez de uso interativo. Esse foco aparece nos padrões dele: tenta de novo automaticamente em falhas de conexão, consegue retomar um download parcial em vez de recomeçar do zero, e roda bem em segundo plano desconectado de um terminal, o que o torna natural para scripts e tarefas de cron. Sua flag -r consegue até seguir links recursivamente para espelhar um site inteiro, capacidade que o curl não tem embutida.',
    },
    subcommands: {},
    flags: {
      '-O': {
        en: 'Saves the downloaded file under a specific name, instead of the name in the URL.',
        pt: 'Salva o arquivo baixado com um nome específico, em vez do nome que está na URL.',
      },
      '-q': {
        en: 'Quiet mode, suppresses output.',
        pt: 'Modo silencioso, suprime a saída.',
      },
      '-c': {
        en: 'Resumes a partially downloaded file instead of starting over.',
        pt: 'Retoma um download parcial em vez de começar do zero.',
      },
      '-r': {
        en: 'Downloads recursively, following links (used to mirror a site).',
        pt: 'Baixa recursivamente, seguindo links (usado para espelhar um site).',
      },
    },
    valueFlags: {
      '-O': 'generic',
    },
    argHint: {
      en: 'The URL to download.',
      pt: 'A URL a baixar.',
    },
  },

  rsync: {
    desc: {
      en: "Synchronizes files and folders between two locations, local-to-local, local-to-remote, or remote-to-remote over SSH, using a delta-transfer algorithm that compares both sides and sends only the parts of a file that actually changed rather than the whole file again. This makes it dramatically faster than a plain copy for repeated backups or deployments, where most files are usually unchanged between runs. Combined with --delete it becomes a true mirror tool, making the destination an exact copy of the source, including removing files that no longer exist there, which is why it is the standard building block for backup scripts.",
      pt: 'Sincroniza arquivos e pastas entre dois lugares, local para local, local para remoto, ou remoto para remoto via SSH, usando um algoritmo de transferência por delta que compara os dois lados e envia só as partes de um arquivo que realmente mudaram, em vez do arquivo inteiro de novo. Isso o torna dramaticamente mais rápido que uma cópia simples para backups ou deploys repetidos, onde a maioria dos arquivos costuma estar inalterada entre uma execução e outra. Combinado com --delete ele vira uma ferramenta de espelhamento de verdade, fazendo do destino uma cópia exata da origem, inclusive removendo arquivos que não existem mais lá, e é por isso que é a peça padrão de construção de scripts de backup.',
    },
    subcommands: {},
    flags: {
      '-a': {
        en: 'Archive mode: preserves permissions, timestamps, symlinks, and copies recursively. The usual default for backups.',
        pt: 'Modo arquivo: preserva permissões, datas, links simbólicos, e copia recursivamente. O padrão de fato para backups.',
      },
      '-v': {
        en: 'Shows each file transferred on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo transferido (modo verboso).',
      },
      '-z': {
        en: 'Compresses data during the transfer, useful over slow connections.',
        pt: 'Compacta os dados durante a transferência, útil em conexões lentas.',
      },
      '--delete': {
        en: 'Deletes files in the destination that no longer exist in the source, making the destination an exact mirror.',
        pt: 'Apaga arquivos no destino que não existem mais na origem, fazendo do destino um espelho exato.',
      },
      '-e': {
        en: 'Specifies the remote shell to use for the connection, usually ssh with custom options.',
        pt: 'Especifica o shell remoto a usar na conexão, geralmente ssh com opções customizadas.',
      },
    },
    valueFlags: {
      '-e': 'generic',
    },
    argHint: {
      en: 'The source path to sync, or the destination (the last argument is normally the destination).',
      pt: 'O caminho de origem a sincronizar, ou o destino (o último argumento normalmente é o destino).',
    },
  },

  scp: {
    desc: {
      en: "Copies files between hosts over SSH, encrypted the entire way, essentially cp's syntax extended with the concept of a remote path written as user@host:/path. It reuses the exact same authentication as ssh, including key-based login, so anywhere ssh access already works, scp works too with no extra setup. For anything beyond a one-off file or two, especially repeated transfers or whole directory trees, rsync is generally the better tool, since scp always copies everything from scratch with no notion of what changed since last time.",
      pt: 'Copia arquivos entre máquinas via SSH, criptografado o caminho inteiro, essencialmente a sintaxe do cp estendida com o conceito de um caminho remoto escrito como usuario@host:/caminho. Ele reaproveita exatamente a mesma autenticação do ssh, incluindo login por chave, então onde o acesso ssh já funciona, o scp funciona também sem configuração extra. Para qualquer coisa além de um arquivo avulso ou dois, especialmente transferências repetidas ou árvores de diretório inteiras, o rsync costuma ser a ferramenta melhor, já que o scp sempre copia tudo do zero, sem noção do que mudou desde a última vez.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Copies folders and their contents recursively.',
        pt: 'Copia pastas e seu conteúdo recursivamente.',
      },
      '-P': {
        en: 'Specifies the SSH port of the remote host (uppercase, unlike ssh which uses -p).',
        pt: 'Especifica a porta SSH da máquina remota (maiúscula, diferente do ssh que usa -p).',
      },
      '-i': {
        en: 'Specifies the private key file to use for authentication.',
        pt: 'Especifica o arquivo de chave privada a ser usado para autenticação.',
      },
    },
    valueFlags: {
      '-P': 'generic',
      '-i': 'generic',
    },
    argHint: {
      en: 'The source path to copy, or the destination, written as user@host:/path for a remote side. The last argument is normally the destination.',
      pt: 'O caminho de origem a copiar, ou o destino, escrito como usuario@host:/caminho para o lado remoto. O último argumento normalmente é o destino.',
    },
  },

  'ssh-keygen': {
    desc: {
      en: "Generates a new SSH key pair, a private key that must never leave the machine it was created on and a matching public key that gets copied to every server you want to log into. Authentication then works by proving possession of the private key through public-key cryptography, without ever sending a password over the network, which is both more convenient (no typing a password on every connection) and considerably more secure than password authentication, since the private key never leaves your machine and can itself be protected by a passphrase. ed25519 is the modern recommended key type: shorter, faster, and just as secure as a much larger traditional RSA key.",
      pt: 'Gera um novo par de chaves SSH, uma chave privada que nunca deve sair da máquina onde foi criada e uma chave pública correspondente que é copiada para cada servidor no qual se quer logar. A autenticação então funciona provando a posse da chave privada por criptografia de chave pública, sem nunca enviar uma senha pela rede, o que é ao mesmo tempo mais conveniente (sem digitar senha a cada conexão) e consideravelmente mais seguro do que autenticação por senha, já que a chave privada nunca sai da sua máquina e ainda pode ser protegida por uma frase-senha própria. O ed25519 é o tipo de chave moderno recomendado: mais curto, mais rápido, e tão seguro quanto uma chave RSA tradicional muito maior.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Sets the key type, such as ed25519 (recommended) or rsa.',
        pt: 'Define o tipo da chave, como ed25519 (recomendado) ou rsa.',
      },
      '-b': {
        en: 'Sets the key size in bits (relevant for rsa keys).',
        pt: 'Define o tamanho da chave em bits (relevante para chaves rsa).',
      },
      '-f': {
        en: 'Sets the output file path for the generated key.',
        pt: 'Define o caminho do arquivo de saída para a chave gerada.',
      },
      '-C': {
        en: 'Adds a comment to the key, usually an email or label to identify it.',
        pt: 'Adiciona um comentário à chave, geralmente um email ou rótulo para identificá-la.',
      },
    },
    valueFlags: {
      '-t': 'generic',
      '-b': 'generic',
      '-f': 'generic',
      '-C': 'generic',
    },
  },

  unzip: {
    desc: {
      en: "Extracts the contents of a .zip archive, the compression format most associated with Windows and cross-platform file sharing rather than Unix systems (which historically favor tar plus gzip instead). It is worth checking for on a fresh Linux install since, unlike tar and gzip, it often isn't installed by default; downloaded assets, plugin bundles, and files shared from Windows or macOS frequently arrive as .zip, making unzip a common first apt install on a new server.",
      pt: 'Extrai o conteúdo de um arquivo .zip, o formato de compactação mais associado ao Windows e ao compartilhamento de arquivos entre plataformas, e não tanto a sistemas Unix (que historicamente preferem tar combinado com gzip). Vale checar se está instalado logo em uma instalação nova de Linux, já que, diferente do tar e do gzip, muitas vezes não vem por padrão; recursos baixados, pacotes de plugins e arquivos compartilhados do Windows ou macOS frequentemente chegam como .zip, o que faz do unzip um dos primeiros apt install comuns em um servidor novo.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Lists the contents of the archive without extracting.',
        pt: 'Lista o conteúdo do arquivo sem extrair.',
      },
      '-o': {
        en: 'Overwrites existing files without asking for confirmation.',
        pt: 'Sobrescreve arquivos existentes sem pedir confirmação.',
      },
      '-d': {
        en: 'Extracts into a specific destination folder.',
        pt: 'Extrai para uma pasta de destino específica.',
      },
    },
    valueFlags: {
      '-d': 'generic',
    },
    argHint: {
      en: 'The .zip file to extract, or a specific file inside it to extract only that one.',
      pt: 'O arquivo .zip a extrair, ou um arquivo específico dentro dele para extrair só esse.',
    },
  },

  gzip: {
    desc: {
      en: "Compresses a single file using the DEFLATE algorithm, replacing the original with a .gz version of the same name by default, which is different from zip: gzip compresses exactly one file at a time and has no built-in concept of an archive containing several files, which is exactly why it is so often paired with tar (tar first bundles many files into one, then gzip compresses that single bundle). It favors speed over maximum compression ratio, which is part of why it remains the default choice for things like compressing log files and HTTP response bodies.",
      pt: 'Compacta um único arquivo usando o algoritmo DEFLATE, substituindo o original por uma versão .gz de mesmo nome por padrão, o que é diferente do zip: o gzip compacta exatamente um arquivo por vez e não tem conceito embutido de um arquivo contendo vários outros dentro, e é exatamente por isso que costuma vir emparelhado com o tar (o tar primeiro empacota vários arquivos em um só, depois o gzip compacta esse pacote único). Ele prioriza velocidade em vez de taxa de compactação máxima, o que é parte do motivo dele continuar sendo a escolha padrão para coisas como compactar arquivos de log e corpos de resposta HTTP.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Decompresses instead of compressing (same as running gunzip).',
        pt: 'Descompacta em vez de compactar (o mesmo que rodar gunzip).',
      },
      '-k': {
        en: 'Keeps the original file instead of replacing it.',
        pt: 'Mantém o arquivo original em vez de substituí-lo.',
      },
      '-9': {
        en: 'Uses the highest (slowest) compression level.',
        pt: 'Usa o nível de compactação mais alto (e mais lento).',
      },
    },
    argHint: {
      en: 'The file to compress.',
      pt: 'O arquivo a compactar.',
    },
  },

  gunzip: {
    desc: {
      en: "Decompresses a .gz file, restoring the original and removing the .gz version, the exact inverse of gzip, and in fact implemented as the same program: gunzip is equivalent to running 'gzip -d', just under a friendlier name that makes scripts more readable about their intent.",
      pt: 'Descompacta um arquivo .gz, restaurando o original e removendo a versão .gz, o inverso exato do gzip, e de fato implementado pelo mesmo programa: gunzip equivale a rodar "gzip -d", só que com um nome mais amigável, que deixa scripts mais legíveis sobre a intenção.',
    },
    subcommands: {},
    flags: {
      '-k': {
        en: 'Keeps the compressed .gz file instead of removing it.',
        pt: 'Mantém o arquivo .gz compactado em vez de removê-lo.',
      },
    },
    argHint: {
      en: 'The .gz file to decompress.',
      pt: 'O arquivo .gz a descompactar.',
    },
  },

  ln: {
    desc: {
      en: "Creates a link between files, and the two kinds it can create behave quite differently. A hard link, the default, is another name pointing at the exact same data on disk; the two names are indistinguishable, deleting one leaves the data intact under the other, and it cannot cross filesystem boundaries. A symbolic link (with -s) is instead a small file that just stores a path to another file, more like a shortcut: it can point anywhere, including across filesystems or to something that doesn't exist yet, but breaks if the target is moved or deleted, which is why 'ln -s' is by far the more commonly used form in everyday scripting.",
      pt: 'Cria um link entre arquivos, e os dois tipos que ele consegue criar se comportam de forma bem diferente. Um link físico (hard link), o padrão, é outro nome apontando para exatamente os mesmos dados no disco; os dois nomes são indistinguíveis, apagar um deixa os dados intactos sob o outro, e ele não consegue atravessar limites de sistema de arquivos. Um link simbólico (com -s) é, em vez disso, um pequeno arquivo que só guarda um caminho para outro arquivo, mais parecido com um atalho: pode apontar para qualquer lugar, inclusive entre sistemas de arquivos ou para algo que ainda não existe, mas quebra se o alvo for movido ou apagado, e é por isso que "ln -s" é de longe a forma mais usada no dia a dia.',
    },
    subcommands: {},
    flags: {
      '-s': {
        en: 'Creates a symbolic link instead of a hard link.',
        pt: 'Cria um link simbólico em vez de um link físico.',
      },
      '-f': {
        en: 'Removes the destination file first if it already exists.',
        pt: 'Remove o arquivo de destino primeiro, se ele já existir.',
      },
    },
    argHint: {
      en: 'The target being linked to, or the link name to create (the last argument is normally the new link).',
      pt: 'O alvo sendo referenciado, ou o nome do link a criar (o último argumento normalmente é o novo link).',
    },
  },

  install: {
    desc: {
      en: "Copies a file to a destination and sets its permissions, owner, and group in a single atomic step, instead of the multi-command dance of cp followed by chmod and chown. Its real home is inside Makefiles and packaging scripts: a 'make install' target almost always ends with a series of 'install' calls that place freshly built binaries into /usr/local/bin, libraries into /usr/local/lib, and so on, each with the exact permissions that location expects (typically 755 for an executable, 644 for a plain file). Unlike a plain cp, it also creates any missing destination directories on request and replaces the target as a new file rather than editing it in place, which avoids corrupting a binary that another process might have open and already running.",
      pt: 'Copia um arquivo para um destino e já define suas permissões, dono e grupo em um único passo atômico, em vez da dança de vários comandos com cp seguido de chmod e chown. Seu lugar de verdade é dentro de Makefiles e scripts de empacotamento: um alvo "make install" quase sempre termina com uma série de chamadas a "install" que colocam binários recém-compilados em /usr/local/bin, bibliotecas em /usr/local/lib, e assim por diante, cada um com as permissões exatas que aquele lugar espera (tipicamente 755 para um executável, 644 para um arquivo comum). Diferente de um cp simples, também cria diretórios de destino que faltarem, se pedido, e substitui o alvo como um arquivo novo em vez de editá-lo no lugar, o que evita corromper um binário que outro processo já possa ter aberto e em execução.',
    },
    subcommands: {},
    flags: {
      '-m': {
        en: 'Sets the permission mode of the installed file (in octal, like chmod), 755 for an executable and 644 for a plain file are the common defaults.',
        pt: 'Define o modo de permissão do arquivo instalado (em octal, como no chmod), 755 para um executável e 644 para um arquivo comum são os padrões comuns.',
      },
      '-o': {
        en: 'Sets the owner of the installed file, usually only usable by root.',
        pt: 'Define o dono do arquivo instalado, geralmente só utilizável pelo root.',
      },
      '-g': {
        en: 'Sets the group of the installed file.',
        pt: 'Define o grupo do arquivo instalado.',
      },
      '-d': {
        en: 'Creates the given directories instead of installing a file, setting their mode, owner, and group the same way.',
        pt: 'Cria os diretórios indicados em vez de instalar um arquivo, definindo o modo, dono e grupo deles da mesma forma.',
      },
      '-D': {
        en: 'Creates any missing parent directories along the destination path before installing the file into it.',
        pt: 'Cria os diretórios pai que faltarem ao longo do caminho de destino antes de instalar o arquivo nele.',
      },
      '-v': {
        en: 'Shows each file as it is installed (verbose mode).',
        pt: 'Mostra cada arquivo conforme é instalado (modo verboso).',
      },
      '-s': {
        en: 'Strips debug symbols from the installed binary, reducing its file size.',
        pt: 'Remove símbolos de depuração do binário instalado, reduzindo o tamanho do arquivo.',
      },
    },
    valueFlags: {
      '-m': 'octal-mode',
      '-o': 'generic',
      '-g': 'generic',
    },
    argHint: {
      en: "The source file to install, or, with -d, a directory to create. When two paths are given without -d, the first is the source and the last is the destination.",
      pt: 'O arquivo de origem a instalar, ou, com -d, um diretório a criar. Quando dois caminhos são dados sem -d, o primeiro é a origem e o último é o destino.',
    },
  },

  touch: {
    desc: {
      en: "Creates an empty file if it does not already exist, or, if it does, simply updates its last-modified timestamp to the current time without touching its actual contents. That second behavior, updating timestamps, is its original and literal purpose (the name comes from 'touching' a file to mark it as recently accessed), and still shows up in build systems and Makefiles that decide whether to rebuild something based on file modification times.",
      pt: 'Cria um arquivo vazio se ele ainda não existir, ou, se já existir, simplesmente atualiza a data de última modificação para o momento atual, sem tocar no conteúdo real. Esse segundo comportamento, atualizar datas, é seu propósito original e literal (o nome vem de "tocar" um arquivo para marcá-lo como acessado recentemente), e ainda aparece em sistemas de build e Makefiles que decidem se reconstroem algo com base na data de modificação dos arquivos.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file to create or update.',
      pt: 'O arquivo a criar ou atualizar.',
    },
  },

  less: {
    desc: {
      en: "Shows the contents of a file one screen at a time, letting you scroll up and down, jump to a specific line, and search forward or backward for text, all without loading the whole file into memory first. Its name is a joke on the older command more (it does everything more does and more), and despite that name, less is actually the one commonly installed and used today, since it can scroll backward, which more famously could not. It is also what man pages, git log, and countless other commands pipe their output through automatically when it is longer than one screen.",
      pt: 'Mostra o conteúdo de um arquivo uma tela por vez, permitindo rolar para cima e para baixo, pular para uma linha específica, e buscar texto para frente ou para trás, tudo sem carregar o arquivo inteiro na memória primeiro. O nome é uma piada em cima do comando mais antigo more (ele faz tudo que o more faz e mais), e apesar do nome, o less é o que de fato costuma vir instalado e ser usado hoje, já que consegue rolar para trás, coisa que o more, famosamente, não conseguia. É também por onde páginas de manual, git log, e incontáveis outros comandos encanam a própria saída automaticamente quando ela é maior que uma tela.',
    },
    subcommands: {},
    flags: {
      '-N': {
        en: 'Shows line numbers.',
        pt: 'Mostra os números das linhas.',
      },
    },
    argHint: {
      en: 'The file to view.',
      pt: 'O arquivo a visualizar.',
    },
  },

  man: {
    desc: {
      en: "Shows a command's manual page: its full documentation, every option it supports, its exact syntax, and usually related commands to look at next, all kept locally on the system rather than fetched from the internet. Manual pages are organized into numbered sections (1 for user commands, 5 for file formats, 8 for system administration commands, among others), which is why some commands need 'man 5 name' to disambiguate from a same-named entry elsewhere. It predates the web by decades and remains the most authoritative reference for a command's exact behavior on that specific system, more precise than a web search, if noticeably terser to read.",
      pt: 'Mostra a página de manual de um comando: sua documentação completa, cada opção que ele suporta, sua sintaxe exata, e geralmente comandos relacionados para consultar em seguida, tudo guardado localmente no sistema em vez de buscado da internet. Páginas de manual são organizadas em seções numeradas (1 para comandos de usuário, 5 para formatos de arquivo, 8 para comandos de administração de sistema, entre outras), e é por isso que às vezes é preciso "man 5 nome" para desambiguar de uma entrada de mesmo nome em outro lugar. É anterior à web em décadas e continua sendo a referência mais autoritativa sobre o comportamento exato de um comando naquele sistema específico, mais precisa que uma busca na internet, ainda que visivelmente mais seca de ler.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The command or topic to look up.',
      pt: 'O comando ou tópico a consultar.',
    },
  },

  which: {
    desc: {
      en: "Shows the full path of the executable that would run for a given command name, by searching each directory listed in the PATH environment variable in order and reporting the first match. It answers a very specific and common question: exactly which binary am I actually running when I type this, useful when a system has multiple versions of the same tool installed (say, two different pythons) and it isn't obvious which one takes priority. It only understands PATH lookups, though, so it won't find shell builtins like cd or aliases, which is one reason 'command -v' is often preferred in scripts.",
      pt: 'Mostra o caminho completo do executável que rodaria para um determinado nome de comando, buscando em cada diretório listado na variável de ambiente PATH, em ordem, e relatando a primeira correspondência encontrada. Responde a uma pergunta bem específica e comum: qual binário exatamente eu estou rodando quando digito isso, útil quando um sistema tem várias versões da mesma ferramenta instaladas (digamos, dois pythons diferentes) e não é óbvio qual tem prioridade. Ele só entende buscas no PATH, porém, então não encontra comandos internos do shell como cd nem aliases, um dos motivos pelos quais "command -v" costuma ser preferido em scripts.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The command name to look up.',
      pt: 'O nome do comando a procurar.',
    },
  },

  wc: {
    desc: {
      en: "Counts lines, words, and bytes in a file, or in whatever input it receives through a pipe, printing all three numbers by default. It shows up constantly at the end of a pipeline as a quick way to answer 'how many' questions, how many lines matched a grep, how many files a find turned up, without writing a whole script just to count.",
      pt: 'Conta linhas, palavras e bytes de um arquivo, ou de qualquer entrada que receba por pipe, imprimindo os três números por padrão. Aparece constantemente no final de um pipeline como forma rápida de responder perguntas de "quantos", quantas linhas um grep encontrou, quantos arquivos um find trouxe, sem precisar escrever um script inteiro só para contar.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Counts only lines.',
        pt: 'Conta só as linhas.',
      },
      '-w': {
        en: 'Counts only words.',
        pt: 'Conta só as palavras.',
      },
      '-c': {
        en: 'Counts only bytes.',
        pt: 'Conta só os bytes.',
      },
    },
    argHint: {
      en: 'The file to count.',
      pt: 'O arquivo a contar.',
    },
  },

  sort: {
    desc: {
      en: "Sorts the lines of a file or piped input, alphabetically by default, and it matters more than it sounds like it should because several other tools depend on sorted input to work correctly. uniq, for instance, only removes consecutive duplicate lines, so 'sort | uniq' is the standard idiom for deduplicating a list regardless of the original order, and it also shows up before join and comm, both of which require sorted input to line their two files up correctly.",
      pt: 'Ordena as linhas de um arquivo ou de uma entrada recebida por pipe, alfabeticamente por padrão, e isso importa mais do que parece porque várias outras ferramentas dependem de entrada ordenada para funcionar corretamente. O uniq, por exemplo, só remove linhas duplicadas consecutivas, então "sort | uniq" é o idioma padrão para remover duplicatas de uma lista independente da ordem original, e ele também aparece antes do join e do comm, que exigem entrada ordenada para alinhar seus dois arquivos corretamente.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Reverses the sort order.',
        pt: 'Inverte a ordem da ordenação.',
      },
      '-n': {
        en: 'Sorts numerically instead of alphabetically.',
        pt: 'Ordena numericamente em vez de alfabeticamente.',
      },
      '-u': {
        en: 'Removes duplicate lines from the output.',
        pt: 'Remove linhas duplicadas da saída.',
      },
      '-k': {
        en: 'Sorts by a specific column (field) instead of the whole line.',
        pt: 'Ordena por uma coluna (campo) específica em vez da linha inteira.',
      },
    },
    valueFlags: {
      '-k': 'generic',
    },
    argHint: {
      en: 'The file to sort.',
      pt: 'O arquivo a ordenar.',
    },
  },

  uniq: {
    desc: {
      en: "Removes consecutive duplicate lines from its input, or, with -c, counts how many times each line repeats. The crucial word is consecutive: uniq only compares each line to the one immediately before it, so it will not catch duplicates scattered throughout an unsorted file, which is exactly why it is almost always used right after sort in a pipeline, 'sort file | uniq', to get true deduplication.",
      pt: 'Remove linhas duplicadas consecutivas da entrada, ou, com -c, conta quantas vezes cada linha se repete. A palavra crucial é consecutivas: o uniq só compara cada linha com a imediatamente anterior, então não vai pegar duplicatas espalhadas por um arquivo desordenado, e é exatamente por isso que quase sempre é usado logo depois do sort em um pipeline, "sort arquivo | uniq", para conseguir uma deduplicação de verdade.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Shows how many times each line occurred, prefixed to the line.',
        pt: 'Mostra quantas vezes cada linha ocorreu, na frente da linha.',
      },
      '-d': {
        en: 'Shows only the lines that had duplicates.',
        pt: 'Mostra apenas as linhas que tiveram duplicatas.',
      },
    },
    argHint: {
      en: 'The file to deduplicate.',
      pt: 'O arquivo a deduplicar.',
    },
  },

  cut: {
    desc: {
      en: "Extracts a portion of each line of input: a specific column when the data is delimited (like a CSV with -d, comma), or a fixed range of character positions when it isn't. It is the go-to tool for pulling one field out of structured command output, for example extracting just the PID column from ps, without reaching for the heavier machinery of awk, though awk can do everything cut does and considerably more once the extraction logic gets complicated.",
      pt: 'Extrai uma parte de cada linha da entrada: uma coluna específica quando os dados são delimitados (como um CSV, com -d vírgula), ou um intervalo fixo de posições de caractere quando não são. É a ferramenta natural para tirar um campo específico de uma saída de comando estruturada, por exemplo extrair só a coluna do PID do ps, sem precisar recorrer à maquinaria mais pesada do awk, embora o awk consiga fazer tudo que o cut faz e bem mais quando a lógica de extração complica.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Sets the field delimiter (default is tab).',
        pt: 'Define o delimitador de campo (o padrão é tab).',
      },
      '-f': {
        en: 'Selects which field(s) to extract.',
        pt: 'Seleciona qual(is) campo(s) extrair.',
      },
    },
    valueFlags: {
      '-d': 'generic',
      '-f': 'generic',
    },
    argHint: {
      en: 'The file to extract from.',
      pt: 'O arquivo do qual extrair.',
    },
  },

  xargs: {
    desc: {
      en: "Builds and runs a command using the input it receives, splitting it into individual arguments and appending them to the command given. It solves a specific gap in the shell's design: most Unix tools, rm, cp, chmod, expect their targets as command-line arguments, not as piped-in text, so a list of file names produced by find or grep can't be fed to them directly through a pipe alone. xargs bridges that gap, which is why 'find . -name \"*.tmp\" | xargs rm' is such a common pattern, and also batches arguments intelligently to avoid hitting the operating system's limit on how many can be passed to a single command invocation.",
      pt: 'Monta e roda um comando usando a entrada que recebe, dividindo-a em argumentos individuais e anexando-os ao comando dado. Ele resolve uma lacuna específica do design do shell: a maioria das ferramentas Unix, rm, cp, chmod, espera seus alvos como argumentos de linha de comando, não como texto recebido por pipe, então uma lista de nomes de arquivo produzida pelo find ou grep não pode ser passada a elas diretamente só por pipe. O xargs preenche essa lacuna, e é por isso que "find . -name \"*.tmp\" | xargs rm" é um padrão tão comum, além de agrupar argumentos de forma inteligente para não esbarrar no limite do sistema operacional de quantos podem ser passados para uma única chamada de comando.',
    },
    subcommands: {},
    flags: {
      '-I': {
        en: 'Defines a placeholder to represent each input item inside the command.',
        pt: 'Define um marcador para representar cada item da entrada dentro do comando.',
      },
      '-n': {
        en: 'Sets the maximum number of arguments passed per command execution.',
        pt: 'Define o número máximo de argumentos passados por execução do comando.',
      },
      '-0': {
        en: 'Expects null-separated input instead of whitespace-separated, safer for file names with spaces.',
        pt: 'Espera entrada separada por caracteres nulos em vez de espaços, mais seguro para nomes de arquivo com espaço.',
      },
    },
    valueFlags: {
      '-I': 'generic',
      '-n': 'generic',
    },
  },

  sed: {
    desc: {
      en: "A stream editor: it applies text transformations to input one line at a time, without ever loading an interactive editor, which is exactly what makes it usable inside a script or a pipeline. The classic operation is substitution, 's/old/new/', find the pattern 'old' and replace it with 'new', but sed's actual scripting language covers deleting lines, inserting text, and much more, all expressed compactly. Combined with -i it edits files in place, which is convenient but also destructive with no confirmation, so testing a sed command without -i first, to see the result printed rather than written, is a habit worth having.",
      pt: 'Um editor de fluxo: aplica transformações de texto na entrada uma linha por vez, sem nunca abrir um editor interativo, o que é exatamente o que o torna utilizável dentro de um script ou pipeline. A operação clássica é a substituição, "s/antigo/novo/", encontre o padrão "antigo" e substitua por "novo", mas a linguagem de script do sed de fato cobre apagar linhas, inserir texto e muito mais, tudo expresso de forma compacta. Combinado com -i ele edita arquivos no lugar, o que é conveniente mas também destrutivo, sem confirmação, então testar um comando sed sem o -i primeiro, para ver o resultado impresso em vez de escrito, é um hábito que vale a pena ter.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Edits the file in place, instead of just printing the result.',
        pt: 'Edita o arquivo no lugar, em vez de apenas imprimir o resultado.',
      },
      '-e': {
        en: 'Adds a script to run, letting multiple be chained together.',
        pt: 'Adiciona um script para rodar, permitindo encadear vários.',
      },
      '-n': {
        en: 'Suppresses automatic printing of each line, useful together with the "p" command inside the script.',
        pt: 'Suprime a impressão automática de cada linha, útil junto com o comando "p" dentro do script.',
      },
    },
    valueFlags: {
      '-e': 'generic',
    },
  },

  awk: {
    desc: {
      en: "A full text-processing programming language, not just a command, built around a simple but powerful loop: for every line of input, split it into fields (by whitespace by default, or a custom separator with -F), and run a small script against them, with variables like $1, $2 referring to each field and $0 to the whole line. That structure makes it a natural fit for tabular data, generating quick reports, summing a column, reformatting log output, without the ceremony of writing a real program, and its name is literally the initials of its three creators, Aho, Weinberger, and Kernighan.",
      pt: 'Uma linguagem de programação completa de processamento de texto, não só um comando, construída em torno de um laço simples mas poderoso: para cada linha da entrada, divida-a em campos (por espaço em branco por padrão, ou um separador customizado com -F), e rode um pequeno script contra eles, com variáveis como $1, $2 se referindo a cada campo e $0 à linha inteira. Essa estrutura o torna natural para dados tabulares, gerar relatórios rápidos, somar uma coluna, reformatar saída de log, sem a cerimônia de escrever um programa de verdade, e o nome é literalmente as iniciais dos três criadores, Aho, Weinberger e Kernighan.',
    },
    subcommands: {},
    flags: {
      '-F': {
        en: 'Sets the field separator used to split each line.',
        pt: 'Define o separador de campo usado para dividir cada linha.',
      },
    },
    valueFlags: {
      '-F': 'generic',
    },
  },

  diff: {
    desc: {
      en: "Compares two files line by line and shows exactly what changed between them: which lines were added, removed, or modified. Its unified output format (-u), showing a few lines of unchanged context around each change with + and - prefixes, is the same format used by git diff and by software patches, so learning to read diff's output means being able to read a code review or a patch file too, they are all the same underlying convention.",
      pt: 'Compara dois arquivos linha por linha e mostra exatamente o que mudou entre eles: quais linhas foram adicionadas, removidas ou modificadas. Seu formato de saída unificado (-u), mostrando algumas linhas de contexto sem mudança ao redor de cada alteração com prefixos + e -, é o mesmo formato usado pelo git diff e por patches de software, então aprender a ler a saída do diff significa conseguir ler uma revisão de código ou um arquivo de patch também, todos seguem a mesma convenção por baixo.',
    },
    subcommands: {},
    flags: {
      '-u': {
        en: 'Shows the differences in unified format (with context lines), the format used by patches and git diff.',
        pt: 'Mostra as diferenças em formato unificado (com linhas de contexto), o formato usado por patches e pelo git diff.',
      },
      '-r': {
        en: 'Compares folders recursively.',
        pt: 'Compara pastas recursivamente.',
      },
    },
    argHint: {
      en: 'One of the two files or folders being compared.',
      pt: 'Um dos dois arquivos ou pastas sendo comparados.',
    },
  },

  stat: {
    desc: {
      en: "Shows detailed filesystem metadata about a file that ls doesn't surface by default: exact size in bytes, the underlying inode number, permissions in both symbolic and octal form, and three separate timestamps that are easy to confuse, access time (last read), modification time (last content change), and change time (last metadata change, like a permission edit). That distinction between modification and change time in particular trips people up, and stat is the tool to reach for whenever the difference actually matters, like in forensics or cache-invalidation logic.",
      pt: 'Mostra metadados detalhados de sistema de arquivos sobre um arquivo que o ls não expõe por padrão: tamanho exato em bytes, o número do inode subjacente, permissões tanto em forma simbólica quanto octal, e três datas separadas fáceis de confundir, data de acesso (última leitura), data de modificação (última mudança de conteúdo), e data de alteração (última mudança de metadado, como uma edição de permissão). Essa distinção entre modificação e alteração em particular confunde bastante gente, e o stat é a ferramenta certa sempre que a diferença realmente importa, como em perícia forense ou lógica de invalidação de cache.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file to inspect.',
      pt: 'O arquivo a inspecionar.',
    },
  },

  basename: {
    desc: {
      en: "Strips the directory part of a path, leaving only the final file or folder name, so '/var/log/nginx/error.log' becomes just 'error.log'. It exists mainly for use inside scripts, where a full path is often available (from an argument or a loop over find's output) but only the bare filename is needed for a message, a new destination path, or a comparison, and dirname is its exact mirror image, extracting the directory portion instead.",
      pt: 'Remove a parte do diretório de um caminho, deixando apenas o nome final do arquivo ou pasta, então "/var/log/nginx/error.log" vira só "error.log". Existe principalmente para uso dentro de scripts, onde um caminho completo costuma estar disponível (de um argumento ou de um loop sobre a saída do find) mas só o nome puro do arquivo é necessário para uma mensagem, um novo caminho de destino, ou uma comparação, e o dirname é seu espelho exato, extraindo a parte do diretório em vez disso.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The path to strip the directory from.',
      pt: 'O caminho do qual remover o diretório.',
    },
  },

  dirname: {
    desc: {
      en: "Strips the final file or folder name from a path, leaving only the directory part, so '/var/log/nginx/error.log' becomes '/var/log/nginx'. It is the mirror image of basename, and the two are frequently used together in scripts that need to construct a new path in the same folder as an existing file, or that walk up a directory tree one level at a time.",
      pt: 'Remove o nome final de arquivo ou pasta de um caminho, deixando apenas a parte do diretório, então "/var/log/nginx/error.log" vira "/var/log/nginx". É o espelho do basename, e os dois costumam ser usados juntos em scripts que precisam construir um novo caminho na mesma pasta de um arquivo existente, ou que sobem uma árvore de diretórios um nível de cada vez.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The path to strip the file name from.',
      pt: 'O caminho do qual remover o nome do arquivo.',
    },
  },

  whoami: {
    desc: {
      en: "Prints the username of whichever user the current shell session is running as. It sounds trivial but is genuinely useful after switching users with su or sudo, or inside a script that needs to confirm it is not accidentally running as root before doing something destructive, since the effective user can be easy to lose track of a few su and ssh hops deep.",
      pt: 'Imprime o nome de usuário sob o qual a sessão de shell atual está rodando. Parece trivial mas é genuinamente útil depois de trocar de usuário com su ou sudo, ou dentro de um script que precisa confirmar que não está rodando como root sem querer antes de fazer algo destrutivo, já que o usuário efetivo pode ser fácil de perder de vista depois de alguns pulos de su e ssh.',
    },
    subcommands: {},
    flags: {},
  },

  id: {
    desc: {
      en: "Shows a user's full identity as the kernel sees it: their numeric user ID (uid), primary group ID (gid), and the complete list of groups they belong to, alongside the human-readable names for each. Permissions on Linux are ultimately decided by these numbers, not by usernames, so id is the tool to reach for when access is unexpectedly denied and the question is really 'which groups does this process's user actually have', for example whether a user was really added to the docker group after all.",
      pt: 'Mostra a identidade completa de um usuário como o kernel a vê: seu ID numérico de usuário (uid), ID do grupo primário (gid), e a lista completa de grupos aos quais pertence, junto com os nomes legíveis de cada um. Permissões no Linux são decididas, no fim das contas, por esses números, não por nomes de usuário, então o id é a ferramenta certa quando um acesso é negado sem explicação e a pergunta real é "quais grupos esse usuário realmente tem", por exemplo se um usuário foi mesmo adicionado ao grupo docker.',
    },
    subcommands: {},
    flags: {},
  },

  hostname: {
    desc: {
      en: "Prints, or with a value given, sets the machine's network hostname, the name used to identify it on a local network and often baked into its shell prompt. On most modern distributions changing it permanently is actually done through hostnamectl instead, which also updates the persistent configuration file; running plain hostname to set a new name only changes it for the current boot, and reverts after a restart.",
      pt: 'Imprime, ou, se receber um valor, define o hostname de rede da máquina, o nome usado para identificá-la em uma rede local e que costuma aparecer embutido no prompt do shell. Na maioria das distribuições modernas, mudar isso permanentemente é feito na verdade pelo hostnamectl, que também atualiza o arquivo de configuração persistente; rodar o hostname puro para definir um nome novo só muda para o boot atual, e volta ao normal depois de um reinício.',
    },
    subcommands: {},
    flags: {},
  },

  uname: {
    desc: {
      en: "Prints low-level system information straight from the kernel: its name (always 'Linux' on a Linux box), the exact kernel release and build version, and the machine's hardware architecture (x86_64, arm64, and so on). That last part matters more than it might seem: it is the fastest way to check whether a binary or Docker image built for one architecture will actually run on this machine, before finding out the hard way that it won't.",
      pt: 'Imprime informações de baixo nível do sistema direto do kernel: seu nome (sempre "Linux" em uma máquina Linux), a versão exata de release e build do kernel, e a arquitetura de hardware da máquina (x86_64, arm64, e assim por diante). Essa última parte importa mais do que parece: é a forma mais rápida de checar se um binário ou uma imagem Docker construída para uma arquitetura vai realmente rodar nessa máquina, antes de descobrir do jeito difícil que não vai.',
    },
    subcommands: {},
    flags: {
      '-a': {
        en: 'Shows all available system information at once.',
        pt: 'Mostra todas as informações de sistema disponíveis de uma vez.',
      },
      '-r': {
        en: 'Shows only the kernel release version.',
        pt: 'Mostra apenas a versão do kernel.',
      },
    },
  },

  uptime: {
    desc: {
      en: "Shows how long the system has been running since its last boot, how many users are currently logged in, and the load average, three numbers representing the average number of processes wanting CPU time over the last 1, 5, and 15 minutes. That last part is the one worth understanding: a load average of 1.0 on a single-core machine means the CPU was fully busy on average, so the same number means something very different on a machine with 16 cores, where it would barely register as a blip.",
      pt: 'Mostra há quanto tempo o sistema está ligado desde o último boot, quantos usuários estão logados no momento, e a carga média (load average), três números representando a média de processos querendo tempo de CPU nos últimos 1, 5 e 15 minutos. Essa última parte é a que vale entender: uma carga média de 1.0 em uma máquina de um núcleo só significa que a CPU esteve totalmente ocupada em média, então o mesmo número significa algo bem diferente em uma máquina com 16 núcleos, onde mal seria perceptível.',
    },
    subcommands: {},
    flags: {},
  },

  top: {
    desc: {
      en: "Shows running processes in real time, sorted by resource usage (CPU first by default), redrawing the whole screen every couple of seconds, which is exactly why the name is short for 'table of processes' and also why it is the classic first command someone runs when a machine feels sluggish, to see at a glance what is actually consuming the CPU or memory right now. It has been on Unix systems since the 1980s, and while friendlier alternatives like htop exist, top is essentially guaranteed to already be installed on any server, which keeps it in constant use.",
      pt: 'Mostra os processos em execução em tempo real, ordenados por uso de recursos (CPU primeiro por padrão), redesenhando a tela inteira a cada poucos segundos, o que é exatamente o motivo do nome ser abreviação de "tabela de processos" (table of processes) e também por que é o comando clássico que alguém roda quando uma máquina parece lenta, para ver rapidamente o que está de fato consumindo CPU ou memória naquele momento. Está em sistemas Unix desde os anos 1980, e embora alternativas mais amigáveis como o htop existam, o top praticamente tem garantia de já estar instalado em qualquer servidor, o que o mantém em uso constante.',
    },
    subcommands: {},
    flags: {},
  },

  htop: {
    desc: {
      en: "An interactive, colorized alternative to top, built to fix most of the usability complaints people had with it: it supports scrolling and mouse clicks, shows per-core CPU usage as individual color-coded bars instead of one aggregate number, and lets a process be killed or renewed directly by selecting it rather than typing its PID. It is not always preinstalled by default, though, unlike top, so it is a common early 'apt install htop' on a fresh server for anyone who prefers it.",
      pt: 'Uma alternativa interativa e colorida ao top, construída para corrigir a maioria das reclamações de usabilidade que as pessoas tinham com ele: suporta rolagem e cliques de mouse, mostra o uso de CPU por núcleo como barras individuais coloridas em vez de um único número agregado, e permite matar ou renovar um processo diretamente selecionando-o, em vez de digitar o PID. Porém, diferente do top, nem sempre vem pré-instalado por padrão, então costuma ser um dos primeiros "apt install htop" em um servidor novo para quem prefere usá-lo.',
    },
    subcommands: {},
    flags: {},
  },

  lsof: {
    desc: {
      en: "Lists open files, list open files, and on Unix systems that scope is bigger than it sounds, since network sockets, pipes, and devices are all represented as files too. That makes it the standard tool for answering 'what process is using this' whenever something is locked or busy: -i filters to network connections, which is exactly how you find out which process is squatting on a port a server is trying to bind to, one of the most common deployment headaches there is.",
      pt: 'Lista arquivos abertos (list open files), e em sistemas Unix esse escopo é maior do que parece, já que sockets de rede, pipes e dispositivos também são representados como arquivos. Isso o torna a ferramenta padrão para responder "qual processo está usando isso" sempre que algo está travado ou ocupado: o -i filtra para conexões de rede, que é exatamente como se descobre qual processo está ocupando uma porta que um servidor está tentando usar, uma das dores de cabeça de deploy mais comuns que existem.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Filters by network connections, optionally followed by a port like :80.',
        pt: 'Filtra por conexões de rede, opcionalmente seguido de uma porta como :80.',
      },
    },
  },

  ip: {
    desc: {
      en: "Shows and configures network interfaces, IP addresses, and routing, the modern replacement for the older ifconfig and route commands, which are deprecated and often not even installed by default anymore on current distributions. It is organized into objects (addr for addresses, link for the interfaces themselves, route for the routing table), each with its own set of actions, a structure carried over from the wider iproute2 suite it belongs to, which is more consistent, if a bit more to type, than the commands it replaced.",
      pt: 'Mostra e configura interfaces de rede, endereços IP e roteamento, o substituto moderno dos antigos ifconfig e route, que já estão obsoletos e muitas vezes nem vêm mais instalados por padrão nas distribuições atuais. É organizado em objetos (addr para endereços, link para as próprias interfaces, route para a tabela de rotas), cada um com seu próprio conjunto de ações, uma estrutura herdada do conjunto mais amplo iproute2 ao qual pertence, mais consistente, ainda que um pouco mais longa de digitar, do que os comandos que substituiu.',
    },
    subcommands: {
      addr: {
        en: 'Shows or manages IP addresses assigned to network interfaces.',
        pt: 'Mostra ou gerencia endereços IP atribuídos às interfaces de rede.',
      },
      link: {
        en: 'Shows or manages network interfaces themselves (up/down, name).',
        pt: 'Mostra ou gerencia as próprias interfaces de rede (ativar/desativar, nome).',
      },
      route: {
        en: 'Shows or manages the routing table.',
        pt: 'Mostra ou gerencia a tabela de rotas.',
      },
    },
    flags: {},
  },

  netstat: {
    desc: {
      en: "Shows network connections, listening ports, and routing information, long the default tool for that job across nearly every Unix-like system. It is now considered deprecated in favor of ss, which reads the same information more efficiently straight from the kernel instead of parsing /proc, but netstat's exact flag combinations, '-tulpn' above all, are so deeply memorized by a generation of admins that it remains in everyday use even where ss would technically be preferred, and is worth recognizing in any script or tutorial written before ss became standard.",
      pt: 'Mostra conexões de rede, portas ouvindo, e informações de roteamento, por muito tempo a ferramenta padrão para isso em praticamente todo sistema Unix. Hoje é considerado obsoleto em favor do ss, que lê a mesma informação de forma mais eficiente direto do kernel em vez de analisar o /proc, mas as combinações exatas de flags do netstat, "-tulpn" acima de tudo, estão tão memorizadas por uma geração de administradores que continua em uso no dia a dia mesmo onde o ss seria tecnicamente preferível, e vale reconhecê-lo em qualquer script ou tutorial escrito antes do ss virar padrão.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Shows TCP connections.',
        pt: 'Mostra conexões TCP.',
      },
      '-u': {
        en: 'Shows UDP connections.',
        pt: 'Mostra conexões UDP.',
      },
      '-l': {
        en: 'Shows only listening sockets.',
        pt: 'Mostra apenas sockets em modo de escuta.',
      },
      '-n': {
        en: 'Shows numeric addresses and ports instead of resolving names.',
        pt: 'Mostra endereços e portas numéricos em vez de resolver nomes.',
      },
      '-p': {
        en: 'Shows the process using each connection.',
        pt: 'Mostra o processo que está usando cada conexão.',
      },
    },
  },

  ss: {
    desc: {
      en: "Shows network socket statistics, connections and listening ports, part of the same iproute2 suite as ip and its designated successor to netstat. Its name literally stands for 'socket statistics', and it earns the speed netstat lacks by reading kernel socket information directly instead of going through the older, slower /proc-parsing interface netstat relies on, which matters on a system with a very large number of open connections. 'ss -tulpn' (TCP, UDP, listening, show process, numeric ports) is the modern equivalent of netstat's most common invocation, and is the one worth learning going forward.",
      pt: 'Mostra estatísticas de sockets de rede, conexões e portas ouvindo, parte do mesmo conjunto iproute2 do ip e seu sucessor designado do netstat. O nome vem literalmente de "socket statistics" (estatísticas de socket), e ganha a velocidade que falta ao netstat lendo informação de socket do kernel diretamente, em vez de passar pela interface mais antiga e lenta de análise do /proc que o netstat usa, o que importa em um sistema com um número muito grande de conexões abertas. "ss -tulpn" (TCP, UDP, ouvindo, mostrar processo, portas numéricas) é o equivalente moderno da invocação mais comum do netstat, e é o que vale aprender daqui para frente.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Shows TCP sockets.',
        pt: 'Mostra sockets TCP.',
      },
      '-u': {
        en: 'Shows UDP sockets.',
        pt: 'Mostra sockets UDP.',
      },
      '-l': {
        en: 'Shows only listening sockets.',
        pt: 'Mostra apenas sockets em modo de escuta.',
      },
      '-n': {
        en: 'Shows numeric addresses and ports instead of resolving names.',
        pt: 'Mostra endereços e portas numéricos em vez de resolver nomes.',
      },
      '-p': {
        en: 'Shows the process using each socket.',
        pt: 'Mostra o processo que está usando cada socket.',
      },
    },
  },

  nc: {
    desc: {
      en: "Netcat, often nicknamed the network Swiss Army knife: reads and writes raw data straight over a network connection, with none of the protocol assumptions of curl or ssh. That bare-bones simplicity is exactly its value: it can act as a quick client to poke at any TCP or UDP port and see what comes back, as a minimal server with -l for testing, or as a fast, no-frills way to pipe data between two machines, all without needing to know or implement whatever protocol the two sides would normally speak.",
      pt: 'Netcat, muitas vezes apelidado de canivete suíço da rede: lê e escreve dados brutos direto em uma conexão de rede, sem nenhuma das suposições de protocolo do curl ou do ssh. Essa simplicidade básica é exatamente seu valor: consegue agir como cliente rápido para cutucar qualquer porta TCP ou UDP e ver o que volta, como servidor mínimo com -l para testes, ou como forma rápida e sem frescura de encanar dados entre duas máquinas, tudo sem precisar saber ou implementar qualquer protocolo que os dois lados normalmente falariam.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Listens for an incoming connection instead of making one.',
        pt: 'Escuta por uma conexão de entrada em vez de fazer uma.',
      },
      '-v': {
        en: 'Shows more information about the connection (verbose mode).',
        pt: 'Mostra mais informações sobre a conexão (modo verboso).',
      },
      '-z': {
        en: 'Scans for listening services without sending any data (zero-I/O mode).',
        pt: 'Varre por serviços ouvindo sem enviar dados (modo zero-I/O).',
      },
    },
  },

  journalctl: {
    desc: {
      en: "Reads and filters the logs collected by systemd's journal, a centralized, structured, binary log store that replaced scattered plain-text files under /var/log for services managed by systemd. Because every unit's output flows into the same journal, journalctl can filter by a specific service with -u, by time range with --since, by boot session with -b, or follow it live with -f, giving one consistent way to inspect logs regardless of which service produced them, instead of hunting down a different log file convention for each one.",
      pt: 'Lê e filtra os logs coletados pelo journal do systemd, um armazém de log centralizado, estruturado e binário que substituiu arquivos de texto simples espalhados em /var/log para serviços gerenciados pelo systemd. Como a saída de cada unit flui para o mesmo journal, o journalctl consegue filtrar por um serviço específico com -u, por intervalo de tempo com --since, por sessão de boot com -b, ou acompanhar ao vivo com -f, dando uma forma consistente de inspecionar logs independente de qual serviço os produziu, em vez de caçar uma convenção de arquivo de log diferente para cada um.',
    },
    subcommands: {},
    flags: {
      '-u': {
        en: 'Filters logs to a specific systemd unit (service).',
        pt: 'Filtra os logs para uma unit (serviço) específica do systemd.',
      },
      '-f': {
        en: 'Follows the log in real time, like tail -f.',
        pt: 'Acompanha o log em tempo real, como o tail -f.',
      },
      '-n': {
        en: 'Shows only the last N lines.',
        pt: 'Mostra apenas as últimas N linhas.',
      },
      '-b': {
        en: 'Shows only logs from the current boot.',
        pt: 'Mostra apenas os logs do boot atual.',
      },
      '-p': {
        en: 'Filters by priority level, such as err or warning.',
        pt: 'Filtra por nível de prioridade, como err ou warning.',
      },
      '--since': {
        en: 'Shows only logs from a given point in time onward.',
        pt: 'Mostra apenas os logs a partir de um determinado momento.',
      },
    },
    valueFlags: {
      '-u': 'generic',
      '-n': 'generic',
      '-p': 'generic',
      '--since': 'generic',
    },
  },

  crontab: {
    desc: {
      en: "Manages a user's scheduled jobs, edited as a small text file where each line pairs a schedule (minute, hour, day of month, month, day of week) with a command to run at that time, executed automatically in the background by the cron daemon without anyone needing to be logged in. It is the classic way to automate anything recurring on Linux, nightly backups, log rotation, certificate renewal, and each user has their own separate crontab, edited safely through 'crontab -e' rather than by hand-editing a file directly, since the editor validates the syntax before saving.",
      pt: 'Gerencia as tarefas agendadas de um usuário, editadas como um pequeno arquivo de texto onde cada linha combina um horário (minuto, hora, dia do mês, mês, dia da semana) com um comando para rodar naquele momento, executado automaticamente em segundo plano pelo daemon cron sem que ninguém precise estar logado. É a forma clássica de automatizar qualquer coisa recorrente no Linux, backups noturnos, rotação de log, renovação de certificado, e cada usuário tem seu próprio crontab separado, editado com segurança via "crontab -e" em vez de editar um arquivo diretamente à mão, já que o editor valida a sintaxe antes de salvar.',
    },
    subcommands: {},
    flags: {
      '-e': {
        en: "Opens the current user's crontab file in a text editor for editing.",
        pt: 'Abre o arquivo crontab do usuário atual em um editor de texto para edição.',
      },
      '-l': {
        en: "Lists the current user's scheduled jobs.",
        pt: 'Lista as tarefas agendadas do usuário atual.',
      },
      '-r': {
        en: "Removes the current user's entire crontab.",
        pt: 'Remove todo o crontab do usuário atual.',
      },
    },
  },

  useradd: {
    desc: {
      en: "Creates a new user account on the system, adding an entry to /etc/passwd and, in most setups, a matching group. On its own it leaves several things half-done that most real setups need, no home directory unless -m is given, no shell assigned unless -s is given, and no password set at all (the account stays locked until passwd is run separately), which is why usermod and passwd are almost always the next commands typed right after useradd.",
      pt: 'Cria uma nova conta de usuário no sistema, adicionando uma entrada ao /etc/passwd e, na maioria das configurações, um grupo correspondente. Sozinho, deixa várias coisas pela metade que a maioria das configurações reais precisa, sem diretório home a menos que -m seja passado, sem shell atribuído a menos que -s seja passado, e sem senha nenhuma definida (a conta fica bloqueada até o passwd ser rodado separadamente), motivo pelo qual usermod e passwd quase sempre são os próximos comandos digitados logo depois do useradd.',
    },
    subcommands: {},
    flags: {
      '-m': {
        en: "Creates the user's home directory if it doesn't already exist.",
        pt: 'Cria o diretório home do usuário se ele ainda não existir.',
      },
      '-s': {
        en: "Sets the user's login shell.",
        pt: 'Define o shell de login do usuário.',
      },
      '-G': {
        en: 'Adds the user to one or more supplementary groups.',
        pt: 'Adiciona o usuário a um ou mais grupos suplementares.',
      },
    },
    valueFlags: {
      '-s': 'generic',
      '-G': 'generic',
    },
    argHint: {
      en: 'The name of the user to create.',
      pt: 'O nome do usuário a criar.',
    },
  },

  passwd: {
    desc: {
      en: "Changes the password of a user account, prompting interactively for the new one rather than accepting it as a plain command-line argument, which would leave it visible in the shell's history and to anyone glancing at the terminal. Run with no argument it changes the current user's own password; run by root with a username, it changes anyone's, which is the normal way an administrator sets or resets a password for an account they just created.",
      pt: 'Altera a senha de uma conta de usuário, pedindo interativamente pela nova senha em vez de aceitá-la como argumento simples de linha de comando, o que a deixaria visível no histórico do shell e para qualquer um olhando o terminal. Rodado sem argumento, muda a senha do próprio usuário atual; rodado pelo root com um nome de usuário, muda a de qualquer um, que é a forma normal de um administrador definir ou resetar a senha de uma conta que acabou de criar.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Locks the account, preventing password login.',
        pt: 'Bloqueia a conta, impedindo login por senha.',
      },
    },
    argHint: {
      en: 'The username whose password is being changed. Defaults to the current user.',
      pt: 'O nome de usuário cuja senha está sendo alterada. Por padrão é o usuário atual.',
    },
  },

  su: {
    desc: {
      en: "Switches to another user, root by default if none is named, starting a new shell session running as them. Plain 'su' alone is subtly incomplete, though: it changes the effective user but keeps the calling user's existing environment variables, which can cause confusing bugs, so 'su -' (with the trailing dash) is generally what's actually wanted, since it starts a full login shell that loads the target user's own environment exactly as if they had logged in directly, rather than inheriting yours.",
      pt: 'Troca para outro usuário, root por padrão se nenhum for informado, iniciando uma nova sessão de shell rodando como ele. O "su" puro sozinho é sutilmente incompleto, porém: muda o usuário efetivo mas mantém as variáveis de ambiente já existentes de quem chamou, o que pode causar bugs confusos, então "su -" (com o hífen no final) costuma ser o que de fato se quer, já que inicia um shell de login completo que carrega o próprio ambiente do usuário alvo exatamente como se ele tivesse feito login diretamente, em vez de herdar o seu.',
    },
    subcommands: {},
    flags: {
      '-': {
        en: "Starts a full login shell, loading the target user's environment as if they had logged in directly.",
        pt: 'Inicia um shell de login completo, carregando o ambiente do usuário alvo como se ele tivesse feito login diretamente.',
      },
      '-c': {
        en: 'Runs a single command as the target user, instead of opening an interactive shell.',
        pt: 'Roda um único comando como o usuário alvo, em vez de abrir um shell interativo.',
      },
    },
    valueFlags: {
      '-c': 'generic',
    },
    argHint: {
      en: 'The user to switch to. Defaults to root when omitted.',
      pt: 'O usuário para o qual trocar. Por padrão é o root, quando omitido.',
    },
  },

  reboot: {
    desc: {
      en: "Restarts the system, shutting down every running process and remounting filesystems cleanly before the machine powers back on, rather than just cutting power. On most modern distributions it is a thin wrapper that hands control to systemd's own restart target, which is what actually orchestrates stopping services in the right order first; used carelessly on a remote server it will also, of course, immediately end the very SSH session used to run it.",
      pt: 'Reinicia o sistema, encerrando todo processo em execução e desmontando os sistemas de arquivos de forma limpa antes da máquina ligar de novo, em vez de simplesmente cortar a energia. Na maioria das distribuições modernas é uma camada fina que passa o controle para o próprio alvo de reinício do systemd, que é quem de fato orquestra parar os serviços na ordem certa primeiro; usado sem cuidado em um servidor remoto, ele também vai, claro, encerrar imediatamente a própria sessão SSH usada para rodá-lo.',
    },
    subcommands: {},
    flags: {},
  },

  shutdown: {
    desc: {
      en: "Schedules or triggers the system to shut down or restart, and unlike the blunt reboot or poweroff, it can do so after a delay and with a broadcast warning message shown to every logged-in user first, giving anyone with an active session a chance to save their work. 'shutdown now' shuts down immediately, 'shutdown -r now' restarts immediately, and a scheduled shutdown already in progress can be canceled with 'shutdown -c', which is worth knowing if a delayed one was triggered by mistake.",
      pt: 'Agenda ou dispara o desligamento ou reinício do sistema, e, diferente do reboot ou poweroff mais diretos, consegue fazer isso após um atraso e com uma mensagem de aviso transmitida primeiro para todo usuário logado, dando a qualquer um com uma sessão ativa a chance de salvar o trabalho. "shutdown now" desliga imediatamente, "shutdown -r now" reinicia imediatamente, e um desligamento agendado já em andamento pode ser cancelado com "shutdown -c", bom de saber caso um atrasado tenha sido disparado por engano.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Restarts the system instead of powering it off.',
        pt: 'Reinicia o sistema em vez de desligá-lo.',
      },
      '-h': {
        en: 'Halts (powers off) the system.',
        pt: 'Desliga o sistema por completo.',
      },
      now: {
        en: 'Runs the shutdown immediately instead of after a delay.',
        pt: 'Executa o desligamento imediatamente, em vez de após um atraso.',
      },
    },
  },

  nohup: {
    desc: {
      en: "Runs a command in a way that makes it immune to the hangup signal (SIGHUP), which the shell normally sends to every child process when the terminal that launched them closes. Without it, starting a long-running task over SSH and then disconnecting will kill that task the moment the connection drops; nohup, usually combined with a trailing & to also push it into the background, lets the process keep running after logout, its output redirected by default into a file called nohup.out. Tools like tmux and screen solve the same underlying problem in a more complete way, letting you reattach to a whole session rather than just keeping one process alive.",
      pt: 'Roda um comando de forma imune ao sinal de hangup (SIGHUP), que o shell normalmente envia para todo processo filho quando o terminal que os iniciou é fechado. Sem isso, iniciar uma tarefa longa via SSH e depois desconectar mataria essa tarefa no instante em que a conexão caísse; o nohup, geralmente combinado com um & no final para também jogá-lo em segundo plano, permite que o processo continue rodando depois do logout, com sua saída redirecionada por padrão para um arquivo chamado nohup.out. Ferramentas como tmux e screen resolvem o mesmo problema de fundo de forma mais completa, permitindo reconectar a uma sessão inteira, não só manter um processo vivo.',
    },
    subcommands: {},
    flags: {},
  },

  history: {
    desc: {
      en: "Shows the numbered list of commands previously typed in the shell session, kept both in memory during the session and, when it ends, appended to a history file (~/.bash_history for bash) so it persists across logins too. It is what makes the up arrow and Ctrl+R (reverse search) work, and running '!42' or '!!' re-executes history entry 42 or the very last command respectively, a genuinely fast way to repeat something without retyping it.",
      pt: 'Mostra a lista numerada de comandos digitados anteriormente na sessão do shell, guardada tanto em memória durante a sessão quanto, ao final dela, anexada a um arquivo de histórico (~/.bash_history no bash), então persiste entre logins também. É o que faz a seta para cima e o Ctrl+R (busca reversa) funcionarem, e rodar "!42" ou "!!" reexecuta a entrada 42 do histórico ou o último comando, respectivamente, uma forma genuinamente rápida de repetir algo sem digitar de novo.',
    },
    subcommands: {},
    flags: {},
  },

  alias: {
    desc: {
      en: "Creates a shortcut name that expands to a longer command, so typing the short alias runs the full thing, most often used to bake in flags someone always wants, like aliasing 'll' to 'ls -la', or to fix a habitual typo. Defined on its own an alias only lasts for the current shell session, so anyone who wants it available every time they open a terminal adds the alias command to their shell's startup file (~/.bashrc or ~/.zshrc) instead of typing it manually each session.",
      pt: 'Cria um nome de atalho que expande para um comando mais longo, de forma que digitar o atalho roda a coisa completa, mais usado para embutir flags que alguém sempre quer, como associar "ll" a "ls -la", ou para corrigir um erro de digitação recorrente. Definido sozinho, um alias só dura pela sessão de shell atual, então quem quer tê-lo disponível toda vez que abre um terminal adiciona o comando alias ao arquivo de inicialização do shell (~/.bashrc ou ~/.zshrc) em vez de digitá-lo manualmente a cada sessão.',
    },
    subcommands: {},
    flags: {},
  },

  export: {
    desc: {
      en: "Marks a shell variable as exported, meaning any program started from this shell from now on inherits a copy of it in its own environment, not just the shell itself. A plain variable assignment like 'PATH=/foo' only exists inside the current shell and is invisible to anything it launches; 'export PATH=/foo' is what actually makes that value visible to child processes, which is why configuration values like PATH, API keys read by an application, or NODE_ENV almost always need to be exported to have any effect beyond the shell that set them.",
      pt: 'Marca uma variável de shell como exportada, ou seja, a partir de agora todo programa iniciado a partir desse shell herda uma cópia dela no próprio ambiente, não só o shell em si. Uma atribuição de variável simples como "PATH=/foo" só existe dentro do shell atual e é invisível para qualquer coisa que ele iniciar; "export PATH=/foo" é o que de fato torna esse valor visível para os processos filhos, motivo pelo qual valores de configuração como PATH, chaves de API lidas por uma aplicação, ou NODE_ENV quase sempre precisam ser exportados para ter algum efeito além do shell que os definiu.',
    },
    subcommands: {},
    flags: {},
  },

  env: {
    desc: {
      en: "Prints every environment variable currently visible to the shell, one per line, the fastest way to check what a process would actually inherit, especially useful for confirming whether something export set earlier really took effect. Its second, less obvious use is running a single command with a deliberately modified environment without permanently changing the shell's own, as in 'env NODE_ENV=production node app.js', which sets that one variable only for the duration of that one command, leaving the surrounding shell untouched.",
      pt: 'Imprime cada variável de ambiente atualmente visível ao shell, uma por linha, a forma mais rápida de checar o que um processo realmente herdaria, especialmente útil para confirmar se algo que o export definiu antes de fato surtiu efeito. Seu segundo uso, menos óbvio, é rodar um único comando com um ambiente deliberadamente modificado sem alterar permanentemente o do shell, como em "env NODE_ENV=production node app.js", que define essa única variável só pela duração daquele comando, deixando o shell ao redor intocado.',
    },
    subcommands: {},
    flags: {},
  },

  ufw: {
    desc: {
      en: "Uncomplicated Firewall: a friendlier command-line interface over iptables (or, on newer systems, nftables), the actual kernel-level firewall machinery on Linux, which is powerful but notoriously hard to configure directly by hand. ufw trades some of that raw flexibility for commands a human can read at a glance, 'ufw allow 22/tcp' instead of a multi-flag iptables rule, and is the default, expected way to manage a firewall on Debian and Ubuntu systems as a result. It has to actually be enabled with 'ufw enable' to take effect at all, and forgetting that step, or forgetting to allow SSH's own port before enabling it on a remote server, is a classic way to lock yourself out.",
      pt: 'Uncomplicated Firewall: uma interface de linha de comando mais amigável sobre o iptables (ou, em sistemas mais novos, o nftables), a maquinaria de firewall de verdade em nível de kernel no Linux, que é poderosa mas notoriamente difícil de configurar diretamente à mão. O ufw troca parte dessa flexibilidade bruta por comandos que um humano consegue ler de relance, "ufw allow 22/tcp" em vez de uma regra iptables com vários flags, e é por isso a forma padrão esperada de gerenciar um firewall no Debian e no Ubuntu. Ele precisa ser de fato ativado com "ufw enable" para ter algum efeito, e esquecer esse passo, ou esquecer de liberar a própria porta do SSH antes de ativá-lo em um servidor remoto, é uma forma clássica de se trancar para fora.',
    },
    subcommands: {
      enable: {
        en: 'Turns the firewall on, applying the configured rules.',
        pt: 'Ativa o firewall, aplicando as regras configuradas.',
      },
      disable: {
        en: 'Turns the firewall off entirely.',
        pt: 'Desativa o firewall por completo.',
      },
      allow: {
        en: 'Adds a rule permitting traffic, usually to a specific port or service.',
        pt: 'Adiciona uma regra permitindo tráfego, geralmente para uma porta ou serviço específico.',
      },
      deny: {
        en: 'Adds a rule blocking traffic to a specific port or service.',
        pt: 'Adiciona uma regra bloqueando tráfego para uma porta ou serviço específico.',
      },
      status: {
        en: 'Shows whether the firewall is active and lists the current rules.',
        pt: 'Mostra se o firewall está ativo e lista as regras atuais.',
      },
    },
    flags: {},
  },

  tmux: {
    desc: {
      en: "A terminal multiplexer: it runs a session that lives independently of any single terminal window, inside which you can open multiple panes and windows, split the screen, and switch between them, all from the keyboard. Its real power shows up over SSH: a tmux session started on a remote server keeps running even if the connection drops or the laptop is closed, and reattaching to it with 'tmux attach' picks up exactly where things were left, with every long-running command still going. It solves the same disconnection problem nohup does, but far more completely, since the whole interactive session survives, not just one process.",
      pt: 'Um multiplexador de terminal: roda uma sessão que existe independente de qualquer janela de terminal específica, dentro da qual dá para abrir vários painéis e janelas, dividir a tela, e alternar entre eles, tudo pelo teclado. Seu poder de verdade aparece via SSH: uma sessão tmux iniciada em um servidor remoto continua rodando mesmo que a conexão caia ou o notebook seja fechado, e reconectar a ela com "tmux attach" retoma exatamente de onde parou, com todo comando de longa duração ainda em execução. Resolve o mesmo problema de desconexão que o nohup resolve, mas de forma bem mais completa, já que a sessão interativa inteira sobrevive, não só um processo.',
    },
    subcommands: {
      new: {
        en: 'Creates a new tmux session, optionally with a name given via -s.',
        pt: 'Cria uma nova sessão tmux, opcionalmente com um nome dado via -s.',
      },
      attach: {
        en: 'Reconnects to an existing, already-running session instead of creating a new one.',
        pt: 'Reconecta a uma sessão existente que já está rodando, em vez de criar uma nova.',
      },
      ls: {
        en: 'Lists all currently running tmux sessions.',
        pt: 'Lista todas as sessões tmux em execução no momento.',
      },
      'kill-session': {
        en: 'Terminates a specific session and everything running inside it.',
        pt: 'Encerra uma sessão específica e tudo que está rodando dentro dela.',
      },
    },
    flags: {
      '-s': {
        en: 'Names the session, so it can be reattached to later by that name instead of a number.',
        pt: 'Dá um nome à sessão, para que possa ser reconectada depois por esse nome em vez de um número.',
      },
    },
    valueFlags: {
      '-s': 'generic',
    },
  },

  screen: {
    desc: {
      en: "An older terminal multiplexer that solves the same core problem tmux does, keeping a session alive independent of the terminal that started it, and predates tmux by roughly two decades. It ships by default on many systems where tmux has to be installed separately, which is why it still gets used, especially on older or minimal servers, even though tmux's more modern design, easier configuration, and active development have made it the more commonly recommended choice today.",
      pt: 'Um multiplexador de terminal mais antigo que resolve o mesmo problema central que o tmux resolve, manter uma sessão viva independente do terminal que a iniciou, e é cerca de duas décadas mais velho que o tmux. Vem instalado por padrão em muitos sistemas onde o tmux precisa ser instalado à parte, motivo pelo qual ainda é usado, especialmente em servidores mais antigos ou minimalistas, ainda que o design mais moderno do tmux, configuração mais fácil, e desenvolvimento ativo o tenham tornado a escolha mais recomendada hoje em dia.',
    },
    subcommands: {},
    flags: {
      '-S': {
        en: 'Names the session, so it can be identified and reattached to later.',
        pt: 'Dá um nome à sessão, para que possa ser identificada e reconectada depois.',
      },
      '-r': {
        en: 'Reattaches to an existing detached session.',
        pt: 'Reconecta a uma sessão existente que está desanexada.',
      },
      '-d': {
        en: 'Detaches an already-attached session elsewhere before reattaching here, useful when a session was left open on another terminal.',
        pt: 'Desanexa uma sessão já conectada em outro lugar antes de reconectar aqui, útil quando uma sessão ficou aberta em outro terminal.',
      },
    },
    valueFlags: {
      '-S': 'generic',
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

  tee: {
    desc: {
      en: "Reads from standard input and writes it both to standard output and to one or more files simultaneously, named after a plumbing T-joint that splits a single flow of water into two directions. It solves a specific ordering problem in shell pipelines: 'command > file' silently swallows the output into the file, but 'command | tee file' shows the output on screen exactly as it would without redirection while also saving a copy, which is why it is the standard fix when you need to both watch a long-running command's output live and keep a log of it.",
      pt: 'Lê da entrada padrão e escreve tanto na saída padrão quanto em um ou mais arquivos ao mesmo tempo, batizado em cima de uma peça de encanamento em T que divide um único fluxo de água em duas direções. Resolve um problema específico de ordenação em pipelines de shell: "comando > arquivo" engole a saída silenciosamente para dentro do arquivo, mas "comando | tee arquivo" mostra a saída na tela exatamente como apareceria sem redirecionamento e ainda guarda uma cópia, motivo pelo qual é o ajuste padrão quando é preciso tanto acompanhar ao vivo a saída de um comando longo quanto manter um log dela.',
    },
    subcommands: {},
    flags: {
      '-a': {
        en: 'Appends to the file instead of overwriting it.',
        pt: 'Acrescenta ao arquivo em vez de sobrescrevê-lo.',
      },
    },
  },

  watch: {
    desc: {
      en: "Runs a command repeatedly at a fixed interval (every 2 seconds by default), clearing the screen and redrawing the output each time, turning any one-shot command into a live-updating view without needing a purpose-built tool like top for it. 'watch df -h' or 'watch ls -la' are common examples: anything that would normally require manually re-running a command over and over to see if something changed becomes a single long-lived command instead, and by default it even highlights the specific characters that changed between refreshes.",
      pt: 'Roda um comando repetidamente em um intervalo fixo (a cada 2 segundos por padrão), limpando a tela e redesenhando a saída a cada vez, transformando qualquer comando de execução única em uma visão atualizada ao vivo sem precisar de uma ferramenta feita sob medida como o top para isso. "watch df -h" ou "watch ls -la" são exemplos comuns: qualquer coisa que normalmente exigiria rodar um comando de novo manualmente várias vezes para ver se algo mudou vira um único comando de longa duração, e por padrão ele até destaca os caracteres específicos que mudaram entre atualizações.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Sets the refresh interval in seconds (default is 2).',
        pt: 'Define o intervalo de atualização em segundos (o padrão é 2).',
      },
      '-d': {
        en: 'Highlights the differences between each successive update.',
        pt: 'Destaca as diferenças entre cada atualização sucessiva.',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
  },

  timeout: {
    desc: {
      en: "Runs a command but forcibly stops it if it hasn't finished within a given time limit, guarding against a script hanging forever on something that should have been quick, an unreachable network host, a command waiting on input that will never come. This matters especially in automated contexts like CI pipelines and cron jobs, where nobody is watching to notice a stuck process and kill it manually, so 'timeout 30s some-command' guarantees the pipeline moves on (with a non-zero exit code signaling the timeout) instead of hanging indefinitely.",
      pt: 'Roda um comando mas o interrompe à força se ele não terminar dentro de um limite de tempo dado, protegendo contra um script que trava para sempre em algo que deveria ter sido rápido, um host de rede inalcançável, um comando esperando por uma entrada que nunca vai chegar. Isso importa especialmente em contextos automatizados como pipelines de CI e tarefas de cron, onde ninguém está observando para notar um processo travado e matá-lo manualmente, então "timeout 30s algum-comando" garante que o pipeline siga em frente (com um código de saída diferente de zero sinalizando o timeout) em vez de travar indefinidamente.',
    },
    subcommands: {},
    flags: {
      '-s': {
        en: 'Sets which signal to send when the time limit is reached (SIGTERM by default).',
        pt: 'Define qual sinal enviar quando o limite de tempo é atingido (SIGTERM por padrão).',
      },
      '-k': {
        en: 'Sends a second, stronger signal (SIGKILL) after an additional delay, in case the process ignores the first one.',
        pt: 'Envia um segundo sinal, mais forte (SIGKILL), após um atraso adicional, caso o processo ignore o primeiro.',
      },
    },
    valueFlags: {
      '-s': 'generic',
      '-k': 'generic',
    },
  },

  pkill: {
    desc: {
      en: "Sends a signal, SIGTERM by default, to every process whose name matches a given pattern, instead of requiring the numeric PID that plain kill needs. It saves the two-step dance of first running ps or pgrep to find a PID and then passing that number to kill; 'pkill node' terminates every process named node in one call, which is convenient but also exactly why it needs to be used carefully, a pattern that is too broad can catch and kill more processes than intended.",
      pt: 'Envia um sinal, SIGTERM por padrão, a todo processo cujo nome combina com um padrão dado, em vez de exigir o PID numérico que o kill puro precisa. Poupa a dança de dois passos de primeiro rodar ps ou pgrep para achar um PID e depois passar esse número ao kill; "pkill node" encerra todo processo chamado node em uma única chamada, o que é conveniente mas também exatamente o motivo de precisar ser usado com cuidado, um padrão amplo demais pode pegar e matar mais processos do que o pretendido.',
    },
    subcommands: {},
    flags: {
      '-9': {
        en: 'Sends SIGKILL instead of the default SIGTERM, an unconditional, immediate termination.',
        pt: 'Envia SIGKILL em vez do SIGTERM padrão, um encerramento incondicional e imediato.',
      },
      '-f': {
        en: 'Matches against the full command line, not just the process name.',
        pt: 'Compara com a linha de comando completa, não só o nome do processo.',
      },
      '-u': {
        en: 'Only matches processes owned by a specific user.',
        pt: 'Só combina com processos pertencentes a um usuário específico.',
      },
    },
    valueFlags: {
      '-u': 'generic',
    },
    argHint: {
      en: 'The name pattern of the process(es) to match.',
      pt: 'O padrão de nome do(s) processo(s) a combinar.',
    },
  },

  killall: {
    desc: {
      en: "Sends a signal to every process matching an exact name, similar in spirit to pkill but requiring an exact name match by default rather than a pattern, which makes it slightly less prone to accidentally catching unrelated processes. Worth a note for anyone coming from macOS: its killall behaves quite differently and is not a drop-in equivalent to the Linux one, so scripts or muscle memory built on one do not necessarily translate safely to the other.",
      pt: 'Envia um sinal a todo processo que combina exatamente com um nome, parecido em espírito com o pkill mas exigindo correspondência exata de nome por padrão em vez de um padrão, o que o torna um pouco menos propenso a pegar processos não relacionados por acidente. Vale uma nota para quem vem do macOS: o killall de lá se comporta de forma bem diferente e não é um equivalente direto do killall do Linux, então scripts ou memória muscular construídos em um não se traduzem necessariamente com segurança para o outro.',
    },
    subcommands: {},
    flags: {
      '-9': {
        en: 'Sends SIGKILL instead of the default SIGTERM.',
        pt: 'Envia SIGKILL em vez do SIGTERM padrão.',
      },
      '-i': {
        en: 'Asks for confirmation before signaling each matching process.',
        pt: 'Pede confirmação antes de enviar o sinal a cada processo correspondente.',
      },
    },
    argHint: {
      en: 'The exact name of the process(es) to match.',
      pt: 'O nome exato do(s) processo(s) a combinar.',
    },
  },

  groupadd: {
    desc: {
      en: "Creates a new user group on the system, the counterpart to useradd for the group side of Linux's permission model. Groups exist so a permission can be granted to a whole set of users at once instead of one at a time, adding a deploy user to a docker or www-data group, for instance, grants everyone in that group the same access without editing individual file permissions repeatedly.",
      pt: 'Cria um novo grupo de usuário no sistema, a contraparte do useradd para o lado de grupo do modelo de permissão do Linux. Grupos existem para que uma permissão possa ser concedida a um conjunto inteiro de usuários de uma vez em vez de um por um, adicionar um usuário de deploy a um grupo docker ou www-data, por exemplo, concede a todo mundo naquele grupo o mesmo acesso sem editar permissões de arquivo individualmente de forma repetida.',
    },
    subcommands: {},
    flags: {
      '-g': {
        en: 'Sets a specific numeric group ID (gid) instead of letting the system assign the next available one.',
        pt: 'Define um ID numérico de grupo (gid) específico, em vez de deixar o sistema atribuir o próximo disponível.',
      },
    },
    valueFlags: {
      '-g': 'generic',
    },
    argHint: {
      en: 'The name of the group to create.',
      pt: 'O nome do grupo a criar.',
    },
  },

  chgrp: {
    desc: {
      en: "Changes only the group that owns a file or folder, leaving the user owner untouched, a narrower version of what chown can also do (chown can change both owner and group together). It is used less often than chown in practice, mostly reached for when a file's user owner is already correct and only its group access needs adjusting, for example handing shared write access to everyone in a particular team's group.",
      pt: 'Altera apenas o grupo dono de um arquivo ou pasta, deixando o usuário dono intocado, uma versão mais restrita do que o chown também consegue fazer (o chown pode mudar dono e grupo juntos). É usado com menos frequência que o chown na prática, geralmente usado quando o usuário dono de um arquivo já está correto e só o acesso de grupo precisa ser ajustado, por exemplo dando acesso de escrita compartilhado a todos no grupo de um time específico.',
    },
    subcommands: {},
    flags: {
      '-R': {
        en: 'Applies the change recursively to every file inside a folder.',
        pt: 'Aplica a mudança recursivamente, a todos os arquivos dentro de uma pasta.',
      },
    },
    argHint: {
      en: 'The new group name, or the file/folder being changed. The group comes first.',
      pt: 'O novo nome de grupo, ou o arquivo/pasta sendo alterado. O grupo vem primeiro.',
    },
  },

  umask: {
    desc: {
      en: "Shows or sets the default permission mask applied automatically to every newly created file and folder, before chmod is ever run on them by hand. It works by subtraction rather than addition: the mask's bits are the permissions to remove from the system's own defaults (666 for files, 777 for folders), which is why the common umask value of 022 results in newly created files getting 644 and folders 755, that 022 being exactly what got taken away.",
      pt: 'Mostra ou define a máscara de permissão padrão aplicada automaticamente a todo arquivo e pasta recém-criados, antes mesmo do chmod ser rodado neles manualmente. Funciona por subtração, não adição: os bits da máscara são as permissões a remover dos padrões do próprio sistema (666 para arquivos, 777 para pastas), motivo pelo qual o valor comum de umask 022 resulta em arquivos recém-criados ganhando 644 e pastas 755, aquele 022 sendo exatamente o que foi retirado.',
    },
    subcommands: {},
    flags: {},
  },

  mount: {
    desc: {
      en: "Attaches a filesystem, a disk partition, a USB drive, a network share, to a specific directory in the existing filesystem tree, making its contents accessible at that path. Linux has no separate drive letters the way Windows does; everything is grafted onto one unified tree starting at /, and mount is the command that performs that graft, matching exactly the device-and-options format used in /etc/fstab for filesystems that should be mounted automatically at boot.",
      pt: 'Anexa um sistema de arquivos, uma partição de disco, um pendrive USB, um compartilhamento de rede, a um diretório específico dentro da árvore de sistema de arquivos existente, tornando seu conteúdo acessível naquele caminho. O Linux não tem letras de unidade separadas como o Windows; tudo é enxertado em uma única árvore unificada começando em /, e o mount é o comando que faz esse enxerto, seguindo exatamente o mesmo formato de dispositivo e opções usado no /etc/fstab para sistemas de arquivos que devem ser montados automaticamente no boot.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Specifies the filesystem type (ext4, xfs, nfs, and so on) rather than letting it be auto-detected.',
        pt: 'Especifica o tipo de sistema de arquivos (ext4, xfs, nfs, e assim por diante) em vez de deixar ser detectado automaticamente.',
      },
      '-o': {
        en: 'Passes mount options, such as read-only access or specific performance tuning.',
        pt: 'Passa opções de montagem, como acesso somente leitura ou ajustes específicos de desempenho.',
      },
      '-a': {
        en: 'Mounts every filesystem listed in /etc/fstab that is not already mounted.',
        pt: 'Monta todo sistema de arquivos listado no /etc/fstab que ainda não está montado.',
      },
    },
    valueFlags: {
      '-t': 'generic',
      '-o': 'generic',
    },
    argHint: {
      en: 'The device/source to mount, or the mount point (the last argument is normally the mount point).',
      pt: 'O dispositivo/origem a montar, ou o ponto de montagem (o último argumento normalmente é o ponto de montagem).',
    },
  },

  umount: {
    desc: {
      en: "Detaches a mounted filesystem from the directory tree, the exact reverse of mount. It refuses to detach anything currently in use, if a program has a file open on it or a shell has that directory as its current working folder, which is a safety feature rather than a bug: forcibly disconnecting a filesystem still being written to risks corrupting data, so the fix is almost always to close whatever is using it first, not to force the unmount.",
      pt: 'Desanexa um sistema de arquivos montado da árvore de diretórios, o inverso exato do mount. Ele se recusa a desanexar qualquer coisa em uso no momento, se um programa tem um arquivo aberto nele ou um shell tem aquele diretório como pasta de trabalho atual, o que é um recurso de segurança, não um bug: desconectar à força um sistema de arquivos ainda sendo escrito arrisca corromper dados, então o ajuste quase sempre é fechar o que está usando primeiro, não forçar a desmontagem.',
    },
    subcommands: {},
    flags: {
      '-f': {
        en: 'Forces the unmount even if the filesystem appears busy, a last resort that risks data loss or corruption.',
        pt: 'Força a desmontagem mesmo que o sistema de arquivos pareça ocupado, um último recurso que arrisca perda ou corrupção de dados.',
      },
    },
    argHint: {
      en: 'The mounted device or mount point to unmount.',
      pt: 'O dispositivo montado ou ponto de montagem a desmontar.',
    },
  },

  lsblk: {
    desc: {
      en: "Lists block devices, disks and their partitions, as a tree, showing each one's size, type, and where (if anywhere) it is currently mounted. It is usually the first command run when a new disk or USB drive needs to be identified before partitioning or mounting it, since it shows the whole picture at once, unlike df, which only shows filesystems that are already mounted and therefore cannot help find a brand new, unformatted disk.",
      pt: 'Lista dispositivos de bloco, discos e suas partições, em forma de árvore, mostrando o tamanho, tipo e onde (se em algum lugar) cada um está montado no momento. Costuma ser o primeiro comando rodado quando um disco novo ou pendrive precisa ser identificado antes de particionar ou montar, já que mostra o quadro inteiro de uma vez, diferente do df, que só mostra sistemas de arquivos já montados e por isso não ajuda a achar um disco novo em folha, ainda sem formatação.',
    },
    subcommands: {},
    flags: {
      '-f': {
        en: 'Also shows the filesystem type and label of each device.',
        pt: 'Também mostra o tipo de sistema de arquivos e o rótulo de cada dispositivo.',
      },
    },
  },

  type: {
    desc: {
      en: "A shell builtin that reports what kind of thing a given name actually is, a builtin, a shell function, an alias, or an external program (and if the last, where exactly on disk it lives). It answers a subtly broader question than which does: which only ever searches PATH for external programs, so it can't see aliases or functions at all, while type checks the shell's own resolution order first, which is exactly what the shell itself would use to decide what runs when that name is typed.",
      pt: 'Um comando interno do shell que relata o que um determinado nome realmente é, um builtin, uma função de shell, um alias, ou um programa externo (e, nesse último caso, onde exatamente ele fica no disco). Responde a uma pergunta sutilmente mais ampla do que o which: o which só busca por programas externos no PATH, então não enxerga aliases nem funções, enquanto o type checa primeiro a própria ordem de resolução do shell, que é exatamente o que o shell usaria para decidir o que roda quando aquele nome é digitado.',
    },
    subcommands: {},
    flags: {
      '-a': {
        en: 'Shows every matching definition, not just the one that would actually run.',
        pt: 'Mostra toda definição correspondente, não só a que de fato rodaria.',
      },
    },
  },

  tree: {
    desc: {
      en: "Shows the contents of a directory as an indented, visual tree, recursing into every subfolder by default. Where ls shows one directory's contents at a time, tree shows the entire nested structure at a glance, which makes it a common first thing to run when getting oriented in an unfamiliar project or debugging a build output whose file layout matters.",
      pt: 'Mostra o conteúdo de um diretório como uma árvore visual indentada, entrando recursivamente em toda subpasta por padrão. Onde o ls mostra o conteúdo de um diretório por vez, o tree mostra a estrutura aninhada inteira de relance, o que o torna algo comum de rodar primeiro ao se situar em um projeto desconhecido ou depurar uma saída de build cujo layout de arquivos importa.',
    },
    subcommands: {},
    flags: {
      '-L': {
        en: 'Limits how many levels deep to descend, useful to avoid an overwhelming output on a large tree.',
        pt: 'Limita quantos níveis de profundidade percorrer, útil para evitar uma saída avassaladora em uma árvore grande.',
      },
      '-a': {
        en: 'Includes hidden files and folders.',
        pt: 'Inclui arquivos e pastas ocultos.',
      },
      '-d': {
        en: 'Shows only directories, omitting files entirely.',
        pt: 'Mostra apenas diretórios, omitindo arquivos por completo.',
      },
    },
    valueFlags: {
      '-L': 'generic',
    },
    argHint: {
      en: 'The directory to display. Defaults to the current directory when omitted.',
      pt: 'O diretório a exibir. Por padrão é o diretório atual, quando omitido.',
    },
  },

  jq: {
    desc: {
      en: "A command-line processor built specifically for JSON, letting you filter, transform, and pretty-print JSON data using its own small query language rather than reaching for a full scripting language just to pull one field out. It shows up constantly right after curl when working with an API, 'curl api.example.com/users | jq .[0].name' extracts a single field from a response in one line, and its default pretty-printed, colorized output alone makes raw JSON API responses far easier to read at a glance.",
      pt: 'Um processador de linha de comando feito especificamente para JSON, permitindo filtrar, transformar e formatar dados JSON usando sua própria linguagem de consulta pequena, em vez de recorrer a uma linguagem de script completa só para tirar um campo. Aparece constantemente logo depois do curl ao trabalhar com uma API, "curl api.example.com/users | jq .[0].name" extrai um único campo de uma resposta em uma linha, e sua saída padrão já formatada e colorida por si só torna respostas de API em JSON bruto bem mais fáceis de ler de relance.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Outputs raw strings without the surrounding JSON quotes, useful when piping the result into another command.',
        pt: 'Mostra strings brutas sem as aspas de JSON ao redor, útil ao encadear o resultado para outro comando.',
      },
      '-c': {
        en: 'Prints compact output on a single line instead of pretty-printed.',
        pt: 'Imprime a saída compacta em uma única linha, em vez de formatada.',
      },
    },
  },

  base64: {
    desc: {
      en: "Encodes binary data into a text-safe ASCII representation, or decodes it back, used whenever binary content, an image, a certificate, a credential, needs to travel through a system that only reliably handles plain text, like an environment variable, a JSON field, or an email attachment from decades ago when this format was first designed for exactly that purpose. It is text encoding, not encryption or compression, decoding a base64 string requires no secret or key at all, and reverses it perfectly back to the original bytes, and it actually makes the data slightly larger, not smaller.",
      pt: 'Codifica dados binários em uma representação ASCII segura para texto, ou decodifica de volta, usado sempre que conteúdo binário, uma imagem, um certificado, uma credencial, precisa passar por um sistema que só lida de forma confiável com texto puro, como uma variável de ambiente, um campo JSON, ou um anexo de email de décadas atrás, quando esse formato foi criado justamente para esse propósito. É codificação de texto, não criptografia nem compactação, decodificar uma string base64 não exige segredo nem chave nenhuma, e reverte perfeitamente de volta aos bytes originais, e na verdade deixa os dados um pouco maiores, não menores.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Decodes base64 input back into its original binary form, instead of encoding.',
        pt: 'Decodifica a entrada base64 de volta à sua forma binária original, em vez de codificar.',
      },
    },
  },

  md5sum: {
    desc: {
      en: "Computes the MD5 cryptographic hash of a file, a short fixed-length fingerprint that changes completely if even a single byte of the file changes, traditionally used to verify a downloaded file wasn't corrupted or tampered with by comparing its hash against a published value. MD5 itself is now considered cryptographically broken, deliberately crafted collisions (two different files producing the same hash) are practical to generate, so it should never be relied on for security purposes like verifying a file hasn't been maliciously altered; sha256sum is the modern equivalent to reach for whenever the check actually matters.",
      pt: 'Calcula o hash criptográfico MD5 de um arquivo, uma impressão digital curta de tamanho fixo que muda completamente se até um único byte do arquivo mudar, tradicionalmente usado para verificar se um arquivo baixado não foi corrompido ou adulterado, comparando seu hash com um valor publicado. O MD5 em si hoje é considerado criptograficamente quebrado, colisões propositais (dois arquivos diferentes produzindo o mesmo hash) são praticáveis de gerar, então nunca deveria ser usado para fins de segurança, como verificar se um arquivo não foi alterado maliciosamente; o sha256sum é o equivalente moderno a usar sempre que essa checagem realmente importa.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Checks a file against a list of previously computed hashes, instead of computing a new one.',
        pt: 'Verifica um arquivo contra uma lista de hashes previamente calculados, em vez de calcular um novo.',
      },
    },
    argHint: {
      en: 'The file to hash.',
      pt: 'O arquivo a calcular o hash.',
    },
  },

  sha256sum: {
    desc: {
      en: "Computes the SHA-256 cryptographic hash of a file, the modern, still-secure successor to the broken MD5, used to verify that a downloaded file (an installer, a Docker image, an operating system ISO) matches exactly what the publisher intended, with no corruption and no tampering. Trustworthy verification depends on getting the expected hash from a source independent of the download itself, typically the project's official website over HTTPS, since a hash published right next to a compromised file would be compromised too.",
      pt: 'Calcula o hash criptográfico SHA-256 de um arquivo, o sucessor moderno e ainda seguro do MD5 quebrado, usado para verificar se um arquivo baixado (um instalador, uma imagem Docker, uma ISO de sistema operacional) corresponde exatamente ao que o autor pretendia, sem corrupção e sem adulteração. Uma verificação confiável depende de conseguir o hash esperado de uma fonte independente do próprio download, tipicamente o site oficial do projeto via HTTPS, já que um hash publicado bem ao lado de um arquivo comprometido estaria comprometido também.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Checks a file against a list of previously computed hashes, instead of computing a new one.',
        pt: 'Verifica um arquivo contra uma lista de hashes previamente calculados, em vez de calcular um novo.',
      },
    },
    argHint: {
      en: 'The file to hash.',
      pt: 'O arquivo a calcular o hash.',
    },
  },

  realpath: {
    desc: {
      en: "Resolves a path, however messy, relative, full of .. and symbolic links, into its single canonical absolute form. It is what a script reaches for when it needs to know a file's real, unambiguous location regardless of how it was originally referenced, resolving every symlink along the way and collapsing every '../' and './' into the actual final destination.",
      pt: 'Resolve um caminho, por mais bagunçado que seja, relativo, cheio de .. e links simbólicos, para sua forma absoluta canônica única. É o que um script usa quando precisa saber a localização real e inequívoca de um arquivo, independente de como foi originalmente referenciado, resolvendo todo link simbólico pelo caminho e colapsando todo "../" e "./" no destino final de verdade.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The path to resolve.',
      pt: 'O caminho a resolver.',
    },
  },

  seq: {
    desc: {
      en: "Prints a sequence of numbers, from a start value to an end value, optionally stepping by a custom increment, one per line. It exists mostly to feed a for loop or xargs with a range of numbers in shells that don't have convenient native range syntax, 'for i in $(seq 1 5)' is a common pattern for repeating something a fixed number of times.",
      pt: 'Imprime uma sequência de números, de um valor inicial a um valor final, opcionalmente com um incremento customizado, um por linha. Existe principalmente para alimentar um loop for ou o xargs com um intervalo de números em shells que não têm uma sintaxe nativa conveniente para isso, "for i in $(seq 1 5)" é um padrão comum para repetir algo um número fixo de vezes.',
    },
    subcommands: {},
    flags: {
      '-s': {
        en: 'Sets a custom separator between numbers, instead of a newline.',
        pt: 'Define um separador customizado entre os números, em vez de uma quebra de linha.',
      },
    },
    valueFlags: {
      '-s': 'generic',
    },
    argHint: {
      en: 'A boundary number for the sequence (start, and optionally step and end).',
      pt: 'Um número de limite da sequência (início, e opcionalmente passo e fim).',
    },
  },

  sleep: {
    desc: {
      en: "Pauses for a given amount of time and then exits, doing nothing else in between. It is used inside scripts to wait for something to be ready, a service that takes a moment to start up, a rate limit to reset, before the next command runs, and accepts a unit suffix like 's' (seconds), 'm' (minutes), or 'h' (hours) directly, so 'sleep 5m' is valid without any extra math.",
      pt: 'Pausa por um período de tempo dado e então termina, sem fazer mais nada nesse meio tempo. É usado dentro de scripts para esperar algo ficar pronto, um serviço que demora um instante para subir, um limite de taxa resetar, antes do próximo comando rodar, e aceita um sufixo de unidade como "s" (segundos), "m" (minutos), ou "h" (horas) diretamente, então "sleep 5m" é válido sem nenhuma conta extra.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The duration to pause for.',
      pt: 'A duração da pausa.',
    },
  },

  date: {
    desc: {
      en: "Prints or sets the current system date and time, and with a custom format string, can print it in essentially any shape a script needs, ISO 8601 for logs, a Unix timestamp for calculations, a human-readable form for a message. '+%Y-%m-%d' for a plain date and 'date +%s' for the current Unix timestamp (seconds since 1970) are two of its most common invocations in scripts, the latter especially useful for measuring how long something took by taking a timestamp before and after.",
      pt: 'Imprime ou define a data e hora atuais do sistema, e, com uma string de formato customizada, consegue imprimir em essencialmente qualquer formato que um script precise, ISO 8601 para logs, um timestamp Unix para cálculos, uma forma legível por humanos para uma mensagem. "+%Y-%m-%d" para uma data simples e "date +%s" para o timestamp Unix atual (segundos desde 1970) são duas das invocações mais comuns em scripts, a última especialmente útil para medir quanto tempo algo levou, pegando um timestamp antes e depois.',
    },
    subcommands: {},
    flags: {
      '-u': {
        en: 'Shows the time in UTC instead of the local timezone.',
        pt: 'Mostra o horário em UTC em vez do fuso horário local.',
      },
      '-d': {
        en: 'Displays a specific date or a relative expression (like "yesterday" or "+1 day") instead of the current moment.',
        pt: 'Mostra uma data específica ou uma expressão relativa (como "yesterday" ou "+1 day") em vez do momento atual.',
      },
    },
    valueFlags: {
      '-d': 'generic',
    },
    argHint: {
      en: 'A format string starting with + (like +%Y-%m-%d) controlling the output shape.',
      pt: 'Uma string de formato começando com + (como +%Y-%m-%d) controlando o formato da saída.',
    },
  },

  dig: {
    desc: {
      en: "Queries DNS servers directly and shows the raw response, the standard tool for debugging DNS: confirming what IP address a domain actually resolves to, which name server is authoritative for it, or why a DNS change hasn't propagated yet. Its output is more detailed and more literally 'what the DNS server said' than higher-level tools, which is exactly the point when the question is specifically about DNS behavior rather than whether a site is reachable overall.",
      pt: 'Consulta servidores DNS diretamente e mostra a resposta bruta, a ferramenta padrão para depurar DNS: confirmar para qual IP um domínio realmente resolve, qual servidor de nomes é autoritativo para ele, ou por que uma mudança de DNS ainda não se propagou. Sua saída é mais detalhada e mais literalmente "o que o servidor DNS respondeu" do que ferramentas de nível mais alto, o que é exatamente o ponto quando a pergunta é especificamente sobre o comportamento do DNS, não sobre se um site está alcançável no geral.',
    },
    subcommands: {},
    flags: {
      '+short': {
        en: 'Prints only the essential answer, skipping the full detailed output.',
        pt: 'Imprime só a resposta essencial, sem a saída detalhada completa.',
      },
    },
    argHint: {
      en: 'The domain name to query.',
      pt: 'O domínio a consultar.',
    },
  },

  make: {
    desc: {
      en: "Reads a Makefile describing a set of named targets and the commands needed to build each one, then runs only the commands needed to bring an out-of-date target up to date, skipping anything already current. That last part is the whole point: make compares file modification times, and if a target's output is newer than all its dependencies, it does nothing at all, which is why incremental rebuilds of a large C project can take seconds instead of minutes. It predates almost every other build tool in wide use today, and 'make install' specifically is the traditional last step of building software from source, copying the freshly built binaries into their final system location.",
      pt: 'Lê um Makefile descrevendo um conjunto de alvos nomeados e os comandos necessários para construir cada um, e então roda só os comandos necessários para deixar um alvo desatualizado em dia, pulando qualquer coisa já atual. Esse último detalhe é o ponto principal: o make compara datas de modificação de arquivo, e se a saída de um alvo é mais nova que todas as suas dependências, ele não faz nada, motivo pelo qual reconstruções incrementais de um projeto C grande podem levar segundos em vez de minutos. É anterior a quase toda outra ferramenta de build em uso hoje, e "make install" especificamente é o passo tradicional final de compilar software a partir do código-fonte, copiando os binários recém-construídos para o lugar final no sistema.',
    },
    subcommands: {},
    flags: {
      '-f': {
        en: 'Uses a specific file as the Makefile, instead of looking for Makefile or makefile in the current folder.',
        pt: 'Usa um arquivo específico como Makefile, em vez de procurar por Makefile ou makefile na pasta atual.',
      },
      '-j': {
        en: 'Runs multiple independent build steps in parallel, dramatically speeding up large builds on multi-core machines.',
        pt: 'Roda múltiplos passos de build independentes em paralelo, acelerando muito builds grandes em máquinas com vários núcleos.',
      },
      '-n': {
        en: "Shows what commands would run without actually running them, useful for checking what a target does before triggering it.",
        pt: 'Mostra quais comandos rodariam sem realmente executá-los, útil para checar o que um alvo faz antes de disparar.',
      },
    },
    valueFlags: {
      '-f': 'generic',
      '-j': 'generic',
    },
    argHint: {
      en: 'The name of the target to build, such as install, test, or clean.',
      pt: 'O nome do alvo a construir, como install, test ou clean.',
    },
  },

  gcc: {
    desc: {
      en: "The GNU Compiler Collection's C compiler, taking C source files and turning them into an executable (or, with the right flags, stopping earlier at an object file or assembly). It handles the whole pipeline by default, preprocessing, compiling, assembling, and linking, in one command, calling out to separate tools for each stage internally, which is why a single 'gcc file.c -o program' is enough for a simple program even though several distinct programs actually ran underneath it.",
      pt: 'O compilador C do GNU Compiler Collection, transformando arquivos-fonte C em um executável (ou, com as flags certas, parando antes em um arquivo objeto ou assembly). Ele cuida do pipeline inteiro por padrão, pré-processamento, compilação, montagem e ligação, em um único comando, chamando ferramentas separadas para cada etapa por baixo, motivo pelo qual um simples "gcc arquivo.c -o programa" basta para um programa simples mesmo que vários programas distintos tenham rodado por baixo.',
    },
    subcommands: {},
    flags: {
      '-o': {
        en: 'Sets the name of the output file, instead of the default a.out.',
        pt: 'Define o nome do arquivo de saída, em vez do padrão a.out.',
      },
      '-c': {
        en: 'Compiles to an object file only, without linking into a final executable.',
        pt: 'Compila apenas para um arquivo objeto, sem ligar em um executável final.',
      },
      '-Wall': {
        en: 'Enables a broad set of useful compiler warnings that are off by default.',
        pt: 'Ativa um conjunto amplo de avisos úteis do compilador que ficam desligados por padrão.',
      },
      '-g': {
        en: 'Includes debug information in the output, needed for tools like gdb to show source-level detail.',
        pt: 'Inclui informação de depuração na saída, necessária para ferramentas como o gdb mostrarem detalhe no nível do código-fonte.',
      },
      '-O2': {
        en: 'Enables a strong level of compiler optimization, the common choice for release builds.',
        pt: 'Ativa um nível forte de otimização do compilador, a escolha comum para builds de release.',
      },
    },
    valueFlags: {
      '-o': 'generic',
    },
    argHint: {
      en: 'The source file to compile.',
      pt: 'O arquivo-fonte a compilar.',
    },
  },

  python3: {
    desc: {
      en: "Runs the Python 3 interpreter, either executing a script file given as an argument, running a short inline command with -c, or, with no arguments at all, dropping into an interactive prompt for experimenting line by line. The '3' in the name exists because Python 2 and Python 3 coexisted for over a decade with real language differences between them; Python 2 has since reached end of life, but the explicit 'python3' name persists as the safe, unambiguous way to invoke it on systems where a bare 'python' might not exist or might point somewhere unexpected.",
      pt: 'Roda o interpretador Python 3, seja executando um arquivo de script dado como argumento, rodando um comando curto inline com -c, ou, sem argumento nenhum, caindo em um prompt interativo para experimentar linha por linha. O "3" no nome existe porque Python 2 e Python 3 coexistiram por mais de uma década com diferenças reais de linguagem entre eles; o Python 2 já chegou ao fim de vida, mas o nome explícito "python3" persiste como a forma segura e inequívoca de chamá-lo em sistemas onde um "python" puro pode não existir ou apontar para outro lugar inesperado.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Runs the command given as a string, instead of reading a script file.',
        pt: 'Roda o comando dado como string, em vez de ler um arquivo de script.',
      },
      '-m': {
        en: "Runs a library module as a script, such as 'python3 -m http.server' to start a quick local web server.",
        pt: 'Roda um módulo de biblioteca como script, como "python3 -m http.server" para iniciar um servidor web local rápido.',
      },
      '-V': {
        en: 'Prints the interpreter version and exits.',
        pt: 'Imprime a versão do interpretador e termina.',
      },
    },
    valueFlags: {
      '-c': 'generic',
      '-m': 'generic',
    },
    argHint: {
      en: 'The Python script file to run.',
      pt: 'O arquivo de script Python a rodar.',
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

  node: {
    desc: {
      en: "Runs JavaScript outside a browser, using the same V8 engine Chrome uses, which is what made JavaScript viable as a general-purpose server and scripting language in the first place. Given a file it executes that script top to bottom; given no arguments it drops into an interactive REPL, and 'node -e' runs a short snippet inline, the same three modes python3 offers for its own language.",
      pt: 'Roda JavaScript fora de um navegador, usando o mesmo motor V8 que o Chrome usa, o que foi o que tornou o JavaScript viável como linguagem de propósito geral para servidor e scripts. Dado um arquivo, ele executa esse script do início ao fim; sem argumento nenhum, cai em um REPL interativo, e "node -e" roda um trecho curto inline, os mesmos três modos que o python3 oferece para sua própria linguagem.',
    },
    subcommands: {},
    flags: {
      '-e': {
        en: 'Runs the script given as a string, instead of reading a file.',
        pt: 'Roda o script dado como string, em vez de ler um arquivo.',
      },
      '-v': {
        en: 'Prints the Node.js version and exits.',
        pt: 'Imprime a versão do Node.js e termina.',
      },
      '--version': {
        en: 'Prints the Node.js version and exits.',
        pt: 'Imprime a versão do Node.js e termina.',
      },
    },
    valueFlags: {
      '-e': 'generic',
    },
    argHint: {
      en: 'The JavaScript file to run.',
      pt: 'O arquivo JavaScript a rodar.',
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
      en: "A JavaScript package manager built around a single shared storage of packages on disk, with projects linking to that store instead of each project keeping its own full copy of every dependency. That design is what makes it dramatically faster and lighter on disk space than npm or yarn on a machine with many JavaScript projects, since a library used by ten projects is only ever actually stored once.",
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

  zip: {
    desc: {
      en: "Packs one or more files into a .zip archive, optionally compressing them at the same time, the counterpart to unzip. Unlike tar, zip both bundles and compresses in the same step and format, and it can add files to an existing archive incrementally without rebuilding the whole thing, which is convenient for gradually collecting files but means a .zip can end up with stale duplicate entries if not managed carefully.",
      pt: 'Empacota um ou mais arquivos em um arquivo .zip, opcionalmente compactando-os ao mesmo tempo, o par do unzip. Diferente do tar, o zip empacota e compacta na mesma etapa e formato, e consegue adicionar arquivos a um arquivo existente de forma incremental sem reconstruir tudo, o que é conveniente para coletar arquivos aos poucos mas significa que um .zip pode acabar com entradas duplicadas obsoletas se não for gerenciado com cuidado.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Recursively includes the contents of folders, not just their top-level entry.',
        pt: 'Inclui recursivamente o conteúdo de pastas, não só a entrada de nível superior delas.',
      },
      '-9': {
        en: 'Uses the highest (slowest) compression level.',
        pt: 'Usa o nível de compactação mais alto (e mais lento).',
      },
      '-e': {
        en: 'Encrypts the archive with a password, prompted interactively.',
        pt: 'Criptografa o arquivo com uma senha, pedida interativamente.',
      },
    },
    argHint: {
      en: 'The name of the .zip archive to create, followed by the files to add.',
      pt: 'O nome do arquivo .zip a criar, seguido dos arquivos a adicionar.',
    },
  },

  xz: {
    desc: {
      en: "Compresses a single file using the LZMA2 algorithm, the same family used by 7-Zip, trading significantly more CPU time and memory during compression for a noticeably smaller output than gzip on the same data. That trade-off is exactly why it shows up for distributing large, compress-once-decompress-many artifacts like Linux kernel source tarballs and software release archives, where the extra compression time is paid once but the smaller download is downloaded by everyone.",
      pt: 'Compacta um único arquivo usando o algoritmo LZMA2, a mesma família usada pelo 7-Zip, trocando bem mais tempo de CPU e memória durante a compactação por uma saída visivelmente menor que o gzip nos mesmos dados. Essa troca é exatamente o motivo dele aparecer para distribuir artefatos grandes, compactados uma vez e descompactados muitas, como tarballs de código-fonte do kernel Linux e pacotes de release de software, onde o tempo extra de compactação é pago uma vez só, mas o download menor é baixado por todo mundo.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Decompresses instead of compressing.',
        pt: 'Descompacta em vez de compactar.',
      },
      '-k': {
        en: 'Keeps the original file instead of replacing it.',
        pt: 'Mantém o arquivo original em vez de substituí-lo.',
      },
      '-9': {
        en: 'Uses the highest (slowest, most memory-hungry) compression level.',
        pt: 'Usa o nível de compactação mais alto (mais lento e mais consumidor de memória).',
      },
    },
    argHint: {
      en: 'The file to compress or decompress.',
      pt: 'O arquivo a compactar ou descompactar.',
    },
  },

  bzip2: {
    desc: {
      en: "Compresses a single file using the Burrows-Wheeler algorithm, generally landing between gzip and xz on the speed-versus-compression-ratio spectrum: noticeably smaller output than gzip, noticeably faster than xz. It shares gzip's limitation of handling exactly one file at a time with no archive concept, which is why tarballs compressed with it are named .tar.bz2, following the same tar-then-compress pattern as .tar.gz.",
      pt: 'Compacta um único arquivo usando o algoritmo Burrows-Wheeler, geralmente ficando entre o gzip e o xz no espectro de velocidade versus taxa de compactação: saída visivelmente menor que o gzip, visivelmente mais rápido que o xz. Compartilha a limitação do gzip de lidar com exatamente um arquivo por vez, sem conceito de arquivo compactado múltiplo, motivo pelo qual tarballs compactados com ele se chamam .tar.bz2, seguindo o mesmo padrão de tar-depois-compactar do .tar.gz.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Decompresses instead of compressing (same as running bunzip2).',
        pt: 'Descompacta em vez de compactar (o mesmo que rodar bunzip2).',
      },
      '-k': {
        en: 'Keeps the original file instead of replacing it.',
        pt: 'Mantém o arquivo original em vez de substituí-lo.',
      },
      '-9': {
        en: 'Uses the highest (slowest) compression level.',
        pt: 'Usa o nível de compactação mais alto (e mais lento).',
      },
    },
    argHint: {
      en: 'The file to compress or decompress.',
      pt: 'O arquivo a compactar ou descompactar.',
    },
  },

  file: {
    desc: {
      en: "Identifies what kind of data a file actually contains by inspecting its content, not its name or extension, which is exactly what makes it useful: a file renamed from photo.exe to photo.jpg is still detected as an executable, because file reads the first bytes and checks them against a database of known signatures (magic numbers) rather than trusting the label on the tin. It is a fast, low-stakes first step whenever a file of unknown or suspicious origin needs to be understood before opening it with something else.",
      pt: 'Identifica que tipo de dado um arquivo realmente contém inspecionando seu conteúdo, não o nome ou a extensão, o que é exatamente o que o torna útil: um arquivo renomeado de foto.exe para foto.jpg ainda é detectado como um executável, porque o file lê os primeiros bytes e os checa contra um banco de assinaturas conhecidas (magic numbers) em vez de confiar no rótulo. É um primeiro passo rápido e de baixo risco sempre que um arquivo de origem desconhecida ou suspeita precisa ser entendido antes de abri-lo com outra coisa.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: "Reports the MIME type (like text/plain or image/jpeg) instead of a human-readable description.",
        pt: 'Relata o tipo MIME (como text/plain ou image/jpeg) em vez de uma descrição legível por humanos.',
      },
    },
    argHint: {
      en: 'The file to identify.',
      pt: 'O arquivo a identificar.',
    },
  },

  tr: {
    desc: {
      en: "Translates or deletes individual characters from its input, one character at a time, streamed straight through without ever understanding lines or fields the way sed or awk do. 'tr a-z A-Z' upper-cases text by mapping each lowercase letter to its uppercase counterpart, and 'tr -d' deletes every character in a given set outright, both classic building blocks in shell one-liners for quick text cleanup.",
      pt: 'Traduz ou apaga caracteres individuais da entrada, um caractere de cada vez, direto no fluxo sem nunca entender linhas ou campos como o sed ou o awk fazem. "tr a-z A-Z" transforma texto em maiúsculas mapeando cada letra minúscula para sua correspondente maiúscula, e "tr -d" apaga de vez todo caractere em um conjunto dado, ambos blocos clássicos de construção em one-liners de shell para limpeza rápida de texto.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Deletes every character in the given set, instead of translating.',
        pt: 'Apaga todo caractere no conjunto dado, em vez de traduzir.',
      },
      '-s': {
        en: 'Squeezes repeated consecutive occurrences of a character down to a single one.',
        pt: 'Reduz ocorrências consecutivas repetidas de um caractere para uma só.',
      },
    },
    argHint: {
      en: 'The set of characters to translate from, or (with -d) to delete.',
      pt: 'O conjunto de caracteres a traduzir, ou (com -d) a apagar.',
    },
  },

  printf: {
    desc: {
      en: "Prints formatted text, following the same format-string convention as the C standard library function of the same name, with placeholders like %s for a string and %d for a number. It is the more precise, more portable sibling of echo: unlike echo, its behavior does not vary between shells, it never accidentally interprets a leading dash in the text as a flag, and it never appends a trailing newline unless the format string explicitly includes \\n, which makes it the safer choice inside scripts that build output carefully.",
      pt: 'Imprime texto formatado, seguindo a mesma convenção de string de formato da função de mesmo nome da biblioteca padrão C, com marcadores como %s para uma string e %d para um número. É o irmão mais preciso e portável do echo: diferente do echo, seu comportamento não varia entre shells, ele nunca interpreta por acidente um hífen no início do texto como uma flag, e nunca acrescenta uma quebra de linha no final a menos que a string de formato inclua \\n explicitamente, o que o torna a escolha mais segura dentro de scripts que constroem saída com cuidado.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The format string, followed by the values to substitute into it.',
      pt: 'A string de formato, seguida dos valores a substituir nela.',
    },
  },

  nl: {
    desc: {
      en: 'Numbers the lines of a file and prints them, similar to cat -n but with far more control over the numbering format, width, and which lines get numbered at all (blank lines can be skipped by default, unlike cat -n).',
      pt: 'Numera as linhas de um arquivo e as imprime, parecido com cat -n mas com bem mais controle sobre o formato de numeração, a largura, e quais linhas de fato recebem número (linhas em branco podem ser puladas por padrão, diferente do cat -n).',
    },
    subcommands: {},
    flags: {
      '-b': {
        en: "Sets which lines get numbered: 'a' for all lines, 't' for non-blank lines only (the default).",
        pt: 'Define quais linhas recebem número: "a" para todas as linhas, "t" só para as não vazias (o padrão).',
      },
    },
    valueFlags: {
      '-b': 'generic',
    },
    argHint: {
      en: 'The file to number.',
      pt: 'O arquivo a numerar.',
    },
  },

  comm: {
    desc: {
      en: "Compares two already-sorted files line by line and prints three columns: lines only in the first file, lines only in the second, and lines common to both. Because it depends on sorted input to work correctly, it is almost always used right after piping both sides through sort, and it is the tool of choice for a genuine set comparison (what changed, what is unique to each side) rather than diff's line-by-line edit view.",
      pt: 'Compara dois arquivos já ordenados linha por linha e imprime três colunas: linhas só no primeiro arquivo, linhas só no segundo, e linhas comuns aos dois. Como depende de entrada ordenada para funcionar corretamente, quase sempre é usado logo depois de passar os dois lados pelo sort, e é a ferramenta certa para uma comparação de conjunto de verdade (o que mudou, o que é único de cada lado), diferente da visão de edição linha a linha do diff.',
    },
    subcommands: {},
    flags: {
      '-1': {
        en: 'Suppresses the column of lines unique to the first file.',
        pt: 'Suprime a coluna de linhas exclusivas do primeiro arquivo.',
      },
      '-2': {
        en: 'Suppresses the column of lines unique to the second file.',
        pt: 'Suprime a coluna de linhas exclusivas do segundo arquivo.',
      },
      '-3': {
        en: 'Suppresses the column of lines common to both files.',
        pt: 'Suprime a coluna de linhas comuns aos dois arquivos.',
      },
    },
    argHint: {
      en: 'One of the two sorted files being compared.',
      pt: 'Um dos dois arquivos ordenados sendo comparados.',
    },
  },

  join: {
    desc: {
      en: "Joins the lines of two sorted files that share a common field, similar in spirit to a SQL JOIN but operating on plain text files by field position or delimiter rather than database tables. Like comm and sort -m, it depends on both inputs being sorted on the join field beforehand, which is a common source of confusing empty output when someone forgets that requirement.",
      pt: 'Junta as linhas de dois arquivos ordenados que compartilham um campo comum, parecido em espírito com um JOIN de SQL mas operando em arquivos de texto puro por posição de campo ou delimitador, não em tabelas de banco de dados. Como o comm e o sort -m, depende de ambas as entradas estarem ordenadas pelo campo de junção antes, o que é uma fonte comum de saída vazia confusa quando alguém esquece esse requisito.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Sets the field delimiter (default is whitespace).',
        pt: 'Define o delimitador de campo (o padrão é espaço em branco).',
      },
      '-1': {
        en: 'Sets which field in the first file to join on (field 1 by default).',
        pt: 'Define qual campo do primeiro arquivo usar para a junção (campo 1 por padrão).',
      },
      '-2': {
        en: 'Sets which field in the second file to join on (field 1 by default).',
        pt: 'Define qual campo do segundo arquivo usar para a junção (campo 1 por padrão).',
      },
    },
    valueFlags: {
      '-t': 'generic',
      '-1': 'generic',
      '-2': 'generic',
    },
    argHint: {
      en: 'One of the two sorted files being joined.',
      pt: 'Um dos dois arquivos ordenados sendo unidos.',
    },
  },

  paste: {
    desc: {
      en: "Merges the lines of multiple files side by side, joining the Nth line of each file into one line separated by a delimiter (a tab by default), the opposite operation of cut in a sense: where cut pulls a column out of one file, paste combines several files into columns. 'paste -d, a.txt b.txt' is a quick way to zip two single-column lists into a two-column CSV.",
      pt: 'Junta as linhas de vários arquivos lado a lado, combinando a linha N de cada arquivo em uma única linha separada por um delimitador (tab por padrão), em certo sentido a operação oposta do cut: onde o cut tira uma coluna de um arquivo, o paste combina vários arquivos em colunas. "paste -d, a.txt b.txt" é uma forma rápida de juntar duas listas de uma coluna em um CSV de duas colunas.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Sets the delimiter used between merged fields (a tab by default).',
        pt: 'Define o delimitador usado entre os campos juntados (tab por padrão).',
      },
      '-s': {
        en: 'Merges each file into a single line instead of pairing lines across files.',
        pt: 'Junta cada arquivo em uma única linha, em vez de parear linhas entre arquivos.',
      },
    },
    valueFlags: {
      '-d': 'generic',
    },
    argHint: {
      en: 'A file whose lines will be merged in as a column.',
      pt: 'Um arquivo cujas linhas serão juntadas como uma coluna.',
    },
  },

  column: {
    desc: {
      en: 'Formats input into neatly aligned columns, turning delimiter-separated text (like a CSV or the output of another command) into a readable table with padded, lined-up columns, which raw text with inconsistent field widths never quite achieves on its own.',
      pt: 'Formata a entrada em colunas alinhadas de forma organizada, transformando texto separado por delimitador (como um CSV ou a saída de outro comando) em uma tabela legível com colunas alinhadas e espaçadas, algo que texto bruto com larguras de campo inconsistentes nunca alcança sozinho.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Determines the number of columns automatically and aligns them in a table.',
        pt: 'Determina o número de colunas automaticamente e as alinha em uma tabela.',
      },
      '-s': {
        en: 'Sets the input field separator (whitespace by default).',
        pt: 'Define o separador de campo da entrada (espaço em branco por padrão).',
      },
    },
    valueFlags: {
      '-s': 'generic',
    },
  },

  readlink: {
    desc: {
      en: "Prints the target a symbolic link points to, or, with -f, resolves a path all the way through every symlink to its final canonical absolute form, similar to realpath. It is a common building block in scripts that need to find out where a script itself actually lives on disk, since $0 can be a symlink and readlink -f \"$0\" resolves it to the real file.",
      pt: 'Imprime o alvo para o qual um link simbólico aponta, ou, com -f, resolve um caminho por completo através de todo link simbólico até sua forma absoluta canônica final, parecido com o realpath. É um bloco de construção comum em scripts que precisam descobrir onde o próprio script realmente está no disco, já que $0 pode ser um link simbólico e readlink -f "$0" o resolve para o arquivo real.',
    },
    subcommands: {},
    flags: {
      '-f': {
        en: 'Resolves every symlink along the path, following recursively to the final canonical target.',
        pt: 'Resolve todo link simbólico ao longo do caminho, seguindo recursivamente até o alvo canônico final.',
      },
    },
    argHint: {
      en: 'The symbolic link or path to resolve.',
      pt: 'O link simbólico ou caminho a resolver.',
    },
  },

  shred: {
    desc: {
      en: "Overwrites a file's contents multiple times with patterns of data before optionally deleting it, an attempt to make the original data harder to recover than a plain rm would, which only removes the directory entry and leaves the actual data on disk until it happens to be overwritten later. On modern SSDs and journaling or copy-on-write filesystems, this guarantee is considerably weaker than it was on old spinning disks, since the drive's own wear-leveling can silently keep old copies of the data shred never touches.",
      pt: 'Sobrescreve o conteúdo de um arquivo várias vezes com padrões de dados antes de opcionalmente apagá-lo, uma tentativa de tornar os dados originais mais difíceis de recuperar do que um rm simples faria, que só remove a entrada de diretório e deixa os dados de fato no disco até que sejam sobrescritos mais tarde por acaso. Em SSDs modernos e sistemas de arquivos com journaling ou copy-on-write, essa garantia é consideravelmente mais fraca do que era em discos giratórios antigos, já que o próprio nivelamento de desgaste do drive pode manter silenciosamente cópias antigas dos dados que o shred nunca toca.',
    },
    subcommands: {},
    flags: {
      '-u': {
        en: 'Deletes the file after overwriting it, instead of leaving the (now scrambled) file in place.',
        pt: 'Apaga o arquivo depois de sobrescrevê-lo, em vez de deixar o arquivo (agora embaralhado) no lugar.',
      },
      '-n': {
        en: 'Sets how many overwrite passes to perform (3 by default).',
        pt: 'Define quantas passagens de sobrescrita realizar (3 por padrão).',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The file to overwrite and optionally delete.',
      pt: 'O arquivo a sobrescrever e opcionalmente apagar.',
    },
  },

  nice: {
    desc: {
      en: "Starts a command with an adjusted scheduling priority, letting a CPU-heavy background task step out of the way of more time-sensitive work instead of competing with it equally for the processor. A higher niceness value means lower priority (the process is being 'nicer' to everyone else), and only root can lower a process's niceness to give it more priority than default.",
      pt: 'Inicia um comando com uma prioridade de escalonamento ajustada, permitindo que uma tarefa pesada de CPU em segundo plano se afaste do caminho de trabalho mais sensível ao tempo, em vez de competir igualmente por ele. Um valor de niceness mais alto significa prioridade mais baixa (o processo está sendo "mais gentil" com todo mundo), e só o root pode baixar a niceness de um processo para lhe dar mais prioridade que o padrão.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Sets the niceness adjustment (higher means lower priority, 10 is a common default choice).',
        pt: 'Define o ajuste de niceness (mais alto significa prioridade mais baixa, 10 é uma escolha padrão comum).',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The command to run with adjusted priority.',
      pt: 'O comando a rodar com prioridade ajustada.',
    },
  },

  renice: {
    desc: {
      en: "Changes the scheduling priority of a process that is already running, identified by its PID, the same adjustment nice makes at startup but applied after the fact without restarting the process.",
      pt: 'Altera a prioridade de escalonamento de um processo que já está em execução, identificado pelo seu PID, o mesmo ajuste que o nice faz na inicialização, mas aplicado depois, sem reiniciar o processo.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Sets the new niceness value.',
        pt: 'Define o novo valor de niceness.',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The process ID (PID) whose priority is being changed.',
      pt: 'O ID de processo (PID) cuja prioridade está sendo alterada.',
    },
  },

  usermod: {
    desc: {
      en: "Modifies an existing user account, the counterpart to useradd for accounts that already exist rather than being created fresh. Its most common invocation is adding a user to a group with -aG, and forgetting the -a there is a classic mistake, without it, -G replaces the user's supplementary groups entirely instead of adding to them, silently removing them from every other group they belonged to.",
      pt: 'Modifica uma conta de usuário existente, a contraparte do useradd para contas que já existem, em vez de serem criadas do zero. Sua invocação mais comum é adicionar um usuário a um grupo com -aG, e esquecer o -a ali é um erro clássico, sem ele, o -G substitui os grupos suplementares do usuário por completo em vez de adicionar a eles, removendo-o silenciosamente de todo outro grupo ao qual pertencia.',
    },
    subcommands: {},
    flags: {
      '-aG': {
        en: 'Adds the user to one or more supplementary groups, appending to their existing groups instead of replacing them.',
        pt: 'Adiciona o usuário a um ou mais grupos suplementares, acrescentando aos grupos existentes em vez de substituí-los.',
      },
      '-s': {
        en: "Changes the user's login shell.",
        pt: 'Altera o shell de login do usuário.',
      },
      '-l': {
        en: "Changes the user's login name.",
        pt: 'Altera o nome de login do usuário.',
      },
    },
    valueFlags: {
      '-aG': 'generic',
      '-s': 'generic',
      '-l': 'generic',
    },
    argHint: {
      en: 'The username of the account being modified.',
      pt: 'O nome de usuário da conta sendo modificada.',
    },
  },

  userdel: {
    desc: {
      en: "Removes a user account from the system. By default it leaves the user's home directory and mail spool untouched, deleting only the account entry itself; -r removes those too, which is normally what is actually wanted when decommissioning an account for good.",
      pt: 'Remove uma conta de usuário do sistema. Por padrão deixa o diretório home e a caixa de correio do usuário intocados, apagando só a entrada da conta em si; o -r remove esses também, que é normalmente o que de fato se quer ao desativar uma conta de vez.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: "Also removes the user's home directory and mail spool.",
        pt: 'Também remove o diretório home e a caixa de correio do usuário.',
      },
    },
    argHint: {
      en: 'The username of the account to remove.',
      pt: 'O nome de usuário da conta a remover.',
    },
  },

  groupdel: {
    desc: {
      en: "Removes a group from the system. It fails if the group is still any user's primary group, that user has to be moved to a different primary group first, which is a safety check preventing a user from being left in an inconsistent state with no valid primary group at all.",
      pt: 'Remove um grupo do sistema. Falha se o grupo ainda for o grupo primário de algum usuário, esse usuário precisa ser movido para outro grupo primário antes, uma checagem de segurança que evita deixar um usuário em um estado inconsistente, sem grupo primário válido nenhum.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The name of the group to remove.',
      pt: 'O nome do grupo a remover.',
    },
  },

  groups: {
    desc: {
      en: "Prints the groups a user belongs to, a quicker, more narrowly focused alternative to id when the only thing that matters is group membership, such as confirming a user was really added to the docker or sudo group.",
      pt: 'Imprime os grupos aos quais um usuário pertence, uma alternativa mais rápida e focada ao id quando só a associação de grupo importa, como confirmar se um usuário foi mesmo adicionado ao grupo docker ou sudo.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The username to check. Defaults to the current user when omitted.',
      pt: 'O nome de usuário a checar. Por padrão é o usuário atual, quando omitido.',
    },
  },

  visudo: {
    desc: {
      en: "Opens /etc/sudoers (or a file under /etc/sudoers.d) for editing, but never directly with a plain text editor: visudo locks the file against simultaneous edits and, critically, validates the syntax before saving, refusing to write a broken file. That validation matters enormously here specifically, because a syntax error in sudoers can lock every user, including root via sudo, out of administrative access, and visudo is the only sanctioned way to avoid that outcome.",
      pt: 'Abre o /etc/sudoers (ou um arquivo em /etc/sudoers.d) para edição, mas nunca diretamente com um editor de texto simples: o visudo trava o arquivo contra edições simultâneas e, criticamente, valida a sintaxe antes de salvar, recusando-se a escrever um arquivo quebrado. Essa validação importa enormemente aqui especificamente, porque um erro de sintaxe no sudoers pode trancar todo usuário, incluindo o root via sudo, fora do acesso administrativo, e o visudo é a única forma sancionada de evitar esse resultado.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Checks the existing sudoers file for syntax errors without opening an editor.',
        pt: 'Checa o arquivo sudoers existente por erros de sintaxe sem abrir um editor.',
      },
    },
  },

  locate: {
    desc: {
      en: "Finds files by name almost instantly by searching a prebuilt index of the entire filesystem, instead of walking the directory tree live the way find does. That speed comes at the cost of freshness: the index (built by updatedb, usually run automatically once a day via cron) can be hours out of date, so a file created moments ago may simply not show up yet.",
      pt: 'Encontra arquivos pelo nome quase instantaneamente pesquisando um índice pré-construído do sistema de arquivos inteiro, em vez de percorrer a árvore de diretórios ao vivo como o find faz. Essa velocidade custa em atualidade: o índice (construído pelo updatedb, geralmente rodado automaticamente uma vez por dia via cron) pode estar horas desatualizado, então um arquivo criado momentos atrás pode simplesmente ainda não aparecer.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Ignores case differences when matching.',
        pt: 'Ignora diferença entre maiúsculas e minúsculas na busca.',
      },
    },
    argHint: {
      en: 'The name pattern to search for in the index.',
      pt: 'O padrão de nome a procurar no índice.',
    },
  },

  fdisk: {
    desc: {
      en: "An interactive partition table editor for a disk device, used to create, delete, and inspect partitions before a filesystem is ever put on them. It is a genuinely destructive tool run directly against a raw block device, changes are only actually written to disk when explicitly told to (usually with the 'w' command inside its interactive prompt), which is the one safety net standing between a typo and a wiped disk.",
      pt: 'Um editor interativo de tabela de partições para um dispositivo de disco, usado para criar, apagar e inspecionar partições antes de qualquer sistema de arquivos ser colocado nelas. É uma ferramenta genuinamente destrutiva que roda direto contra um dispositivo de bloco bruto, mudanças só são de fato escritas no disco quando explicitamente mandado (geralmente com o comando "w" dentro do prompt interativo), que é a única rede de segurança entre um erro de digitação e um disco apagado.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Lists the partition tables of all detected disks and exits, without entering interactive mode.',
        pt: 'Lista as tabelas de partição de todos os discos detectados e termina, sem entrar em modo interativo.',
      },
    },
    argHint: {
      en: 'The disk device to edit, such as /dev/sda.',
      pt: 'O dispositivo de disco a editar, como /dev/sda.',
    },
  },

  dd: {
    desc: {
      en: "Copies raw bytes from one place to another at a low level, bypassing the usual filesystem-aware tools, which is exactly what makes it able to write a bootable ISO straight onto a USB drive, clone an entire disk bit for bit, or wipe a device by copying zeros onto it. Its old-fashioned option=value syntax (if= for input file, of= for output file, bs= for block size) instead of normal flags is a frequent source of confusion, and its power to overwrite any device it is pointed at, including the wrong one, has earned it the half-joking nickname 'disk destroyer' among people who have mixed up if and of even once.",
      pt: 'Copia bytes brutos de um lugar para outro em baixo nível, contornando as ferramentas normais que entendem sistema de arquivos, o que é exatamente o que o torna capaz de escrever uma ISO inicializável direto em um pendrive, clonar um disco inteiro bit a bit, ou apagar um dispositivo copiando zeros nele. Sua sintaxe antiquada de opção=valor (if= para arquivo de entrada, of= para arquivo de saída, bs= para tamanho de bloco) em vez de flags normais é uma fonte frequente de confusão, e seu poder de sobrescrever qualquer dispositivo apontado, inclusive o errado, lhe rendeu o apelido meio de brincadeira "destruidor de disco" entre quem já trocou if com of ao menos uma vez.',
    },
    subcommands: {},
    flags: {
      'if': {
        en: 'Sets the input file or device to read from.',
        pt: 'Define o arquivo ou dispositivo de entrada de onde ler.',
      },
      'of': {
        en: 'Sets the output file or device to write to.',
        pt: 'Define o arquivo ou dispositivo de saída para onde escrever.',
      },
      'bs': {
        en: 'Sets the block size used for each read/write operation, affecting throughput.',
        pt: 'Define o tamanho de bloco usado em cada operação de leitura/escrita, afetando a taxa de transferência.',
      },
      'status': {
        en: "Controls how much progress information is shown; 'status=progress' shows a live transfer rate.",
        pt: 'Controla quanta informação de progresso é mostrada; "status=progress" mostra uma taxa de transferência ao vivo.',
      },
    },
  },

  kubectl: {
    desc: {
      en: "The command-line tool for controlling a Kubernetes cluster, talking to the cluster's API server to create, inspect, and manage the objects (pods, deployments, services) that make up a running application. Nearly every subcommand accepts a resource type and optionally a name, 'kubectl get pods' lists every pod, 'kubectl get pod my-pod' shows one, following a consistent noun-based pattern across the entire tool.",
      pt: 'A ferramenta de linha de comando para controlar um cluster Kubernetes, conversando com o servidor de API do cluster para criar, inspecionar e gerenciar os objetos (pods, deployments, services) que compõem uma aplicação em execução. Quase todo subcomando aceita um tipo de recurso e opcionalmente um nome, "kubectl get pods" lista todo pod, "kubectl get pod meu-pod" mostra um só, seguindo um padrão consistente baseado em substantivo por toda a ferramenta.',
    },
    subcommands: {
      get: {
        en: 'Lists one or more resources of a given type.',
        pt: 'Lista um ou mais recursos de um tipo dado.',
      },
      describe: {
        en: 'Shows detailed information about a specific resource, including recent events.',
        pt: 'Mostra informações detalhadas sobre um recurso específico, incluindo eventos recentes.',
      },
      apply: {
        en: 'Creates or updates resources to match the state described in a YAML or JSON file.',
        pt: 'Cria ou atualiza recursos para corresponder ao estado descrito em um arquivo YAML ou JSON.',
      },
      delete: {
        en: 'Removes a resource from the cluster.',
        pt: 'Remove um recurso do cluster.',
      },
      logs: {
        en: 'Shows the logs produced by a container inside a pod.',
        pt: 'Mostra os logs produzidos por um container dentro de um pod.',
      },
      exec: {
        en: 'Runs a command inside a running container, similar to docker exec.',
        pt: 'Executa um comando dentro de um container em execução, parecido com o docker exec.',
      },
    },
    flags: {
      '-n': {
        en: 'Targets a specific namespace, instead of the default one.',
        pt: 'Direciona para um namespace específico, em vez do padrão.',
      },
      '-f': {
        en: 'Specifies the YAML or JSON file describing the resources to apply.',
        pt: 'Especifica o arquivo YAML ou JSON descrevendo os recursos a aplicar.',
      },
      '-o': {
        en: "Sets the output format, such as 'json', 'yaml', or 'wide'.",
        pt: 'Define o formato de saída, como "json", "yaml" ou "wide".',
      },
    },
    valueFlags: {
      '-n': 'generic',
      '-f': 'generic',
      '-o': 'generic',
    },
  },

  host: {
    desc: {
      en: 'A simple DNS lookup tool, translating a domain name into its IP address (or the reverse) with brief, easy-to-read output, the quick everyday alternative to dig for when only the answer is needed, not the full detail of the DNS protocol exchange.',
      pt: 'Uma ferramenta simples de consulta DNS, traduzindo um nome de domínio para seu endereço IP (ou o inverso) com uma saída breve e fácil de ler, a alternativa rápida do dia a dia ao dig para quando só a resposta importa, não o detalhe completo da troca do protocolo DNS.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Queries a specific DNS record type, such as MX or TXT, instead of the default A record.',
        pt: 'Consulta um tipo de registro DNS específico, como MX ou TXT, em vez do registro A padrão.',
      },
    },
    valueFlags: {
      '-t': 'generic',
    },
    argHint: {
      en: 'The domain name (or IP address, for a reverse lookup) to query.',
      pt: 'O domínio (ou endereço IP, para busca reversa) a consultar.',
    },
  },

  traceroute: {
    desc: {
      en: "Maps the network path a packet takes to reach a destination, hop by hop, showing every router along the way and how long each one took to respond. It works by sending packets with a deliberately short time-to-live that expires one hop further each round, tricking each router in turn into sending back an error that reveals its address, which is why the output builds up one line per hop instead of arriving all at once like ping's does.",
      pt: 'Mapeia o caminho de rede que um pacote percorre até um destino, salto a salto, mostrando cada roteador pelo caminho e quanto tempo cada um levou para responder. Funciona enviando pacotes com um tempo de vida deliberadamente curto que expira um salto mais adiante a cada rodada, fazendo cada roteador por sua vez enviar de volta um erro que revela seu endereço, motivo pelo qual a saída se constrói uma linha por salto em vez de chegar tudo de uma vez como a do ping.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Shows numeric IP addresses instead of resolving hostnames, making the output print faster.',
        pt: 'Mostra endereços IP numéricos em vez de resolver nomes de host, deixando a saída mais rápida.',
      },
      '-m': {
        en: 'Sets the maximum number of hops to probe before giving up.',
        pt: 'Define o número máximo de saltos a sondar antes de desistir.',
      },
    },
    valueFlags: {
      '-m': 'generic',
    },
    argHint: {
      en: 'The host or IP address to trace the route to.',
      pt: 'O host ou endereço IP para o qual traçar a rota.',
    },
  },

  yes: {
    desc: {
      en: "Prints the same line, 'y' by default, forever, as fast as it can, until killed or piped into something that stops reading. It exists specifically to auto-answer commands that otherwise pause for interactive yes/no confirmation, 'yes | some-installer' feeds an endless stream of confirmations so a script never gets stuck waiting for a human to press a key.",
      pt: 'Imprime a mesma linha, "y" por padrão, para sempre, o mais rápido que conseguir, até ser morto ou encanado para algo que pare de ler. Existe especificamente para responder automaticamente a comandos que de outra forma pausariam pedindo confirmação interativa de sim/não, "yes | algum-instalador" alimenta um fluxo infinito de confirmações para que um script nunca fique preso esperando um humano apertar uma tecla.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The line to repeat instead of the default "y".',
      pt: 'A linha a repetir em vez do "y" padrão.',
    },
  },

  expr: {
    desc: {
      en: "Evaluates a simple expression, arithmetic, string comparison, or pattern matching, and prints the result, one of the few ways to do math directly in a POSIX shell that has no native arithmetic of its own the way bash's $(( )) does. It has mostly been superseded by that bash built-in syntax and by tools like awk or bc for anything beyond the simplest calculation, but still turns up in older or more portable scripts written to work under plain sh.",
      pt: 'Avalia uma expressão simples, aritmética, comparação de strings, ou correspondência de padrão, e imprime o resultado, uma das poucas formas de fazer matemática diretamente em um shell POSIX que não tem aritmética nativa própria como o $(( )) do bash tem. Foi em grande parte superado por essa sintaxe embutida do bash e por ferramentas como awk ou bc para qualquer coisa além do cálculo mais simples, mas ainda aparece em scripts mais antigos ou mais portáveis escritos para funcionar sob o sh puro.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The expression to evaluate, such as "3 + 4".',
      pt: 'A expressão a avaliar, como "3 + 4".',
    },
  },

  vim: {
    desc: {
      en: "A modal text editor descended from vi, where the keyboard itself switches between distinct modes, normal mode for moving around and issuing commands, insert mode for typing text, visual mode for selecting, rather than a single mode where every key just types a character. That design feels alien at first specifically because it front-loads a learning curve most editors don't have, but it lets an experienced user edit text without ever reaching for a mouse or arrow keys, entirely through short keyboard commands composed together. It is close to guaranteed to be installed (or vi at least) on any Unix-like system, which is exactly why so many people learn just enough to save and quit (':wq') and stop there.",
      pt: 'Um editor de texto modal descendente do vi, onde o próprio teclado alterna entre modos distintos, modo normal para se mover e emitir comandos, modo de inserção para digitar texto, modo visual para selecionar, em vez de um único modo onde toda tecla simplesmente digita um caractere. Esse design parece estranho a princípio justamente porque traz uma curva de aprendizado que a maioria dos editores não tem, mas permite que um usuário experiente edite texto sem nunca precisar do mouse ou das setas, inteiramente através de comandos curtos de teclado combinados entre si. É praticamente garantido estar instalado (ou pelo menos o vi) em qualquer sistema Unix, motivo exato pelo qual tanta gente aprende só o suficiente para salvar e sair (":wq") e para por aí.',
    },
    subcommands: {},
    flags: {
      '-R': {
        en: 'Opens the file in read-only mode, a safety net when only viewing is intended.',
        pt: 'Abre o arquivo em modo somente leitura, uma rede de segurança quando a intenção é só visualizar.',
      },
    },
    argHint: {
      en: 'The file to edit.',
      pt: 'O arquivo a editar.',
    },
  },

  nano: {
    desc: {
      en: "A simple, modeless text editor built specifically to be approachable: every key does what it looks like it should do, typing inserts text immediately, and the available commands are listed right at the bottom of the screen the whole time, so there is nothing to memorize up front. It trades vim's steep learning curve and keyboard-only efficiency for something a first-time terminal user can sit down and use in seconds, which is exactly why so many beginner-friendly tutorials default to it for quick config file edits.",
      pt: 'Um editor de texto simples e sem modos, feito especificamente para ser acessível: toda tecla faz o que parece que deveria fazer, digitar insere texto imediatamente, e os comandos disponíveis ficam listados bem no rodapé da tela o tempo todo, então não há nada para memorizar de antemão. Ele troca a curva de aprendizado íngreme e a eficiência exclusiva de teclado do vim por algo que quem usa terminal pela primeira vez consegue sentar e usar em segundos, motivo exato pelo qual tantos tutoriais voltados a iniciantes usam ele por padrão para edições rápidas de arquivo de configuração.',
    },
    subcommands: {},
    flags: {
      '-w': {
        en: 'Disables automatic line wrapping, useful when editing config files where long lines should stay on one line.',
        pt: 'Desativa a quebra automática de linha, útil ao editar arquivos de configuração onde linhas longas devem ficar em uma só.',
      },
    },
    argHint: {
      en: 'The file to edit.',
      pt: 'O arquivo a editar.',
    },
  },

  read: {
    desc: {
      en: "A shell builtin that reads a line of input and stores it into one or more variables, the standard way a shell script asks the person running it for input, or, combined with a while loop, processes a file one line at a time. 'read -p \"Continue? \" answer' prompts and stores the reply in $answer, and 'while read -r line; do ... done < file' is the idiomatic way to loop over a file's lines safely, the -r there stopping backslashes in the input from being interpreted as escape sequences.",
      pt: 'Um comando interno do shell que lê uma linha de entrada e a guarda em uma ou mais variáveis, a forma padrão de um script de shell pedir entrada para quem o está rodando, ou, combinado com um loop while, processar um arquivo linha por linha. "read -p \"Continuar? \" resposta" pergunta e guarda a resposta em $resposta, e "while read -r linha; do ... done < arquivo" é a forma idiomática de percorrer as linhas de um arquivo com segurança, o -r ali evitando que barras invertidas na entrada sejam interpretadas como sequências de escape.',
    },
    subcommands: {},
    flags: {
      '-p': {
        en: 'Shows a prompt before reading, on the same line as the input.',
        pt: 'Mostra um prompt antes de ler, na mesma linha da entrada.',
      },
      '-r': {
        en: "Reads the raw input literally, without treating a trailing backslash as a line-continuation character.",
        pt: 'Lê a entrada bruta literalmente, sem tratar uma barra invertida no final como caractere de continuação de linha.',
      },
      '-s': {
        en: 'Reads without echoing the typed characters to the screen, used for reading a password.',
        pt: 'Lê sem exibir os caracteres digitados na tela, usado para ler uma senha.',
      },
    },
    valueFlags: {
      '-p': 'generic',
    },
    argHint: {
      en: 'The name of the variable to store the input in.',
      pt: 'O nome da variável onde guardar a entrada.',
    },
  },

  exec: {
    desc: {
      en: "A shell builtin that replaces the current shell process with the given command entirely, instead of starting it as a child process, which means there is no shell left to return to once it runs, the new program takes over the same process ID and inherits its file descriptors directly. It shows up in two very different contexts: as the last line of an entrypoint script (so the main process becomes PID 1 instead of a leftover shell, which matters for how containers handle signals), and as 'exec > file' to redirect all of a script's own output from that point onward without needing to redirect every individual command.",
      pt: 'Um comando interno do shell que substitui o processo de shell atual pelo comando dado por completo, em vez de iniciá-lo como processo filho, o que significa que não sobra shell nenhum para voltar depois que ele roda, o programa novo assume o mesmo ID de processo e herda os descritores de arquivo diretamente. Aparece em dois contextos bem diferentes: como a última linha de um script de entrypoint (para que o processo principal vire o PID 1 em vez de um shell sobrando, o que importa para como containers lidam com sinais), e como "exec > arquivo" para redirecionar toda a saída do próprio script daquele ponto em diante sem precisar redirecionar cada comando individualmente.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The command that replaces the current shell process.',
      pt: 'O comando que substitui o processo de shell atual.',
    },
  },

  trap: {
    desc: {
      en: "A shell builtin that registers a command to run automatically when the shell receives a specific signal, most commonly used as 'trap cleanup EXIT' to guarantee a cleanup function runs no matter how a script ends, whether it finishes normally, hits an error, or is interrupted with Ctrl+C. Without a trap, a script killed partway through can leave a temporary file, a lock, or a background process behind; trap is the mechanism that makes 'always clean up, even on failure' actually reliable instead of hopeful.",
      pt: 'Um comando interno do shell que registra um comando para rodar automaticamente quando o shell recebe um sinal específico, mais comumente usado como "trap limpeza EXIT" para garantir que uma função de limpeza rode não importa como um script termine, seja finalizando normalmente, batendo em um erro, ou sendo interrompido com Ctrl+C. Sem um trap, um script morto no meio do caminho pode deixar para trás um arquivo temporário, um lock, ou um processo em segundo plano; o trap é o mecanismo que torna "sempre limpar, mesmo em falha" algo confiável de verdade, não só uma esperança.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The command to run, followed by the signal name (like EXIT or INT) that triggers it.',
      pt: 'O comando a rodar, seguido do nome do sinal (como EXIT ou INT) que o dispara.',
    },
  },

  jobs: {
    desc: {
      en: "A shell builtin that lists the background and stopped jobs started from the current shell session, each with a job number that bg, fg, and kill can reference with a percent sign, like %1, as a shorter alternative to a full PID.",
      pt: 'Um comando interno do shell que lista as tarefas em segundo plano e paradas iniciadas a partir da sessão de shell atual, cada uma com um número de tarefa que o bg, o fg e o kill conseguem referenciar com um sinal de porcentagem, como %1, como alternativa mais curta a um PID completo.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Also shows the PID of each job alongside its job number.',
        pt: 'Também mostra o PID de cada tarefa junto com o número da tarefa.',
      },
    },
  },

  bg: {
    desc: {
      en: "A shell builtin that resumes a stopped job (one paused with Ctrl+Z) and continues running it in the background, freeing up the terminal for other commands while that job keeps working.",
      pt: 'Um comando interno do shell que retoma uma tarefa parada (uma pausada com Ctrl+Z) e continua rodando ela em segundo plano, liberando o terminal para outros comandos enquanto essa tarefa continua trabalhando.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The job number to resume, like %1. Defaults to the most recently stopped job.',
      pt: 'O número da tarefa a retomar, como %1. Por padrão é a tarefa parada mais recentemente.',
    },
  },

  fg: {
    desc: {
      en: 'A shell builtin that brings a background or stopped job back into the foreground, reattaching it to the terminal so it can be interacted with (and interrupted with Ctrl+C) directly again.',
      pt: 'Um comando interno do shell que traz uma tarefa em segundo plano ou parada de volta para o primeiro plano, reconectando-a ao terminal para que possa ser interagida (e interrompida com Ctrl+C) diretamente de novo.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The job number to bring to the foreground, like %1. Defaults to the most recent job.',
      pt: 'O número da tarefa a trazer para o primeiro plano, como %1. Por padrão é a tarefa mais recente.',
    },
  },

  wait: {
    desc: {
      en: "A shell builtin that pauses the script until a background process (or all of them) finishes, the tool that turns 'start several things in parallel' into 'start several things in parallel and then actually wait for them before moving on', which matters enormously in scripts that launch multiple background jobs with & and need to know they all completed before continuing.",
      pt: 'Um comando interno do shell que pausa o script até um processo em segundo plano (ou todos eles) terminar, a ferramenta que transforma "iniciar várias coisas em paralelo" em "iniciar várias coisas em paralelo e de fato esperar por elas antes de seguir", o que importa enormemente em scripts que disparam vários jobs em segundo plano com & e precisam saber que todos terminaram antes de continuar.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The process ID (PID) to wait for. With no argument, waits for every background job.',
      pt: 'O ID de processo (PID) a esperar. Sem argumento, espera por todo job em segundo plano.',
    },
  },

  eval: {
    desc: {
      en: "A shell builtin that takes a string and runs it as if it had been typed directly as a command, a second pass of shell parsing applied to text that was itself built dynamically, such as a variable holding a whole command. It is powerful and genuinely useful for a handful of specific patterns, but running eval on anything derived from user input is a classic injection vulnerability, since the string is parsed with the full authority of the shell, whatever it contains, it runs.",
      pt: 'Um comando interno do shell que pega uma string e a roda como se tivesse sido digitada diretamente como comando, uma segunda passada de análise do shell aplicada a um texto que foi ele mesmo construído dinamicamente, como uma variável guardando um comando inteiro. É poderoso e genuinamente útil para um punhado de padrões específicos, mas rodar eval em qualquer coisa derivada de entrada do usuário é uma vulnerabilidade clássica de injeção, já que a string é interpretada com a autoridade total do shell, seja lá o que ela contiver, ela roda.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The string to parse and run as a command.',
      pt: 'A string a interpretar e rodar como comando.',
    },
  },

  ulimit: {
    desc: {
      en: "A shell builtin that shows or sets resource limits for the current shell session and everything launched from it, things like the maximum number of open files, the maximum stack size, or the maximum number of processes a user can run at once. It is the tool behind fixing the notorious 'too many open files' error a busy server process can hit, raising the file-descriptor limit with 'ulimit -n' being the standard first thing tried.",
      pt: 'Um comando interno do shell que mostra ou define limites de recurso para a sessão de shell atual e tudo que é iniciado a partir dela, coisas como o número máximo de arquivos abertos, o tamanho máximo de pilha, ou o número máximo de processos que um usuário pode rodar de uma vez. É a ferramenta por trás de corrigir o notório erro "too many open files" que um processo de servidor ocupado pode encontrar, aumentar o limite de descritores de arquivo com "ulimit -n" sendo a primeira coisa padrão a tentar.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Shows or sets the maximum number of open file descriptors.',
        pt: 'Mostra ou define o número máximo de descritores de arquivo abertos.',
      },
      '-a': {
        en: 'Shows every resource limit at once.',
        pt: 'Mostra todo limite de recurso de uma vez.',
      },
      '-u': {
        en: 'Shows or sets the maximum number of processes a user can run.',
        pt: 'Mostra ou define o número máximo de processos que um usuário pode rodar.',
      },
    },
    valueFlags: {
      '-n': 'generic',
      '-u': 'generic',
    },
  },

  tcpdump: {
    desc: {
      en: "Captures and displays network packets passing through an interface in real time, showing the raw traffic itself rather than a higher-level summary the way ss or netstat do. It is the tool reached for when the question is genuinely 'what is actually going over the wire', debugging a protocol handshake, confirming a request even left the machine, or watching for unexpected traffic, and its filter expression syntax (like 'tcpdump port 443') lets it narrow a busy interface down to just the packets that matter.",
      pt: 'Captura e exibe pacotes de rede passando por uma interface em tempo real, mostrando o tráfego bruto em si, não um resumo de alto nível como o ss ou o netstat fazem. É a ferramenta usada quando a pergunta é genuinamente "o que está realmente passando pelo cabo", depurando um handshake de protocolo, confirmando que uma requisição de fato saiu da máquina, ou observando tráfego inesperado, e sua sintaxe de expressão de filtro (como "tcpdump port 443") permite reduzir uma interface ocupada só aos pacotes que importam.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Specifies which network interface to capture on.',
        pt: 'Especifica em qual interface de rede capturar.',
      },
      '-n': {
        en: 'Shows numeric addresses and ports instead of resolving names, and prints faster as a result.',
        pt: 'Mostra endereços e portas numéricos em vez de resolver nomes, e imprime mais rápido como resultado.',
      },
      '-w': {
        en: 'Writes the captured packets to a file instead of printing them, for later analysis with tools like Wireshark.',
        pt: 'Escreve os pacotes capturados em um arquivo em vez de imprimi-los, para análise posterior com ferramentas como o Wireshark.',
      },
    },
    valueFlags: {
      '-i': 'generic',
      '-w': 'generic',
    },
  },

  arp: {
    desc: {
      en: "Shows or edits the ARP table, the local cache mapping neighboring IP addresses on the same network segment to their physical (MAC) hardware addresses. Every device needs this mapping to actually deliver a packet at the link layer, and a wrong or poisoned ARP entry is a classic way local network traffic gets silently redirected, which is exactly why arp -a (listing the current table) is a genuinely useful step in diagnosing strange local-network connectivity problems.",
      pt: 'Mostra ou edita a tabela ARP, o cache local que mapeia endereços IP vizinhos no mesmo segmento de rede para seus endereços físicos (MAC) de hardware. Todo dispositivo precisa desse mapeamento para de fato entregar um pacote na camada de enlace, e uma entrada ARP errada ou envenenada é uma forma clássica de tráfego de rede local ser redirecionado silenciosamente, motivo exato pelo qual arp -a (listando a tabela atual) é um passo genuinamente útil ao diagnosticar problemas estranhos de conectividade na rede local.',
    },
    subcommands: {},
    flags: {
      '-a': {
        en: 'Lists the current ARP table entries.',
        pt: 'Lista as entradas atuais da tabela ARP.',
      },
      '-d': {
        en: 'Deletes an entry from the ARP table.',
        pt: 'Apaga uma entrada da tabela ARP.',
      },
    },
  },

  route: {
    desc: {
      en: "Shows or edits the kernel's IP routing table, deciding which network interface and gateway a packet goes through to reach a given destination. It has been deprecated for years in favor of 'ip route', part of the same iproute2 suite that replaced ifconfig, but the name and its short output format are still recognized on sight by anyone who learned networking before that transition.",
      pt: 'Mostra ou edita a tabela de roteamento IP do kernel, decidindo por qual interface de rede e gateway um pacote passa para chegar a um destino dado. Está obsoleto há anos em favor do "ip route", parte do mesmo conjunto iproute2 que substituiu o ifconfig, mas o nome e seu formato de saída curto ainda são reconhecidos de cara por quem aprendeu redes antes dessa transição.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Shows numeric addresses instead of resolving hostnames.',
        pt: 'Mostra endereços numéricos em vez de resolver nomes de host.',
      },
    },
  },

  dmesg: {
    desc: {
      en: "Prints the kernel's own message buffer, the log of low-level events the kernel itself reports: hardware being detected, drivers loading, a USB device being plugged in, and, critically, why the kernel just killed a process for using too much memory (the out-of-memory killer logs its decisions here). It is usually the very first place to look when something at the hardware or driver level misbehaves, since application-level logs never see events that happen below them.",
      pt: 'Imprime o próprio buffer de mensagens do kernel, o log de eventos de baixo nível que o kernel relata: hardware sendo detectado, drivers carregando, um dispositivo USB sendo plugado, e, criticamente, por que o kernel acabou de matar um processo por usar memória demais (o out-of-memory killer registra suas decisões aqui). Costuma ser o primeiríssimo lugar a olhar quando algo em nível de hardware ou driver se comporta mal, já que logs de nível de aplicação nunca veem eventos que acontecem abaixo deles.',
    },
    subcommands: {},
    flags: {
      '-T': {
        en: 'Shows human-readable timestamps instead of raw seconds since boot.',
        pt: 'Mostra datas legíveis em vez de segundos brutos desde o boot.',
      },
      '-w': {
        en: 'Follows the log in real time, like tail -f.',
        pt: 'Acompanha o log em tempo real, como o tail -f.',
      },
    },
  },

  lscpu: {
    desc: {
      en: "Prints a summary of the CPU architecture: how many cores and threads are available, the model name, clock speed, cache sizes, and virtualization support, all gathered from /proc/cpuinfo and sysfs but organized into one readable report instead of a long raw dump.",
      pt: 'Imprime um resumo da arquitetura da CPU: quantos núcleos e threads estão disponíveis, o nome do modelo, velocidade de clock, tamanhos de cache, e suporte a virtualização, tudo reunido de /proc/cpuinfo e do sysfs mas organizado em um relatório legível em vez de um despejo bruto longo.',
    },
    subcommands: {},
    flags: {},
  },

  lspci: {
    desc: {
      en: 'Lists every device connected to the PCI bus, graphics cards, network adapters, storage controllers, giving each a short identifying line. It is a common early step in hardware troubleshooting, confirming a device is even detected by the system at all before worrying about whether a driver for it is installed and working.',
      pt: 'Lista todo dispositivo conectado ao barramento PCI, placas de vídeo, adaptadores de rede, controladores de armazenamento, dando a cada um uma linha curta de identificação. É um passo inicial comum na resolução de problemas de hardware, confirmando que um dispositivo é sequer detectado pelo sistema antes de se preocupar se um driver para ele está instalado e funcionando.',
    },
    subcommands: {},
    flags: {
      '-v': {
        en: 'Shows more detailed information about each device (verbose mode).',
        pt: 'Mostra informações mais detalhadas sobre cada dispositivo (modo verboso).',
      },
    },
  },

  lsusb: {
    desc: {
      en: "Lists every device currently connected to a USB bus, the USB counterpart to lspci, useful for confirming a plugged-in device (a drive, a keyboard, a webcam) is actually being seen by the system at the hardware level before troubleshooting anything further up the stack.",
      pt: 'Lista todo dispositivo atualmente conectado a um barramento USB, o equivalente USB do lspci, útil para confirmar que um dispositivo plugado (um drive, um teclado, uma webcam) está de fato sendo visto pelo sistema em nível de hardware antes de investigar qualquer coisa mais acima na pilha.',
    },
    subcommands: {},
    flags: {
      '-v': {
        en: 'Shows more detailed information about each device (verbose mode).',
        pt: 'Mostra informações mais detalhadas sobre cada dispositivo (modo verboso).',
      },
    },
  },

  arch: {
    desc: {
      en: "Prints the machine's hardware architecture (x86_64, aarch64, and so on), a shorter, more focused equivalent to 'uname -m' when that one specific fact is all that is needed.",
      pt: 'Imprime a arquitetura de hardware da máquina (x86_64, aarch64, e assim por diante), um equivalente mais curto e focado ao "uname -m" quando esse único fato específico é tudo que se precisa.',
    },
    subcommands: {},
    flags: {},
  },

  nproc: {
    desc: {
      en: "Prints the number of processing units (CPU cores/threads) available to the current process, commonly used inside build scripts to automatically size parallelism, 'make -j$(nproc)' runs as many parallel build jobs as the machine has cores, without hardcoding a number that would be wrong on a different machine.",
      pt: 'Imprime o número de unidades de processamento (núcleos/threads de CPU) disponíveis para o processo atual, comumente usado dentro de scripts de build para dimensionar paralelismo automaticamente, "make -j$(nproc)" roda tantos jobs de build paralelos quanto a máquina tiver núcleos, sem fixar um número que estaria errado em outra máquina.',
    },
    subcommands: {},
    flags: {},
  },

  vmstat: {
    desc: {
      en: "Reports a snapshot (or, given an interval, a repeating series of snapshots) of system-wide virtual memory, process, CPU, and I/O activity in one compact table, useful for spotting whether a slow system is actually bottlenecked on CPU, memory (heavy swapping), or disk I/O at a glance, before diving into a more specialized tool for whichever one turns out to be the culprit.",
      pt: 'Relata um retrato (ou, dado um intervalo, uma série repetida de retratos) da atividade de memória virtual, processos, CPU e I/O do sistema inteiro em uma tabela compacta, útil para identificar de relance se um sistema lento está de fato gargalado em CPU, memória (muito swap) ou I/O de disco, antes de mergulhar em uma ferramenta mais especializada para o que quer que se revele o culpado.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The refresh interval in seconds, for a repeating series of reports.',
      pt: 'O intervalo de atualização em segundos, para uma série repetida de relatórios.',
    },
  },

  w: {
    desc: {
      en: "Shows who is currently logged into the system and what each of them is doing, combining the output of who (logged-in users) with the output of uptime (system load) at the top, one glance answering both 'who is on this machine' and 'how loaded is it' at once.",
      pt: 'Mostra quem está logado no sistema no momento e o que cada um está fazendo, combinando a saída do who (usuários logados) com a saída do uptime (carga do sistema) no topo, um único olhar respondendo tanto "quem está nesta máquina" quanto "quão carregada ela está" ao mesmo tempo.',
    },
    subcommands: {},
    flags: {},
  },

  who: {
    desc: {
      en: 'Shows who is currently logged into the system, one line per session, with the terminal and login time, a narrower and simpler report than w, without the per-user activity or system load detail.',
      pt: 'Mostra quem está logado no sistema no momento, uma linha por sessão, com o terminal e a hora de login, um relatório mais estreito e simples que o w, sem o detalhe de atividade por usuário ou carga do sistema.',
    },
    subcommands: {},
    flags: {},
  },

  last: {
    desc: {
      en: 'Shows a history of recent logins and system reboots, read from a log file rather than reflecting the current moment the way who and w do, useful for answering "who logged in yesterday" or "when did this machine last reboot" after the fact.',
      pt: 'Mostra um histórico de logins recentes e reinicializações do sistema, lido de um arquivo de log em vez de refletir o momento atual como o who e o w fazem, útil para responder "quem logou ontem" ou "quando essa máquina reiniciou pela última vez" depois do fato.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Limits the output to the last N entries.',
        pt: 'Limita a saída às últimas N entradas.',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
  },

  strace: {
    desc: {
      en: "Traces every system call a program makes as it runs, printing each one along with its arguments and return value, the definitive way to see exactly what a program is actually doing at the level of the kernel: which files it tries to open (and whether that fails), which network connections it attempts, which permissions checks it fails. When a program errors out with a vague message and no further explanation, strace is the tool that shows the precise syscall that actually failed and why, at the cost of a real slowdown while it is running.",
      pt: 'Rastreia toda chamada de sistema que um programa faz enquanto roda, imprimindo cada uma junto com seus argumentos e valor de retorno, a forma definitiva de ver exatamente o que um programa está de fato fazendo no nível do kernel: quais arquivos ele tenta abrir (e se isso falha), quais conexões de rede ele tenta, quais checagens de permissão ele falha. Quando um programa erra com uma mensagem vaga e sem mais explicação, o strace é a ferramenta que mostra a chamada de sistema exata que de fato falhou e por quê, ao custo de uma lentidão real enquanto está rodando.',
    },
    subcommands: {},
    flags: {
      '-p': {
        en: 'Attaches to an already-running process by PID, instead of starting a new one.',
        pt: 'Se conecta a um processo já em execução pelo PID, em vez de iniciar um novo.',
      },
      '-f': {
        en: 'Also traces any child processes the program creates.',
        pt: 'Também rastreia qualquer processo filho que o programa criar.',
      },
      '-e': {
        en: 'Filters the trace to only specific system calls, such as trace=open.',
        pt: 'Filtra o rastreio só para chamadas de sistema específicas, como trace=open.',
      },
    },
    valueFlags: {
      '-p': 'generic',
      '-e': 'generic',
    },
    argHint: {
      en: 'The command to run and trace.',
      pt: 'O comando a rodar e rastrear.',
    },
  },

  pgrep: {
    desc: {
      en: "Searches for processes by name (or other attributes) and prints their PIDs, the read-only counterpart to pkill: where pkill matches a pattern and signals every process found, pgrep matches the same way but just reports the PIDs, useful for checking whether something is running or for capturing a PID into a variable before deciding what to do with it.",
      pt: 'Procura processos pelo nome (ou outros atributos) e imprime seus PIDs, o par somente-leitura do pkill: onde o pkill combina um padrão e sinaliza todo processo encontrado, o pgrep combina da mesma forma mas só relata os PIDs, útil para checar se algo está rodando ou para capturar um PID em uma variável antes de decidir o que fazer com ele.',
    },
    subcommands: {},
    flags: {
      '-f': {
        en: 'Matches against the full command line, not just the process name.',
        pt: 'Compara com a linha de comando completa, não só o nome do processo.',
      },
      '-u': {
        en: 'Only matches processes owned by a specific user.',
        pt: 'Só combina com processos pertencentes a um usuário específico.',
      },
      '-l': {
        en: 'Shows the process name alongside each matching PID.',
        pt: 'Mostra o nome do processo junto com cada PID correspondente.',
      },
    },
    valueFlags: {
      '-u': 'generic',
    },
    argHint: {
      en: 'The name pattern of the process(es) to match.',
      pt: 'O padrão de nome do(s) processo(s) a combinar.',
    },
  },

  pstree: {
    desc: {
      en: "Shows running processes as a visual tree instead of the flat list ps produces, making the parent-child relationship between processes immediately obvious, which process spawned which. It is a fast way to understand how a complex piece of software is actually structured at runtime, like seeing that a browser's dozens of processes all descend from one parent, or spotting an orphaned process that got reparented to init.",
      pt: 'Mostra os processos em execução como uma árvore visual em vez da lista plana que o ps produz, tornando a relação pai-filho entre processos imediatamente óbvia, qual processo criou qual. É uma forma rápida de entender como um software complexo está de fato estruturado em tempo de execução, como ver que as dezenas de processos de um navegador descendem todos de um único pai, ou notar um processo órfão que foi reparentado para o init.',
    },
    subcommands: {},
    flags: {
      '-p': {
        en: 'Shows the PID of each process alongside its name.',
        pt: 'Mostra o PID de cada processo junto com o nome dele.',
      },
    },
  },

  fuser: {
    desc: {
      en: "Identifies which processes are using a specific file, folder, or network port, the direct way to answer 'what is currently holding this open' before deleting a file that refuses to free disk space or trying to bind a port that says it's already in use.",
      pt: 'Identifica quais processos estão usando um arquivo, pasta ou porta de rede específicos, a forma direta de responder "o que está segurando isso aberto agora" antes de apagar um arquivo que se recusa a liberar espaço em disco ou tentar usar uma porta que diz já estar em uso.',
    },
    subcommands: {},
    flags: {
      '-k': {
        en: 'Kills every process found using the file or port, instead of just listing them.',
        pt: 'Mata todo processo encontrado usando o arquivo ou porta, em vez de só listá-los.',
      },
      '-v': {
        en: 'Shows detailed information about each matching process (verbose mode).',
        pt: 'Mostra informações detalhadas sobre cada processo correspondente (modo verboso).',
      },
    },
    argHint: {
      en: 'The file, folder, or port to check.',
      pt: 'O arquivo, pasta ou porta a checar.',
    },
  },

  mktemp: {
    desc: {
      en: "Creates a new, empty file (or, with -d, a directory) with a guaranteed-unique, randomly generated name inside a temporary location, and prints that name so a script can capture it. Using mktemp instead of hardcoding a temp file name like /tmp/myscript.tmp avoids a real security and correctness problem: a predictable temp file name can be created in advance by another process (or attacker) to intercept or corrupt what the script writes to it.",
      pt: 'Cria um arquivo novo e vazio (ou, com -d, um diretório) com um nome garantidamente único e gerado aleatoriamente dentro de um local temporário, e imprime esse nome para que um script possa capturá-lo. Usar mktemp em vez de fixar um nome de arquivo temporário como /tmp/meuscript.tmp evita um problema real de segurança e corretude: um nome de arquivo temporário previsível pode ser criado com antecedência por outro processo (ou atacante) para interceptar ou corromper o que o script escreve nele.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Creates a temporary directory instead of a file.',
        pt: 'Cria um diretório temporário em vez de um arquivo.',
      },
    },
  },

  truncate: {
    desc: {
      en: "Shrinks or extends a file to an exact specified size, without touching whatever content is left. Growing a file this way creates a sparse file padded with zero bytes that don't actually occupy disk space yet, which makes 'truncate -s 0 file' a fast way to empty a log file in place (unlike deleting and recreating it, this keeps the same inode, so a process already holding the file open keeps writing to the same, now-empty, file).",
      pt: 'Encolhe ou estende um arquivo para um tamanho exato especificado, sem tocar no conteúdo que sobra. Aumentar um arquivo dessa forma cria um arquivo esparso preenchido com bytes zero que ainda não ocupam espaço em disco de fato, o que faz de "truncate -s 0 arquivo" uma forma rápida de esvaziar um arquivo de log no lugar (diferente de apagar e recriar, isso mantém o mesmo inode, então um processo que já tem o arquivo aberto continua escrevendo no mesmo arquivo, agora vazio).',
    },
    subcommands: {},
    flags: {
      '-s': {
        en: 'Sets the target size for the file, such as 0 to empty it or 1G for one gigabyte.',
        pt: 'Define o tamanho alvo do arquivo, como 0 para esvaziá-lo ou 1G para um gigabyte.',
      },
    },
    valueFlags: {
      '-s': 'generic',
    },
    argHint: {
      en: 'The file to resize.',
      pt: 'O arquivo a redimensionar.',
    },
  },

  cmp: {
    desc: {
      en: "Compares two files byte by byte and reports the position of the first difference found, then stops, unlike diff, which shows every difference in a line-oriented view. It is the right tool specifically for binary files, where a line-based diff makes no sense, and for a fast yes-or-no answer to 'are these two files identical' without caring what the difference actually is.",
      pt: 'Compara dois arquivos byte a byte e relata a posição da primeira diferença encontrada, e então para, diferente do diff, que mostra toda diferença em uma visão orientada a linha. É a ferramenta certa especificamente para arquivos binários, onde um diff baseado em linha não faz sentido, e para uma resposta rápida de sim-ou-não sobre "esses dois arquivos são idênticos" sem se importar com qual é de fato a diferença.',
    },
    subcommands: {},
    flags: {
      '-s': {
        en: 'Suppresses all output, only setting the exit code to indicate whether the files matched.',
        pt: 'Suprime toda saída, só definindo o código de saída para indicar se os arquivos combinaram.',
      },
    },
    argHint: {
      en: 'One of the two files being compared byte by byte.',
      pt: 'Um dos dois arquivos sendo comparados byte a byte.',
    },
  },

  tac: {
    desc: {
      en: "Prints a file with its lines in reverse order, last line first, exactly cat spelled backwards and doing exactly the opposite: where cat concatenates files in order, tac reverses their line order. It shows up when the most recent entries in an append-only log (where new lines get added at the end) need to be read newest-first.",
      pt: 'Imprime um arquivo com suas linhas em ordem reversa, última linha primeiro, exatamente cat escrito ao contrário e fazendo exatamente o oposto: onde o cat concatena arquivos em ordem, o tac inverte a ordem das linhas deles. Aparece quando as entradas mais recentes de um log só-de-anexar (onde linhas novas são adicionadas no final) precisam ser lidas da mais nova para a mais antiga.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file to print in reverse line order.',
      pt: 'O arquivo a imprimir em ordem reversa de linhas.',
    },
  },

  shuf: {
    desc: {
      en: "Randomly shuffles the lines of its input and prints them in that new random order, the command-line way to pick a random sample or randomize a list, 'shuf -n 1 file' picks one random line, which is a common idiom for randomly selecting an item from a list inside a script.",
      pt: 'Embaralha aleatoriamente as linhas da entrada e as imprime nessa nova ordem aleatória, a forma de linha de comando de escolher uma amostra aleatória ou aleatorizar uma lista, "shuf -n 1 arquivo" escolhe uma linha aleatória, um idioma comum para selecionar aleatoriamente um item de uma lista dentro de um script.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Limits the output to N lines, instead of shuffling and printing everything.',
        pt: 'Limita a saída a N linhas, em vez de embaralhar e imprimir tudo.',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The file whose lines will be shuffled.',
      pt: 'O arquivo cujas linhas serão embaralhadas.',
    },
  },

  fold: {
    desc: {
      en: 'Wraps each line of input so that no line is longer than a given width, breaking long lines at that column regardless of word boundaries, a blunt but simple tool for making wide text fit a narrower terminal or fixed-width output format.',
      pt: 'Quebra cada linha da entrada para que nenhuma linha ultrapasse uma largura dada, cortando linhas longas naquela coluna independente de limite de palavra, uma ferramenta simples e direta para fazer texto largo caber em um terminal mais estreito ou formato de saída de largura fixa.',
    },
    subcommands: {},
    flags: {
      '-w': {
        en: 'Sets the maximum line width (80 characters by default).',
        pt: 'Define a largura máxima de linha (80 caracteres por padrão).',
      },
      '-s': {
        en: 'Breaks at the last whitespace before the width limit instead of mid-word.',
        pt: 'Quebra no último espaço antes do limite de largura, em vez de no meio da palavra.',
      },
    },
    valueFlags: {
      '-w': 'generic',
    },
  },

  rev: {
    desc: {
      en: "Reverses the characters of each line, left to right becomes right to left, a small, oddly specific tool that mostly shows up combined with cut in clever one-liners to extract something counted from the end of a line rather than the start, since cut only understands 'from the beginning'.",
      pt: 'Inverte os caracteres de cada linha, esquerda para direita vira direita para esquerda, uma ferramenta pequena e meio específica que geralmente aparece combinada com o cut em one-liners espertos para extrair algo contado a partir do final de uma linha, não do início, já que o cut só entende "a partir do começo".',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file whose lines will be character-reversed.',
      pt: 'O arquivo cujas linhas terão os caracteres invertidos.',
    },
  },

  split: {
    desc: {
      en: "Breaks a single large file into multiple smaller pieces, by size or by number of lines, each with a generated sequential suffix, and cat is the tool that reverses the process (concatenating the pieces back together in order restores the original). It commonly shows up when a file is too big to email, upload, or fit on removable media as one piece.",
      pt: 'Divide um único arquivo grande em vários pedaços menores, por tamanho ou por número de linhas, cada um com um sufixo sequencial gerado, e o cat é a ferramenta que reverte o processo (concatenar os pedaços de volta em ordem restaura o original). Costuma aparecer quando um arquivo é grande demais para mandar por email, enviar, ou caber em mídia removível de uma vez só.',
    },
    subcommands: {},
    flags: {
      '-b': {
        en: 'Splits by byte size per piece, such as 100M for 100 megabytes each.',
        pt: 'Divide por tamanho em bytes por pedaço, como 100M para 100 megabytes cada.',
      },
      '-l': {
        en: 'Splits by number of lines per piece, instead of by size.',
        pt: 'Divide por número de linhas por pedaço, em vez de por tamanho.',
      },
    },
    valueFlags: {
      '-b': 'generic',
      '-l': 'generic',
    },
    argHint: {
      en: 'The file to split into pieces.',
      pt: 'O arquivo a dividir em pedaços.',
    },
  },

  openssl: {
    desc: {
      en: "A toolkit for cryptographic operations and TLS/SSL, covering a huge range of tasks under one command: generating a private key, creating or inspecting a certificate, hashing data, encrypting a file, or opening a raw connection to a server to inspect its TLS handshake directly ('openssl s_client'). Its subcommands each behave almost like separate programs with their own flags, which is why the same 'openssl' name covers such a wide range of otherwise unrelated-looking invocations.",
      pt: 'Um conjunto de ferramentas para operações criptográficas e TLS/SSL, cobrindo uma gama enorme de tarefas sob um único comando: gerar uma chave privada, criar ou inspecionar um certificado, calcular hash de dados, criptografar um arquivo, ou abrir uma conexão bruta com um servidor para inspecionar seu handshake TLS diretamente ("openssl s_client"). Cada subcomando se comporta quase como um programa separado com suas próprias flags, motivo pelo qual o mesmo nome "openssl" cobre uma gama tão ampla de invocações que parecem, à primeira vista, não relacionadas.',
    },
    subcommands: {
      genrsa: {
        en: 'Generates a new RSA private key.',
        pt: 'Gera uma nova chave privada RSA.',
      },
      req: {
        en: 'Creates or processes a certificate signing request (CSR).',
        pt: 'Cria ou processa uma solicitação de assinatura de certificado (CSR).',
      },
      x509: {
        en: 'Displays or manipulates an X.509 certificate.',
        pt: 'Exibe ou manipula um certificado X.509.',
      },
      's_client': {
        en: "Opens a raw connection to a remote server and shows its TLS/SSL handshake and certificate details.",
        pt: 'Abre uma conexão bruta com um servidor remoto e mostra o handshake TLS/SSL e os detalhes do certificado dele.',
      },
      enc: {
        en: 'Encrypts or decrypts data using a chosen cipher.',
        pt: 'Criptografa ou descriptografa dados usando uma cifra escolhida.',
      },
    },
    flags: {},
  },

  gpg: {
    desc: {
      en: "The GNU Privacy Guard, an implementation of the OpenPGP standard for public-key encryption and digital signatures. It is what verifies that a downloaded file's detached .asc signature was really produced by the key it claims, and what many package repositories and Git commit signing rely on under the hood, key management (generating, importing, trusting a key) is usually the part people find least intuitive about it.",
      pt: 'O GNU Privacy Guard, uma implementação do padrão OpenPGP para criptografia de chave pública e assinaturas digitais. É o que verifica se a assinatura .asc destacada de um arquivo baixado foi realmente produzida pela chave que ela alega ser, e o que muitos repositórios de pacote e a assinatura de commit do Git usam por baixo, gerenciamento de chave (gerar, importar, confiar em uma chave) costuma ser a parte que as pessoas acham menos intuitiva.',
    },
    subcommands: {
      '--gen-key': {
        en: 'Generates a new key pair interactively.',
        pt: 'Gera um novo par de chaves interativamente.',
      },
      '--import': {
        en: "Imports someone else's public key from a file, so their signatures can be verified.",
        pt: 'Importa a chave pública de outra pessoa a partir de um arquivo, para que as assinaturas dela possam ser verificadas.',
      },
      '--verify': {
        en: 'Verifies a detached signature against the file it claims to sign.',
        pt: 'Verifica uma assinatura destacada contra o arquivo que ela alega assinar.',
      },
      '--encrypt': {
        en: "Encrypts a file for a specific recipient's public key.",
        pt: 'Criptografa um arquivo para a chave pública de um destinatário específico.',
      },
    },
    flags: {},
  },

  'ssh-copy-id': {
    desc: {
      en: "Copies a local public SSH key to a remote server's authorized_keys file, the one-command way to set up password-less login instead of manually catting the key and appending it over an existing SSH session. It handles creating the remote .ssh directory with the right permissions too, a detail that trips people up when doing it by hand, since SSH silently refuses to trust a key file if its permissions are too open.",
      pt: 'Copia uma chave SSH pública local para o arquivo authorized_keys de um servidor remoto, a forma de um comando só de configurar login sem senha, em vez de fazer cat manualmente na chave e anexá-la via uma sessão SSH já existente. Também cuida de criar o diretório .ssh remoto com as permissões certas, um detalhe que costuma pegar quem faz isso à mão, já que o SSH se recusa silenciosamente a confiar em um arquivo de chave se as permissões dele estiverem abertas demais.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Specifies which public key file to copy, instead of the default.',
        pt: 'Especifica qual arquivo de chave pública copiar, em vez do padrão.',
      },
    },
    valueFlags: {
      '-i': 'generic',
    },
    argHint: {
      en: 'The remote host to copy the key to, as user@host.',
      pt: 'O host remoto para o qual copiar a chave, como usuario@host.',
    },
  },

  'ssh-agent': {
    desc: {
      en: "Runs a background process that holds decrypted SSH private keys in memory for the duration of a session, so a passphrase-protected key only needs to be unlocked once (with ssh-add) instead of on every single SSH connection. It is what makes a passphrase-protected key practical to use day to day instead of a genuine inconvenience typed dozens of times a day.",
      pt: 'Roda um processo em segundo plano que guarda chaves SSH privadas descriptografadas em memória pela duração de uma sessão, para que uma chave protegida por frase-senha só precise ser desbloqueada uma vez (com ssh-add) em vez de em toda conexão SSH individual. É o que torna uma chave protegida por frase-senha prática de usar no dia a dia, em vez de um incômodo genuíno digitado dezenas de vezes por dia.',
    },
    subcommands: {},
    flags: {},
  },

  mkfs: {
    desc: {
      en: "Creates a new filesystem on a disk partition or device, formatting it with a specific filesystem type (ext4, xfs, and so on) so the kernel can actually mount and use it, exactly the step mkswap performs specifically for swap space, but mkfs is the general-purpose version for real, mountable filesystems. It is a destructive operation, running it on a partition wipes whatever data was already there.",
      pt: 'Cria um novo sistema de arquivos em uma partição de disco ou dispositivo, formatando-o com um tipo de sistema de arquivos específico (ext4, xfs, e assim por diante) para que o kernel consiga de fato montá-lo e usá-lo, exatamente o passo que o mkswap realiza especificamente para área de swap, mas o mkfs é a versão de propósito geral para sistemas de arquivos reais e montáveis. É uma operação destrutiva, rodá-la em uma partição apaga o que quer que já estivesse lá.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Sets the filesystem type to create, such as ext4 or xfs.',
        pt: 'Define o tipo de sistema de arquivos a criar, como ext4 ou xfs.',
      },
    },
    valueFlags: {
      '-t': 'generic',
    },
    argHint: {
      en: 'The partition or device to format.',
      pt: 'A partição ou dispositivo a formatar.',
    },
  },

  at: {
    desc: {
      en: "Schedules a command to run once at a specific future time, the one-shot counterpart to cron's recurring schedule. 'echo \"backup.sh\" | at 2am tomorrow' queues that command to run at the given time without needing an editor or a persistent schedule entry, disappearing from the queue automatically once it has run.",
      pt: 'Agenda um comando para rodar uma única vez em um momento futuro específico, o par de execução única do agendamento recorrente do cron. "echo \"backup.sh\" | at 2am tomorrow" enfileira esse comando para rodar no horário dado sem precisar de editor nem de uma entrada de agendamento persistente, desaparecendo da fila automaticamente depois de rodar.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The time to run the job, such as "2am tomorrow" or "now + 1 hour".',
      pt: 'O horário para rodar a tarefa, como "2am tomorrow" ou "now + 1 hour".',
    },
  },

  newgrp: {
    desc: {
      en: "Switches the current session's active primary group to a different one the user belongs to, without logging out and back in, useful right after being added to a new group when that membership hasn't taken effect in the current session yet.",
      pt: 'Troca o grupo primário ativo da sessão atual para outro ao qual o usuário pertence, sem precisar deslogar e logar de novo, útil logo depois de ser adicionado a um grupo novo quando essa associação ainda não entrou em vigor na sessão atual.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The group to switch to.',
      pt: 'O grupo para o qual trocar.',
    },
  },

  sha1sum: {
    desc: {
      en: "Computes the SHA-1 cryptographic hash of a file. Like MD5, SHA-1 is now considered cryptographically broken for security purposes (practical collision attacks have been demonstrated), so it persists mainly for compatibility with older systems and Git's original object-hashing scheme, not as a recommendation; sha256sum is the modern choice whenever the hash actually needs to resist deliberate tampering.",
      pt: 'Calcula o hash criptográfico SHA-1 de um arquivo. Assim como o MD5, o SHA-1 hoje é considerado criptograficamente quebrado para fins de segurança (ataques práticos de colisão já foram demonstrados), então ele persiste principalmente por compatibilidade com sistemas mais antigos e o esquema original de hash de objeto do Git, não como recomendação; o sha256sum é a escolha moderna sempre que o hash realmente precisa resistir a adulteração deliberada.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Checks a file against a list of previously computed hashes, instead of computing a new one.',
        pt: 'Verifica um arquivo contra uma lista de hashes previamente calculados, em vez de calcular um novo.',
      },
    },
    argHint: {
      en: 'The file to hash.',
      pt: 'O arquivo a calcular o hash.',
    },
  },

  cksum: {
    desc: {
      en: "Computes a CRC checksum and byte count for a file, a much older and weaker integrity check than md5sum or sha256sum, designed to catch accidental corruption (a bad transfer, a flipped bit) rather than deliberate tampering, which it offers essentially no protection against.",
      pt: 'Calcula um checksum CRC e a contagem de bytes de um arquivo, uma checagem de integridade bem mais antiga e fraca que md5sum ou sha256sum, feita para pegar corrupção acidental (uma transferência ruim, um bit invertido), não adulteração deliberada, contra a qual oferece essencialmente nenhuma proteção.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file to checksum.',
      pt: 'O arquivo a calcular o checksum.',
    },
  },

  uuidgen: {
    desc: {
      en: "Generates a random UUID (universally unique identifier), a 128-bit value formatted as a string of hex digits that is, for all practical purposes, guaranteed unique across every machine that will ever generate one, without any central coordination needed. It shows up constantly as a quick way to mint a unique ID for a database row, a request trace, or a temporary resource name.",
      pt: 'Gera um UUID aleatório (identificador único universal), um valor de 128 bits formatado como uma string de dígitos hexadecimais que é, para todos os efeitos práticos, garantido único em toda máquina que algum dia gerar um, sem coordenação central nenhuma necessária. Aparece constantemente como uma forma rápida de cunhar um ID único para uma linha de banco de dados, um rastro de requisição, ou um nome de recurso temporário.',
    },
    subcommands: {},
    flags: {},
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
      en: "The modern package manager on Fedora and current RHEL/CentOS releases, the direct successor to yum, keeping the same general command shape (install, remove, update, search) while resolving dependencies faster and more reliably underneath.",
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

COMMANDS['apt-get'] = COMMANDS.apt;
COMMANDS['systemd'] = {
  ...COMMANDS.systemctl,
  desc: {
    en: "systemd is the init system and service manager. The command used to control it day-to-day is 'systemctl'. If you typed 'systemd' directly, you probably meant 'systemctl'.",
    pt: "systemd é o sistema de inicialização e gerenciador de serviços. O comando usado para controlá-lo no dia a dia é 'systemctl'. Se você digitou 'systemd' diretamente, provavelmente queria dizer 'systemctl'.",
  },
};
