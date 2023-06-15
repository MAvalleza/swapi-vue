import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { faker } from '@faker-js/faker';

import DetailSection from '@/components/details-page/DetailSection.vue';

import vuetify from '../../factories/vuetifyFactory';

// Mocks
const mocks = vi.hoisted(() => {
  return {
    removeUnderscore: vi.fn(s => s),
  };
});

vi.mock('../../../src/helpers/format', () => ({
  removeUnderscore: mocks.removeUnderscore,
}));

describe('DetailSection.vue', () => {
  const props = {
    title: faker.lorem.word(),
    content: {
      key: 'value',
    },
  };

  const wrapper = mount(DetailSection, {
    propsData: props,
    global: {
      plugins: [vuetify],
    },
  });

  it('displays the details', () => {
    const title = wrapper.find('.detail-title').text();
    const detail = wrapper.find('.detail-attribute').text();
    const detailContent = wrapper.find('.detail-attribute-value').text();

    expect(title).toEqual(props.title);
    expect(detail).toEqual('key:');
    expect(detailContent).toEqual(props.content.key);
  });

  it('does not display detail attribute when valueOnly prop is true', async () => {
    await wrapper.setProps({ valueOnly: true });

    expect(wrapper.find('.detail-attribute')).toBeNull;
  });
});
