<script setup>
import pick from 'lodash-es/pick'
import { inject, ref } from 'vue'

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
    fields: ['birth_year', 'gender'],
    icon: '',
  },
  planets: {
    fields: ['terrain', 'population'],
    icon: '',
  },
  films: {
    fields: ['director', 'release_date'],
    icon: '',
  },
  starships: {
    fields: ['manufacturer', 'cost_in_credits'],
    icon: '',
  },
  vehicles: {
    fields: ['manufacturer', 'cost_in_credits'],
    icon: '',
  },
  species: {
    fields: ['classification', 'designation'],
    icon: '',
  }
}

function displayCardData() {
  return pick(props.data, CARD_DATA_MAPPINGS[category.value].fields)
}

function displayCardTitle() {
  return props.data.name || props.data.title
}

function formatAttribute(attr) {
  return attr.replace(/[_-]/g, " ")
}
</script>

<template lang="pug">
v-card
  v-card-item.text-left
    v-card-subtitle.text-uppercase {{ category }}
    v-card-title.text-capitalize {{ displayCardTitle() }}
  v-card-text.text-left
    p(v-for="(value, attr, index) in displayCardData()" :key="index")
      strong.font-weight-medium.text-capitalize {{ formatAttribute(attr) }}:&nbsp;
      span.text-capitalize {{ value }}
</template>
