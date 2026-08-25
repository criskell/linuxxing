export type RedirectInfo =
  | { kind: 'dup'; fileDescriptor: string; target: string }
  | { kind: 'append'; fileDescriptor: string; target: string }
  | { kind: 'overwrite'; fileDescriptor: string; target: string }
  | { kind: 'input'; fileDescriptor: string; target: string };

const DUPLICATE_REDIRECT_PATTERN = /^(\d+)?>&(\d+)$/;
const APPEND_REDIRECT_PATTERN = /^(\d*)(>>)(.*)$/;
const OVERWRITE_REDIRECT_PATTERN = /^(\d*)(>)(.*)$/;
const INPUT_REDIRECT_PATTERN = /^(\d*)(<)(.*)$/;

export const parseRedirect = (token: string) => {
  const duplicateMatch = token.match(DUPLICATE_REDIRECT_PATTERN);
  if (duplicateMatch) {
    return { kind: 'dup' as const, fileDescriptor: duplicateMatch[1] ?? '1', target: duplicateMatch[2] };
  }

  const appendMatch = token.match(APPEND_REDIRECT_PATTERN);
  if (appendMatch) {
    return { kind: 'append' as const, fileDescriptor: appendMatch[1] || '1', target: appendMatch[3] || '' };
  }

  const overwriteMatch = token.match(OVERWRITE_REDIRECT_PATTERN);
  if (overwriteMatch) {
    return { kind: 'overwrite' as const, fileDescriptor: overwriteMatch[1] || '1', target: overwriteMatch[3] || '' };
  }

  const inputMatch = token.match(INPUT_REDIRECT_PATTERN);
  if (inputMatch) {
    return { kind: 'input' as const, fileDescriptor: inputMatch[1] || '1', target: inputMatch[3] || '' };
  }

  return null;
};
