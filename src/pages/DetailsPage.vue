<script setup>
import pick from 'lodash-es/pick'
import { onMounted, ref, reactive } from 'vue';
import { useRoute } from 'vue-router'
import { useEntity } from '@/stores/entity'
import { CATEGORY_VALUE } from '@/constants/categories'
import DetailSection from '@/components/details-page/DetailSection.vue'

const entityStore = useEntity()
const route = useRoute()

const category = ref(route.params.category)
const id = ref(route.params.id)

let loading = ref(false)
let entity = reactive({})

const SECTIONS = {
  [CATEGORY_VALUE.people]: [
    {
      title: 'Basic Information',
      fields: ['birth_year', 'gender']
    },
    {
      title: 'Characteristics',
      fields: ['height', 'mass', 'hair_color', 'skin_color', 'eye_color']
    }
  ],
  [CATEGORY_VALUE.planets]: [
    {
      title: 'Basic Information',
      fields: ['terrain', 'population', 'climate'],
    },
    {
      title: 'Characteristics',
      fields: ['rotation_period', 'orbital_period', 'diameter', 'gravity', 'surface_water']
    }
  ],
  [CATEGORY_VALUE.films]: [
    {
      title: 'Opening Crawl',
      fields: ['opening_crawl'],
      valueOnly: true
    },
    {
      title: 'Movie Information',
      fields: ['episode_id', 'release_date', 'director', 'producer'],
    }
  ],
  [CATEGORY_VALUE.starships]: [
    {
      title: 'Basic Information',
      fields: ['manufacturer', 'model', 'starship_class', 'cost_in_credits'],
    },
    {
      title: 'Capacity',
      fields: ['crew', 'passengers', 'cargo_capacity', 'consumables'],
    },
    {
      title: 'Characteristics',
      fields: ['length', 'max_atmosphering_speed', 'hyperdrive_rating', 'MGLT']
    },
  ],
  [CATEGORY_VALUE.vehicles]: [
    {
      title: 'Basic Information',
      fields: ['manufacturer', 'model', 'vehicle_class', 'cost_in_credits'],
    },
    {
      title: 'Capacity',
      fields: ['crew', 'passengers', 'cargo_capacity', 'consumables'],
    },
    {
      title: 'Characteristics',
      fields: ['length', 'max_atmosphering_speed'],
    },
  ],
  [CATEGORY_VALUE.species]: [
    {
      title: 'Basic Information',
      fields: ['classification', 'designation', 'language'],
    },
    {
      title: 'Characteristics',
      fields: ['average_height', 'average_lifespan', 'eye_colors', 'hair_colors']
    }
  ]
}

// Initializer function
async function initialize() {
  loading.value = true

  entity = await entityStore.fetchEntity(category.value, id.value)

  loading.value = false
}

function getSections() {
  return SECTIONS[category.value]
}

function displayEntityTitle() {
  return entity.name || entity.title
}

function displayInformation(fields) {
  return pick(entity, fields)
}

// TODO: For section component, fetch the entities listed upon opening

onMounted(() => {
  initialize()
})
</script>

<template lang="pug">
div.text-center
  v-progress-circular(v-if="loading" indeterminate color="primary")
  v-container(v-else)
    div.header
      h2.text-subtitle-1.text-uppercase {{ category }}
      h1.text-h3.text-uppercase.my-3 {{ displayEntityTitle() }}

    div(
      v-for="(section, key) in getSections()"
      :key="key"
    ).details-section.my-3
      detail-section(
        :title="section.title"
        :content="displayInformation(section.fields)"
        :value-only="section.valueOnly"
      )
</template>