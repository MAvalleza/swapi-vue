<script setup>
import EntityCard from './EntityCard.vue'

const props = defineProps({
  entities: {
    type: Array,
    default: []
  },
})
</script>

<template lang="pug">
div(
  v-for="(entity, key) in props.entities"
  :key="key"
)
  entity-card(:data="entity")
  v-divider
</template>