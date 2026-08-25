import type { CommandKB } from './types';

export const systemInfo: CommandKB = {
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

};
