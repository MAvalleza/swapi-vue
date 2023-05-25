<script setup>
import { useEntities } from '@/stores/entities'
import debounce from 'lodash-es/debounce'
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
  page: 1,
  search: null
}

let fetchParams = reactive(initialParams)

provide('category', category)

// Loading wrapper function
async function setLoading(func) {
  loading.value = true
  await func()
  loading.value = false
}

// Initializer function
function initialize() {
  // Reset the params since this component is reusable
  fetchParams = reactive(initialParams)

  // Fetch the data
  // setLoading(fetchEntities)
  fetchEntities()
}

// Invokes store action
async function fetchEntities() {
  console.log('i will fetch', fetchParams)
  await entitiesStore.fetchEntities(category.value, { ...fetchParams })
}

// Loads next set of entities for infinite scrolling purposes
async function loadEntities() {
  // Increment page
  fetchParams.page += 1
  // Fetch next data
  fetchEntities()
}

// TODO: FIX SEARCH
function searchEntities() {
  console.log('emitted', fetchParams.search)
  const search = debounce(fetchEntities, 500)

  // Invoke search
  setLoading(search)
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
    entities-search-bar(
      v-model="fetchParams.search"
      @search="searchEntities"
    )

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