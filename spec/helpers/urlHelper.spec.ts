import { extractId } from '@/helpers/urlHelper';
import { describe, it, expect } from 'vitest';

describe('Url helper functions', () => {
  it('extracts id from url', () => {
    expect(extractId('https://some-link.com/2')).toEqual('2');
  });
});
