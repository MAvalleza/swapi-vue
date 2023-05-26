import isEmpty from 'lodash-es/isEmpty'
import { defineStore } from 'pinia'
import { fetchEntities } from '@/webservices/entitiesWebservice'

export const useEntities = defineStore('entities', {
  state: () => ({
    entities: [],
    filteredEntities: [],
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
  
      let { page, search } = options

      // First page load (usually when switching to new screen)
      // Should not be in search mode
      const isInitialLoad = !search && page === 1

      // First search load
      const isInitialSearch = search && isEmpty(this.filteredEntities)

      // Return function
      const mapReturnData = () => ({
        currentPage: page,
        data: this.entities,
        totalCount: this.totalCount,
      })
  
      // Use cached data if available
      if (this[category].data.length && isInitialLoad) {
        this.entities = this[category].data
        this.totalCount = this[category].total
        return mapReturnData()
      }

      if (isInitialSearch) page = 1

      // Call webservice
      const { count, results } = await fetchEntities(category, options)
      this.totalCount = count

      if (search) {
        // We add to array since we want to implement infinite scrolling in search results too
        if (page > 1) {
          this.filteredEntities.push(...results)
        } else {
          this.filteredEntities = results
        }

        this.entities = this.filteredEntities
        return mapReturnData()
      }

      // Cache the results
      // Note: We don't cache search results since we do not save search text across categories
      this[category].data.push(...results)
      this[category].total = count

      // Assign to `entities` so these will be displayed on the list page
      this.entities = this[category].data
      return mapReturnData()
    },
    // For clearing stored search data
    clearSearchData() {
      this.filteredEntities = []
    }
  },
})
