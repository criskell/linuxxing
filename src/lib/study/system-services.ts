import type { StudyCard, StudyTopic } from './types';

export const systemServicesTopic: StudyTopic = {
  id: 'system-services',
  objectiveCode: '108',
  title: { en: 'Essential System Services', pt: 'Serviços Essenciais do Sistema' },
};

export const systemServicesCards: StudyCard[] = [
  {
    id: 'what-is-syslog',
    topic: 'system-services',
    front: { en: 'What is syslog?', pt: 'O que é o syslog?' },
    back: {
      en: "syslog is the traditional standard and protocol for system logging on Unix-like systems: programs send log messages, tagged with a source and a severity level, to a central logging daemon that writes them to files under /var/log, and can also forward them to a remote log server. It is what makes it possible to check one place for what happened across an entire system, instead of hunting through each program's own output.",
      pt: 'O syslog é o padrão e protocolo tradicional de registro de log em sistemas Unix: programas enviam mensagens de log, marcadas com uma origem e um nível de severidade, para um daemon de log central que as escreve em arquivos sob /var/log, e também pode encaminhá-las para um servidor de log remoto. É o que torna possível checar um único lugar para saber o que aconteceu em um sistema inteiro, em vez de caçar na saída de cada programa individualmente.',
    },
    details: {
      en: 'Every message carries a facility saying where it came from, such as auth, cron or daemon, and a severity from emerg down to debug, and the configuration routes messages by that pair. Rules in /etc/rsyslog.conf and /etc/rsyslog.d decide which file each combination lands in, which is why authentication attempts end up in /var/log/auth.log while the kernel goes to /var/log/kern.log. Rotation is a separate job handled by logrotate, and a log written by hand from a script goes through logger.',
      pt: 'Toda mensagem carrega uma facility dizendo de onde veio, como auth, cron ou daemon, e uma severidade de emerg até debug, e a configuração roteia mensagens por esse par. Regras em /etc/rsyslog.conf e /etc/rsyslog.d decidem em qual arquivo cada combinação cai, e é por isso que tentativas de autenticação acabam em /var/log/auth.log enquanto o kernel vai para /var/log/kern.log. A rotação é um trabalho à parte feito pelo logrotate, e um log escrito por um script passa pelo logger.',
    },
    keyPoints: [
      {
        en: 'Severity runs from emerg as the most serious down to debug, and a rule catches its level and everything above it.',
        pt: 'A severidade vai de emerg como a mais grave até debug, e uma regra pega o nível dela e tudo acima.',
      },
      {
        en: 'logrotate compresses and prunes old files, so a growing /var/log usually means a rule is missing.',
        pt: 'O logrotate comprime e apaga arquivos antigos, então um /var/log crescendo normalmente significa uma regra faltando.',
      },
      {
        en: 'A syslog daemon can forward messages to a central server over the network, which keeps logs after a machine dies.',
        pt: 'Um serviço de syslog pode encaminhar mensagens para um servidor central pela rede, o que preserva logs depois de a máquina morrer.',
      },
    ],
    commands: ['journalctl', 'tail', 'grep', 'dmesg'],
  },
  {
    id: 'what-is-journald',
    topic: 'system-services',
    front: { en: 'What is journald?', pt: 'O que é o journald?' },
    back: {
      en: "journald is systemd's own logging service, storing log entries in a structured, indexed binary format instead of syslog's plain text files, queried with the journalctl command. It captures kernel messages, service output, and syslog-compatible messages all in one place, and can be filtered by time range, service, or severity far more precisely than grepping a text log.",
      pt: 'O journald é o serviço de log do próprio systemd, guardando entradas de log em um formato binário estruturado e indexado em vez dos arquivos de texto simples do syslog, consultado com o comando journalctl. Ele captura mensagens do kernel, saída de serviços, e mensagens compatíveis com syslog tudo em um só lugar, e pode ser filtrado por intervalo de tempo, serviço, ou severidade de forma muito mais precisa do que fazer grep em um log de texto.',
    },
    details: {
      en: 'The journal stores structured records in a binary format, keeping the unit, the process identifier and the priority next to each line, which is what lets journalctl filter by service instead of grepping a text file. By default the storage lives in /run/log/journal and disappears on reboot, and creating /var/log/journal makes it persistent. Many systems run journald and a syslog daemon together, with the journal forwarding a copy into the classic text files.',
      pt: 'O journal guarda registros estruturados em formato binário, mantendo a unidade, o identificador do processo e a prioridade ao lado de cada linha, que é o que permite ao journalctl filtrar por serviço em vez de dar grep num arquivo de texto. Por padrão o armazenamento fica em /run/log/journal e some no reboot, e criar /var/log/journal torna ele persistente. Muitos sistemas rodam o journald e um serviço de syslog juntos, com o journal encaminhando uma cópia para os arquivos de texto clássicos.',
    },
    keyPoints: [
      {
        en: 'journalctl -u names a unit, -f follows new lines and -b limits the output to the current boot.',
        pt: 'O journalctl -u nomeia uma unidade, o -f acompanha linhas novas e o -b limita a saída ao boot atual.',
      },
      {
        en: 'Without /var/log/journal the history is wiped at every reboot, which surprises people debugging a crash.',
        pt: 'Sem o /var/log/journal o histórico é apagado a cada reboot, o que surpreende quem está investigando uma queda.',
      },
      {
        en: 'The journal has size limits in journald.conf, and it drops the oldest records once it reaches them.',
        pt: 'O journal tem limites de tamanho no journald.conf, e descarta os registros mais antigos ao alcançar eles.',
      },
    ],
    commands: ['journalctl', 'systemctl', 'dmesg', 'tail'],
  },
  {
    id: 'what-is-ntp',
    topic: 'system-services',
    front: { en: 'What is NTP?', pt: 'O que é o NTP?' },
    back: {
      en: "NTP (Network Time Protocol) keeps a machine's clock synchronized with accurate time servers over the network, correcting drift that would otherwise accumulate over days or weeks. Accurate, consistent time matters far beyond just displaying the correct clock: log timestamps, TLS certificate validation, and distributed systems all depend on machines agreeing closely on what time it is.",
      pt: 'O NTP (Network Time Protocol) mantém o relógio de uma máquina sincronizado com servidores de tempo precisos pela rede, corrigindo o desvio que de outra forma se acumularia ao longo de dias ou semanas. Tempo preciso e consistente importa muito além de só mostrar o relógio certo: timestamps de log, validação de certificado TLS, e sistemas distribuídos dependem de máquinas concordarem de perto sobre que horas são.',
    },
    details: {
      en: 'Clock synchronisation matters more than it looks: certificates, scheduled jobs, and log correlation across machines all break when a clock drifts. The daemon corrects the clock by slewing it, speeding it up or slowing it down gradually rather than jumping, because a jump backwards can confuse programs measuring elapsed time. Modern systems usually run chronyd or systemd-timesyncd instead of the original ntpd, and they all keep a separate hardware clock in sync as well.',
      pt: 'Sincronizar o relógio importa mais do que parece: certificados, tarefas agendadas e correlação de logs entre máquinas quebram quando um relógio desvia. O serviço corrige o relógio deslizando ele, acelerando ou desacelerando aos poucos em vez de saltar, porque um salto para trás confunde programas que medem tempo decorrido. Sistemas modernos normalmente rodam chronyd ou systemd-timesyncd em vez do ntpd original, e todos mantêm também um relógio de hardware em sincronia.',
    },
    keyPoints: [
      {
        en: 'A stratum number says how far a server sits from the reference clock, and lower is closer to the source.',
        pt: 'O número de stratum diz o quão longe um servidor está do relógio de referência, e menor é mais perto da fonte.',
      },
      {
        en: 'The hardware clock keeps time while the machine is off, and hwclock is what reads or writes it.',
        pt: 'O relógio de hardware mantém a hora com a máquina desligada, e o hwclock é quem lê ou escreve nele.',
      },
      {
        en: 'Keeping servers in UTC avoids an hour of duplicated or missing log lines twice a year.',
        pt: 'Manter servidores em UTC evita uma hora de linhas de log duplicadas ou faltando duas vezes por ano.',
      },
    ],
    commands: ['date', 'systemctl', 'timeout'],
  },
  {
    id: 'what-is-an-mta',
    topic: 'system-services',
    front: { en: 'What is a Mail Transfer Agent (MTA)?', pt: 'O que é um Mail Transfer Agent (MTA)?' },
    back: {
      en: 'A Mail Transfer Agent is the software responsible for actually sending and receiving email between mail servers over SMTP, examples include Postfix, Sendmail, and Exim. On a Linux server, a local MTA is often installed just so system tools and cron jobs can send administrative email (like a "backup failed" alert) even if the machine never receives normal user email.',
      pt: 'Um Mail Transfer Agent é o software responsável por de fato enviar e receber e-mail entre servidores de e-mail via SMTP, exemplos incluem Postfix, Sendmail e Exim. Em um servidor Linux, um MTA local costuma ser instalado só para que ferramentas do sistema e tarefas de cron consigam mandar e-mail administrativo (como um alerta de "backup falhou") mesmo que a máquina nunca receba e-mail comum de usuário.',
    },
    details: {
      en: 'Local mail still matters on a server even without the internet, because cron sends the output of failed jobs to the mail of the user who owns the job. The transfer agent listens on port 25 for delivery between servers, writes local mail into a spool under /var/mail or /var/spool/mail, and reads aliases from /etc/aliases, which is how mail addressed to root reaches a real person.',
      pt: 'O correio local ainda importa em um servidor mesmo sem internet, porque o cron manda a saída de tarefas que falharam para o correio do usuário dono da tarefa. O agente de transferência escuta na porta 25 para entrega entre servidores, escreve o correio local em uma fila em /var/mail ou /var/spool/mail, e lê apelidos de /etc/aliases, que é como o correio endereçado ao root chega a uma pessoa de verdade.',
    },
    keyPoints: [
      {
        en: 'An alias for root in /etc/aliases is what turns unread system mail into something a person actually sees.',
        pt: 'Um apelido para root no /etc/aliases é o que transforma correio de sistema não lido em algo que alguém realmente vê.',
      },
      {
        en: 'After editing /etc/aliases the newaliases command rebuilds the database the agent actually reads.',
        pt: 'Depois de editar o /etc/aliases, o comando newaliases reconstrói o banco que o agente realmente lê.',
      },
      {
        en: 'Postfix, Exim and sendmail all speak the same protocol, so the choice changes configuration rather than behaviour.',
        pt: 'Postfix, Exim e sendmail falam o mesmo protocolo, então a escolha muda a configuração e não o comportamento.',
      },
    ],
    commands: ['systemctl', 'journalctl', 'netstat', 'ss'],
  },
  {
    id: 'printing-cups',
    topic: 'system-services',
    front: { en: 'How does printing work on Linux?', pt: 'Como funciona a impressão no Linux?' },
    back: {
      en: 'Printing on Linux is handled by CUPS (the Common Unix Printing System), a background service that manages printer queues, converts documents into a format each printer understands, and exposes both a web interface and command-line tools (like lp and lpr) for submitting and managing print jobs, most desktop print dialogs are really just a front end to CUPS.',
      pt: 'A impressão no Linux é gerenciada pelo CUPS (Common Unix Printing System), um serviço em segundo plano que gerencia filas de impressora, converte documentos para um formato que cada impressora entende, e expõe tanto uma interface web quanto ferramentas de linha de comando (como lp e lpr) para enviar e gerenciar trabalhos de impressão, a maioria dos diálogos de impressão do desktop são só uma interface para o CUPS por baixo.',
    },
    details: {
      en: 'CUPS is a server that speaks the Internet Printing Protocol and exposes a web interface on port 631, where printers, classes and jobs are managed. Configuration lives in /etc/cups, jobs queue on disk until the printer accepts them, and a queue can be stopped without losing what is already in it. The classic lp commands still work because CUPS implements them on top of its own queue.',
      pt: 'O CUPS é um servidor que fala o Internet Printing Protocol e expõe uma interface web na porta 631, onde impressoras, classes e trabalhos são gerenciados. A configuração mora em /etc/cups, os trabalhos ficam em fila no disco até a impressora aceitar, e uma fila pode ser parada sem perder o que já está nela. Os comandos lp clássicos continuam funcionando porque o CUPS implementa eles em cima da própria fila.',
    },
    keyPoints: [
      {
        en: 'lpstat lists queues and jobs, lpr sends a file to print and lprm removes a job by number.',
        pt: 'O lpstat lista filas e trabalhos, o lpr manda um arquivo para imprimir e o lprm remove um trabalho pelo número.',
      },
      {
        en: 'A stopped queue keeps accepting jobs and prints nothing, which looks like a broken printer until you check it.',
        pt: 'Uma fila parada continua aceitando trabalhos e não imprime nada, o que parece impressora quebrada até você conferir.',
      },
      {
        en: 'The web interface on port 631 does everything the command line does, including adding a printer.',
        pt: 'A interface web na porta 631 faz tudo que a linha de comando faz, inclusive adicionar uma impressora.',
      },
    ],
    commands: ['systemctl', 'journalctl', 'ss'],
  },
];
