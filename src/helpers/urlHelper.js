/**
 * Extracts the ID from URL
 * 
 * Note: SWAPI IDs are assumed to be numeric
 * 
 * @param {string} url
 */

export const extractId = (url) => {
  // URLs end with '/' so the last element will be an empty string, hence the filter
  const url_array = url.split('/').filter(i => i)

  // The last element will be the id
  const id = url_array[url_array.length - 1]

  return id;
}
