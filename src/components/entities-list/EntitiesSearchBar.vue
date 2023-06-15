<script setup>
import debounce from 'lodash-es/debounce';
import { ref, toRefs } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
});

let emit = defineEmits(['update:modelValue', 'search']);

const { modelValue } = toRefs(props);

let searchText = ref(modelValue.value);

const onUpdate = debounce(e => {
  emit('update:modelValue', e);
  emit('search');
}, 1000);
</script>

<template lang="pug">
v-text-field(
  v-model="searchText"
  density="compact"
  variant="solo"
  label="Search"
  append-inner-icon="mdi-magnify"
  single-line
  hide-details
  @update:model-value="onUpdate"
)
</template>
