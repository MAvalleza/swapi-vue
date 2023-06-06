/**
 * Identify the next page number
 * 
 * We get the current page then add one
 * 
 * @param {number} total - total number of items currently displayed
 * @param {number} batchQuantity - number of items per batch (e.g 10 items per page)
 * @returns {number}
 */

export const nextPage = (total, batchQuantity) => {
  const currentPage = Math.floor(total / batchQuantity)
  return currentPage + 1
}

/**
 * Identify if we have a next page by comparing the current total
 * to the actual total
 *
 * @param {number} total - total results of the query
 * @param {number} currentCount  - current total displayed
 * @returns {boolean}
 */
export const hasNextPage = (total, currentCount) => {
  return currentCount < total
}