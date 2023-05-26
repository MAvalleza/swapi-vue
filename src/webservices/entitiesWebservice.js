import queryString from 'query-string'

const SWAPI_BASE_URL = import.meta.env.VITE_SWAPI_BASE_URL

export const fetchEntities = async (category, {
  page,
  search,
}) => {
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

    console.log('data', data)

    return data
}