import type { StudyCard, StudyTopic } from './types';

export const administrativeTasksTopic: StudyTopic = {
  id: 'administrative-tasks',
  objectiveCode: '107',
  title: { en: 'Administrative Tasks', pt: 'Tarefas Administrativas' },
};

export const administrativeTasksCards: StudyCard[] = [
  {
    id: 'user-account',
    topic: 'administrative-tasks',
    front: { en: 'What is a user account, in Linux terms?', pt: 'O que é uma conta de usuário, em termos do Linux?' },
    back: {
      en: "A user account is an identity the system uses to separate who owns which files, which permissions apply, and which processes belong to whom, backed by a numeric user ID (UID) and an entry in /etc/passwd. Besides real people, many services run under their own dedicated system accounts specifically so a compromised service cannot touch a real user's files.",
      pt: 'Uma conta de usuário é uma identidade que o sistema usa para separar de quem são quais arquivos, quais permissões se aplicam, e a quem pertencem quais processos, apoiada por um ID de usuário numérico (UID) e uma entrada em /etc/passwd. Além de pessoas reais, muitos serviços rodam sob suas próprias contas de sistema dedicadas justamente para que um serviço comprometido não consiga tocar nos arquivos de um usuário real.',
    },
    details: {
      en: 'An account is spread across three files. /etc/passwd carries the name, the numeric identifier, the primary group, the home directory and the login shell, /etc/shadow keeps the password hash and the ageing rules with read access limited to root, and /etc/group lists the extra groups. Identifiers below 1000 usually belong to system accounts, and the shell field is what turns a service account into one that cannot log in.',
      pt: 'Uma conta fica espalhada por três arquivos. O /etc/passwd carrega o nome, o identificador numérico, o grupo primário, o diretório pessoal e o shell de login, o /etc/shadow guarda o hash da senha e as regras de validade com leitura restrita ao root, e o /etc/group lista os grupos extras. Identificadores abaixo de 1000 normalmente pertencem a contas de sistema, e o campo do shell é o que transforma uma conta de serviço em uma que não consegue entrar.',
    },
    keyPoints: [
      {
        en: 'The password field in /etc/passwd holds only an x, because the hash itself lives in /etc/shadow.',
        pt: 'O campo de senha do /etc/passwd guarda só um x, porque o hash em si mora no /etc/shadow.',
      },
      {
        en: 'A hash starting with an exclamation mark means the account is locked and cannot authenticate with a password.',
        pt: 'Um hash começando com ponto de exclamação significa que a conta está travada e não autentica com senha.',
      },
      {
        en: 'Deleting a user without -r leaves the home directory behind, owned by a numeric identifier with no name.',
        pt: 'Apagar um usuário sem o -r deixa o diretório pessoal para trás, pertencendo a um identificador numérico sem nome.',
      },
    ],
    commands: ['useradd', 'userdel', 'usermod', 'passwd', 'id'],
  },
  {
    id: 'what-is-cron',
    topic: 'administrative-tasks',
    front: { en: 'What is cron?', pt: 'O que é o cron?' },
    back: {
      en: 'cron is the standard Linux daemon for running commands automatically on a recurring schedule, defined in a crontab file with a five-field time expression (minute, hour, day of month, month, day of week). It is the tool behind nightly backups, log rotation, and any other job that needs to run "every day at 2am" or "every 15 minutes" without a human triggering it.',
      pt: 'O cron é o daemon padrão do Linux para rodar comandos automaticamente em uma agenda recorrente, definida em um arquivo crontab com uma expressão de tempo de cinco campos (minuto, hora, dia do mês, mês, dia da semana). É a ferramenta por trás de backups noturnos, rotação de logs, e qualquer outra tarefa que precise rodar "todo dia às 2h" ou "a cada 15 minutos" sem um humano disparando.',
    },
    details: {
      en: 'The daemon wakes every minute and compares the clock against each table. Each user has a personal crontab edited with crontab -e and never by hand, while /etc/crontab and the files in /etc/cron.d add a user field between the schedule and the command. A cron job runs with a very short PATH and no interactive environment, which is why a command that works in your terminal can fail there, and any output it prints gets mailed instead of shown.',
      pt: 'O serviço acorda a cada minuto e compara o relógio com cada tabela. Cada usuário tem uma crontab pessoal editada com crontab -e e nunca na mão, enquanto o /etc/crontab e os arquivos de /etc/cron.d acrescentam um campo de usuário entre o agendamento e o comando. Uma tarefa do cron roda com um PATH bem curto e sem ambiente interativo, e é por isso que um comando que funciona no seu terminal falha ali, e a saída que ele imprime vai por email em vez de aparecer.',
    },
    keyPoints: [
      {
        en: 'The five fields are minute, hour, day of month, month and day of week, and an asterisk means every value.',
        pt: 'Os cinco campos são minuto, hora, dia do mês, mês e dia da semana, e um asterisco significa todo valor.',
      },
      {
        en: 'Use absolute paths inside a cron job, because the PATH it inherits is much shorter than yours.',
        pt: 'Use caminhos absolutos em uma tarefa do cron, porque o PATH que ela herda é bem mais curto que o seu.',
      },
      {
        en: 'anacron exists for machines that are not always on, running a missed daily job once the machine comes back.',
        pt: 'O anacron existe para máquinas que não ficam sempre ligadas, rodando uma tarefa diária perdida assim que a máquina volta.',
      },
    ],
    commands: ['crontab', 'at', 'systemctl', 'date'],
  },
  {
    id: 'at-command',
    topic: 'administrative-tasks',
    front: { en: 'What is the at command for?', pt: 'Para que serve o comando at?' },
    back: {
      en: 'The at command schedules a job to run exactly once at a specific future time, unlike cron\'s recurring schedule. It is the right tool for a one-off task like "send this reminder in two hours" or "run this cleanup script tonight", the job disappears from the queue automatically once it has run.',
      pt: 'O comando at agenda uma tarefa para rodar exatamente uma vez em um momento futuro específico, diferente da agenda recorrente do cron. É a ferramenta certa para uma tarefa única como "mandar esse lembrete em duas horas" ou "rodar esse script de limpeza hoje à noite", a tarefa desaparece da fila automaticamente depois de rodar.',
    },
    details: {
      en: 'at queues one command for a single future moment and then forgets about it, which is the difference from cron. It reads the command from standard input, accepts times like now + 2 hours or 09:00 tomorrow, and stores the whole environment of the session that queued it. Access is controlled by /etc/at.allow and /etc/at.deny, and atq lists the queue while atrm removes an entry by number.',
      pt: 'O at enfileira um comando para um único momento futuro e depois esquece dele, que é a diferença para o cron. Ele lê o comando da entrada padrão, aceita horários como now + 2 hours ou 09:00 tomorrow, e guarda o ambiente inteiro da sessão que enfileirou. O acesso é controlado por /etc/at.allow e /etc/at.deny, e o atq lista a fila enquanto o atrm remove uma entrada pelo número.',
    },
    keyPoints: [
      {
        en: 'The job runs once and disappears from the queue, so nothing repeats without cron or a timer.',
        pt: 'A tarefa roda uma vez e some da fila, então nada se repete sem o cron ou um timer.',
      },
      {
        en: 'Output goes to the mail spool of the user, because there is no terminal attached when the moment arrives.',
        pt: 'A saída vai para a caixa de correio do usuário, porque não existe terminal ligado quando o momento chega.',
      },
      {
        en: 'If the daemon is not running the job simply never fires, even though at accepted it without complaining.',
        pt: 'Se o serviço não estiver rodando a tarefa simplesmente nunca dispara, mesmo o at tendo aceitado sem reclamar.',
      },
    ],
    commands: ['at', 'crontab', 'date', 'systemctl'],
  },
  {
    id: 'localization',
    topic: 'administrative-tasks',
    front: { en: 'What is localization (locale) in Linux?', pt: 'O que é localização (locale) no Linux?' },
    back: {
      en: "A locale is a bundle of regional settings, language, date and number formatting, currency symbols, and character encoding, that programs read to present output in a way that matches the user's region and language. The LANG and LC_* environment variables control which locale is active, and the locale command shows what is currently configured.",
      pt: 'Um locale é um conjunto de configurações regionais, idioma, formatação de data e número, símbolos de moeda e codificação de caracteres, que os programas leem para apresentar a saída de um jeito que combine com a região e o idioma do usuário. As variáveis de ambiente LANG e LC_* controlam qual locale está ativo, e o comando locale mostra o que está configurado no momento.',
    },
    details: {
      en: 'Locale settings change how programs sort, format numbers and dates, and interpret character sets, so they change command output in ways scripts notice. LANG sets the default, the LC_ variables override single categories, and LC_ALL overrides everything at once. Setting LC_ALL=C in a script is the usual way to get stable, sortable output regardless of the machine it runs on, and the time zone lives separately in /etc/localtime with TZ overriding it per command.',
      pt: 'As configurações de locale mudam como os programas ordenam, formatam números e datas, e interpretam conjuntos de caracteres, então mudam a saída dos comandos de um jeito que os scripts percebem. O LANG define o padrão, as variáveis LC_ sobrescrevem categorias isoladas, e o LC_ALL sobrescreve tudo de uma vez. Definir LC_ALL=C em um script é a forma comum de ter saída estável e ordenável independente da máquina, e o fuso mora à parte em /etc/localtime, com o TZ sobrescrevendo por comando.',
    },
    keyPoints: [
      {
        en: 'Sorting order depends on the locale, so the same sort gives different results on two machines.',
        pt: 'A ordem do sort depende do locale, então o mesmo sort dá resultados diferentes em duas máquinas.',
      },
      {
        en: 'UTF-8 encodes one character in one to four bytes, which is why wc -c and wc -m can disagree.',
        pt: 'O UTF-8 codifica um caractere em um a quatro bytes, e é por isso que o wc -c e o wc -m discordam.',
      },
      {
        en: 'Servers usually keep the clock in UTC and convert on display, which avoids daylight saving surprises in logs.',
        pt: 'Servidores normalmente mantêm o relógio em UTC e convertem na exibição, o que evita surpresas de horário de verão nos logs.',
      },
    ],
    commands: ['date', 'sort', 'env', 'export'],
  },
  {
    id: 'what-is-a-group',
    topic: 'administrative-tasks',
    front: {
      en: 'What is a group, and why do permissions use them?',
      pt: 'O que é um grupo, e por que as permissões o usam?',
    },
    back: {
      en: "A group is a named collection of users that file permissions and other access controls can refer to as a single unit, instead of listing every user individually. It lets an administrator, for example, give an entire team write access to a shared project folder by adding each member to one group and setting the folder's group ownership and permissions once.",
      pt: 'Um grupo é uma coleção nomeada de usuários que permissões de arquivo e outros controles de acesso podem referenciar como uma única unidade, em vez de listar cada usuário individualmente. Isso permite, por exemplo, que um administrador dê acesso de escrita a uma pasta de projeto compartilhada para um time inteiro adicionando cada membro a um grupo e configurando o dono de grupo e as permissões da pasta uma única vez.',
    },
    details: {
      en: 'Every process carries one primary group and a list of supplementary groups, and the kernel checks the group bits of a file against that list. The primary group is the one written into /etc/passwd and the one new files receive, unless the directory carries the setgid bit, which passes its own group down instead. Adding a user to a group does not affect the sessions already open, so the change appears after the next login.',
      pt: 'Todo processo carrega um grupo primário e uma lista de grupos suplementares, e o kernel confere os bits de grupo de um arquivo contra essa lista. O grupo primário é o que está escrito no /etc/passwd e o que os arquivos novos recebem, a menos que o diretório traga o bit setgid, que repassa o próprio grupo. Colocar um usuário em um grupo não afeta as sessões já abertas, então a mudança aparece no próximo login.',
    },
    keyPoints: [
      {
        en: 'id prints the primary group and every supplementary one, which is the quickest way to confirm a change.',
        pt: 'O id imprime o grupo primário e todos os suplementares, que é a forma mais rápida de confirmar uma mudança.',
      },
      {
        en: 'The setgid bit on a directory makes every new file inside it inherit the group of the directory.',
        pt: 'O bit setgid em um diretório faz todo arquivo novo lá dentro herdar o grupo do diretório.',
      },
      {
        en: 'newgrp starts a shell with another primary group without touching the account configuration.',
        pt: 'O newgrp inicia um shell com outro grupo primário sem mexer na configuração da conta.',
      },
    ],
    commands: ['groupadd', 'groupdel', 'groups', 'id', 'newgrp'],
  },
];
