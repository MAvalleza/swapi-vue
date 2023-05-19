<script setup>
import { storeToRefs } from 'pinia'
import { useEntityTypesStore } from '@/stores/entityTypes'

const entityTypesStore = useEntityTypesStore()
const { entityTypes } = storeToRefs(entityTypesStore)
</script>

<template lang="pug">
v-container
  h1 SWAPI Portal
  p.my-10 A collection of Star Wars characters, films, and more!

  v-list(v-for="(type, key) in entityTypes")  
    v-list-item(:key="key")
      v-list-item-title {{ type }}
</template>