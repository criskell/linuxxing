import type { LabExercise, LabTrack } from './types';

export const processesTrack: LabTrack = {
  id: 'processes',
  objectiveCode: '103.5',
  title: { en: 'Processes and signals', pt: 'Processos e sinais' },
};

export const processesExercises: LabExercise[] = [
  {
    id: 'record-a-background-pid',
    track: 'processes',
    title: { en: 'Record the PID of a background job', pt: 'Anote o PID de um job em segundo plano' },
    task: {
      en: 'Start a job that sleeps for 1200 seconds in the background, leave it running, and write its process ID into /root/lab/sleeper.pid.',
      pt: 'Inicie em segundo plano um job que dorme por 1200 segundos, deixe ele rodando e escreva o identificador do processo em /root/lab/sleeper.pid.',
    },
    hint: {
      en: 'An ampersand at the end of a command sends it to the background. Right after that, the shell keeps the process ID of the last background job in the $! variable.',
      pt: 'Um e comercial no fim de um comando manda ele para segundo plano. Logo depois disso, o shell guarda o identificador do último job em segundo plano na variável $!.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/sleeper.pid; for pid in $(pidof sleep); do kill $pid; done; true',
    checks: [
      {
        label: { en: 'a sleep 1200 is running', pt: 'um sleep 1200 está rodando' },
        command: 'ps | grep -q "[s]leep 1200"',
      },
      {
        label: { en: 'sleeper.pid holds a number', pt: 'sleeper.pid guarda um número' },
        command: 'grep -qE "^[0-9]+$" /root/lab/sleeper.pid',
      },
      {
        label: { en: 'that number is the PID of the running sleep', pt: 'esse número é o PID do sleep em execução' },
        command: 'ps | grep "[s]leep 1200" | awk \'{print $1}\' | grep -qx "$(cat /root/lab/sleeper.pid)"',
      },
    ],
    solutionCommand: 'sleep 1200 & echo $! > /root/lab/sleeper.pid',
  },
  {
    id: 'stop-the-right-process',
    track: 'processes',
    title: { en: 'Stop the right process', pt: 'Encerre o processo certo' },
    task: {
      en: 'Three sleep processes are running, one for 300 seconds, one for 600 and one for 900. End the 600 second one and leave the other two alive.',
      pt: 'Três processos sleep estão rodando, um de 300 segundos, um de 600 e um de 900. Encerre o de 600 segundos e deixe os outros dois vivos.',
    },
    hint: {
      en: 'ps prints the process ID in the first column and the command line after it, so awk can pull the number out. kill sends SIGTERM to whatever ID it receives.',
      pt: 'O ps imprime o identificador do processo na primeira coluna e a linha de comando depois dele, então o awk consegue extrair o número. O kill envia SIGTERM para o identificador que receber.',
    },
    setupCommand: 'for pid in $(pidof sleep); do kill $pid; done; sleep 300 & sleep 600 & sleep 900 & sleep 1',
    checks: [
      {
        label: { en: 'the sleep 600 is gone', pt: 'o sleep 600 se foi' },
        command: '! ps | grep -q "[s]leep 600"',
      },
      {
        label: { en: 'the sleep 300 survived', pt: 'o sleep 300 sobreviveu' },
        command: 'ps | grep -q "[s]leep 300"',
      },
      {
        label: { en: 'the sleep 900 survived', pt: 'o sleep 900 sobreviveu' },
        command: 'ps | grep -q "[s]leep 900"',
      },
    ],
    solutionCommand: "kill $(ps | grep '[s]leep 600' | awk '{print $1}')",
  },
  {
    id: 'split-standard-output-from-errors',
    track: 'processes',
    title: { en: 'Split output from errors', pt: 'Separe a saída dos erros' },
    task: {
      en: 'Run a single ls over /root/lab/service and /root/lab/missing, sending the listing into /root/lab/out.txt and the complaint about the missing directory into /root/lab/err.txt. Neither file carries the other stream.',
      pt: 'Rode um único ls sobre /root/lab/service e /root/lab/missing, mandando a listagem para /root/lab/out.txt e a reclamação sobre o diretório inexistente para /root/lab/err.txt. Nenhum dos dois arquivos carrega o outro fluxo.',
    },
    hint: {
      en: 'A command writes to two separate descriptors, 1 for regular output and 2 for errors. The > operator redirects descriptor 1 by default, and 2> picks the error one.',
      pt: 'Um comando escreve em dois descritores separados, o 1 para a saída comum e o 2 para os erros. O operador > redireciona o descritor 1 por padrão, e o 2> pega o dos erros.',
    },
    setupCommand:
      'rm -rf /root/lab/missing /root/lab/out.txt /root/lab/err.txt; mkdir -p /root/lab/service; touch /root/lab/service/access.log',
    checks: [
      {
        label: { en: 'out.txt carries the listing', pt: 'out.txt carrega a listagem' },
        command: 'grep -q "access.log" /root/lab/out.txt',
      },
      {
        label: { en: 'err.txt carries the error about missing', pt: 'err.txt carrega o erro sobre missing' },
        command: 'grep -q "missing" /root/lab/err.txt',
      },
      {
        label: { en: 'the error did not leak into out.txt', pt: 'o erro não vazou para out.txt' },
        command: '! grep -q "missing" /root/lab/out.txt',
      },
    ],
    solutionCommand: 'ls /root/lab/service /root/lab/missing > /root/lab/out.txt 2> /root/lab/err.txt',
  },
];
