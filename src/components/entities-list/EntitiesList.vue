<script setup>
import EntityCard from './EntityCard.vue'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  entities: {
    type: Array,
    default: []
  },
})

const loadingMore = ref(false)

const emit = defineEmits(['load'])

async function handleScroll(e) {
  let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
  if (bottomOfWindow) {
    loadingMore.value = true
    await emit('load')
    loadingMore.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template lang="pug">
div
  template(
    v-for="(entity, key) in props.entities"
    :key="key"
  )
    entity-card(:data="entity")
    v-divider
  v-progress-circular(v-if="loadingMore" indeterminate)
</template>