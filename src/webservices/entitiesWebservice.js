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

    return data
}

export const fetchEntity = async (category, id)  => {
  // Call the API
  const response = await fetch(`${SWAPI_BASE_URL}/${category}/${id}`)
  const data = await response.json()

  return data
}

// For data where the actual request URL is supplied
export const fetchEntityByURL = async (url) => {
  // Call the API
  const response = await fetch(url)
  const data = await response.json()

  return data
}