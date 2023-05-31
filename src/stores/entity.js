import { defineStore } from 'pinia'
import { fetchEntity } from '@/webservices/entitiesWebservice'
import { useEntities as entitiesStore } from './entities'
import { extractId } from '@/helpers/urlHelper'
import { hasHomeworld } from '@/helpers/categoryHelper'

export const useEntity = defineStore('entity', {
  actions: {
    async fetchEntity (category, id) {
      const entities = entitiesStore()[category]?.data || []
      let data = {}

      if (entities.length) {
        // Find and return entity data if already fetched in store
        const entity = entities.find(e => {
          return extractId(e.url) === id
        })

        if (entity) data = entity
      } else {
        data = await fetchEntity(category, id)
      }

      return data
    },
  },
})
