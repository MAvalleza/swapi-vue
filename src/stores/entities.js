import { defineStore } from 'pinia'
import queryString from 'query-string'

const SWAPI_BASE_URL = import.meta.env.VITE_SWAPI_BASE_URL

export const useEntities = defineStore('entities', {
  state: () => ({
    entities: [],
    totalCount: 0,
    // TODO: Optimize
    films: {
      data: [],
      total: 0,
    },
    people: {
      data: [],
      total: 0,
    },
    planets: {
      data: [],
      total: 0,
    },
    species: {
      data: [],
      total: 0,
    },
    starships: {
      data: [],
      total: 0,
    },
    vehicles: {
      data: [],
      total: 0,
    },
  }),
  actions: {
    async fetchEntities(category, options = {}) {
      if (!category) return [];
  
      const { page, search } = options

      // First page load (usually when switching to new screen)
      const isInitialLoad = !search && page === 1

      // Return function
      const mapReturnData = () => ({
        data: this.entities,
        totalCount: this.totalCount
      })
  
      // Use cached data if available and when there is no search text
      if (this[category].data.length && isInitialLoad) {
        this.entities = this[category].data
        this.totalCount = this[category].total
        return mapReturnData()
      }

      // Remove nullish attributes and turn to query string
      const params = queryString.stringify({
        page,
        search 
      }, {
        skipNull: true,
        skipEmptyString: true
      })

      // Call the API
      const response = await fetch(`${SWAPI_BASE_URL}/${category}/?${params}`)
      const data = await response.json()
      const results = data.results || []
      this.totalCount = data.count

      if (search) {
        let filteredEntities = []
        // We add to array since we want to implement infinite scrolling in search results too
        if (page > 1) {
          filteredEntities.push(...results)
        } else {
          filteredEntities = results
        }

        this.entities = filteredEntities
        return mapReturnData()
      }

      // Cache the results
      // Note: We don't cache search results since we do not save search text across categories
      this[category].data.push(...results)
      this[category].total = data.count

      // Assign to `entities` so these will be displayed on the list page
      this.entities = this[category].data
      return mapReturnData()
    }
  },
})
