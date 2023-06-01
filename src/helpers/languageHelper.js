import { WOOKIEE_LANGUAGE } from '@/constants/language'

export const translate = (word) => {
  const language = 'wookiee'
  // Word will be returned as is
  if (language === 'default') return word

  return WOOKIEE_LANGUAGE[word]
}
