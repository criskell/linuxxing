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
    id: 'start-a-job-with-lower-priority',
    track: 'processes',
    title: { en: 'Start a job with lower priority', pt: 'Inicie um job com prioridade menor' },
    task: {
      en: 'Start a sleep 1200 in the background with a nice value of 10, so it yields the processor to everything else. Leave it running.',
      pt: 'Inicie um sleep 1200 em segundo plano com valor de nice 10, de modo que ele ceda o processador para todo o resto. Deixe ele rodando.',
    },
    hint: {
      en: 'nice -n runs a command with the priority you ask for, and the ampersand still sends it to the background. The kernel exposes the value it settled on in the nineteenth field of /proc/PID/stat.',
      pt: 'O nice -n roda um comando com a prioridade que você pedir, e o e comercial continua mandando ele para segundo plano. O kernel expõe o valor que ficou valendo no décimo nono campo de /proc/PID/stat.',
    },
    setupCommand: 'for pid in $(pidof sleep); do kill $pid; done; true',
    checks: [
      {
        label: { en: 'a sleep 1200 is running', pt: 'um sleep 1200 está rodando' },
        command: 'ps | grep -q "[s]leep 1200"',
      },
      {
        label: { en: 'its nice value is 10', pt: 'o valor de nice dele é 10' },
        command: '[ "$(awk \'{print $19}\' /proc/$(pidof sleep)/stat)" = "10" ]',
      },
    ],
    solutionCommand: 'nice -n 10 sleep 1200 &',
  },
  {
    id: 'read-a-process-from-proc',
    track: 'processes',
    title: { en: 'Read a process from /proc', pt: 'Leia um processo pelo /proc' },
    task: {
      en: 'A sleep process is already running and it was started from /root/lab/service. Without using ps, write the directory that process is sitting in into /root/lab/service-cwd.txt, reading it from /proc.',
      pt: 'Um processo sleep já está rodando e foi iniciado a partir de /root/lab/service. Sem usar o ps, escreva em /root/lab/service-cwd.txt o diretório em que esse processo está, lendo do /proc.',
    },
    hint: {
      en: 'The kernel keeps one directory per process under /proc, named after the PID, and cwd inside it is a symbolic link to the working directory. readlink prints where a link points, and pidof finds the number to use.',
      pt: 'O kernel mantém um diretório por processo dentro do /proc, com o nome do PID, e o cwd lá dentro é um link simbólico para o diretório de trabalho. O readlink imprime para onde um link aponta, e o pidof acha o número a usar.',
    },
    setupCommand:
      'for pid in $(pidof sleep); do kill $pid; done; rm -f /root/lab/service-cwd.txt; mkdir -p /root/lab/service; cd /root/lab/service; sleep 1500 & cd /root; sleep 1',
    checks: [
      {
        label: { en: 'service-cwd.txt holds /root/lab/service', pt: 'service-cwd.txt guarda /root/lab/service' },
        command: '[ "$(cat /root/lab/service-cwd.txt)" = "/root/lab/service" ]',
      },
    ],
    solutionCommand: 'readlink /proc/$(pidof sleep)/cwd > /root/lab/service-cwd.txt',
  },
  {
    id: 'end-a-whole-family-of-processes',
    track: 'processes',
    title: { en: 'End a whole family of processes', pt: 'Encerre uma família inteira de processos' },
    task: {
      en: 'Four sleep processes are running at once and every one of them has to go, in a single command that names the program instead of the numbers. The watchdog process, which is a sh loop, stays alive.',
      pt: 'Quatro processos sleep estão rodando ao mesmo tempo e todos têm que sair, em um único comando que nomeia o programa em vez dos números. O processo watchdog, que é um laço em sh, continua vivo.',
    },
    hint: {
      en: 'killall takes the name of the program and signals every process running it, which saves you from reading PIDs one by one. It matches on the program name, so a shell loop with another name is left alone.',
      pt: 'O killall recebe o nome do programa e sinaliza todo processo que estiver rodando ele, o que poupa você de ler PIDs um a um. Ele casa pelo nome do programa, então um laço de shell com outro nome fica de fora.',
    },
    setupCommand:
      'for pid in $(pidof sleep); do kill $pid; done; killall watchdog.sh 2>/dev/null; mkdir -p /root/lab; printf "#!/bin/sh\nwhile true; do read line; done\n" > /root/lab/watchdog.sh; chmod +x /root/lab/watchdog.sh; sleep 400 & sleep 500 & sleep 600 & sleep 700 & /root/lab/watchdog.sh < /dev/null & sleep 1',
    checks: [
      {
        label: { en: 'no sleep process is left', pt: 'nenhum processo sleep sobrou' },
        command: '! ps | grep -q "[s]leep [0-9]"',
      },
      {
        label: { en: 'the watchdog is still running', pt: 'o watchdog continua rodando' },
        command: 'ps | grep -q "[w]atchdog.sh"',
      },
    ],
    solutionCommand: 'killall sleep',
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
