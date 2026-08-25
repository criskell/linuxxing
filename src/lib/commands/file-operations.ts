import type { CommandKB } from './types';

export const fileOperations: CommandKB = {
  ls: {
    desc: {
      en: 'Lists the files and folders inside a directory, one of the most frequently typed commands in any Unix-like shell. On its own it prints just the visible names in the current directory, but it becomes far more useful combined with flags: -l shows a detailed table with permissions, owner, and size, -a reveals hidden dotfiles, and -h turns raw byte counts into human-readable sizes. It reads the directory entries the kernel already has in memory, so it is essentially instantaneous even on folders with thousands of files.',
      pt: 'Lista os arquivos e pastas dentro de um diretório, um dos comandos mais digitados em qualquer shell Unix. Sozinho, imprime só os nomes visíveis no diretório atual, mas se torna muito mais útil combinado com flags: -l mostra uma tabela detalhada com permissões, dono e tamanho, -a revela arquivos ocultos (dotfiles), e -h transforma contagens de bytes em tamanhos legíveis. Ele lê as entradas de diretório que o kernel já tem em memória, então é essencialmente instantâneo mesmo em pastas com milhares de arquivos.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Uses long format, showing permissions, owner, size, and date for each item.',
        pt: 'Usa o formato longo, mostrando permissões, dono, tamanho e data de cada item.',
      },
      '-a': {
        en: 'Also shows hidden files (starting with a dot).',
        pt: 'Mostra também arquivos ocultos (que começam com ponto).',
      },
      '-h': {
        en: 'Shows file sizes in human-readable form (KB, MB, GB) instead of bytes.',
        pt: 'Mostra tamanhos de arquivo em formato legível (KB, MB, GB) em vez de bytes.',
      },
      '-t': {
        en: 'Sorts items by modification date, newest first.',
        pt: 'Ordena os itens pela data de modificação, mais recente primeiro.',
      },
      '-r': {
        en: 'Reverses the listing order.',
        pt: 'Inverte a ordem da listagem.',
      },
      '-R': {
        en: 'Lists the contents of subfolders recursively.',
        pt: 'Lista o conteúdo de subpastas recursivamente.',
      },
      '--color': {
        en: 'Colors the output according to each item type (folder, executable, link, etc).',
        pt: 'Colore a saída de acordo com o tipo de cada item (pasta, executável, link, etc.).',
      },
    },
    argHint: {
      en: 'The folder to list. Defaults to the current directory when omitted.',
      pt: 'A pasta a listar. Por padrão é o diretório atual, quando omitido.',
    },
  },

  rm: {
    desc: {
      en: "Removes (deletes) files or folders from the filesystem. Unlike deleting through a graphical file manager, there is no trash bin to recover from: once rm finishes, the space the file occupied is simply marked free, and the data is gone for all practical purposes. This is precisely what makes 'rm -rf' one of the most feared command combinations in computing: -r makes it recurse into folders and -f suppresses every confirmation prompt, so a single misplaced space or wrong path (rm -rf / instead of rm -rf ./) can erase far more than intended, with nothing to undo it.",
      pt: 'Remove (apaga) arquivos ou pastas do sistema de arquivos. Ao contrário de apagar por um gerenciador de arquivos gráfico, não existe uma lixeira para recuperar depois: assim que o rm termina, o espaço que o arquivo ocupava é simplesmente marcado como livre, e os dados somem para todos os efeitos práticos. É exatamente isso que torna o "rm -rf" uma das combinações de comando mais temidas da computação: o -r faz ele entrar recursivamente em pastas e o -f suprime toda confirmação, então um único espaço no lugar errado ou caminho errado (rm -rf / em vez de rm -rf ./) pode apagar muito mais do que o pretendido, sem nada para desfazer.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Removes folders and all their contents, recursively.',
        pt: 'Remove pastas e todo o seu conteúdo, recursivamente.',
      },
      '-R': {
        en: 'Removes folders and all their contents, recursively.',
        pt: 'Remove pastas e todo o seu conteúdo, recursivamente.',
      },
      '-f': {
        en: 'Forces removal without asking for confirmation, even for write-protected files.',
        pt: 'Força a remoção sem pedir confirmação, mesmo para arquivos protegidos contra escrita.',
      },
      '-i': {
        en: 'Asks for confirmation before deleting each file.',
        pt: 'Pede confirmação antes de apagar cada arquivo.',
      },
      '-v': {
        en: 'Shows each removed file on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo removido (modo verboso).',
      },
    },
    argHint: {
      en: 'The file or folder to remove.',
      pt: 'O arquivo ou pasta a remover.',
    },
    commonMistake: {
      en: "It's easy to assume rm asks for confirmation the way a file manager's trash bin does, it doesn't: by default it deletes immediately and permanently. Always double-check the path (and consider adding -i for anything destructive) before running rm -rf, especially when a variable is part of the path, since an empty or wrong variable can turn 'rm -rf $DIR/' into 'rm -rf /'.",
      pt: 'É fácil supor que o rm pede confirmação como a lixeira de um gerenciador de arquivos, não pede: por padrão ele apaga na hora e para sempre. Sempre confira o caminho antes de rodar rm -rf (e considere adicionar -i para qualquer coisa destrutiva), especialmente quando uma variável faz parte do caminho, já que uma variável vazia ou errada pode transformar "rm -rf $DIR/" em "rm -rf /".',
    },
  },

  cp: {
    desc: {
      en: "Copies files or folders from one place to another, leaving the original untouched. By default it only copies individual files; copying a folder and everything inside it requires the -r (recursive) flag, a common source of confusion for anyone coming from a graphical file manager where that distinction doesn't exist. It works purely on the local filesystem (or between paths visible to it, including mounted network drives), unlike scp or rsync which are built for copying across machines over a network.",
      pt: 'Copia arquivos ou pastas de um lugar para outro, deixando o original intacto. Por padrão só copia arquivos individuais; copiar uma pasta e tudo dentro dela exige a flag -r (recursivo), uma fonte comum de confusão para quem vem de um gerenciador de arquivos gráfico, onde essa distinção não existe. Ele trabalha só no sistema de arquivos local (ou entre caminhos visíveis a ele, incluindo unidades de rede montadas), diferente do scp ou rsync, que são feitos para copiar entre máquinas pela rede.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Copies folders and all their contents, recursively.',
        pt: 'Copia pastas e todo o seu conteúdo, recursivamente.',
      },
      '-R': {
        en: 'Copies folders and all their contents, recursively.',
        pt: 'Copia pastas e todo o seu conteúdo, recursivamente.',
      },
      '-v': {
        en: 'Shows each copied file on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo copiado (modo verboso).',
      },
      '-i': {
        en: 'Asks for confirmation before overwriting an existing file.',
        pt: 'Pede confirmação antes de sobrescrever um arquivo existente.',
      },
    },
    argHint: {
      en: 'The source path to copy, or the destination (the last argument is normally the destination).',
      pt: 'O caminho de origem a copiar, ou o destino (o último argumento normalmente é o destino).',
    },
    commonMistake: {
      en: "Copying a folder without -r fails with an error ('omitting directory'), a graphical file manager never makes that distinction, so it trips up people used to just dragging folders around. The other frequent surprise is a trailing slash on the destination: 'cp -r src dest' copies src itself into dest (creating dest/src), while 'cp -r src/. dest' copies src's contents into dest directly, a subtle difference that changes the whole result.",
      pt: 'Copiar uma pasta sem -r falha com erro ("omitting directory"), um gerenciador de arquivos gráfico nunca faz essa distinção, então isso pega quem está acostumado a simplesmente arrastar pastas. A outra surpresa comum é a barra no final do destino: "cp -r origem destino" copia a própria origem para dentro de destino (criando destino/origem), enquanto "cp -r origem/. destino" copia o conteúdo de origem direto para destino, uma diferença sutil que muda o resultado inteiro.',
    },
  },

  mv: {
    desc: {
      en: "Moves or renames files and folders. There is technically no difference between the two operations from mv's point of view; renaming a file is just moving it to a new name in the same directory, which is why 'mv old-name new-name' is the standard way to rename something on the command line. Moving within the same filesystem is instantaneous (the file's location on disk never changes, only the directory entry pointing to it), but moving across filesystems (like from one mounted drive to another) forces mv to copy the data and then delete the original.",
      pt: 'Move ou renomeia arquivos e pastas. Não existe diferença técnica entre as duas operações do ponto de vista do mv; renomear um arquivo nada mais é do que movê-lo para um novo nome no mesmo diretório, e é por isso que "mv nome-antigo nome-novo" é a forma padrão de renomear algo na linha de comando. Mover dentro do mesmo sistema de arquivos é instantâneo (a localização do arquivo no disco nunca muda, só a entrada de diretório que aponta para ele), mas mover entre sistemas de arquivos diferentes (como de uma unidade montada para outra) obriga o mv a copiar os dados e depois apagar o original.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Asks for confirmation before overwriting an existing file.',
        pt: 'Pede confirmação antes de sobrescrever um arquivo existente.',
      },
      '-v': {
        en: 'Shows each moved file on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo movido (modo verboso).',
      },
    },
    argHint: {
      en: 'The source path to move or rename, or the destination (the last argument is normally the destination).',
      pt: 'O caminho de origem a mover ou renomear, ou o destino (o último argumento normalmente é o destino).',
    },
    commonMistake: {
      en: "If the destination is an existing directory, mv moves the source INTO it rather than renaming to that name, a frequent surprise when the intent was a rename. There is also no confirmation by default: 'mv a b' silently overwrites b if it already exists and you have permission, unlike some file managers that warn first, add -i if that matters.",
      pt: 'Se o destino for um diretório existente, o mv move a origem PARA DENTRO dele em vez de renomear para aquele nome, uma surpresa comum quando a intenção era renomear. Também não há confirmação por padrão: "mv a b" sobrescreve b silenciosamente se ele já existir e você tiver permissão, diferente de alguns gerenciadores de arquivos que avisam antes, adicione -i se isso importar.',
    },
  },

  grep: {
    desc: {
      en: "Searches for a text pattern inside one or more files (or piped input), printing every matching line. Its name comes from an old ed editor command, 'g/re/p' (globally search for a regular expression and print), and that regex engine is exactly what gives grep its power: patterns can be simple literal text or full regular expressions matching entire families of strings at once. It is the backbone of countless one-liners, piped after other commands to filter their output down to just the lines that matter, whether that is scanning logs for an error, checking if a package is installed, or finding every file that mentions a function name.",
      pt: 'Procura por um padrão de texto dentro de um ou mais arquivos (ou de uma entrada recebida por pipe), imprimindo cada linha que combinar. O nome vem de um comando antigo do editor ed, "g/re/p" (busque globalmente por uma expressão regular e imprima), e esse motor de expressões regulares é exatamente o que dá poder ao grep: os padrões podem ser texto literal simples ou expressões regulares completas, combinando com famílias inteiras de strings de uma vez. É a espinha dorsal de incontáveis one-liners, encadeado depois de outros comandos para filtrar a saída deles só nas linhas que importam, seja vasculhando logs em busca de um erro, checando se um pacote está instalado, ou achando todo arquivo que menciona o nome de uma função.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Ignores case differences when searching.',
        pt: 'Ignora diferença entre maiúsculas e minúsculas na busca.',
      },
      '-r': {
        en: 'Searches recursively through all subfolders.',
        pt: 'Procura recursivamente dentro de todas as subpastas.',
      },
      '-n': {
        en: 'Shows the line number where each match was found.',
        pt: 'Mostra o número da linha onde cada resultado foi encontrado.',
      },
      '-v': {
        en: "Inverts the search, showing only the lines that DON'T match the pattern.",
        pt: 'Inverte a busca, mostrando apenas as linhas que NÃO combinam com o padrão.',
      },
      '-c': {
        en: 'Shows only the count of matching lines, instead of the lines themselves.',
        pt: 'Mostra apenas a contagem de linhas que combinam, em vez das linhas em si.',
      },
      '-l': {
        en: 'Shows only the names of files that contain a matching line.',
        pt: 'Mostra apenas os nomes dos arquivos que contêm alguma linha correspondente.',
      },
      '-E': {
        en: 'Interprets the pattern as an extended regular expression.',
        pt: 'Interpreta o padrão como uma expressão regular estendida.',
      },
    },
    argHint: {
      en: 'The search pattern, or a file to search in. The pattern normally comes first.',
      pt: 'O padrão de busca, ou um arquivo onde procurar. O padrão normalmente vem primeiro.',
    },
    commonMistake: {
      en: "By default grep's patterns are basic regular expressions, so characters like +, ?, and | do NOT mean what they mean in most other regex flavors unless escaped with a backslash, or -E is added for extended regex. Without -r, grep also only searches the files given, not subfolders, a common trip-up when searching a whole project without that flag (or without piping through something like find first).",
      pt: 'Por padrão os padrões do grep são expressões regulares básicas, então caracteres como +, ? e | NÃO significam o que significam na maioria dos outros tipos de regex a menos que sejam escapados com barra invertida, ou que -E seja adicionado para regex estendida. Sem -r, o grep também só procura nos arquivos dados, não em subpastas, um erro comum ao tentar buscar em um projeto inteiro sem essa flag (ou sem encadear com algo como o find antes).',
    },
  },

  find: {
    desc: {
      en: 'Searches for files and folders within a directory tree, based on criteria like name, type, size, or modification date, and can act on whatever it finds. Where grep searches inside file contents, find searches the filesystem structure itself: it starts at a given path and walks every subfolder, testing each entry against the filters given. Its real strength shows up combined with -exec or piped into xargs, letting you find every file matching a pattern and then delete, move, or otherwise process all of them in a single command, which is why it shows up constantly in cleanup scripts and cron jobs.',
      pt: 'Procura arquivos e pastas dentro de uma árvore de diretórios, com base em critérios como nome, tipo, tamanho ou data de modificação, e pode agir sobre o que encontrar. Enquanto o grep procura dentro do conteúdo dos arquivos, o find procura na própria estrutura do sistema de arquivos: ele começa em um caminho dado e percorre cada subpasta, testando cada item contra os filtros passados. Sua força de verdade aparece combinado com -exec ou encadeado com o xargs, permitindo achar todo arquivo que combina com um padrão e então apagar, mover ou processar todos eles em um único comando, motivo pelo qual aparece constantemente em scripts de limpeza e tarefas de cron.',
    },
    subcommands: {},
    flags: {
      '-name': {
        en: 'Filters by file name (accepts wildcards like *).',
        pt: 'Filtra pelo nome do arquivo (aceita curingas como *).',
      },
      '-type': {
        en: "Filters by type: 'f' for regular file, 'd' for directory, among others.",
        pt: "Filtra pelo tipo: 'f' para arquivo comum, 'd' para diretório, entre outros.",
      },
      '-mtime': {
        en: 'Filters by modification date, in days.',
        pt: 'Filtra por data de modificação, em dias.',
      },
      '-size': {
        en: 'Filters by file size.',
        pt: 'Filtra pelo tamanho do arquivo.',
      },
      '-exec': {
        en: 'Runs a command on each file found.',
        pt: 'Executa um comando em cada arquivo encontrado.',
      },
    },
    valueFlags: {
      '-name': 'generic',
      '-type': 'generic',
      '-mtime': 'generic',
      '-size': 'generic',
    },
    argHint: {
      en: 'The starting directory to search from, usually the first argument.',
      pt: 'O diretório inicial de onde procurar, geralmente o primeiro argumento.',
    },
    commonMistake: {
      en: "The starting path and filters must come before -exec, and -name patterns need quotes ('*.tmp', not *.tmp) or the shell expands the wildcard itself before find ever sees it, matching only files that already exist in the current directory instead of letting find search recursively. Forgetting the trailing '{} \\;' (or '+') on -exec is also a classic mistake, since that placeholder is what tells find where to substitute each matched file.",
      pt: "O caminho inicial e os filtros precisam vir antes do -exec, e padrões em -name precisam de aspas ('*.tmp', não *.tmp) ou o próprio shell expande o curinga antes do find sequer vê-lo, combinando só com arquivos que já existem no diretório atual em vez de deixar o find buscar recursivamente. Esquecer o '{} \\;' (ou '+') no final do -exec também é um erro clássico, já que esse marcador é o que diz ao find onde substituir cada arquivo encontrado.",
    },
  },

  mkdir: {
    desc: {
      en: "Creates a new folder (directory). By default it only creates the last component of a path, and fails with an error if the parent folders in that path don't already exist, which is exactly the situation the -p flag is meant to solve, creating every missing folder along the way in one call instead of running mkdir repeatedly for each level.",
      pt: 'Cria uma nova pasta (diretório). Por padrão, só cria o último componente do caminho, e falha com erro se as pastas pai desse caminho ainda não existirem, exatamente a situação que a flag -p resolve, criando toda pasta que faltar ao longo do caminho em uma única chamada, em vez de rodar o mkdir repetidamente para cada nível.',
    },
    subcommands: {},
    flags: {
      '-p': {
        en: 'Creates intermediate folders needed along the path, without erroring if one already exists.',
        pt: 'Cria pastas intermediárias necessárias no caminho, sem dar erro se alguma já existir.',
      },
    },
    argHint: {
      en: 'The folder to create.',
      pt: 'A pasta a criar.',
    },
  },

  cat: {
    desc: {
      en: "Prints the contents of one or more files straight to the terminal, with no pausing or scrolling controls (unlike less). Its name is short for 'concatenate': given several files, it prints them one after another as a single continuous stream, which is its actual original purpose, joining files together, and is why 'cat file1 file2 > combined' is a common idiom. For just reading a file, especially a long one, less is usually the better choice, since cat dumps everything to the screen at once.",
      pt: 'Mostra o conteúdo de um ou mais arquivos direto no terminal, sem nenhum controle de pausa ou rolagem (diferente do less). O nome é abreviação de "concatenate" (concatenar): dados vários arquivos, ele os imprime um atrás do outro como um único fluxo contínuo, que é seu propósito original de fato, juntar arquivos, e por isso "cat arquivo1 arquivo2 > combinado" é um idioma comum. Para simplesmente ler um arquivo, especialmente um longo, o less costuma ser a escolha melhor, já que o cat despeja tudo na tela de uma vez.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Numbers every line of the output.',
        pt: 'Numera todas as linhas da saída.',
      },
    },
    argHint: {
      en: 'The file to print.',
      pt: 'O arquivo a mostrar.',
    },
  },

  head: {
    desc: {
      en: "Shows the first lines of a file, 10 by default. It's the natural complement to tail, and the two are commonly used together to peek at both ends of a large file (a log, a CSV export) without opening the whole thing in an editor. Because it reads only as much as it needs and stops, head is also fast and safe on files far too large to load into memory at once.",
      pt: 'Mostra as primeiras linhas de um arquivo, 10 por padrão. É o complemento natural do tail, e os dois costumam ser usados juntos para dar uma olhada nas duas pontas de um arquivo grande (um log, uma exportação CSV) sem abrir o arquivo inteiro em um editor. Como só lê o quanto precisa e para, o head também é rápido e seguro em arquivos grandes demais para carregar na memória de uma vez.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Sets how many lines from the start of the file to show.',
        pt: 'Define quantas linhas do início do arquivo mostrar.',
      },
      '-c': {
        en: 'Shows the first N bytes instead of the first N lines, useful for binary data or, combined with a random source, for cutting a stream of random bytes down to an exact length.',
        pt: 'Mostra os primeiros N bytes em vez das primeiras N linhas, útil para dados binários ou, combinado com uma fonte aleatória, para cortar um fluxo de bytes aleatórios em um comprimento exato.',
      },
    },
    valueFlags: {
      '-n': 'generic',
      '-c': 'generic',
    },
    argHint: {
      en: 'The file to read.',
      pt: 'O arquivo a ler.',
    },
  },

  tail: {
    desc: {
      en: "Shows the last lines of a file, 10 by default, which is usually exactly what you want when checking a log: the most recent events are at the end, not the beginning. Its most important flag is -f ('follow'), which keeps the process running and prints new lines as they are appended in real time, making 'tail -f' the standard way to watch a log file live while debugging a running service.",
      pt: 'Mostra as últimas linhas de um arquivo, 10 por padrão, o que costuma ser exatamente o que se quer ao checar um log: os eventos mais recentes ficam no final, não no início. Sua flag mais importante é -f ("follow", seguir), que mantém o processo rodando e imprime novas linhas conforme são adicionadas em tempo real, fazendo do "tail -f" a forma padrão de acompanhar um log ao vivo enquanto se depura um serviço em execução.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Sets how many lines from the end of the file to show.',
        pt: 'Define quantas linhas do fim do arquivo mostrar.',
      },
      '-f': {
        en: 'Keeps following the file in real time, showing new lines as they are written.',
        pt: 'Continua acompanhando o arquivo em tempo real, mostrando novas linhas assim que são escritas.',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The file to read.',
      pt: 'O arquivo a ler.',
    },
    commonMistake: {
      en: 'tail -n 20 shows the last 20 lines, but tail -n +20 means something different: everything from line 20 onward, a plus sign flipping the meaning from counting backward to counting forward. That one-character difference is easy to miss when copying a command from memory, and the output can look plausible either way, right up until the line count is wrong.',
      pt: 'tail -n 20 mostra as últimas 20 linhas, mas tail -n +20 significa outra coisa: tudo a partir da linha 20 em diante, um sinal de mais invertendo o sentido de contar de trás para frente para contar para frente. Essa diferença de um caractere é fácil de passar despercebida ao copiar um comando de memória, e a saída pode parecer plausível dos dois jeitos, até a contagem de linhas dar errado.',
    },
  },

  ln: {
    desc: {
      en: "Creates a link between files, and the two kinds it can create behave quite differently. A hard link, the default, is another name pointing at the exact same data on disk; the two names are indistinguishable, deleting one leaves the data intact under the other, and it cannot cross filesystem boundaries. A symbolic link (with -s) is instead a small file that just stores a path to another file, more like a shortcut: it can point anywhere, including across filesystems or to something that doesn't exist yet, but breaks if the target is moved or deleted, which is why 'ln -s' is by far the more commonly used form in everyday scripting.",
      pt: 'Cria um link entre arquivos, e os dois tipos que ele consegue criar se comportam de forma bem diferente. Um link físico (hard link), o padrão, é outro nome apontando para exatamente os mesmos dados no disco; os dois nomes são indistinguíveis, apagar um deixa os dados intactos sob o outro, e ele não consegue atravessar limites de sistema de arquivos. Um link simbólico (com -s) é, em vez disso, um pequeno arquivo que só guarda um caminho para outro arquivo, mais parecido com um atalho: pode apontar para qualquer lugar, inclusive entre sistemas de arquivos ou para algo que ainda não existe, mas quebra se o alvo for movido ou apagado, e é por isso que "ln -s" é de longe a forma mais usada no dia a dia.',
    },
    subcommands: {},
    flags: {
      '-s': {
        en: 'Creates a symbolic link instead of a hard link.',
        pt: 'Cria um link simbólico em vez de um link físico.',
      },
      '-f': {
        en: 'Removes the destination file first if it already exists.',
        pt: 'Remove o arquivo de destino primeiro, se ele já existir.',
      },
    },
    argHint: {
      en: 'The target being linked to, or the link name to create (the last argument is normally the new link).',
      pt: 'O alvo sendo referenciado, ou o nome do link a criar (o último argumento normalmente é o novo link).',
    },
    commonMistake: {
      en: "The argument order in ln -s target linkname is easy to get backward, especially coming from cp, where the destination also goes last but means something different. Get it wrong and the link points at a name that doesn't exist yet instead of the file meant to be linked, so ls -l right after is worth running to confirm which way the arrow points.",
      pt: 'A ordem dos argumentos em ln -s alvo nomedolink é fácil de inverter, principalmente vindo do cp, que também tem o destino por último mas com outro sentido. Errar a ordem faz o link apontar para um nome que ainda não existe em vez do arquivo pretendido, então vale rodar ls -l logo depois para confirmar para que lado a seta aponta.',
    },
  },

  install: {
    desc: {
      en: "Copies a file to a destination and sets its permissions, owner, and group in a single atomic step, instead of the multi-command dance of cp followed by chmod and chown. Its real home is inside Makefiles and packaging scripts: a 'make install' target almost always ends with a series of 'install' calls that place freshly built binaries into /usr/local/bin, libraries into /usr/local/lib, and so on, each with the exact permissions that location expects (typically 755 for an executable, 644 for a plain file). Unlike a plain cp, it also creates any missing destination directories on request and replaces the target as a new file rather than editing it in place, which avoids corrupting a binary that another process might have open and already running.",
      pt: 'Copia um arquivo para um destino e já define suas permissões, dono e grupo em um único passo atômico, em vez da dança de vários comandos com cp seguido de chmod e chown. Seu lugar de verdade é dentro de Makefiles e scripts de empacotamento: um alvo "make install" quase sempre termina com uma série de chamadas a "install" que colocam binários recém-compilados em /usr/local/bin, bibliotecas em /usr/local/lib, e assim por diante, cada um com as permissões exatas que aquele lugar espera (tipicamente 755 para um executável, 644 para um arquivo comum). Diferente de um cp simples, também cria diretórios de destino que faltarem, se pedido, e substitui o alvo como um arquivo novo em vez de editá-lo no lugar, o que evita corromper um binário que outro processo já possa ter aberto e em execução.',
    },
    subcommands: {},
    flags: {
      '-m': {
        en: 'Sets the permission mode of the installed file (in octal, like chmod), 755 for an executable and 644 for a plain file are the common defaults.',
        pt: 'Define o modo de permissão do arquivo instalado (em octal, como no chmod), 755 para um executável e 644 para um arquivo comum são os padrões comuns.',
      },
      '-o': {
        en: 'Sets the owner of the installed file, usually only usable by root.',
        pt: 'Define o dono do arquivo instalado, geralmente só utilizável pelo root.',
      },
      '-g': {
        en: 'Sets the group of the installed file.',
        pt: 'Define o grupo do arquivo instalado.',
      },
      '-d': {
        en: 'Creates the given directories instead of installing a file, setting their mode, owner, and group the same way.',
        pt: 'Cria os diretórios indicados em vez de instalar um arquivo, definindo o modo, dono e grupo deles da mesma forma.',
      },
      '-D': {
        en: 'Creates any missing parent directories along the destination path before installing the file into it.',
        pt: 'Cria os diretórios pai que faltarem ao longo do caminho de destino antes de instalar o arquivo nele.',
      },
      '-v': {
        en: 'Shows each file as it is installed (verbose mode).',
        pt: 'Mostra cada arquivo conforme é instalado (modo verboso).',
      },
      '-s': {
        en: 'Strips debug symbols from the installed binary, reducing its file size.',
        pt: 'Remove símbolos de depuração do binário instalado, reduzindo o tamanho do arquivo.',
      },
    },
    valueFlags: {
      '-m': 'octal-mode',
      '-o': 'generic',
      '-g': 'generic',
    },
    argHint: {
      en: 'The source file to install, or, with -d, a directory to create. When two paths are given without -d, the first is the source and the last is the destination.',
      pt: 'O arquivo de origem a instalar, ou, com -d, um diretório a criar. Quando dois caminhos são dados sem -d, o primeiro é a origem e o último é o destino.',
    },
  },

  touch: {
    desc: {
      en: "Creates an empty file if it does not already exist, or, if it does, simply updates its last-modified timestamp to the current time without touching its actual contents. That second behavior, updating timestamps, is its original and literal purpose (the name comes from 'touching' a file to mark it as recently accessed), and still shows up in build systems and Makefiles that decide whether to rebuild something based on file modification times.",
      pt: 'Cria um arquivo vazio se ele ainda não existir, ou, se já existir, simplesmente atualiza a data de última modificação para o momento atual, sem tocar no conteúdo real. Esse segundo comportamento, atualizar datas, é seu propósito original e literal (o nome vem de "tocar" um arquivo para marcá-lo como acessado recentemente), e ainda aparece em sistemas de build e Makefiles que decidem se reconstroem algo com base na data de modificação dos arquivos.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file to create or update.',
      pt: 'O arquivo a criar ou atualizar.',
    },
    commonMistake: {
      en: "touch does not clear or reset a file's contents, only its timestamp, so running it on a file to empty it out leaves everything exactly as it was. Truncating a file to zero length needs something else entirely, > file or truncate -s 0 file, touch was never built for that job even though the two look interchangeable at a glance.",
      pt: 'O touch não limpa nem reseta o conteúdo de um arquivo, só a data, então rodá-lo para esvaziar o arquivo deixa tudo exatamente como estava. Truncar um arquivo para tamanho zero precisa de outra coisa, > arquivo ou truncate -s 0 arquivo, o touch nunca foi feito para esse trabalho, mesmo que os dois pareçam intercambiáveis à primeira vista.',
    },
  },

  less: {
    desc: {
      en: 'Shows the contents of a file one screen at a time, letting you scroll up and down, jump to a specific line, and search forward or backward for text, all without loading the whole file into memory first. Its name is a joke on the older command more (it does everything more does and more), and despite that name, less is actually the one commonly installed and used today, since it can scroll backward, which more famously could not. It is also what man pages, git log, and countless other commands pipe their output through automatically when it is longer than one screen.',
      pt: 'Mostra o conteúdo de um arquivo uma tela por vez, permitindo rolar para cima e para baixo, pular para uma linha específica, e buscar texto para frente ou para trás, tudo sem carregar o arquivo inteiro na memória primeiro. O nome é uma piada em cima do comando mais antigo more (ele faz tudo que o more faz e mais), e apesar do nome, o less é o que de fato costuma vir instalado e ser usado hoje, já que consegue rolar para trás, coisa que o more, famosamente, não conseguia. É também por onde páginas de manual, git log, e incontáveis outros comandos encanam a própria saída automaticamente quando ela é maior que uma tela.',
    },
    subcommands: {},
    flags: {
      '-N': {
        en: 'Shows line numbers.',
        pt: 'Mostra os números das linhas.',
      },
    },
    argHint: {
      en: 'The file to view.',
      pt: 'O arquivo a visualizar.',
    },
  },

  wc: {
    desc: {
      en: "Counts lines, words, and bytes in a file, or in whatever input it receives through a pipe, printing all three numbers by default. It shows up constantly at the end of a pipeline as a quick way to answer 'how many' questions, how many lines matched a grep, how many files a find turned up, without writing a whole script just to count.",
      pt: 'Conta linhas, palavras e bytes de um arquivo, ou de qualquer entrada que receba por pipe, imprimindo os três números por padrão. Aparece constantemente no final de um pipeline como forma rápida de responder perguntas de "quantos", quantas linhas um grep encontrou, quantos arquivos um find trouxe, sem precisar escrever um script inteiro só para contar.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Counts only lines.',
        pt: 'Conta só as linhas.',
      },
      '-w': {
        en: 'Counts only words.',
        pt: 'Conta só as palavras.',
      },
      '-c': {
        en: 'Counts only bytes.',
        pt: 'Conta só os bytes.',
      },
    },
    argHint: {
      en: 'The file to count.',
      pt: 'O arquivo a contar.',
    },
    commonMistake: {
      en: 'wc -l counts newline characters, not lines in the everyday sense, so a file whose last line has no trailing newline is undercounted by one. A script comparing wc -l against an expected row count can be off by exactly one for a file that looks completely normal when opened in an editor.',
      pt: 'O wc -l conta caracteres de quebra de linha, não linhas no sentido comum, então um arquivo cuja última linha não tem quebra de linha no final é contado a menos por um. Um script comparando wc -l com uma contagem esperada de linhas pode ficar errado por exatamente um, para um arquivo que parece completamente normal ao abrir num editor.',
    },
  },

  sort: {
    desc: {
      en: "Sorts the lines of a file or piped input, alphabetically by default, and it matters more than it sounds like it should because several other tools depend on sorted input to work correctly. uniq, for instance, only removes consecutive duplicate lines, so 'sort | uniq' is the standard idiom for deduplicating a list regardless of the original order, and it also shows up before join and comm, both of which require sorted input to line their two files up correctly.",
      pt: 'Ordena as linhas de um arquivo ou de uma entrada recebida por pipe, alfabeticamente por padrão, e isso importa mais do que parece porque várias outras ferramentas dependem de entrada ordenada para funcionar corretamente. O uniq, por exemplo, só remove linhas duplicadas consecutivas, então "sort | uniq" é o idioma padrão para remover duplicatas de uma lista independente da ordem original, e ele também aparece antes do join e do comm, que exigem entrada ordenada para alinhar seus dois arquivos corretamente.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Reverses the sort order.',
        pt: 'Inverte a ordem da ordenação.',
      },
      '-n': {
        en: 'Sorts numerically instead of alphabetically.',
        pt: 'Ordena numericamente em vez de alfabeticamente.',
      },
      '-u': {
        en: 'Removes duplicate lines from the output.',
        pt: 'Remove linhas duplicadas da saída.',
      },
      '-k': {
        en: 'Sorts by a specific column (field) instead of the whole line.',
        pt: 'Ordena por uma coluna (campo) específica em vez da linha inteira.',
      },
    },
    valueFlags: {
      '-k': 'generic',
    },
    argHint: {
      en: 'The file to sort.',
      pt: 'O arquivo a ordenar.',
    },
    commonMistake: {
      en: "Plain sort orders lines as text, so 10 comes before 2 the same way 'apple' comes before 'banana'. Sorting a column of numbers needs the -n flag, and sorting by a specific column instead of the whole line needs -k, two flags that get skipped often enough to produce output that looks right at a glance but is actually wrong.",
      pt: 'O sort simples ordena as linhas como texto, então 10 vem antes de 2 do mesmo jeito que "apple" vem antes de "banana". Ordenar uma coluna de números precisa da flag -n, e ordenar por uma coluna específica em vez da linha inteira precisa de -k, duas flags que ficam de fora com frequência suficiente para produzir uma saída que parece certa numa olhada rápida mas está errada.',
    },
  },

  uniq: {
    desc: {
      en: "Removes consecutive duplicate lines from its input, or, with -c, counts how many times each line repeats. The crucial word is consecutive: uniq only compares each line to the one immediately before it, so it will not catch duplicates scattered throughout an unsorted file, which is exactly why it is almost always used right after sort in a pipeline, 'sort file | uniq', to get true deduplication.",
      pt: 'Remove linhas duplicadas consecutivas da entrada, ou, com -c, conta quantas vezes cada linha se repete. A palavra crucial é consecutivas: o uniq só compara cada linha com a imediatamente anterior, então não vai pegar duplicatas espalhadas por um arquivo desordenado, e é exatamente por isso que quase sempre é usado logo depois do sort em um pipeline, "sort arquivo | uniq", para conseguir uma deduplicação de verdade.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Shows how many times each line occurred, prefixed to the line.',
        pt: 'Mostra quantas vezes cada linha ocorreu, na frente da linha.',
      },
      '-d': {
        en: 'Shows only the lines that had duplicates.',
        pt: 'Mostra apenas as linhas que tiveram duplicatas.',
      },
    },
    argHint: {
      en: 'The file to deduplicate.',
      pt: 'O arquivo a deduplicar.',
    },
  },

  cut: {
    desc: {
      en: "Extracts a portion of each line of input: a specific column when the data is delimited (like a CSV with -d, comma), or a fixed range of character positions when it isn't. It is the go-to tool for pulling one field out of structured command output, for example extracting just the PID column from ps, without reaching for the heavier machinery of awk, though awk can do everything cut does and considerably more once the extraction logic gets complicated.",
      pt: 'Extrai uma parte de cada linha da entrada: uma coluna específica quando os dados são delimitados (como um CSV, com -d vírgula), ou um intervalo fixo de posições de caractere quando não são. É a ferramenta natural para tirar um campo específico de uma saída de comando estruturada, por exemplo extrair só a coluna do PID do ps, sem precisar recorrer à maquinaria mais pesada do awk, embora o awk consiga fazer tudo que o cut faz e bem mais quando a lógica de extração complica.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Sets the field delimiter (default is tab).',
        pt: 'Define o delimitador de campo (o padrão é tab).',
      },
      '-f': {
        en: 'Selects which field(s) to extract.',
        pt: 'Seleciona qual(is) campo(s) extrair.',
      },
    },
    valueFlags: {
      '-d': 'generic',
      '-f': 'generic',
    },
    argHint: {
      en: 'The file to extract from.',
      pt: 'O arquivo do qual extrair.',
    },
  },

  xargs: {
    desc: {
      en: "Builds and runs a command using the input it receives, splitting it into individual arguments and appending them to the command given. It solves a specific gap in the shell's design: most Unix tools, rm, cp, chmod, expect their targets as command-line arguments, not as piped-in text, so a list of file names produced by find or grep can't be fed to them directly through a pipe alone. xargs bridges that gap, which is why 'find . -name \"*.tmp\" | xargs rm' is such a common pattern, and also batches arguments intelligently to avoid hitting the operating system's limit on how many can be passed to a single command invocation.",
      pt: 'Monta e roda um comando usando a entrada que recebe, dividindo-a em argumentos individuais e anexando-os ao comando dado. Ele resolve uma lacuna específica do design do shell: a maioria das ferramentas Unix, rm, cp, chmod, espera seus alvos como argumentos de linha de comando, não como texto recebido por pipe, então uma lista de nomes de arquivo produzida pelo find ou grep não pode ser passada a elas diretamente só por pipe. O xargs preenche essa lacuna, e é por isso que "find . -name \"*.tmp\" | xargs rm" é um padrão tão comum, além de agrupar argumentos de forma inteligente para não esbarrar no limite do sistema operacional de quantos podem ser passados para uma única chamada de comando.',
    },
    subcommands: {},
    flags: {
      '-I': {
        en: 'Defines a placeholder to represent each input item inside the command.',
        pt: 'Define um marcador para representar cada item da entrada dentro do comando.',
      },
      '-n': {
        en: 'Sets the maximum number of arguments passed per command execution.',
        pt: 'Define o número máximo de argumentos passados por execução do comando.',
      },
      '-0': {
        en: 'Expects null-separated input instead of whitespace-separated, safer for file names with spaces.',
        pt: 'Espera entrada separada por caracteres nulos em vez de espaços, mais seguro para nomes de arquivo com espaço.',
      },
    },
    valueFlags: {
      '-I': 'generic',
      '-n': 'generic',
    },
    commonMistake: {
      en: 'Piping find output straight into xargs breaks on any filename containing a space or newline, since xargs splits its input on whitespace by default. find -print0 paired with xargs -0 separates entries with a null byte instead, which no filename can legally contain, and that pairing is the one worth memorizing rather than the plain pipe.',
      pt: 'Encanar a saída do find direto para o xargs quebra em qualquer nome de arquivo com espaço ou quebra de linha, já que o xargs separa a entrada por espaço em branco por padrão. O find -print0 combinado com xargs -0 separa as entradas com um byte nulo, que nenhum nome de arquivo pode conter, e essa combinação é a que vale memorizar em vez do pipe simples.',
    },
  },

  sed: {
    desc: {
      en: "A stream editor: it applies text transformations to input one line at a time, without ever loading an interactive editor, which is exactly what makes it usable inside a script or a pipeline. The classic operation is substitution, 's/old/new/', find the pattern 'old' and replace it with 'new', but sed's actual scripting language covers deleting lines, inserting text, and much more, all expressed compactly. Combined with -i it edits files in place, which is convenient but also destructive with no confirmation, so testing a sed command without -i first, to see the result printed rather than written, is a habit worth having.",
      pt: 'Um editor de fluxo: aplica transformações de texto na entrada uma linha por vez, sem nunca abrir um editor interativo, o que é exatamente o que o torna utilizável dentro de um script ou pipeline. A operação clássica é a substituição, "s/antigo/novo/", encontre o padrão "antigo" e substitua por "novo", mas a linguagem de script do sed de fato cobre apagar linhas, inserir texto e muito mais, tudo expresso de forma compacta. Combinado com -i ele edita arquivos no lugar, o que é conveniente mas também destrutivo, sem confirmação, então testar um comando sed sem o -i primeiro, para ver o resultado impresso em vez de escrito, é um hábito que vale a pena ter.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Edits the file in place, instead of just printing the result.',
        pt: 'Edita o arquivo no lugar, em vez de apenas imprimir o resultado.',
      },
      '-e': {
        en: 'Adds a script to run, letting multiple be chained together.',
        pt: 'Adiciona um script para rodar, permitindo encadear vários.',
      },
      '-n': {
        en: 'Suppresses automatic printing of each line, useful together with the "p" command inside the script.',
        pt: 'Suprime a impressão automática de cada linha, útil junto com o comando "p" dentro do script.',
      },
    },
    valueFlags: {
      '-e': 'generic',
    },
    commonMistake: {
      en: "On macOS, sed -i requires an explicit (even if empty) backup suffix argument, 'sed -i \"\" ...', while GNU sed on Linux does not, a script written on one often breaks silently or errors on the other. It's also easy to forget that without -i, sed only prints the transformed text to standard output, the original file is untouched unless that output is redirected or -i is used.",
      pt: 'No macOS, o sed -i exige um argumento de sufixo de backup explícito (mesmo que vazio), "sed -i \'\' ...", enquanto o sed GNU no Linux não, um script escrito para um costuma quebrar silenciosamente ou dar erro no outro. Também é fácil esquecer que sem -i, o sed só imprime o texto transformado na saída padrão, o arquivo original fica intacto a menos que essa saída seja redirecionada ou o -i seja usado.',
    },
  },

  awk: {
    desc: {
      en: 'A full text-processing programming language, not just a command, built around a simple but powerful loop: for every line of input, split it into fields (by whitespace by default, or a custom separator with -F), and run a small script against them, with variables like $1, $2 referring to each field and $0 to the whole line. That structure makes it a natural fit for tabular data, generating quick reports, summing a column, reformatting log output, without the ceremony of writing a real program, and its name is literally the initials of its three creators, Aho, Weinberger, and Kernighan.',
      pt: 'Uma linguagem de programação completa de processamento de texto, não só um comando, construída em torno de um laço simples mas poderoso: para cada linha da entrada, divida-a em campos (por espaço em branco por padrão, ou um separador customizado com -F), e rode um pequeno script contra eles, com variáveis como $1, $2 se referindo a cada campo e $0 à linha inteira. Essa estrutura o torna natural para dados tabulares, gerar relatórios rápidos, somar uma coluna, reformatar saída de log, sem a cerimônia de escrever um programa de verdade, e o nome é literalmente as iniciais dos três criadores, Aho, Weinberger e Kernighan.',
    },
    subcommands: {},
    flags: {
      '-F': {
        en: 'Sets the field separator used to split each line.',
        pt: 'Define o separador de campo usado para dividir cada linha.',
      },
    },
    valueFlags: {
      '-F': 'generic',
    },
    commonMistake: {
      en: "Inside single quotes (the normal way to pass an awk script), $1 means awk's first field, but if the script is accidentally in double quotes, the shell tries to expand $1 as its OWN variable first, usually substituting nothing and silently breaking the script. Field numbers also shift if the separator (-F) doesn't match the actual delimiter in the data, a mismatched -F is one of the most common reasons an awk one-liner prints blank or wrong columns.",
      pt: 'Dentro de aspas simples (a forma normal de passar um script awk), $1 significa o primeiro campo do awk, mas se o script acidentalmente estiver entre aspas duplas, o próprio shell tenta expandir $1 como sua PRÓPRIA variável primeiro, geralmente substituindo por nada e quebrando o script silenciosamente. Os números de campo também mudam se o separador (-F) não bater com o delimitador real dos dados, um -F incompatível é um dos motivos mais comuns de um one-liner com awk imprimir colunas em branco ou erradas.',
    },
  },

  diff: {
    desc: {
      en: "Compares two files line by line and shows exactly what changed between them: which lines were added, removed, or modified. Its unified output format (-u), showing a few lines of unchanged context around each change with + and - prefixes, is the same format used by git diff and by software patches, so learning to read diff's output means being able to read a code review or a patch file too, they are all the same underlying convention.",
      pt: 'Compara dois arquivos linha por linha e mostra exatamente o que mudou entre eles: quais linhas foram adicionadas, removidas ou modificadas. Seu formato de saída unificado (-u), mostrando algumas linhas de contexto sem mudança ao redor de cada alteração com prefixos + e -, é o mesmo formato usado pelo git diff e por patches de software, então aprender a ler a saída do diff significa conseguir ler uma revisão de código ou um arquivo de patch também, todos seguem a mesma convenção por baixo.',
    },
    subcommands: {},
    flags: {
      '-u': {
        en: 'Shows the differences in unified format (with context lines), the format used by patches and git diff.',
        pt: 'Mostra as diferenças em formato unificado (com linhas de contexto), o formato usado por patches e pelo git diff.',
      },
      '-r': {
        en: 'Compares folders recursively.',
        pt: 'Compara pastas recursivamente.',
      },
    },
    argHint: {
      en: 'One of the two files or folders being compared.',
      pt: 'Um dos dois arquivos ou pastas sendo comparados.',
    },
    commonMistake: {
      en: 'diff returns exit code 1 when the files differ, not only when something breaks, so a script that checks for success the usual way (if diff a b; then ...) treats every difference as a failure. Reading the actual exit code, 0 for identical, 1 for different, 2 for an error, instead of assuming zero means success avoids that trap.',
      pt: 'O diff retorna o código de saída 1 quando os arquivos são diferentes, não só quando algo quebra, então um script que checa sucesso do jeito comum (if diff a b; then ...) trata qualquer diferença como falha. Ler o código de saída de verdade, 0 para idênticos, 1 para diferentes, 2 para erro, em vez de supor que zero significa sucesso, evita essa armadilha.',
    },
  },

  stat: {
    desc: {
      en: "Shows detailed filesystem metadata about a file that ls doesn't surface by default: exact size in bytes, the underlying inode number, permissions in both symbolic and octal form, and three separate timestamps that are easy to confuse, access time (last read), modification time (last content change), and change time (last metadata change, like a permission edit). That distinction between modification and change time in particular trips people up, and stat is the tool to reach for whenever the difference actually matters, like in forensics or cache-invalidation logic.",
      pt: 'Mostra metadados detalhados de sistema de arquivos sobre um arquivo que o ls não expõe por padrão: tamanho exato em bytes, o número do inode subjacente, permissões tanto em forma simbólica quanto octal, e três datas separadas fáceis de confundir, data de acesso (última leitura), data de modificação (última mudança de conteúdo), e data de alteração (última mudança de metadado, como uma edição de permissão). Essa distinção entre modificação e alteração em particular confunde bastante gente, e o stat é a ferramenta certa sempre que a diferença realmente importa, como em perícia forense ou lógica de invalidação de cache.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file to inspect.',
      pt: 'O arquivo a inspecionar.',
    },
  },

  basename: {
    desc: {
      en: "Strips the directory part of a path, leaving only the final file or folder name, so '/var/log/nginx/error.log' becomes just 'error.log'. It exists mainly for use inside scripts, where a full path is often available (from an argument or a loop over find's output) but only the bare filename is needed for a message, a new destination path, or a comparison, and dirname is its exact mirror image, extracting the directory portion instead.",
      pt: 'Remove a parte do diretório de um caminho, deixando apenas o nome final do arquivo ou pasta, então "/var/log/nginx/error.log" vira só "error.log". Existe principalmente para uso dentro de scripts, onde um caminho completo costuma estar disponível (de um argumento ou de um loop sobre a saída do find) mas só o nome puro do arquivo é necessário para uma mensagem, um novo caminho de destino, ou uma comparação, e o dirname é seu espelho exato, extraindo a parte do diretório em vez disso.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The path to strip the directory from.',
      pt: 'O caminho do qual remover o diretório.',
    },
  },

  dirname: {
    desc: {
      en: "Strips the final file or folder name from a path, leaving only the directory part, so '/var/log/nginx/error.log' becomes '/var/log/nginx'. It is the mirror image of basename, and the two are frequently used together in scripts that need to construct a new path in the same folder as an existing file, or that walk up a directory tree one level at a time.",
      pt: 'Remove o nome final de arquivo ou pasta de um caminho, deixando apenas a parte do diretório, então "/var/log/nginx/error.log" vira "/var/log/nginx". É o espelho do basename, e os dois costumam ser usados juntos em scripts que precisam construir um novo caminho na mesma pasta de um arquivo existente, ou que sobem uma árvore de diretórios um nível de cada vez.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The path to strip the file name from.',
      pt: 'O caminho do qual remover o nome do arquivo.',
    },
  },

  tree: {
    desc: {
      en: "Shows the contents of a directory as an indented, visual tree, recursing into every subfolder by default. Where ls shows one directory's contents at a time, tree shows the entire nested structure at a glance, which makes it a common first thing to run when getting oriented in an unfamiliar project or debugging a build output whose file layout matters.",
      pt: 'Mostra o conteúdo de um diretório como uma árvore visual indentada, entrando recursivamente em toda subpasta por padrão. Onde o ls mostra o conteúdo de um diretório por vez, o tree mostra a estrutura aninhada inteira de relance, o que o torna algo comum de rodar primeiro ao se situar em um projeto desconhecido ou depurar uma saída de build cujo layout de arquivos importa.',
    },
    subcommands: {},
    flags: {
      '-L': {
        en: 'Limits how many levels deep to descend, useful to avoid an overwhelming output on a large tree.',
        pt: 'Limita quantos níveis de profundidade percorrer, útil para evitar uma saída avassaladora em uma árvore grande.',
      },
      '-a': {
        en: 'Includes hidden files and folders.',
        pt: 'Inclui arquivos e pastas ocultos.',
      },
      '-d': {
        en: 'Shows only directories, omitting files entirely.',
        pt: 'Mostra apenas diretórios, omitindo arquivos por completo.',
      },
    },
    valueFlags: {
      '-L': 'generic',
    },
    argHint: {
      en: 'The directory to display. Defaults to the current directory when omitted.',
      pt: 'O diretório a exibir. Por padrão é o diretório atual, quando omitido.',
    },
  },

  realpath: {
    desc: {
      en: "Resolves a path, however messy, relative, full of .. and symbolic links, into its single canonical absolute form. It is what a script reaches for when it needs to know a file's real, unambiguous location regardless of how it was originally referenced, resolving every symlink along the way and collapsing every '../' and './' into the actual final destination.",
      pt: 'Resolve um caminho, por mais bagunçado que seja, relativo, cheio de .. e links simbólicos, para sua forma absoluta canônica única. É o que um script usa quando precisa saber a localização real e inequívoca de um arquivo, independente de como foi originalmente referenciado, resolvendo todo link simbólico pelo caminho e colapsando todo "../" e "./" no destino final de verdade.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The path to resolve.',
      pt: 'O caminho a resolver.',
    },
  },

  file: {
    desc: {
      en: 'Identifies what kind of data a file actually contains by inspecting its content, not its name or extension, which is exactly what makes it useful: a file renamed from photo.exe to photo.jpg is still detected as an executable, because file reads the first bytes and checks them against a database of known signatures (magic numbers) rather than trusting the label on the tin. It is a fast, low-stakes first step whenever a file of unknown or suspicious origin needs to be understood before opening it with something else.',
      pt: 'Identifica que tipo de dado um arquivo realmente contém inspecionando seu conteúdo, não o nome ou a extensão, o que é exatamente o que o torna útil: um arquivo renomeado de foto.exe para foto.jpg ainda é detectado como um executável, porque o file lê os primeiros bytes e os checa contra um banco de assinaturas conhecidas (magic numbers) em vez de confiar no rótulo. É um primeiro passo rápido e de baixo risco sempre que um arquivo de origem desconhecida ou suspeita precisa ser entendido antes de abri-lo com outra coisa.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Reports the MIME type (like text/plain or image/jpeg) instead of a human-readable description.',
        pt: 'Relata o tipo MIME (como text/plain ou image/jpeg) em vez de uma descrição legível por humanos.',
      },
    },
    argHint: {
      en: 'The file to identify.',
      pt: 'O arquivo a identificar.',
    },
  },

  tr: {
    desc: {
      en: "Translates or deletes individual characters from its input, one character at a time, streamed straight through without ever understanding lines or fields the way sed or awk do. 'tr a-z A-Z' upper-cases text by mapping each lowercase letter to its uppercase counterpart, and 'tr -d' deletes every character in a given set outright, both classic building blocks in shell one-liners for quick text cleanup. Combined as 'tr -dc SET', it keeps only the characters in SET and deletes everything else, the standard idiom behind reading /dev/urandom to generate a random password built only from an allowed character set.",
      pt: 'Traduz ou apaga caracteres individuais da entrada, um caractere de cada vez, direto no fluxo sem nunca entender linhas ou campos como o sed ou o awk fazem. "tr a-z A-Z" transforma texto em maiúsculas mapeando cada letra minúscula para sua correspondente maiúscula, e "tr -d" apaga de vez todo caractere em um conjunto dado, ambos blocos clássicos de construção em one-liners de shell para limpeza rápida de texto. Combinado como "tr -dc CONJUNTO", ele mantém só os caracteres do CONJUNTO e apaga todo o resto, o idioma padrão por trás de ler o /dev/urandom para gerar uma senha aleatória construída só com um conjunto de caracteres permitido.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Deletes every character in the given set, instead of translating.',
        pt: 'Apaga todo caractere no conjunto dado, em vez de traduzir.',
      },
      '-c': {
        en: 'Complements the given set: operates on every character NOT in it, instead of the characters listed. Combined with -d, this deletes everything outside the set, keeping only allowed characters.',
        pt: 'Complementa o conjunto dado: opera em todo caractere que NÃO está nele, em vez dos caracteres listados. Combinado com -d, isso apaga tudo fora do conjunto, mantendo só os caracteres permitidos.',
      },
      '-s': {
        en: 'Squeezes repeated consecutive occurrences of a character down to a single one.',
        pt: 'Reduz ocorrências consecutivas repetidas de um caractere para uma só.',
      },
    },
    argHint: {
      en: "The set of characters to translate from, or (with -d) to delete, or (with -dc together) to keep, deleting everything else. Ranges like A-Z and classes like 0-9 can be combined freely, as in 'A-Za-z0-9'.",
      pt: 'O conjunto de caracteres a traduzir, ou (com -d) a apagar, ou (com -dc juntos) a manter, apagando todo o resto. Faixas como A-Z e classes como 0-9 podem ser combinadas livremente, como em "A-Za-z0-9".',
    },
    commonMistake: {
      en: 'tr only operates on single characters, never whole strings or words, so \'tr "hello" "hi"\' does not replace the word hello with hi, it maps h→h, e→i, and drops the rest of the second set\'s shortfall in a way that rarely does what\'s expected. For whole-word or whole-string replacement, sed is the right tool instead.',
      pt: 'O tr só opera em caracteres únicos, nunca em strings ou palavras inteiras, então "tr \\"hello\\" \\"hi\\"" não troca a palavra hello por hi, ele mapeia h→h, e→i, e o resto acaba de um jeito que raramente é o esperado. Para trocar palavras ou strings inteiras, o sed é a ferramenta certa.',
    },
  },

  printf: {
    desc: {
      en: 'Prints formatted text, following the same format-string convention as the C standard library function of the same name, with placeholders like %s for a string and %d for a number. It is the more precise, more portable sibling of echo: unlike echo, its behavior does not vary between shells, it never accidentally interprets a leading dash in the text as a flag, and it never appends a trailing newline unless the format string explicitly includes \\n, which makes it the safer choice inside scripts that build output carefully.',
      pt: 'Imprime texto formatado, seguindo a mesma convenção de string de formato da função de mesmo nome da biblioteca padrão C, com marcadores como %s para uma string e %d para um número. É o irmão mais preciso e portável do echo: diferente do echo, seu comportamento não varia entre shells, ele nunca interpreta por acidente um hífen no início do texto como uma flag, e nunca acrescenta uma quebra de linha no final a menos que a string de formato inclua \\n explicitamente, o que o torna a escolha mais segura dentro de scripts que constroem saída com cuidado.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The format string, followed by the values to substitute into it.',
      pt: 'A string de formato, seguida dos valores a substituir nela.',
    },
    commonMistake: {
      en: 'printf "$value" treats value itself as the format string, so a % character anywhere inside it is read as a placeholder instead of literal text, producing garbled output or an error about a missing argument. printf "%s" "$value" keeps the format string fixed and passes value only as data to fill it, the safe pattern regardless of what characters value happens to contain.',
      pt: 'printf "$valor" trata o próprio valor como string de formato, então qualquer caractere % dentro dele é lido como um marcador em vez de texto literal, produzindo saída bagunçada ou um erro sobre argumento faltando. printf "%s" "$valor" mantém a string de formato fixa e passa valor só como dado para preenchê-la, o padrão seguro independente de quais caracteres valor contenha.',
    },
  },

  nl: {
    desc: {
      en: 'Numbers the lines of a file and prints them, similar to cat -n but with far more control over the numbering format, width, and which lines get numbered at all (blank lines can be skipped by default, unlike cat -n).',
      pt: 'Numera as linhas de um arquivo e as imprime, parecido com cat -n mas com bem mais controle sobre o formato de numeração, a largura, e quais linhas de fato recebem número (linhas em branco podem ser puladas por padrão, diferente do cat -n).',
    },
    subcommands: {},
    flags: {
      '-b': {
        en: "Sets which lines get numbered: 'a' for all lines, 't' for non-blank lines only (the default).",
        pt: 'Define quais linhas recebem número: "a" para todas as linhas, "t" só para as não vazias (o padrão).',
      },
    },
    valueFlags: {
      '-b': 'generic',
    },
    argHint: {
      en: 'The file to number.',
      pt: 'O arquivo a numerar.',
    },
  },

  comm: {
    desc: {
      en: "Compares two already-sorted files line by line and prints three columns: lines only in the first file, lines only in the second, and lines common to both. Because it depends on sorted input to work correctly, it is almost always used right after piping both sides through sort, and it is the tool of choice for a genuine set comparison (what changed, what is unique to each side) rather than diff's line-by-line edit view.",
      pt: 'Compara dois arquivos já ordenados linha por linha e imprime três colunas: linhas só no primeiro arquivo, linhas só no segundo, e linhas comuns aos dois. Como depende de entrada ordenada para funcionar corretamente, quase sempre é usado logo depois de passar os dois lados pelo sort, e é a ferramenta certa para uma comparação de conjunto de verdade (o que mudou, o que é único de cada lado), diferente da visão de edição linha a linha do diff.',
    },
    subcommands: {},
    flags: {
      '-1': {
        en: 'Suppresses the column of lines unique to the first file.',
        pt: 'Suprime a coluna de linhas exclusivas do primeiro arquivo.',
      },
      '-2': {
        en: 'Suppresses the column of lines unique to the second file.',
        pt: 'Suprime a coluna de linhas exclusivas do segundo arquivo.',
      },
      '-3': {
        en: 'Suppresses the column of lines common to both files.',
        pt: 'Suprime a coluna de linhas comuns aos dois arquivos.',
      },
    },
    argHint: {
      en: 'One of the two sorted files being compared.',
      pt: 'Um dos dois arquivos ordenados sendo comparados.',
    },
  },

  join: {
    desc: {
      en: 'Joins the lines of two sorted files that share a common field, similar in spirit to a SQL JOIN but operating on plain text files by field position or delimiter rather than database tables. Like comm and sort -m, it depends on both inputs being sorted on the join field beforehand, which is a common source of confusing empty output when someone forgets that requirement.',
      pt: 'Junta as linhas de dois arquivos ordenados que compartilham um campo comum, parecido em espírito com um JOIN de SQL mas operando em arquivos de texto puro por posição de campo ou delimitador, não em tabelas de banco de dados. Como o comm e o sort -m, depende de ambas as entradas estarem ordenadas pelo campo de junção antes, o que é uma fonte comum de saída vazia confusa quando alguém esquece esse requisito.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Sets the field delimiter (default is whitespace).',
        pt: 'Define o delimitador de campo (o padrão é espaço em branco).',
      },
      '-1': {
        en: 'Sets which field in the first file to join on (field 1 by default).',
        pt: 'Define qual campo do primeiro arquivo usar para a junção (campo 1 por padrão).',
      },
      '-2': {
        en: 'Sets which field in the second file to join on (field 1 by default).',
        pt: 'Define qual campo do segundo arquivo usar para a junção (campo 1 por padrão).',
      },
    },
    valueFlags: {
      '-t': 'generic',
      '-1': 'generic',
      '-2': 'generic',
    },
    argHint: {
      en: 'One of the two sorted files being joined.',
      pt: 'Um dos dois arquivos ordenados sendo unidos.',
    },
  },

  paste: {
    desc: {
      en: "Merges the lines of multiple files side by side, joining the Nth line of each file into one line separated by a delimiter (a tab by default), the opposite operation of cut in a sense: where cut pulls a column out of one file, paste combines several files into columns. 'paste -d, a.txt b.txt' is a quick way to zip two single-column lists into a two-column CSV.",
      pt: 'Junta as linhas de vários arquivos lado a lado, combinando a linha N de cada arquivo em uma única linha separada por um delimitador (tab por padrão), em certo sentido a operação oposta do cut: onde o cut tira uma coluna de um arquivo, o paste combina vários arquivos em colunas. "paste -d, a.txt b.txt" é uma forma rápida de juntar duas listas de uma coluna em um CSV de duas colunas.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Sets the delimiter used between merged fields (a tab by default).',
        pt: 'Define o delimitador usado entre os campos juntados (tab por padrão).',
      },
      '-s': {
        en: 'Merges each file into a single line instead of pairing lines across files.',
        pt: 'Junta cada arquivo em uma única linha, em vez de parear linhas entre arquivos.',
      },
    },
    valueFlags: {
      '-d': 'generic',
    },
    argHint: {
      en: 'A file whose lines will be merged in as a column.',
      pt: 'Um arquivo cujas linhas serão juntadas como uma coluna.',
    },
  },

  column: {
    desc: {
      en: 'Formats input into neatly aligned columns, turning delimiter-separated text (like a CSV or the output of another command) into a readable table with padded, lined-up columns, which raw text with inconsistent field widths never quite achieves on its own.',
      pt: 'Formata a entrada em colunas alinhadas de forma organizada, transformando texto separado por delimitador (como um CSV ou a saída de outro comando) em uma tabela legível com colunas alinhadas e espaçadas, algo que texto bruto com larguras de campo inconsistentes nunca alcança sozinho.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Determines the number of columns automatically and aligns them in a table.',
        pt: 'Determina o número de colunas automaticamente e as alinha em uma tabela.',
      },
      '-s': {
        en: 'Sets the input field separator (whitespace by default).',
        pt: 'Define o separador de campo da entrada (espaço em branco por padrão).',
      },
    },
    valueFlags: {
      '-s': 'generic',
    },
  },

  readlink: {
    desc: {
      en: 'Prints the target a symbolic link points to, or, with -f, resolves a path all the way through every symlink to its final canonical absolute form, similar to realpath. It is a common building block in scripts that need to find out where a script itself actually lives on disk, since $0 can be a symlink and readlink -f "$0" resolves it to the real file.',
      pt: 'Imprime o alvo para o qual um link simbólico aponta, ou, com -f, resolve um caminho por completo através de todo link simbólico até sua forma absoluta canônica final, parecido com o realpath. É um bloco de construção comum em scripts que precisam descobrir onde o próprio script realmente está no disco, já que $0 pode ser um link simbólico e readlink -f "$0" o resolve para o arquivo real.',
    },
    subcommands: {},
    flags: {
      '-f': {
        en: 'Resolves every symlink along the path, following recursively to the final canonical target.',
        pt: 'Resolve todo link simbólico ao longo do caminho, seguindo recursivamente até o alvo canônico final.',
      },
    },
    argHint: {
      en: 'The symbolic link or path to resolve.',
      pt: 'O link simbólico ou caminho a resolver.',
    },
    commonMistake: {
      en: "Plain readlink without -f prints only the immediate target of a symlink, one level, so a chain of symlinks pointing to other symlinks comes back only half resolved. -f is what actually walks the whole chain down to the real file, and skipping it is why a script's captured path can still turn out to be another symlink instead of the file it expected.",
      pt: 'O readlink puro, sem -f, imprime só o alvo imediato de um link simbólico, um nível, então uma cadeia de links simbólicos apontando para outros links volta só parcialmente resolvida. O -f é o que de fato percorre a cadeia inteira até o arquivo real, e pular ele é o motivo de um caminho capturado por um script ainda poder ser outro link simbólico em vez do arquivo esperado.',
    },
  },

  shred: {
    desc: {
      en: "Overwrites a file's contents multiple times with patterns of data before optionally deleting it, an attempt to make the original data harder to recover than a plain rm would, which only removes the directory entry and leaves the actual data on disk until it happens to be overwritten later. On modern SSDs and journaling or copy-on-write filesystems, this guarantee is considerably weaker than it was on old spinning disks, since the drive's own wear-leveling can silently keep old copies of the data shred never touches.",
      pt: 'Sobrescreve o conteúdo de um arquivo várias vezes com padrões de dados antes de opcionalmente apagá-lo, uma tentativa de tornar os dados originais mais difíceis de recuperar do que um rm simples faria, que só remove a entrada de diretório e deixa os dados de fato no disco até que sejam sobrescritos mais tarde por acaso. Em SSDs modernos e sistemas de arquivos com journaling ou copy-on-write, essa garantia é consideravelmente mais fraca do que era em discos giratórios antigos, já que o próprio nivelamento de desgaste do drive pode manter silenciosamente cópias antigas dos dados que o shred nunca toca.',
    },
    subcommands: {},
    flags: {
      '-u': {
        en: 'Deletes the file after overwriting it, instead of leaving the (now scrambled) file in place.',
        pt: 'Apaga o arquivo depois de sobrescrevê-lo, em vez de deixar o arquivo (agora embaralhado) no lugar.',
      },
      '-n': {
        en: 'Sets how many overwrite passes to perform (3 by default).',
        pt: 'Define quantas passagens de sobrescrita realizar (3 por padrão).',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The file to overwrite and optionally delete.',
      pt: 'O arquivo a sobrescrever e opcionalmente apagar.',
    },
    commonMistake: {
      en: "shred only overwrites the exact file path given; it does nothing about a backup, a cloud sync copy, a snapshot, or a version still sitting in git history. Deleting a file securely from one place says nothing about every other place a copy of it might already be, and shred can't reach any of them.",
      pt: 'O shred só sobrescreve o caminho exato de arquivo dado; não faz nada sobre um backup, uma cópia sincronizada na nuvem, um snapshot, ou uma versão ainda presente no histórico do git. Apagar um arquivo com segurança de um lugar não diz nada sobre todo outro lugar onde uma cópia dele já possa estar, e o shred não consegue alcançar nenhum desses.',
    },
  },

  locate: {
    desc: {
      en: 'Finds files by name almost instantly by searching a prebuilt index of the entire filesystem, instead of walking the directory tree live the way find does. That speed comes at the cost of freshness: the index (built by updatedb, usually run automatically once a day via cron) can be hours out of date, so a file created moments ago may simply not show up yet.',
      pt: 'Encontra arquivos pelo nome quase instantaneamente pesquisando um índice pré-construído do sistema de arquivos inteiro, em vez de percorrer a árvore de diretórios ao vivo como o find faz. Essa velocidade custa em atualidade: o índice (construído pelo updatedb, geralmente rodado automaticamente uma vez por dia via cron) pode estar horas desatualizado, então um arquivo criado momentos atrás pode simplesmente ainda não aparecer.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Ignores case differences when matching.',
        pt: 'Ignora diferença entre maiúsculas e minúsculas na busca.',
      },
    },
    argHint: {
      en: 'The name pattern to search for in the index.',
      pt: 'O padrão de nome a procurar no índice.',
    },
    commonMistake: {
      en: 'locate matches the search pattern against the whole path, not just the file name, so locate report also returns every file inside a folder called reports or a project named report-generator, not only files actually named report. Anchoring the pattern more precisely, or piping the result through grep for the exact name, cuts that noise down.',
      pt: 'O locate compara o padrão de busca contra o caminho inteiro, não só o nome do arquivo, então locate relatorio também retorna todo arquivo dentro de uma pasta chamada relatorios ou um projeto chamado gerador-de-relatorio, não só arquivos realmente chamados relatorio. Ancorar o padrão de forma mais precisa, ou encadear o resultado com grep para o nome exato, reduz esse ruído.',
    },
  },

  mktemp: {
    desc: {
      en: 'Creates a new, empty file (or, with -d, a directory) with a guaranteed-unique, randomly generated name inside a temporary location, and prints that name so a script can capture it. Using mktemp instead of hardcoding a temp file name like /tmp/myscript.tmp avoids a real security and correctness problem: a predictable temp file name can be created in advance by another process (or attacker) to intercept or corrupt what the script writes to it.',
      pt: 'Cria um arquivo novo e vazio (ou, com -d, um diretório) com um nome garantidamente único e gerado aleatoriamente dentro de um local temporário, e imprime esse nome para que um script possa capturá-lo. Usar mktemp em vez de fixar um nome de arquivo temporário como /tmp/meuscript.tmp evita um problema real de segurança e corretude: um nome de arquivo temporário previsível pode ser criado com antecedência por outro processo (ou atacante) para interceptar ou corromper o que o script escreve nele.',
    },
    subcommands: {},
    flags: {
      '-d': {
        en: 'Creates a temporary directory instead of a file.',
        pt: 'Cria um diretório temporário em vez de um arquivo.',
      },
    },
    commonMistake: {
      en: 'mktemp creates the file and hands back its path, but nothing removes it automatically, a script that exits early on an error still leaves that temporary file sitting in /tmp indefinitely. Pairing the mktemp call with a trap on EXIT that removes it is what actually guarantees cleanup, not mktemp by itself.',
      pt: 'O mktemp cria o arquivo e devolve o caminho dele, mas nada remove esse arquivo automaticamente, um script que sai mais cedo por causa de um erro deixa esse arquivo temporário parado em /tmp indefinidamente. Combinar a chamada do mktemp com um trap no EXIT que o remove é o que de fato garante a limpeza, não o mktemp sozinho.',
    },
  },

  truncate: {
    desc: {
      en: "Shrinks or extends a file to an exact specified size, without touching whatever content is left. Growing a file this way creates a sparse file padded with zero bytes that don't actually occupy disk space yet, which makes 'truncate -s 0 file' a fast way to empty a log file in place (unlike deleting and recreating it, this keeps the same inode, so a process already holding the file open keeps writing to the same, now-empty, file).",
      pt: 'Encolhe ou estende um arquivo para um tamanho exato especificado, sem tocar no conteúdo que sobra. Aumentar um arquivo dessa forma cria um arquivo esparso preenchido com bytes zero que ainda não ocupam espaço em disco de fato, o que faz de "truncate -s 0 arquivo" uma forma rápida de esvaziar um arquivo de log no lugar (diferente de apagar e recriar, isso mantém o mesmo inode, então um processo que já tem o arquivo aberto continua escrevendo no mesmo arquivo, agora vazio).',
    },
    subcommands: {},
    flags: {
      '-s': {
        en: 'Sets the target size for the file, such as 0 to empty it or 1G for one gigabyte.',
        pt: 'Define o tamanho alvo do arquivo, como 0 para esvaziá-lo ou 1G para um gigabyte.',
      },
    },
    valueFlags: {
      '-s': 'generic',
    },
    argHint: {
      en: 'The file to resize.',
      pt: 'O arquivo a redimensionar.',
    },
  },

  cmp: {
    desc: {
      en: "Compares two files byte by byte and reports the position of the first difference found, then stops, unlike diff, which shows every difference in a line-oriented view. It is the right tool specifically for binary files, where a line-based diff makes no sense, and for a fast yes-or-no answer to 'are these two files identical' without caring what the difference actually is.",
      pt: 'Compara dois arquivos byte a byte e relata a posição da primeira diferença encontrada, e então para, diferente do diff, que mostra toda diferença em uma visão orientada a linha. É a ferramenta certa especificamente para arquivos binários, onde um diff baseado em linha não faz sentido, e para uma resposta rápida de sim-ou-não sobre "esses dois arquivos são idênticos" sem se importar com qual é de fato a diferença.',
    },
    subcommands: {},
    flags: {
      '-s': {
        en: 'Suppresses all output, only setting the exit code to indicate whether the files matched.',
        pt: 'Suprime toda saída, só definindo o código de saída para indicar se os arquivos combinaram.',
      },
    },
    argHint: {
      en: 'One of the two files being compared byte by byte.',
      pt: 'Um dos dois arquivos sendo comparados byte a byte.',
    },
  },

  tac: {
    desc: {
      en: 'Prints a file with its lines in reverse order, last line first, exactly cat spelled backwards and doing exactly the opposite: where cat concatenates files in order, tac reverses their line order. It shows up when the most recent entries in an append-only log (where new lines get added at the end) need to be read newest-first.',
      pt: 'Imprime um arquivo com suas linhas em ordem reversa, última linha primeiro, exatamente cat escrito ao contrário e fazendo exatamente o oposto: onde o cat concatena arquivos em ordem, o tac inverte a ordem das linhas deles. Aparece quando as entradas mais recentes de um log só-de-anexar (onde linhas novas são adicionadas no final) precisam ser lidas da mais nova para a mais antiga.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file to print in reverse line order.',
      pt: 'O arquivo a imprimir em ordem reversa de linhas.',
    },
  },

  shuf: {
    desc: {
      en: "Randomly shuffles the lines of its input and prints them in that new random order, the command-line way to pick a random sample or randomize a list, 'shuf -n 1 file' picks one random line, which is a common idiom for randomly selecting an item from a list inside a script.",
      pt: 'Embaralha aleatoriamente as linhas da entrada e as imprime nessa nova ordem aleatória, a forma de linha de comando de escolher uma amostra aleatória ou aleatorizar uma lista, "shuf -n 1 arquivo" escolhe uma linha aleatória, um idioma comum para selecionar aleatoriamente um item de uma lista dentro de um script.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Limits the output to N lines, instead of shuffling and printing everything.',
        pt: 'Limita a saída a N linhas, em vez de embaralhar e imprimir tudo.',
      },
    },
    valueFlags: {
      '-n': 'generic',
    },
    argHint: {
      en: 'The file whose lines will be shuffled.',
      pt: 'O arquivo cujas linhas serão embaralhadas.',
    },
  },

  fold: {
    desc: {
      en: 'Wraps each line of input so that no line is longer than a given width, breaking long lines at that column regardless of word boundaries, a blunt but simple tool for making wide text fit a narrower terminal or fixed-width output format.',
      pt: 'Quebra cada linha da entrada para que nenhuma linha ultrapasse uma largura dada, cortando linhas longas naquela coluna independente de limite de palavra, uma ferramenta simples e direta para fazer texto largo caber em um terminal mais estreito ou formato de saída de largura fixa.',
    },
    subcommands: {},
    flags: {
      '-w': {
        en: 'Sets the maximum line width (80 characters by default).',
        pt: 'Define a largura máxima de linha (80 caracteres por padrão).',
      },
      '-s': {
        en: 'Breaks at the last whitespace before the width limit instead of mid-word.',
        pt: 'Quebra no último espaço antes do limite de largura, em vez de no meio da palavra.',
      },
    },
    valueFlags: {
      '-w': 'generic',
    },
  },

  rev: {
    desc: {
      en: "Reverses the characters of each line, left to right becomes right to left, a small, oddly specific tool that mostly shows up combined with cut in clever one-liners to extract something counted from the end of a line rather than the start, since cut only understands 'from the beginning'.",
      pt: 'Inverte os caracteres de cada linha, esquerda para direita vira direita para esquerda, uma ferramenta pequena e meio específica que geralmente aparece combinada com o cut em one-liners espertos para extrair algo contado a partir do final de uma linha, não do início, já que o cut só entende "a partir do começo".',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The file whose lines will be character-reversed.',
      pt: 'O arquivo cujas linhas terão os caracteres invertidos.',
    },
  },

  split: {
    desc: {
      en: 'Breaks a single large file into multiple smaller pieces, by size or by number of lines, each with a generated sequential suffix, and cat is the tool that reverses the process (concatenating the pieces back together in order restores the original). It commonly shows up when a file is too big to email, upload, or fit on removable media as one piece.',
      pt: 'Divide um único arquivo grande em vários pedaços menores, por tamanho ou por número de linhas, cada um com um sufixo sequencial gerado, e o cat é a ferramenta que reverte o processo (concatenar os pedaços de volta em ordem restaura o original). Costuma aparecer quando um arquivo é grande demais para mandar por email, enviar, ou caber em mídia removível de uma vez só.',
    },
    subcommands: {},
    flags: {
      '-b': {
        en: 'Splits by byte size per piece, such as 100M for 100 megabytes each.',
        pt: 'Divide por tamanho em bytes por pedaço, como 100M para 100 megabytes cada.',
      },
      '-l': {
        en: 'Splits by number of lines per piece, instead of by size.',
        pt: 'Divide por número de linhas por pedaço, em vez de por tamanho.',
      },
    },
    valueFlags: {
      '-b': 'generic',
      '-l': 'generic',
    },
    argHint: {
      en: 'The file to split into pieces.',
      pt: 'O arquivo a dividir em pedaços.',
    },
  },
};
