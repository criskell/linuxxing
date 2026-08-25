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
      en: "Root is a single, all-powerful account with unrestricted access to the whole system, sudo instead lets an approved regular user run individual commands with root privileges, one command at a time, after re-authenticating with their own password. This keeps a clear, per-command audit trail of who did what as an administrator, instead of everyone sharing one anonymous root login.",
      pt: 'Root é uma única conta com poder irrestrito sobre o sistema inteiro, o sudo, em vez disso, permite que um usuário comum aprovado rode comandos individuais com privilégios de root, um comando de cada vez, depois de se reautenticar com sua própria senha. Isso mantém um rastro de auditoria claro, por comando, de quem fez o quê como administrador, em vez de todo mundo compartilhar um login root anônimo.',
    },
  },
  {
    id: 'ssh-keys',
    topic: 'security',
    front: { en: 'What are SSH keys?', pt: 'O que são chaves SSH?' },
    back: {
      en: "SSH keys are a public/private key pair used to authenticate to a remote server without typing a password: the public key is placed on the server (in ~/.ssh/authorized_keys), and only whoever holds the matching private key can prove their identity and log in. This is both more convenient than passwords and far more resistant to brute-force guessing, since the private key never travels over the network.",
      pt: 'Chaves SSH são um par de chave pública/privada usado para autenticar em um servidor remoto sem digitar senha: a chave pública fica no servidor (em ~/.ssh/authorized_keys), e só quem tem a chave privada correspondente consegue provar sua identidade e logar. Isso é ao mesmo tempo mais conveniente que senhas e muito mais resistente a tentativas de força bruta, já que a chave privada nunca trafega pela rede.',
    },
  },
  {
    id: 'what-is-gpg',
    topic: 'security',
    front: { en: 'What is GPG used for?', pt: 'Para que serve o GPG?' },
    back: {
      en: 'GPG (GNU Privacy Guard) implements public-key cryptography for encrypting files and messages so only the intended recipient can read them, and for signing them, proving they really came from the claimed sender and were not tampered with. It is what verifies a downloaded package or Git commit is genuinely from who it says, and lets two people exchange encrypted files without ever sharing a secret password.',
      pt: 'O GPG (GNU Privacy Guard) implementa criptografia de chave pública para criptografar arquivos e mensagens de forma que só o destinatário pretendido consiga lê-los, e para assiná-los, provando que realmente vieram de quem afirma e não foram adulterados. É o que verifica se um pacote baixado ou um commit do Git é genuinamente de quem diz ser, e permite que duas pessoas troquem arquivos criptografados sem nunca compartilhar uma senha secreta.',
    },
  },
  {
    id: 'what-is-a-firewall',
    topic: 'security',
    front: { en: 'What is a firewall?', pt: 'O que é um firewall?' },
    back: {
      en: 'A firewall filters network traffic in or out of a machine based on rules, like source address, destination port, or protocol, blocking everything not explicitly allowed. On Linux this is enforced by the kernel\'s netfilter framework, most commonly configured through the ufw or firewalld front ends, or directly with iptables/nftables.',
      pt: 'Um firewall filtra tráfego de rede que entra ou sai de uma máquina com base em regras, como endereço de origem, porta de destino, ou protocolo, bloqueando tudo que não for explicitamente permitido. No Linux isso é aplicado pelo framework netfilter do kernel, mais comumente configurado através das interfaces ufw ou firewalld, ou diretamente com iptables/nftables.',
    },
  },
  {
    id: 'permissions-security',
    topic: 'security',
    front: { en: 'Why do file permissions matter for security?', pt: 'Por que as permissões de arquivo importam para a segurança?' },
    back: {
      en: 'File permissions are the first line of defense controlling who can read, write, or execute each file, so a compromised low-privilege process cannot read another user\'s private data or overwrite a system file it has no business touching. The principle of least privilege, giving every user and process only the access it strictly needs, is enforced in practice through exactly this permission system.',
      pt: 'As permissões de arquivo são a primeira linha de defesa controlando quem pode ler, escrever ou executar cada arquivo, para que um processo comprometido de baixo privilégio não consiga ler os dados privados de outro usuário nem sobrescrever um arquivo do sistema que não tem nada a ver com ele. O princípio do menor privilégio, dar a cada usuário e processo só o acesso que ele estritamente precisa, é aplicado na prática exatamente através desse sistema de permissões.',
    },
  },
];
