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
      'killall listener.sh 2>/dev/null; mkdir -p /root/lab; rm -f /root/lab/sleeper.pid; for pid in $(pidof sleep); do kill $pid; done; sleep 1; true',
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
    setupCommand:
      'killall listener.sh 2>/dev/null; for pid in $(pidof sleep); do kill $pid; done; sleep 1; sleep 300 & sleep 600 & sleep 900 & sleep 1',
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
    setupCommand: 'killall listener.sh 2>/dev/null; for pid in $(pidof sleep); do kill $pid; done; sleep 1; true',
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
      'killall listener.sh 2>/dev/null; for pid in $(pidof sleep); do kill $pid; done; sleep 1; rm -f /root/lab/service-cwd.txt; mkdir -p /root/lab/service; cd /root/lab/service; sleep 1500 & cd /root; sleep 1',
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
      'killall listener.sh 2>/dev/null; for pid in $(pidof sleep); do kill $pid; done; sleep 1; killall watchdog.sh 2>/dev/null; mkdir -p /root/lab; printf "#!/bin/sh\nwhile true; do read line; done\n" > /root/lab/watchdog.sh; chmod +x /root/lab/watchdog.sh; sleep 400 & sleep 500 & sleep 600 & sleep 700 & /root/lab/watchdog.sh < /dev/null & sleep 1',
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
    id: 'pause-a-running-process',
    track: 'processes',
    title: { en: 'Pause a running process', pt: 'Pause um processo em execução' },
    task: {
      en: 'A sleep 1800 is running. Suspend it without ending it, so the kernel reports it as stopped in the third field of /proc/PID/stat, and leave it suspended.',
      pt: 'Um sleep 1800 está rodando. Suspenda ele sem encerrar, de modo que o kernel informe ele como parado no terceiro campo de /proc/PID/stat, e deixe ele suspenso.',
    },
    hint: {
      en: 'kill sends whatever signal you name, not only the default one, and SIGSTOP suspends a process instead of asking it to finish. The state letter T means stopped, while S means sleeping.',
      pt: 'O kill envia o sinal que você nomear, não só o padrão, e o SIGSTOP suspende um processo em vez de pedir que ele termine. A letra de estado T significa parado, enquanto S significa dormindo.',
    },
    setupCommand:
      'killall listener.sh 2>/dev/null; for pid in $(pidof sleep); do kill -CONT $pid 2>/dev/null; kill $pid; done; sleep 1; sleep 1800 & sleep 1',
    checks: [
      {
        label: { en: 'the sleep is still alive', pt: 'o sleep continua vivo' },
        command: 'ps | grep -q "[s]leep 1800"',
      },
      {
        label: { en: 'the kernel reports it as stopped', pt: 'o kernel informa ele como parado' },
        command: '[ "$(awk \'{print $3}\' /proc/$(pidof sleep)/stat)" = "T" ]',
      },
    ],
    solutionCommand: 'kill -STOP $(pidof sleep)',
  },
  {
    id: 'resume-a-stopped-process',
    track: 'processes',
    title: { en: 'Resume a stopped process', pt: 'Retome um processo parado' },
    task: {
      en: 'The sleep process on this machine is suspended and will never finish while it stays that way. Put it back to work, so the kernel reports it as sleeping again.',
      pt: 'O processo sleep desta máquina está suspenso e nunca vai terminar enquanto ficar assim. Coloque ele de volta para funcionar, de modo que o kernel informe ele como dormindo de novo.',
    },
    hint: {
      en: 'SIGCONT is the counterpart of SIGSTOP and tells the kernel to schedule the process again. A stopped process ignores almost everything else, which is why the signal has to be that one.',
      pt: 'O SIGCONT é a contraparte do SIGSTOP e diz ao kernel para escalonar o processo de novo. Um processo parado ignora quase todo o resto, e é por isso que o sinal precisa ser esse.',
    },
    setupCommand:
      'killall listener.sh 2>/dev/null; for pid in $(pidof sleep); do kill -CONT $pid 2>/dev/null; kill $pid; done; sleep 1; sleep 1800 & sleep 1; kill -STOP $(pidof sleep)',
    checks: [
      {
        label: { en: 'the sleep is still alive', pt: 'o sleep continua vivo' },
        command: 'ps | grep -q "[s]leep 1800"',
      },
      {
        label: { en: 'the kernel no longer reports it as stopped', pt: 'o kernel não informa mais ele como parado' },
        command: '[ "$(awk \'{print $3}\' /proc/$(pidof sleep)/stat)" != "T" ]',
      },
    ],
    solutionCommand: 'kill -CONT $(pidof sleep)',
  },
  {
    id: 'catch-a-signal-in-a-script',
    track: 'processes',
    title: { en: 'Catch a signal inside a script', pt: 'Capture um sinal dentro de um script' },
    task: {
      en: 'Write an executable /root/lab/listener.sh that waits forever and, whenever it receives SIGUSR1, writes the word reloaded into /root/lab/reload.txt. Start it in the background and send the signal to prove it works.',
      pt: 'Escreva um /root/lab/listener.sh executável que espere para sempre e, sempre que receber SIGUSR1, escreva a palavra reloaded em /root/lab/reload.txt. Inicie ele em segundo plano e mande o sinal para provar que funciona.',
    },
    hint: {
      en: 'trap ties a command to a signal name, and it has to be set before the waiting loop starts. Once the script runs in the background, the shell keeps its PID in $! and kill -USR1 reaches it.',
      pt: 'O trap liga um comando a um nome de sinal, e precisa ser definido antes do laço de espera começar. Assim que o script roda em segundo plano, o shell guarda o PID dele no $! e o kill -USR1 alcança ele.',
    },
    setupCommand:
      'killall listener.sh 2>/dev/null; mkdir -p /root/lab; rm -f /root/lab/listener.sh /root/lab/reload.txt; true',
    checks: [
      {
        label: { en: 'the script sets a trap for USR1', pt: 'o script define um trap para USR1' },
        command: 'grep -q "trap" /root/lab/listener.sh && grep -q "USR1" /root/lab/listener.sh',
      },
      {
        label: { en: 'the script is running in the background', pt: 'o script está rodando em segundo plano' },
        command: 'ps | grep -q "[l]istener.sh"',
      },
      {
        label: { en: 'the signal produced the file', pt: 'o sinal produziu o arquivo' },
        command: 'grep -qx reloaded /root/lab/reload.txt',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\ntrap "echo reloaded > /root/lab/reload.txt" USR1\\nwhile true; do sleep 1; done\\n\' > /root/lab/listener.sh; chmod +x /root/lab/listener.sh; /root/lab/listener.sh & sleep 1; kill -USR1 $(ps | grep "[l]istener.sh" | awk \'{print $1}\' | head -1); sleep 2',
  },
  {
    id: 'find-who-holds-a-file',
    track: 'processes',
    title: { en: 'Find who is holding a file open', pt: 'Descubra quem segura um arquivo aberto' },
    task: {
      en: 'Something is writing to /root/lab/held.log and the file cannot be removed while that lasts. Write the process identifier holding it into /root/lab/holder.txt, as a bare number.',
      pt: 'Alguma coisa está escrevendo em /root/lab/held.log e o arquivo não pode ser removido enquanto isso durar. Escreva em /root/lab/holder.txt o identificador do processo que segura ele, como um número puro.',
    },
    hint: {
      en: 'fuser answers which processes have a given file open, printing the identifiers to standard output and a note to the error output. Sending the errors away leaves only the number, and tr can trim the spaces around it.',
      pt: 'O fuser responde quais processos têm um arquivo aberto, imprimindo os identificadores na saída padrão e um aviso na saída de erro. Mandar os erros embora deixa só o número, e o tr consegue tirar os espaços em volta.',
    },
    setupCommand:
      'killall listener.sh 2>/dev/null; for pid in $(pidof sleep); do kill $pid; done; sleep 1; mkdir -p /root/lab; rm -f /root/lab/holder.txt; sleep 1700 > /root/lab/held.log & sleep 1',
    checks: [
      {
        label: { en: 'the file holds a bare number', pt: 'o arquivo guarda um número puro' },
        command: 'grep -qE "^[0-9]+$" /root/lab/holder.txt',
      },
      {
        label: {
          en: 'that number is the process holding the file',
          pt: 'esse número é o processo que segura o arquivo',
        },
        command: '[ "$(cat /root/lab/holder.txt)" = "$(pidof sleep)" ]',
      },
    ],
    solutionCommand: 'fuser /root/lab/held.log 2>/dev/null | tr -d " " > /root/lab/holder.txt',
  },
  {
    id: 'read-the-parent-of-a-process',
    track: 'processes',
    title: { en: 'Read the parent of a process', pt: 'Descubra o pai de um processo' },
    task: {
      en: 'A sleep process is running in the background of this shell. Write the identifier of its parent process into /root/lab/parent.txt, taking it from the status file the kernel keeps for that process.',
      pt: 'Um processo sleep está rodando em segundo plano deste shell. Escreva o identificador do processo pai dele em /root/lab/parent.txt, tirando isso do arquivo de status que o kernel mantém para esse processo.',
    },
    hint: {
      en: 'The file /proc/PID/status lists one label per line, and the parent appears in the line labelled PPid. grep narrows it down and awk prints the value next to the label.',
      pt: 'O arquivo /proc/PID/status lista um rótulo por linha, e o pai aparece na linha rotulada PPid. O grep reduz para ela e o awk imprime o valor ao lado do rótulo.',
    },
    setupCommand:
      'killall listener.sh 2>/dev/null; for pid in $(pidof sleep); do kill $pid; done; sleep 1; mkdir -p /root/lab; rm -f /root/lab/parent.txt; sleep 1600 & sleep 1',
    checks: [
      {
        label: { en: 'the file holds a bare number', pt: 'o arquivo guarda um número puro' },
        command: 'grep -qE "^[0-9]+$" /root/lab/parent.txt',
      },
      {
        label: {
          en: 'it matches the PPid the kernel reports',
          pt: 'ele bate com o PPid que o kernel informa',
        },
        command: '[ "$(cat /root/lab/parent.txt)" = "$(awk \'/^PPid:/ {print $2}\' /proc/$(pidof sleep)/status)" ]',
      },
    ],
    solutionCommand: "awk '/^PPid:/ {print $2}' /proc/$(pidof sleep)/status > /root/lab/parent.txt",
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
