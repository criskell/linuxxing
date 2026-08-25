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
      en: 'syslog is the traditional standard and protocol for system logging on Unix-like systems: programs send log messages, tagged with a source and a severity level, to a central logging daemon that writes them to files under /var/log, and can also forward them to a remote log server. It is what makes it possible to check one place for what happened across an entire system, instead of hunting through each program\'s own output.',
      pt: 'O syslog é o padrão e protocolo tradicional de registro de log em sistemas Unix: programas enviam mensagens de log, marcadas com uma origem e um nível de severidade, para um daemon de log central que as escreve em arquivos sob /var/log, e também pode encaminhá-las para um servidor de log remoto. É o que torna possível checar um único lugar para saber o que aconteceu em um sistema inteiro, em vez de caçar na saída de cada programa individualmente.',
    },
  },
  {
    id: 'what-is-journald',
    topic: 'system-services',
    front: { en: 'What is journald?', pt: 'O que é o journald?' },
    back: {
      en: "journald is systemd's own logging service, storing log entries in a structured, indexed binary format instead of syslog's plain text files, queried with the journalctl command. It captures kernel messages, service output, and syslog-compatible messages all in one place, and can be filtered by time range, service, or severity far more precisely than grepping a text log.",
      pt: 'O journald é o serviço de log do próprio systemd, guardando entradas de log em um formato binário estruturado e indexado em vez dos arquivos de texto simples do syslog, consultado com o comando journalctl. Ele captura mensagens do kernel, saída de serviços, e mensagens compatíveis com syslog tudo em um só lugar, e pode ser filtrado por intervalo de tempo, serviço, ou severidade de forma muito mais precisa do que fazer grep em um log de texto.',
    },
  },
  {
    id: 'what-is-ntp',
    topic: 'system-services',
    front: { en: 'What is NTP?', pt: 'O que é o NTP?' },
    back: {
      en: 'NTP (Network Time Protocol) keeps a machine\'s clock synchronized with accurate time servers over the network, correcting drift that would otherwise accumulate over days or weeks. Accurate, consistent time matters far beyond just displaying the correct clock: log timestamps, TLS certificate validation, and distributed systems all depend on machines agreeing closely on what time it is.',
      pt: 'O NTP (Network Time Protocol) mantém o relógio de uma máquina sincronizado com servidores de tempo precisos pela rede, corrigindo o desvio que de outra forma se acumularia ao longo de dias ou semanas. Tempo preciso e consistente importa muito além de só mostrar o relógio certo: timestamps de log, validação de certificado TLS, e sistemas distribuídos dependem de máquinas concordarem de perto sobre que horas são.',
    },
  },
  {
    id: 'what-is-an-mta',
    topic: 'system-services',
    front: { en: 'What is a Mail Transfer Agent (MTA)?', pt: 'O que é um Mail Transfer Agent (MTA)?' },
    back: {
      en: 'A Mail Transfer Agent is the software responsible for actually sending and receiving email between mail servers over SMTP, examples include Postfix, Sendmail, and Exim. On a Linux server, a local MTA is often installed just so system tools and cron jobs can send administrative email (like a "backup failed" alert) even if the machine never receives normal user email.',
      pt: 'Um Mail Transfer Agent é o software responsável por de fato enviar e receber e-mail entre servidores de e-mail via SMTP, exemplos incluem Postfix, Sendmail e Exim. Em um servidor Linux, um MTA local costuma ser instalado só para que ferramentas do sistema e tarefas de cron consigam mandar e-mail administrativo (como um alerta de "backup falhou") mesmo que a máquina nunca receba e-mail comum de usuário.',
    },
  },
  {
    id: 'printing-cups',
    topic: 'system-services',
    front: { en: 'How does printing work on Linux?', pt: 'Como funciona a impressão no Linux?' },
    back: {
      en: 'Printing on Linux is handled by CUPS (the Common Unix Printing System), a background service that manages printer queues, converts documents into a format each printer understands, and exposes both a web interface and command-line tools (like lp and lpr) for submitting and managing print jobs, most desktop print dialogs are really just a front end to CUPS.',
      pt: 'A impressão no Linux é gerenciada pelo CUPS (Common Unix Printing System), um serviço em segundo plano que gerencia filas de impressora, converte documentos para um formato que cada impressora entende, e expõe tanto uma interface web quanto ferramentas de linha de comando (como lp e lpr) para enviar e gerenciar trabalhos de impressão, a maioria dos diálogos de impressão do desktop são só uma interface para o CUPS por baixo.',
    },
  },
];
