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
  },
  {
    id: 'what-is-cron',
    topic: 'administrative-tasks',
    front: { en: 'What is cron?', pt: 'O que é o cron?' },
    back: {
      en: 'cron is the standard Linux daemon for running commands automatically on a recurring schedule, defined in a crontab file with a five-field time expression (minute, hour, day of month, month, day of week). It is the tool behind nightly backups, log rotation, and any other job that needs to run "every day at 2am" or "every 15 minutes" without a human triggering it.',
      pt: 'O cron é o daemon padrão do Linux para rodar comandos automaticamente em uma agenda recorrente, definida em um arquivo crontab com uma expressão de tempo de cinco campos (minuto, hora, dia do mês, mês, dia da semana). É a ferramenta por trás de backups noturnos, rotação de logs, e qualquer outra tarefa que precise rodar "todo dia às 2h" ou "a cada 15 minutos" sem um humano disparando.',
    },
  },
  {
    id: 'at-command',
    topic: 'administrative-tasks',
    front: { en: 'What is the at command for?', pt: 'Para que serve o comando at?' },
    back: {
      en: 'The at command schedules a job to run exactly once at a specific future time, unlike cron\'s recurring schedule. It is the right tool for a one-off task like "send this reminder in two hours" or "run this cleanup script tonight", the job disappears from the queue automatically once it has run.',
      pt: 'O comando at agenda uma tarefa para rodar exatamente uma vez em um momento futuro específico, diferente da agenda recorrente do cron. É a ferramenta certa para uma tarefa única como "mandar esse lembrete em duas horas" ou "rodar esse script de limpeza hoje à noite", a tarefa desaparece da fila automaticamente depois de rodar.',
    },
  },
  {
    id: 'localization',
    topic: 'administrative-tasks',
    front: { en: 'What is localization (locale) in Linux?', pt: 'O que é localização (locale) no Linux?' },
    back: {
      en: "A locale is a bundle of regional settings, language, date and number formatting, currency symbols, and character encoding, that programs read to present output in a way that matches the user's region and language. The LANG and LC_* environment variables control which locale is active, and the locale command shows what is currently configured.",
      pt: 'Um locale é um conjunto de configurações regionais, idioma, formatação de data e número, símbolos de moeda e codificação de caracteres, que os programas leem para apresentar a saída de um jeito que combine com a região e o idioma do usuário. As variáveis de ambiente LANG e LC_* controlam qual locale está ativo, e o comando locale mostra o que está configurado no momento.',
    },
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
  },
];
