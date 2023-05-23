import { defineStore } from 'pinia'
import queryString from 'query-string'

const SWAPI_BASE_URL = import.meta.env.VITE_SWAPI_BASE_URL

export const useEntities = defineStore('entities', {
  state: () => ({
    entities: [],
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
  
      const response = await fetch(`${SWAPI_BASE_URL}/${category}/${params}`)
      const data = await response.json()
  
      this[category] = data.results || []

      // Assign to `entities` so this will be displayed on the list page
      this.entities = this[category]
    }
  },
})
