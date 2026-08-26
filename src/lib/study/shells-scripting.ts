import type { StudyCard, StudyTopic } from './types';

export const shellsScriptingTopic: StudyTopic = {
  id: 'shells-scripting',
  objectiveCode: '105',
  title: { en: 'Shells and Shell Scripting', pt: 'Shells e Scripts de Shell' },
};

export const shellsScriptingCards: StudyCard[] = [
  {
    id: 'shell-script',
    topic: 'shells-scripting',
    front: { en: 'What is a shell script?', pt: 'O que é um script de shell?' },
    back: {
      en: 'A shell script is a text file listing a sequence of shell commands to run, saved so that the same sequence can be repeated exactly without retyping it, with the added ability to use variables, conditionals, and loops. The first line usually starts with a shebang like #!/bin/bash, telling the system which interpreter should run the file.',
      pt: 'Um script de shell é um arquivo de texto listando uma sequência de comandos de shell a rodar, salvo para que a mesma sequência possa ser repetida exatamente sem redigitá-la, com a capacidade extra de usar variáveis, condicionais e loops. A primeira linha geralmente começa com um shebang como #!/bin/bash, dizendo ao sistema qual interpretador deve rodar o arquivo.',
    },
    details: {
      en: 'The first line decides which interpreter reads the file, and without the execute bit the kernel refuses to run it at all, which is the most common reason a fresh script answers permission denied. A script runs in its own process, so a cd inside it does not move the shell that called it, and sourcing the file instead runs it in the current shell precisely when you want that side effect.',
      pt: 'A primeira linha decide qual interpretador lê o arquivo, e sem o bit de execução o kernel se recusa a rodar ele, que é o motivo mais comum de um script novo responder permissão negada. Um script roda no próprio processo, então um cd lá dentro não move o shell que chamou, e usar source em vez disso roda no shell atual justamente quando você quer esse efeito.',
    },
    keyPoints: [
      {
        en: 'The shebang takes an absolute path, so #!/bin/sh and #!/usr/bin/env python3 behave differently on purpose.',
        pt: 'O shebang recebe um caminho absoluto, então #!/bin/sh e #!/usr/bin/env python3 se comportam de formas diferentes de propósito.',
      },
      {
        en: 'set -e stops the script at the first failing command, which turns a silent half run into a clear error.',
        pt: 'O set -e para o script no primeiro comando que falha, o que transforma uma execução pela metade em um erro claro.',
      },
      {
        en: 'Arguments arrive as $1, $2 and so on, $# counts them and "$@" passes them along without losing spaces.',
        pt: 'Os argumentos chegam como $1, $2 e assim por diante, o $# conta eles e o "$@" repassa sem perder espaços.',
      },
    ],
    commands: ['sh', 'chmod', 'exec', 'trap', 'read'],
  },
  {
    id: 'environment-variables',
    topic: 'shells-scripting',
    front: { en: 'What is an environment variable?', pt: 'O que é uma variável de ambiente?' },
    back: {
      en: "An environment variable is a named value held by the shell that gets automatically passed down to every program it launches, like PATH (where to look for commands) or HOME (the current user's home directory). Setting one with 'export NAME=value' makes it visible to child processes; without export, a shell variable stays local to the shell itself.",
      pt: 'Uma variável de ambiente é um valor nomeado mantido pelo shell que é passado automaticamente para todo programa que ele inicia, como PATH (onde procurar comandos) ou HOME (o diretório pessoal do usuário atual). Defini-la com "export NOME=valor" a torna visível para processos filhos; sem o export, uma variável de shell fica local ao próprio shell.',
    },
    details: {
      en: 'A plain assignment stays in the shell that made it, and export is what copies it into the environment of every process started afterwards, which is why a variable set in one terminal never reaches another. PATH is the one that decides which file runs when you type a name, and putting the current directory in it is a well known security mistake because a stray executable then wins.',
      pt: 'Uma atribuição simples fica no shell que a fez, e o export é o que copia ela para o ambiente de todo processo iniciado depois, e é por isso que uma variável definida em um terminal nunca chega em outro. O PATH é a que decide qual arquivo roda quando você digita um nome, e colocar o diretório atual nele é um erro de segurança conhecido porque um executável perdido passa a vencer.',
    },
    keyPoints: [
      {
        en: 'env prints the exported environment, while set also shows the variables that never left the shell.',
        pt: 'O env imprime o ambiente exportado, enquanto o set mostra também as variáveis que nunca saíram do shell.',
      },
      {
        en: 'Writing NAME=value in front of a command applies it to that command alone and leaves the shell untouched.',
        pt: 'Escrever NOME=valor na frente de um comando aplica só àquele comando e deixa o shell intacto.',
      },
      {
        en: 'A child process can never change the environment of its parent, which is why a script cannot set your PATH.',
        pt: 'Um processo filho nunca muda o ambiente do pai, e é por isso que um script não consegue definir o seu PATH.',
      },
    ],
    commands: ['export', 'env', 'printf', 'echo'],
  },
  {
    id: 'profile-files',
    topic: 'shells-scripting',
    front: { en: 'What are shell profile and rc files?', pt: 'O que são os arquivos de perfil e rc do shell?' },
    back: {
      en: 'Profile files (like /etc/profile or ~/.bash_profile) run once when a login shell starts, typically setting up environment variables for the whole session. Rc files (like ~/.bashrc) run every time a new interactive shell opens, typically setting up aliases, prompt customization, and shell options, the split exists because environment setup should only happen once, but interactive conveniences should apply to every new terminal.',
      pt: 'Arquivos de perfil (como /etc/profile ou ~/.bash_profile) rodam uma vez quando um shell de login inicia, tipicamente configurando variáveis de ambiente para a sessão inteira. Arquivos rc (como ~/.bashrc) rodam toda vez que um novo shell interativo abre, tipicamente configurando aliases, personalização de prompt e opções de shell, essa divisão existe porque a configuração de ambiente só deveria acontecer uma vez, mas conveniências interativas deveriam valer para todo terminal novo.',
    },
    details: {
      en: 'Which file runs depends on how the shell started. A login shell reads /etc/profile and then the first of ~/.bash_profile, ~/.bash_login or ~/.profile it finds, while an interactive non login shell reads ~/.bashrc instead, which is why many profiles end by sourcing the rc file. Anything meant for every user belongs in /etc/profile.d as a small file with a .sh suffix, and a change only reaches an open shell after you source it.',
      pt: 'Qual arquivo roda depende de como o shell começou. Um shell de login lê o /etc/profile e depois o primeiro entre ~/.bash_profile, ~/.bash_login e ~/.profile que encontrar, enquanto um shell interativo sem login lê o ~/.bashrc, e é por isso que muitos profiles terminam dando source no arquivo rc. O que vale para todo usuário pertence a /etc/profile.d como um arquivo pequeno com sufixo .sh, e a mudança só chega num shell aberto depois de você dar source nele.',
    },
    keyPoints: [
      {
        en: 'Aliases and prompt settings belong in the rc file, because a login profile does not run for every new terminal.',
        pt: 'Aliases e configuração de prompt pertencem ao arquivo rc, porque um profile de login não roda a cada terminal novo.',
      },
      {
        en: 'A syntax error in a profile can lock an account out of an interactive shell, so test before logging out.',
        pt: 'Um erro de sintaxe em um profile pode trancar a conta fora de um shell interativo, então teste antes de sair.',
      },
      {
        en: 'System wide files run before the ones in the home directory, so a personal setting overrides the shared one.',
        pt: 'Os arquivos do sistema rodam antes dos que estão na pasta pessoal, então uma configuração pessoal sobrescreve a compartilhada.',
      },
    ],
    commands: ['export', 'alias', 'env', 'sh'],
  },
  {
    id: 'exit-status',
    topic: 'shells-scripting',
    front: { en: 'What is an exit status?', pt: 'O que é um status de saída?' },
    back: {
      en: 'Every command returns a numeric exit status when it finishes, 0 meaning success and any non-zero value meaning some kind of failure (the specific meaning of each non-zero code varies by program). Scripts check this value, available right after a command as $?, to decide what to do next, and shell operators like && and || branch directly on it.',
      pt: 'Todo comando retorna um status de saída numérico quando termina, 0 significando sucesso e qualquer valor diferente de zero significando algum tipo de falha (o significado específico de cada código não-zero varia por programa). Scripts checam esse valor, disponível logo após um comando como $?, para decidir o que fazer a seguir, e operadores de shell como && e || decidem diretamente com base nele.',
    },
    details: {
      en: 'Every command leaves a number behind, zero for success and anything from 1 to 255 for failure, and the shell keeps the last one in $?. That number is what && and || read, what set -e watches, and what a script hands back through exit. A few values carry meaning by convention: 126 says the file is not executable, 127 says the command was not found, and 128 plus the signal number says a signal ended it.',
      pt: 'Todo comando deixa um número para trás, zero para sucesso e qualquer coisa de 1 a 255 para falha, e o shell guarda o último no $?. Esse número é o que o && e o || leem, o que o set -e vigia, e o que um script devolve pelo exit. Alguns valores têm significado por convenção: 126 diz que o arquivo não é executável, 127 diz que o comando não foi encontrado, e 128 mais o número do sinal diz que um sinal encerrou.',
    },
    keyPoints: [
      {
        en: 'In a pipeline $? reports the last command only, so a failure in the middle stays invisible.',
        pt: 'Em um pipeline o $? informa só o último comando, então uma falha no meio fica invisível.',
      },
      {
        en: 'grep -q returns zero when it matched and prints nothing, which makes it ideal inside a test.',
        pt: 'O grep -q retorna zero quando casou e não imprime nada, o que faz dele ideal dentro de um teste.',
      },
      {
        en: 'Reading $? twice does not work, because the second read already reflects the test you just ran.',
        pt: 'Ler o $? duas vezes não funciona, porque a segunda leitura já reflete o teste que você acabou de rodar.',
      },
    ],
    commands: ['exec', 'trap', 'grep', 'echo'],
  },
  {
    id: 'quoting',
    topic: 'shells-scripting',
    front: { en: 'Why does quoting matter in the shell?', pt: 'Por que aspas importam no shell?' },
    back: {
      en: "Without quotes, the shell splits a variable's value on whitespace and expands wildcards before a command ever sees it, so a filename with a space in it can silently become two separate arguments. Double quotes (\"$var\") keep the value together as one argument while still allowing variable expansion, single quotes ('$var') keep it completely literal, expanding nothing at all, this is one of the most common sources of subtle shell scripting bugs.",
      pt: 'Sem aspas, o shell divide o valor de uma variável nos espaços em branco e expande curingas antes mesmo de um comando vê-lo, então um nome de arquivo com espaço pode silenciosamente virar dois argumentos separados. Aspas duplas ("$var") mantêm o valor junto como um único argumento enquanto ainda permitem expansão de variável, aspas simples (\'$var\') mantêm tudo completamente literal, sem expandir nada, essa é uma das fontes mais comuns de bugs sutis em scripts de shell.',
    },
    details: {
      en: 'Double quotes keep a value in one piece while still expanding variables and command substitutions, single quotes turn off every expansion, and a backslash protects exactly one character. Most quoting bugs come from unquoted variables: a file name with a space becomes two arguments, and an empty variable disappears entirely, which turns a test into a syntax error.',
      pt: 'As aspas duplas mantêm um valor inteiro e ainda expandem variáveis e substituições de comando, as aspas simples desligam toda expansão, e a barra invertida protege exatamente um caractere. A maioria dos erros de aspas vem de variáveis sem aspas: um nome de arquivo com espaço vira dois argumentos, e uma variável vazia some por completo, o que transforma um teste em erro de sintaxe.',
    },
    keyPoints: [
      {
        en: 'Always quote "$variable" in tests and arguments, because an empty value otherwise leaves nothing behind.',
        pt: 'Sempre coloque "$variavel" entre aspas em testes e argumentos, porque um valor vazio senão não deixa nada.',
      },
      {
        en: 'Inside single quotes even the dollar sign is literal, which is what awk and sed programs usually need.',
        pt: 'Dentro de aspas simples até o cifrão é literal, que é o que programas de awk e sed normalmente precisam.',
      },
      {
        en: 'The shell expands a glob before the command sees it, so quoting a pattern hands it to find or grep untouched.',
        pt: 'O shell expande um glob antes de o comando ver, então colocar o padrão entre aspas entrega ele intacto ao find ou ao grep.',
      },
    ],
    commands: ['echo', 'printf', 'find', 'grep', 'awk'],
  },
];
