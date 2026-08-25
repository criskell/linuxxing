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
  },
  {
    id: 'wayland',
    topic: 'user-interfaces',
    front: { en: 'What is Wayland?', pt: 'O que é o Wayland?' },
    back: {
      en: "Wayland is the modern replacement for X11: a simpler display server protocol designed around how graphics hardware actually works today, with better security isolation between applications (one app can't simply snoop on another's window by default) and less overhead. Most major desktop environments now default to it, though some older applications still need an X11 compatibility layer to run under it.",
      pt: 'O Wayland é a substituta moderna do X11: um protocolo de servidor de exibição mais simples, desenhado em torno de como o hardware gráfico realmente funciona hoje, com melhor isolamento de segurança entre aplicações (um app não consegue simplesmente espionar a janela de outro por padrão) e menos sobrecarga. A maioria dos ambientes de trabalho principais já usa ele por padrão, embora algumas aplicações mais antigas ainda precisem de uma camada de compatibilidade com X11 para rodar sob ele.',
    },
  },
  {
    id: 'display-manager',
    topic: 'user-interfaces',
    front: { en: 'What is a display manager?', pt: 'O que é um display manager?' },
    back: {
      en: 'A display manager (like GDM, SDDM, or LightDM) is the service that shows the graphical login screen, authenticates the user, and starts their chosen desktop session (X11 or Wayland) once they log in, the graphical equivalent of a text login prompt, and one of the last services to start during boot on a desktop system.',
      pt: 'Um display manager (como GDM, SDDM ou LightDM) é o serviço que mostra a tela de login gráfica, autentica o usuário, e inicia a sessão de área de trabalho escolhida (X11 ou Wayland) assim que ele loga, o equivalente gráfico de um prompt de login em texto, e um dos últimos serviços a iniciar durante o boot em um sistema desktop.',
    },
  },
  {
    id: 'desktop-environment',
    topic: 'user-interfaces',
    front: { en: 'What is a desktop environment?', pt: 'O que é um ambiente de trabalho?' },
    back: {
      en: 'A desktop environment (GNOME, KDE Plasma, Xfce, and others) is the complete graphical experience built on top of a display server: window manager, taskbar, file manager, settings panels, and a consistent set of default applications, bundled together so a user gets a cohesive desktop rather than assembling one piece by piece.',
      pt: 'Um ambiente de trabalho (GNOME, KDE Plasma, Xfce, entre outros) é a experiência gráfica completa construída sobre um servidor de exibição: gerenciador de janelas, barra de tarefas, gerenciador de arquivos, painéis de configuração e um conjunto consistente de aplicações padrão, tudo empacotado junto para que o usuário tenha uma área de trabalho coesa em vez de montar uma peça por peça.',
    },
  },
  {
    id: 'accessibility',
    topic: 'user-interfaces',
    front: { en: 'What does accessibility mean in a desktop environment?', pt: 'O que significa acessibilidade em um ambiente de trabalho?' },
    back: {
      en: 'Accessibility features let people with visual, hearing, motor, or cognitive impairments use a desktop effectively: screen readers that speak window content aloud, high-contrast themes, on-screen keyboards, sticky keys for people who cannot hold multiple keys at once, and similar tools, most major desktop environments ship these built in and configurable from a dedicated settings panel.',
      pt: 'Recursos de acessibilidade permitem que pessoas com deficiências visuais, auditivas, motoras ou cognitivas usem uma área de trabalho de forma eficaz: leitores de tela que falam o conteúdo das janelas em voz alta, temas de alto contraste, teclados na tela, teclas de aderência para quem não consegue segurar várias teclas ao mesmo tempo, e ferramentas semelhantes, a maioria dos ambientes de trabalho principais já traz isso embutido e configurável em um painel de ajustes dedicado.',
    },
  },
];
