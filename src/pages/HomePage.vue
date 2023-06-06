<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { CATEGORIES } from '@/constants/categories'
import { translate } from '@/helpers/languageHelper'

const categories = ref(CATEGORIES)
</script>

<template lang="pug">
v-container.text-center
  h1 {{ translate('SWAPI Portal') }}

  div.mt-10
    v-list(v-for="(category, key) in categories")  
      v-list-item(
        :key="key"
        :to="{ name: 'list', params: { category: category.value } }"
      )
        v-list-item-title.text-capitalize {{ translate(category.text.toLowerCase()) }}
</template>