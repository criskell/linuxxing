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
    checkCommand: '[ "$(cat /root/lab/error-count.txt)" = "3" ]',
    solutionCommand: 'grep -c ERROR /root/lab/app.log > /root/lab/error-count.txt',
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
    checkCommand:
      '[ "$(head -1 /root/lab/top-hosts.txt)" = "10.0.0.3" ] && [ "$(sed -n 2p /root/lab/top-hosts.txt)" = "10.0.0.1" ] && [ "$(wc -l < /root/lab/top-hosts.txt)" = "2" ]',
    solutionCommand:
      "sort /root/lab/hosts.txt | uniq -c | sort -rn | head -2 | awk '{print $2}' > /root/lab/top-hosts.txt",
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
    setupCommand: 'mkdir -p /root/lab; printf "listen=0.0.0.0\\nport=8080\\nworkers=4\\n" > /root/lab/service.conf',
    checkCommand:
      'grep -q "^port=9090$" /root/lab/service.conf && grep -q "^listen=0.0.0.0$" /root/lab/service.conf && grep -q "^workers=4$" /root/lab/service.conf && [ "$(wc -l < /root/lab/service.conf)" = "3" ]',
    solutionCommand: "sed -i 's/^port=8080$/port=9090/' /root/lab/service.conf",
  },
];
