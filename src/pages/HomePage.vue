<script setup>
import { ref } from 'vue'

const entityTypes = ref([
  'Planets',
  'People',
  'Films',
  'Starships',
  'Vehicles',
  'Species',
])
</script>

<template lang="pug">
v-container
  h1 SWAPI Portal
  p.my-10 A collection of Star Wars characters, films, and more!

  v-list(v-for="(type, key) in entityTypes")  
    v-list-item(:key="key")
      v-list-item-title {{ type }}
</template>