<script setup>
import { removeUnderscore } from '@/helpers/format'

const props = defineProps({
  title: String,
  content: {
    type: Object,
    default: () => ({})
  },
  // If you want to show the value only
  valueOnly: {
    type: Boolean,
    default: false
  }
})
</script>

<template lang="pug">
v-card(rounded="xl").text-left.pa-3
  template(#title)
    span.text-capitalize {{ props.title }}

  template(#text)
    slot(name="content")
      p(v-for="(value, key) in props.content")
        strong(v-if="!valueOnly").text-capitalize.font-weight-medium {{ removeUnderscore(key) }}:&nbsp;
        span {{ value }}
</template>
