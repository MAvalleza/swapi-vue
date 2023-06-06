<script setup>
import pick from 'lodash-es/pick'
import { inject } from 'vue'
import { removeUnderscore } from '@/helpers/format'
import { translate } from '@/helpers/languageHelper'

let category = inject('category')

const props = defineProps({
  data: {
    type: Object,
    required: true,
    default: () => ({})
  },
})

const emit = defineEmits(['click'])

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
  const fields = CARD_DATA_MAPPINGS[category.value].fields
    .map(field => translate(field))

  return pick(props.data, fields)
}

function displayCardTitle() {
  return props.data[translate('name')] || props.data[translate('title')]
}

function formatAttribute(attr) {
  return removeUnderscore(attr)
}
</script>

<template lang="pug">
v-card
  v-card-item.text-left
    v-card-subtitle.text-uppercase {{ translate(category) }}
    v-card-title.text-capitalize {{ displayCardTitle() }}
  v-card-text.text-left
    p(v-for="(value, attr, index) in displayCardData()" :key="index")
      strong.font-weight-medium.text-capitalize {{ formatAttribute(attr) }}:&nbsp;
      span.text-capitalize {{ value }}
  v-card-actions
    v-spacer
    v-btn(variant="outlined" color="primary" @click="emit('click')") View
</template>
