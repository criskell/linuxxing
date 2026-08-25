import type { CommandKB } from './types';

export const shellBuiltins: CommandKB = {
  cd: {
    desc: {
      en: "Changes the shell's current working directory, the folder that every relative path typed afterward is measured from. It is a shell builtin rather than a separate program on disk, which has to be true for a subtle reason: a program can only change its own process's working directory, never its parent shell's, so if cd were an external command, running it would have no lasting effect once it exited. Two shortcuts are worth knowing: 'cd' alone returns to the home directory, and 'cd -' jumps back to whichever directory you were in before the last cd.",
      pt: 'Muda o diretório de trabalho atual do shell, a pasta a partir da qual todo caminho relativo digitado depois é medido. É um comando interno do shell, e não um programa separado no disco, por um motivo sutil: um programa só consegue mudar o diretório de trabalho do próprio processo, nunca o do shell pai que o chamou, então se o cd fosse um comando externo, rodá-lo não teria efeito nenhum depois que ele terminasse. Vale conhecer dois atalhos: "cd" sozinho volta para o diretório home, e "cd -" pula de volta para o diretório em que você estava antes do último cd.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The directory to switch to.',
      pt: 'O diretório para o qual mudar.',
    },
  },

  command: {
    desc: {
      en: "A shell builtin that runs a program directly by looking it up in PATH, deliberately bypassing any shell alias or function that happens to share its name. This matters most in scripts, where an alias defined interactively in someone's shell config should never silently change what a script does, so 'command ls' guarantees the real ls binary runs regardless of what aliases exist. Its other common use, 'command -v', checks whether a program is installed and available without actually running it or producing an error if it isn't, which is why it appears constantly in install scripts as a portable alternative to which.",
      pt: 'Um comando interno do shell que executa um programa diretamente, buscando-o no PATH, contornando deliberadamente qualquer alias ou função do shell que tenha o mesmo nome. Isso importa mais em scripts, onde um alias definido interativamente na configuração de shell de alguém nunca deveria mudar silenciosamente o que um script faz, então "command ls" garante que o binário real do ls roda, independente de quais aliases existam. Seu outro uso comum, "command -v", checa se um programa está instalado e disponível sem realmente executá-lo ou gerar erro caso não esteja, motivo pelo qual aparece constantemente em scripts de instalação como alternativa portável ao which.',
    },
    subcommands: {},
    flags: {
      '-v': {
        en: 'Prints the path of the program if it exists in PATH, without running it. Commonly used to check whether a tool is installed.',
        pt: 'Imprime o caminho do programa se ele existir no PATH, sem executá-lo. Usado normalmente para checar se uma ferramenta está instalada.',
      },
      '-p': {
        en: 'Uses a default, safe PATH to look up the command, ignoring any custom PATH the user has set.',
        pt: 'Usa um PATH padrão e seguro para procurar o comando, ignorando qualquer PATH customizado definido pelo usuário.',
      },
    },
  },

  echo: {
    desc: {
      en: "Prints text to standard output, one of the simplest and most-used commands in any shell script, since it is how a script reports progress, prints a value, or (combined with redirection) writes a line into a file without opening an editor. Quoting matters more than it looks: unquoted text is subject to the shell's own word-splitting and wildcard expansion before echo ever sees it, which is why arguments containing spaces, variables, or special characters are almost always wrapped in quotes to be printed exactly as written.",
      pt: 'Imprime texto na saída padrão, um dos comandos mais simples e mais usados em qualquer script de shell, já que é assim que um script relata progresso, imprime um valor, ou (combinado com redirecionamento) escreve uma linha em um arquivo sem precisar abrir um editor. As aspas importam mais do que parece: texto sem aspas fica sujeito à própria divisão de palavras e expansão de curingas do shell antes mesmo do echo vê-lo, e é por isso que argumentos com espaços, variáveis ou caracteres especiais quase sempre vêm entre aspas, para serem impressos exatamente como escritos.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: "Doesn't print the trailing newline at the end.",
        pt: 'Não imprime a quebra de linha no final.',
      },
      '-e': {
        en: 'Interprets backslash escape sequences like \\n (newline) and \\t (tab).',
        pt: 'Interpreta sequências de escape com barra invertida como \\n (nova linha) e \\t (tab).',
      },
    },
    argHint: {
      en: 'The text to print, or a variable to print the value of.',
      pt: 'O texto a imprimir, ou uma variável para imprimir o valor dela.',
    },
  },

  sh: {
    desc: {
      en: "The POSIX shell interpreter, a smaller, more standardized language than bash, implementing only the features every POSIX-compliant shell is guaranteed to have, which makes scripts written for sh portable across systems that don't all ship bash. Piped input, as in 'curl ... | sh', is read and executed line by line as it arrives, immediately, with no chance to review it first, which is what makes that pattern convenient for one-line installers and simultaneously risky: you are trusting the remote server to send exactly what it claims to, with nothing verified beforehand.",
      pt: 'O interpretador de shell POSIX, uma linguagem menor e mais padronizada que o bash, implementando só os recursos que todo shell compatível com POSIX tem garantia de ter, o que torna scripts escritos para o sh portáveis entre sistemas que não vêm todos com bash. Entrada recebida por pipe, como em "curl ... | sh", é lida e executada linha por linha conforme chega, na hora, sem chance de revisar antes, o que torna esse padrão conveniente para instaladores de uma linha e ao mesmo tempo arriscado: você está confiando que o servidor remoto vai mandar exatamente o que diz que vai mandar, sem nada verificado antes.',
    },
    subcommands: {},
    flags: {},
  },

  history: {
    desc: {
      en: "Shows the numbered list of commands previously typed in the shell session, kept both in memory during the session and, when it ends, appended to a history file (~/.bash_history for bash) so it persists across logins too. It is what makes the up arrow and Ctrl+R (reverse search) work, and running '!42' or '!!' re-executes history entry 42 or the very last command respectively, a genuinely fast way to repeat something without retyping it.",
      pt: 'Mostra a lista numerada de comandos digitados anteriormente na sessão do shell, guardada tanto em memória durante a sessão quanto, ao final dela, anexada a um arquivo de histórico (~/.bash_history no bash), então persiste entre logins também. É o que faz a seta para cima e o Ctrl+R (busca reversa) funcionarem, e rodar "!42" ou "!!" reexecuta a entrada 42 do histórico ou o último comando, respectivamente, uma forma genuinamente rápida de repetir algo sem digitar de novo.',
    },
    subcommands: {},
    flags: {},
    commonMistake: {
      en: 'History expansion like !! or !42 does not work inside double quotes the way variables do, bash still expands it there, often in the middle of typing something else entirely, which is why an accidental ! followed by a word that happens to match a past command can silently substitute text nobody meant to include. Single quotes suppress it completely, which is why a commit message or any string containing a literal ! is safer wrapped in single quotes.',
      pt: 'A expansão de histórico como !! ou !42 não funciona dentro de aspas duplas do jeito que variáveis funcionam, o bash ainda expande ali, muitas vezes no meio de outra coisa sendo digitada. Um ! seguido de uma palavra que por acaso combina com um comando passado pode substituir texto silenciosamente, sem que ninguém quisesse isso. Aspas simples suprimem isso por completo, motivo pelo qual uma mensagem de commit ou qualquer string com um ! literal é mais segura entre aspas simples.',
    },
  },

  alias: {
    desc: {
      en: "Creates a shortcut name that expands to a longer command, so typing the short alias runs the full thing, most often used to bake in flags someone always wants, like aliasing 'll' to 'ls -la', or to fix a habitual typo. Defined on its own an alias only lasts for the current shell session, so anyone who wants it available every time they open a terminal adds the alias command to their shell's startup file (~/.bashrc or ~/.zshrc) instead of typing it manually each session.",
      pt: 'Cria um nome de atalho que expande para um comando mais longo, de forma que digitar o atalho roda a coisa completa, mais usado para embutir flags que alguém sempre quer, como associar "ll" a "ls -la", ou para corrigir um erro de digitação recorrente. Definido sozinho, um alias só dura pela sessão de shell atual, então quem quer tê-lo disponível toda vez que abre um terminal adiciona o comando alias ao arquivo de inicialização do shell (~/.bashrc ou ~/.zshrc) em vez de digitá-lo manualmente a cada sessão.',
    },
    subcommands: {},
    flags: {},
    commonMistake: {
      en: "Aliases defined in an interactive shell don't carry over into scripts, since non-interactive shells don't read the startup file where they're usually set. A script that relies on an alias behaving the same way it does at the prompt fails outright, or worse, silently falls back to the real command with none of the alias's flags.",
      pt: 'Aliases definidos num shell interativo não passam para scripts, já que shells não interativos não leem o arquivo de inicialização onde eles costumam ser definidos. Um script que depende de um alias se comportar do mesmo jeito que no prompt falha de vez, ou pior, cai silenciosamente para o comando real sem nenhuma das flags do alias.',
    },
  },

  export: {
    desc: {
      en: "Marks a shell variable as exported, meaning any program started from this shell from now on inherits a copy of it in its own environment, not just the shell itself. A plain variable assignment like 'PATH=/foo' only exists inside the current shell and is invisible to anything it launches; 'export PATH=/foo' is what actually makes that value visible to child processes, which is why configuration values like PATH, API keys read by an application, or NODE_ENV almost always need to be exported to have any effect beyond the shell that set them.",
      pt: 'Marca uma variável de shell como exportada, ou seja, a partir de agora todo programa iniciado a partir desse shell herda uma cópia dela no próprio ambiente, não só o shell em si. Uma atribuição de variável simples como "PATH=/foo" só existe dentro do shell atual e é invisível para qualquer coisa que ele iniciar; "export PATH=/foo" é o que de fato torna esse valor visível para os processos filhos, motivo pelo qual valores de configuração como PATH, chaves de API lidas por uma aplicação, ou NODE_ENV quase sempre precisam ser exportados para ter algum efeito além do shell que os definiu.',
    },
    subcommands: {},
    flags: {},
    commonMistake: {
      en: 'A variable exported inside a subshell, like the body of a while loop fed by a pipe, never makes it back to the parent shell, since each side of a pipe runs in its own separate subshell with its own copy of the environment. something | while read line; do export count=$((count+1)); done leaves count unset once the loop ends, no matter how many times it was exported inside, because that whole loop never shared memory with the shell that started it.',
      pt: 'Uma variável exportada dentro de um subshell, como o corpo de um loop while alimentado por um pipe, nunca volta para o shell pai, já que cada lado de um pipe roda no próprio subshell separado, com a própria cópia do ambiente. algo | while read linha; do export contador=$((contador+1)); done deixa contador sem valor depois que o loop termina, não importa quantas vezes tenha sido exportada lá dentro, porque aquele loop inteiro nunca compartilhou memória com o shell que o iniciou.',
    },
  },

  env: {
    desc: {
      en: "Prints every environment variable currently visible to the shell, one per line, the fastest way to check what a process would actually inherit, especially useful for confirming whether something export set earlier really took effect. Its second, less obvious use is running a single command with a deliberately modified environment without permanently changing the shell's own, as in 'env NODE_ENV=production node app.js', which sets that one variable only for the duration of that one command, leaving the surrounding shell untouched.",
      pt: 'Imprime cada variável de ambiente atualmente visível ao shell, uma por linha, a forma mais rápida de checar o que um processo realmente herdaria, especialmente útil para confirmar se algo que o export definiu antes de fato surtiu efeito. Seu segundo uso, menos óbvio, é rodar um único comando com um ambiente deliberadamente modificado sem alterar permanentemente o do shell, como em "env NODE_ENV=production node app.js", que define essa única variável só pela duração daquele comando, deixando o shell ao redor intocado.',
    },
    subcommands: {},
    flags: {},
  },

  type: {
    desc: {
      en: "A shell builtin that reports what kind of thing a given name actually is, a builtin, a shell function, an alias, or an external program (and if the last, where exactly on disk it lives). It answers a subtly broader question than which does: which only ever searches PATH for external programs, so it can't see aliases or functions at all, while type checks the shell's own resolution order first, which is exactly what the shell itself would use to decide what runs when that name is typed.",
      pt: 'Um comando interno do shell que relata o que um determinado nome realmente é, um builtin, uma função de shell, um alias, ou um programa externo (e, nesse último caso, onde exatamente ele fica no disco). Responde a uma pergunta sutilmente mais ampla do que o which: o which só busca por programas externos no PATH, então não enxerga aliases nem funções, enquanto o type checa primeiro a própria ordem de resolução do shell, que é exatamente o que o shell usaria para decidir o que roda quando aquele nome é digitado.',
    },
    subcommands: {},
    flags: {
      '-a': {
        en: 'Shows every matching definition, not just the one that would actually run.',
        pt: 'Mostra toda definição correspondente, não só a que de fato rodaria.',
      },
    },
  },

  expr: {
    desc: {
      en: "Evaluates a simple expression, arithmetic, string comparison, or pattern matching, and prints the result, one of the few ways to do math directly in a POSIX shell that has no native arithmetic of its own the way bash's $(( )) does. It has mostly been superseded by that bash built-in syntax and by tools like awk or bc for anything beyond the simplest calculation, but still turns up in older or more portable scripts written to work under plain sh.",
      pt: 'Avalia uma expressão simples, aritmética, comparação de strings, ou correspondência de padrão, e imprime o resultado, uma das poucas formas de fazer matemática diretamente em um shell POSIX que não tem aritmética nativa própria como o $(( )) do bash tem. Foi em grande parte superado por essa sintaxe embutida do bash e por ferramentas como awk ou bc para qualquer coisa além do cálculo mais simples, mas ainda aparece em scripts mais antigos ou mais portáveis escritos para funcionar sob o sh puro.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The expression to evaluate, such as "3 + 4".',
      pt: 'A expressão a avaliar, como "3 + 4".',
    },
  },

  read: {
    desc: {
      en: "A shell builtin that reads a line of input and stores it into one or more variables, the standard way a shell script asks the person running it for input, or, combined with a while loop, processes a file one line at a time. 'read -p \"Continue? \" answer' prompts and stores the reply in $answer, and 'while read -r line; do ... done < file' is the idiomatic way to loop over a file's lines safely, the -r there stopping backslashes in the input from being interpreted as escape sequences.",
      pt: 'Um comando interno do shell que lê uma linha de entrada e a guarda em uma ou mais variáveis, a forma padrão de um script de shell pedir entrada para quem o está rodando, ou, combinado com um loop while, processar um arquivo linha por linha. "read -p \"Continuar? \" resposta" pergunta e guarda a resposta em $resposta, e "while read -r linha; do ... done < arquivo" é a forma idiomática de percorrer as linhas de um arquivo com segurança, o -r ali evitando que barras invertidas na entrada sejam interpretadas como sequências de escape.',
    },
    subcommands: {},
    flags: {
      '-p': {
        en: 'Shows a prompt before reading, on the same line as the input.',
        pt: 'Mostra um prompt antes de ler, na mesma linha da entrada.',
      },
      '-r': {
        en: 'Reads the raw input literally, without treating a trailing backslash as a line-continuation character.',
        pt: 'Lê a entrada bruta literalmente, sem tratar uma barra invertida no final como caractere de continuação de linha.',
      },
      '-s': {
        en: 'Reads without echoing the typed characters to the screen, used for reading a password.',
        pt: 'Lê sem exibir os caracteres digitados na tela, usado para ler uma senha.',
      },
    },
    valueFlags: {
      '-p': 'generic',
    },
    argHint: {
      en: 'The name of the variable to store the input in.',
      pt: 'O nome da variável onde guardar a entrada.',
    },
    commonMistake: {
      en: 'read a b c splits the input line on whitespace and assigns each field to a variable in order, but any extra words beyond the number of variables given all get stuffed into the last one instead of being dropped or causing an error. read first rest is actually a common, deliberate use of that behavior, first gets the first word and rest gets everything else on the line.',
      pt: 'read a b c divide a linha de entrada por espaço e atribui cada campo a uma variável em ordem, mas qualquer palavra extra além do número de variáveis dadas vai toda parar na última em vez de ser descartada ou causar erro. read primeiro resto é na verdade um uso comum e deliberado desse comportamento, primeiro pega a primeira palavra e resto pega tudo o que sobra na linha.',
    },
  },

  exec: {
    desc: {
      en: "A shell builtin that replaces the current shell process with the given command entirely, instead of starting it as a child process, which means there is no shell left to return to once it runs, the new program takes over the same process ID and inherits its file descriptors directly. It shows up in two very different contexts: as the last line of an entrypoint script (so the main process becomes PID 1 instead of a leftover shell, which matters for how containers handle signals), and as 'exec > file' to redirect all of a script's own output from that point onward without needing to redirect every individual command.",
      pt: 'Um comando interno do shell que substitui o processo de shell atual pelo comando dado por completo, em vez de iniciá-lo como processo filho, o que significa que não sobra shell nenhum para voltar depois que ele roda, o programa novo assume o mesmo ID de processo e herda os descritores de arquivo diretamente. Aparece em dois contextos bem diferentes: como a última linha de um script de entrypoint (para que o processo principal vire o PID 1 em vez de um shell sobrando, o que importa para como containers lidam com sinais), e como "exec > arquivo" para redirecionar toda a saída do próprio script daquele ponto em diante sem precisar redirecionar cada comando individualmente.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The command that replaces the current shell process.',
      pt: 'O comando que substitui o processo de shell atual.',
    },
  },

  trap: {
    desc: {
      en: "A shell builtin that registers a command to run automatically when the shell receives a specific signal, most commonly used as 'trap cleanup EXIT' to guarantee a cleanup function runs no matter how a script ends, whether it finishes normally, hits an error, or is interrupted with Ctrl+C. Without a trap, a script killed partway through can leave a temporary file, a lock, or a background process behind; trap is the mechanism that makes 'always clean up, even on failure' actually reliable instead of hopeful.",
      pt: 'Um comando interno do shell que registra um comando para rodar automaticamente quando o shell recebe um sinal específico, mais comumente usado como "trap limpeza EXIT" para garantir que uma função de limpeza rode não importa como um script termine, seja finalizando normalmente, batendo em um erro, ou sendo interrompido com Ctrl+C. Sem um trap, um script morto no meio do caminho pode deixar para trás um arquivo temporário, um lock, ou um processo em segundo plano; o trap é o mecanismo que torna "sempre limpar, mesmo em falha" algo confiável de verdade, não só uma esperança.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The command to run, followed by the signal name (like EXIT or INT) that triggers it.',
      pt: 'O comando a rodar, seguido do nome do sinal (como EXIT ou INT) que o dispara.',
    },
  },

  eval: {
    desc: {
      en: 'A shell builtin that takes a string and runs it as if it had been typed directly as a command, a second pass of shell parsing applied to text that was itself built dynamically, such as a variable holding a whole command. It is powerful and genuinely useful for a handful of specific patterns, but running eval on anything derived from user input is a classic injection vulnerability, since the string is parsed with the full authority of the shell, whatever it contains, it runs.',
      pt: 'Um comando interno do shell que pega uma string e a roda como se tivesse sido digitada diretamente como comando, uma segunda passada de análise do shell aplicada a um texto que foi ele mesmo construído dinamicamente, como uma variável guardando um comando inteiro. É poderoso e genuinamente útil para um punhado de padrões específicos, mas rodar eval em qualquer coisa derivada de entrada do usuário é uma vulnerabilidade clássica de injeção, já que a string é interpretada com a autoridade total do shell, seja lá o que ela contiver, ela roda.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The string to parse and run as a command.',
      pt: 'A string a interpretar e rodar como comando.',
    },
    commonMistake: {
      en: 'Because eval parses its input a second time, quoting that already looks correct in the original string can still get mangled: a filename with a space, safely quoted the first time around, gets split into two words the moment eval reparses it. That is a separate problem from the security risk, one that shows up even with fully trusted input, and it is why eval so often needs its own careful escaping on top of whatever the string already had.',
      pt: 'Como o eval interpreta a entrada uma segunda vez, uma citação que já parecia correta na string original ainda pode se perder: um nome de arquivo com espaço, mantido entre aspas com segurança na primeira passada, é dividido em duas palavras assim que o eval reinterpreta. Esse é um problema separado do risco de segurança, um que aparece mesmo com entrada totalmente confiável, e é por isso que o eval tantas vezes precisa do próprio escape cuidadoso além do que a string já tinha.',
    },
  },

  ulimit: {
    desc: {
      en: "A shell builtin that shows or sets resource limits for the current shell session and everything launched from it, things like the maximum number of open files, the maximum stack size, or the maximum number of processes a user can run at once. It is the tool behind fixing the notorious 'too many open files' error a busy server process can hit, raising the file-descriptor limit with 'ulimit -n' being the standard first thing tried.",
      pt: 'Um comando interno do shell que mostra ou define limites de recurso para a sessão de shell atual e tudo que é iniciado a partir dela, coisas como o número máximo de arquivos abertos, o tamanho máximo de pilha, ou o número máximo de processos que um usuário pode rodar de uma vez. É a ferramenta por trás de corrigir o notório erro "too many open files" que um processo de servidor ocupado pode encontrar, aumentar o limite de descritores de arquivo com "ulimit -n" sendo a primeira coisa padrão a tentar.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Shows or sets the maximum number of open file descriptors.',
        pt: 'Mostra ou define o número máximo de descritores de arquivo abertos.',
      },
      '-a': {
        en: 'Shows every resource limit at once.',
        pt: 'Mostra todo limite de recurso de uma vez.',
      },
      '-u': {
        en: 'Shows or sets the maximum number of processes a user can run.',
        pt: 'Mostra ou define o número máximo de processos que um usuário pode rodar.',
      },
    },
    valueFlags: {
      '-n': 'generic',
      '-u': 'generic',
    },
    commonMistake: {
      en: 'A ulimit change made at the shell prompt applies only to that shell and whatever it launches from that point on, it never persists across a new login, a reboot, or a service started by systemd, which reads its own separate limits from /etc/security/limits.conf or its own unit configuration. Raising the open-file limit by hand to fix a crashing service and then finding it crashed again after a restart usually means the limit was never actually set anywhere permanent.',
      pt: 'Uma mudança de ulimit feita no prompt do shell se aplica só a esse shell e ao que ele lançar dali em diante, nunca persiste entre um novo login, um reboot, ou um serviço iniciado pelo systemd, que lê seus próprios limites separados do /etc/security/limits.conf ou da configuração própria da unit. Aumentar o limite de arquivos abertos manualmente para corrigir um serviço que travava e depois descobrir que ele travou de novo após um restart geralmente significa que o limite nunca foi de fato definido em nenhum lugar permanente.',
    },
  },
};
