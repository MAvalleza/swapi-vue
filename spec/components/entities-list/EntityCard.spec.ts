import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import EntityCard from '@/components/entities-list/EntityCard.vue';
import { describe, it, expect } from 'vitest';
import { ref } from 'vue';

import vuetify from '../../factories/vuetifyFactory';

describe('EntityCard.vue', () => {
  const ENTITY_DATA = {
    name: faker.person.fullName(),
    birth_year: faker.date.birthdate(),
    gender: faker.person.gender(),
  };

  const CATEGORY = 'people';

  const wrapper = mount(EntityCard, {
    propsData: {
      data: ENTITY_DATA,
    },
    global: {
      plugins: [vuetify],
      provide: {
        category: ref(CATEGORY),
      },
    },
  });

  it('should render entity title', () => {
    expect(wrapper.find('.entity-card-title').text()).toEqual(ENTITY_DATA.name);
  });

  it('should render entity category', () => {
    expect(wrapper.find('.entity-card-subtitle').text()).toEqual(CATEGORY);
  });

  it('should render entity basic info', () => {
    expect(wrapper.find('.entity-card-content').text()).toContain(
      ENTITY_DATA.birth_year
    );

    expect(wrapper.find('.entity-card-content').text()).toContain(
      ENTITY_DATA.gender
    );
  });

  it('should emit a click event when clicking the view button', async () => {
    const button = wrapper.find('.entity-card-view-btn');

    await button.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
