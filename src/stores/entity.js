import {
  isEmpty,
  isArray,
  omitBy,
  pick
} from 'lodash-es'
import { defineStore } from 'pinia'
import { fetchEntity, fetchEntityByURL } from '@/webservices/entitiesWebservice'
import { useEntities as entitiesStore } from './entities'
import { extractId } from '@/helpers/urlHelper'
import { CATEGORY_VALUES } from '../constants/categories'

const ENTITY_FIELDS = [
  ...CATEGORY_VALUES,
  'characters',
  'homeworld',
  'residents',
  'pilots'
]

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
      }

      if (isEmpty(data)) {
        data = await fetchEntity(category, id)
      }

      /**
       * Populate related entities
       *
       * Related entities
       * (e.g. 'homeworld' in a people entity refers to a `planet` entity)
       */
      data.populatedData = await this.populateEntities(data)

      return data
    },
    // Populate related entities by fetching
    async populateEntities (data) {
      const entityFields = omitBy(pick(data, ENTITY_FIELDS), isEmpty)
      let populatedData = {}

      // The callback function needs to be awaited
      await Promise.all(
        Object.keys(entityFields).map(async (field) => {
          const urlValue = entityFields[field]

          // Checks if there are multiple urls
          if (isArray(urlValue)) {
            // Fetches all and adds it to a field in the populated data
            const promises = urlValue.map(url => fetchEntityByURL(url))

            populatedData[field] = await Promise.all(promises)
          } else {
            populatedData[field] = await fetchEntityByURL(urlValue)
          }
        })
      )

      return populatedData
    }
  },
})
