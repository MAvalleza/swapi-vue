import queryString from 'query-string'

const SWAPI_BASE_URL = 'https://swapi.dev/api'

export const fetchEntities = async (category, {
  page,
  search,
}) => {
  try {
    const wookiee = true
   // Remove nullish attributes and turn to query string
    const params = queryString.stringify({
      page,
      search,
      format: 'wookiee'
    }, {
      skipNull: true,
      skipEmptyString: true
    })

    // Call the API
    const response = await fetch(`${SWAPI_BASE_URL}/${category}/?${params}`)
    const data = await parseResponse(response)

    return data
  } catch(e) {
    throw e
  }
}

export const fetchEntity = async (category, id)  => {
  try {
    // Call the API
    const response = await fetch(`${SWAPI_BASE_URL}/${category}/${id}`)
    const data = await response.json()
  
    return data
  } catch (e) {
    throw e
  }
}

// For data where the actual request URL is supplied
export const fetchEntityByURL = async (url) => {
  try {
    // Call the API
    const response = await fetch(url)
    const data = await response.json()
  
    return data
  } catch (e) {
    throw e
  }
}

const parseResponse = async (response) => {
  let responseText = await response.text()

  // Parse the Wookiee representation of `null`
  responseText = responseText.replace(/whhuanan/g, '"whhuanan"')

  // Parse special characters
  responseText = responseText.replace(/\\r/g, '\\r')
    .replace(/\\wh/g, '\\n')

  return JSON.parse(responseText)
}