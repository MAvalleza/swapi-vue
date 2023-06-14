<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue'
import { translate } from '@/helpers/languageHelper'
import { useLanguage } from '@/stores/language';

const languageStore = useLanguage()
const { isWookieeEnabled } = storeToRefs(languageStore)

const BODY_TEXT = 'Your collection of Star Wars characters, planets, and more. Read more information about them now!'
</script>

<template lang="pug">
v-container(:key="isWookieeEnabled").text-center.fill-height
  v-row(justify="center") 
    v-col(cols="12" xl="8" align="center")
      h1.text-xl-h2.font-weight-bold {{ translate('SWAPI Portal') }}

      p.text-xl-h4.mt-10 {{ translate(BODY_TEXT) }}
</template>