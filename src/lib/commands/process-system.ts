import type { CommandKB } from './types';

export const processSystem: CommandKB = {
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

};
