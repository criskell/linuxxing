import type { CommandKB } from './types';

export const networking: CommandKB = {
  ssh: {
    desc: {
      en: "Opens a secure, encrypted connection to another machine over the network, to access its terminal, run a single command remotely, or tunnel other traffic through it. It replaced older, unencrypted tools like telnet and rlogin, and is the standard way to administer remote Linux servers: everything typed and returned is encrypted end to end, and authentication can use either a password or, far more commonly in practice, a public/private key pair generated with ssh-keygen. Beyond an interactive shell, ssh also underlies tools like scp, rsync, and git's SSH remotes, since they all reuse the same encrypted channel and key-based trust.",
      pt: 'Abre uma conexão criptografada e segura com outra máquina pela rede, para acessar o terminal dela, rodar um único comando remotamente, ou encapsular outro tráfego por ela. Ele substituiu ferramentas mais antigas e sem criptografia, como telnet e rlogin, e é a forma padrão de administrar servidores Linux remotos: tudo que é digitado e retornado é criptografado de ponta a ponta, e a autenticação pode usar senha ou, muito mais comum na prática, um par de chaves pública/privada gerado com ssh-keygen. Além de um shell interativo, o ssh também é a base de ferramentas como scp, rsync e os remotes SSH do git, já que todas reaproveitam o mesmo canal criptografado e confiança baseada em chave.',
    },
    subcommands: {},
    flags: {
      '-p': {
        en: 'Specifies the port of the remote SSH server (default is 22).',
        pt: 'Especifica a porta do servidor SSH remoto (o padrão é 22).',
      },
      '-i': {
        en: 'Specifies the private key file to use for authentication.',
        pt: 'Especifica o arquivo de chave privada a ser usado para autenticação.',
      },
      '-v': {
        en: 'Shows detailed connection information (verbose mode), useful for debugging.',
        pt: 'Mostra informações detalhadas sobre a conexão (modo verboso), útil para depurar problemas.',
      },
      '-L': {
        en: 'Creates a tunnel that forwards a local port to a port on the remote machine.',
        pt: 'Cria um túnel que encaminha uma porta local para uma porta na máquina remota.',
      },
    },
    valueFlags: {
      '-p': 'generic',
      '-i': 'generic',
      '-L': 'generic',
    },
    argHint: {
      en: 'The remote host to connect to, optionally as user@host.',
      pt: 'O host remoto ao qual conectar, opcionalmente como usuario@host.',
    },
    commonMistake: {
      en: "A 'permission denied' or 'connection refused' error is often blamed on the wrong thing: permission denied usually means the key or password was rejected (check which key is being offered with -v), while connection refused means nothing is even listening on that port, a firewall or a stopped service, not an authentication problem at all. The -p flag also only sets the PORT, mixing it up with -i (the key file) is an easy typo that produces a confusing, unrelated error.",
      pt: 'Um erro de "permission denied" ou "connection refused" costuma ser atribuído à causa errada: permission denied geralmente significa que a chave ou senha foi rejeitada (confira qual chave está sendo oferecida com -v), enquanto connection refused significa que nada sequer está escutando naquela porta, um firewall ou um serviço parado, não um problema de autenticação. A flag -p também só define a PORTA, confundi-la com -i (o arquivo de chave) é um erro de digitação fácil que produz um erro confuso e sem relação.',
    },
  },

  curl: {
    desc: {
      en: "Transfers data to or from a URL, supporting HTTP, HTTPS, FTP, and a long list of other protocols, all from the terminal without a browser. It is the default tool for testing and debugging APIs (setting the method, headers, and body by hand), downloading files or install scripts, and checking how a server responds at a low level, since unlike a browser it shows exactly what was sent and received. Its ubiquity, curl ships on almost every Linux and macOS system by default, is also why 'curl ... | sh' became the common (if risky) one-line install pattern for so much developer tooling.",
      pt: 'Transfere dados de ou para uma URL, suportando HTTP, HTTPS, FTP e uma longa lista de outros protocolos, tudo direto do terminal sem precisar de navegador. É a ferramenta padrão para testar e depurar APIs (definindo método, headers e corpo manualmente), baixar arquivos ou scripts de instalação, e checar como um servidor responde em baixo nível, já que, ao contrário de um navegador, mostra exatamente o que foi enviado e recebido. Sua onipresença, o curl vem instalado por padrão em quase todo sistema Linux e macOS, também é o motivo de "curl ... | sh" ter virado o padrão comum (ainda que arriscado) de instalação em uma linha para tanta ferramenta de desenvolvedor.',
    },
    subcommands: {},
    flags: {
      '-X': {
        en: 'Sets the HTTP method for the request, such as GET, POST, or DELETE.',
        pt: 'Define o método HTTP da requisição, como GET, POST ou DELETE.',
      },
      '-H': {
        en: 'Adds a custom HTTP header to the request.',
        pt: 'Adiciona um cabeçalho (header) HTTP customizado à requisição.',
      },
      '-d': {
        en: 'Sends data in the request body, usually with POST.',
        pt: 'Envia dados no corpo da requisição, geralmente usado com POST.',
      },
      '-o': {
        en: 'Saves the response to a file, instead of printing it to the screen.',
        pt: 'Salva a resposta em um arquivo, em vez de mostrar na tela.',
      },
      '-L': {
        en: 'Follows redirects automatically.',
        pt: 'Segue redirecionamentos automaticamente.',
      },
      '-s': {
        en: 'Silent mode: hides the progress bar and error messages.',
        pt: 'Modo silencioso: não mostra barra de progresso nem mensagens de erro.',
      },
      '-I': {
        en: 'Fetches only the response headers, without the body.',
        pt: 'Busca apenas os cabeçalhos da resposta, sem o corpo.',
      },
      '-f': {
        en: 'Fails silently (no error page in the output) on server errors, and makes curl return a non-zero exit code, which is useful in scripts to detect failures.',
        pt: 'Falha silenciosamente (sem mostrar a página de erro) em erros do servidor, e faz o curl retornar um código de saída diferente de zero, o que é útil em scripts para detectar falhas.',
      },
      '-S': {
        en: 'Shows an error message if curl fails, even when combined with -s (silent mode).',
        pt: 'Mostra uma mensagem de erro se o curl falhar, mesmo combinado com -s (modo silencioso).',
      },
    },
    valueFlags: {
      '-X': 'generic',
      '-H': 'generic',
      '-d': 'generic',
      '-o': 'generic',
    },
    argHint: {
      en: 'The URL to request.',
      pt: 'A URL a requisitar.',
    },
    commonMistake: {
      en: "By default curl silently follows nothing, a 301/302 redirect response is printed as-is (often an empty or HTML 'moved' body) instead of the final page, unless -L is added to actually follow it, a very common source of 'curl returns nothing useful' confusion. It's also easy to assume curl fails loudly on a 404 or 500, it doesn't by default, it prints the error page as if it were a normal response and exits successfully, add -f if the script needs a real failure on HTTP errors.",
      pt: 'Por padrão o curl não segue nada, uma resposta de redirecionamento 301/302 é impressa como está (geralmente um corpo vazio ou HTML de "moved") em vez da página final, a menos que -L seja adicionado para de fato seguir, uma fonte muito comum de confusão de "o curl não retorna nada útil". Também é fácil supor que o curl falha visivelmente em um 404 ou 500, ele não falha por padrão, imprime a página de erro como se fosse uma resposta normal e sai com sucesso, adicione -f se o script precisar de uma falha de verdade em erros HTTP.',
    },
  },

  ping: {
    desc: {
      en: "Tests connectivity to another machine on the network by sending small ICMP echo request packets and timing how long each one takes to be answered. It is usually the very first diagnostic step when something seems unreachable, since it isolates whether the problem is basic network connectivity (packets aren't getting there at all) versus something higher up the stack, like a specific port being closed or a service being down. Unlike most commands, it runs forever by default, printing one line per packet until interrupted, which is why -c (a fixed packet count) shows up in almost every scripted use.",
      pt: 'Testa a conectividade com outra máquina na rede enviando pequenos pacotes ICMP echo request e cronometrando quanto tempo cada um leva para ser respondido. Costuma ser o primeiríssimo passo de diagnóstico quando algo parece inalcançável, já que isola se o problema é conectividade básica de rede (os pacotes simplesmente não estão chegando) ou algo mais acima na pilha, como uma porta específica fechada ou um serviço fora do ar. Diferente da maioria dos comandos, ele roda para sempre por padrão, imprimindo uma linha por pacote até ser interrompido, e é por isso que o -c (um número fixo de pacotes) aparece em quase todo uso em script.',
    },
    subcommands: {},
    flags: {
      '-c': {
        en: 'Sets how many packets to send before stopping automatically.',
        pt: 'Define quantos pacotes enviar antes de parar automaticamente.',
      },
    },
    valueFlags: {
      '-c': 'generic',
    },
    argHint: {
      en: 'The host or IP address to test.',
      pt: 'O host ou endereço IP a testar.',
    },
  },

  wget: {
    desc: {
      en: "Downloads files from the web over HTTP, HTTPS, or FTP, built from the ground up for non-interactive, unattended downloading rather than interactive use. That focus shows in its defaults: it retries automatically on connection failures, can resume a partially downloaded file instead of restarting from zero, and can run happily in the background disconnected from a terminal, which makes it a natural fit for scripts and cron jobs. Its -r flag can even recursively follow links to mirror an entire website, a capability curl doesn't have built in.",
      pt: 'Baixa arquivos da web via HTTP, HTTPS ou FTP, construído desde o início para download não interativo e sem supervisão, em vez de uso interativo. Esse foco aparece nos padrões dele: tenta de novo automaticamente em falhas de conexão, consegue retomar um download parcial em vez de recomeçar do zero, e roda bem em segundo plano desconectado de um terminal, o que o torna natural para scripts e tarefas de cron. Sua flag -r consegue até seguir links recursivamente para espelhar um site inteiro, capacidade que o curl não tem embutida.',
    },
    subcommands: {},
    flags: {
      '-O': {
        en: 'Saves the downloaded file under a specific name, instead of the name in the URL.',
        pt: 'Salva o arquivo baixado com um nome específico, em vez do nome que está na URL.',
      },
      '-q': {
        en: 'Quiet mode, suppresses output.',
        pt: 'Modo silencioso, suprime a saída.',
      },
      '-c': {
        en: 'Resumes a partially downloaded file instead of starting over.',
        pt: 'Retoma um download parcial em vez de começar do zero.',
      },
      '-r': {
        en: 'Downloads recursively, following links (used to mirror a site).',
        pt: 'Baixa recursivamente, seguindo links (usado para espelhar um site).',
      },
    },
    valueFlags: {
      '-O': 'generic',
    },
    argHint: {
      en: 'The URL to download.',
      pt: 'A URL a baixar.',
    },
  },

  rsync: {
    desc: {
      en: 'Synchronizes files and folders between two locations, local-to-local, local-to-remote, or remote-to-remote over SSH, using a delta-transfer algorithm that compares both sides and sends only the parts of a file that actually changed rather than the whole file again. This makes it dramatically faster than a plain copy for repeated backups or deployments, where most files are usually unchanged between runs. Combined with --delete it becomes a true mirror tool, making the destination an exact copy of the source, including removing files that no longer exist there, which is why it is the standard building block for backup scripts.',
      pt: 'Sincroniza arquivos e pastas entre dois lugares, local para local, local para remoto, ou remoto para remoto via SSH, usando um algoritmo de transferência por delta que compara os dois lados e envia só as partes de um arquivo que realmente mudaram, em vez do arquivo inteiro de novo. Isso o torna dramaticamente mais rápido que uma cópia simples para backups ou deploys repetidos, onde a maioria dos arquivos costuma estar inalterada entre uma execução e outra. Combinado com --delete ele vira uma ferramenta de espelhamento de verdade, fazendo do destino uma cópia exata da origem, inclusive removendo arquivos que não existem mais lá, e é por isso que é a peça padrão de construção de scripts de backup.',
    },
    subcommands: {},
    flags: {
      '-a': {
        en: 'Archive mode: preserves permissions, timestamps, symlinks, and copies recursively. The usual default for backups.',
        pt: 'Modo arquivo: preserva permissões, datas, links simbólicos, e copia recursivamente. O padrão de fato para backups.',
      },
      '-v': {
        en: 'Shows each file transferred on screen (verbose mode).',
        pt: 'Mostra na tela cada arquivo transferido (modo verboso).',
      },
      '-z': {
        en: 'Compresses data during the transfer, useful over slow connections.',
        pt: 'Compacta os dados durante a transferência, útil em conexões lentas.',
      },
      '--delete': {
        en: 'Deletes files in the destination that no longer exist in the source, making the destination an exact mirror.',
        pt: 'Apaga arquivos no destino que não existem mais na origem, fazendo do destino um espelho exato.',
      },
      '-e': {
        en: 'Specifies the remote shell to use for the connection, usually ssh with custom options.',
        pt: 'Especifica o shell remoto a usar na conexão, geralmente ssh com opções customizadas.',
      },
    },
    valueFlags: {
      '-e': 'generic',
    },
    argHint: {
      en: 'The source path to sync, or the destination (the last argument is normally the destination).',
      pt: 'O caminho de origem a sincronizar, ou o destino (o último argumento normalmente é o destino).',
    },
    commonMistake: {
      en: 'A trailing slash on the source path changes what rsync copies: rsync -av folder/ dest/ copies the contents of folder into dest, while rsync -av folder dest/ copies folder itself, nested one level deeper. The two commands look nearly identical and produce different directory layouts, so that trailing slash deserves a second look before running.',
      pt: 'Uma barra no final do caminho de origem muda o que o rsync copia: rsync -av pasta/ destino/ copia o conteúdo de pasta para dentro de destino, enquanto rsync -av pasta destino/ copia a própria pasta, aninhada um nível a mais. Os dois comandos parecem quase idênticos e produzem estruturas de diretório diferentes, então essa barra no final merece um segundo olhar antes de rodar.',
    },
  },

  scp: {
    desc: {
      en: "Copies files between hosts over SSH, encrypted the entire way, essentially cp's syntax extended with the concept of a remote path written as user@host:/path. It reuses the exact same authentication as ssh, including key-based login, so anywhere ssh access already works, scp works too with no extra setup. For anything beyond a one-off file or two, especially repeated transfers or whole directory trees, rsync is generally the better tool, since scp always copies everything from scratch with no notion of what changed since last time.",
      pt: 'Copia arquivos entre máquinas via SSH, criptografado o caminho inteiro, essencialmente a sintaxe do cp estendida com o conceito de um caminho remoto escrito como usuario@host:/caminho. Ele reaproveita exatamente a mesma autenticação do ssh, incluindo login por chave, então onde o acesso ssh já funciona, o scp funciona também sem configuração extra. Para qualquer coisa além de um arquivo avulso ou dois, especialmente transferências repetidas ou árvores de diretório inteiras, o rsync costuma ser a ferramenta melhor, já que o scp sempre copia tudo do zero, sem noção do que mudou desde a última vez.',
    },
    subcommands: {},
    flags: {
      '-r': {
        en: 'Copies folders and their contents recursively.',
        pt: 'Copia pastas e seu conteúdo recursivamente.',
      },
      '-P': {
        en: 'Specifies the SSH port of the remote host (uppercase, unlike ssh which uses -p).',
        pt: 'Especifica a porta SSH da máquina remota (maiúscula, diferente do ssh que usa -p).',
      },
      '-i': {
        en: 'Specifies the private key file to use for authentication.',
        pt: 'Especifica o arquivo de chave privada a ser usado para autenticação.',
      },
    },
    valueFlags: {
      '-P': 'generic',
      '-i': 'generic',
    },
    argHint: {
      en: 'The source path to copy, or the destination, written as user@host:/path for a remote side. The last argument is normally the destination.',
      pt: 'O caminho de origem a copiar, ou o destino, escrito como usuario@host:/caminho para o lado remoto. O último argumento normalmente é o destino.',
    },
    commonMistake: {
      en: 'Copying a directory with plain scp fails with an error about it not being a regular file, because scp only handles individual files by default. The -r flag makes it recurse into the directory, the same flag cp needs for the same reason, and it is the flag people forget most often when scp gets used far less frequently than cp.',
      pt: 'Copiar um diretório com scp simples falha com um erro dizendo que não é um arquivo comum, porque o scp só lida com arquivos individuais por padrão. A flag -r faz ele entrar recursivamente no diretório, a mesma flag que o cp precisa pelo mesmo motivo, e é a flag mais esquecida quando o scp é usado bem menos que o cp.',
    },
  },

  'ssh-keygen': {
    desc: {
      en: 'Generates a new SSH key pair, a private key that must never leave the machine it was created on and a matching public key that gets copied to every server you want to log into. Authentication then works by proving possession of the private key through public-key cryptography, without ever sending a password over the network, which is both more convenient (no typing a password on every connection) and considerably more secure than password authentication, since the private key never leaves your machine and can itself be protected by a passphrase. ed25519 is the modern recommended key type: shorter, faster, and just as secure as a much larger traditional RSA key.',
      pt: 'Gera um novo par de chaves SSH, uma chave privada que nunca deve sair da máquina onde foi criada e uma chave pública correspondente que é copiada para cada servidor no qual se quer logar. A autenticação então funciona provando a posse da chave privada por criptografia de chave pública, sem nunca enviar uma senha pela rede, o que é ao mesmo tempo mais conveniente (sem digitar senha a cada conexão) e consideravelmente mais seguro do que autenticação por senha, já que a chave privada nunca sai da sua máquina e ainda pode ser protegida por uma frase-senha própria. O ed25519 é o tipo de chave moderno recomendado: mais curto, mais rápido, e tão seguro quanto uma chave RSA tradicional muito maior.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Sets the key type, such as ed25519 (recommended) or rsa.',
        pt: 'Define o tipo da chave, como ed25519 (recomendado) ou rsa.',
      },
      '-b': {
        en: 'Sets the key size in bits (relevant for rsa keys).',
        pt: 'Define o tamanho da chave em bits (relevante para chaves rsa).',
      },
      '-f': {
        en: 'Sets the output file path for the generated key.',
        pt: 'Define o caminho do arquivo de saída para a chave gerada.',
      },
      '-C': {
        en: 'Adds a comment to the key, usually an email or label to identify it.',
        pt: 'Adiciona um comentário à chave, geralmente um email ou rótulo para identificá-la.',
      },
    },
    valueFlags: {
      '-t': 'generic',
      '-b': 'generic',
      '-f': 'generic',
      '-C': 'generic',
    },
  },

  ip: {
    desc: {
      en: 'Shows and configures network interfaces, IP addresses, and routing, the modern replacement for the older ifconfig and route commands, which are deprecated and often not even installed by default anymore on current distributions. It is organized into objects (addr for addresses, link for the interfaces themselves, route for the routing table), each with its own set of actions, a structure carried over from the wider iproute2 suite it belongs to, which is more consistent, if a bit more to type, than the commands it replaced.',
      pt: 'Mostra e configura interfaces de rede, endereços IP e roteamento, o substituto moderno dos antigos ifconfig e route, que já estão obsoletos e muitas vezes nem vêm mais instalados por padrão nas distribuições atuais. É organizado em objetos (addr para endereços, link para as próprias interfaces, route para a tabela de rotas), cada um com seu próprio conjunto de ações, uma estrutura herdada do conjunto mais amplo iproute2 ao qual pertence, mais consistente, ainda que um pouco mais longa de digitar, do que os comandos que substituiu.',
    },
    subcommands: {
      addr: {
        en: 'Shows or manages IP addresses assigned to network interfaces.',
        pt: 'Mostra ou gerencia endereços IP atribuídos às interfaces de rede.',
      },
      link: {
        en: 'Shows or manages network interfaces themselves (up/down, name).',
        pt: 'Mostra ou gerencia as próprias interfaces de rede (ativar/desativar, nome).',
      },
      route: {
        en: 'Shows or manages the routing table.',
        pt: 'Mostra ou gerencia a tabela de rotas.',
      },
    },
    flags: {},
  },

  netstat: {
    desc: {
      en: "Shows network connections, listening ports, and routing information, long the default tool for that job across nearly every Unix-like system. It is now considered deprecated in favor of ss, which reads the same information more efficiently straight from the kernel instead of parsing /proc, but netstat's exact flag combinations, '-tulpn' above all, are so deeply memorized by a generation of admins that it remains in everyday use even where ss would technically be preferred, and is worth recognizing in any script or tutorial written before ss became standard.",
      pt: 'Mostra conexões de rede, portas ouvindo, e informações de roteamento, por muito tempo a ferramenta padrão para isso em praticamente todo sistema Unix. Hoje é considerado obsoleto em favor do ss, que lê a mesma informação de forma mais eficiente direto do kernel em vez de analisar o /proc, mas as combinações exatas de flags do netstat, "-tulpn" acima de tudo, estão tão memorizadas por uma geração de administradores que continua em uso no dia a dia mesmo onde o ss seria tecnicamente preferível, e vale reconhecê-lo em qualquer script ou tutorial escrito antes do ss virar padrão.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Shows TCP connections.',
        pt: 'Mostra conexões TCP.',
      },
      '-u': {
        en: 'Shows UDP connections.',
        pt: 'Mostra conexões UDP.',
      },
      '-l': {
        en: 'Shows only listening sockets.',
        pt: 'Mostra apenas sockets em modo de escuta.',
      },
      '-n': {
        en: 'Shows numeric addresses and ports instead of resolving names.',
        pt: 'Mostra endereços e portas numéricos em vez de resolver nomes.',
      },
      '-p': {
        en: 'Shows the process using each connection.',
        pt: 'Mostra o processo que está usando cada conexão.',
      },
    },
  },

  ss: {
    desc: {
      en: "Shows network socket statistics, connections and listening ports, part of the same iproute2 suite as ip and its designated successor to netstat. Its name literally stands for 'socket statistics', and it earns the speed netstat lacks by reading kernel socket information directly instead of going through the older, slower /proc-parsing interface netstat relies on, which matters on a system with a very large number of open connections. 'ss -tulpn' (TCP, UDP, listening, show process, numeric ports) is the modern equivalent of netstat's most common invocation, and is the one worth learning going forward.",
      pt: 'Mostra estatísticas de sockets de rede, conexões e portas ouvindo, parte do mesmo conjunto iproute2 do ip e seu sucessor designado do netstat. O nome vem literalmente de "socket statistics" (estatísticas de socket), e ganha a velocidade que falta ao netstat lendo informação de socket do kernel diretamente, em vez de passar pela interface mais antiga e lenta de análise do /proc que o netstat usa, o que importa em um sistema com um número muito grande de conexões abertas. "ss -tulpn" (TCP, UDP, ouvindo, mostrar processo, portas numéricas) é o equivalente moderno da invocação mais comum do netstat, e é o que vale aprender daqui para frente.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Shows TCP sockets.',
        pt: 'Mostra sockets TCP.',
      },
      '-u': {
        en: 'Shows UDP sockets.',
        pt: 'Mostra sockets UDP.',
      },
      '-l': {
        en: 'Shows only listening sockets.',
        pt: 'Mostra apenas sockets em modo de escuta.',
      },
      '-n': {
        en: 'Shows numeric addresses and ports instead of resolving names.',
        pt: 'Mostra endereços e portas numéricos em vez de resolver nomes.',
      },
      '-p': {
        en: 'Shows the process using each socket.',
        pt: 'Mostra o processo que está usando cada socket.',
      },
    },
  },

  nc: {
    desc: {
      en: 'Netcat, often nicknamed the network Swiss Army knife: reads and writes raw data straight over a network connection, with none of the protocol assumptions of curl or ssh. That bare-bones simplicity is exactly its value: it can act as a quick client to poke at any TCP or UDP port and see what comes back, as a minimal server with -l for testing, or as a fast, no-frills way to pipe data between two machines, all without needing to know or implement whatever protocol the two sides would normally speak.',
      pt: 'Netcat, muitas vezes apelidado de canivete suíço da rede: lê e escreve dados brutos direto em uma conexão de rede, sem nenhuma das suposições de protocolo do curl ou do ssh. Essa simplicidade básica é exatamente seu valor: consegue agir como cliente rápido para cutucar qualquer porta TCP ou UDP e ver o que volta, como servidor mínimo com -l para testes, ou como forma rápida e sem frescura de encanar dados entre duas máquinas, tudo sem precisar saber ou implementar qualquer protocolo que os dois lados normalmente falariam.',
    },
    subcommands: {},
    flags: {
      '-l': {
        en: 'Listens for an incoming connection instead of making one.',
        pt: 'Escuta por uma conexão de entrada em vez de fazer uma.',
      },
      '-v': {
        en: 'Shows more information about the connection (verbose mode).',
        pt: 'Mostra mais informações sobre a conexão (modo verboso).',
      },
      '-z': {
        en: 'Scans for listening services without sending any data (zero-I/O mode).',
        pt: 'Varre por serviços ouvindo sem enviar dados (modo zero-I/O).',
      },
    },
  },

  ufw: {
    desc: {
      en: "Uncomplicated Firewall: a friendlier command-line interface over iptables (or, on newer systems, nftables), the actual kernel-level firewall machinery on Linux, which is powerful but notoriously hard to configure directly by hand. ufw trades some of that raw flexibility for commands a human can read at a glance, 'ufw allow 22/tcp' instead of a multi-flag iptables rule, and is the default, expected way to manage a firewall on Debian and Ubuntu systems as a result. It has to actually be enabled with 'ufw enable' to take effect at all, and forgetting that step, or forgetting to allow SSH's own port before enabling it on a remote server, is a classic way to lock yourself out.",
      pt: 'Uncomplicated Firewall: uma interface de linha de comando mais amigável sobre o iptables (ou, em sistemas mais novos, o nftables), a maquinaria de firewall de verdade em nível de kernel no Linux, que é poderosa mas notoriamente difícil de configurar diretamente à mão. O ufw troca parte dessa flexibilidade bruta por comandos que um humano consegue ler de relance, "ufw allow 22/tcp" em vez de uma regra iptables com vários flags, e é por isso a forma padrão esperada de gerenciar um firewall no Debian e no Ubuntu. Ele precisa ser de fato ativado com "ufw enable" para ter algum efeito, e esquecer esse passo, ou esquecer de liberar a própria porta do SSH antes de ativá-lo em um servidor remoto, é uma forma clássica de se trancar para fora.',
    },
    subcommands: {
      enable: {
        en: 'Turns the firewall on, applying the configured rules.',
        pt: 'Ativa o firewall, aplicando as regras configuradas.',
      },
      disable: {
        en: 'Turns the firewall off entirely.',
        pt: 'Desativa o firewall por completo.',
      },
      allow: {
        en: 'Adds a rule permitting traffic, usually to a specific port or service.',
        pt: 'Adiciona uma regra permitindo tráfego, geralmente para uma porta ou serviço específico.',
      },
      deny: {
        en: 'Adds a rule blocking traffic to a specific port or service.',
        pt: 'Adiciona uma regra bloqueando tráfego para uma porta ou serviço específico.',
      },
      status: {
        en: 'Shows whether the firewall is active and lists the current rules.',
        pt: 'Mostra se o firewall está ativo e lista as regras atuais.',
      },
    },
    flags: {},
  },

  dig: {
    desc: {
      en: "Queries DNS servers directly and shows the raw response, the standard tool for debugging DNS: confirming what IP address a domain actually resolves to, which name server is authoritative for it, or why a DNS change hasn't propagated yet. Its output is more detailed and more literally 'what the DNS server said' than higher-level tools, which is exactly the point when the question is specifically about DNS behavior rather than whether a site is reachable overall.",
      pt: 'Consulta servidores DNS diretamente e mostra a resposta bruta, a ferramenta padrão para depurar DNS: confirmar para qual IP um domínio realmente resolve, qual servidor de nomes é autoritativo para ele, ou por que uma mudança de DNS ainda não se propagou. Sua saída é mais detalhada e mais literalmente "o que o servidor DNS respondeu" do que ferramentas de nível mais alto, o que é exatamente o ponto quando a pergunta é especificamente sobre o comportamento do DNS, não sobre se um site está alcançável no geral.',
    },
    subcommands: {},
    flags: {
      '+short': {
        en: 'Prints only the essential answer, skipping the full detailed output.',
        pt: 'Imprime só a resposta essencial, sem a saída detalhada completa.',
      },
    },
    argHint: {
      en: 'The domain name to query.',
      pt: 'O domínio a consultar.',
    },
  },

  host: {
    desc: {
      en: 'A simple DNS lookup tool, translating a domain name into its IP address (or the reverse) with brief, easy-to-read output, the quick everyday alternative to dig for when only the answer is needed, not the full detail of the DNS protocol exchange.',
      pt: 'Uma ferramenta simples de consulta DNS, traduzindo um nome de domínio para seu endereço IP (ou o inverso) com uma saída breve e fácil de ler, a alternativa rápida do dia a dia ao dig para quando só a resposta importa, não o detalhe completo da troca do protocolo DNS.',
    },
    subcommands: {},
    flags: {
      '-t': {
        en: 'Queries a specific DNS record type, such as MX or TXT, instead of the default A record.',
        pt: 'Consulta um tipo de registro DNS específico, como MX ou TXT, em vez do registro A padrão.',
      },
    },
    valueFlags: {
      '-t': 'generic',
    },
    argHint: {
      en: 'The domain name (or IP address, for a reverse lookup) to query.',
      pt: 'O domínio (ou endereço IP, para busca reversa) a consultar.',
    },
  },

  traceroute: {
    desc: {
      en: "Maps the network path a packet takes to reach a destination, hop by hop, showing every router along the way and how long each one took to respond. It works by sending packets with a deliberately short time-to-live that expires one hop further each round, tricking each router in turn into sending back an error that reveals its address, which is why the output builds up one line per hop instead of arriving all at once like ping's does.",
      pt: 'Mapeia o caminho de rede que um pacote percorre até um destino, salto a salto, mostrando cada roteador pelo caminho e quanto tempo cada um levou para responder. Funciona enviando pacotes com um tempo de vida deliberadamente curto que expira um salto mais adiante a cada rodada, fazendo cada roteador por sua vez enviar de volta um erro que revela seu endereço, motivo pelo qual a saída se constrói uma linha por salto em vez de chegar tudo de uma vez como a do ping.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Shows numeric IP addresses instead of resolving hostnames, making the output print faster.',
        pt: 'Mostra endereços IP numéricos em vez de resolver nomes de host, deixando a saída mais rápida.',
      },
      '-m': {
        en: 'Sets the maximum number of hops to probe before giving up.',
        pt: 'Define o número máximo de saltos a sondar antes de desistir.',
      },
    },
    valueFlags: {
      '-m': 'generic',
    },
    argHint: {
      en: 'The host or IP address to trace the route to.',
      pt: 'O host ou endereço IP para o qual traçar a rota.',
    },
  },

  tcpdump: {
    desc: {
      en: "Captures and displays network packets passing through an interface in real time, showing the raw traffic itself rather than a higher-level summary the way ss or netstat do. It is the tool reached for when the question is genuinely 'what is actually going over the wire', debugging a protocol handshake, confirming a request even left the machine, or watching for unexpected traffic, and its filter expression syntax (like 'tcpdump port 443') lets it narrow a busy interface down to just the packets that matter.",
      pt: 'Captura e exibe pacotes de rede passando por uma interface em tempo real, mostrando o tráfego bruto em si, não um resumo de alto nível como o ss ou o netstat fazem. É a ferramenta usada quando a pergunta é genuinamente "o que está realmente passando pelo cabo", depurando um handshake de protocolo, confirmando que uma requisição de fato saiu da máquina, ou observando tráfego inesperado, e sua sintaxe de expressão de filtro (como "tcpdump port 443") permite reduzir uma interface ocupada só aos pacotes que importam.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Specifies which network interface to capture on.',
        pt: 'Especifica em qual interface de rede capturar.',
      },
      '-n': {
        en: 'Shows numeric addresses and ports instead of resolving names, and prints faster as a result.',
        pt: 'Mostra endereços e portas numéricos em vez de resolver nomes, e imprime mais rápido como resultado.',
      },
      '-w': {
        en: 'Writes the captured packets to a file instead of printing them, for later analysis with tools like Wireshark.',
        pt: 'Escreve os pacotes capturados em um arquivo em vez de imprimi-los, para análise posterior com ferramentas como o Wireshark.',
      },
    },
    valueFlags: {
      '-i': 'generic',
      '-w': 'generic',
    },
  },

  arp: {
    desc: {
      en: 'Shows or edits the ARP table, the local cache mapping neighboring IP addresses on the same network segment to their physical (MAC) hardware addresses. Every device needs this mapping to actually deliver a packet at the link layer, and a wrong or poisoned ARP entry is a classic way local network traffic gets silently redirected, which is exactly why arp -a (listing the current table) is a genuinely useful step in diagnosing strange local-network connectivity problems.',
      pt: 'Mostra ou edita a tabela ARP, o cache local que mapeia endereços IP vizinhos no mesmo segmento de rede para seus endereços físicos (MAC) de hardware. Todo dispositivo precisa desse mapeamento para de fato entregar um pacote na camada de enlace, e uma entrada ARP errada ou envenenada é uma forma clássica de tráfego de rede local ser redirecionado silenciosamente, motivo exato pelo qual arp -a (listando a tabela atual) é um passo genuinamente útil ao diagnosticar problemas estranhos de conectividade na rede local.',
    },
    subcommands: {},
    flags: {
      '-a': {
        en: 'Lists the current ARP table entries.',
        pt: 'Lista as entradas atuais da tabela ARP.',
      },
      '-d': {
        en: 'Deletes an entry from the ARP table.',
        pt: 'Apaga uma entrada da tabela ARP.',
      },
    },
  },

  route: {
    desc: {
      en: "Shows or edits the kernel's IP routing table, deciding which network interface and gateway a packet goes through to reach a given destination. It has been deprecated for years in favor of 'ip route', part of the same iproute2 suite that replaced ifconfig, but the name and its short output format are still recognized on sight by anyone who learned networking before that transition.",
      pt: 'Mostra ou edita a tabela de roteamento IP do kernel, decidindo por qual interface de rede e gateway um pacote passa para chegar a um destino dado. Está obsoleto há anos em favor do "ip route", parte do mesmo conjunto iproute2 que substituiu o ifconfig, mas o nome e seu formato de saída curto ainda são reconhecidos de cara por quem aprendeu redes antes dessa transição.',
    },
    subcommands: {},
    flags: {
      '-n': {
        en: 'Shows numeric addresses instead of resolving hostnames.',
        pt: 'Mostra endereços numéricos em vez de resolver nomes de host.',
      },
    },
  },

  'ssh-copy-id': {
    desc: {
      en: "Copies a local public SSH key to a remote server's authorized_keys file, the one-command way to set up password-less login instead of manually catting the key and appending it over an existing SSH session. It handles creating the remote .ssh directory with the right permissions too, a detail that trips people up when doing it by hand, since SSH silently refuses to trust a key file if its permissions are too open.",
      pt: 'Copia uma chave SSH pública local para o arquivo authorized_keys de um servidor remoto, a forma de um comando só de configurar login sem senha, em vez de fazer cat manualmente na chave e anexá-la via uma sessão SSH já existente. Também cuida de criar o diretório .ssh remoto com as permissões certas, um detalhe que costuma pegar quem faz isso à mão, já que o SSH se recusa silenciosamente a confiar em um arquivo de chave se as permissões dele estiverem abertas demais.',
    },
    subcommands: {},
    flags: {
      '-i': {
        en: 'Specifies which public key file to copy, instead of the default.',
        pt: 'Especifica qual arquivo de chave pública copiar, em vez do padrão.',
      },
    },
    valueFlags: {
      '-i': 'generic',
    },
    argHint: {
      en: 'The remote host to copy the key to, as user@host.',
      pt: 'O host remoto para o qual copiar a chave, como usuario@host.',
    },
  },

  'ssh-agent': {
    desc: {
      en: 'Runs a background process that holds decrypted SSH private keys in memory for the duration of a session, so a passphrase-protected key only needs to be unlocked once (with ssh-add) instead of on every single SSH connection. It is what makes a passphrase-protected key practical to use day to day instead of a genuine inconvenience typed dozens of times a day.',
      pt: 'Roda um processo em segundo plano que guarda chaves SSH privadas descriptografadas em memória pela duração de uma sessão, para que uma chave protegida por frase-senha só precise ser desbloqueada uma vez (com ssh-add) em vez de em toda conexão SSH individual. É o que torna uma chave protegida por frase-senha prática de usar no dia a dia, em vez de um incômodo genuíno digitado dezenas de vezes por dia.',
    },
    subcommands: {},
    flags: {},
  },
};
