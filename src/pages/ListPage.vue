<script setup>
import { useEntities } from '@/stores/entities'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const entitiesStore = useEntities()
const { entities } = storeToRefs(entitiesStore)

const category = ref(route.params.category)

async function fetchEntities(category) {
  await entitiesStore.fetchEntities(category.value)
}

onMounted(() => {
  // Reset the list
  entitiesStore.$reset

  // Fetch the data using the route params
  fetchEntities(category)
})
</script>

<template lang="pug">
v-container
  h1 List Page
  p {{ category }}

  pre {{ entities }}
</template>