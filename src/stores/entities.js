import { defineStore } from 'pinia'
import queryString from 'query-string'

const SWAPI_BASE_URL = import.meta.env.VITE_SWAPI_BASE_URL

export const useEntities = defineStore('entities', {
  state: () => ({
    entities: [],
    filteredEntities: [],
    films: [],
    people: [],
    planets: [],
    species: [],
    starships: [],
    vehicles: [],
  }),
  actions: {
    async fetchEntities(category, options = {}) {
      if (!category) return [];
  
      const { page, search } = options
      // Remove nullish attributes and turn to query string
      const params = queryString.stringify({
        page,
        search 
      }, {
        skipNull: true,
        skipEmptyString: true
      })
  
      // Use cached data if available and when there is no search text
      if (this[category].length && !search) {
        this.entities = this[category]
        return
      }

      // Call the API
      const response = await fetch(`${SWAPI_BASE_URL}/${category}/?${params}`)
      const data = await response.json()
      const results = data.results || []

      if (search) {
        // We add to array since we want to implement infinite scrolling in search results too
        if (page > 1) {
          this.filteredEntities.push(...results)
        } else {
          this.filteredEntities = results
        }

        this.entities = this.filteredEntities
        return
      }

      // Cache the results
      // Note: We don't cache search results since we do not save search text across categories
      this[category].push(...results)

      // Assign to `entities` so these will be displayed on the list page
      this.entities = this[category]
    }
  },
})
