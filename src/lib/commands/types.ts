import type { Locale } from '../../i18n/languages';

export type LocalizedText = Record<Locale, string>;

export type ValueKind = 'generic' | 'octal-mode';

export interface CommandDef {
  desc: LocalizedText;
  subcommands: Record<string, LocalizedText>;
  flags: Record<string, LocalizedText>;
  valueFlags?: Record<string, ValueKind>;
  argHint?: LocalizedText;
}

export type CommandKB = Record<string, CommandDef>;
