import { faker } from '@faker-js/faker';
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import EntitiesSearchBar from '@/components/entities-list/EntitiesSearchBar.vue';

import vuetify from '../../factories/vuetifyFactory';

vi.mock('lodash-es/debounce', () => ({
  default: vi.fn(fn => fn),
}));

describe('EntitiesSearchBar.vue', () => {
  const wrapper = mount(EntitiesSearchBar, {
    global: {
      plugins: [vuetify],
    },
  });

  it('emits search events upon typing', async () => {
    const searchField = wrapper.find('input[type="text"]');
    const text = faker.lorem.word();

    searchField.setValue(text);

    expect(wrapper.emitted()['update:modelValue'][0]).toContain(text);
    expect(wrapper.emitted().search).toBeTruthy();
  });
});
