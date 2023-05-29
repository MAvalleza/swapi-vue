<script setup>
import { useEntity } from '@/stores/entity'
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

const entityStore = useEntity()
const { entity } = storeToRefs(entityStore)
const route = useRoute()

const category = ref(route.params.category)
const id = ref(route.params.id)

let loading = ref(false)

// Initializer function
async function initialize() {
  loading.value = true

  await entityStore.fetchEntity(category.value, id.value)

  loading.value = false
}

// TODO: For section component, fetch the entities listed upon opening

onMounted(() => {
  initialize()
})
</script>

<template lang="pug">
div.text-center
  h1 Details Page
  p {{ $route.params.category }}
  p {{ $route.params.id }}

  v-progress-circular(v-if="loading" indeterminate color="primary")
  div(v-else)
    pre {{ entity }}
</template>