import type { LabExercise, LabTrack } from './types';

export const shellAndAutomationTrack: LabTrack = {
  id: 'shell-and-automation',
  objectiveCode: '105.1, 107.2',
  title: { en: 'Shell scripts and scheduling', pt: 'Scripts de shell e agendamento' },
};

export const shellAndAutomationExercises: LabExercise[] = [
  {
    id: 'export-a-variable',
    track: 'shell-and-automation',
    title: { en: 'Send a variable to child processes', pt: 'Mande uma variável para os processos filhos' },
    task: {
      en: 'Put /root/lab in a variable named LAB_ROOT so that a shell started from this one also sees it.',
      pt: 'Coloque /root/lab em uma variável chamada LAB_ROOT de forma que um shell iniciado a partir deste também enxergue ela.',
    },
    hint: {
      en: 'A plain assignment lives only in the shell that ran it. export marks the variable to be copied into the environment of every process the shell starts, which is what sh -c can read back.',
      pt: 'Uma atribuição simples vive só no shell que a executou. O export marca a variável para ser copiada no ambiente de todo processo que o shell iniciar, que é o que o sh -c consegue ler de volta.',
    },
    setupCommand: 'unset LAB_ROOT; mkdir -p /root/lab',
    checks: [
      {
        label: { en: 'LAB_ROOT holds /root/lab in this shell', pt: 'LAB_ROOT guarda /root/lab neste shell' },
        command: '[ "$LAB_ROOT" = "/root/lab" ]',
      },
      {
        label: { en: 'a child shell reads the same value', pt: 'um shell filho lê o mesmo valor' },
        command: '[ "$(sh -c \'echo $LAB_ROOT\')" = "/root/lab" ]',
      },
    ],
    solutionCommand: 'export LAB_ROOT=/root/lab',
  },
  {
    id: 'write-a-greeting-script',
    track: 'shell-and-automation',
    title: { en: 'Write a script that takes an argument', pt: 'Escreva um script que recebe um argumento' },
    task: {
      en: 'Write /root/lab/greet.sh so that running it with world prints hello, world and running it with linux prints hello, linux. Make the file executable on its own, without calling sh in front of it.',
      pt: 'Escreva /root/lab/greet.sh de modo que rodá-lo com world imprima hello, world e rodá-lo com linux imprima hello, linux. Deixe o arquivo executável por conta própria, sem chamar o sh na frente.',
    },
    hint: {
      en: 'The first line, #!/bin/sh, tells the kernel which interpreter reads the file. Inside the script, $1 holds the first argument, and chmod +x turns the file into something the shell runs directly. The vi editor is installed here if you prefer typing the file by hand.',
      pt: 'A primeira linha, #!/bin/sh, diz ao kernel qual interpretador lê o arquivo. Dentro do script, $1 guarda o primeiro argumento, e o chmod +x transforma o arquivo em algo que o shell roda direto. O editor vi está instalado aqui, se preferir digitar o arquivo na mão.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/greet.sh',
    checks: [
      {
        label: { en: 'greet.sh is executable', pt: 'greet.sh é executável' },
        command: '[ -x /root/lab/greet.sh ]',
      },
      {
        label: { en: 'it starts with a shebang line', pt: 'ele começa com uma linha shebang' },
        command: 'head -1 /root/lab/greet.sh | grep -q "^#!"',
      },
      {
        label: { en: 'greet.sh world prints hello, world', pt: 'greet.sh world imprime hello, world' },
        command: '[ "$(/root/lab/greet.sh world)" = "hello, world" ]',
      },
      {
        label: { en: 'the argument really is read', pt: 'o argumento é realmente lido' },
        command: '[ "$(/root/lab/greet.sh linux)" = "hello, linux" ]',
      },
    ],
    solutionCommand: 'printf \'#!/bin/sh\\necho "hello, $1"\\n\' > /root/lab/greet.sh && chmod +x /root/lab/greet.sh',
  },
  {
    id: 'schedule-a-daily-job',
    track: 'shell-and-automation',
    title: { en: 'Schedule a daily job', pt: 'Agende uma tarefa diária' },
    task: {
      en: 'Give root a crontab holding a single entry that runs /root/lab/greet.sh every day at 6:30 in the morning.',
      pt: 'Dê ao root uma crontab com uma única entrada que roda /root/lab/greet.sh todo dia às 6:30 da manhã.',
    },
    hint: {
      en: 'A crontab line starts with five time fields, minute, hour, day of month, month and day of week, and ends with the command. An asterisk means every value of that field, and crontab followed by a file name installs the table from that file.',
      pt: 'Uma linha de crontab começa com cinco campos de tempo, minuto, hora, dia do mês, mês e dia da semana, e termina com o comando. Um asterisco significa todo valor daquele campo, e crontab seguido de um nome de arquivo instala a tabela a partir dele.',
    },
    setupCommand: 'mkdir -p /var/spool/cron/crontabs /root/lab; crontab -r 2>/dev/null; true',
    checks: [
      {
        label: { en: 'root has a crontab with one entry', pt: 'o root tem uma crontab com uma entrada' },
        command: '[ "$(crontab -l | awk \'$1 !~ /^#/ && NF >= 6\' | wc -l)" = "1" ]',
      },
      {
        label: {
          en: 'the entry fires at 6:30 every day and calls greet.sh',
          pt: 'a entrada dispara às 6:30 todo dia e chama o greet.sh',
        },
        command:
          'crontab -l | awk \'$1 !~ /^#/ && NF >= 6 {print $1, $2, $3, $4, $5, $6}\' | grep -qxF "30 6 * * * /root/lab/greet.sh"',
      },
    ],
    solutionCommand: 'printf "30 6 * * * /root/lab/greet.sh\\n" > /tmp/root-crontab && crontab /tmp/root-crontab',
  },
];
