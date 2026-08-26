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
      'mkdir -p /root/lab; rm -f /root/lab/addresses.txt; ip link set lo up; ip addr del 10.9.9.9/24 dev lo 2>/dev/null; ip addr add 10.9.9.9/24 dev lo; true',
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
