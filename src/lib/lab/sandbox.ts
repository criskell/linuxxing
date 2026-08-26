import type { LocalizedText } from '../localized-text';

export const SANDBOX_SETUP = [
  'rm -rf /root/sandbox',
  'mkdir -p /root/sandbox/project/src /root/sandbox/project/docs',
  'printf "first line\\nsecond line\\nthird line\\n" > /root/sandbox/notes.txt',
  'printf "INFO start\\nERROR disk full\\nINFO retry\\nERROR disk full\\nWARN slow response\\nERROR timeout\\nINFO done\\n" > /root/sandbox/app.log',
  'printf "10.0.0.3\\n10.0.0.1\\n10.0.0.3\\n10.0.0.2\\n10.0.0.3\\n10.0.0.1\\n" > /root/sandbox/hosts.txt',
  'touch /root/sandbox/project/src/main.c /root/sandbox/project/docs/readme.md',
  'printf "api-key=8f3a9c\\n" > /root/sandbox/secret.txt',
  'chmod 600 /root/sandbox/secret.txt',
  'addgroup deploy 2>/dev/null',
  'adduser -D -H -G deploy ana 2>/dev/null',
  'for pid in $(pidof sleep); do kill $pid; done',
  'sleep 900 &',
  'cd /root/sandbox',
].join('\n');

export const sandboxSummary: LocalizedText = {
  en: 'The sandbox drops you into /root/sandbox with notes.txt holding three lines, app.log where three of the seven lines carry ERROR, hosts.txt repeating six addresses, a project directory split into src and docs, a secret.txt closed to everyone but its owner, the user ana inside the group deploy, and a sleep process left running in the background.',
  pt: 'O sandbox deixa você em /root/sandbox com notes.txt de três linhas, app.log em que três das sete linhas trazem ERROR, hosts.txt repetindo seis endereços, um diretório project dividido em src e docs, um secret.txt fechado para todos menos o dono, a usuária ana dentro do grupo deploy e um processo sleep rodando em segundo plano.',
};
