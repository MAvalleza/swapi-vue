<script setup>
import { ref } from 'vue'
import { CATEGORIES } from '@/constants/categories'

const categories = ref(CATEGORIES)
</script>

<template lang="pug">
v-container
  h1 SWAPI Portal
  p.my-10 A collection of Star Wars characters, films, and more!

  v-list(v-for="(category, key) in categories")  
    v-list-item(
      :key="key"
      :to="{ name: 'list', params: { category: category.value } }"
    )
      v-list-item-title {{ category.text }}
</template>