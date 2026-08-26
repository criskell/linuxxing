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

export interface SandboxItem {
  name: string;
  note: LocalizedText;
}

export const sandboxIntro: LocalizedText = {
  en: 'The shell lands in /root/sandbox, already holding:',
  pt: 'O shell cai em /root/sandbox, já com:',
};

export const SANDBOX_ITEMS: SandboxItem[] = [
  {
    name: 'notes.txt',
    note: { en: 'three lines of plain text', pt: 'três linhas de texto simples' },
  },
  {
    name: 'app.log',
    note: { en: 'seven log lines, three of them carrying ERROR', pt: 'sete linhas de log, três delas com ERROR' },
  },
  {
    name: 'hosts.txt',
    note: { en: 'six addresses, three of them repeated', pt: 'seis endereços, três deles repetidos' },
  },
  {
    name: 'project/',
    note: { en: 'src with main.c, docs with readme.md', pt: 'src com main.c, docs com readme.md' },
  },
  {
    name: 'secret.txt',
    note: { en: 'mode 600, closed to group and others', pt: 'modo 600, fechado para o grupo e os outros' },
  },
  {
    name: 'ana, deploy',
    note: { en: 'a user and the group she belongs to', pt: 'uma usuária e o grupo a que ela pertence' },
  },
  {
    name: 'sleep 900',
    note: { en: 'a process left running in the background', pt: 'um processo rodando em segundo plano' },
  },
];
