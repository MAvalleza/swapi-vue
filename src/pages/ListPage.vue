<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, provide, reactive, ref } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { translate } from '@/helpers/languageHelper';
import { hasNextPage, nextPage } from '@/helpers/paginationHelper';
import { useEntities } from '@/stores/entities';
import { useLanguage } from '@/stores/language';
import { useUI } from '@/stores/ui';
import EntitiesList from '@/components/entities-list/EntitiesList.vue';
import EntitiesSearchBar from '@/components/entities-list/EntitiesSearchBar.vue';

const route = useRoute();
const entitiesStore = useEntities();
const languageStore = useLanguage();
const uiStore = useUI();

const { entities } = storeToRefs(entitiesStore);

languageStore.$subscribe(() => {
  initialize();
});

let category = ref(route.params.category);
let loadingMore = ref(false);

const { loading, isSnackbarVisible, snackbar } = storeToRefs(uiStore);

const initial = {
  params: {
    page: 1,
    search: null,
  },
  total: {
    current: 0,
    overall: 0,
  },
};

let fetchParams = reactive({ ...initial.params });
let total = reactive({ ...initial.total });

provide('category', category);

// Initializer function
async function initialize() {
  uiStore.setLoading(true);

  // Reset the params since this component is reusable
  fetchParams = reactive({ ...initial.params });
  total = reactive({ ...initial.total });

  // Fetch the data
  await fetchEntities();

  uiStore.setLoading(false);
}

// Invokes store action
async function fetchEntities() {
  const { currentPage, data, totalCount } = await entitiesStore.fetchEntities(
    category.value,
    { ...fetchParams }
  );

  // Re-assigning page to keep track in search mode
  fetchParams.page = currentPage;

  total.current = data.length;
  total.overall = totalCount;
}

// Loads next set of entities for infinite scrolling purposes
async function loadNextEntities() {
  // Don't run if no next page
  if (!hasNextPage(total.overall, total.current)) {
    return;
  }

  // Increment page
  fetchParams.page = nextPage(total.current, 10);
  loadingMore.value = true;
  // Fetch next data
  await fetchEntities();

  loadingMore.value = false;
}

function searchEntities() {
  // If no search text, return to initial data
  if (!fetchParams.search) {
    entitiesStore.clearSearchData();
    return initialize();
  }

  // Invoke search
  fetchEntities();
}

onMounted(() => {
  initialize();
});

onBeforeRouteUpdate(to => {
  category.value = to.params.category;
  initialize();
});
</script>

<template lang="pug">
v-container.container
  v-snackbar(v-model="isSnackbarVisible" :color="snackbar.color") {{ snackbar.message }}
  v-row(justify="center")
    v-col(cols="12" lg="8")
      h1.text-h4.text-capitalize.text-left {{ translate(category) }}

      div.my-5
        entities-search-bar(
          :key="category"
          v-model="fetchParams.search"
          @search="searchEntities"
        )
      div(v-if="loading").text-center
        v-progress-circular(indeterminate color="primary")
      template(v-else)
        entities-list(:entities="entities" :loading="loadingMore" @load="loadNextEntities")
</template>

<style scoped>
.container {
  width: 100vw;
}
</style>
