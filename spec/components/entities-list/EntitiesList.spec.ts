import sample from 'lodash-es/sample'
import { ref } from 'vue'

import { faker } from '@faker-js/faker'
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import { CATEGORY_VALUES } from '@/constants/categories'
import EntitiesList from '@/components/entities-list/EntitiesList.vue'

import vuetify from '../../factories/vuetifyFactory'

const MOCK_ID = 'some_id'

const mockRouterPush = vi.fn()
const mocks = vi.hoisted(() => {
  return {
    translate: vi.fn(s => s),
    extractId: vi.fn(() => MOCK_ID)
  }
})

vi.mock('../../../src/helpers/languageHelper', () => ({
  translate: mocks.translate
}))

vi.mock('../../../src/helpers/urlHelper', () => ({
  extractId: mocks.extractId
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: mockRouterPush
  })),
  useRoute: vi.fn()
}))

describe('EntitiesList.vue', () => {
  const ENTITIES = [
    { url: faker.internet.url() },
    { url: faker.internet.url() },
    { url: faker.internet.url() },
  ]

  const CATEGORY = ref(sample(CATEGORY_VALUES))

  const wrapper = mount(EntitiesList, {
    shallow: true,
    propsData: {
      entities: ENTITIES,
    },
    global: {
      plugins: [vuetify],
      provide: {
        category: CATEGORY
      },
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

  it('views entity details when clicked', async () => {
    const firstEntity = wrapper.findComponent({ name: 'entity-card' })

    await firstEntity.vm.$emit('click')

    expect(mockRouterPush).toHaveBeenCalledWith({
      name: 'details',
      params: {
        category: CATEGORY.value,
        id: MOCK_ID
      }
    })
  })
})
