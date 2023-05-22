<script setup>
import { useEntities } from '@/stores/entities'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const entitiesStore = useEntities()
const { entities } = storeToRefs(entitiesStore)

const entityType = ref(route.params.entityType)

async function fetchEntities(entityType) {
  await entitiesStore.fetchEntities(entityType.value)
}

onMounted(() => {
  // Reset the list
  entitiesStore.$reset

  // Fetch the data using the route params
  fetchEntities(entityType)
})
</script>

<template lang="pug">
v-container
  h1 List Page
  p {{ entityType }}

  pre {{ entities }}
</template>