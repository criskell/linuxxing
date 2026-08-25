import type { CommandKB } from './types';

export const permissionsUsers: CommandKB = {
  chmod: {
    desc: {
      en: "Changes the read, write, and execute permissions of a file or folder, controlling who can do what with it. Every file on a Unix-like system carries three permission sets, one each for its owner, its group, and everyone else, and chmod is the tool that edits them, either symbolically (u+x adds execute for the owner) or with the compact three or four-digit octal notation (755, 644). It is one of the first commands anyone learns, because a surprising number of everyday problems, a script that 'won't run', a web server that can't read a file, trace back to a wrong permission bit.",
      pt: 'Altera as permissões de leitura, escrita e execução de um arquivo ou pasta, controlando quem pode fazer o quê com ele. Todo arquivo em um sistema Unix carrega três conjuntos de permissão, um para o dono, um para o grupo e um para os demais, e o chmod é a ferramenta que os edita, seja de forma simbólica (u+x adiciona execução para o dono) ou pela notação octal compacta de três ou quatro dígitos (755, 644). É um dos primeiros comandos que qualquer pessoa aprende, porque um número surpreendente de problemas do dia a dia, um script que "não roda", um servidor web que não consegue ler um arquivo, tem origem em um bit de permissão errado.',
    },
    subcommands: {},
    flags: {
      '-R': {
        en: 'Applies the permission change recursively to every file inside a folder.',
        pt: 'Aplica a mudança de permissão recursivamente, a todos os arquivos dentro de uma pasta.',
      },
      '-v': {
        en: 'Shows what was changed on screen (verbose mode).',
        pt: 'Mostra na tela o que foi alterado (modo verboso).',
      },
    },
    argHint: {
      en: 'The file or folder whose permissions are being changed.',
      pt: 'O arquivo ou pasta cujas permissões estão sendo alteradas.',
    },
    commonMistake: {
      en: "Giving 777 to 'make it work' is one of the most common bad habits: it grants read, write, and execute to literally everyone, including any other user or compromised process on the machine, when the actual problem is almost always a specific, narrower permission or ownership issue. It's also worth remembering that execute on a directory means something different from execute on a file, it controls whether you can enter/traverse that directory at all, not run it.",
      pt: 'Dar 777 para "fazer funcionar" é um dos hábitos ruins mais comuns: isso concede leitura, escrita e execução para literalmente qualquer um, incluindo qualquer outro usuário ou processo comprometido na máquina, quando o problema real quase sempre é uma permissão ou um dono específico e mais restrito. Também vale lembrar que execução em um diretório significa algo diferente de execução em um arquivo, ela controla se você consegue entrar/atravessar aquele diretório, não rodá-lo.',
    },
  },

  chown: {
    desc: {
      en: 'Changes which user and group own a file or folder, separate from what chmod controls (which is what the owner and group are allowed to do). It is typically used with root privileges, since only root or the current owner can hand a file off to someone else, and it comes up constantly when deploying software: a web server process running as a low-privilege user like www-data needs to actually own the files it serves, or every read will be denied regardless of what the permission bits say.',
      pt: 'Altera qual usuário e grupo são donos de um arquivo ou pasta, algo separado do que o chmod controla (que é o que esse dono e grupo têm permissão de fazer). É normalmente usado com privilégios de root, já que só o root ou o dono atual pode transferir um arquivo para outra pessoa, e aparece constantemente no dia a dia de deploy: um processo de servidor web rodando como um usuário de baixo privilégio, como www-data, precisa realmente ser dono dos arquivos que serve, ou toda leitura será negada independente do que os bits de permissão digam.',
    },
    subcommands: {},
    flags: {
      '-R': {
        en: 'Applies the change recursively to every file inside a folder.',
        pt: 'Aplica a mudança recursivamente, a todos os arquivos dentro de uma pasta.',
      },
    },
    argHint: {
      en: 'The new owner (optionally owner:group), or the file/folder being changed. The owner spec comes first.',
      pt: 'O novo dono (opcionalmente dono:grupo), ou o arquivo/pasta sendo alterado. O dono vem primeiro.',
    },
    commonMistake: {
      en: "Without -R, chown only changes the folder itself, not the files inside it, a frequent surprise right after deploying new files as root and switching a service back to run as an unprivileged user. It's also easy to forget the colon in 'owner:group', without it chown only changes the owner and leaves the group untouched, which may not be what was intended.",
      pt: 'Sem -R, o chown só muda a pasta em si, não os arquivos dentro dela, uma surpresa comum logo depois de fazer deploy de arquivos novos como root e trocar um serviço de volta para rodar como um usuário sem privilégios. Também é fácil esquecer os dois-pontos em "dono:grupo", sem eles o chown só muda o dono e deixa o grupo intacto, o que pode não ser a intenção.',
    },
  },

  sudo: {
    desc: {
      en: "Runs a single command with another user's privileges, usually the administrator (root), after checking that the calling user is authorized and (typically) asking for their own password. It exists as an alternative to logging in as root directly, which is considered bad practice: with sudo, every privileged action is tied to a specific user and logged, rules can be configured (via /etc/sudoers) to allow only certain commands, and the elevated privilege lasts only for that one command instead of an entire session. On most desktop and server Linux distributions today, root's password login is disabled entirely and sudo is the only way to gain administrative access.",
      pt: 'Executa um único comando com privilégios de outro usuário, normalmente o administrador (root), depois de checar se quem chamou está autorizado e (geralmente) pedir a senha da própria pessoa. Ele existe como alternativa a fazer login diretamente como root, prática considerada ruim: com o sudo, toda ação privilegiada fica associada a um usuário específico e é registrada em log, regras podem ser configuradas (via /etc/sudoers) para permitir só certos comandos, e o privilégio elevado dura apenas aquele comando, não uma sessão inteira. Na maioria das distribuições Linux modernas, tanto desktop quanto servidor, o login por senha do root vem desativado por padrão e o sudo é a única forma de ganhar acesso administrativo.',
    },
    subcommands: {},
    flags: {
      '-u': {
        en: 'Runs the command as a specific user, instead of root.',
        pt: 'Executa o comando como um usuário específico, em vez do root.',
      },
      '-i': {
        en: "Starts a login session simulating the target user's environment.",
        pt: 'Inicia uma sessão de login simulando o ambiente do usuário alvo.',
      },
    },
    valueFlags: {
      '-u': 'generic',
    },
    commonMistake: {
      en: "sudo only elevates the single command it's given, so 'sudo cd /root' fails to do anything useful, cd changes the shell's own directory and a new sudo-spawned process exits immediately after. It's also a common mix-up that 'sudo echo text > /root/file' still fails with permission denied, only echo runs as root, the '>' redirect is performed by the ORIGINAL unprivileged shell, not by sudo, use 'sudo tee' or a subshell instead.",
      pt: 'O sudo só eleva o único comando que recebe, então "sudo cd /root" não faz nada útil, o cd muda o diretório do próprio shell e um novo processo criado pelo sudo termina logo em seguida. Outra confusão comum é que "sudo echo texto > /root/arquivo" ainda falha com permissão negada, só o echo roda como root, o redirecionamento ">" é feito pelo shell ORIGINAL sem privilégios, não pelo sudo, use "sudo tee" ou um subshell em vez disso.',
    },
  },

  whoami: {
    desc: {
      en: 'Prints the username of whichever user the current shell session is running as. It sounds trivial but is genuinely useful after switching users with su or sudo, or inside a script that needs to confirm it is not accidentally running as root before doing something destructive, since the effective user can be easy to lose track of a few su and ssh hops deep.',
      pt: 'Imprime o nome de usuário sob o qual a sessão de shell atual está rodando. Parece trivial mas é genuinamente útil depois de trocar de usuário com su ou sudo, ou dentro de um script que precisa confirmar que não está rodando como root sem querer antes de fazer algo destrutivo, já que o usuário efetivo pode ser fácil de perder de vista depois de alguns pulos de su e ssh.',
    },
    subcommands: {},
    flags: {},
  },

  id: {
    desc: {
      en: "Shows a user's full identity as the kernel sees it: their numeric user ID (uid), primary group ID (gid), and the complete list of groups they belong to, alongside the human-readable names for each. Permissions on Linux are ultimately decided by these numbers, not by usernames, so id is the tool to reach for when access is unexpectedly denied and the question is really 'which groups does this process's user actually have', for example whether a user was really added to the docker group after all.",
      pt: 'Mostra a identidade completa de um usuário como o kernel a vê: seu ID numérico de usuário (uid), ID do grupo primário (gid), e a lista completa de grupos aos quais pertence, junto com os nomes legíveis de cada um. Permissões no Linux são decididas, no fim das contas, por esses números, não por nomes de usuário, então o id é a ferramenta certa quando um acesso é negado sem explicação e a pergunta real é "quais grupos esse usuário realmente tem", por exemplo se um usuário foi mesmo adicionado ao grupo docker.',
    },
    subcommands: {},
    flags: {},
  },

  useradd: {
    desc: {
      en: 'Creates a new user account on the system, adding an entry to /etc/passwd and, in most setups, a matching group. On its own it leaves several things half-done that most real setups need, no home directory unless -m is given, no shell assigned unless -s is given, and no password set at all (the account stays locked until passwd is run separately), which is why usermod and passwd are almost always the next commands typed right after useradd.',
      pt: 'Cria uma nova conta de usuário no sistema, adicionando uma entrada ao /etc/passwd e, na maioria das configurações, um grupo correspondente. Sozinho, deixa várias coisas pela metade que a maioria das configurações reais precisa, sem diretório home a menos que -m seja passado, sem shell atribuído a menos que -s seja passado, e sem senha nenhuma definida (a conta fica bloqueada até o passwd ser rodado separadamente), motivo pelo qual usermod e passwd quase sempre são os próximos comandos digitados logo depois do useradd.',
    },
    subcommands: {},
    flags: {
      '-m': {
        en: "Creates the user's home directory if it doesn't already exist.",
        pt: 'Cria o diretório home do usuário se ele ainda não existir.',
      },
      '-s': {
        en: "Sets the user's login shell.",
        pt: 'Define o shell de login do usuário.',
      },
      '-G': {
        en: 'Adds the user to one or more supplementary groups.',
        pt: 'Adiciona o usuário a um ou mais grupos suplementares.',
      },
    },
    valueFlags: {
      '-s': 'generic',
      '-G': 'generic',
    },
    argHint: {
      en: 'The name of the user to create.',
      pt: 'O nome do usuário a criar.',
    },
  },

  passwd: {
    desc: {
      en: "Changes the password of a user account, prompting interactively for the new one rather than accepting it as a plain command-line argument, which would leave it visible in the shell's history and to anyone glancing at the terminal. Run with no argument it changes the current user's own password; run by root with a username, it changes anyone's, which is the normal way an administrator sets or resets a password for an account they just created.",
      pt: 'Altera a senha de uma conta de usuário, pedindo interativamente pela nova senha em vez de aceitá-la como argumento simples de linha de comando, o que a deixaria visível no histórico do shell e para qualquer um olhando o terminal. Rodado sem argumento, muda a senha do próprio usuário atual; rodado pelo root com um nome de usuário, muda a de qualquer um, que é a forma normal de um administrador definir ou resetar a senha de uma conta que acabou de criar.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Locks the account, preventing password login.',
        pt: 'Bloqueia a conta, impedindo login por senha.',
      },
    },
    argHint: {
      en: 'The username whose password is being changed. Defaults to the current user.',
      pt: 'O nome de usuário cuja senha está sendo alterada. Por padrão é o usuário atual.',
    },
  },

  su: {
    desc: {
      en: "Switches to another user, root by default if none is named, starting a new shell session running as them. Plain 'su' alone is subtly incomplete, though: it changes the effective user but keeps the calling user's existing environment variables, which can cause confusing bugs, so 'su -' (with the trailing dash) is generally what's actually wanted, since it starts a full login shell that loads the target user's own environment exactly as if they had logged in directly, rather than inheriting yours.",
      pt: 'Troca para outro usuário, root por padrão se nenhum for informado, iniciando uma nova sessão de shell rodando como ele. O "su" puro sozinho é sutilmente incompleto, porém: muda o usuário efetivo mas mantém as variáveis de ambiente já existentes de quem chamou, o que pode causar bugs confusos, então "su -" (com o hífen no final) costuma ser o que de fato se quer, já que inicia um shell de login completo que carrega o próprio ambiente do usuário alvo exatamente como se ele tivesse feito login diretamente, em vez de herdar o seu.',
    },
    subcommands: {},
    flags: {
      '-': {
        en: "Starts a full login shell, loading the target user's environment as if they had logged in directly.",
        pt: 'Inicia um shell de login completo, carregando o ambiente do usuário alvo como se ele tivesse feito login diretamente.',
      },
      '-c': {
        en: 'Runs a single command as the target user, instead of opening an interactive shell.',
        pt: 'Roda um único comando como o usuário alvo, em vez de abrir um shell interativo.',
      },
    },
    valueFlags: {
      '-c': 'generic',
    },
    argHint: {
      en: 'The user to switch to. Defaults to root when omitted.',
      pt: 'O usuário para o qual trocar. Por padrão é o root, quando omitido.',
    },
  },

  groupadd: {
    desc: {
      en: "Creates a new user group on the system, the counterpart to useradd for the group side of Linux's permission model. Groups exist so a permission can be granted to a whole set of users at once instead of one at a time, adding a deploy user to a docker or www-data group, for instance, grants everyone in that group the same access without editing individual file permissions repeatedly.",
      pt: 'Cria um novo grupo de usuário no sistema, a contraparte do useradd para o lado de grupo do modelo de permissão do Linux. Grupos existem para que uma permissão possa ser concedida a um conjunto inteiro de usuários de uma vez em vez de um por um, adicionar um usuário de deploy a um grupo docker ou www-data, por exemplo, concede a todo mundo naquele grupo o mesmo acesso sem editar permissões de arquivo individualmente de forma repetida.',
    },
    subcommands: {},
    flags: {
      '-g': {
        en: 'Sets a specific numeric group ID (gid) instead of letting the system assign the next available one.',
        pt: 'Define um ID numérico de grupo (gid) específico, em vez de deixar o sistema atribuir o próximo disponível.',
      },
    },
    valueFlags: {
      '-g': 'generic',
    },
    argHint: {
      en: 'The name of the group to create.',
      pt: 'O nome do grupo a criar.',
    },
  },

  chgrp: {
    desc: {
      en: "Changes only the group that owns a file or folder, leaving the user owner untouched, a narrower version of what chown can also do (chown can change both owner and group together). It is used less often than chown in practice, mostly reached for when a file's user owner is already correct and only its group access needs adjusting, for example handing shared write access to everyone in a particular team's group.",
      pt: 'Altera apenas o grupo dono de um arquivo ou pasta, deixando o usuário dono intocado, uma versão mais restrita do que o chown também consegue fazer (o chown pode mudar dono e grupo juntos). É usado com menos frequência que o chown na prática, geralmente usado quando o usuário dono de um arquivo já está correto e só o acesso de grupo precisa ser ajustado, por exemplo dando acesso de escrita compartilhado a todos no grupo de um time específico.',
    },
    subcommands: {},
    flags: {
      '-R': {
        en: 'Applies the change recursively to every file inside a folder.',
        pt: 'Aplica a mudança recursivamente, a todos os arquivos dentro de uma pasta.',
      },
    },
    argHint: {
      en: 'The new group name, or the file/folder being changed. The group comes first.',
      pt: 'O novo nome de grupo, ou o arquivo/pasta sendo alterado. O grupo vem primeiro.',
    },
  },

  umask: {
    desc: {
      en: "Shows or sets the default permission mask applied automatically to every newly created file and folder, before chmod is ever run on them by hand. It works by subtraction rather than addition: the mask's bits are the permissions to remove from the system's own defaults (666 for files, 777 for folders), which is why the common umask value of 022 results in newly created files getting 644 and folders 755, that 022 being exactly what got taken away.",
      pt: 'Mostra ou define a máscara de permissão padrão aplicada automaticamente a todo arquivo e pasta recém-criados, antes mesmo do chmod ser rodado neles manualmente. Funciona por subtração, não adição: os bits da máscara são as permissões a remover dos padrões do próprio sistema (666 para arquivos, 777 para pastas), motivo pelo qual o valor comum de umask 022 resulta em arquivos recém-criados ganhando 644 e pastas 755, aquele 022 sendo exatamente o que foi retirado.',
    },
    subcommands: {},
    flags: {},
  },

  usermod: {
    desc: {
      en: "Modifies an existing user account, the counterpart to useradd for accounts that already exist rather than being created fresh. Its most common invocation is adding a user to a group with -aG, and forgetting the -a there is a classic mistake, without it, -G replaces the user's supplementary groups entirely instead of adding to them, silently removing them from every other group they belonged to.",
      pt: 'Modifica uma conta de usuário existente, a contraparte do useradd para contas que já existem, em vez de serem criadas do zero. Sua invocação mais comum é adicionar um usuário a um grupo com -aG, e esquecer o -a ali é um erro clássico, sem ele, o -G substitui os grupos suplementares do usuário por completo em vez de adicionar a eles, removendo-o silenciosamente de todo outro grupo ao qual pertencia.',
    },
    subcommands: {},
    flags: {
      '-aG': {
        en: 'Adds the user to one or more supplementary groups, appending to their existing groups instead of replacing them.',
        pt: 'Adiciona o usuário a um ou mais grupos suplementares, acrescentando aos grupos existentes em vez de substituí-los.',
      },
      '-s': {
        en: "Changes the user's login shell.",
        pt: 'Altera o shell de login do usuário.',
      },
      '-l': {
        en: "Changes the user's login name.",
        pt: 'Altera o nome de login do usuário.',
      },
    },
    valueFlags: {
      '-aG': 'generic',
      '-s': 'generic',
      '-l': 'generic',
    },
    argHint: {
      en: 'The username of the account being modified.',
      pt: 'O nome de usuário da conta sendo modificada.',
    },
  },

  userdel: {
    desc: {
      en: "Removes a user account from the system. By default it leaves the user's home directory and mail spool untouched, deleting only the account entry itself; -r removes those too, which is normally what is actually wanted when decommissioning an account for good.",
      pt: 'Remove uma conta de usuário do sistema. Por padrão deixa o diretório home e a caixa de correio do usuário intocados, apagando só a entrada da conta em si; o -r remove esses também, que é normalmente o que de fato se quer ao desativar uma conta de vez.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: "Also removes the user's home directory and mail spool.",
        pt: 'Também remove o diretório home e a caixa de correio do usuário.',
      },
    },
    argHint: {
      en: 'The username of the account to remove.',
      pt: 'O nome de usuário da conta a remover.',
    },
  },

  groupdel: {
    desc: {
      en: "Removes a group from the system. It fails if the group is still any user's primary group, that user has to be moved to a different primary group first, which is a safety check preventing a user from being left in an inconsistent state with no valid primary group at all.",
      pt: 'Remove um grupo do sistema. Falha se o grupo ainda for o grupo primário de algum usuário, esse usuário precisa ser movido para outro grupo primário antes, uma checagem de segurança que evita deixar um usuário em um estado inconsistente, sem grupo primário válido nenhum.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The name of the group to remove.',
      pt: 'O nome do grupo a remover.',
    },
  },

  groups: {
    desc: {
      en: 'Prints the groups a user belongs to, a quicker, more narrowly focused alternative to id when the only thing that matters is group membership, such as confirming a user was really added to the docker or sudo group.',
      pt: 'Imprime os grupos aos quais um usuário pertence, uma alternativa mais rápida e focada ao id quando só a associação de grupo importa, como confirmar se um usuário foi mesmo adicionado ao grupo docker ou sudo.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The username to check. Defaults to the current user when omitted.',
      pt: 'O nome de usuário a checar. Por padrão é o usuário atual, quando omitido.',
    },
  },

  visudo: {
    desc: {
      en: 'Opens /etc/sudoers (or a file under /etc/sudoers.d) for editing, but never directly with a plain text editor: visudo locks the file against simultaneous edits and, critically, validates the syntax before saving, refusing to write a broken file. That validation matters enormously here specifically, because a syntax error in sudoers can lock every user, including root via sudo, out of administrative access, and visudo is the only sanctioned way to avoid that outcome.',
      pt: 'Abre o /etc/sudoers (ou um arquivo em /etc/sudoers.d) para edição, mas nunca diretamente com um editor de texto simples: o visudo trava o arquivo contra edições simultâneas e, criticamente, valida a sintaxe antes de salvar, recusando-se a escrever um arquivo quebrado. Essa validação importa enormemente aqui especificamente, porque um erro de sintaxe no sudoers pode trancar todo usuário, incluindo o root via sudo, fora do acesso administrativo, e o visudo é a única forma sancionada de evitar esse resultado.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Checks the existing sudoers file for syntax errors without opening an editor.',
        pt: 'Checa o arquivo sudoers existente por erros de sintaxe sem abrir um editor.',
      },
    },
  },

  newgrp: {
    desc: {
      en: "Switches the current session's active primary group to a different one the user belongs to, without logging out and back in, useful right after being added to a new group when that membership hasn't taken effect in the current session yet.",
      pt: 'Troca o grupo primário ativo da sessão atual para outro ao qual o usuário pertence, sem precisar deslogar e logar de novo, útil logo depois de ser adicionado a um grupo novo quando essa associação ainda não entrou em vigor na sessão atual.',
    },
    subcommands: {},
    flags: {},
    argHint: {
      en: 'The group to switch to.',
      pt: 'O grupo para o qual trocar.',
    },
  },
};
