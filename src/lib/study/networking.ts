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
  },
  {
    id: 'ip-address',
    topic: 'networking',
    front: { en: 'What is an IP address?', pt: 'O que é um endereço IP?' },
    back: {
      en: 'An IP address is the numeric identifier that lets one machine on a network be found and sent data by another, IPv4 addresses look like 192.168.1.10 (four numbers 0 to 255), while the newer IPv6 uses a much larger address space written in hexadecimal groups, specifically to solve IPv4 running out of available addresses for the number of devices now online.',
      pt: 'Um endereço IP é o identificador numérico que permite que uma máquina em uma rede seja encontrada e receba dados de outra, endereços IPv4 se parecem com 192.168.1.10 (quatro números de 0 a 255), enquanto o IPv6, mais novo, usa um espaço de endereços muito maior escrito em grupos hexadecimais, especificamente para resolver o esgotamento de endereços IPv4 disponíveis para a quantidade de dispositivos hoje conectados.',
    },
  },
  {
    id: 'what-is-dns',
    topic: 'networking',
    front: { en: 'What is DNS?', pt: 'O que é o DNS?' },
    back: {
      en: 'DNS (Domain Name System) translates human-readable hostnames like example.com into the numeric IP addresses machines actually use to connect to each other, working as a distributed, hierarchical lookup system so no single server needs to know every hostname in existence. Without it, using the internet would mean memorizing IP addresses instead of names.',
      pt: 'O DNS (Domain Name System) traduz nomes de host legíveis por humanos como example.com para os endereços IP numéricos que as máquinas realmente usam para se conectar entre si, funcionando como um sistema de busca distribuído e hierárquico para que nenhum servidor único precise conhecer todo hostname existente. Sem ele, usar a internet significaria memorizar endereços IP em vez de nomes.',
    },
  },
  {
    id: 'network-ports',
    topic: 'networking',
    front: { en: 'What is a network port?', pt: 'O que é uma porta de rede?' },
    back: {
      en: "A port is a number (0 to 65535) that lets multiple network services run on the same machine's single IP address at once, each listening on its own port, port 80 for plain HTTP and 443 for HTTPS are two of the most recognizable examples. A connection is really identified by the combination of IP address and port together, not the address alone.",
      pt: 'Uma porta é um número (0 a 65535) que permite que múltiplos serviços de rede rodem no único endereço IP de uma mesma máquina ao mesmo tempo, cada um escutando na sua própria porta, a porta 80 para HTTP simples e a 443 para HTTPS são dois dos exemplos mais reconhecíveis. Uma conexão é na verdade identificada pela combinação de endereço IP e porta juntos, não pelo endereço sozinho.',
    },
  },
  {
    id: 'default-gateway',
    topic: 'networking',
    front: { en: 'What is a default gateway?', pt: 'O que é um gateway padrão?' },
    back: {
      en: "A default gateway is the router a machine sends traffic to whenever the destination isn't on its own local network, effectively the door out to everywhere else, typically the local router in a home or office network. If a machine's default gateway is misconfigured or unreachable, it can usually still talk to other devices on the same local network, but nothing beyond it.",
      pt: 'Um gateway padrão é o roteador para o qual uma máquina envia tráfego sempre que o destino não está na sua própria rede local, efetivamente a porta de saída para todo o resto, tipicamente o roteador local em uma rede doméstica ou de escritório. Se o gateway padrão de uma máquina estiver mal configurado ou inacessível, ela geralmente ainda consegue falar com outros dispositivos na mesma rede local, mas nada além disso.',
    },
  },
];
