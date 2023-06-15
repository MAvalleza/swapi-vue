import { removeUnderscore } from '@/helpers/format';
import { describe, it, expect } from 'vitest';

describe('Format helper functions', () => {
  it('removes underscore from string', () => {
    expect(removeUnderscore('some_string_underscore')).toEqual(
      'some string underscore'
    );
  });
});
