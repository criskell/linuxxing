import type { LabExercise, LabTrack } from './types';

export const filesAndDirectoriesTrack: LabTrack = {
  id: 'files-and-directories',
  objectiveCode: '103.3',
  title: { en: 'Files and directories', pt: 'Arquivos e diretórios' },
};

export const filesAndDirectoriesExercises: LabExercise[] = [
  {
    id: 'build-a-directory-tree',
    track: 'files-and-directories',
    title: { en: 'Build a directory tree', pt: 'Monte uma árvore de diretórios' },
    task: {
      en: 'Inside /root/lab, create a directory named project holding two subdirectories, src and docs, plus an empty file named notes.txt sitting next to them.',
      pt: 'Dentro de /root/lab, crie um diretório chamado project com dois subdiretórios, src e docs, mais um arquivo vazio chamado notes.txt ao lado deles.',
    },
    hint: {
      en: 'mkdir -p creates every missing level of a path in a single call, and it accepts more than one path at a time. An empty file comes from touch.',
      pt: 'O mkdir -p cria todos os níveis que faltam de um caminho de uma vez, e aceita mais de um caminho na mesma chamada. Um arquivo vazio sai do touch.',
    },
    setupCommand: 'rm -rf /root/lab/project; mkdir -p /root/lab',
    checks: [
      {
        label: { en: 'project/src is a directory', pt: 'project/src é um diretório' },
        command: '[ -d /root/lab/project/src ]',
      },
      {
        label: { en: 'project/docs is a directory', pt: 'project/docs é um diretório' },
        command: '[ -d /root/lab/project/docs ]',
      },
      {
        label: { en: 'project/notes.txt exists and is empty', pt: 'project/notes.txt existe e está vazio' },
        command: '[ -f /root/lab/project/notes.txt ] && [ ! -s /root/lab/project/notes.txt ]',
      },
    ],
    solutionCommand: 'mkdir -p /root/lab/project/src /root/lab/project/docs && touch /root/lab/project/notes.txt',
  },
  {
    id: 'copy-then-rename',
    track: 'files-and-directories',
    title: { en: 'Copy a file, then rename it', pt: 'Copie um arquivo e depois renomeie' },
    task: {
      en: 'Copy /root/lab/report.txt into /root/lab/backup under the same name, then rename the original to report-final.txt. When you finish, /root/lab/report.txt no longer exists.',
      pt: 'Copie /root/lab/report.txt para /root/lab/backup com o mesmo nome e depois renomeie o original para report-final.txt. Ao terminar, /root/lab/report.txt não existe mais.',
    },
    hint: {
      en: 'cp leaves the original where it is. Renaming is the same operation as moving, so mv handles it when the destination sits in the same directory.',
      pt: 'O cp deixa o original onde está. Renomear é a mesma operação de mover, então o mv resolve quando o destino fica no mesmo diretório.',
    },
    setupCommand:
      'rm -rf /root/lab/backup /root/lab/report-final.txt; mkdir -p /root/lab/backup; printf "quarterly numbers\\n" > /root/lab/report.txt',
    checks: [
      {
        label: {
          en: 'backup/report.txt keeps the original content',
          pt: 'backup/report.txt mantém o conteúdo original',
        },
        command: 'grep -qx "quarterly numbers" /root/lab/backup/report.txt',
      },
      {
        label: { en: 'report-final.txt exists', pt: 'report-final.txt existe' },
        command: '[ -f /root/lab/report-final.txt ]',
      },
      {
        label: { en: 'the old report.txt is gone', pt: 'o antigo report.txt sumiu' },
        command: '[ ! -e /root/lab/report.txt ]',
      },
    ],
    solutionCommand: 'cp /root/lab/report.txt /root/lab/backup/ && mv /root/lab/report.txt /root/lab/report-final.txt',
  },
  {
    id: 'collect-log-paths',
    track: 'files-and-directories',
    title: { en: 'Collect every log path', pt: 'Junte os caminhos dos logs' },
    task: {
      en: 'Write the full path of every file ending in .log under /root/lab/service into /root/lab/logs-found.txt, one path per line, in alphabetical order. The settings.conf file stays out of the list.',
      pt: 'Escreva o caminho completo de cada arquivo terminado em .log dentro de /root/lab/service no arquivo /root/lab/logs-found.txt, um caminho por linha, em ordem alfabética. O settings.conf fica fora da lista.',
    },
    hint: {
      en: 'find walks the whole tree below the directory you give it, and -name compares the file name with a pattern. Quote the pattern so the shell hands the asterisk to find instead of expanding it first.',
      pt: 'O find percorre toda a árvore abaixo do diretório que você passar, e o -name compara o nome do arquivo com um padrão. Coloque o padrão entre aspas para o shell entregar o asterisco ao find em vez de expandir antes.',
    },
    setupCommand:
      'rm -rf /root/lab/service /root/lab/logs-found.txt; mkdir -p /root/lab/service/old /root/lab/service/current; touch /root/lab/service/current/access.log /root/lab/service/old/error.log /root/lab/service/current/settings.conf',
    checks: [
      {
        label: { en: 'logs-found.txt exists', pt: 'logs-found.txt existe' },
        command: '[ -f /root/lab/logs-found.txt ]',
      },
      {
        label: {
          en: 'it lists both .log files, sorted and with nothing else',
          pt: 'ele lista os dois arquivos .log, ordenados e sem mais nada',
        },
        command: 'find /root/lab/service -name "*.log" | sort | diff - /root/lab/logs-found.txt',
      },
    ],
    solutionCommand: 'find /root/lab/service -name "*.log" | sort > /root/lab/logs-found.txt',
  },
  {
    id: 'link-the-same-file-twice',
    track: 'files-and-directories',
    title: { en: 'Link the same file twice', pt: 'Aponte para o mesmo arquivo duas vezes' },
    task: {
      en: 'From /root/lab, point two new names at notes.txt: report-hard.txt as a hard link, sharing the inode, and report-soft.txt as a symbolic link carrying the text notes.txt inside it.',
      pt: 'A partir de /root/lab, aponte dois nomes novos para notes.txt: report-hard.txt como link físico, dividindo o mesmo inode, e report-soft.txt como link simbólico guardando o texto notes.txt dentro dele.',
    },
    hint: {
      en: 'ln without flags creates a hard link, a second name for the very same inode. ln -s creates a symbolic link, a small file holding the path it points to, which ls -i and readlink expose in different ways.',
      pt: 'O ln sem flags cria um link físico, um segundo nome para o mesmo inode. O ln -s cria um link simbólico, um arquivo pequeno guardando o caminho para onde aponta, o que ls -i e readlink mostram de formas diferentes.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/report-hard.txt /root/lab/report-soft.txt; printf "first line\\nsecond line\\n" > /root/lab/notes.txt',
    checks: [
      {
        label: {
          en: 'report-hard.txt shares the inode of notes.txt',
          pt: 'report-hard.txt divide o inode de notes.txt',
        },
        command:
          '[ "$(ls -i /root/lab/report-hard.txt | awk \'{print $1}\')" = "$(ls -i /root/lab/notes.txt | awk \'{print $1}\')" ]',
      },
      {
        label: { en: 'report-soft.txt is a symbolic link', pt: 'report-soft.txt é um link simbólico' },
        command: '[ -L /root/lab/report-soft.txt ]',
      },
      {
        label: { en: 'the symbolic link points at notes.txt', pt: 'o link simbólico aponta para notes.txt' },
        command: '[ "$(readlink /root/lab/report-soft.txt)" = "notes.txt" ]',
      },
    ],
    solutionCommand: 'cd /root/lab && ln notes.txt report-hard.txt && ln -s notes.txt report-soft.txt && cd /root',
  },
  {
    id: 'find-the-heavy-files',
    track: 'files-and-directories',
    title: { en: 'Find the heavy files', pt: 'Ache os arquivos pesados' },
    task: {
      en: 'Under /root/lab/store there are files of very different sizes. Write the path of every file larger than 100 kilobytes into /root/lab/big-files.txt, in alphabetical order, leaving the small ones out.',
      pt: 'Dentro de /root/lab/store existem arquivos de tamanhos bem diferentes. Escreva o caminho de cada arquivo maior que 100 kilobytes em /root/lab/big-files.txt, em ordem alfabética, deixando os pequenos de fora.',
    },
    hint: {
      en: 'find takes a -size test, and the suffix picks the unit, k for kilobytes. A plus sign in front of the number means larger than that, and sort puts the paths in order before they reach the file.',
      pt: 'O find aceita um teste -size, e o sufixo escolhe a unidade, k para kilobytes. Um sinal de mais na frente do número significa maior que aquilo, e o sort coloca os caminhos em ordem antes de chegarem ao arquivo.',
    },
    setupCommand:
      'rm -rf /root/lab/store /root/lab/big-files.txt; mkdir -p /root/lab/store/archive; dd if=/dev/zero of=/root/lab/store/dump.bin bs=1k count=300 2>/dev/null; dd if=/dev/zero of=/root/lab/store/archive/backup.bin bs=1k count=250 2>/dev/null; printf "tiny\n" > /root/lab/store/notes.txt; printf "small\n" > /root/lab/store/archive/readme.txt',
    checks: [
      {
        label: { en: 'big-files.txt exists', pt: 'big-files.txt existe' },
        command: '[ -f /root/lab/big-files.txt ]',
      },
      {
        label: {
          en: 'it lists the two large files, sorted',
          pt: 'ele lista os dois arquivos grandes, ordenados',
        },
        command: 'find /root/lab/store -size +100k -type f | sort | diff - /root/lab/big-files.txt',
      },
    ],
    solutionCommand: 'find /root/lab/store -size +100k -type f | sort > /root/lab/big-files.txt',
  },
  {
    id: 'copy-a-tree-and-prune-it',
    track: 'files-and-directories',
    title: { en: 'Copy a tree, then prune the copy', pt: 'Copie uma árvore e depois limpe a cópia' },
    task: {
      en: 'Copy the whole /root/lab/site directory into /root/lab/site-backup, keeping the subdirectories, and then delete every file ending in .tmp inside the copy. The original keeps its .tmp files untouched.',
      pt: 'Copie o diretório /root/lab/site inteiro para /root/lab/site-backup, mantendo os subdiretórios, e depois apague todo arquivo terminado em .tmp dentro da cópia. O original mantém os arquivos .tmp intactos.',
    },
    hint: {
      en: 'cp needs -r to walk into subdirectories. After the copy, find lists what has to go and -exec runs rm on each match, with the braces standing for the file it found and a quoted semicolon closing the command.',
      pt: 'O cp precisa do -r para entrar nos subdiretórios. Depois da cópia, o find lista o que precisa sair e o -exec roda o rm em cada resultado, com as chaves representando o arquivo encontrado e um ponto e vírgula entre aspas fechando o comando.',
    },
    setupCommand:
      'rm -rf /root/lab/site /root/lab/site-backup; mkdir -p /root/lab/site/css /root/lab/site/img; touch /root/lab/site/index.html /root/lab/site/css/main.css /root/lab/site/img/logo.png /root/lab/site/draft.tmp /root/lab/site/css/cache.tmp',
    checks: [
      {
        label: { en: 'the copy carries the subdirectories', pt: 'a cópia carrega os subdiretórios' },
        command: '[ -f /root/lab/site-backup/css/main.css ] && [ -f /root/lab/site-backup/img/logo.png ]',
      },
      {
        label: { en: 'no .tmp file is left in the copy', pt: 'nenhum arquivo .tmp sobrou na cópia' },
        command: '[ -z "$(find /root/lab/site-backup -name "*.tmp")" ]',
      },
      {
        label: { en: 'the original still has both .tmp files', pt: 'o original ainda tem os dois arquivos .tmp' },
        command: '[ "$(find /root/lab/site -name "*.tmp" | wc -l)" = "2" ]',
      },
    ],
    solutionCommand:
      'cp -r /root/lab/site /root/lab/site-backup && find /root/lab/site-backup -name "*.tmp" -exec rm {} ";"',
  },
  {
    id: 'rename-a-batch-of-files',
    track: 'files-and-directories',
    title: { en: 'Rename a batch of files', pt: 'Renomeie um lote de arquivos' },
    task: {
      en: 'The three files in /root/lab/notes end in .txt and should end in .md instead. Rename all of them in one go, keeping the part of the name before the dot and the content of each file.',
      pt: 'Os três arquivos em /root/lab/notes terminam em .txt e deveriam terminar em .md. Renomeie todos de uma vez, mantendo a parte do nome antes do ponto e o conteúdo de cada arquivo.',
    },
    hint: {
      en: 'A for loop walks over the result of a glob, and inside it basename strips the old extension away. Building the new name with that stripped part plus .md is what mv receives as destination.',
      pt: 'Um for percorre o resultado de um glob, e dentro dele o basename tira a extensão antiga. Montar o nome novo com essa parte sem extensão mais .md é o que o mv recebe como destino.',
    },
    setupCommand:
      'rm -rf /root/lab/notes; mkdir -p /root/lab/notes; printf "alpha\n" > /root/lab/notes/one.txt; printf "beta\n" > /root/lab/notes/two.txt; printf "gamma\n" > /root/lab/notes/three.txt',
    checks: [
      {
        label: { en: 'no .txt file is left', pt: 'nenhum arquivo .txt sobrou' },
        command: '[ -z "$(find /root/lab/notes -name "*.txt")" ]',
      },
      {
        label: { en: 'the three .md names are there', pt: 'os três nomes .md estão lá' },
        command: '[ -f /root/lab/notes/one.md ] && [ -f /root/lab/notes/two.md ] && [ -f /root/lab/notes/three.md ]',
      },
      {
        label: { en: 'the content survived the rename', pt: 'o conteúdo sobreviveu à renomeação' },
        command: 'grep -qx alpha /root/lab/notes/one.md && grep -qx gamma /root/lab/notes/three.md',
      },
    ],
    solutionCommand:
      'cd /root/lab/notes && for file in *.txt; do mv "$file" "$(basename "$file" .txt).md"; done && cd /root',
  },
  {
    id: 'measure-the-directories',
    track: 'files-and-directories',
    title: { en: 'Measure the directories', pt: 'Meça os diretórios' },
    task: {
      en: 'Write into /root/lab/usage.txt the size in kilobytes of each subdirectory directly under /root/lab/store, biggest first, in the two column format du prints. Only the three subdirectories show up, not the files and not /root/lab/store itself.',
      pt: 'Escreva em /root/lab/usage.txt o tamanho em kilobytes de cada subdiretório logo abaixo de /root/lab/store, do maior para o menor, no formato de duas colunas que o du imprime. Só os três subdiretórios aparecem, não os arquivos nem o próprio /root/lab/store.',
    },
    hint: {
      en: 'du -s prints one total per argument, so a glob of the subdirectories gives one line each. sort -rn reads the number in the first column and puts the biggest at the top.',
      pt: 'O du -s imprime um total por argumento, então um glob dos subdiretórios dá uma linha para cada. O sort -rn lê o número da primeira coluna e coloca o maior no topo.',
    },
    setupCommand:
      'rm -rf /root/lab/store /root/lab/usage.txt; mkdir -p /root/lab/store/logs /root/lab/store/cache /root/lab/store/tmp; dd if=/dev/zero of=/root/lab/store/logs/a.bin bs=1k count=400 2>/dev/null; dd if=/dev/zero of=/root/lab/store/cache/b.bin bs=1k count=200 2>/dev/null; dd if=/dev/zero of=/root/lab/store/tmp/c.bin bs=1k count=40 2>/dev/null',
    checks: [
      {
        label: { en: 'the file has exactly three lines', pt: 'o arquivo tem exatamente três linhas' },
        command: '[ "$(wc -l < /root/lab/usage.txt)" = "3" ]',
      },
      {
        label: { en: 'logs comes first, as the biggest one', pt: 'logs vem primeiro, como o maior' },
        command: 'head -1 /root/lab/usage.txt | grep -q "logs$"',
      },
      {
        label: { en: 'tmp comes last, as the smallest one', pt: 'tmp vem por último, como o menor' },
        command: 'tail -1 /root/lab/usage.txt | grep -q "tmp$"',
      },
    ],
    solutionCommand: 'du -s /root/lab/store/* | sort -rn > /root/lab/usage.txt',
  },
  {
    id: 'list-the-symbolic-links',
    track: 'files-and-directories',
    title: { en: 'List only the symbolic links', pt: 'Liste só os links simbólicos' },
    task: {
      en: 'Under /root/lab/bin there are regular files and symbolic links mixed together. Write the path of every symbolic link into /root/lab/links.txt, sorted, leaving the regular files out.',
      pt: 'Dentro de /root/lab/bin existem arquivos comuns e links simbólicos misturados. Escreva o caminho de cada link simbólico em /root/lab/links.txt, ordenado, deixando os arquivos comuns de fora.',
    },
    hint: {
      en: 'find selects by kind with -type, where f means a regular file and l means a symbolic link. It does not follow the link, so the name of the link itself is what comes out.',
      pt: 'O find seleciona por tipo com o -type, em que f significa arquivo comum e l significa link simbólico. Ele não segue o link, então o nome do próprio link é o que sai.',
    },
    setupCommand:
      'rm -rf /root/lab/bin /root/lab/links.txt; mkdir -p /root/lab/bin; touch /root/lab/bin/start /root/lab/bin/stop; ln -s start /root/lab/bin/run; ln -s stop /root/lab/bin/halt',
    checks: [
      {
        label: { en: 'the list matches the links that exist', pt: 'a lista bate com os links que existem' },
        command: 'find /root/lab/bin -type l | sort | diff - /root/lab/links.txt',
      },
      {
        label: { en: 'no regular file slipped in', pt: 'nenhum arquivo comum entrou junto' },
        command: '! grep -q "bin/start$" /root/lab/links.txt',
      },
    ],
    solutionCommand: 'find /root/lab/bin -type l | sort > /root/lab/links.txt',
  },
  {
    id: 'copy-keeping-the-timestamp',
    track: 'files-and-directories',
    title: { en: 'Copy without losing the timestamp', pt: 'Copie sem perder a data' },
    task: {
      en: 'Copy /root/lab/archive/old-report.txt to /root/lab/archive/kept-report.txt so that the copy keeps the modification time of the original, which is set in the year 2020, instead of taking the current time.',
      pt: 'Copie /root/lab/archive/old-report.txt para /root/lab/archive/kept-report.txt de modo que a cópia mantenha a data de modificação do original, que está no ano de 2020, em vez de pegar a hora atual.',
    },
    hint: {
      en: 'cp writes a brand new file and stamps it with the current time unless you ask otherwise. The -p flag preserves the mode, the ownership and the timestamps, and the test operators -nt and -ot compare two files by time.',
      pt: 'O cp escreve um arquivo novo em folha e carimba com a hora atual a menos que você peça o contrário. A flag -p preserva o modo, o dono e as datas, e os operadores de teste -nt e -ot comparam dois arquivos pela data.',
    },
    setupCommand:
      'rm -rf /root/lab/archive; mkdir -p /root/lab/archive; printf "closed quarter\n" > /root/lab/archive/old-report.txt; touch -d "2020-03-04 05:06" /root/lab/archive/old-report.txt',
    checks: [
      {
        label: { en: 'the copy exists with the same content', pt: 'a cópia existe com o mesmo conteúdo' },
        command: 'diff /root/lab/archive/old-report.txt /root/lab/archive/kept-report.txt',
      },
      {
        label: { en: 'neither file is newer than the other', pt: 'nenhum dos dois é mais novo que o outro' },
        command:
          '[ ! /root/lab/archive/kept-report.txt -nt /root/lab/archive/old-report.txt ] && [ ! /root/lab/archive/old-report.txt -nt /root/lab/archive/kept-report.txt ]',
      },
      {
        label: { en: 'the copy still reads 2020', pt: 'a cópia ainda marca 2020' },
        command: 'ls -l /root/lab/archive/kept-report.txt | grep -q 2020',
      },
    ],
    solutionCommand: 'cp -p /root/lab/archive/old-report.txt /root/lab/archive/kept-report.txt',
  },
  {
    id: 'install-a-tool-into-a-new-path',
    track: 'files-and-directories',
    title: {
      en: 'Install a tool into a path that does not exist yet',
      pt: 'Instale uma ferramenta em um caminho que ainda não existe',
    },
    task: {
      en: 'Put /root/lab/deploy-tool at /root/lab/opt/bin/deploy, creating the missing directories along the way and landing it executable by everyone, in a single command.',
      pt: 'Coloque o /root/lab/deploy-tool em /root/lab/opt/bin/deploy, criando os diretórios que faltam no caminho e chegando lá executável para todos, em um comando só.',
    },
    hint: {
      en: 'install copies a file and sets its mode at the same time, taking the mode after -m. With -D it also creates every directory the destination needs before writing.',
      pt: 'O install copia um arquivo e define o modo dele ao mesmo tempo, recebendo o modo depois do -m. Com o -D ele também cria todos os diretórios de que o destino precisa antes de escrever.',
    },
    setupCommand:
      'rm -rf /root/lab/opt; mkdir -p /root/lab; printf "#!/bin/sh\necho deploying\n" > /root/lab/deploy-tool; chmod 644 /root/lab/deploy-tool',
    checks: [
      {
        label: { en: 'the tool sits at the new path', pt: 'a ferramenta está no caminho novo' },
        command: '[ -f /root/lab/opt/bin/deploy ]',
      },
      {
        label: { en: 'it is executable by owner, group and others', pt: 'ela é executável para dono, grupo e outros' },
        command: '[ "$(ls -ld /root/lab/opt/bin/deploy | cut -c2-10)" = "rwxr-xr-x" ]',
      },
      {
        label: { en: 'it really runs', pt: 'ela roda de verdade' },
        command: '[ "$(/root/lab/opt/bin/deploy)" = "deploying" ]',
      },
    ],
    solutionCommand: 'install -D -m 755 /root/lab/deploy-tool /root/lab/opt/bin/deploy',
  },
  {
    id: 'find-what-changed-recently',
    track: 'files-and-directories',
    title: { en: 'Find what changed after a given file', pt: 'Ache o que mudou depois de um arquivo' },
    task: {
      en: 'The file /root/lab/release/marker was written when the last release went out. Write the path of every file under /root/lab/release modified after it into /root/lab/changed.txt, sorted, with the marker itself out of the list.',
      pt: 'O arquivo /root/lab/release/marker foi escrito quando a última versão saiu. Escreva o caminho de cada arquivo abaixo de /root/lab/release modificado depois dele em /root/lab/changed.txt, ordenado, com o próprio marker fora da lista.',
    },
    hint: {
      en: 'find compares timestamps with -newer, which takes a file to compare against instead of a number of days. Combining it with -type f keeps directories out of the result.',
      pt: 'O find compara datas com o -newer, que recebe um arquivo de referência em vez de um número de dias. Combinar com -type f mantém os diretórios fora do resultado.',
    },
    setupCommand:
      'rm -rf /root/lab/release /root/lab/changed.txt; mkdir -p /root/lab/release/src; touch -d "2024-01-01 00:00" /root/lab/release/src/old-one.c /root/lab/release/src/old-two.c; touch -d "2024-06-01 00:00" /root/lab/release/marker; touch -d "2025-02-02 00:00" /root/lab/release/src/new-one.c /root/lab/release/notes.md',
    checks: [
      {
        label: { en: 'the list matches what find reports', pt: 'a lista bate com o que o find informa' },
        command: 'find /root/lab/release -type f -newer /root/lab/release/marker | sort | diff - /root/lab/changed.txt',
      },
      {
        label: { en: 'the two old files stayed out', pt: 'os dois arquivos antigos ficaram de fora' },
        command: '! grep -q "old-" /root/lab/changed.txt',
      },
    ],
    solutionCommand: 'find /root/lab/release -type f -newer /root/lab/release/marker | sort > /root/lab/changed.txt',
  },
  {
    id: 'pack-the-project',
    track: 'files-and-directories',
    title: { en: 'Pack the project into an archive', pt: 'Empacote o projeto em um arquivo' },
    task: {
      en: 'Pack /root/lab/project into a compressed archive at /root/lab/project.tar.gz, keeping the project directory itself at the start of every path inside the archive.',
      pt: 'Empacote /root/lab/project em um arquivo comprimido em /root/lab/project.tar.gz, mantendo o próprio diretório project no início de cada caminho dentro do arquivo.',
    },
    hint: {
      en: 'The BusyBox tar in this lab has no -z flag, so pack with tar cf first and compress the result with gzip. Running the command from /root/lab keeps the paths relative to project.',
      pt: 'O tar do BusyBox neste laboratório não tem a flag -z, então empacote primeiro com tar cf e comprima o resultado com gzip. Rodar o comando a partir de /root/lab mantém os caminhos relativos a project.',
    },
    setupCommand:
      'rm -f /root/lab/project.tar /root/lab/project.tar.gz; mkdir -p /root/lab/project/src /root/lab/project/docs; touch /root/lab/project/src/main.c /root/lab/project/notes.txt',
    checks: [
      {
        label: { en: 'project.tar.gz is valid gzip', pt: 'project.tar.gz é um gzip válido' },
        command: 'gzip -t /root/lab/project.tar.gz',
      },
      {
        label: {
          en: 'the archive holds project/src/main.c',
          pt: 'o arquivo contém project/src/main.c',
        },
        command: 'gzip -dc /root/lab/project.tar.gz | tar tf - | grep -q "^project/src/main.c$"',
      },
    ],
    solutionCommand: 'cd /root/lab && tar cf project.tar project && gzip project.tar && cd /root',
  },
];
