import { WOOKIEE_ALPHABET } from '@/constants/language';

/**
 * Transforms a word to its Wookiee counterpart
 * by running each letter thru the Wookiee alphabet
 * @param {String} word
 * @returns {String} transformed word
 */
export const translate = word => {
  const isWookieeEnabled = JSON.parse(localStorage.getItem('isWookieeEnabled'));

  if (!isWookieeEnabled) return word;

  const transformedChars = [];

  for (let i = 0; i < word.length; i++) {
    const char = word[i];
    const transformedChar = WOOKIEE_ALPHABET[char] || char;
    transformedChars.push(transformedChar);
  }

  return transformedChars.join('');
};
