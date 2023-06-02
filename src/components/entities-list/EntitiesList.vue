<script setup>
import EntityCard from './EntityCard.vue'
import { inject, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { translate } from '@/helpers/languageHelper'
import { extractId } from '@/helpers/urlHelper'

const props = defineProps({
  entities: {
    type: Array,
    default: []
  },
})

const router = useRouter()
let category = inject('category')

const emit = defineEmits(['load'])


const loadingMore = ref(false)

function viewEntity(entity) {
  const url = entity[translate('url')]
  const id = extractId(url)

  router.push({
    name: 'details',
    params: {
      category: category.value,
      id: id
    }
  })
}

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
    entity-card(:data="entity" @click="viewEntity(entity)")
    v-divider
  v-progress-circular(v-if="loadingMore" indeterminate)
</template>