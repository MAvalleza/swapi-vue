<script setup>
import { useEntities } from '@/stores/entities'
import { storeToRefs } from 'pinia'
import { onMounted, provide, reactive, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import EntitiesList from '@/components/entities-list/EntitiesList.vue'
import EntitiesSearchBar from '@/components/entities-list/EntitiesSearchBar.vue'

const route = useRoute()
const entitiesStore = useEntities()
const { entities } = storeToRefs(entitiesStore)

let category = ref(route.params.category)
let loading = ref(false)

const initialParams = {
  page: 1
}

let fetchParams = reactive(initialParams)

provide('category', category)

// Initializer function
async function initialize() {
  loading.value = true

  // Reset the list since this component is reusable
  entitiesStore.$reset
  fetchParams = reactive(initialParams)

  // Fetch the data
  await fetchEntities()

  loading.value = false
}

// Invokes store action
async function fetchEntities() {
  await entitiesStore.fetchEntities(category.value, {
    page: fetchParams.page
  })
}

// Loads next set of entities for infinite scrolling purposes
async function loadEntities() {
  // Increment page
  fetchParams.page += 1
  // Fetch next data
  fetchEntities()
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
  h1.text-h4.text-capitalize.text-left {{ category }}

  div.my-5
    entities-search-bar

  div(v-if="loading").text-center
    v-progress-circular(indeterminate color="primary")
  template(v-else)
    entities-list(:entities="entities" @load="loadEntities")
</template>

<style scoped>
.container {
  width: 100vw;
}
</style>