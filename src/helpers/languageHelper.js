import { WOOKIEE_LANGUAGE } from '@/constants/language'

export const translate = (word) => {
  const isWookieeEnabled = JSON.parse(localStorage.getItem('isWookieeEnabled'))

  if (isWookieeEnabled) return WOOKIEE_LANGUAGE[word]

  return word
}

