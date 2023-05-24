<script setup>
import { useEntities } from '@/stores/entities'
import { storeToRefs } from 'pinia'
import { onMounted, provide, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import EntitiesList from '@/components/entities-list/EntitiesList.vue'

const route = useRoute()
const entitiesStore = useEntities()
const { entities } = storeToRefs(entitiesStore)

let category = ref(route.params.category)
let loading = ref(false)

provide('category', category)

async function initialize() {
  loading.value = true
  // Reset the list
  entitiesStore.$reset
  // Fetch the data using the route params
  await entitiesStore.fetchEntities(category.value)

  loading.value = false
}

onMounted(() => {
  initialize()
})

onBeforeRouteUpdate((to, from) => {
  category.value = to.params.category
  initialize()
})
</script>

<template lang="pug">
v-container.container
  h1.text-h3.text-capitalize.text-left {{ category }}

  v-progress-circular(v-if="loading" indeterminate color="primary")
  template(v-else)
    entities-list(:entities="entities")
</template>

<style scoped>
.container {
  width: 100vw;
}
</style>