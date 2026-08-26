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
    checkCommand: '[ -d /root/lab/project/src ] && [ -d /root/lab/project/docs ] && [ -f /root/lab/project/notes.txt ]',
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
    checkCommand:
      '[ -f /root/lab/backup/report.txt ] && [ -f /root/lab/report-final.txt ] && [ ! -e /root/lab/report.txt ]',
    solutionCommand: 'cp /root/lab/report.txt /root/lab/backup/ && mv /root/lab/report.txt /root/lab/report-final.txt',
  },
  {
    id: 'collect-log-paths',
    track: 'files-and-directories',
    title: { en: 'Collect every log path', pt: 'Junte os caminhos dos logs' },
    task: {
      en: 'Write the full path of every file ending in .log under /root/lab/service into /root/lab/logs-found.txt, one path per line, in alphabetical order.',
      pt: 'Escreva o caminho completo de cada arquivo terminado em .log dentro de /root/lab/service no arquivo /root/lab/logs-found.txt, um caminho por linha, em ordem alfabética.',
    },
    hint: {
      en: 'find walks the whole tree below the directory you give it, and -name compares the file name with a pattern. Quote the pattern so the shell hands the asterisk to find instead of expanding it first.',
      pt: 'O find percorre toda a árvore abaixo do diretório que você passar, e o -name compara o nome do arquivo com um padrão. Coloque o padrão entre aspas para o shell entregar o asterisco ao find em vez de expandir antes.',
    },
    setupCommand:
      'rm -rf /root/lab/service /root/lab/logs-found.txt; mkdir -p /root/lab/service/old /root/lab/service/current; touch /root/lab/service/current/access.log /root/lab/service/old/error.log /root/lab/service/current/settings.conf',
    checkCommand: 'find /root/lab/service -name "*.log" | sort | diff - /root/lab/logs-found.txt',
    solutionCommand: 'find /root/lab/service -name "*.log" | sort > /root/lab/logs-found.txt',
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
    checkCommand: 'gzip -dc /root/lab/project.tar.gz | tar tf - | grep -q "^project/src/main.c$"',
    solutionCommand: 'cd /root/lab && tar cf project.tar project && gzip project.tar && cd /root',
  },
];
