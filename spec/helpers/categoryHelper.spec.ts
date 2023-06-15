import { mapCategory } from '@/helpers/categoryHelper';
import { describe, it, expect } from 'vitest';

describe('Category helper functions', () => {
  it('returns the category represented', () => {
    const CUSTOM_MAPPINGS = {
      characters: 'people',
      residents: 'people',
      pilots: 'people',
      homeworld: 'planets',
    };

    Object.keys(CUSTOM_MAPPINGS).forEach(k => {
      expect(mapCategory(k)).toEqual(CUSTOM_MAPPINGS[k]);
    });
  });
});
