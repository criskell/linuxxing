export type { LocalizedText } from '../localized-text';
import type { LocalizedText } from '../localized-text';

export type ValueKind = 'generic' | 'octal-mode';

export interface CommandDef {
  desc: LocalizedText;
  subcommands: Record<string, LocalizedText>;
  flags: Record<string, LocalizedText>;
  valueFlags?: Record<string, ValueKind>;
  argHint?: LocalizedText;
}

export type CommandKB = Record<string, CommandDef>;
