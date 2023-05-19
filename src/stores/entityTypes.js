import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEntityTypesStore = defineStore('entityTypes', () => {
  const entityTypes = ref([
    'Planets',
    'People',
    'Films',
    'Starships',
    'Vehicles',
    'Species',
  ])

  return { entityTypes }
})