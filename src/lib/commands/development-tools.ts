import type { CommandKB } from './types';

export const developmentTools: CommandKB = {
  git: {
    desc: {
      en: 'Distributed version control system that tracks every change made to a project over time, letting a team work on the same codebase without overwriting each other. Every developer holds a full copy of the project history locally, which is why git works offline and why branching and merging are cheap: creating a new line of work is just a pointer, not a copy of every file. It underpins virtually all modern software collaboration, from solo side projects to companies with thousands of contributors, usually paired with a remote host like GitHub or GitLab for sharing.',
      pt: 'Sistema de controle de versão distribuído que rastreia toda mudança feita em um projeto ao longo do tempo, permitindo que um time trabalhe no mesmo código sem sobrescrever o trabalho um do outro. Cada desenvolvedor guarda uma cópia completa do histórico do projeto localmente, e é por isso que o git funciona offline e por que criar e juntar branches é barato: uma nova linha de trabalho é só um ponteiro, não uma cópia de todos os arquivos. Ele sustenta praticamente toda a colaboração de software moderna, de projetos pessoais a empresas com milhares de contribuidores, geralmente combinado com um host remoto como GitHub ou GitLab para compartilhamento.',
    },
    subcommands: {
      status: {
        en: "Shows which files were modified, which are staged for commit, and what branch you're on.",
        pt: 'Mostra quais arquivos foram modificados, quais estão prontos para commit e em que branch você está.',
      },
      add: {
        en: 'Marks changes in files to be included in the next commit (the staging area).',
        pt: "Marca mudanças em arquivos para entrarem no próximo commit (área de 'staging').",
      },
      commit: {
        en: 'Saves the staged changes as a new point in the project history.',
        pt: 'Salva as mudanças marcadas como um novo ponto no histórico do projeto.',
      },
      push: {
        en: 'Sends local commits to a remote repository.',
        pt: 'Envia os commits locais para um repositório remoto.',
      },
      pull: {
        en: 'Fetches and applies changes from a remote repository into the local one.',
        pt: 'Traz e aplica as mudanças de um repositório remoto para o repositório local.',
      },
      fetch: {
        en: 'Downloads changes from a remote repository without applying them yet.',
        pt: 'Baixa as mudanças de um repositório remoto sem aplicá-las ainda.',
      },
      clone: {
        en: 'Copies an entire repository (with history) from a remote location to the local machine.',
        pt: 'Copia um repositório inteiro (com histórico) de um lugar remoto para a máquina local.',
      },
      branch: {
        en: 'Creates, lists, or deletes branches (parallel lines of development).',
        pt: 'Cria, lista ou apaga branches (linhas paralelas de desenvolvimento).',
      },
      checkout: {
        en: 'Switches to another branch or restores files to a previous state.',
        pt: 'Troca para outra branch ou restaura arquivos para um estado anterior.',
      },
      switch: {
        en: 'Switches to another branch (a newer, more specific alternative to checkout).',
        pt: 'Troca para outra branch (alternativa mais nova e específica ao checkout).',
      },
      merge: {
        en: "Joins another branch's history into the current branch.",
        pt: 'Junta o histórico de uma branch dentro da branch atual.',
      },
      rebase: {
        en: 'Replays commits from the current branch on top of another base, rewriting history.',
        pt: 'Reaplica commits da branch atual em cima de outra base, reescrevendo o histórico.',
      },
      log: {
        en: 'Shows the commit history.',
        pt: 'Mostra o histórico de commits.',
      },
      diff: {
        en: 'Shows differences between versions of files.',
        pt: 'Mostra as diferenças entre versões de arquivos.',
      },
      stash: {
        en: 'Sets uncommitted changes aside temporarily.',
        pt: 'Guarda mudanças não commitadas de lado temporariamente.',
      },
      init: {
        en: 'Creates a new, empty Git repository in the current folder.',
        pt: 'Cria um novo repositório Git vazio na pasta atual.',
      },
      reset: {
        en: 'Undoes commits or staged changes, and can also discard changes in the working directory.',
        pt: 'Desfaz commits ou mudanças na área de staging, podendo também descartar mudanças no diretório de trabalho.',
      },
    },
    flags: {
      '-m': {
        en: 'Provides the commit message directly on the command line, without opening a text editor.',
        pt: 'Fornece a mensagem do commit diretamente na linha de comando, sem abrir um editor de texto.',
      },
      '--message': {
        en: 'Provides the commit message directly on the command line, without opening a text editor.',
        pt: 'Fornece a mensagem do commit diretamente na linha de comando, sem abrir um editor de texto.',
      },
      '-a': {
        en: "Automatically stages all already-tracked files that were modified, without needing 'git add' first.",
        pt: "Inclui automaticamente todos os arquivos já rastreados que foram modificados, sem precisar de 'git add' antes.",
      },
      '--all': {
        en: 'Includes all modified tracked files (long form of -a), or affects every branch, depending on the subcommand.',
        pt: 'Inclui todos os arquivos rastreados modificados (variante longa de -a) ou afeta todas as branches, dependendo do subcomando.',
      },
      '-b': {
        en: 'Creates a new branch while switching with checkout/switch.',
        pt: 'Cria uma nova branch ao trocar de branch com checkout/switch.',
      },
      '--force': {
        en: 'Forces the operation even when it would normally be rejected for safety (e.g. overwriting remote history).',
        pt: 'Força a operação mesmo que ela normalmente seria rejeitada por segurança (ex: sobrescrever histórico remoto).',
      },
      '-f': {
        en: 'Forces the operation even when it would normally be rejected for safety.',
        pt: 'Força a operação mesmo que ela normalmente seria rejeitada por segurança.',
      },
      '--global': {
        en: 'Applies the configuration to every repository for the user, not just the current one.',
        pt: 'Aplica a configuração para todos os repositórios do usuário, não só o atual.',
      },
      '--amend': {
        en: 'Modifies the most recent commit instead of creating a new one.',
        pt: 'Modifica o commit mais recente em vez de criar um novo.',
      },
    },
    valueFlags: {
      '-m': 'generic',
      '--message': 'generic',
      '-b': 'generic',
    },
    commonMistake: {
      en: "'git add .' stages everything in the current directory, including files nobody meant to commit (secrets, build output, editor swap files), unless .gitignore is already correct, always run 'git status' first to see exactly what is about to be staged. --force (or -f) on a push is also genuinely destructive on a shared branch, it can silently overwrite a teammate's commits with no way to recover them locally, '--force-with-lease' is the safer default for the common case of rewriting your own recent history.",
      pt: '"git add ." adiciona tudo no diretório atual, incluindo arquivos que ninguém queria commitar (segredos, saída de build, arquivos temporários de editor), a menos que o .gitignore já esteja certo, sempre rode "git status" antes para ver exatamente o que está prestes a ser adicionado. O --force (ou -f) em um push também é genuinamente destrutivo em uma branch compartilhada, pode sobrescrever silenciosamente os commits de um colega sem forma de recuperá-los localmente, "--force-with-lease" é o padrão mais seguro para o caso comum de reescrever seu próprio histórico recente.',
    },
  },

  jq: {
    desc: {
      en: "A command-line processor built specifically for JSON, letting you filter, transform, and pretty-print JSON data using its own small query language rather than reaching for a full scripting language just to pull one field out. It shows up constantly right after curl when working with an API, 'curl api.example.com/users | jq .[0].name' extracts a single field from a response in one line, and its default pretty-printed, colorized output alone makes raw JSON API responses far easier to read at a glance.",
      pt: 'Um processador de linha de comando feito especificamente para JSON, permitindo filtrar, transformar e formatar dados JSON usando sua própria linguagem de consulta pequena, em vez de recorrer a uma linguagem de script completa só para tirar um campo. Aparece constantemente logo depois do curl ao trabalhar com uma API, "curl api.example.com/users | jq .[0].name" extrai um único campo de uma resposta em uma linha, e sua saída padrão já formatada e colorida por si só torna respostas de API em JSON bruto bem mais fáceis de ler de relance.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Outputs raw strings without the surrounding JSON quotes, useful when piping the result into another command.',
        pt: 'Mostra strings brutas sem as aspas de JSON ao redor, útil ao encadear o resultado para outro comando.',
      },
      '-c': {
        en: 'Prints compact output on a single line instead of pretty-printed.',
        pt: 'Imprime a saída compacta em uma única linha, em vez de formatada.',
      },
    },
    commonMistake: {
      en: "When the input piped into jq isn't valid JSON, an empty response, an HTML error page from a misbehaving API, jq's error is about the JSON syntax itself, not about what actually went wrong upstream. A parse error there usually means the previous command failed silently, and checking that command's raw output on its own, without jq in the way, finds the real problem faster than trying to make sense of jq's complaint.",
      pt: 'Quando a entrada encanada para o jq não é um JSON válido, uma resposta vazia, uma página HTML de erro de uma API que se comportou mal, o erro do jq é sobre a sintaxe do JSON em si, não sobre o que realmente deu errado antes. Um erro de parse ali geralmente significa que o comando anterior falhou silenciosamente, e checar a saída bruta desse comando sozinho, sem o jq no meio, encontra o problema real mais rápido do que tentar entender a reclamação do jq.',
    },
  },

  make: {
    desc: {
      en: "Reads a Makefile describing a set of named targets and the commands needed to build each one, then runs only the commands needed to bring an out-of-date target up to date, skipping anything already current. That last part is the whole point: make compares file modification times, and if a target's output is newer than all its dependencies, it does nothing at all, which is why incremental rebuilds of a large C project can take seconds instead of minutes. It predates almost every other build tool in wide use today, and 'make install' specifically is the traditional last step of building software from source, copying the freshly built binaries into their final system location.",
      pt: 'Lê um Makefile descrevendo um conjunto de alvos nomeados e os comandos necessários para construir cada um, e então roda só os comandos necessários para deixar um alvo desatualizado em dia, pulando qualquer coisa já atual. Esse último detalhe é o ponto principal: o make compara datas de modificação de arquivo, e se a saída de um alvo é mais nova que todas as suas dependências, ele não faz nada, motivo pelo qual reconstruções incrementais de um projeto C grande podem levar segundos em vez de minutos. É anterior a quase toda outra ferramenta de build em uso hoje, e "make install" especificamente é o passo tradicional final de compilar software a partir do código-fonte, copiando os binários recém-construídos para o lugar final no sistema.',
    },
    subcommands: {},
    flags: {
      '-f': {
        en: 'Uses a specific file as the Makefile, instead of looking for Makefile or makefile in the current folder.',
        pt: 'Usa um arquivo específico como Makefile, em vez de procurar por Makefile ou makefile na pasta atual.',
      },
      '-j': {
        en: 'Runs multiple independent build steps in parallel, dramatically speeding up large builds on multi-core machines.',
        pt: 'Roda múltiplos passos de build independentes em paralelo, acelerando muito builds grandes em máquinas com vários núcleos.',
      },
      '-n': {
        en: 'Shows what commands would run without actually running them, useful for checking what a target does before triggering it.',
        pt: 'Mostra quais comandos rodariam sem realmente executá-los, útil para checar o que um alvo faz antes de disparar.',
      },
    },
    valueFlags: {
      '-f': 'generic',
      '-j': 'generic',
    },
    argHint: {
      en: 'The name of the target to build, such as install, test, or clean.',
      pt: 'O nome do alvo a construir, como install, test ou clean.',
    },
    commonMistake: {
      en: "Make requires each recipe line under a target to start with an actual tab character, not spaces, a holdover from its original 1970s implementation. A text editor that quietly converts tabs to spaces turns a perfectly readable Makefile into one that fails with 'missing separator', an error that gives no hint the actual problem is invisible whitespace.",
      pt: 'O make exige que cada linha de receita sob um alvo comece com um caractere de tabulação de verdade, não espaços, uma herança da implementação original dos anos 1970. Um editor de texto que converte tabs em espaços silenciosamente transforma um Makefile perfeitamente legível em um que falha com "missing separator", um erro que não dá nenhuma pista de que o problema real é um espaço em branco invisível.',
    },
  },

  gcc: {
    desc: {
      en: "The GNU Compiler Collection's C compiler, taking C source files and turning them into an executable (or, with the right flags, stopping earlier at an object file or assembly). It handles the whole pipeline by default, preprocessing, compiling, assembling, and linking, in one command, calling out to separate tools for each stage internally, which is why a single 'gcc file.c -o program' is enough for a simple program even though several distinct programs actually ran underneath it.",
      pt: 'O compilador C do GNU Compiler Collection, transformando arquivos-fonte C em um executável (ou, com as flags certas, parando antes em um arquivo objeto ou assembly). Ele cuida do pipeline inteiro por padrão, pré-processamento, compilação, montagem e ligação, em um único comando, chamando ferramentas separadas para cada etapa por baixo, motivo pelo qual um simples "gcc arquivo.c -o programa" basta para um programa simples mesmo que vários programas distintos tenham rodado por baixo.',
    },
    subcommands: {},
    flags: {
      '-o': {
        en: 'Sets the name of the output file, instead of the default a.out.',
        pt: 'Define o nome do arquivo de saída, em vez do padrão a.out.',
      },
      '-c': {
        en: 'Compiles to an object file only, without linking into a final executable.',
        pt: 'Compila apenas para um arquivo objeto, sem ligar em um executável final.',
      },
      '-Wall': {
        en: 'Enables a broad set of useful compiler warnings that are off by default.',
        pt: 'Ativa um conjunto amplo de avisos úteis do compilador que ficam desligados por padrão.',
      },
      '-g': {
        en: 'Includes debug information in the output, needed for tools like gdb to show source-level detail.',
        pt: 'Inclui informação de depuração na saída, necessária para ferramentas como o gdb mostrarem detalhe no nível do código-fonte.',
      },
      '-O2': {
        en: 'Enables a strong level of compiler optimization, the common choice for release builds.',
        pt: 'Ativa um nível forte de otimização do compilador, a escolha comum para builds de release.',
      },
    },
    valueFlags: {
      '-o': 'generic',
    },
    argHint: {
      en: 'The source file to compile.',
      pt: 'O arquivo-fonte a compilar.',
    },
    commonMistake: {
      en: '-Wall does not mean all warnings, despite the name: several genuinely useful ones, like an unused function parameter, only turn on with the separately named -Wextra. Treating -Wall as the complete warning set leaves real bugs uncaught with no indication anything was skipped.',
      pt: 'O -Wall não significa todos os avisos, apesar do nome: vários realmente úteis, como um parâmetro de função não utilizado, só ligam com o -Wextra, nomeado separadamente. Tratar o -Wall como o conjunto completo de avisos deixa bugs reais sem serem pegos, sem nenhuma indicação de que algo ficou de fora.',
    },
  },

  python3: {
    desc: {
      en: "Runs the Python 3 interpreter, either executing a script file given as an argument, running a short inline command with -c, or, with no arguments at all, dropping into an interactive prompt for experimenting line by line. The '3' in the name exists because Python 2 and Python 3 coexisted for over a decade with real language differences between them; Python 2 has since reached end of life, but the explicit 'python3' name persists as the safe, unambiguous way to invoke it on systems where a bare 'python' might not exist or might point somewhere unexpected.",
      pt: 'Roda o interpretador Python 3, seja executando um arquivo de script dado como argumento, rodando um comando curto inline com -c, ou, sem argumento nenhum, caindo em um prompt interativo para experimentar linha por linha. O "3" no nome existe porque Python 2 e Python 3 coexistiram por mais de uma década com diferenças reais de linguagem entre eles; o Python 2 já chegou ao fim de vida, mas o nome explícito "python3" persiste como a forma segura e inequívoca de chamá-lo em sistemas onde um "python" puro pode não existir ou apontar para outro lugar inesperado.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Runs the command given as a string, instead of reading a script file.',
        pt: 'Roda o comando dado como string, em vez de ler um arquivo de script.',
      },
      '-m': {
        en: "Runs a library module as a script, such as 'python3 -m http.server' to start a quick local web server.",
        pt: 'Roda um módulo de biblioteca como script, como "python3 -m http.server" para iniciar um servidor web local rápido.',
      },
      '-V': {
        en: 'Prints the interpreter version and exits.',
        pt: 'Imprime a versão do interpretador e termina.',
      },
    },
    valueFlags: {
      '-c': 'generic',
      '-m': 'generic',
    },
    argHint: {
      en: 'The Python script file to run.',
      pt: 'O arquivo de script Python a rodar.',
    },
    commonMistake: {
      en: "python3 -m pip install and a bare pip install can quietly target two different interpreters when more than one Python is installed, so a package that installs without error still isn't importable from the python3 that actually runs the script. python3 -m pip keeps the install and the interpreter running it locked to the same one, removing that mismatch entirely.",
      pt: 'python3 -m pip install e um pip install puro podem silenciosamente apontar para dois interpretadores diferentes quando há mais de um Python instalado, então um pacote que instala sem erro ainda assim não fica importável a partir do python3 que de fato roda o script. O python3 -m pip mantém a instalação e o interpretador que a roda travados no mesmo, eliminando essa incompatibilidade por completo.',
    },
  },

  node: {
    desc: {
      en: "Runs JavaScript outside a browser, using the same V8 engine Chrome uses, which is what made JavaScript viable as a general-purpose server and scripting language in the first place. Given a file it executes that script top to bottom; given no arguments it drops into an interactive REPL, and 'node -e' runs a short snippet inline, the same three modes python3 offers for its own language.",
      pt: 'Roda JavaScript fora de um navegador, usando o mesmo motor V8 que o Chrome usa, o que foi o que tornou o JavaScript viável como linguagem de propósito geral para servidor e scripts. Dado um arquivo, ele executa esse script do início ao fim; sem argumento nenhum, cai em um REPL interativo, e "node -e" roda um trecho curto inline, os mesmos três modos que o python3 oferece para sua própria linguagem.',
    },
    subcommands: {},
    flags: {
      '-e': {
        en: 'Runs the script given as a string, instead of reading a file.',
        pt: 'Roda o script dado como string, em vez de ler um arquivo.',
      },
      '-v': {
        en: 'Prints the Node.js version and exits.',
        pt: 'Imprime a versão do Node.js e termina.',
      },
      '--version': {
        en: 'Prints the Node.js version and exits.',
        pt: 'Imprime a versão do Node.js e termina.',
      },
    },
    valueFlags: {
      '-e': 'generic',
    },
    argHint: {
      en: 'The JavaScript file to run.',
      pt: 'O arquivo JavaScript a rodar.',
    },
    commonMistake: {
      en: 'Using import in a plain .js file throws \'Cannot use import statement outside a module\', while using require in a file where package.json sets "type": "module" throws the opposite error, \'require is not defined\'. Node picks which module system a file uses from that one package.json field, or the .mjs/.cjs extension, not from which syntax happens to be written inside the file.',
      pt: 'Usar import num arquivo .js comum lança "Cannot use import statement outside a module", enquanto usar require num arquivo onde o package.json define "type": "module" lança o erro oposto, "require is not defined". O Node decide qual sistema de módulos um arquivo usa a partir desse único campo do package.json, ou da extensão .mjs/.cjs, não pela sintaxe que por acaso está escrita dentro do arquivo.',
    },
  },

  kubectl: {
    desc: {
      en: "The command-line tool for controlling a Kubernetes cluster, talking to the cluster's API server to create, inspect, and manage the objects (pods, deployments, services) that make up a running application. Nearly every subcommand accepts a resource type and optionally a name, 'kubectl get pods' lists every pod, 'kubectl get pod my-pod' shows one, following a consistent noun-based pattern across the entire tool.",
      pt: 'A ferramenta de linha de comando para controlar um cluster Kubernetes, conversando com o servidor de API do cluster para criar, inspecionar e gerenciar os objetos (pods, deployments, services) que compõem uma aplicação em execução. Quase todo subcomando aceita um tipo de recurso e opcionalmente um nome, "kubectl get pods" lista todo pod, "kubectl get pod meu-pod" mostra um só, seguindo um padrão consistente baseado em substantivo por toda a ferramenta.',
    },
    subcommands: {
      get: {
        en: 'Lists one or more resources of a given type.',
        pt: 'Lista um ou mais recursos de um tipo dado.',
      },
      describe: {
        en: 'Shows detailed information about a specific resource, including recent events.',
        pt: 'Mostra informações detalhadas sobre um recurso específico, incluindo eventos recentes.',
      },
      apply: {
        en: 'Creates or updates resources to match the state described in a YAML or JSON file.',
        pt: 'Cria ou atualiza recursos para corresponder ao estado descrito em um arquivo YAML ou JSON.',
      },
      delete: {
        en: 'Removes a resource from the cluster.',
        pt: 'Remove um recurso do cluster.',
      },
      logs: {
        en: 'Shows the logs produced by a container inside a pod.',
        pt: 'Mostra os logs produzidos por um container dentro de um pod.',
      },
      exec: {
        en: 'Runs a command inside a running container, similar to docker exec.',
        pt: 'Executa um comando dentro de um container em execução, parecido com o docker exec.',
      },
    },
    flags: {
      '-n': {
        en: 'Targets a specific namespace, instead of the default one.',
        pt: 'Direciona para um namespace específico, em vez do padrão.',
      },
      '-f': {
        en: 'Specifies the YAML or JSON file describing the resources to apply.',
        pt: 'Especifica o arquivo YAML ou JSON descrevendo os recursos a aplicar.',
      },
      '-o': {
        en: "Sets the output format, such as 'json', 'yaml', or 'wide'.",
        pt: 'Define o formato de saída, como "json", "yaml" ou "wide".',
      },
    },
    valueFlags: {
      '-n': 'generic',
      '-f': 'generic',
      '-o': 'generic',
    },
    commonMistake: {
      en: "Running kubectl commands with no -n and expecting them to hit the right environment is a common mistake, without it every command targets the 'default' namespace (or whatever context was last switched to), not necessarily the one intended, especially dangerous for 'kubectl delete' on a production cluster. It's worth always checking 'kubectl config current-context' before anything destructive, since a single kubeconfig often has access to multiple clusters at once.",
      pt: 'Rodar comandos kubectl sem -n e esperar que atinjam o ambiente certo é um erro comum, sem ele todo comando é direcionado ao namespace "default" (ou o que quer que tenha sido usado por último), não necessariamente o pretendido, especialmente perigoso para "kubectl delete" em um cluster de produção. Vale sempre checar "kubectl config current-context" antes de qualquer coisa destrutiva, já que um único kubeconfig costuma ter acesso a vários clusters ao mesmo tempo.',
    },
  },

  vim: {
    desc: {
      en: "A modal text editor descended from vi, where the keyboard itself switches between distinct modes, normal mode for moving around and issuing commands, insert mode for typing text, visual mode for selecting, rather than a single mode where every key just types a character. That design feels alien at first specifically because it front-loads a learning curve most editors don't have, but it lets an experienced user edit text without ever reaching for a mouse or arrow keys, entirely through short keyboard commands composed together. It is close to guaranteed to be installed (or vi at least) on any Unix-like system, which is exactly why so many people learn just enough to save and quit (':wq') and stop there.",
      pt: 'Um editor de texto modal descendente do vi, onde o próprio teclado alterna entre modos distintos, modo normal para se mover e emitir comandos, modo de inserção para digitar texto, modo visual para selecionar, em vez de um único modo onde toda tecla simplesmente digita um caractere. Esse design parece estranho a princípio justamente porque traz uma curva de aprendizado que a maioria dos editores não tem, mas permite que um usuário experiente edite texto sem nunca precisar do mouse ou das setas, inteiramente através de comandos curtos de teclado combinados entre si. É praticamente garantido estar instalado (ou pelo menos o vi) em qualquer sistema Unix, motivo exato pelo qual tanta gente aprende só o suficiente para salvar e sair (":wq") e para por aí.',
    },
    subcommands: {},
    flags: {
      '-R': {
        en: 'Opens the file in read-only mode, a safety net when only viewing is intended.',
        pt: 'Abre o arquivo em modo somente leitura, uma rede de segurança quando a intenção é só visualizar.',
      },
    },
    argHint: {
      en: 'The file to edit.',
      pt: 'O arquivo a editar.',
    },
    commonMistake: {
      en: "Typing immediately after opening vim, before pressing i, doesn't insert text: normal mode treats every keystroke as a command instead, so x deletes characters, dd deletes whole lines, and a few random keys can look like vim ate half a file with no warning. Pressing i first switches to insert mode for typing, and Escape returns to normal mode, the two keys that unlock everything else.",
      pt: 'Digitar logo depois de abrir o vim, antes de apertar i, não insere texto: o modo normal trata toda tecla como comando, então x apaga caracteres, dd apaga linhas inteiras, e algumas teclas aleatórias podem parecer que o vim comeu metade de um arquivo sem aviso nenhum. Apertar i primeiro muda para o modo de inserção, para digitar, e Esc volta ao modo normal, as duas teclas que destravam tudo o resto.',
    },
  },

  nano: {
    desc: {
      en: "A simple, modeless text editor built specifically to be approachable: every key does what it looks like it should do, typing inserts text immediately, and the available commands are listed right at the bottom of the screen the whole time, so there is nothing to memorize up front. It trades vim's steep learning curve and keyboard-only efficiency for something a first-time terminal user can sit down and use in seconds, which is exactly why so many beginner-friendly tutorials default to it for quick config file edits.",
      pt: 'Um editor de texto simples e sem modos, feito especificamente para ser acessível: toda tecla faz o que parece que deveria fazer, digitar insere texto imediatamente, e os comandos disponíveis ficam listados bem no rodapé da tela o tempo todo, então não há nada para memorizar de antemão. Ele troca a curva de aprendizado íngreme e a eficiência exclusiva de teclado do vim por algo que quem usa terminal pela primeira vez consegue sentar e usar em segundos, motivo exato pelo qual tantos tutoriais voltados a iniciantes usam ele por padrão para edições rápidas de arquivo de configuração.',
    },
    subcommands: {},
    flags: {
      '-w': {
        en: 'Disables automatic line wrapping, useful when editing config files where long lines should stay on one line.',
        pt: 'Desativa a quebra automática de linha, útil ao editar arquivos de configuração onde linhas longas devem ficar em uma só.',
      },
    },
    argHint: {
      en: 'The file to edit.',
      pt: 'O arquivo a editar.',
    },
  },
};
