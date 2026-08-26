import type { StudyCard, StudyTopic } from './types';

export const userInterfacesTopic: StudyTopic = {
  id: 'user-interfaces',
  objectiveCode: '106',
  title: { en: 'User Interfaces and Desktops', pt: 'Interfaces de Usuário e Ambientes de Trabalho' },
};

export const userInterfacesCards: StudyCard[] = [
  {
    id: 'what-is-x11',
    topic: 'user-interfaces',
    front: { en: 'What is X11?', pt: 'O que é o X11?' },
    back: {
      en: 'X11 (the X Window System) is the traditional display server protocol on Linux, the layer that lets graphical programs draw windows, receive keyboard and mouse input, and share the screen with other programs, without needing to talk to the graphics hardware directly. It has been the dominant standard for decades and is what most desktop environments were originally built on.',
      pt: 'O X11 (X Window System) é o protocolo tradicional de servidor de exibição no Linux, a camada que permite que programas gráficos desenhem janelas, recebam entrada de teclado e mouse, e compartilhem a tela com outros programas, sem precisar conversar diretamente com o hardware gráfico. Foi o padrão dominante por décadas e é sobre o que a maioria dos ambientes de trabalho foi originalmente construída.',
    },
    details: {
      en: 'X11 is a client server protocol, and the naming confuses people at first: the server runs where the screen is and the clients are the applications, which is why a program on a remote machine can draw on your local display. The DISPLAY variable names that target, and ssh -X sets it up through the tunnel. Configuration lives in /etc/X11 and the log records why a session failed to start, usually a driver or a permission problem.',
      pt: 'O X11 é um protocolo cliente servidor, e a nomenclatura confunde no começo: o servidor roda onde está a tela e os clientes são as aplicações, e é por isso que um programa em uma máquina remota consegue desenhar no seu display local. A variável DISPLAY nomeia esse alvo, e o ssh -X monta isso pelo túnel. A configuração mora em /etc/X11 e o log registra por que uma sessão não subiu, normalmente um problema de driver ou de permissão.',
    },
    keyPoints: [
      {
        en: 'The X server runs next to the screen, so the remote program is the client even though it does the work.',
        pt: 'O servidor X roda junto da tela, então o programa remoto é o cliente mesmo sendo ele quem faz o trabalho.',
      },
      {
        en: 'DISPLAY names the target screen, and a program started without it cannot open a window at all.',
        pt: 'O DISPLAY nomeia a tela alvo, e um programa iniciado sem ele não consegue abrir janela nenhuma.',
      },
      {
        en: 'A window manager is a separate program, which is why a bare X session can show applications with no borders.',
        pt: 'O gerenciador de janelas é um programa à parte, e é por isso que uma sessão X crua mostra aplicações sem bordas.',
      },
    ],
    commands: ['ssh', 'systemctl', 'journalctl'],
  },
  {
    id: 'wayland',
    topic: 'user-interfaces',
    front: { en: 'What is Wayland?', pt: 'O que é o Wayland?' },
    back: {
      en: "Wayland is the modern replacement for X11: a simpler display server protocol designed around how graphics hardware actually works today, with better security isolation between applications (one app can't simply snoop on another's window by default) and less overhead. Most major desktop environments now default to it, though some older applications still need an X11 compatibility layer to run under it.",
      pt: 'O Wayland é a substituta moderna do X11: um protocolo de servidor de exibição mais simples, desenhado em torno de como o hardware gráfico realmente funciona hoje, com melhor isolamento de segurança entre aplicações (um app não consegue simplesmente espionar a janela de outro por padrão) e menos sobrecarga. A maioria dos ambientes de trabalho principais já usa ele por padrão, embora algumas aplicações mais antigas ainda precisem de uma camada de compatibilidade com X11 para rodar sob ele.',
    },
    details: {
      en: 'Wayland replaces the X protocol with a design where the compositor is also the display server, which removes a whole class of applications spying on each other input. That isolation is exactly what breaks old tools: screen recorders, global hotkey daemons and remote control programs need portals instead of raw access. Many systems run both, with Xwayland translating for applications that only speak X11.',
      pt: 'O Wayland substitui o protocolo X por um desenho em que o compositor também é o servidor de display, o que remove uma classe inteira de aplicações espionando a entrada das outras. Esse isolamento é justamente o que quebra ferramentas antigas: gravadores de tela, serviços de atalho global e programas de controle remoto precisam de portais em vez de acesso direto. Muitos sistemas rodam os dois, com o Xwayland traduzindo para aplicações que só falam X11.',
    },
    keyPoints: [
      {
        en: 'Xwayland exists so X11 applications keep working inside a Wayland session.',
        pt: 'O Xwayland existe para aplicações X11 continuarem funcionando dentro de uma sessão Wayland.',
      },
      {
        en: 'A client cannot read the input of another one, which is why old screenshot tools stop working.',
        pt: 'Um cliente não consegue ler a entrada de outro, e é por isso que ferramentas antigas de captura param de funcionar.',
      },
      {
        en: 'The compositor draws everything, so tearing and stale frames are handled by design rather than by extensions.',
        pt: 'O compositor desenha tudo, então rasgo de imagem e quadros velhos são tratados pelo desenho e não por extensões.',
      },
    ],
    commands: ['systemctl', 'journalctl', 'env'],
  },
  {
    id: 'display-manager',
    topic: 'user-interfaces',
    front: { en: 'What is a display manager?', pt: 'O que é um display manager?' },
    back: {
      en: 'A display manager (like GDM, SDDM, or LightDM) is the service that shows the graphical login screen, authenticates the user, and starts their chosen desktop session (X11 or Wayland) once they log in, the graphical equivalent of a text login prompt, and one of the last services to start during boot on a desktop system.',
      pt: 'Um display manager (como GDM, SDDM ou LightDM) é o serviço que mostra a tela de login gráfica, autentica o usuário, e inicia a sessão de área de trabalho escolhida (X11 ou Wayland) assim que ele loga, o equivalente gráfico de um prompt de login em texto, e um dos últimos serviços a iniciar durante o boot em um sistema desktop.',
    },
    details: {
      en: 'The display manager is a service like any other, started by the init system, that shows the graphical login and then launches the session the user picked. Because it runs as a unit, a machine that boots to a black screen is usually a stopped or failing display manager, and switching the default target to multi-user gives you a text console to repair it. Session choices come from desktop files under /usr/share/xsessions.',
      pt: 'O gerenciador de display é um serviço como qualquer outro, iniciado pelo sistema de init, que mostra o login gráfico e depois inicia a sessão escolhida pelo usuário. Como ele roda como uma unidade, uma máquina que inicia com tela preta normalmente tem um gerenciador de display parado ou falhando, e trocar o target padrão para multi-user devolve um console de texto para consertar. As opções de sessão vêm de arquivos desktop em /usr/share/xsessions.',
    },
    keyPoints: [
      {
        en: 'GDM, SDDM and LightDM do the same job, and the running one is a systemd unit you can stop and start.',
        pt: 'GDM, SDDM e LightDM fazem o mesmo trabalho, e o que está rodando é uma unidade do systemd que dá para parar e iniciar.',
      },
      {
        en: 'Switching the default target to multi-user boots to text, which is the way out of a broken graphical stack.',
        pt: 'Trocar o target padrão para multi-user inicia em modo texto, que é a saída de uma pilha gráfica quebrada.',
      },
      {
        en: 'The session list comes from files in /usr/share/xsessions, so a missing desktop shows up as a missing option.',
        pt: 'A lista de sessões vem de arquivos em /usr/share/xsessions, então um desktop faltando aparece como opção faltando.',
      },
    ],
    commands: ['systemctl', 'journalctl', 'who'],
  },
  {
    id: 'desktop-environment',
    topic: 'user-interfaces',
    front: { en: 'What is a desktop environment?', pt: 'O que é um ambiente de trabalho?' },
    back: {
      en: 'A desktop environment (GNOME, KDE Plasma, Xfce, and others) is the complete graphical experience built on top of a display server: window manager, taskbar, file manager, settings panels, and a consistent set of default applications, bundled together so a user gets a cohesive desktop rather than assembling one piece by piece.',
      pt: 'Um ambiente de trabalho (GNOME, KDE Plasma, Xfce, entre outros) é a experiência gráfica completa construída sobre um servidor de exibição: gerenciador de janelas, barra de tarefas, gerenciador de arquivos, painéis de configuração e um conjunto consistente de aplicações padrão, tudo empacotado junto para que o usuário tenha uma área de trabalho coesa em vez de montar uma peça por peça.',
    },
    details: {
      en: 'A desktop environment bundles a window manager, a panel, a file manager, a settings application and a set of libraries so the pieces look and behave alike. That bundling is why installing one pulls in a long dependency list, and why two environments on the same machine can fight over default applications. A window manager alone is the minimal alternative: it places and decorates windows and leaves everything else to you.',
      pt: 'Um ambiente de desktop reúne gerenciador de janelas, painel, gerenciador de arquivos, aplicativo de configurações e um conjunto de bibliotecas para as peças se parecerem e se comportarem igual. Esse empacotamento é por que instalar um puxa uma lista longa de dependências, e por que dois ambientes na mesma máquina brigam pelos aplicativos padrão. Um gerenciador de janelas sozinho é a alternativa mínima: ele posiciona e decora janelas e deixa o resto por sua conta.',
    },
    keyPoints: [
      {
        en: 'GNOME and KDE Plasma pull large dependency sets, which is why a minimal server install ships neither.',
        pt: 'GNOME e KDE Plasma puxam conjuntos grandes de dependências, e é por isso que uma instalação mínima de servidor não traz nenhum dos dois.',
      },
      {
        en: 'The session you pick at login decides which environment starts, and both can stay installed side by side.',
        pt: 'A sessão escolhida no login decide qual ambiente inicia, e os dois podem ficar instalados lado a lado.',
      },
      {
        en: 'A window manager without a desktop environment gives windows and nothing else, no panel and no settings application.',
        pt: 'Um gerenciador de janelas sem ambiente de desktop dá janelas e mais nada, sem painel e sem aplicativo de configurações.',
      },
    ],
    commands: ['apt', 'dnf', 'systemctl'],
  },
  {
    id: 'accessibility',
    topic: 'user-interfaces',
    front: {
      en: 'What does accessibility mean in a desktop environment?',
      pt: 'O que significa acessibilidade em um ambiente de trabalho?',
    },
    back: {
      en: 'Accessibility features let people with visual, hearing, motor, or cognitive impairments use a desktop effectively: screen readers that speak window content aloud, high-contrast themes, on-screen keyboards, sticky keys for people who cannot hold multiple keys at once, and similar tools, most major desktop environments ship these built in and configurable from a dedicated settings panel.',
      pt: 'Recursos de acessibilidade permitem que pessoas com deficiências visuais, auditivas, motoras ou cognitivas usem uma área de trabalho de forma eficaz: leitores de tela que falam o conteúdo das janelas em voz alta, temas de alto contraste, teclados na tela, teclas de aderência para quem não consegue segurar várias teclas ao mesmo tempo, e ferramentas semelhantes, a maioria dos ambientes de trabalho principais já traz isso embutido e configurável em um painel de ajustes dedicado.',
    },
    details: {
      en: 'Accessibility features are part of the desktop, not extras bolted on: a screen reader speaks the interface, a magnifier enlarges part of the screen, sticky keys let a shortcut be typed one key at a time, and high contrast themes and larger fonts help low vision. They rely on applications exposing an accessibility interface, which is why a program that draws its own widgets can stay unreadable to a screen reader even when the system is configured correctly.',
      pt: 'Os recursos de acessibilidade fazem parte do desktop e não são acessórios pregados depois: um leitor de tela fala a interface, uma lupa amplia parte da tela, as teclas de aderência deixam um atalho ser digitado uma tecla por vez, e temas de alto contraste e fontes maiores ajudam quem tem baixa visão. Eles dependem de as aplicações exporem uma interface de acessibilidade, e é por isso que um programa que desenha os próprios controles continua ilegível para um leitor de tela mesmo com o sistema configurado direito.',
    },
    keyPoints: [
      {
        en: 'Orca is the screen reader that ships with GNOME, and it reads what the accessibility interface exposes.',
        pt: 'O Orca é o leitor de tela que vem com o GNOME, e ele lê o que a interface de acessibilidade expõe.',
      },
      {
        en: 'Sticky keys and slow keys change how the keyboard is read, which helps people who cannot hold two keys at once.',
        pt: 'As teclas de aderência e as teclas lentas mudam como o teclado é lido, o que ajuda quem não consegue segurar duas teclas ao mesmo tempo.',
      },
      {
        en: 'An application that draws its own widgets can stay invisible to a screen reader, no matter the system settings.',
        pt: 'Uma aplicação que desenha os próprios controles pode continuar invisível para um leitor de tela, não importa a configuração do sistema.',
      },
    ],
    commands: ['systemctl', 'env'],
  },
];
