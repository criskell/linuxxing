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
  },
  {
    id: 'environment-variables',
    topic: 'shells-scripting',
    front: { en: 'What is an environment variable?', pt: 'O que é uma variável de ambiente?' },
    back: {
      en: "An environment variable is a named value held by the shell that gets automatically passed down to every program it launches, like PATH (where to look for commands) or HOME (the current user's home directory). Setting one with 'export NAME=value' makes it visible to child processes; without export, a shell variable stays local to the shell itself.",
      pt: 'Uma variável de ambiente é um valor nomeado mantido pelo shell que é passado automaticamente para todo programa que ele inicia, como PATH (onde procurar comandos) ou HOME (o diretório pessoal do usuário atual). Defini-la com "export NOME=valor" a torna visível para processos filhos; sem o export, uma variável de shell fica local ao próprio shell.',
    },
  },
  {
    id: 'profile-files',
    topic: 'shells-scripting',
    front: { en: 'What are shell profile and rc files?', pt: 'O que são os arquivos de perfil e rc do shell?' },
    back: {
      en: 'Profile files (like /etc/profile or ~/.bash_profile) run once when a login shell starts, typically setting up environment variables for the whole session. Rc files (like ~/.bashrc) run every time a new interactive shell opens, typically setting up aliases, prompt customization, and shell options, the split exists because environment setup should only happen once, but interactive conveniences should apply to every new terminal.',
      pt: 'Arquivos de perfil (como /etc/profile ou ~/.bash_profile) rodam uma vez quando um shell de login inicia, tipicamente configurando variáveis de ambiente para a sessão inteira. Arquivos rc (como ~/.bashrc) rodam toda vez que um novo shell interativo abre, tipicamente configurando aliases, personalização de prompt e opções de shell, essa divisão existe porque a configuração de ambiente só deveria acontecer uma vez, mas conveniências interativas deveriam valer para todo terminal novo.',
    },
  },
  {
    id: 'exit-status',
    topic: 'shells-scripting',
    front: { en: 'What is an exit status?', pt: 'O que é um status de saída?' },
    back: {
      en: 'Every command returns a numeric exit status when it finishes, 0 meaning success and any non-zero value meaning some kind of failure (the specific meaning of each non-zero code varies by program). Scripts check this value, available right after a command as $?, to decide what to do next, and shell operators like && and || branch directly on it.',
      pt: 'Todo comando retorna um status de saída numérico quando termina, 0 significando sucesso e qualquer valor diferente de zero significando algum tipo de falha (o significado específico de cada código não-zero varia por programa). Scripts checam esse valor, disponível logo após um comando como $?, para decidir o que fazer a seguir, e operadores de shell como && e || decidem diretamente com base nele.',
    },
  },
  {
    id: 'quoting',
    topic: 'shells-scripting',
    front: { en: 'Why does quoting matter in the shell?', pt: 'Por que aspas importam no shell?' },
    back: {
      en: "Without quotes, the shell splits a variable's value on whitespace and expands wildcards before a command ever sees it, so a filename with a space in it can silently become two separate arguments. Double quotes (\"$var\") keep the value together as one argument while still allowing variable expansion, single quotes ('$var') keep it completely literal, expanding nothing at all, this is one of the most common sources of subtle shell scripting bugs.",
      pt: 'Sem aspas, o shell divide o valor de uma variável nos espaços em branco e expande curingas antes mesmo de um comando vê-lo, então um nome de arquivo com espaço pode silenciosamente virar dois argumentos separados. Aspas duplas ("$var") mantêm o valor junto como um único argumento enquanto ainda permitem expansão de variável, aspas simples (\'$var\') mantêm tudo completamente literal, sem expandir nada, essa é uma das fontes mais comuns de bugs sutis em scripts de shell.',
    },
  },
];
