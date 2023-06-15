<script setup>
import { isArray, isEmpty, pick } from 'lodash-es';
import { onMounted, ref, reactive } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { mapCategory } from '@/helpers/categoryHelper';
import { translate } from '@/helpers/languageHelper';
import { extractId } from '@/helpers/urlHelper';
import { useEntity } from '@/stores/entity';
import { useLanguage } from '@/stores/language';
import { SECTIONS } from '@/constants/details-page/content';
import DetailSection from '@/components/details-page/DetailSection.vue';

const entityStore = useEntity();
const languageStore = useLanguage();
const route = useRoute();

const category = ref(route.params.category);
const id = ref(route.params.id);

let loading = ref(false);

let isSnackbarVisible = ref(false);
let snackbar = reactive({
  color: '',
  text: '',
});

let entity = reactive({});

languageStore.$subscribe(() => {
  initialize();
});

// Initializer function
async function initialize() {
  try {
    loading.value = true;

    // Fetch entity data
    entity = await entityStore.fetchEntity(category.value, id.value);
  } catch (e) {
    snackbar.color = 'error';
    snackbar.text = 'There was an error in fetching this entity';
    isSnackbarVisible.value = true;
  } finally {
    loading.value = false;
  }
}

function getSections() {
  return SECTIONS[category.value];
}

function getName(data) {
  return data[translate('name')] || data[translate('title')];
}

function getInformation(fields) {
  return pick(
    entity,
    fields.map(field => translate(field))
  );
}

function getLink(category, data) {
  // Mapping to correct category link (e.g. homeworld -> planets)
  const mappedCategory = mapCategory(category);
  const id = extractId(data[translate('url')]);

  return `/list/${mappedCategory}/${id}`;
}

onMounted(() => {
  initialize();
});

onBeforeRouteUpdate((to) => {
  category.value = to.params.category;
  id.value = to.params.id;
  initialize();
});
</script>

<template lang="pug">
div.text-center
  v-snackbar(v-model="isSnackbarVisible" :color="snackbar.color") {{ snackbar.text }}
  v-progress-circular(v-if="loading" indeterminate color="primary").mt-10
  v-container(v-else-if="!isEmpty(entity)")
    div.header
      h2.text-subtitle-1.text-uppercase {{ translate(category) }}
      h1.text-h3.text-uppercase.my-3 {{ getName(entity) }}
    v-row(justify="center")
      v-col(cols="12" lg="8")
        div(
          v-for="(section, key) in getSections()"
          :key="key"
        ).details-section.my-3
          detail-section(
            :title="translate(section.title)"
            :content="getInformation(section.fields)"
            :value-only="section.valueOnly"
          )
        // Populated entities
        div(
          v-for="(fieldValue, field) in entity.populatedData"
          :key="field"
        ).my-3
          detail-section(:title="field")
            template(#content)
              // Multiple data (e.g. `people`, `vehicles`)
              template(v-if="isArray(fieldValue)")
                router-link(
                  v-for="(item, key) in fieldValue" :key="key"
                  :to="getLink(field, item)"
                )
                  p {{ getName(item) }}
              // Singular data (e.g. `homeworld`)
              router-link(v-else :to="getLink(field, fieldValue)") {{ getName(fieldValue) }}
</template>

<style scoped>
.header {
  overflow-wrap: break-word;
}
</style>
