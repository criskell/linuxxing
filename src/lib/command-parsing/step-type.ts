export type StepType =
  | 'command'
  | 'subcommand'
  | 'flag-long'
  | 'flag-short'
  | 'arg'
  | 'unknown'
  | 'comment'
  | 'control'
  | 'test'
  | 'operator'
  | 'redirect';
