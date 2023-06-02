import { WOOKIEE_ALPHABET } from '@/constants/language'

export const translate = (word) => {
  const isWookieeEnabled = JSON.parse(localStorage.getItem('isWookieeEnabled'))

  if (!isWookieeEnabled) return word

  const transformedChars = []

  for (let i = 0; i < word.length; i++) {
    const char = word[i].toLowerCase()
    const transformedChar = WOOKIEE_ALPHABET[char] || char
    transformedChars.push(transformedChar)
  }

  return transformedChars.join('')
}

