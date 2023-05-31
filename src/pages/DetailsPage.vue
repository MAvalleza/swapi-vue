<script setup>
import pick from 'lodash-es/pick'
import { onMounted, ref, reactive } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { useEntity } from '@/stores/entity'
// import { mapCategory } from '@/helpers/categoryHelper'
// import { extractId } from '@/helpers/urlHelper'
import { SECTIONS } from '@/constants/details-page/content'
import DetailSection from '@/components/details-page/DetailSection.vue'

const entityStore = useEntity()
const route = useRoute()

const category = ref(route.params.category)
const id = ref(route.params.id)

let loading = ref(false)
let entity = reactive({})

// Initializer function
async function initialize() {
  loading.value = true

  entity = await entityStore.fetchEntity(category.value, id.value)

  loading.value = false
}

function getSections() {
  return SECTIONS[category.value]
}

function getName(data) {
  return data.name || data.title
}

function getInformation(fields) {
  return pick(entity, fields)
}

// TODO: For section component, fetch the entities listed upon opening

onMounted(() => {
  initialize()
})

onBeforeRouteUpdate((to, from) => {
  category.value = to.params.category
  id.value = to.params.id
  initialize()
})
</script>

<template lang="pug">
div.text-center
  v-progress-circular(v-if="loading" indeterminate color="primary")
  v-container(v-else)
    div.header
      h2.text-subtitle-1.text-uppercase {{ category }}
      h1.text-h3.text-uppercase.my-3 {{ getName(entity) }}

    div(
      v-for="(section, key) in getSections()"
      :key="key"
    ).details-section.my-3
      detail-section(
        :title="section.title"
        :content="getInformation(section.fields)"
        :value-only="section.valueOnly"
      )
    // TODO: Related entities section
    //- div
    //-   related-entities(
    //-     v-for="(fieldValue, field) in entity.populatedData"
    //-     :title="field"
    //-     :content="fieldValue"
    //-   )
</template>