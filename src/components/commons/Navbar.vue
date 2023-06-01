<script setup>
import { ref } from 'vue'
import { CATEGORIES } from '@/constants/categories'
import { translate } from '@/helpers/languageHelper'

const categories = ref(CATEGORIES)
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
	v-list-item(title="SWAPI Portal" :to="{ name: 'index' }")

	v-divider

	v-list(density="compact" nav)
		v-list-item(
			v-for="(category, key) in categories"
			:key="key"
			:to="{ name: 'list', params: { category: category.value } }"
		)
			v-list-item-title.text-capitalize {{ translate(category.text.toLowerCase()) }}
</template>
