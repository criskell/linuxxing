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
