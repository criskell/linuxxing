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
    checkCommand:
      '[ -s /root/lab/sleeper.pid ] && ps | grep "[s]leep 1200" | awk \'{print $1}\' | grep -qx "$(cat /root/lab/sleeper.pid)"',
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
    checkCommand: '! ps | grep -q "[s]leep 600" && ps | grep -q "[s]leep 300" && ps | grep -q "[s]leep 900"',
    solutionCommand: "kill $(ps | grep '[s]leep 600' | awk '{print $1}')",
  },
];
