import { defineStore } from 'pinia'
import { useEntities as entitiesStore } from './entities'

export const useLanguage = defineStore('language', {
  state: () => ({
    isWookieeEnabled: JSON.parse(localStorage.getItem('isWookieeEnabled'))
  }),
  actions: {
    // Set the boolean value of isWookieeEnabled
    toggleWookiee () {
      this.isWookieeEnabled = !this.isWookieeEnabled

      localStorage.setItem('isWookieeEnabled', this.isWookieeEnabled)

      entitiesStore().$reset()
    }
  }
})