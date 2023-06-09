import { translate } from '@/helpers/languageHelper'
import { describe, it, expect, vi } from 'vitest'

// Mocks
const mockLocalStorageGet = vi.fn()
Storage.prototype.getItem = mockLocalStorageGet

describe('Language helper functions', () => {
  it('translates the string to wookiee when Wookiee is enabled', () => {
    mockLocalStorageGet.mockImplementationOnce(() => true)

    expect(translate('people')).toEqual('akwoooakanwo')
  })

  it('returns the string when Wookiee is not enabled', () => {
    mockLocalStorageGet.mockImplementationOnce(() => false)

    expect(translate('people')).toEqual('people')
  })
})