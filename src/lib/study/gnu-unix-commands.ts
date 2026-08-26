import type { StudyCard, StudyTopic } from './types';

export const gnuUnixCommandsTopic: StudyTopic = {
  id: 'gnu-unix-commands',
  objectiveCode: '103',
  title: { en: 'GNU and Unix Commands', pt: 'Comandos GNU e Unix' },
};

export const gnuUnixCommandsCards: StudyCard[] = [
  {
    id: 'what-is-a-shell',
    topic: 'gnu-unix-commands',
    front: { en: 'What is a shell?', pt: 'O que é um shell?' },
    back: {
      en: 'A shell is the program that reads the commands a user types and runs them, the interface between a human (or a script) and the operating system. Bash is the most common one on Linux, but others like zsh, dash, and fish exist, offering different scripting syntax and interactive features while all serving the same basic role.',
      pt: 'Um shell é o programa que lê os comandos que um usuário digita e os executa, a interface entre um humano (ou um script) e o sistema operacional. O Bash é o mais comum no Linux, mas outros como zsh, dash e fish existem, oferecendo sintaxe de script e recursos interativos diferentes enquanto cumprem o mesmo papel básico.',
    },
    details: {
      en: 'The shell does real work before any program starts. It expands globs and variables, splits the line into words, sets up redirections and pipes, and only then runs the command, which is why quoting changes the result so often. Some names you type are not programs at all: cd, export and umask are builtins, because they have to change the shell itself rather than a child process.',
      pt: 'O shell faz trabalho de verdade antes de qualquer programa começar. Ele expande globs e variáveis, divide a linha em palavras, monta redirecionamentos e pipes, e só então roda o comando, e é por isso que as aspas mudam o resultado com tanta frequência. Alguns nomes que você digita não são programas: cd, export e umask são builtins, porque precisam mudar o próprio shell e não um processo filho.',
    },
    keyPoints: [
      {
        en: 'The login shell of an account is the last field of its line in /etc/passwd, and /bin/false there blocks interactive logins.',
        pt: 'O shell de login de uma conta é o último campo da linha dela no /etc/passwd, e /bin/false ali bloqueia logins interativos.',
      },
      {
        en: 'type tells you whether a name is a builtin, an alias or a file on disk, which explains why which sometimes misleads.',
        pt: 'O type diz se um nome é builtin, alias ou arquivo em disco, o que explica por que o which às vezes engana.',
      },
      {
        en: 'A script starting with #!/bin/sh may behave differently from bash, because dash lacks several bash extensions.',
        pt: 'Um script que começa com #!/bin/sh pode se comportar diferente do bash, porque o dash não tem várias extensões do bash.',
      },
    ],
    commands: ['sh', 'type', 'which', 'export', 'alias'],
  },
  {
    id: 'standard-streams',
    topic: 'gnu-unix-commands',
    front: { en: 'What are stdin, stdout, and stderr?', pt: 'O que são stdin, stdout e stderr?' },
    back: {
      en: "Every process starts with three standard communication channels already open: stdin (standard input, where it reads input from, usually the keyboard), stdout (standard output, where its normal results go, usually the terminal), and stderr (standard error, a separate channel for error messages, kept apart from stdout specifically so a program's real output can be redirected to a file without error noise mixing in).",
      pt: 'Todo processo começa com três canais de comunicação padrão já abertos: stdin (entrada padrão, de onde ele lê entrada, geralmente o teclado), stdout (saída padrão, para onde vão seus resultados normais, geralmente o terminal), e stderr (erro padrão, um canal separado para mensagens de erro, mantido à parte do stdout justamente para que a saída real de um programa possa ser redirecionada para um arquivo sem misturar ruído de erro).',
    },
    details: {
      en: 'Each stream is a numbered file descriptor, 0 for input, 1 for output and 2 for errors, and redirection only rewires those numbers. The order matters: command > file 2>&1 sends both streams to the file, while command 2>&1 > file points errors at the terminal because descriptor 2 was copied before descriptor 1 moved. Redirecting to /dev/null throws a stream away without any program noticing.',
      pt: 'Cada fluxo é um descritor de arquivo numerado, 0 para entrada, 1 para saída e 2 para erros, e o redirecionamento só remonta esses números. A ordem importa: comando > arquivo 2>&1 manda os dois fluxos para o arquivo, enquanto comando 2>&1 > arquivo aponta os erros para o terminal porque o descritor 2 foi copiado antes de o descritor 1 mudar. Redirecionar para /dev/null joga um fluxo fora sem nenhum programa perceber.',
    },
    keyPoints: [
      {
        en: 'A pipe carries standard output only, so errors keep going to the terminal unless you merge them first.',
        pt: 'Um pipe carrega só a saída padrão, então os erros continuam indo para o terminal a menos que você junte eles antes.',
      },
      {
        en: 'The single greater than sign truncates the file and the double one appends to it.',
        pt: 'O sinal de maior sozinho trunca o arquivo e o dobrado acrescenta ao final dele.',
      },
      {
        en: 'tee writes a stream to a file and passes it along at the same time, which keeps a pipeline readable.',
        pt: 'O tee escreve um fluxo em um arquivo e repassa ele ao mesmo tempo, o que mantém um pipeline legível.',
      },
    ],
    commands: ['tee', 'cat', 'grep', 'find'],
  },
  {
    id: 'pipes',
    topic: 'gnu-unix-commands',
    front: { en: 'What is a pipe in the shell?', pt: 'O que é um pipe no shell?' },
    back: {
      en: "A pipe, written as |, connects the standard output of one command directly to the standard input of the next, without ever writing an intermediate file to disk. It is the mechanism behind the classic Unix philosophy of combining small, single-purpose tools into a longer pipeline, like 'ps aux | grep nginx | wc -l', where each command only needs to know how to read text and write text.",
      pt: 'Um pipe, escrito como |, conecta a saída padrão de um comando diretamente à entrada padrão do próximo, sem nunca escrever um arquivo intermediário em disco. É o mecanismo por trás da filosofia clássica do Unix de combinar ferramentas pequenas e de propósito único em um pipeline mais longo, como "ps aux | grep nginx | wc -l", onde cada comando só precisa saber ler texto e escrever texto.',
    },
    details: {
      en: 'Every stage of a pipeline runs at the same time, connected by a small kernel buffer, so a slow reader eventually blocks the writer instead of filling memory. The exit status you get back belongs to the last command alone, which is why a failing grep in the middle can go unnoticed. Programs that take a file name usually also read standard input when you pass a single hyphen instead.',
      pt: 'Toda etapa de um pipeline roda ao mesmo tempo, ligada por um buffer pequeno do kernel, então um leitor lento acaba bloqueando o escritor em vez de encher a memória. O código de saída que volta pertence só ao último comando, e é por isso que um grep que falha no meio passa despercebido. Programas que recebem um nome de arquivo normalmente também leem a entrada padrão quando você passa um hífen sozinho.',
    },
    keyPoints: [
      {
        en: 'xargs turns a stream of names into arguments, which is how find feeds a command that does not read standard input.',
        pt: 'O xargs transforma um fluxo de nomes em argumentos, e é assim que o find alimenta um comando que não lê a entrada padrão.',
      },
      {
        en: 'sort has to read everything before printing the first line, so it cannot stream like grep does.',
        pt: 'O sort precisa ler tudo antes de imprimir a primeira linha, então ele não flui como o grep.',
      },
      {
        en: 'uniq only collapses neighbours, which is why sort almost always comes right before it.',
        pt: 'O uniq só junta vizinhos, e é por isso que o sort quase sempre vem logo antes dele.',
      },
    ],
    commands: ['grep', 'sort', 'uniq', 'xargs', 'wc'],
  },
  {
    id: 'what-is-a-process',
    topic: 'gnu-unix-commands',
    front: { en: 'What is a process?', pt: 'O que é um processo?' },
    back: {
      en: 'A process is a running instance of a program: its own private memory space, a unique process ID (PID), and a place in the kernel scheduler that decides when it gets CPU time. A single program can be running as many separate processes at once, each fully independent of the others, tools like ps and top list the processes currently running on a system.',
      pt: 'Um processo é uma instância em execução de um programa: seu próprio espaço de memória privado, um ID de processo (PID) único, e um lugar no escalonador do kernel que decide quando ele recebe tempo de CPU. Um único programa pode estar rodando como vários processos separados ao mesmo tempo, cada um totalmente independente dos outros, ferramentas como ps e top listam os processos rodando no momento em um sistema.',
    },
    details: {
      en: 'The kernel keeps one directory per process under /proc named after its identifier, holding the command line, the working directory, the open file descriptors and the current state, which makes /proc the place to look when ps does not show enough. Signals are how you talk to a running process: SIGTERM asks it to stop and can be caught, SIGKILL cannot be caught or ignored, and SIGHUP is what many daemons read as a request to reload configuration.',
      pt: 'O kernel mantém um diretório por processo dentro do /proc com o nome do identificador, guardando a linha de comando, o diretório de trabalho, os descritores abertos e o estado atual, o que faz do /proc o lugar de olhar quando o ps não mostra o bastante. Sinais são como se fala com um processo em execução: o SIGTERM pede para ele parar e pode ser capturado, o SIGKILL não pode ser capturado nem ignorado, e o SIGHUP é lido por muitos serviços como pedido de recarregar a configuração.',
    },
    keyPoints: [
      {
        en: 'A zombie process already finished and only waits for its parent to read the exit status, so killing it changes nothing.',
        pt: 'Um processo zumbi já terminou e só espera o pai ler o código de saída, então matar ele não muda nada.',
      },
      {
        en: 'The nice value runs from -20 to 19, and only root can ask for a value below zero.',
        pt: 'O valor de nice vai de -20 a 19, e só o root pode pedir um valor abaixo de zero.',
      },
      {
        en: 'When a parent dies first, the init process adopts the children, which is why orphans show parent number 1.',
        pt: 'Quando o pai morre primeiro, o processo de init adota os filhos, e é por isso que órfãos mostram pai número 1.',
      },
    ],
    commands: ['ps', 'top', 'kill', 'nice', 'renice'],
  },
  {
    id: 'regular-expressions',
    topic: 'gnu-unix-commands',
    front: { en: 'What is a regular expression?', pt: 'O que é uma expressão regular?' },
    back: {
      en: 'A regular expression (regex) is a compact pattern language for describing text to match, rather than a specific literal string, like "any line starting with an IP address" or "any word ending in .log". Tools like grep, sed, and awk all understand regular expressions, which is what lets them search and transform text based on shape and structure instead of exact wording.',
      pt: 'Uma expressão regular (regex) é uma linguagem compacta de padrões para descrever texto a combinar, em vez de uma string literal específica, como "qualquer linha começando com um endereço IP" ou "qualquer palavra terminando em .log". Ferramentas como grep, sed e awk entendem expressões regulares, o que é o que permite que elas busquem e transformem texto com base em forma e estrutura em vez de texto exato.',
    },
    details: {
      en: 'There are two dialects and the difference bites in practice. In basic expressions the grouping and alternation characters need a backslash, while extended expressions read them literally, which is what grep -E and sed -E switch on. Anchors decide how much of the line has to match, character classes like [[:digit:]] survive different locales, and a greedy quantifier takes the longest match unless the pattern narrows it down.',
      pt: 'Existem dois dialetos e a diferença incomoda na prática. Nas expressões básicas os caracteres de agrupamento e alternância precisam de barra invertida, enquanto as estendidas leem eles direto, que é o que o grep -E e o sed -E ligam. Âncoras decidem quanto da linha precisa casar, classes como [[:digit:]] sobrevivem a locales diferentes, e um quantificador guloso pega a maior correspondência a menos que o padrão restrinja.',
    },
    keyPoints: [
      {
        en: 'grep -E and egrep read extended syntax, so parentheses group and the vertical bar alternates without backslashes.',
        pt: 'O grep -E e o egrep leem a sintaxe estendida, então parênteses agrupam e a barra vertical alterna sem barras invertidas.',
      },
      {
        en: 'grep -F turns the pattern into plain text, which is the fastest way to search for a string full of dots and slashes.',
        pt: 'O grep -F transforma o padrão em texto puro, que é a forma mais rápida de buscar uma string cheia de pontos e barras.',
      },
      {
        en: 'A shell glob is not a regular expression: the asterisk means any characters in a glob and repetition in a pattern.',
        pt: 'Um glob de shell não é uma expressão regular: o asterisco significa quaisquer caracteres em um glob e repetição em um padrão.',
      },
    ],
    commands: ['grep', 'sed', 'awk', 'find'],
  },
];
