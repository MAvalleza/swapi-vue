<script setup>
import { removeUnderscore } from '@/helpers/format';

const props = defineProps({
  title: {
    type: String,
    default: null,
  },
  content: {
    type: Object,
    default: () => ({}),
  },
  // If you want to show the value only
  valueOnly: {
    type: Boolean,
    default: false,
  },
});
</script>

<template lang="pug">
v-card(rounded="xl").text-left.pa-3
  template(#title)
    span.detail-title.text-capitalize {{ props.title }}

  template(#text)
    slot(name="content")
      p(v-for="(value, key) in props.content" :key="key")
        strong(v-if="!valueOnly").detail-attribute.text-capitalize.font-weight-medium {{ removeUnderscore(key) }}:&nbsp;
        span.detail-attribute-value {{ value }}
</template>
