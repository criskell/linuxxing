import type { LabExercise, LabTrack } from './types';

export const textProcessingTrack: LabTrack = {
  id: 'text-processing',
  objectiveCode: '103.2, 103.7',
  title: { en: 'Text streams and filters', pt: 'Fluxos de texto e filtros' },
};

export const textProcessingExercises: LabExercise[] = [
  {
    id: 'count-error-lines',
    track: 'text-processing',
    title: { en: 'Count the error lines', pt: 'Conte as linhas de erro' },
    task: {
      en: 'Count how many lines of /root/lab/app.log contain the word ERROR and write only that number into /root/lab/error-count.txt.',
      pt: 'Conte quantas linhas de /root/lab/app.log contêm a palavra ERROR e escreva somente esse número em /root/lab/error-count.txt.',
    },
    hint: {
      en: 'grep -c prints how many lines matched instead of printing the lines, so a call to wc becomes unnecessary. The > operator sends that number into the file.',
      pt: 'O grep -c imprime quantas linhas casaram em vez de imprimir as linhas, o que dispensa uma chamada ao wc. O operador > manda esse número para o arquivo.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/error-count.txt; printf "INFO start\\nERROR disk full\\nINFO retry\\nERROR disk full\\nWARN slow response\\nERROR timeout\\nINFO done\\n" > /root/lab/app.log',
    checks: [
      {
        label: { en: 'error-count.txt exists', pt: 'error-count.txt existe' },
        command: '[ -f /root/lab/error-count.txt ]',
      },
      {
        label: { en: 'it holds 3 and nothing else', pt: 'ele guarda 3 e mais nada' },
        command: '[ "$(cat /root/lab/error-count.txt)" = "3" ]',
      },
    ],
    solutionCommand: 'grep -c ERROR /root/lab/app.log > /root/lab/error-count.txt',
  },
  {
    id: 'keep-only-the-errors',
    track: 'text-processing',
    title: { en: 'Keep only the error lines', pt: 'Fique só com as linhas de erro' },
    task: {
      en: 'Write into /root/lab/errors.txt every line of /root/lab/app.log that carries ERROR, in the same order they appear, leaving the INFO and WARN lines behind.',
      pt: 'Escreva em /root/lab/errors.txt cada linha de /root/lab/app.log que traz ERROR, na mesma ordem em que aparecem, deixando as linhas INFO e WARN de fora.',
    },
    hint: {
      en: 'Without -c, grep prints the matching lines themselves, already in the order it read them. Redirecting that output with > fills the new file in one pass.',
      pt: 'Sem o -c, o grep imprime as próprias linhas que casaram, já na ordem em que ele leu. Redirecionar essa saída com > preenche o arquivo novo em uma passada.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/errors.txt; printf "INFO start\\nERROR disk full\\nINFO retry\\nERROR disk full\\nWARN slow response\\nERROR timeout\\nINFO done\\n" > /root/lab/app.log',
    checks: [
      {
        label: {
          en: 'errors.txt has the three ERROR lines in order',
          pt: 'errors.txt tem as três linhas ERROR em ordem',
        },
        command: 'grep ERROR /root/lab/app.log | diff - /root/lab/errors.txt',
      },
      {
        label: { en: 'no INFO or WARN line slipped in', pt: 'nenhuma linha INFO ou WARN entrou junto' },
        command: '! grep -qE "INFO|WARN" /root/lab/errors.txt',
      },
    ],
    solutionCommand: 'grep ERROR /root/lab/app.log > /root/lab/errors.txt',
  },
  {
    id: 'rank-the-busiest-hosts',
    track: 'text-processing',
    title: { en: 'Rank the busiest hosts', pt: 'Ranqueie os hosts mais frequentes' },
    task: {
      en: 'The file /root/lab/hosts.txt holds one address per request. Write the two addresses that appear most often into /root/lab/top-hosts.txt, the most frequent one first, with no counts next to them.',
      pt: 'O arquivo /root/lab/hosts.txt guarda um endereço por requisição. Escreva os dois endereços que mais aparecem em /root/lab/top-hosts.txt, o mais frequente primeiro, sem os números de ocorrência ao lado.',
    },
    hint: {
      en: 'uniq -c only collapses lines that already sit next to each other, so sort runs first. After that, sort -rn orders by the count and awk prints the second column of each line.',
      pt: 'O uniq -c só agrupa linhas que já estão lado a lado, então o sort vem antes. Depois disso, o sort -rn ordena pela contagem e o awk imprime a segunda coluna de cada linha.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/top-hosts.txt; printf "10.0.0.3\\n10.0.0.1\\n10.0.0.3\\n10.0.0.2\\n10.0.0.3\\n10.0.0.1\\n" > /root/lab/hosts.txt',
    checks: [
      {
        label: { en: 'the first line is 10.0.0.3', pt: 'a primeira linha é 10.0.0.3' },
        command: '[ "$(head -1 /root/lab/top-hosts.txt)" = "10.0.0.3" ]',
      },
      {
        label: { en: 'the second line is 10.0.0.1', pt: 'a segunda linha é 10.0.0.1' },
        command: '[ "$(sed -n 2p /root/lab/top-hosts.txt)" = "10.0.0.1" ]',
      },
      {
        label: { en: 'the file stops at two lines', pt: 'o arquivo para em duas linhas' },
        command: '[ "$(wc -l < /root/lab/top-hosts.txt)" = "2" ]',
      },
    ],
    solutionCommand:
      "sort /root/lab/hosts.txt | uniq -c | sort -rn | head -2 | awk '{print $2}' > /root/lab/top-hosts.txt",
  },
  {
    id: 'pull-a-column-out-of-passwd',
    track: 'text-processing',
    title: { en: 'Pull one column out of /etc/passwd', pt: 'Tire uma coluna do /etc/passwd' },
    task: {
      en: 'Write into /root/lab/service-users.txt the name of every account in /etc/passwd whose login shell is /bin/false, one name per line, sorted alphabetically and with no other field around it.',
      pt: 'Escreva em /root/lab/service-users.txt o nome de cada conta do /etc/passwd cujo shell de login é /bin/false, um nome por linha, em ordem alfabética e sem nenhum outro campo em volta.',
    },
    hint: {
      en: 'Every line of /etc/passwd packs seven fields split by colons, the name first and the shell last. grep narrows the lines down, cut -d: -f1 keeps the first field, and sort puts the result in order.',
      pt: 'Cada linha do /etc/passwd junta sete campos separados por dois pontos, o nome primeiro e o shell por último. O grep reduz as linhas, o cut -d: -f1 fica com o primeiro campo, e o sort coloca o resultado em ordem.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/service-users.txt',
    checks: [
      {
        label: { en: 'service-users.txt exists', pt: 'service-users.txt existe' },
        command: '[ -f /root/lab/service-users.txt ]',
      },
      {
        label: {
          en: 'it matches the accounts whose shell is /bin/false, sorted',
          pt: 'ele bate com as contas cujo shell é /bin/false, ordenadas',
        },
        command: 'grep ":/bin/false$" /etc/passwd | cut -d: -f1 | sort | diff - /root/lab/service-users.txt',
      },
    ],
    solutionCommand: 'grep ":/bin/false$" /etc/passwd | cut -d: -f1 | sort > /root/lab/service-users.txt',
  },
  {
    id: 'sum-a-column-with-awk',
    track: 'text-processing',
    title: { en: 'Add up a column', pt: 'Some uma coluna' },
    task: {
      en: 'Each line of /root/lab/transfer.log ends with the number of bytes a request moved. Write the sum of that last column into /root/lab/total-bytes.txt, as a single number with nothing around it.',
      pt: 'Cada linha de /root/lab/transfer.log termina com a quantidade de bytes que uma requisição moveu. Escreva a soma dessa última coluna em /root/lab/total-bytes.txt, como um número sozinho e sem nada em volta.',
    },
    hint: {
      en: 'awk splits every line into fields and $NF names the last one. Adding it to a variable on each line and printing that variable in the END block gives the total after the last line is read.',
      pt: 'O awk divide cada linha em campos e o $NF nomeia o último. Somar ele em uma variável a cada linha e imprimir essa variável no bloco END dá o total depois que a última linha é lida.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/total-bytes.txt; printf "GET /index.html 200 1024\nGET /app.js 200 2048\nPOST /login 302 512\nGET /logo.png 200 4096\n" > /root/lab/transfer.log',
    checks: [
      {
        label: { en: 'total-bytes.txt holds 7680', pt: 'total-bytes.txt guarda 7680' },
        command: '[ "$(cat /root/lab/total-bytes.txt)" = "7680" ]',
      },
    ],
    solutionCommand: "awk '{ total += $NF } END { print total }' /root/lab/transfer.log > /root/lab/total-bytes.txt",
  },
  {
    id: 'cut-a-range-of-lines',
    track: 'text-processing',
    title: { en: 'Take a range of lines', pt: 'Pegue um intervalo de linhas' },
    task: {
      en: 'The file /root/lab/report.txt has twenty numbered lines. Write lines 8 through 12, and only those five, into /root/lab/slice.txt, keeping their order.',
      pt: 'O arquivo /root/lab/report.txt tem vinte linhas numeradas. Escreva as linhas 8 até 12, e só essas cinco, em /root/lab/slice.txt, mantendo a ordem delas.',
    },
    hint: {
      en: 'sed addresses a range with two line numbers separated by a comma, and the p command prints the matched lines. Adding -n turns off the automatic printing that would otherwise duplicate everything.',
      pt: 'O sed endereça um intervalo com dois números de linha separados por vírgula, e o comando p imprime as linhas casadas. Colocar o -n desliga a impressão automática que senão duplicaria tudo.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/slice.txt; seq 1 20 | sed "s/^/line /" > /root/lab/report.txt',
    checks: [
      {
        label: { en: 'slice.txt has five lines', pt: 'slice.txt tem cinco linhas' },
        command: '[ "$(wc -l < /root/lab/slice.txt)" = "5" ]',
      },
      {
        label: { en: 'it starts at line 8 and ends at line 12', pt: 'ele começa na linha 8 e termina na linha 12' },
        command: '[ "$(head -1 /root/lab/slice.txt)" = "line 8" ] && [ "$(tail -1 /root/lab/slice.txt)" = "line 12" ]',
      },
    ],
    solutionCommand: "sed -n '8,12p' /root/lab/report.txt > /root/lab/slice.txt",
  },
  {
    id: 'replace-a-string-across-files',
    track: 'text-processing',
    title: { en: 'Replace a string across many files', pt: 'Troque uma string em vários arquivos' },
    task: {
      en: 'Three of the config files under /root/lab/conf still point at the host old.example.com. Change every one of those mentions to new.example.com, in place, without touching the file that never mentioned it.',
      pt: 'Três dos arquivos de configuração em /root/lab/conf ainda apontam para o host old.example.com. Troque cada uma dessas menções por new.example.com, no próprio arquivo, sem mexer no arquivo que nunca citou ele.',
    },
    hint: {
      en: 'grep -rl prints only the names of the files that matched, which is exactly the list sed needs. xargs turns that list into arguments for a single sed -i call.',
      pt: 'O grep -rl imprime só os nomes dos arquivos que casaram, que é exatamente a lista de que o sed precisa. O xargs transforma essa lista em argumentos de uma única chamada do sed -i.',
    },
    setupCommand:
      'rm -rf /root/lab/conf; mkdir -p /root/lab/conf/sites; printf "upstream=old.example.com\n" > /root/lab/conf/api.conf; printf "backup=old.example.com\nport=80\n" > /root/lab/conf/web.conf; printf "host=old.example.com\n" > /root/lab/conf/sites/blog.conf; printf "port=443\n" > /root/lab/conf/tls.conf',
    checks: [
      {
        label: { en: 'no file mentions old.example.com anymore', pt: 'nenhum arquivo cita mais old.example.com' },
        command: '! grep -rq "old.example.com" /root/lab/conf',
      },
      {
        label: {
          en: 'the three files now point at new.example.com',
          pt: 'os três arquivos agora apontam para new.example.com',
        },
        command: '[ "$(grep -rl "new.example.com" /root/lab/conf | wc -l)" = "3" ]',
      },
      {
        label: { en: 'tls.conf came out untouched', pt: 'o tls.conf saiu intacto' },
        command: '[ "$(cat /root/lab/conf/tls.conf)" = "port=443" ]',
      },
    ],
    solutionCommand: 'grep -rl "old.example.com" /root/lab/conf | xargs sed -i "s/old.example.com/new.example.com/g"',
  },
  {
    id: 'count-the-distinct-values',
    track: 'text-processing',
    title: { en: 'Count the distinct values', pt: 'Conte os valores distintos' },
    task: {
      en: 'The file /root/lab/visits.txt repeats addresses. Write into /root/lab/distinct.txt how many different addresses show up, as a single number.',
      pt: 'O arquivo /root/lab/visits.txt repete endereços. Escreva em /root/lab/distinct.txt quantos endereços diferentes aparecem, como um número sozinho.',
    },
    hint: {
      en: 'sort -u drops the repeated lines and keeps one of each, and wc -l counts what comes out. Reading from standard input keeps the file name out of the count wc prints.',
      pt: 'O sort -u descarta as linhas repetidas e mantém uma de cada, e o wc -l conta o que sai. Ler da entrada padrão mantém o nome do arquivo fora da contagem que o wc imprime.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/distinct.txt; printf "10.0.0.1\n10.0.0.2\n10.0.0.1\n10.0.0.3\n10.0.0.2\n10.0.0.1\n10.0.0.4\n" > /root/lab/visits.txt',
    checks: [
      {
        label: { en: 'distinct.txt holds 4', pt: 'distinct.txt guarda 4' },
        command: '[ "$(cat /root/lab/distinct.txt)" = "4" ]',
      },
    ],
    solutionCommand: 'sort -u /root/lab/visits.txt | wc -l > /root/lab/distinct.txt',
  },
  {
    id: 'glue-two-files-into-a-csv',
    track: 'text-processing',
    title: { en: 'Glue two files into a CSV', pt: 'Junte dois arquivos em um CSV' },
    task: {
      en: 'The files /root/lab/names.txt and /root/lab/roles.txt hold matching lines. Write /root/lab/team.csv with one line per person, the name and the role separated by a single comma and no spaces around it.',
      pt: 'Os arquivos /root/lab/names.txt e /root/lab/roles.txt guardam linhas que se correspondem. Escreva /root/lab/team.csv com uma linha por pessoa, o nome e o papel separados por uma única vírgula e sem espaços em volta.',
    },
    hint: {
      en: 'paste reads several files at once and prints the first line of each side by side, then the second, and so on. The -d flag replaces the tab it uses by default with the character you pass.',
      pt: 'O paste lê vários arquivos de uma vez e imprime a primeira linha de cada um lado a lado, depois a segunda, e assim por diante. A flag -d troca a tabulação que ele usa por padrão pelo caractere que você passar.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/team.csv; printf "ana\nbruno\ncarla\n" > /root/lab/names.txt; printf "backend\nfrontend\nops\n" > /root/lab/roles.txt',
    checks: [
      {
        label: { en: 'the first line is ana,backend', pt: 'a primeira linha é ana,backend' },
        command: '[ "$(head -1 /root/lab/team.csv)" = "ana,backend" ]',
      },
      {
        label: { en: 'the last line is carla,ops', pt: 'a última linha é carla,ops' },
        command: '[ "$(tail -1 /root/lab/team.csv)" = "carla,ops" ]',
      },
      {
        label: { en: 'the file has three lines', pt: 'o arquivo tem três linhas' },
        command: '[ "$(wc -l < /root/lab/team.csv)" = "3" ]',
      },
    ],
    solutionCommand: 'paste -d, /root/lab/names.txt /root/lab/roles.txt > /root/lab/team.csv',
  },
  {
    id: 'edit-a-config-in-place',
    track: 'text-processing',
    title: { en: 'Edit a config file in place', pt: 'Edite um arquivo de configuração no lugar' },
    task: {
      en: 'In /root/lab/service.conf, change the port from 8080 to 9090. The other two lines stay exactly as they are, the file keeps its three lines, and no second file appears.',
      pt: 'Em /root/lab/service.conf, mude a porta de 8080 para 9090. As outras duas linhas ficam exatamente como estão, o arquivo continua com três linhas e nenhum segundo arquivo aparece.',
    },
    hint: {
      en: 'sed -i rewrites the file it reads. The s/old/new/ command replaces the first match on each line, and anchoring the pattern with ^ and $ keeps it from touching anything else.',
      pt: 'O sed -i reescreve o próprio arquivo que ele lê. O comando s/velho/novo/ troca a primeira ocorrência de cada linha, e ancorar o padrão com ^ e $ evita que ele mexa em qualquer outra coisa.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/service.conf.bak; printf "listen=0.0.0.0\\nport=8080\\nworkers=4\\n" > /root/lab/service.conf',
    checks: [
      {
        label: { en: 'the port line now reads 9090', pt: 'a linha da porta agora diz 9090' },
        command: 'grep -q "^port=9090$" /root/lab/service.conf',
      },
      {
        label: { en: 'listen and workers came out untouched', pt: 'listen e workers saíram intactos' },
        command: 'grep -q "^listen=0.0.0.0$" /root/lab/service.conf && grep -q "^workers=4$" /root/lab/service.conf',
      },
      {
        label: { en: 'the file still has three lines', pt: 'o arquivo continua com três linhas' },
        command: '[ "$(wc -l < /root/lab/service.conf)" = "3" ]',
      },
    ],
    solutionCommand: "sed -i 's/^port=8080$/port=9090/' /root/lab/service.conf",
  },
];
