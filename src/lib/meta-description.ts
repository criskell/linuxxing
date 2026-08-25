const MAX_LENGTH = 155;

export const truncateForMeta = (text: string) => {
  if (text.length <= MAX_LENGTH) return text;
  const truncated = text.slice(0, MAX_LENGTH).replace(/\s+\S*$/, '');
  return `${truncated}...`;
};
