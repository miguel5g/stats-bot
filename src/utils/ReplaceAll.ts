interface ReplaceAll {
  (text: string, findChar: string | string[], replaceChar: string | string[]): string;
}

const replaceAll: ReplaceAll = (text, findChar, replaceChar) => {

  if (text.length <= 0) return '';

  if (typeof findChar === 'string' && typeof replaceChar === 'object') new Error('I cannot replace a single char with several');

  return '';
}

export default replaceAll;