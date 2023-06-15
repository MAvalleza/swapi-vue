import sample from 'lodash-es/sample';
import { describe, vi, afterEach, beforeEach, it, expect } from 'vitest';

import { CATEGORY_VALUES } from '@/constants/categories';
import { fetchEntities, fetchEntity } from '@/webservices/entitiesWebservice';

// Mock functions
const mocks = vi.hoisted(() => ({
  localStorageGet: vi.fn(),
  fetch: vi.fn(),
  stringify: vi.fn(),
}));

// Local storage mock
Storage.prototype.getItem = mocks.localStorageGet;

// Fetch mock
global.fetch = mocks.fetch;

// JSON parse mock
JSON.parse = vi.fn().mockImplementationOnce(() => false);

vi.mock('query-string', () => ({
  default: {
    stringify: vi.fn(),
  },
}));

function createFetchResponse() {
  return {
    json: () =>
      Promise.resolve({
        data: ['some_data'],
        count: 1,
      }),
    text: () => '',
  };
}

describe('Entities Webservice', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  const CATEGORY = sample(CATEGORY_VALUES);

  mocks.fetch.mockImplementationOnce(() => createFetchResponse());

  describe('fetchEntities', () => {
    it('calls fetch webservice', async () => {
      await fetchEntities(CATEGORY, { page: 1 });

      expect(mocks.fetch).toHaveBeenCalled();
    });
  });

  describe('fetchEntity', () => {
    it('does not call webservice when a param is missing', async () => {
      await fetchEntity(CATEGORY);

      expect(mocks.fetch).not.toHaveBeenCalled();
    });
  });
});
