<script setup>
import pick from 'lodash-es/pick'
import { inject } from 'vue'

let category = inject('category')

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({})
  },
})

const CARD_DATA_MAPPINGS = {
  people: pick(props.data, ['name', 'birth_year', 'gender']),
  planets: pick(props.data, ['name', 'terrain', 'population']),
  films: pick(props.data, ['title', 'director', 'release_date']),
  starships: pick(props.data, ['name', 'manufacturer', 'cost_in_credits']),
  vehicles: pick(props.data, ['name', 'manufacturer', 'cost_in_credits']),
  species: pick(props.data, ['name', 'classification', 'designation']),
}

const CARD_DATA = CARD_DATA_MAPPINGS[category]
</script>

<template lang="pug">
v-card
  v-card-item
    v-card-subtitle.text-uppercase {{ category }}
    pre {{ props.data }}
</template>
