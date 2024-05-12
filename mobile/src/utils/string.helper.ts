export const removeCommentorName = (string?: string) => {
  if (!string) return '';

  const cleanedText: string = string.replace(/\s*\|\s*.+?\s*\|\s*/, ' | ');
  return cleanedText;
};

export const toStringOrEmpty = (value: any) => {
  return (value ?? '').toString();
};
