import { defineStore } from 'pinia'

export const useLanguage = defineStore('language', {
  state: () => ({
    isWookieeEnabled: JSON.parse(localStorage.getItem('isWookieeEnabled'))
  }),
  actions: {
    toggleWookiee () {
      this.isWookieeEnabled = !this.isWookieeEnabled

      localStorage.setItem('isWookieeEnabled', this.isWookieeEnabled)
    }
  }
})