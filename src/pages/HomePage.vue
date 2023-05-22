<script setup>
import { ref } from 'vue'
import { ENTITY_TYPES } from '@/constants/entityTypes'

const entityTypes = ref(ENTITY_TYPES)
</script>

<template lang="pug">
v-container
  h1 SWAPI Portal
  p.my-10 A collection of Star Wars characters, films, and more!

  v-list(v-for="(type, key) in entityTypes")  
    v-list-item(
      :key="key"
      :to="{ name: 'list', params: { entityType: type.value } }"
    )
      v-list-item-title {{ type.text }}
</template>