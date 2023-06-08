import sample from 'lodash-es/sample'
import { ref } from 'vue'

import { faker } from '@faker-js/faker'
import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import router from '@/router'
import { CATEGORY_VALUES } from '@/constants/categories'
import EntitiesList from '@/components/entities-list/EntitiesList.vue'

import vuetify from '../../factories/vuetifyFactory'

describe('EntitiesList.vue', () => {
  const ENTITIES = [
    { url: faker.internet.url() },
    { url: faker.internet.url() },
    { url: faker.internet.url() },
  ]

  const wrapper = shallowMount(EntitiesList, {
    propsData: {
      entities: ENTITIES,
    },
    global: {
      plugins: [vuetify, router],
      provide: {
        category: ref(sample(CATEGORY_VALUES))
      }
    },
  })


  it('displays the entities', () => {
    const cards = wrapper.findAllComponents({ name: 'entity-card' })

    expect(cards).toHaveLength(ENTITIES.length)
  })

  it('shows progress circle when loading more entities', async () => {
    await wrapper.setProps({ loading: true })

    const progressComponent = wrapper.findComponent({ name: 'v-progress-circular' })

    expect(progressComponent).toBeTruthy()
  })
})
