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
  },
  {
    id: 'standard-streams',
    topic: 'gnu-unix-commands',
    front: { en: 'What are stdin, stdout, and stderr?', pt: 'O que são stdin, stdout e stderr?' },
    back: {
      en: "Every process starts with three standard communication channels already open: stdin (standard input, where it reads input from, usually the keyboard), stdout (standard output, where its normal results go, usually the terminal), and stderr (standard error, a separate channel for error messages, kept apart from stdout specifically so a program's real output can be redirected to a file without error noise mixing in).",
      pt: 'Todo processo começa com três canais de comunicação padrão já abertos: stdin (entrada padrão, de onde ele lê entrada, geralmente o teclado), stdout (saída padrão, para onde vão seus resultados normais, geralmente o terminal), e stderr (erro padrão, um canal separado para mensagens de erro, mantido à parte do stdout justamente para que a saída real de um programa possa ser redirecionada para um arquivo sem misturar ruído de erro).',
    },
  },
  {
    id: 'pipes',
    topic: 'gnu-unix-commands',
    front: { en: 'What is a pipe in the shell?', pt: 'O que é um pipe no shell?' },
    back: {
      en: "A pipe, written as |, connects the standard output of one command directly to the standard input of the next, without ever writing an intermediate file to disk. It is the mechanism behind the classic Unix philosophy of combining small, single-purpose tools into a longer pipeline, like 'ps aux | grep nginx | wc -l', where each command only needs to know how to read text and write text.",
      pt: 'Um pipe, escrito como |, conecta a saída padrão de um comando diretamente à entrada padrão do próximo, sem nunca escrever um arquivo intermediário em disco. É o mecanismo por trás da filosofia clássica do Unix de combinar ferramentas pequenas e de propósito único em um pipeline mais longo, como "ps aux | grep nginx | wc -l", onde cada comando só precisa saber ler texto e escrever texto.',
    },
  },
  {
    id: 'what-is-a-process',
    topic: 'gnu-unix-commands',
    front: { en: 'What is a process?', pt: 'O que é um processo?' },
    back: {
      en: 'A process is a running instance of a program: its own private memory space, a unique process ID (PID), and a place in the kernel scheduler that decides when it gets CPU time. A single program can be running as many separate processes at once, each fully independent of the others, tools like ps and top list the processes currently running on a system.',
      pt: 'Um processo é uma instância em execução de um programa: seu próprio espaço de memória privado, um ID de processo (PID) único, e um lugar no escalonador do kernel que decide quando ele recebe tempo de CPU. Um único programa pode estar rodando como vários processos separados ao mesmo tempo, cada um totalmente independente dos outros, ferramentas como ps e top listam os processos rodando no momento em um sistema.',
    },
  },
  {
    id: 'regular-expressions',
    topic: 'gnu-unix-commands',
    front: { en: 'What is a regular expression?', pt: 'O que é uma expressão regular?' },
    back: {
      en: 'A regular expression (regex) is a compact pattern language for describing text to match, rather than a specific literal string, like "any line starting with an IP address" or "any word ending in .log". Tools like grep, sed, and awk all understand regular expressions, which is what lets them search and transform text based on shape and structure instead of exact wording.',
      pt: 'Uma expressão regular (regex) é uma linguagem compacta de padrões para descrever texto a combinar, em vez de uma string literal específica, como "qualquer linha começando com um endereço IP" ou "qualquer palavra terminando em .log". Ferramentas como grep, sed e awk entendem expressões regulares, o que é o que permite que elas busquem e transformem texto com base em forma e estrutura em vez de texto exato.',
    },
  },
];
