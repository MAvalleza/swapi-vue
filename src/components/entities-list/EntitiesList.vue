<script setup>
import debounce from 'lodash-es/debounce';
import { inject, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { translate } from '@/helpers/languageHelper';
import { extractId } from '@/helpers/urlHelper';
import { ENTITY_CARD_CONTENT } from '@/constants/entities-list/card-content';
import EntityCard from './EntityCard.vue';

const props = defineProps({
  entities: {
    type: Array,
    default: () => ([]),
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
let category = inject('category');

const emit = defineEmits(['load']);

function viewEntity(entity) {
  const url = entity[translate('url')];
  const id = extractId(url);

  router.push({
    name: 'details',
    params: {
      category: category.value,
      id: id,
    },
  });
}

function getEntityConfig() {
  return ENTITY_CARD_CONTENT[category.value];
}

const handleScroll = debounce(() => {
  let bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight;
  if (bottomOfWindow) { emit('load'); }
}, 1000);

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template lang="pug">
div
  template(
    v-for="(entity, key) in props.entities"
    :key="key"
  )
    entity-card(
      :data="entity"
      :options="getEntityConfig()"
      @click="viewEntity(entity)"
    )
    v-divider
  div(v-if="loading").text-center
    v-progress-circular(indeterminate color="primary")
</template>
