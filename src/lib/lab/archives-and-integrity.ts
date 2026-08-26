import type { LabExercise, LabTrack } from './types';

export const archivesAndIntegrityTrack: LabTrack = {
  id: 'archives-and-integrity',
  objectiveCode: '103.3',
  title: { en: 'Archives, checksums and patches', pt: 'Arquivos, somas e patches' },
};

export const archivesAndIntegrityExercises: LabExercise[] = [
  {
    id: 'unpack-an-archive',
    track: 'archives-and-integrity',
    title: { en: 'Unpack an archive somewhere else', pt: 'Desempacote um arquivo em outro lugar' },
    task: {
      en: 'The archive /root/lab/release.tar holds a whole app directory. Unpack it into /root/lab/restored, which already exists, without moving out of your current directory and without leaving the archive changed.',
      pt: 'O arquivo /root/lab/release.tar guarda um diretório app inteiro. Desempacote ele em /root/lab/restored, que já existe, sem sair do diretório atual e sem alterar o arquivo empacotado.',
    },
    hint: {
      en: 'tar takes x to extract and f to name the archive. The -C flag tells it to change into another directory before writing anything, which saves you from a cd first.',
      pt: 'O tar recebe x para extrair e f para nomear o arquivo. A flag -C diz para ele entrar em outro diretório antes de escrever qualquer coisa, o que dispensa um cd antes.',
    },
    setupCommand:
      'rm -rf /root/lab/restored /root/lab/app /root/lab/release.tar; mkdir -p /root/lab/app/bin /root/lab/app/etc /root/lab/restored; printf "run me\\n" > /root/lab/app/bin/start; printf "port=80\\n" > /root/lab/app/etc/app.conf; cd /root/lab && tar cf release.tar app && rm -rf app && cd /root',
    checks: [
      {
        label: { en: 'the app directory landed in restored', pt: 'o diretório app caiu em restored' },
        command: '[ -d /root/lab/restored/app/bin ] && [ -d /root/lab/restored/app/etc ]',
      },
      {
        label: { en: 'the files came out with their content', pt: 'os arquivos saíram com o conteúdo deles' },
        command: 'grep -qx "run me" /root/lab/restored/app/bin/start',
      },
      {
        label: { en: 'nothing was unpacked into /root/lab itself', pt: 'nada foi desempacotado no próprio /root/lab' },
        command: '[ ! -d /root/lab/app ]',
      },
    ],
    solutionCommand: 'tar xf /root/lab/release.tar -C /root/lab/restored',
  },
  {
    id: 'pull-one-file-out-of-an-archive',
    track: 'archives-and-integrity',
    title: { en: 'Pull a single file out of an archive', pt: 'Tire um único arquivo do pacote' },
    task: {
      en: 'From /root/lab/release.tar take only app/etc/app.conf into /root/lab/single, leaving every other member of the archive where it is.',
      pt: 'De /root/lab/release.tar tire só o app/etc/app.conf para /root/lab/single, deixando todo o resto do pacote onde está.',
    },
    hint: {
      en: 'After the archive name, tar accepts the paths it should extract, written exactly as they appear inside it. Running tar tf first shows those names.',
      pt: 'Depois do nome do arquivo, o tar aceita os caminhos que deve extrair, escritos exatamente como aparecem lá dentro. Rodar tar tf antes mostra esses nomes.',
    },
    setupCommand:
      'rm -rf /root/lab/single /root/lab/app /root/lab/release.tar; mkdir -p /root/lab/app/bin /root/lab/app/etc /root/lab/single; printf "run me\\n" > /root/lab/app/bin/start; printf "port=80\\n" > /root/lab/app/etc/app.conf; cd /root/lab && tar cf release.tar app && rm -rf app && cd /root',
    checks: [
      {
        label: { en: 'app.conf arrived with its content', pt: 'o app.conf chegou com o conteúdo dele' },
        command: 'grep -qx "port=80" /root/lab/single/app/etc/app.conf',
      },
      {
        label: { en: 'the start script was left behind', pt: 'o script start ficou para trás' },
        command: '[ ! -e /root/lab/single/app/bin/start ]',
      },
    ],
    solutionCommand: 'tar xf /root/lab/release.tar -C /root/lab/single app/etc/app.conf',
  },
  {
    id: 'list-what-is-inside-an-archive',
    track: 'archives-and-integrity',
    title: { en: 'List what is inside an archive', pt: 'Liste o que tem dentro do pacote' },
    task: {
      en: 'Write every path stored in /root/lab/release.tar into /root/lab/contents.txt, in the order the archive lists them, without unpacking a single file.',
      pt: 'Escreva cada caminho guardado em /root/lab/release.tar em /root/lab/contents.txt, na ordem em que o pacote lista, sem desempacotar nenhum arquivo.',
    },
    hint: {
      en: 'The t operation lists an archive instead of extracting it, and it prints to standard output like any other filter. A redirect turns that listing into a file.',
      pt: 'A operação t lista o pacote em vez de extrair, e imprime na saída padrão como qualquer outro filtro. Um redirecionamento transforma essa listagem em arquivo.',
    },
    setupCommand:
      'rm -rf /root/lab/app /root/lab/release.tar /root/lab/contents.txt; mkdir -p /root/lab/app/bin /root/lab/app/etc; touch /root/lab/app/bin/start /root/lab/app/etc/app.conf; cd /root/lab && tar cf release.tar app && rm -rf app && cd /root',
    checks: [
      {
        label: { en: 'the listing matches the archive', pt: 'a listagem bate com o pacote' },
        command: 'tar tf /root/lab/release.tar | diff - /root/lab/contents.txt',
      },
      {
        label: { en: 'nothing was extracted', pt: 'nada foi extraído' },
        command: '[ ! -d /root/lab/app ]',
      },
    ],
    solutionCommand: 'tar tf /root/lab/release.tar > /root/lab/contents.txt',
  },
  {
    id: 'compress-keeping-the-original',
    track: 'archives-and-integrity',
    title: { en: 'Compress without losing the original', pt: 'Comprima sem perder o original' },
    task: {
      en: 'Produce /root/lab/dump.sql.gz from /root/lab/dump.sql while the uncompressed file stays exactly where it is, and make sure the archive really carries the same content.',
      pt: 'Produza /root/lab/dump.sql.gz a partir de /root/lab/dump.sql com o arquivo sem compressão ficando exatamente onde está, e garanta que o pacote carrega mesmo o mesmo conteúdo.',
    },
    hint: {
      en: 'gzip normally swallows the file it compresses and leaves only the archive. With -c it writes the compressed bytes to standard output instead, so a redirect decides the name and the original is never touched.',
      pt: 'O gzip normalmente engole o arquivo que comprime e deixa só o pacote. Com o -c ele escreve os bytes comprimidos na saída padrão, então um redirecionamento decide o nome e o original nunca é tocado.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/dump.sql.gz; printf "INSERT INTO users VALUES (1);\\nINSERT INTO users VALUES (2);\\n" > /root/lab/dump.sql',
    checks: [
      {
        label: { en: 'the archive is valid gzip', pt: 'o pacote é um gzip válido' },
        command: 'gzip -t /root/lab/dump.sql.gz',
      },
      {
        label: { en: 'the original is still there', pt: 'o original continua lá' },
        command: '[ -f /root/lab/dump.sql ]',
      },
      {
        label: { en: 'unpacking it gives the original back', pt: 'descompactar devolve o original' },
        command: 'zcat /root/lab/dump.sql.gz | diff - /root/lab/dump.sql',
      },
    ],
    solutionCommand: 'gzip -c /root/lab/dump.sql > /root/lab/dump.sql.gz',
  },
  {
    id: 'record-the-checksums',
    track: 'archives-and-integrity',
    title: { en: 'Record the checksums of a directory', pt: 'Registre as somas de verificação' },
    task: {
      en: 'Write the MD5 checksum of the three files in /root/lab/payload into /root/lab/payload.md5, in the format md5sum reads back, so that checking the file later reports every one of them as OK.',
      pt: 'Escreva a soma MD5 dos três arquivos de /root/lab/payload em /root/lab/payload.md5, no formato que o md5sum lê de volta, de modo que conferir o arquivo depois informe todos eles como OK.',
    },
    hint: {
      en: 'md5sum prints one line per file, the checksum and the name side by side, which is exactly the format it expects when reading with -c. A glob passes the three files in one call.',
      pt: 'O md5sum imprime uma linha por arquivo, a soma e o nome lado a lado, que é exatamente o formato esperado por ele na leitura com -c. Um glob passa os três arquivos em uma chamada.',
    },
    setupCommand:
      'rm -rf /root/lab/payload /root/lab/payload.md5; mkdir -p /root/lab/payload; printf "one\\n" > /root/lab/payload/a.txt; printf "two\\n" > /root/lab/payload/b.txt; printf "three\\n" > /root/lab/payload/c.txt',
    checks: [
      {
        label: { en: 'the file has three lines', pt: 'o arquivo tem três linhas' },
        command: '[ "$(wc -l < /root/lab/payload.md5)" = "3" ]',
      },
      {
        label: { en: 'md5sum -c reports every file as OK', pt: 'o md5sum -c informa todo arquivo como OK' },
        command: 'md5sum -c /root/lab/payload.md5 >/dev/null 2>&1',
      },
    ],
    solutionCommand: 'md5sum /root/lab/payload/* > /root/lab/payload.md5',
  },
  {
    id: 'find-the-corrupted-file',
    track: 'archives-and-integrity',
    title: { en: 'Find the file that changed', pt: 'Ache o arquivo que mudou' },
    task: {
      en: 'The checksums in /root/lab/payload.md5 were taken before someone edited one of the files. Find out which file no longer matches and write its path, exactly as the checksum file spells it, into /root/lab/corrupted.txt.',
      pt: 'As somas em /root/lab/payload.md5 foram tiradas antes de alguém editar um dos arquivos. Descubra qual arquivo não bate mais e escreva o caminho dele, exatamente como o arquivo de somas escreve, em /root/lab/corrupted.txt.',
    },
    hint: {
      en: 'md5sum -c prints one line per entry ending in OK or FAILED, and it returns a non zero status when anything failed. Filtering that output for the failures and cutting at the colon leaves just the name.',
      pt: 'O md5sum -c imprime uma linha por entrada terminando em OK ou FAILED, e retorna status diferente de zero quando algo falhou. Filtrar essa saída pelas falhas e cortar nos dois pontos deixa só o nome.',
    },
    setupCommand:
      'rm -rf /root/lab/payload /root/lab/corrupted.txt; mkdir -p /root/lab/payload; printf "one\\n" > /root/lab/payload/a.txt; printf "two\\n" > /root/lab/payload/b.txt; printf "three\\n" > /root/lab/payload/c.txt; md5sum /root/lab/payload/* > /root/lab/payload.md5; printf "two but edited\\n" > /root/lab/payload/b.txt',
    checks: [
      {
        label: { en: 'the file names the edited path', pt: 'o arquivo nomeia o caminho editado' },
        command: '[ "$(cat /root/lab/corrupted.txt)" = "/root/lab/payload/b.txt" ]',
      },
    ],
    solutionCommand:
      'md5sum -c /root/lab/payload.md5 2>/dev/null | grep FAILED | cut -d: -f1 > /root/lab/corrupted.txt',
  },
  {
    id: 'produce-a-patch',
    track: 'archives-and-integrity',
    title: { en: 'Produce a patch between two versions', pt: 'Produza um patch entre duas versões' },
    task: {
      en: 'Write into /root/lab/config.patch the difference between /root/lab/config.old and /root/lab/config.new, in the unified format, so that feeding the patch to a copy of the old file turns it into the new one.',
      pt: 'Escreva em /root/lab/config.patch a diferença entre /root/lab/config.old e /root/lab/config.new, no formato unificado, de modo que entregar o patch a uma cópia do arquivo antigo transforme ele no novo.',
    },
    hint: {
      en: 'diff -u prints the unified format, with a few unchanged lines of context around each change. The order of the two file names decides which direction the patch goes.',
      pt: 'O diff -u imprime o formato unificado, com algumas linhas de contexto inalteradas em volta de cada mudança. A ordem dos dois nomes de arquivo decide o sentido do patch.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/config.patch; printf "host=localhost\\nport=8080\\ndebug=false\\n" > /root/lab/config.old; printf "host=localhost\\nport=9090\\ndebug=true\\n" > /root/lab/config.new',
    checks: [
      {
        label: { en: 'the patch is in the unified format', pt: 'o patch está no formato unificado' },
        command: 'grep -q "^@@" /root/lab/config.patch',
      },
      {
        label: {
          en: 'applying it to the old file produces the new one',
          pt: 'aplicar ele no arquivo antigo produz o novo',
        },
        command:
          'rm -rf /tmp/patchcheck && mkdir -p /tmp/patchcheck && cp /root/lab/config.old /tmp/patchcheck/config && patch /tmp/patchcheck/config /root/lab/config.patch >/dev/null 2>&1 && diff /tmp/patchcheck/config /root/lab/config.new',
      },
    ],
    solutionCommand: 'diff -u /root/lab/config.old /root/lab/config.new > /root/lab/config.patch',
  },
];
