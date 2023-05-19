import { defineStore } from 'pinia'
import queryString from 'query-string'
import { ref } from 'vue'

const SWAPI_BASE_URL = import.meta.env.VITE_SWAPI_BASE_URL

export const useEntities = defineStore('entities', () => {
  const people = ref([])

  function fetchEntities(entityType, options) {
    if (!entityType) return [];

    // Remove nullish attributes and turn to query string
    const params = queryString.stringify(options, {
      skipNull: true,
      skipEmptyString: true
    })

    return fetch(`${SWAPI_BASE_URL}/${entityType}/${params}`)
  }

  async function fetchPeople({
    page = 1,
    search,
  }) {
    const data = await fetchEntities('people', {
      page,
      search
    })

    people.value = data.results || []
  }

  return {
    // Data
    people,
    // Methods
    fetchPeople,
  }
})