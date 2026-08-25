import type { LocalizedText } from './commands';

export const CONTROL_KEYWORDS: Record<string, LocalizedText> = {
  if: {
    en: 'Starts a conditional block: the commands between "then" and the matching "else"/"elif"/"fi" only run if the test that follows evaluates as true.',
    pt: 'Inicia um bloco condicional: os comandos entre "then" e o "else"/"elif"/"fi" correspondente só rodam se o teste seguinte for verdadeiro.',
  },
  then: {
    en: 'Marks the start of the commands that run when the condition above was true.',
    pt: 'Marca o início dos comandos que rodam quando a condição acima foi verdadeira.',
  },
  elif: {
    en: 'Else-if: checked only when the previous condition was false, before falling through to "else".',
    pt: 'Senão-se: verificado apenas quando a condição anterior foi falsa, antes de cair no "else".',
  },
  else: {
    en: 'Marks the commands that run when none of the conditions above were true.',
    pt: 'Marca os comandos que rodam quando nenhuma das condições acima foi verdadeira.',
  },
  fi: {
    en: 'Closes an "if" block ("if" spelled backwards).',
    pt: 'Fecha um bloco "if" ("if" escrito ao contrário).',
  },
  while: {
    en: 'Starts a loop that repeats as long as the test that follows keeps evaluating as true.',
    pt: 'Inicia um loop que se repete enquanto o teste seguinte continuar sendo verdadeiro.',
  },
  until: {
    en: 'Starts a loop that repeats until the test that follows finally evaluates as true.',
    pt: 'Inicia um loop que se repete até que o teste seguinte finalmente seja verdadeiro.',
  },
  do: {
    en: 'Marks the start of the commands to repeat inside a "while"/"until"/"for" loop.',
    pt: 'Marca o início dos comandos a repetir dentro de um loop "while"/"until"/"for".',
  },
  done: {
    en: 'Closes a "while"/"until"/"for" loop.',
    pt: 'Fecha um loop "while"/"until"/"for".',
  },
  for: {
    en: 'Starts a loop that runs once per item in a list (or a C-style loop with (( )) ).',
    pt: 'Inicia um loop que roda uma vez para cada item de uma lista (ou um loop no estilo C com (( )) ).',
  },
  case: {
    en: 'Starts a multi-way branch: the value is matched against a series of patterns, each ending in ")".',
    pt: 'Inicia uma ramificação de múltiplas vias: o valor é comparado com uma série de padrões, cada um terminando em ")".',
  },
  esac: {
    en: 'Closes a "case" block ("case" spelled backwards).',
    pt: 'Fecha um bloco "case" ("case" escrito ao contrário).',
  },
  function: {
    en: 'Declares a shell function (the keyword is optional, since "name() { ... }" works the same way).',
    pt: 'Declara uma função do shell (a palavra-chave é opcional, já que "nome() { ... }" funciona do mesmo jeito).',
  },
};

export const TEST_FLAGS: Record<string, LocalizedText> = {
  '!': {
    en: 'Negates the condition that follows.',
    pt: 'Nega a condição que vem em seguida.',
  },
  '-f': {
    en: 'True if the path exists and is a regular file.',
    pt: 'Verdadeiro se o caminho existe e é um arquivo comum.',
  },
  '-d': {
    en: 'True if the path exists and is a directory.',
    pt: 'Verdadeiro se o caminho existe e é um diretório.',
  },
  '-e': {
    en: 'True if the path exists, regardless of type.',
    pt: 'Verdadeiro se o caminho existe, independente do tipo.',
  },
  '-z': {
    en: 'True if the string is empty.',
    pt: 'Verdadeiro se a string está vazia.',
  },
  '-n': {
    en: 'True if the string is not empty.',
    pt: 'Verdadeiro se a string não está vazia.',
  },
  '-r': {
    en: 'True if the path exists and is readable.',
    pt: 'Verdadeiro se o caminho existe e é legível.',
  },
  '-w': {
    en: 'True if the path exists and is writable.',
    pt: 'Verdadeiro se o caminho existe e tem permissão de escrita.',
  },
  '-x': {
    en: 'True if the path exists and is executable.',
    pt: 'Verdadeiro se o caminho existe e é executável.',
  },
  '-eq': {
    en: 'True if the two numbers are equal.',
    pt: 'Verdadeiro se os dois números são iguais.',
  },
  '-ne': {
    en: 'True if the two numbers are different.',
    pt: 'Verdadeiro se os dois números são diferentes.',
  },
  '-lt': {
    en: 'True if the first number is less than the second.',
    pt: 'Verdadeiro se o primeiro número é menor que o segundo.',
  },
  '-gt': {
    en: 'True if the first number is greater than the second.',
    pt: 'Verdadeiro se o primeiro número é maior que o segundo.',
  },
  '-le': {
    en: 'True if the first number is less than or equal to the second.',
    pt: 'Verdadeiro se o primeiro número é menor ou igual ao segundo.',
  },
  '-ge': {
    en: 'True if the first number is greater than or equal to the second.',
    pt: 'Verdadeiro se o primeiro número é maior ou igual ao segundo.',
  },
};
