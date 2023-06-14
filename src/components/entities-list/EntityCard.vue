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
  /**
   * Render options
   * @param {String} options.title - The title field of the entity
   * @param {String[]} options.contentFields - The fields of the entity to display
   */
  options: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

function displayCardData() {
  const fields = props.options.contentFields
    .map(field => translate(field))

  return pick(props.data, fields)
}

function displayCardTitle() {
  const title = translate(props.options.title)
  return props.data[title]
}

function formatAttribute(attr) {
  return removeUnderscore(attr)
}
</script>

<template lang="pug">
v-card
  v-card-item.text-left
    v-card-subtitle.entity-card-subtitle.text-uppercase {{ translate(category) }}
    v-card-title.entity-card-title.text-capitalize {{ displayCardTitle() }}
  v-card-text.entity-card-content.text-left
    p(v-for="(value, attr, index) in displayCardData()" :key="index")
      strong.font-weight-medium.text-capitalize {{ formatAttribute(attr) }}:&nbsp;
      span.text-capitalize {{ value }}
  v-card-actions
    v-spacer
    v-btn(variant="outlined" color="primary" @click="emit('click')").entity-card-view-btn View
</template>
