import type { LabExercise, LabTrack } from './types';

export const networkingTrack: LabTrack = {
  id: 'networking',
  objectiveCode: '109.1, 109.2',
  title: { en: 'Interfaces and addresses', pt: 'Interfaces e endereços' },
};

export const networkingExercises: LabExercise[] = [
  {
    id: 'bring-the-loopback-up',
    track: 'networking',
    title: { en: 'Bring the loopback up', pt: 'Levante a interface de loopback' },
    task: {
      en: 'The loopback interface is down, so even the machine cannot talk to itself. Bring lo up and confirm it answers, which you can see by pinging 127.0.0.1 once.',
      pt: 'A interface de loopback está desligada, então nem a própria máquina fala consigo mesma. Levante a lo e confirme que ela responde, o que dá para ver mandando um ping para 127.0.0.1 uma vez.',
    },
    hint: {
      en: 'ip link set names an interface and changes its state, taking up or down at the end. While the interface is down the first line of ip link show lo carries no UP flag and the address is unreachable.',
      pt: 'O ip link set nomeia uma interface e muda o estado dela, recebendo up ou down no final. Enquanto a interface está desligada, a primeira linha do ip link show lo não traz a flag UP e o endereço fica inalcançável.',
    },
    setupCommand: 'ip link set lo down; true',
    checks: [
      {
        label: { en: 'the lo interface carries the UP flag', pt: 'a interface lo carrega a flag UP' },
        command: 'ip link show lo | head -1 | grep -q "UP"',
      },
      {
        label: { en: '127.0.0.1 answers a ping', pt: '127.0.0.1 responde a um ping' },
        command: 'ping -c 1 -W 2 127.0.0.1 >/dev/null 2>&1',
      },
    ],
    solutionCommand: 'ip link set lo up',
  },
  {
    id: 'add-a-second-address',
    track: 'networking',
    title: { en: 'Add a second address to an interface', pt: 'Dê um segundo endereço à interface' },
    task: {
      en: 'Give the loopback the extra address 10.9.9.9 with a 24 bit mask, keeping 127.0.0.1 working, and confirm the new address answers a ping.',
      pt: 'Dê à loopback o endereço extra 10.9.9.9 com máscara de 24 bits, mantendo o 127.0.0.1 funcionando, e confirme que o endereço novo responde a um ping.',
    },
    hint: {
      en: 'ip addr add takes the address with the prefix length after a slash, then dev and the interface name. An interface holds several addresses at once, so the old one stays where it was.',
      pt: 'O ip addr add recebe o endereço com o tamanho do prefixo depois de uma barra, e então dev e o nome da interface. Uma interface segura vários endereços ao mesmo tempo, então o antigo continua onde estava.',
    },
    setupCommand: 'ip link set lo up; ip addr del 10.9.9.9/24 dev lo 2>/dev/null; true',
    checks: [
      {
        label: { en: 'lo carries 10.9.9.9 with a 24 bit mask', pt: 'a lo carrega 10.9.9.9 com máscara de 24 bits' },
        command: 'ip addr show lo | grep -q "inet 10.9.9.9/24"',
      },
      {
        label: { en: '127.0.0.1 still answers', pt: 'o 127.0.0.1 continua respondendo' },
        command: 'ping -c 1 -W 2 127.0.0.1 >/dev/null 2>&1',
      },
      {
        label: { en: 'the new address answers a ping', pt: 'o endereço novo responde a um ping' },
        command: 'ping -c 1 -W 2 10.9.9.9 >/dev/null 2>&1',
      },
    ],
    solutionCommand: 'ip addr add 10.9.9.9/24 dev lo',
  },
  {
    id: 'name-the-machine',
    track: 'networking',
    title: { en: 'Name the machine', pt: 'Dê um nome à máquina' },
    task: {
      en: 'The machine answers to buildroot right now. Rename it to labbox while it is running, so both the hostname command and the kernel file that keeps the name report the new one.',
      pt: 'A máquina atende por buildroot agora. Renomeie para labbox com ela ligada, de modo que tanto o comando hostname quanto o arquivo do kernel que guarda o nome informem o novo.',
    },
    hint: {
      en: 'hostname followed by a name sets it for the running system, and with no argument it prints what is set. The kernel keeps the same string in /proc/sys/kernel/hostname, which is why both places change together.',
      pt: 'O hostname seguido de um nome define ele para o sistema em execução, e sem argumento imprime o que está valendo. O kernel guarda a mesma string em /proc/sys/kernel/hostname, e é por isso que os dois lugares mudam juntos.',
    },
    setupCommand: 'hostname buildroot; true',
    checks: [
      {
        label: { en: 'hostname prints labbox', pt: 'o hostname imprime labbox' },
        command: '[ "$(hostname)" = "labbox" ]',
      },
      {
        label: { en: 'the kernel file agrees', pt: 'o arquivo do kernel concorda' },
        command: '[ "$(cat /proc/sys/kernel/hostname)" = "labbox" ]',
      },
    ],
    solutionCommand: 'hostname labbox',
  },
  {
    id: 'resolve-a-name-locally',
    track: 'networking',
    title: { en: 'Resolve a name without a DNS server', pt: 'Resolva um nome sem servidor DNS' },
    task: {
      en: 'There is no DNS server on this machine, and still the name lab.local has to resolve to 127.0.0.1. Make it work through the local file the resolver reads first, then confirm that pinging lab.local reaches the loopback.',
      pt: 'Não existe servidor DNS nesta máquina, e mesmo assim o nome lab.local precisa resolver para 127.0.0.1. Faça isso funcionar pelo arquivo local que o resolvedor lê primeiro, e depois confirme que um ping para lab.local chega na loopback.',
    },
    hint: {
      en: 'The resolver checks /etc/hosts before asking any server, and each line there pairs one address with the names that point to it. Appending with two greater than signs keeps the entries that were already in the file.',
      pt: 'O resolvedor consulta o /etc/hosts antes de perguntar a qualquer servidor, e cada linha lá associa um endereço aos nomes que apontam para ele. Acrescentar com dois sinais de maior mantém as entradas que já estavam no arquivo.',
    },
    setupCommand: 'ip link set lo up; sed -i "/lab.local/d" /etc/hosts; true',
    checks: [
      {
        label: { en: '/etc/hosts maps lab.local to 127.0.0.1', pt: 'o /etc/hosts mapeia lab.local para 127.0.0.1' },
        command: 'grep -E "^127\\.0\\.0\\.1[[:space:]]+.*lab\\.local" /etc/hosts',
      },
      {
        label: { en: 'the localhost entry survived', pt: 'a entrada de localhost sobreviveu' },
        command: 'grep -q "localhost" /etc/hosts',
      },
      {
        label: { en: 'ping reaches lab.local', pt: 'o ping chega em lab.local' },
        command: 'ping -c 1 -W 2 lab.local >/dev/null 2>&1',
      },
    ],
    solutionCommand: 'printf "127.0.0.1 lab.local\\n" >> /etc/hosts',
  },
  {
    id: 'change-the-mtu',
    track: 'networking',
    title: { en: 'Change the MTU of an interface', pt: 'Mude a MTU de uma interface' },
    task: {
      en: 'The loopback carries the default MTU. Set it to 16000 while the machine runs, leaving the interface up.',
      pt: 'A loopback está com a MTU padrão. Defina ela como 16000 com a máquina ligada, deixando a interface no ar.',
    },
    hint: {
      en: 'ip link set changes properties of an interface, and mtu takes the new size in bytes. The first line of ip link show reports the value in force.',
      pt: 'O ip link set muda propriedades de uma interface, e o mtu recebe o tamanho novo em bytes. A primeira linha do ip link show informa o valor em vigor.',
    },
    setupCommand: 'ip link set lo up; ip link set lo mtu 65536; true',
    checks: [
      {
        label: { en: 'the MTU of lo is 16000', pt: 'a MTU da lo é 16000' },
        command: 'ip link show lo | grep -q "mtu 16000"',
      },
      {
        label: { en: 'the interface is still up', pt: 'a interface continua no ar' },
        command: 'ip link show lo | head -1 | grep -q "UP"',
      },
    ],
    solutionCommand: 'ip link set lo mtu 16000',
  },
  {
    id: 'configure-an-interface-with-ifconfig',
    track: 'networking',
    title: { en: 'Configure an address with ifconfig', pt: 'Configure um endereço com ifconfig' },
    task: {
      en: 'Using the older tool instead of ip, give the alias lo:1 the address 10.7.7.7 with the mask 255.255.255.0 and bring it up.',
      pt: 'Usando a ferramenta antiga em vez do ip, dê ao alias lo:1 o endereço 10.7.7.7 com a máscara 255.255.255.0 e coloque ele no ar.',
    },
    hint: {
      en: 'ifconfig takes the interface name, then the address, then netmask with the mask, and up at the end to activate it. An alias is written as the interface name, a colon and a number.',
      pt: 'O ifconfig recebe o nome da interface, depois o endereço, depois netmask com a máscara, e up no final para ativar. Um alias é escrito como o nome da interface, dois pontos e um número.',
    },
    setupCommand: 'ip link set lo up; ifconfig lo:1 down 2>/dev/null; ip addr del 10.7.7.7/24 dev lo 2>/dev/null; true',
    checks: [
      {
        label: { en: 'the address is on the interface', pt: 'o endereço está na interface' },
        command: 'ip addr show lo | grep -q "inet 10.7.7.7"',
      },
      {
        label: { en: 'the mask is 24 bits wide', pt: 'a máscara tem 24 bits' },
        command: 'ip addr show lo | grep -q "inet 10.7.7.7/24"',
      },
      {
        label: { en: 'the address answers a ping', pt: 'o endereço responde a um ping' },
        command: 'ping -c 1 -W 2 10.7.7.7 >/dev/null 2>&1',
      },
    ],
    solutionCommand: 'ifconfig lo:1 10.7.7.7 netmask 255.255.255.0 up',
  },
  {
    id: 'write-a-resolver-configuration',
    track: 'networking',
    title: { en: 'Write a resolver configuration', pt: 'Escreva a configuração do resolvedor' },
    task: {
      en: 'The machine has no /etc/resolv.conf at all. Create it with two lines, first a nameserver pointing at 10.0.0.53 and then a search domain of lab.internal.',
      pt: 'A máquina não tem /etc/resolv.conf nenhum. Crie ele com duas linhas, primeiro um nameserver apontando para 10.0.0.53 e depois um domínio de busca lab.internal.',
    },
    hint: {
      en: 'Each line of the file starts with a keyword, nameserver for a server address and search for the domains appended to short names. A here document or two appends both lines in one go.',
      pt: 'Cada linha do arquivo começa por uma palavra chave, nameserver para o endereço de um servidor e search para os domínios acrescentados a nomes curtos. Um here document ou dois appends escrevem as duas linhas de uma vez.',
    },
    setupCommand: 'rm -f /etc/resolv.conf; true',
    checks: [
      {
        label: { en: 'the nameserver line is there', pt: 'a linha de nameserver está lá' },
        command: 'grep -qE "^nameserver[[:space:]]+10\\.0\\.0\\.53" /etc/resolv.conf',
      },
      {
        label: { en: 'the search domain is there', pt: 'o domínio de busca está lá' },
        command: 'grep -qE "^search[[:space:]]+lab\\.internal" /etc/resolv.conf',
      },
      {
        label: { en: 'the file has two lines', pt: 'o arquivo tem duas linhas' },
        command: '[ "$(wc -l < /etc/resolv.conf)" = "2" ]',
      },
    ],
    solutionCommand: 'printf "nameserver 10.0.0.53\\nsearch lab.internal\\n" > /etc/resolv.conf',
  },
  {
    id: 'add-a-static-route',
    track: 'networking',
    title: { en: 'Add a static route', pt: 'Acrescente uma rota estática' },
    task: {
      en: 'Teach the kernel to reach the network 10.8.8.0/24 through the loopback interface, so that the routing table lists a route for it.',
      pt: 'Ensine o kernel a alcançar a rede 10.8.8.0/24 pela interface de loopback, de modo que a tabela de rotas liste uma rota para ela.',
    },
    hint: {
      en: 'ip route add takes the destination network with its prefix length, then dev and the interface that carries it. The plain ip route command prints the table back for you to confirm.',
      pt: 'O ip route add recebe a rede de destino com o tamanho do prefixo, depois dev e a interface que leva até ela. O comando ip route sozinho imprime a tabela de volta para você conferir.',
    },
    setupCommand: 'ip link set lo up; ip route del 10.8.8.0/24 2>/dev/null; true',
    checks: [
      {
        label: { en: 'the route table lists 10.8.8.0/24', pt: 'a tabela de rotas lista 10.8.8.0/24' },
        command: 'ip route | grep -q "^10.8.8.0/24"',
      },
      {
        label: { en: 'it points at the loopback', pt: 'ela aponta para a loopback' },
        command: 'ip route | grep "^10.8.8.0/24" | grep -q "dev lo"',
      },
    ],
    solutionCommand: 'ip route add 10.8.8.0/24 dev lo',
  },
  {
    id: 'list-the-addresses-of-an-interface',
    track: 'networking',
    title: { en: 'List the addresses of an interface', pt: 'Liste os endereços de uma interface' },
    task: {
      en: 'The loopback already carries two addresses. Write both of them into /root/lab/addresses.txt, one per line and sorted, with no prefix length and no other word from the ip output.',
      pt: 'A loopback já carrega dois endereços. Escreva os dois em /root/lab/addresses.txt, um por linha e ordenados, sem o tamanho do prefixo e sem nenhuma outra palavra da saída do ip.',
    },
    hint: {
      en: 'ip addr show prints one inet line per address, with the address and the prefix length glued by a slash in the second field. awk pulls that field out and cut keeps what comes before the slash.',
      pt: 'O ip addr show imprime uma linha inet por endereço, com o endereço e o tamanho do prefixo colados por uma barra no segundo campo. O awk tira esse campo e o cut fica com o que vem antes da barra.',
    },
    setupCommand:
      'mkdir -p /root/lab; rm -f /root/lab/addresses.txt; ip link set lo up; ifconfig lo:1 down 2>/dev/null; ip addr del 10.7.7.7/24 dev lo 2>/dev/null; ip addr del 10.9.9.9/24 dev lo 2>/dev/null; ip addr add 10.9.9.9/24 dev lo; true',
    checks: [
      {
        label: { en: 'the file has two lines', pt: 'o arquivo tem duas linhas' },
        command: '[ "$(wc -l < /root/lab/addresses.txt)" = "2" ]',
      },
      {
        label: { en: 'both addresses are there, without the mask', pt: 'os dois endereços estão lá, sem a máscara' },
        command: 'grep -qx "10.9.9.9" /root/lab/addresses.txt && grep -qx "127.0.0.1" /root/lab/addresses.txt',
      },
      {
        label: { en: 'the list matches what the kernel holds', pt: 'a lista bate com o que o kernel tem' },
        command: "ip addr show lo | awk '/inet /{print $2}' | cut -d/ -f1 | sort | diff - /root/lab/addresses.txt",
      },
    ],
    solutionCommand: "ip addr show lo | awk '/inet /{print $2}' | cut -d/ -f1 | sort > /root/lab/addresses.txt",
  },
];
