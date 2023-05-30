import { defineStore } from 'pinia'
import { fetchEntity } from '@/webservices/entitiesWebservice'

export const useEntity = defineStore('entity', {
  actions: {
    async fetchEntity (category, id) {
      const data = await fetchEntity(category, id)
      return data
    },
  },
})
