import { V86 } from 'v86';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';

export type MachineStatus = 'idle' | 'downloading' | 'booting' | 'ready';

export interface MachineOptions {
  assetsPath: string;
  terminalContainer: HTMLElement;
  banner: string;
  onStatusChange: (status: MachineStatus) => void;
  onDownloadProgress: (percent: number) => void;
}

const MEMORY_SIZE = 128 * 1024 * 1024;
const VIDEO_MEMORY_SIZE = 2 * 1024 * 1024;
const KERNEL_COMMAND_LINE = 'tsc=reliable mitigations=off random.trust_cpu=on console=ttyS0';
const PROMPT_PATTERN = /[%#$] $/;
const TAIL_LENGTH = 256;
const BOOT_TIMEOUT = 120000;
const COMMAND_TIMEOUT = 20000;

const TERMINAL_THEME = {
  background: '#fbfbfb',
  foreground: '#2f2f2f',
  cursor: '#2f2f2f',
  cursorAccent: '#fbfbfb',
  selectionBackground: '#d8d8d8',
  black: '#3d3d3d',
  red: '#a53125',
  green: '#2c7047',
  yellow: '#8a6410',
  blue: '#33549c',
  magenta: '#7c4a93',
  cyan: '#2c6f7d',
  white: '#8a8a8a',
  brightBlack: '#7a7a7a',
  brightRed: '#c2483a',
  brightGreen: '#3d8f5e',
  brightYellow: '#a67c1c',
  brightBlue: '#4a6cbd',
  brightMagenta: '#9563ad',
  brightCyan: '#3b8b9b',
  brightWhite: '#3d3d3d',
};

const delay = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export class LabMachine {
  private readonly assetsPath: string;
  private readonly banner: string;
  private readonly onStatusChange: (status: MachineStatus) => void;
  private readonly onDownloadProgress: (percent: number) => void;
  private readonly terminal: Terminal;
  private readonly fitAddon = new FitAddon();
  private readonly decoder = new TextDecoder();
  private readonly pendingBytes: number[] = [];

  private emulator: V86 | null = null;
  private kernel: ArrayBuffer | null = null;
  private status: MachineStatus = 'idle';
  private quietOutput: string | null = null;
  private tail = '';
  private flushScheduled = false;
  private commandCounter = 0;

  constructor(options: MachineOptions) {
    this.assetsPath = options.assetsPath;
    this.banner = options.banner;
    this.onStatusChange = options.onStatusChange;
    this.onDownloadProgress = options.onDownloadProgress;

    this.terminal = new Terminal({
      convertEol: true,
      cursorBlink: true,
      fontFamily: "'Geist Mono Variable', ui-monospace, monospace",
      fontSize: 14,
      letterSpacing: 0.2,
      lineHeight: 1.45,
      scrollback: 2000,
      theme: TERMINAL_THEME,
    });
    this.terminal.loadAddon(this.fitAddon);
    this.terminal.open(options.terminalContainer);
    this.terminal.onData((data) => {
      if (this.quietOutput === null) this.emulator?.serial0_send(data);
    });
  }

  async boot() {
    if (this.status !== 'idle') return;

    await document.fonts.ready;
    this.fitAddon.fit();
    this.setStatus('downloading');
    this.kernel = await this.downloadKernel();

    this.setStatus('booting');
    await this.startEmulator();
    await this.syncTerminalSize();
    this.showBanner();
    this.setStatus('ready');
  }

  async restart() {
    if (!this.emulator || this.status !== 'ready') return;

    this.setStatus('booting');
    await this.emulator.destroy();
    this.emulator = null;
    this.terminal.reset();

    await this.startEmulator();
    await this.syncTerminalSize();
    this.showBanner();
    this.setStatus('ready');
  }

  async run(command: string): Promise<number | null> {
    if (this.status !== 'ready') return null;
    return this.execute(command);
  }

  typeIntoShell(text: string) {
    if (!this.emulator || this.status !== 'ready') return;
    this.emulator.serial0_send(text);
    this.terminal.focus();
  }

  isReady() {
    return this.status === 'ready';
  }

  isAtPrompt() {
    return PROMPT_PATTERN.test(this.tail);
  }

  focus() {
    this.terminal.focus();
  }

  fitToContainer() {
    if (this.status !== 'ready') return;
    void this.syncTerminalSize();
  }

  private showBanner() {
    this.terminal.clear();
    this.terminal.reset();
    this.banner.split('\n').forEach((line) => this.terminal.writeln(line));
    this.emulator?.serial0_send('\n');
  }

  private async execute(command: string): Promise<number | null> {
    if (!this.emulator || this.quietOutput !== null) return null;

    const marker = `labstep${this.commandCounter++}`;
    this.quietOutput = '';
    this.emulator.serial0_send(`{ ${command}\n} >/dev/null 2>&1 ; echo "${marker}""_$?"\n`);

    const exitCode = await this.waitForMarker(marker);
    this.quietOutput = null;
    return exitCode;
  }

  private async startEmulator() {
    this.pendingBytes.length = 0;
    this.quietOutput = '';
    this.tail = '';

    this.emulator = new V86({
      wasm_path: `${this.assetsPath}/v86.wasm`,
      bios: { url: `${this.assetsPath}/seabios.bin` },
      vga_bios: { url: `${this.assetsPath}/vgabios.bin` },
      bzimage: { buffer: this.kernel! },
      cmdline: KERNEL_COMMAND_LINE,
      filesystem: {},
      memory_size: MEMORY_SIZE,
      vga_memory_size: VIDEO_MEMORY_SIZE,
      disable_speaker: true,
      autostart: true,
    });
    this.emulator.add_listener('serial0-output-byte', (byte: number) => this.receiveByte(byte));

    await this.waitForPrompt();
    this.quietOutput = null;
  }

  private async downloadKernel() {
    if (this.kernel) return this.kernel;

    const response = await fetch(`${this.assetsPath}/buildroot-bzimage.bin`);
    if (!response.ok || !response.body) {
      throw new Error(`The kernel image did not load, the server answered ${response.status}`);
    }

    const expectedLength = Number(response.headers.get('content-length') ?? 0);
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let received = 0;

    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      if (expectedLength) this.onDownloadProgress(Math.round((received / expectedLength) * 100));
    }

    const kernel = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      kernel.set(chunk, offset);
      offset += chunk.length;
    }
    return kernel.buffer;
  }

  private receiveByte(byte: number) {
    this.pendingBytes.push(byte);
    if (this.flushScheduled) return;
    this.flushScheduled = true;
    requestAnimationFrame(() => this.flushPendingBytes());
  }

  private flushPendingBytes() {
    this.flushScheduled = false;
    if (this.pendingBytes.length === 0) return;

    const bytes = Uint8Array.from(this.pendingBytes);
    this.pendingBytes.length = 0;

    const text = this.decoder.decode(bytes, { stream: true });
    this.tail = (this.tail + text).slice(-TAIL_LENGTH);

    if (this.quietOutput === null) this.terminal.write(bytes);
    else this.quietOutput += text;
  }

  private async waitForPrompt() {
    const deadline = Date.now() + BOOT_TIMEOUT;
    while (Date.now() < deadline) {
      if (this.isAtPrompt()) return;
      await delay(100);
    }
    throw new Error('The machine never reached a shell prompt');
  }

  private async waitForMarker(marker: string) {
    const pattern = new RegExp(`${marker}_(\\d+)`);
    const deadline = Date.now() + COMMAND_TIMEOUT;

    while (Date.now() < deadline) {
      const match = pattern.exec(this.quietOutput ?? '');
      if (match) {
        await this.waitForQuietPrompt();
        return Number(match[1]);
      }
      await delay(60);
    }
    return null;
  }

  private async waitForQuietPrompt() {
    const deadline = Date.now() + 2000;
    while (Date.now() < deadline && !this.isAtPrompt()) await delay(40);
  }

  private async syncTerminalSize() {
    this.fitAddon.fit();
    await this.execute(`stty rows ${this.terminal.rows} cols ${this.terminal.cols}`);
  }

  private setStatus(status: MachineStatus) {
    this.status = status;
    this.onStatusChange(status);
  }
}
