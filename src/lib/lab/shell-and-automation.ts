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
    id: 'write-a-loop-in-a-script',
    track: 'shell-and-automation',
    title: { en: 'Number the lines with a loop', pt: 'Numere as linhas com um laço' },
    task: {
      en: 'Write an executable /root/lab/number.sh that reads the file whose path it receives as the first argument and prints every line with its position and a colon in front, so the first line comes out as 1: alpha.',
      pt: 'Escreva um /root/lab/number.sh executável que leia o arquivo cujo caminho ele recebe como primeiro argumento e imprima cada linha com a posição e dois pontos na frente, de modo que a primeira linha saia como 1: alpha.',
    },
    hint: {
      en: 'A while loop with read pulls one line at a time from standard input, and redirecting the file into the loop feeds it. A counter variable raised with $((counter + 1)) on every pass gives the position.',
      pt: 'Um laço while com read puxa uma linha por vez da entrada padrão, e redirecionar o arquivo para dentro do laço alimenta ele. Uma variável de contagem aumentada com $((contador + 1)) a cada passagem dá a posição.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/number.sh; printf "alpha\nbeta\ngamma\n" > /root/lab/words.txt',
    checks: [
      {
        label: { en: 'number.sh is executable', pt: 'number.sh é executável' },
        command: '[ -x /root/lab/number.sh ]',
      },
      {
        label: { en: 'the first line comes out as 1: alpha', pt: 'a primeira linha sai como 1: alpha' },
        command: '[ "$(/root/lab/number.sh /root/lab/words.txt | head -1)" = "1: alpha" ]',
      },
      {
        label: { en: 'the third line comes out as 3: gamma', pt: 'a terceira linha sai como 3: gamma' },
        command: '[ "$(/root/lab/number.sh /root/lab/words.txt | sed -n 3p)" = "3: gamma" ]',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\nn=0\\nwhile read line; do n=$((n + 1)); echo "$n: $line"; done < "$1"\\n\' > /root/lab/number.sh && chmod +x /root/lab/number.sh',
  },
  {
    id: 'refuse-to-run-without-arguments',
    track: 'shell-and-automation',
    title: { en: 'Refuse to run without arguments', pt: 'Recuse rodar sem argumentos' },
    task: {
      en: 'Write an executable /root/lab/backup.sh that prints usage: backup.sh FILE on the error output and exits with code 2 when it gets no argument, and prints backing up FILE and exits with 0 when it gets one.',
      pt: 'Escreva um /root/lab/backup.sh executável que imprima usage: backup.sh FILE na saída de erro e termine com código 2 quando não receber argumento, e imprima backing up ARQUIVO e termine com 0 quando receber um.',
    },
    hint: {
      en: 'The variable $# holds how many arguments came in, so a test against 0 catches the empty call. Writing to the error output means redirecting inside the script with >&2, and exit picks the code the shell reports in $?.',
      pt: 'A variável $# guarda quantos argumentos chegaram, então um teste contra 0 pega a chamada vazia. Escrever na saída de erro significa redirecionar dentro do script com >&2, e o exit escolhe o código que o shell informa no $?.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/backup.sh',
    checks: [
      {
        label: { en: 'without arguments it exits with 2', pt: 'sem argumento ele termina com 2' },
        command: '/root/lab/backup.sh >/dev/null 2>&1; [ "$?" = "2" ]',
      },
      {
        label: { en: 'the usage line goes to the error output', pt: 'a linha de uso vai para a saída de erro' },
        command: '[ "$(/root/lab/backup.sh 2>&1 >/dev/null)" = "usage: backup.sh FILE" ]',
      },
      {
        label: { en: 'with an argument it reports and exits with 0', pt: 'com argumento ele avisa e termina com 0' },
        command: '[ "$(/root/lab/backup.sh notes.txt)" = "backing up notes.txt" ]',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\nif [ $# -eq 0 ]; then echo "usage: backup.sh FILE" >&2; exit 2; fi\\necho "backing up $1"\\n\' > /root/lab/backup.sh && chmod +x /root/lab/backup.sh',
  },
  {
    id: 'branch-with-a-case',
    track: 'shell-and-automation',
    title: { en: 'Branch on the first argument', pt: 'Ramifique pelo primeiro argumento' },
    task: {
      en: 'Write an executable /root/lab/service.sh that answers starting for the argument start, stopping for stop, and unknown action for anything else, printing nothing more in each case.',
      pt: 'Escreva um /root/lab/service.sh executável que responda starting para o argumento start, stopping para stop, e unknown action para qualquer outra coisa, sem imprimir nada além disso em cada caso.',
    },
    hint: {
      en: 'case compares one value against a list of patterns and runs the branch that matches, with each branch closed by two semicolons. A single asterisk as the last pattern catches everything that fell through.',
      pt: 'O case compara um valor com uma lista de padrões e roda o ramo que casar, com cada ramo fechado por dois pontos e vírgula. Um asterisco sozinho como último padrão pega tudo que não casou antes.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/service.sh',
    checks: [
      {
        label: { en: 'start prints starting', pt: 'start imprime starting' },
        command: '[ "$(/root/lab/service.sh start)" = "starting" ]',
      },
      {
        label: { en: 'stop prints stopping', pt: 'stop imprime stopping' },
        command: '[ "$(/root/lab/service.sh stop)" = "stopping" ]',
      },
      {
        label: { en: 'anything else prints unknown action', pt: 'qualquer outra coisa imprime unknown action' },
        command: '[ "$(/root/lab/service.sh dance)" = "unknown action" ]',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\ncase "$1" in\\n  start) echo starting ;;\\n  stop) echo stopping ;;\\n  *) echo "unknown action" ;;\\nesac\\n\' > /root/lab/service.sh && chmod +x /root/lab/service.sh',
  },
  {
    id: 'reuse-code-with-a-function',
    track: 'shell-and-automation',
    title: { en: 'Reuse code with a function', pt: 'Reaproveite código com uma função' },
    task: {
      en: 'Write an executable /root/lab/report.sh that defines a function named banner and calls it twice, once with build and once with deploy, so the script prints == build == on the first line and == deploy == on the second.',
      pt: 'Escreva um /root/lab/report.sh executável que defina uma função chamada banner e chame ela duas vezes, uma com build e outra com deploy, de modo que o script imprima == build == na primeira linha e == deploy == na segunda.',
    },
    hint: {
      en: 'A function in the shell is a name followed by parentheses and a block in braces, and inside it $1 means the argument the call passed, not the argument of the script. The definition has to come before the first call.',
      pt: 'Uma função no shell é um nome seguido de parênteses e um bloco entre chaves, e lá dentro o $1 significa o argumento que a chamada passou, não o argumento do script. A definição precisa vir antes da primeira chamada.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/report.sh',
    checks: [
      {
        label: { en: 'report.sh is executable', pt: 'report.sh é executável' },
        command: '[ -x /root/lab/report.sh ]',
      },
      {
        label: { en: 'it defines a function named banner', pt: 'ele define uma função chamada banner' },
        command: 'grep -q "banner *(" /root/lab/report.sh',
      },
      {
        label: { en: 'the two banners come out in order', pt: 'os dois banners saem em ordem' },
        command:
          '[ "$(/root/lab/report.sh | head -1)" = "== build ==" ] && [ "$(/root/lab/report.sh | sed -n 2p)" = "== deploy ==" ]',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\nbanner() { echo "== $1 =="; }\\nbanner build\\nbanner deploy\\n\' > /root/lab/report.sh && chmod +x /root/lab/report.sh',
  },
  {
    id: 'write-a-config-with-a-here-document',
    track: 'shell-and-automation',
    title: { en: 'Write a file with a here document', pt: 'Escreva um arquivo com here document' },
    task: {
      en: 'Using a single here document, write /root/lab/app.conf with three lines, name=linuxxing, then port=8080, then debug=false, in that order.',
      pt: 'Usando um único here document, escreva /root/lab/app.conf com três linhas, name=linuxxing, depois port=8080, depois debug=false, nessa ordem.',
    },
    hint: {
      en: 'A here document starts with two less than signs and a word of your choice, feeds every following line to the command as standard input, and stops at the line holding that word alone. cat with a redirect turns that input into a file.',
      pt: 'Um here document começa com dois sinais de menor e uma palavra escolhida por você, entrega cada linha seguinte ao comando como entrada padrão, e para na linha que tiver essa palavra sozinha. O cat com um redirecionamento transforma essa entrada em arquivo.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/app.conf',
    checks: [
      {
        label: { en: 'the three lines are there in order', pt: 'as três linhas estão lá em ordem' },
        command:
          '[ "$(head -1 /root/lab/app.conf)" = "name=linuxxing" ] && [ "$(sed -n 2p /root/lab/app.conf)" = "port=8080" ] && [ "$(sed -n 3p /root/lab/app.conf)" = "debug=false" ]',
      },
      {
        label: { en: 'nothing else was written', pt: 'nada além disso foi escrito' },
        command: '[ "$(wc -l < /root/lab/app.conf)" = "3" ]',
      },
    ],
    solutionCommand: 'cat > /root/lab/app.conf <<CONF\nname=linuxxing\nport=8080\ndebug=false\nCONF',
  },
  {
    id: 'schedule-two-entries',
    track: 'shell-and-automation',
    title: { en: 'Schedule a weekday job and a monthly one', pt: 'Agende uma tarefa em dias úteis e uma mensal' },
    task: {
      en: 'Give root a crontab with exactly two entries, one running /root/lab/report.sh at 7:15 from Monday to Friday, and another running /root/lab/backup.sh at midnight on the first day of every month.',
      pt: 'Dê ao root uma crontab com exatamente duas entradas, uma rodando /root/lab/report.sh às 7:15 de segunda a sexta, e outra rodando /root/lab/backup.sh à meia noite no primeiro dia de cada mês.',
    },
    hint: {
      en: 'The fifth field takes the day of the week, where 1 is Monday, and a hyphen writes a range like 1-5. Midnight on the first day means minute 0, hour 0, day of month 1, with an asterisk on month and weekday.',
      pt: 'O quinto campo recebe o dia da semana, em que 1 é segunda, e um hífen escreve um intervalo como 1-5. Meia noite do primeiro dia significa minuto 0, hora 0, dia do mês 1, com asterisco no mês e no dia da semana.',
    },
    setupCommand: 'mkdir -p /var/spool/cron/crontabs /root/lab; crontab -r 2>/dev/null; true',
    checks: [
      {
        label: { en: 'the crontab holds two entries', pt: 'a crontab tem duas entradas' },
        command: '[ "$(crontab -l | awk \'$1 !~ /^#/ && NF >= 6\' | wc -l)" = "2" ]',
      },
      {
        label: { en: 'the weekday entry is there', pt: 'a entrada de dias úteis está lá' },
        command: 'crontab -l | awk \'{print $1, $2, $3, $4, $5, $6}\' | grep -qxF "15 7 * * 1-5 /root/lab/report.sh"',
      },
      {
        label: { en: 'the monthly entry is there', pt: 'a entrada mensal está lá' },
        command: 'crontab -l | awk \'{print $1, $2, $3, $4, $5, $6}\' | grep -qxF "0 0 1 * * /root/lab/backup.sh"',
      },
    ],
    solutionCommand:
      'printf "15 7 * * 1-5 /root/lab/report.sh\\n0 0 1 * * /root/lab/backup.sh\\n" > /tmp/two-cron && crontab /tmp/two-cron',
  },
  {
    id: 'format-numbers-with-printf',
    track: 'shell-and-automation',
    title: { en: 'Format numbers with printf', pt: 'Formate números com printf' },
    task: {
      en: 'Write an executable /root/lab/invoice.sh that takes a number as first argument and prints it padded with zeros to five digits, followed by a space and the word paid, so 42 comes out as 00042 paid.',
      pt: 'Escreva um /root/lab/invoice.sh executável que receba um número como primeiro argumento e imprima ele preenchido com zeros até cinco dígitos, seguido de um espaço e da palavra paid, de modo que 42 saia como 00042 paid.',
    },
    hint: {
      en: 'printf takes a format string where %d prints a number and a zero before the width pads with zeros instead of spaces. Unlike echo, it prints no line break unless the format asks for one.',
      pt: 'O printf recebe um formato em que o %d imprime um número e um zero antes da largura preenche com zeros em vez de espaços. Diferente do echo, ele não imprime quebra de linha a menos que o formato peça.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/invoice.sh',
    checks: [
      {
        label: { en: 'invoice.sh is executable', pt: 'invoice.sh é executável' },
        command: '[ -x /root/lab/invoice.sh ]',
      },
      {
        label: { en: '42 comes out as 00042 paid', pt: '42 sai como 00042 paid' },
        command: '[ "$(/root/lab/invoice.sh 42)" = "00042 paid" ]',
      },
      {
        label: { en: '7 comes out as 00007 paid', pt: '7 sai como 00007 paid' },
        command: '[ "$(/root/lab/invoice.sh 7)" = "00007 paid" ]',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\nprintf "%%05d paid\\\\n" "$1"\\n\' > /root/lab/invoice.sh && chmod +x /root/lab/invoice.sh',
  },
  {
    id: 'do-arithmetic-in-the-shell',
    track: 'shell-and-automation',
    title: { en: 'Add up numbers in the shell', pt: 'Some números no shell' },
    task: {
      en: 'The file /root/lab/sizes.txt holds one number per line. Write an executable /root/lab/total.sh that adds them all up with shell arithmetic and prints only the total, which for this file is 150.',
      pt: 'O arquivo /root/lab/sizes.txt tem um número por linha. Escreva um /root/lab/total.sh executável que some todos eles com aritmética de shell e imprima só o total, que para este arquivo é 150.',
    },
    hint: {
      en: 'The shell evaluates arithmetic inside double parentheses preceded by a dollar sign, so a running total grows with total=$((total + value)). A while loop with read feeds one number at a time.',
      pt: 'O shell avalia aritmética dentro de parênteses duplos precedidos de cifrão, então um acumulador cresce com total=$((total + valor)). Um laço while com read entrega um número por vez.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/total.sh; printf "10\n20\n30\n40\n50\n" > /root/lab/sizes.txt',
    checks: [
      {
        label: { en: 'total.sh is executable', pt: 'total.sh é executável' },
        command: '[ -x /root/lab/total.sh ]',
      },
      {
        label: { en: 'it prints 150 for this file', pt: 'ele imprime 150 para este arquivo' },
        command: '[ "$(/root/lab/total.sh)" = "150" ]',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\ntotal=0\\nwhile read n; do total=$((total + n)); done < /root/lab/sizes.txt\\necho "$total"\\n\' > /root/lab/total.sh && chmod +x /root/lab/total.sh',
  },
  {
    id: 'walk-over-the-arguments',
    track: 'shell-and-automation',
    title: { en: 'Walk over every argument', pt: 'Percorra todos os argumentos' },
    task: {
      en: 'Write an executable /root/lab/each.sh that prints one line per argument it receives, each line reading arg: followed by the argument, and prints nothing at all when it receives none.',
      pt: 'Escreva um /root/lab/each.sh executável que imprima uma linha por argumento recebido, cada linha dizendo arg: seguido do argumento, e não imprima nada quando não receber nenhum.',
    },
    hint: {
      en: 'A for loop without a list walks over the arguments of the script, and writing "$@" between double quotes keeps arguments with spaces in one piece. With no arguments the loop body simply never runs.',
      pt: 'Um for sem lista percorre os argumentos do script, e escrever "$@" entre aspas duplas mantém inteiros os argumentos com espaço. Sem argumentos, o corpo do laço simplesmente não roda.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/each.sh',
    checks: [
      {
        label: { en: 'three arguments produce three lines', pt: 'três argumentos produzem três linhas' },
        command: '[ "$(/root/lab/each.sh a b c | wc -l)" = "3" ]',
      },
      {
        label: { en: 'the second line reads arg: b', pt: 'a segunda linha diz arg: b' },
        command: '[ "$(/root/lab/each.sh a b c | sed -n 2p)" = "arg: b" ]',
      },
      {
        label: { en: 'no argument produces no output', pt: 'nenhum argumento não produz saída' },
        command: '[ -z "$(/root/lab/each.sh)" ]',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\nfor a in "$@"; do echo "arg: $a"; done\\n\' > /root/lab/each.sh && chmod +x /root/lab/each.sh',
  },
  {
    id: 'put-a-directory-in-the-path',
    track: 'shell-and-automation',
    title: { en: 'Put your own directory in the PATH', pt: 'Coloque seu diretório no PATH' },
    task: {
      en: 'The executable /root/lab/bin/greet-tool runs fine by full path. Change the PATH of this shell so that typing greet-tool alone finds it, keeping every directory that was already in the PATH.',
      pt: 'O executável /root/lab/bin/greet-tool roda bem pelo caminho completo. Mude o PATH deste shell para que digitar só greet-tool encontre ele, mantendo todos os diretórios que já estavam no PATH.',
    },
    hint: {
      en: 'The PATH is a list of directories separated by colons, and the shell walks it from left to right looking for the name you typed. Rebuilding it with the old value inside keeps the directories that were there, and export makes the change reach the commands you run.',
      pt: 'O PATH é uma lista de diretórios separados por dois pontos, e o shell percorre ela da esquerda para a direita procurando o nome digitado. Remontar ele com o valor antigo dentro mantém os diretórios que estavam lá, e o export faz a mudança chegar aos comandos que você roda.',
    },
    setupCommand:
      'PATH=/usr/sbin:/usr/bin:/sbin:/bin; export PATH; rm -rf /root/lab/bin; mkdir -p /root/lab/bin; printf "#!/bin/sh\necho tool ran\n" > /root/lab/bin/greet-tool; chmod +x /root/lab/bin/greet-tool',
    checks: [
      {
        label: { en: 'the PATH mentions /root/lab/bin', pt: 'o PATH cita /root/lab/bin' },
        command: 'echo "$PATH" | grep -q "/root/lab/bin"',
      },
      {
        label: { en: 'the shell finds greet-tool by name', pt: 'o shell acha o greet-tool pelo nome' },
        command: '[ "$(command -v greet-tool)" = "/root/lab/bin/greet-tool" ]',
      },
      {
        label: { en: 'the usual directories are still there', pt: 'os diretórios de sempre continuam lá' },
        command: 'echo "$PATH" | grep -q "/usr/bin"',
      },
    ],
    solutionCommand: 'PATH=/root/lab/bin:$PATH; export PATH',
  },
  {
    id: 'decide-with-exit-codes',
    track: 'shell-and-automation',
    title: { en: 'Decide from an exit code', pt: 'Decida pelo código de saída' },
    task: {
      en: 'Write an executable /root/lab/scan.sh that receives a file path, writes found into /root/lab/scan-result.txt when that file contains the word ERROR, and writes clean there when it does not, deciding by the exit code of the search and not by its output.',
      pt: 'Escreva um /root/lab/scan.sh executável que receba um caminho de arquivo, escreva found em /root/lab/scan-result.txt quando esse arquivo contiver a palavra ERROR, e escreva clean quando não contiver, decidindo pelo código de saída da busca e não pela saída dela.',
    },
    hint: {
      en: 'grep -q prints nothing and answers with its exit code alone, zero when it matched. Chaining with double ampersand runs the next command after a success and double pipe runs it after a failure.',
      pt: 'O grep -q não imprime nada e responde só pelo código de saída, zero quando casou. Encadear com e comercial duplo roda o próximo comando depois de um sucesso, e barra vertical dupla roda depois de uma falha.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/scan.sh /root/lab/scan-result.txt; printf "INFO ok\nERROR broken\n" > /root/lab/with-errors.log; printf "INFO ok\nINFO done\n" > /root/lab/without-errors.log',
    checks: [
      {
        label: { en: 'scan.sh is executable', pt: 'scan.sh é executável' },
        command: '[ -x /root/lab/scan.sh ]',
      },
      {
        label: { en: 'a log with ERROR gives found', pt: 'um log com ERROR dá found' },
        command:
          '/root/lab/scan.sh /root/lab/with-errors.log >/dev/null 2>&1; [ "$(cat /root/lab/scan-result.txt)" = "found" ]',
      },
      {
        label: { en: 'a log without ERROR gives clean', pt: 'um log sem ERROR dá clean' },
        command:
          '/root/lab/scan.sh /root/lab/without-errors.log >/dev/null 2>&1; [ "$(cat /root/lab/scan-result.txt)" = "clean" ]',
      },
    ],
    solutionCommand:
      'printf \'#!/bin/sh\\ngrep -q ERROR "$1" && echo found > /root/lab/scan-result.txt || echo clean > /root/lab/scan-result.txt\\n\' > /root/lab/scan.sh && chmod +x /root/lab/scan.sh',
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
