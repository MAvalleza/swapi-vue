<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { CATEGORIES } from '@/constants/categories'
import { translate } from '@/helpers/languageHelper'
import { useLanguage } from '@/stores/language';

const languageStore = useLanguage()
const { isWookieeEnabled } = storeToRefs(languageStore)

const categories = ref(CATEGORIES)
</script>

<template lang="pug">
v-container(:key="isWookieeEnabled").text-center
  h1 {{ translate('SWAPI Portal') }}

  div.mt-10
    v-list(v-for="(category, key) in categories")  
      v-list-item(
        :key="key"
        :to="{ name: 'list', params: { category: category.value } }"
      )
        v-list-item-title.text-capitalize {{ translate(category.text.toLowerCase()) }}
</template>