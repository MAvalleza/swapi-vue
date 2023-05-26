<script setup>
import debounce from 'lodash-es/debounce'
import { storeToRefs } from 'pinia'
import { onMounted, provide, reactive, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { hasNextPage, nextPage } from '@/helpers/pagination'
import { useEntities } from '@/stores/entities'
import EntitiesList from '@/components/entities-list/EntitiesList.vue'
import EntitiesSearchBar from '@/components/entities-list/EntitiesSearchBar.vue'

const route = useRoute()
const entitiesStore = useEntities()
const { entities } = storeToRefs(entitiesStore)

let category = ref(route.params.category)
let loading = ref(false)

const initial = {
  params: {
    page: 1,
    search: null
  },
  total: {
    current: 0,
    overall: 0,
  },
}

let fetchParams = reactive({ ...initial.params })
let total = reactive({ ...initial.total })

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
  fetchParams = reactive({ ...initial.params })
  total = reactive({ ...initial.total })

  // Fetch the data
  setLoading(fetchEntities)
}

// Invokes store action
async function fetchEntities() {
  const { currentPage, data, totalCount } = await entitiesStore.fetchEntities(category.value, { ...fetchParams })

  // Re-assigning page to keep track in search mode
  fetchParams.page = currentPage

  total.current = data.length
  total.overall = totalCount
}

// Loads next set of entities for infinite scrolling purposes
async function loadNextEntities() {
  // Don't run if no next page
  if (!hasNextPage(total.overall, total.current)) return

  // Increment page
  fetchParams.page = nextPage(total.current, 10)
  // Fetch next data
  fetchEntities()
}

function searchEntities() {
  // If no search text, return to initial data
  if (!fetchParams.search) {
    entitiesStore.clearSearchData()
    return initialize()
  }

  const search = debounce(fetchEntities, 1000)

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
      :key="category"
      @search="searchEntities"
    )

  div(v-if="loading").text-center
    v-progress-circular(indeterminate color="primary")
  template(v-else)
    entities-list(:entities="entities" @load="loadNextEntities")
</template>

<style scoped>
.container {
  width: 100vw;
}
</style>