<script setup>
import pick from 'lodash-es/pick'
import { onMounted, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
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

function displayEntityTitle() {
  return entity.name || entity.title
}

function displayInformation(fields) {
  return pick(entity, fields)
}

// async function loadEntities(field) {
//   const idArray = entity[field].map(url => extractId(url))

//   // Handle special fields (e.g. residents = people)
//   const mappedCategory = mapCategory(field)

//   const promises = url_id_array.map(id => {
//     return entityStore.fetchEntity(mapp edCategory, id)
//   })

//   const data = await Promise.all(promises)
// }

// TODO: For section component, fetch the entities listed upon opening

onMounted(() => {
  initialize()
})
</script>

<template lang="pug">
div.text-center
  v-progress-circular(v-if="loading" indeterminate color="primary")
  v-container(v-else)
    div.header
      h2.text-subtitle-1.text-uppercase {{ category }}
      h1.text-h3.text-uppercase.my-3 {{ displayEntityTitle() }}

    div(
      v-for="(section, key) in getSections()"
      :key="key"
    ).details-section.my-3
      detail-section(
        :title="section.title"
        :content="displayInformation(section.fields)"
        :value-only="section.valueOnly"
      )
    // TODO: Related entities section
    //- div
    //-   related-entities-section(
    //-     :data=""
    //-     @open="loadEntities(field)"
    //-   )
</template>