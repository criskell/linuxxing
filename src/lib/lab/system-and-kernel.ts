import type { LabExercise, LabTrack } from './types';

export const systemAndKernelTrack: LabTrack = {
  id: 'system-and-kernel',
  objectiveCode: '101.1, 101.2, 104.1',
  title: { en: 'System, kernel and mounts', pt: 'Sistema, kernel e montagens' },
};

export const systemAndKernelExercises: LabExercise[] = [
  {
    id: 'read-the-kernel-command-line',
    track: 'system-and-kernel',
    title: { en: 'Read the kernel command line', pt: 'Leia a linha de comando do kernel' },
    task: {
      en: 'The boot loader handed a few options to the kernel and they are still readable in /proc/cmdline. Write into /root/lab/console.txt only the value of the console option, so ttyS0 alone, with no option name and no other word.',
      pt: 'O carregador de boot entregou algumas opções ao kernel e elas continuam legíveis em /proc/cmdline. Escreva em /root/lab/console.txt somente o valor da opção console, ou seja ttyS0 sozinho, sem o nome da opção e sem nenhuma outra palavra.',
    },
    hint: {
      en: 'The whole command line arrives as a single line with the options separated by spaces, so tr can turn each space into a line break. From there grep picks the option and cut keeps what comes after the equals sign.',
      pt: 'A linha de comando inteira chega como uma linha só com as opções separadas por espaços, então o tr consegue transformar cada espaço em quebra de linha. Daí o grep escolhe a opção e o cut fica com o que vem depois do sinal de igual.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/console.txt',
    checks: [
      {
        label: { en: 'console.txt holds ttyS0 and nothing else', pt: 'console.txt guarda ttyS0 e mais nada' },
        command: '[ "$(cat /root/lab/console.txt)" = "ttyS0" ]',
      },
    ],
    solutionCommand: 'tr " " "\\n" < /proc/cmdline | grep "^console=" | cut -d= -f2 > /root/lab/console.txt',
  },
  {
    id: 'report-the-total-memory',
    track: 'system-and-kernel',
    title: { en: 'Report the total memory', pt: 'Informe a memória total' },
    task: {
      en: 'Write into /root/lab/memory.txt how much memory the kernel reports in kilobytes, taking the number from /proc/meminfo and leaving both the label and the unit out.',
      pt: 'Escreva em /root/lab/memory.txt quanta memória o kernel informa em kilobytes, tirando o número de /proc/meminfo e deixando de fora tanto o rótulo quanto a unidade.',
    },
    hint: {
      en: 'The line that matters starts with MemTotal and carries three fields, the label, the number and the unit. awk can match that line and print the second field on its own.',
      pt: 'A linha que interessa começa com MemTotal e carrega três campos, o rótulo, o número e a unidade. O awk consegue casar essa linha e imprimir o segundo campo sozinho.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/memory.txt',
    checks: [
      {
        label: { en: 'the file holds only digits', pt: 'o arquivo guarda só dígitos' },
        command: 'grep -qE "^[0-9]+$" /root/lab/memory.txt',
      },
      {
        label: {
          en: 'the number matches MemTotal in /proc/meminfo',
          pt: 'o número bate com o MemTotal de /proc/meminfo',
        },
        command: '[ "$(cat /root/lab/memory.txt)" = "$(awk \'/^MemTotal:/ {print $2}\' /proc/meminfo)" ]',
      },
    ],
    solutionCommand: "awk '/^MemTotal:/ {print $2}' /proc/meminfo > /root/lab/memory.txt",
  },
  {
    id: 'count-the-processors',
    track: 'system-and-kernel',
    title: { en: 'Count the processors', pt: 'Conte os processadores' },
    task: {
      en: 'Write into /root/lab/cpus.txt how many processors the kernel lists, counting the entries in /proc/cpuinfo instead of calling nproc.',
      pt: 'Escreva em /root/lab/cpus.txt quantos processadores o kernel lista, contando as entradas de /proc/cpuinfo em vez de chamar o nproc.',
    },
    hint: {
      en: 'The file repeats one block per processor and each block opens with a line starting in processor. grep -c counts the lines that match a pattern, and anchoring with ^ keeps other lines out.',
      pt: 'O arquivo repete um bloco por processador e cada bloco abre com uma linha que começa em processor. O grep -c conta as linhas que casam com um padrão, e ancorar com ^ mantém as outras linhas fora.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/cpus.txt',
    checks: [
      {
        label: { en: 'the count matches what nproc reports', pt: 'a contagem bate com o que o nproc informa' },
        command: '[ "$(cat /root/lab/cpus.txt)" = "$(nproc)" ]',
      },
    ],
    solutionCommand: 'grep -c "^processor" /proc/cpuinfo > /root/lab/cpus.txt',
  },
  {
    id: 'search-the-kernel-log',
    track: 'system-and-kernel',
    title: { en: 'Search the kernel log', pt: 'Busque no log do kernel' },
    task: {
      en: 'The kernel ring buffer still holds everything printed during boot. Write every line that mentions Memory into /root/lab/memory-log.txt, keeping the order the kernel printed them in.',
      pt: 'O buffer circular do kernel ainda guarda tudo que foi impresso durante o boot. Escreva cada linha que cita Memory em /root/lab/memory-log.txt, mantendo a ordem em que o kernel imprimiu.',
    },
    hint: {
      en: 'dmesg prints the ring buffer to standard output, which means grep can filter it through a pipe like any other stream. The match is case sensitive, so the capital M matters.',
      pt: 'O dmesg imprime o buffer circular na saída padrão, o que significa que o grep pode filtrar ele por um pipe como qualquer outro fluxo. A busca diferencia maiúsculas, então o M maiúsculo importa.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/memory-log.txt',
    checks: [
      {
        label: { en: 'the file has at least one line', pt: 'o arquivo tem pelo menos uma linha' },
        command: '[ -s /root/lab/memory-log.txt ]',
      },
      {
        label: {
          en: 'it matches what dmesg reports right now',
          pt: 'ele bate com o que o dmesg informa agora',
        },
        command: 'dmesg | grep Memory | diff - /root/lab/memory-log.txt',
      },
    ],
    solutionCommand: 'dmesg | grep Memory > /root/lab/memory-log.txt',
  },
  {
    id: 'tune-a-kernel-parameter',
    track: 'system-and-kernel',
    title: { en: 'Tune a kernel parameter', pt: 'Ajuste um parâmetro do kernel' },
    task: {
      en: 'The kernel is running with vm.swappiness at 60. Bring it down to 30 while the machine is up, so both sysctl and the file under /proc/sys report the new value.',
      pt: 'O kernel está rodando com vm.swappiness em 60. Baixe para 30 com a máquina ligada, de modo que tanto o sysctl quanto o arquivo em /proc/sys informem o valor novo.',
    },
    hint: {
      en: 'sysctl -w assigns a value to a parameter in the form name=value, using dots between the parts of the name. The same parameter also exists as a writable file under /proc/sys, with slashes in place of the dots.',
      pt: 'O sysctl -w atribui um valor a um parâmetro na forma nome=valor, usando pontos entre as partes do nome. O mesmo parâmetro também existe como arquivo gravável em /proc/sys, com barras no lugar dos pontos.',
    },
    setupCommand: 'sysctl -w vm.swappiness=60 >/dev/null 2>&1; true',
    checks: [
      {
        label: { en: '/proc/sys/vm/swappiness reads 30', pt: '/proc/sys/vm/swappiness lê 30' },
        command: '[ "$(cat /proc/sys/vm/swappiness)" = "30" ]',
      },
      {
        label: { en: 'sysctl reports the same value', pt: 'o sysctl informa o mesmo valor' },
        command: 'sysctl vm.swappiness | grep -q "30"',
      },
    ],
    solutionCommand: 'sysctl -w vm.swappiness=30',
  },
  {
    id: 'read-the-kernel-release',
    track: 'system-and-kernel',
    title: { en: 'Report the kernel release', pt: 'Informe a versão do kernel' },
    task: {
      en: 'Write into /root/lab/kernel.txt the release of the running kernel, the short string like 5.6.15 and nothing else, no system name and no build date.',
      pt: 'Escreva em /root/lab/kernel.txt a versão do kernel em execução, a string curta como 5.6.15 e mais nada, sem nome do sistema e sem data de compilação.',
    },
    hint: {
      en: 'uname prints one piece of system information per flag, and -r selects the kernel release on its own. Running it with -a instead would bring the whole line, which is more than the file should hold.',
      pt: 'O uname imprime uma informação de sistema por flag, e o -r seleciona a versão do kernel sozinha. Rodar com -a traria a linha inteira, que é mais do que o arquivo deve guardar.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/kernel.txt',
    checks: [
      {
        label: { en: 'the file matches uname -r', pt: 'o arquivo bate com o uname -r' },
        command: '[ "$(cat /root/lab/kernel.txt)" = "$(uname -r)" ]',
      },
      {
        label: { en: 'nothing else came along', pt: 'nada além disso veio junto' },
        command: '[ "$(wc -w < /root/lab/kernel.txt)" = "1" ]',
      },
    ],
    solutionCommand: 'uname -r > /root/lab/kernel.txt',
  },
  {
    id: 'look-up-a-service-port',
    track: 'system-and-kernel',
    title: { en: 'Look up the port of a service', pt: 'Descubra a porta de um serviço' },
    task: {
      en: 'The file /etc/services maps service names to ports. Write the TCP port of ssh into /root/lab/ssh-port.txt as a bare number, with no protocol and no comment next to it.',
      pt: 'O arquivo /etc/services associa nomes de serviços a portas. Escreva a porta TCP do ssh em /root/lab/ssh-port.txt como um número puro, sem o protocolo e sem comentário do lado.',
    },
    hint: {
      en: 'Each line pairs the name with a port and protocol joined by a slash, like 22/tcp. awk can match the line and cut can keep the part before the slash.',
      pt: 'Cada linha junta o nome com uma porta e um protocolo ligados por barra, como 22/tcp. O awk consegue casar a linha e o cut consegue ficar com a parte antes da barra.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/ssh-port.txt',
    checks: [
      {
        label: { en: 'the file holds 22', pt: 'o arquivo guarda 22' },
        command: '[ "$(cat /root/lab/ssh-port.txt)" = "22" ]',
      },
    ],
    solutionCommand:
      'awk \'$1 == "ssh" && $2 ~ /tcp/ {print $2}\' /etc/services | cut -d/ -f1 | head -1 > /root/lab/ssh-port.txt',
  },
  {
    id: 'read-the-time-in-another-zone',
    track: 'system-and-kernel',
    title: { en: 'Read the time in another zone', pt: 'Veja a hora em outro fuso' },
    task: {
      en: 'Write the current hour in the UTC zone into /root/lab/utc-hour.txt, as two digits, without changing the clock or the zone of the machine for anything else.',
      pt: 'Escreva a hora atual no fuso UTC em /root/lab/utc-hour.txt, com dois dígitos, sem mudar o relógio nem o fuso da máquina para mais nada.',
    },
    hint: {
      en: 'date reads the TZ variable to decide which zone to print, and setting a variable in front of a command applies it to that command alone. The format %H prints the hour padded to two digits.',
      pt: 'O date lê a variável TZ para decidir qual fuso imprimir, e definir uma variável na frente de um comando aplica ela só àquele comando. O formato %H imprime a hora com dois dígitos.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/utc-hour.txt',
    checks: [
      {
        label: { en: 'the file holds two digits', pt: 'o arquivo guarda dois dígitos' },
        command: 'grep -qE "^[0-9]{2}$" /root/lab/utc-hour.txt',
      },
      {
        label: { en: 'it matches the hour in UTC', pt: 'ele bate com a hora em UTC' },
        command: '[ "$(cat /root/lab/utc-hour.txt)" = "$(TZ=UTC date +%H)" ]',
      },
    ],
    solutionCommand: 'TZ=UTC date +%H > /root/lab/utc-hour.txt',
  },
  {
    id: 'collect-the-memory-parameters',
    track: 'system-and-kernel',
    title: { en: 'Collect a family of kernel parameters', pt: 'Junte uma família de parâmetros do kernel' },
    task: {
      en: 'Write into /root/lab/vm-params.txt the name of every kernel parameter under vm, one per line and sorted, with the name alone and no value beside it.',
      pt: 'Escreva em /root/lab/vm-params.txt o nome de cada parâmetro do kernel abaixo de vm, um por linha e ordenado, com o nome sozinho e sem o valor do lado.',
    },
    hint: {
      en: 'sysctl -a prints every parameter as name = value, so a filter on the beginning of the line keeps the family you want. Cutting at the equals sign and trimming the space leaves the bare name.',
      pt: 'O sysctl -a imprime cada parâmetro como nome = valor, então um filtro no começo da linha mantém a família desejada. Cortar no sinal de igual e tirar o espaço deixa o nome puro.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/vm-params.txt',
    checks: [
      {
        label: { en: 'vm.swappiness is on the list', pt: 'o vm.swappiness está na lista' },
        command: 'grep -qx "vm.swappiness" /root/lab/vm-params.txt',
      },
      {
        label: { en: 'no value came along', pt: 'nenhum valor veio junto' },
        command: '! grep -q "=" /root/lab/vm-params.txt',
      },
      {
        label: { en: 'the list matches what sysctl reports', pt: 'a lista bate com o que o sysctl informa' },
        command:
          'sysctl -a 2>/dev/null | grep "^vm\\." | cut -d= -f1 | tr -d " " | sort | diff - /root/lab/vm-params.txt',
      },
    ],
    solutionCommand: 'sysctl -a 2>/dev/null | grep "^vm\\." | cut -d= -f1 | tr -d " " | sort > /root/lab/vm-params.txt',
  },
  {
    id: 'list-the-mounted-filesystem-types',
    track: 'system-and-kernel',
    title: { en: 'List the mounted filesystem types', pt: 'Liste os tipos de sistema de arquivos montados' },
    task: {
      en: 'Write into /root/lab/fstypes.txt the type of every filesystem currently mounted, one per line, each type appearing once and the list sorted, reading it from /proc/mounts.',
      pt: 'Escreva em /root/lab/fstypes.txt o tipo de cada sistema de arquivos montado agora, um por linha, cada tipo aparecendo uma vez e a lista ordenada, lendo isso de /proc/mounts.',
    },
    hint: {
      en: 'Every line of /proc/mounts carries the device, the mount point, the type and the options, in that order. awk prints the third field, and sort -u both orders the result and drops the repeated types.',
      pt: 'Cada linha de /proc/mounts carrega o dispositivo, o ponto de montagem, o tipo e as opções, nessa ordem. O awk imprime o terceiro campo, e o sort -u ordena o resultado e descarta os tipos repetidos.',
    },
    setupCommand: 'mkdir -p /root/lab; rm -f /root/lab/fstypes.txt',
    checks: [
      {
        label: { en: 'the list matches /proc/mounts', pt: 'a lista bate com /proc/mounts' },
        command: "awk '{print $3}' /proc/mounts | sort -u | diff - /root/lab/fstypes.txt",
      },
      {
        label: { en: 'proc and tmpfs are in it', pt: 'proc e tmpfs estão nela' },
        command: 'grep -qx proc /root/lab/fstypes.txt && grep -qx tmpfs /root/lab/fstypes.txt',
      },
    ],
    solutionCommand: "awk '{print $3}' /proc/mounts | sort -u > /root/lab/fstypes.txt",
  },
];
