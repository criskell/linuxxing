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
