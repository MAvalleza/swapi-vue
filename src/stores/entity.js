import { defineStore } from 'pinia'
import { fetchEntity } from '@/webservices/entitiesWebservice'

export const useEntity = defineStore('entity', {
  state: () => ({
    entity: {}
  }),
  actions: {
    async fetchEntity (category, id) {
      const data = await fetchEntity(category, id)
      this.entity = data

      return data
    },
  },
})
