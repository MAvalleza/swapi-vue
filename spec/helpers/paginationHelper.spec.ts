import { nextPage, hasNextPage } from '@/helpers/paginationHelper'
import { describe, it, expect } from 'vitest'

describe('Pagination helper functions', () => {
  describe('nextPage', () => {
    it('identifies the next page number', () => {
      const total = 10
      const batchQuantity = 10

      expect(nextPage(total, batchQuantity)).toEqual(2)
    })
  })

  describe('hasNextPage', () => {
    it('returns true when currentCount is less than total', () => {
      const total = 20
      const currentCount = 10

      expect(hasNextPage(total, currentCount)).toBe(true)
    })

    it('returns false when currentCount is not less than total', () => {
      const total = 20
      const currentCount = 20

      expect(hasNextPage(total, currentCount)).toBe(false)
    })
  })
})
