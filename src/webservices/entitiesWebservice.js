import queryString from 'query-string'

const SWAPI_BASE_URL = 'https://swapi.dev/api'

function isWookieeEnabled() {
  return JSON.parse(localStorage.getItem('isWookieeEnabled'))
}

export const fetchEntities = async (category, {
  page,
  search,
}) => {
  try {
   // Remove nullish params and turn to query string
    const params = queryString.stringify({
      page,
      search,
      ...isWookieeEnabled() && { format: 'wookiee' }
    }, {
      skipNull: true,
      skipEmptyString: true
    })

    // Call the API
    const response = await fetch(`${SWAPI_BASE_URL}/${category}/?${params}`)
    
    let data = {}
    // Run thru parser function if wookiee format
    if (isWookieeEnabled()) {
      data = await parseResponse(response)
      return data
    }

    data = await response.json()
    return data
  } catch(e) {
    throw e
  }
}

export const fetchEntity = async (category, id)  => {
  try {
    if (!category || !id) return

    // Compose fetch url
    const url = `${SWAPI_BASE_URL}/${category}/${id}${isWookieeEnabled() ? '?format=wookiee' : ''}`
    // Call the API
    const response = await fetch(url)
    const data = await response.json()
  
    return data
  } catch (e) {
    throw e
  }
}

// For data where the actual request URL is supplied
export const fetchEntityByURL = async (url) => {
  try {
    if(!url) return

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