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
  people: {
    content: pick(props.data, ['birth_year', 'gender']),
    icon: '',
  },
  planets: {
    content: pick(props.data, ['terrain', 'population']),
    icon: '',
  },
  films: {
    content: pick(props.data, ['director', 'release_date']),
    icon: '',
  },
  starships: {
    content: pick(props.data, ['manufacturer', 'cost_in_credits']),
    icon: '',
  },
  vehicles: {
    content: pick(props.data, ['manufacturer', 'cost_in_credits']),
    icon: '',
  },
  species: {
    content: pick(props.data, ['classification', 'designation']),
    icon: '',
  }
}

const CARD_DATA = CARD_DATA_MAPPINGS[category.value].content
const CARD_TITLE = props.data.name || props.data.title

function formatAttribute(attr) {
  return attr.replace(/[_-]/g, " ")
}
</script>

<template lang="pug">
v-card
  v-card-item.text-left
    v-card-subtitle.text-uppercase {{ category }}
    v-card-title.text-capitalize {{ CARD_TITLE }}
  v-card-text.text-left
    p(v-for="(value, attr, index) in CARD_DATA" :key="index")
      strong.font-weight-medium.text-capitalize {{ formatAttribute(attr) }}:&nbsp;
      span.text-capitalize {{ value }}
</template>
