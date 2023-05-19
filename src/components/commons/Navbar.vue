<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useEntityTypesStore } from '@/stores/entityTypes'

const entityTypesStore = useEntityTypesStore()
const { entityTypes } = storeToRefs(entityTypesStore)

const drawer = ref(false)

</script>

<template lang="pug">
v-app-bar(color="primary")
	v-spacer
	v-app-bar-nav-icon(color="white" variant="text" @click.stop="drawer = !drawer")

v-navigation-drawer(
	v-model="drawer"
	location="right"
	temporary
)
	v-list-item(title="SWAPI Portal")

	v-divider

	v-list(density="compact" nav)
		v-list-item(
			v-for="(type, key) in entityTypes"
			:key="key"
			:title="type"
		)
</template>
