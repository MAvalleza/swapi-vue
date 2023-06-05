<script setup>
import EntityCard from './EntityCard.vue'
import { inject, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { translate } from '@/helpers/languageHelper'
import { extractId } from '@/helpers/urlHelper'

const props = defineProps({
  entities: {
    type: Array,
    default: []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
let category = inject('category')

const emit = defineEmits(['load'])

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

function handleScroll(e) {
  let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
  if (bottomOfWindow) emit('load')
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
  div(v-if="loading").text-center
    v-progress-circular(indeterminate color="primary")
</template>