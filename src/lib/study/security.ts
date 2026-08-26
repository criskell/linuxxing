import type { StudyCard, StudyTopic } from './types';

export const securityTopic: StudyTopic = {
  id: 'security',
  objectiveCode: '110',
  title: { en: 'Security', pt: 'Segurança' },
};

export const securityCards: StudyCard[] = [
  {
    id: 'sudo-vs-root',
    topic: 'security',
    front: { en: 'What is the difference between sudo and being root?', pt: 'Qual a diferença entre sudo e ser root?' },
    back: {
      en: 'Root is a single, all-powerful account with unrestricted access to the whole system, sudo instead lets an approved regular user run individual commands with root privileges, one command at a time, after re-authenticating with their own password. This keeps a clear, per-command audit trail of who did what as an administrator, instead of everyone sharing one anonymous root login.',
      pt: 'Root é uma única conta com poder irrestrito sobre o sistema inteiro, o sudo, em vez disso, permite que um usuário comum aprovado rode comandos individuais com privilégios de root, um comando de cada vez, depois de se reautenticar com sua própria senha. Isso mantém um rastro de auditoria claro, por comando, de quem fez o quê como administrador, em vez de todo mundo compartilhar um login root anônimo.',
    },
    details: {
      en: 'sudo raises privilege for one command and writes who ran what into the authentication log, which is the audit trail a shared root password destroys. The rules live in /etc/sudoers and in /etc/sudoers.d, and they are edited with visudo because it refuses to save a file with a syntax error that would lock everyone out. A rule can name exactly which commands an account may run, so an operator restarts a service without gaining a root shell.',
      pt: 'O sudo eleva privilégio para um comando e escreve quem rodou o quê no log de autenticação, que é a trilha de auditoria que uma senha de root compartilhada destrói. As regras moram em /etc/sudoers e em /etc/sudoers.d, e são editadas com o visudo porque ele se recusa a salvar um arquivo com erro de sintaxe que trancaria todo mundo do lado de fora. Uma regra pode nomear exatamente quais comandos uma conta pode rodar, então um operador reinicia um serviço sem ganhar um shell de root.',
    },
    keyPoints: [
      {
        en: 'Always edit the rules with visudo, because a syntax error in sudoers can leave nobody able to escalate.',
        pt: 'Sempre edite as regras com o visudo, porque um erro de sintaxe no sudoers pode deixar ninguém capaz de escalar.',
      },
      {
        en: 'sudo -i opens a full root shell while sudo command runs one thing, and the log records both.',
        pt: 'O sudo -i abre um shell de root completo enquanto o sudo comando roda uma coisa só, e o log registra os dois.',
      },
      {
        en: 'Granting an editor or a shell through sudo grants everything, because both can spawn arbitrary commands.',
        pt: 'Liberar um editor ou um shell pelo sudo libera tudo, porque os dois conseguem executar comandos arbitrários.',
      },
    ],
    commands: ['sudo', 'su', 'visudo', 'id', 'passwd'],
  },
  {
    id: 'ssh-keys',
    topic: 'security',
    front: { en: 'What are SSH keys?', pt: 'O que são chaves SSH?' },
    back: {
      en: 'SSH keys are a public/private key pair used to authenticate to a remote server without typing a password: the public key is placed on the server (in ~/.ssh/authorized_keys), and only whoever holds the matching private key can prove their identity and log in. This is both more convenient than passwords and far more resistant to brute-force guessing, since the private key never travels over the network.',
      pt: 'Chaves SSH são um par de chave pública/privada usado para autenticar em um servidor remoto sem digitar senha: a chave pública fica no servidor (em ~/.ssh/authorized_keys), e só quem tem a chave privada correspondente consegue provar sua identidade e logar. Isso é ao mesmo tempo mais conveniente que senhas e muito mais resistente a tentativas de força bruta, já que a chave privada nunca trafega pela rede.',
    },
    details: {
      en: 'The pair splits trust: the private key never leaves your machine and the public half goes into ~/.ssh/authorized_keys on the server. The server refuses the whole directory when permissions are loose, so ~/.ssh has to be 700 and the files 600. A passphrase encrypts the private key on disk, and ssh-agent holds the decrypted key in memory so you type the passphrase once per session instead of once per connection.',
      pt: 'O par divide a confiança: a chave privada nunca sai da sua máquina e a metade pública vai para o ~/.ssh/authorized_keys no servidor. O servidor recusa o diretório inteiro quando as permissões estão frouxas, então o ~/.ssh precisa ser 700 e os arquivos 600. Uma frase secreta cifra a chave privada em disco, e o ssh-agent guarda a chave decifrada em memória para você digitar a frase uma vez por sessão em vez de uma vez por conexão.',
    },
    keyPoints: [
      {
        en: 'Copy only the public half, and ssh-copy-id does it while fixing the permissions on the far side.',
        pt: 'Copie só a metade pública, e o ssh-copy-id faz isso já ajustando as permissões do outro lado.',
      },
      {
        en: 'Turning off password authentication in sshd_config is what actually stops brute force attempts.',
        pt: 'Desligar a autenticação por senha no sshd_config é o que de fato para as tentativas de força bruta.',
      },
      {
        en: 'Loose permissions on ~/.ssh make the server ignore the key silently and fall back to asking for a password.',
        pt: 'Permissões frouxas no ~/.ssh fazem o servidor ignorar a chave em silêncio e voltar a pedir senha.',
      },
    ],
    commands: ['ssh', 'ssh-keygen', 'ssh-copy-id', 'ssh-agent', 'chmod'],
  },
  {
    id: 'what-is-gpg',
    topic: 'security',
    front: { en: 'What is GPG used for?', pt: 'Para que serve o GPG?' },
    back: {
      en: 'GPG (GNU Privacy Guard) implements public-key cryptography for encrypting files and messages so only the intended recipient can read them, and for signing them, proving they really came from the claimed sender and were not tampered with. It is what verifies a downloaded package or Git commit is genuinely from who it says, and lets two people exchange encrypted files without ever sharing a secret password.',
      pt: 'O GPG (GNU Privacy Guard) implementa criptografia de chave pública para criptografar arquivos e mensagens de forma que só o destinatário pretendido consiga lê-los, e para assiná-los, provando que realmente vieram de quem afirma e não foram adulterados. É o que verifica se um pacote baixado ou um commit do Git é genuinamente de quem diz ser, e permite que duas pessoas troquem arquivos criptografados sem nunca compartilhar uma senha secreta.',
    },
    details: {
      en: 'The same key pair does two different jobs. Encrypting with someone else public key means only their private key opens the message, while signing with your private key lets anyone verify with your public key that the content is unchanged and came from you. Package managers rely on that second use: a repository signature is what proves the packages were not tampered with between the mirror and your disk.',
      pt: 'O mesmo par de chaves faz dois trabalhos diferentes. Cifrar com a chave pública de alguém significa que só a chave privada dessa pessoa abre a mensagem, enquanto assinar com a sua chave privada deixa qualquer um verificar com a sua chave pública que o conteúdo não mudou e veio de você. Os gerenciadores de pacotes dependem desse segundo uso: a assinatura de um repositório é o que prova que os pacotes não foram adulterados entre o espelho e o seu disco.',
    },
    keyPoints: [
      {
        en: 'Encryption uses the public key of the recipient, and signing uses the private key of the sender.',
        pt: 'A cifra usa a chave pública do destinatário, e a assinatura usa a chave privada do remetente.',
      },
      {
        en: 'A fingerprint is the short form used to confirm a key over another channel before trusting it.',
        pt: 'A impressão digital é a forma curta usada para confirmar uma chave por outro canal antes de confiar nela.',
      },
      {
        en: 'Losing the private key means losing access, which is why a revocation certificate is generated in advance.',
        pt: 'Perder a chave privada significa perder o acesso, e é por isso que um certificado de revogação é gerado com antecedência.',
      },
    ],
    commands: ['gpg', 'sha256sum', 'md5sum', 'apt'],
  },
  {
    id: 'what-is-a-firewall',
    topic: 'security',
    front: { en: 'What is a firewall?', pt: 'O que é um firewall?' },
    back: {
      en: "A firewall filters network traffic in or out of a machine based on rules, like source address, destination port, or protocol, blocking everything not explicitly allowed. On Linux this is enforced by the kernel's netfilter framework, most commonly configured through the ufw or firewalld front ends, or directly with iptables/nftables.",
      pt: 'Um firewall filtra tráfego de rede que entra ou sai de uma máquina com base em regras, como endereço de origem, porta de destino, ou protocolo, bloqueando tudo que não for explicitamente permitido. No Linux isso é aplicado pelo framework netfilter do kernel, mais comumente configurado através das interfaces ufw ou firewalld, ou diretamente com iptables/nftables.',
    },
    details: {
      en: 'A firewall filters packets against an ordered list of rules, and the first rule that matches decides, which is why rule order changes the outcome. The kernel does the filtering with netfilter, and iptables, nftables, ufw and firewalld are different ways of writing the same rules. A default policy of drop means anything not explicitly allowed disappears silently, which produces a timeout on the client rather than a refusal.',
      pt: 'Um firewall filtra pacotes contra uma lista ordenada de regras, e a primeira regra que casar decide, e é por isso que a ordem muda o resultado. O kernel faz a filtragem com o netfilter, e iptables, nftables, ufw e firewalld são formas diferentes de escrever as mesmas regras. Uma política padrão de descarte faz tudo que não foi permitido sumir em silêncio, o que produz timeout no cliente em vez de recusa.',
    },
    keyPoints: [
      {
        en: 'Rules are read in order and the first match wins, so a broad allow before a specific deny cancels it.',
        pt: 'As regras são lidas em ordem e a primeira que casa vence, então um allow amplo antes de um deny específico anula ele.',
      },
      {
        en: 'Dropping produces a timeout and rejecting produces an immediate error, which is how you tell them apart.',
        pt: 'Descartar produz timeout e rejeitar produz erro imediato, que é como se diferencia os dois.',
      },
      {
        en: 'Rules live in memory until saved, so a firewall that forgets everything after a reboot was never persisted.',
        pt: 'As regras vivem em memória até serem salvas, então um firewall que esquece tudo depois do reboot nunca foi persistido.',
      },
    ],
    commands: ['ufw', 'ss', 'netstat', 'ping'],
  },
  {
    id: 'permissions-security',
    topic: 'security',
    front: {
      en: 'Why do file permissions matter for security?',
      pt: 'Por que as permissões de arquivo importam para a segurança?',
    },
    back: {
      en: "File permissions are the first line of defense controlling who can read, write, or execute each file, so a compromised low-privilege process cannot read another user's private data or overwrite a system file it has no business touching. The principle of least privilege, giving every user and process only the access it strictly needs, is enforced in practice through exactly this permission system.",
      pt: 'As permissões de arquivo são a primeira linha de defesa controlando quem pode ler, escrever ou executar cada arquivo, para que um processo comprometido de baixo privilégio não consiga ler os dados privados de outro usuário nem sobrescrever um arquivo do sistema que não tem nada a ver com ele. O princípio do menor privilégio, dar a cada usuário e processo só o acesso que ele estritamente precisa, é aplicado na prática exatamente através desse sistema de permissões.',
    },
    details: {
      en: 'Permissions are the first line of defence because the kernel enforces them on every open, and no program can talk its way around them. The dangerous corners are the special bits: setuid makes a program run as its owner regardless of who started it, which is why a setuid shell script or a world writable setuid binary hands over the machine. A world writable directory without the sticky bit lets anyone delete files they do not own.',
      pt: 'As permissões são a primeira linha de defesa porque o kernel aplica elas em toda abertura de arquivo, e nenhum programa contorna isso na conversa. Os cantos perigosos são os bits especiais: o setuid faz um programa rodar como o dono dele independente de quem iniciou, e é por isso que um script setuid ou um binário setuid gravável por todos entrega a máquina. Um diretório gravável por todos sem o sticky bit deixa qualquer um apagar arquivos que não são dele.',
    },
    keyPoints: [
      {
        en: 'find with -perm hunts for setuid binaries and world writable files, which is a standard audit step.',
        pt: 'O find com -perm caça binários setuid e arquivos graváveis por todos, que é um passo padrão de auditoria.',
      },
      {
        en: 'The umask decides the permissions of new files, and 022 is what produces the usual 644 and 755.',
        pt: 'O umask decide as permissões dos arquivos novos, e 022 é o que produz os 644 e 755 de sempre.',
      },
      {
        en: 'Write permission on a directory allows deleting the files inside it, no matter who owns them.',
        pt: 'Permissão de escrita em um diretório permite apagar os arquivos de dentro, não importa de quem sejam.',
      },
    ],
    commands: ['chmod', 'chown', 'umask', 'find', 'ls'],
  },
];
