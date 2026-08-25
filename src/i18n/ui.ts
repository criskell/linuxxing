import type { Locale } from './languages';

export const ui = {
  en: {
    'site.title': 'linuxxing',
    'site.tagline': 'Paste a command, or a whole script, and see every piece of it explained, step by step.',
    'hero.count': (count: number) => `${count} commands explained, in English and Portuguese.`,
    'empty.prompt': 'Paste a command on the left to see it explained here, piece by piece.',
    'footer.tagline': 'An open source reference for the Linux and Unix command line.',
    'footer.source': 'View the source code on GitHub',
    'input.placeholder': 'e.g. systemctl --user disable --now x (paste a full script too)',
    'input.button': 'Explain',
    'nav.study': 'Study',
    'nav.commands': 'Commands',
    'commands.indexTitle': 'Linux Command Reference',
    'commands.indexTagline': 'Every command in the explainer, broken down on its own page.',
    'commands.indexCount': (count: number) => `${count} commands across every category.`,
    'commands.pageTitle': (command: string) => `${command} command explained | linuxxing`,
    'commands.subcommandsHeading': 'Subcommands',
    'commands.flagsHeading': 'Flags',
    'commands.argumentHeading': 'Argument',
    'commands.relatedHeading': 'Related commands',
    'commands.tryItPrompt': 'Try it yourself, edit the command below and see it explained live.',
    'commands.backToExplainer': 'Explain any command',
    'study.title': 'Study for the LPIC-1',
    'study.tagline':
      'A reference card for every LPIC-1 exam objective, with spaced repetition to track what you still need to review.',
    'study.totalCards': (count: number) => `${count} cards, covering every LPIC-1 exam objective.`,
    'study.topicCards': (count: number) => `${count} cards`,
    'study.topicDue': (count: number) => `${count} due for review`,
    'study.viewTopic': 'View topic',
    'study.filterDue': 'Show only what is due for review',
    'study.dueBadge': 'Due for review',
    'study.grade.again': 'Again',
    'study.grade.hard': 'Hard',
    'study.grade.good': 'Good',
    'study.grade.easy': 'Easy',
    'type.command': 'command',
    'type.subcommand': 'subcommand',
    'type.flag-long': 'long flag',
    'type.flag-short': 'short flag',
    'type.arg': 'argument',
    'type.unknown': 'unknown',
    'type.comment': 'comment',
    'type.control': 'control flow',
    'type.test': 'condition',
    'type.operator': 'operator',
    'type.redirect': 'redirect',
    'type.assignment': 'variable assignment',
    'type.substitution': 'command substitution',
    'type.variable': 'variable expansion',
    'legend.command': 'command',
    'legend.subcommand': 'subcommand',
    'legend.flag-long': 'long flag',
    'legend.flag-short': 'short flag',
    'legend.arg': 'argument / value',
    'legend.unknown': 'unknown',
    'legend.assignment': 'variable assignment',
    'legend.substitution': 'command substitution',
    'legend.variable': 'variable expansion',
    'fallback.command': (tok: string) =>
      `No specific explanation cataloged yet for "${tok}", but it's the program being run, the first word of the command.`,
    'fallback.flagLong': (name: string) =>
      `Long-style (GNU) option. No specific explanation cataloged for "${name}" on this command, but the "--name" format usually turns on or configures a specific behavior.`,
    'fallback.flagLongValue': (value: string) => ` Here it's given the value "${value}".`,
    'fallback.flagShortCombinedKnown': (letters: string) =>
      `Combines several single-letter options into one: ${letters}.`,
    'fallback.flagShortCombinedUnknown': ' No specific explanation cataloged for this combination on this command.',
    'fallback.flagShort': (tok: string) =>
      `Unix-style short option (a dash plus a letter). No specific explanation cataloged for "${tok}" on this command.`,
    'fallback.subcommandExpected': (base: string, tok: string, examples: string) =>
      `A subcommand of "${base}" was expected here (like ${examples}...), but "${tok}" isn't in my knowledge base.`,
    'fallback.arg':
      'Argument: a value the command will use, such as a file name, service, host, or branch, depending on context.',
    'fallback.dash':
      "A standalone dash. Its meaning depends on the command: often a placeholder for standard input or output, or (as in 'cd -') a shortcut for the previous value.",
    'fallback.test': 'Tests a condition. The block that follows only runs if this evaluates as true.',
    'special.chmodOctal': 'Octal permission notation: each digit sets read/write/execute for owner, group, and others.',
    'special.octalModeDecode': (owner: string, group: string, other: string) =>
      `Owner: ${owner}. Group: ${group}. Others: ${other}.`,
    'special.flagValue': (value: string) => `Here it's set to "${value}".`,
    'special.assignmentLiteral': (name: string, value: string) => `Sets the shell variable "${name}" to "${value}".`,
    'special.assignmentVariable': (name: string, sourceName: string) =>
      `Sets the shell variable "${name}" to the current value of the variable "${sourceName}".`,
    'special.assignmentSubstitution': (name: string) =>
      `Sets the shell variable "${name}" to whatever the command below prints, run right before the assignment happens.`,
    'special.substitution':
      'Command substitution: runs the command below and replaces this whole expression with whatever it prints.',
    'special.variableExpansion': (name: string) => `Expands to the current value of the variable "${name}".`,
    'special.redirectTarget': 'The file or device the redirect above reads from or writes to.',
    'special.fstabLine': (device: string, mount: string, fstype: string, opts: string, dump: string, pass: string) => {
      const mountDesc = mount === 'none' ? '"none" (no mount point, typical for swap)' : `"${mount}"`;
      const dumpDesc = dump === '0' ? 'skip backup' : 'back this up with the dump utility';
      const passDesc =
        pass === '0'
          ? 'skip filesystem check at boot'
          : pass === '1'
            ? 'check first at boot (used for the root filesystem)'
            : 'check at boot, after the root filesystem';
      return `A line for /etc/fstab, in "device mount-point type options dump pass" format. Device "${device}", mount point ${mountDesc}, filesystem type "${fstype}", options "${opts}", dump "${dump}" (${dumpDesc}), pass "${pass}" (${passDesc}).`;
    },
    'comment.desc': 'A comment, ignored by the shell and left in the script as a note for whoever reads it.',
    'operator.and': 'Runs the next command only if this one succeeded (exit code 0).',
    'operator.or': 'Runs the next command only if this one failed (non-zero exit code).',
    'operator.seq': 'Runs the next command right after this one finishes, regardless of whether it succeeded.',
    'operator.pipe': "Sends this command's output as input to the next command.",
    'redirect.overwrite': (fd: string, target: string) =>
      target
        ? `Redirects ${fd === '2' ? 'standard error' : 'standard output'} into "${target}", overwriting it if it already exists.`
        : `Redirects ${fd === '2' ? 'standard error' : 'standard output'} into the file named next, overwriting it if it already exists.`,
    'redirect.append': (fd: string, target: string) =>
      target
        ? `Redirects ${fd === '2' ? 'standard error' : 'standard output'} into "${target}", appending to the end instead of overwriting.`
        : `Redirects ${fd === '2' ? 'standard error' : 'standard output'} into the file named next, appending to the end instead of overwriting.`,
    'redirect.dup': (fd: string, target: string) =>
      `Redirects file descriptor ${fd} to wherever file descriptor ${target} currently points. "2>&1" is the classic way to merge error output into standard output.`,
    'redirect.input': (target: string) =>
      target ? `Feeds "${target}" in as standard input.` : 'Feeds the file named next in as standard input.',
    'examples.label': 'Try one:',
  },
  pt: {
    'site.title': 'linuxxing',
    'site.tagline': 'Cole um comando, ou um script inteiro, e veja cada pedaço dele explicado, passo a passo.',
    'hero.count': (count: number) => `${count} comandos explicados, em português e inglês.`,
    'empty.prompt': 'Cole um comando à esquerda para ver a explicação aqui, pedaço por pedaço.',
    'footer.tagline': 'Uma referência de código aberto para a linha de comando do Linux e do Unix.',
    'footer.source': 'Ver o código-fonte no GitHub',
    'input.placeholder': 'ex: systemctl --user disable --now x (cole um script inteiro também)',
    'input.button': 'Explicar',
    'nav.study': 'Estudar',
    'nav.commands': 'Comandos',
    'commands.indexTitle': 'Referência de Comandos Linux',
    'commands.indexTagline': 'Todo comando do explicador, detalhado em sua própria página.',
    'commands.indexCount': (count: number) => `${count} comandos em cada categoria.`,
    'commands.pageTitle': (command: string) => `comando ${command} explicado | linuxxing`,
    'commands.subcommandsHeading': 'Subcomandos',
    'commands.flagsHeading': 'Flags',
    'commands.argumentHeading': 'Argumento',
    'commands.relatedHeading': 'Comandos relacionados',
    'commands.tryItPrompt': 'Experimente você mesmo, edite o comando abaixo e veja a explicação ao vivo.',
    'commands.backToExplainer': 'Explicar qualquer comando',
    'study.title': 'Estude para o LPIC-1',
    'study.tagline':
      'Um cartão de referência para cada objetivo do exame LPIC-1, com repetição espaçada para acompanhar o que ainda falta revisar.',
    'study.totalCards': (count: number) => `${count} cartões, cobrindo cada objetivo do exame LPIC-1.`,
    'study.topicCards': (count: number) => `${count} cartões`,
    'study.topicDue': (count: number) => `${count} pendentes de revisão`,
    'study.viewTopic': 'Ver tópico',
    'study.filterDue': 'Mostrar só o que está pendente de revisão',
    'study.dueBadge': 'Pendente de revisão',
    'study.grade.again': 'De novo',
    'study.grade.hard': 'Difícil',
    'study.grade.good': 'Bom',
    'study.grade.easy': 'Fácil',
    'type.command': 'comando',
    'type.subcommand': 'subcomando',
    'type.flag-long': 'opção longa',
    'type.flag-short': 'opção curta',
    'type.arg': 'argumento',
    'type.unknown': 'desconhecido',
    'type.comment': 'comentário',
    'type.control': 'controle de fluxo',
    'type.test': 'condição',
    'type.operator': 'operador',
    'type.redirect': 'redirecionamento',
    'type.assignment': 'atribuição de variável',
    'type.substitution': 'substituição de comando',
    'type.variable': 'expansão de variável',
    'legend.command': 'comando',
    'legend.subcommand': 'subcomando',
    'legend.flag-long': 'opção longa',
    'legend.flag-short': 'opção curta',
    'legend.arg': 'argumento / valor',
    'legend.unknown': 'desconhecido',
    'legend.assignment': 'atribuição de variável',
    'legend.substitution': 'substituição de comando',
    'legend.variable': 'expansão de variável',
    'fallback.command': (tok: string) =>
      `Não tenho uma explicação específica cadastrada para "${tok}", mas é o programa que está sendo executado, a primeira palavra do comando.`,
    'fallback.flagLong': (name: string) =>
      `Opção longa (estilo GNU). Não tenho uma explicação específica para "${name}" neste comando, mas o formato "--nome" costuma ativar ou configurar um comportamento específico.`,
    'fallback.flagLongValue': (value: string) => ` Aqui ela recebe o valor "${value}".`,
    'fallback.flagShortCombinedKnown': (letters: string) => `Combina várias opções curtas em uma só: ${letters}.`,
    'fallback.flagShortCombinedUnknown':
      ' Não tenho uma explicação específica cadastrada para essa combinação neste comando.',
    'fallback.flagShort': (tok: string) =>
      `Opção curta no estilo Unix (um hífen + letra). Não tenho uma explicação específica cadastrada para "${tok}" neste comando.`,
    'fallback.subcommandExpected': (base: string, tok: string, examples: string) =>
      `Esperava-se aqui um subcomando de "${base}" (como ${examples}...), mas "${tok}" não está na minha base de conhecimento.`,
    'fallback.arg':
      'Argumento: um valor que o comando vai usar, como o nome de um arquivo, serviço, host ou branch, dependendo do contexto.',
    'fallback.dash':
      "Um hífen sozinho. O significado depende do comando: geralmente representa a entrada ou saída padrão, ou (como em 'cd -') um atalho para o valor anterior.",
    'fallback.test': 'Testa uma condição. O bloco que vem a seguir só roda se isso for verdadeiro.',
    'special.chmodOctal':
      'Notação octal de permissão: cada dígito define leitura/escrita/execução para dono, grupo e outros.',
    'special.octalModeDecode': (owner: string, group: string, other: string) =>
      `Dono: ${owner}. Grupo: ${group}. Outros: ${other}.`,
    'special.flagValue': (value: string) => `Aqui está definido como "${value}".`,
    'special.assignmentLiteral': (name: string, value: string) =>
      `Define a variável de shell "${name}" como "${value}".`,
    'special.assignmentVariable': (name: string, sourceName: string) =>
      `Define a variável de shell "${name}" com o valor atual da variável "${sourceName}".`,
    'special.assignmentSubstitution': (name: string) =>
      `Define a variável de shell "${name}" com o que o comando abaixo imprimir, rodado bem antes da atribuição acontecer.`,
    'special.substitution':
      'Substituição de comando: roda o comando abaixo e troca essa expressão inteira pelo que ele imprimir.',
    'special.variableExpansion': (name: string) => `Expande para o valor atual da variável "${name}".`,
    'special.redirectTarget': 'O arquivo ou dispositivo que o redirecionamento acima lê ou onde ele escreve.',
    'special.fstabLine': (device: string, mount: string, fstype: string, opts: string, dump: string, pass: string) => {
      const mountDesc = mount === 'none' ? '"none" (sem ponto de montagem, típico de swap)' : `"${mount}"`;
      const dumpDesc = dump === '0' ? 'ignorar backup' : 'fazer backup deste com a ferramenta dump';
      const passDesc =
        pass === '0'
          ? 'não checar no boot'
          : pass === '1'
            ? 'checar primeiro no boot (usado para o sistema de arquivos raiz)'
            : 'checar no boot, depois do sistema de arquivos raiz';
      return `Uma linha para o /etc/fstab, no formato "dispositivo ponto-de-montagem tipo opções dump pass". Dispositivo "${device}", ponto de montagem ${mountDesc}, tipo de sistema de arquivos "${fstype}", opções "${opts}", dump "${dump}" (${dumpDesc}), pass "${pass}" (${passDesc}).`;
    },
    'comment.desc': 'Um comentário, ignorado pelo shell e deixado no script como anotação para quem for ler depois.',
    'operator.and': 'Roda o próximo comando só se este teve sucesso (código de saída 0).',
    'operator.or': 'Roda o próximo comando só se este falhou (código de saída diferente de zero).',
    'operator.seq': 'Roda o próximo comando logo depois deste terminar, independente de ter tido sucesso ou não.',
    'operator.pipe': 'Envia a saída deste comando como entrada do próximo.',
    'redirect.overwrite': (fd: string, target: string) =>
      target
        ? `Redireciona ${fd === '2' ? 'a saída de erro' : 'a saída padrão'} para "${target}", sobrescrevendo o arquivo se ele já existir.`
        : `Redireciona ${fd === '2' ? 'a saída de erro' : 'a saída padrão'} para o arquivo indicado a seguir, sobrescrevendo-o se já existir.`,
    'redirect.append': (fd: string, target: string) =>
      target
        ? `Redireciona ${fd === '2' ? 'a saída de erro' : 'a saída padrão'} para "${target}", acrescentando ao final em vez de sobrescrever.`
        : `Redireciona ${fd === '2' ? 'a saída de erro' : 'a saída padrão'} para o arquivo indicado a seguir, acrescentando ao final em vez de sobrescrever.`,
    'redirect.dup': (fd: string, target: string) =>
      `Redireciona o descritor de arquivo ${fd} para onde o descritor ${target} aponta atualmente. "2>&1" é a forma clássica de juntar a saída de erro com a saída padrão.`,
    'redirect.input': (target: string) =>
      target ? `Usa "${target}" como entrada padrão.` : 'Usa o arquivo indicado a seguir como entrada padrão.',
    'examples.label': 'Tente um:',
  },
} as const;

export type UiKey = keyof (typeof ui)['en'];
type UiDict = (typeof ui)['en'];

export function t<K extends UiKey>(locale: Locale, key: K): UiDict[K] {
  const dict = ui[locale] as UiDict;
  return dict[key] ?? (ui[defaultLocaleFallback] as UiDict)[key];
}

const defaultLocaleFallback: Locale = 'en';
