<script setup>
import { ref, toRefs } from 'vue'

const props = defineProps({
  modelValue: String,
})

let emit = defineEmits(['update:modelValue', 'search'])

const { modelValue } = toRefs(props)

let searchText = ref(modelValue.value)

function onUpdate(e) {
  emit('update:modelValue', e)
  emit('search')
}
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
  @update:modelValue="onUpdate"
)
</template>