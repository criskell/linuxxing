import type { StudyCard, StudyTopic } from './types';

export const networkingTopic: StudyTopic = {
  id: 'networking',
  objectiveCode: '109',
  title: { en: 'Networking Fundamentals', pt: 'Fundamentos de Redes' },
};

export const networkingCards: StudyCard[] = [
  {
    id: 'tcp-ip',
    topic: 'networking',
    front: { en: 'What is TCP/IP?', pt: 'O que é TCP/IP?' },
    back: {
      en: 'TCP/IP is the pair of protocols underlying essentially all modern networking, IP (Internet Protocol) handles addressing and routing packets between machines, while TCP (Transmission Control Protocol) sits on top of it, guaranteeing that data arrives complete, in order, and without duplication, by acknowledging receipt and retransmitting anything lost. Together they are the foundation the web, email, and nearly every other network service is built on.',
      pt: 'TCP/IP é o par de protocolos por trás de essencialmente toda a rede moderna, o IP (Internet Protocol) cuida do endereçamento e do roteamento de pacotes entre máquinas, enquanto o TCP (Transmission Control Protocol) fica em cima dele, garantindo que os dados cheguem completos, em ordem, e sem duplicação, confirmando o recebimento e retransmitindo o que se perder. Juntos, eles são a base sobre a qual a web, o e-mail, e quase todo outro serviço de rede é construído.',
    },
    details: {
      en: 'The stack splits the work into layers so each one can ignore the others. IP moves packets between addresses and may lose or reorder them, TCP adds numbering, acknowledgement and retransmission on top so a stream arrives complete and in order, and UDP skips all of that when speed matters more than certainty. A TCP connection opens with a three step handshake, which is why a blocked port produces a hang or a refusal rather than silence at the application.',
      pt: 'A pilha divide o trabalho em camadas para cada uma poder ignorar as outras. O IP move pacotes entre endereços e pode perder ou trocar a ordem deles, o TCP acrescenta numeração, confirmação e retransmissão em cima para o fluxo chegar completo e em ordem, e o UDP pula tudo isso quando a velocidade importa mais que a certeza. Uma conexão TCP abre com um aperto de mão de três passos, e é por isso que uma porta bloqueada produz travamento ou recusa em vez de silêncio na aplicação.',
    },
    keyPoints: [
      {
        en: 'TCP guarantees order and delivery, UDP guarantees neither, which is why DNS queries and video streams prefer UDP.',
        pt: 'O TCP garante ordem e entrega, o UDP não garante nenhuma das duas, e é por isso que consultas DNS e vídeo preferem UDP.',
      },
      {
        en: 'A refused connection means something answered, while a timeout usually means a firewall dropped the packet.',
        pt: 'Conexão recusada significa que alguém respondeu, enquanto um timeout normalmente significa que um firewall descartou o pacote.',
      },
      {
        en: 'Every packet carries a time to live that each router decrements, and traceroute abuses that to map the path.',
        pt: 'Todo pacote carrega um tempo de vida que cada roteador decrementa, e o traceroute abusa disso para mapear o caminho.',
      },
    ],
    commands: ['ping', 'traceroute', 'ss', 'netstat', 'tcpdump'],
  },
  {
    id: 'ip-address',
    topic: 'networking',
    front: { en: 'What is an IP address?', pt: 'O que é um endereço IP?' },
    back: {
      en: 'An IP address is the numeric identifier that lets one machine on a network be found and sent data by another, IPv4 addresses look like 192.168.1.10 (four numbers 0 to 255), while the newer IPv6 uses a much larger address space written in hexadecimal groups, specifically to solve IPv4 running out of available addresses for the number of devices now online.',
      pt: 'Um endereço IP é o identificador numérico que permite que uma máquina em uma rede seja encontrada e receba dados de outra, endereços IPv4 se parecem com 192.168.1.10 (quatro números de 0 a 255), enquanto o IPv6, mais novo, usa um espaço de endereços muito maior escrito em grupos hexadecimais, especificamente para resolver o esgotamento de endereços IPv4 disponíveis para a quantidade de dispositivos hoje conectados.',
    },
    details: {
      en: 'An address is meaningless without its prefix, because the prefix decides which part identifies the network and which part identifies the host. With 192.168.1.10/24 the first 24 bits are the network, so 192.168.1.255 is the broadcast and the usable hosts run from 1 to 254. Private ranges such as 10.0.0.0/8 and 192.168.0.0/16 never appear on the public internet, which is why a router has to translate them on the way out.',
      pt: 'Um endereço não significa nada sem o prefixo, porque o prefixo decide qual parte identifica a rede e qual identifica o host. Com 192.168.1.10/24 os primeiros 24 bits são a rede, então 192.168.1.255 é o broadcast e os hosts úteis vão de 1 a 254. Faixas privadas como 10.0.0.0/8 e 192.168.0.0/16 nunca aparecem na internet pública, e é por isso que um roteador precisa traduzir elas na saída.',
    },
    keyPoints: [
      {
        en: 'Two machines on the same network need the same prefix, otherwise each one thinks the other is remote.',
        pt: 'Duas máquinas na mesma rede precisam do mesmo prefixo, senão cada uma acha que a outra é remota.',
      },
      {
        en: 'The loopback address 127.0.0.1 never leaves the machine, and its interface must be up for local services to answer.',
        pt: 'O endereço de loopback 127.0.0.1 nunca sai da máquina, e a interface dele precisa estar no ar para os serviços locais responderem.',
      },
      {
        en: 'An interface can hold several addresses at once, which is how one machine answers on two networks.',
        pt: 'Uma interface segura vários endereços ao mesmo tempo, e é assim que uma máquina responde em duas redes.',
      },
    ],
    commands: ['ip', 'ping', 'route', 'hostname'],
  },
  {
    id: 'what-is-dns',
    topic: 'networking',
    front: { en: 'What is DNS?', pt: 'O que é o DNS?' },
    back: {
      en: 'DNS (Domain Name System) translates human-readable hostnames like example.com into the numeric IP addresses machines actually use to connect to each other, working as a distributed, hierarchical lookup system so no single server needs to know every hostname in existence. Without it, using the internet would mean memorizing IP addresses instead of names.',
      pt: 'O DNS (Domain Name System) traduz nomes de host legíveis por humanos como example.com para os endereços IP numéricos que as máquinas realmente usam para se conectar entre si, funcionando como um sistema de busca distribuído e hierárquico para que nenhum servidor único precise conhecer todo hostname existente. Sem ele, usar a internet significaria memorizar endereços IP em vez de nomes.',
    },
    details: {
      en: 'Resolution starts locally: the resolver reads /etc/hosts first, and only then asks the servers listed in /etc/resolv.conf, walking from the root down to the authoritative server for the name. Every answer carries a time to live that decides how long it may be cached, which explains why a changed record still resolves to the old address for a while. Records have types, A for an address, MX for mail, CNAME for an alias, and PTR for the reverse lookup.',
      pt: 'A resolução começa localmente: o resolvedor lê o /etc/hosts primeiro, e só então pergunta aos servidores listados em /etc/resolv.conf, descendo da raiz até o servidor autoritativo do nome. Toda resposta carrega um tempo de vida que decide por quanto tempo pode ficar em cache, o que explica por que um registro alterado ainda resolve para o endereço antigo por um tempo. Registros têm tipos, A para endereço, MX para correio, CNAME para apelido e PTR para a busca reversa.',
    },
    keyPoints: [
      {
        en: 'An entry in /etc/hosts wins over DNS, which makes it the fastest way to test a name locally.',
        pt: 'Uma entrada no /etc/hosts vence o DNS, o que faz dela a forma mais rápida de testar um nome localmente.',
      },
      {
        en: 'dig shows the full answer with the record type and the remaining time to live, while host prints a short line.',
        pt: 'O dig mostra a resposta completa com o tipo do registro e o tempo de vida restante, enquanto o host imprime uma linha curta.',
      },
      {
        en: 'A name that resolves but does not answer points at the service, not at DNS, so ping and ss separate the two.',
        pt: 'Um nome que resolve mas não responde aponta para o serviço e não para o DNS, então ping e ss separam os dois.',
      },
    ],
    commands: ['dig', 'host', 'ping', 'hostname'],
  },
  {
    id: 'network-ports',
    topic: 'networking',
    front: { en: 'What is a network port?', pt: 'O que é uma porta de rede?' },
    back: {
      en: "A port is a number (0 to 65535) that lets multiple network services run on the same machine's single IP address at once, each listening on its own port, port 80 for plain HTTP and 443 for HTTPS are two of the most recognizable examples. A connection is really identified by the combination of IP address and port together, not the address alone.",
      pt: 'Uma porta é um número (0 a 65535) que permite que múltiplos serviços de rede rodem no único endereço IP de uma mesma máquina ao mesmo tempo, cada um escutando na sua própria porta, a porta 80 para HTTP simples e a 443 para HTTPS são dois dos exemplos mais reconhecíveis. Uma conexão é na verdade identificada pela combinação de endereço IP e porta juntos, não pelo endereço sozinho.',
    },
    details: {
      en: 'A port turns one address into many endpoints, so a single machine can run a web server and a mail server at the same time. Numbers below 1024 are privileged and only root can bind them, /etc/services maps the well known ones to names, and a listening socket occupies a port until the process holding it exits. When a service refuses to start with an address already in use, another process is holding that port.',
      pt: 'Uma porta transforma um endereço em vários pontos de conexão, então uma única máquina roda um servidor web e um de correio ao mesmo tempo. Números abaixo de 1024 são privilegiados e só o root consegue ligar neles, o /etc/services associa os conhecidos a nomes, e um socket em escuta ocupa a porta até o processo que segura ela sair. Quando um serviço se recusa a subir dizendo que o endereço já está em uso, outro processo está segurando aquela porta.',
    },
    keyPoints: [
      {
        en: 'ss -ltnp lists the listening TCP sockets together with the process that owns each one.',
        pt: 'O ss -ltnp lista os sockets TCP em escuta junto com o processo dono de cada um.',
      },
      {
        en: 'Binding to 127.0.0.1 exposes a service to the machine alone, while 0.0.0.0 exposes it to every interface.',
        pt: 'Ligar em 127.0.0.1 expõe um serviço só para a máquina, enquanto 0.0.0.0 expõe para toda interface.',
      },
      {
        en: 'A port that answers from the machine but not from outside is almost always a firewall rule.',
        pt: 'Uma porta que responde da própria máquina mas não de fora é quase sempre uma regra de firewall.',
      },
    ],
    commands: ['ss', 'netstat', 'lsof', 'nc'],
  },
  {
    id: 'default-gateway',
    topic: 'networking',
    front: { en: 'What is a default gateway?', pt: 'O que é um gateway padrão?' },
    back: {
      en: "A default gateway is the router a machine sends traffic to whenever the destination isn't on its own local network, effectively the door out to everywhere else, typically the local router in a home or office network. If a machine's default gateway is misconfigured or unreachable, it can usually still talk to other devices on the same local network, but nothing beyond it.",
      pt: 'Um gateway padrão é o roteador para o qual uma máquina envia tráfego sempre que o destino não está na sua própria rede local, efetivamente a porta de saída para todo o resto, tipicamente o roteador local em uma rede doméstica ou de escritório. Se o gateway padrão de uma máquina estiver mal configurado ou inacessível, ela geralmente ainda consegue falar com outros dispositivos na mesma rede local, mas nada além disso.',
    },
    details: {
      en: 'The routing table is consulted for every packet, and the most specific matching route wins. A packet for the local network goes straight out the interface, and everything else falls to the default route, written as 0.0.0.0/0, which points at the gateway. A machine with an address but no default route reaches its neighbours and nothing beyond them, which looks exactly like a broken internet connection.',
      pt: 'A tabela de rotas é consultada para todo pacote, e a rota mais específica que casar vence. Um pacote para a rede local sai direto pela interface, e todo o resto cai na rota padrão, escrita como 0.0.0.0/0, que aponta para o gateway. Uma máquina com endereço mas sem rota padrão alcança os vizinhos e nada além deles, o que parece exatamente uma internet quebrada.',
    },
    keyPoints: [
      {
        en: 'ip route shows the table, and the line starting with default is the gateway of last resort.',
        pt: 'O ip route mostra a tabela, e a linha que começa com default é o gateway de último recurso.',
      },
      {
        en: 'The gateway has to sit on the same network as the interface, otherwise the kernel refuses the route.',
        pt: 'O gateway precisa estar na mesma rede da interface, senão o kernel recusa a rota.',
      },
      {
        en: 'Pinging the gateway separates a local wiring problem from a problem beyond it.',
        pt: 'Pingar o gateway separa um problema de cabeamento local de um problema além dele.',
      },
    ],
    commands: ['ip', 'route', 'ping', 'traceroute'],
  },
];
