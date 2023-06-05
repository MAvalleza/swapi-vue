<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { CATEGORIES } from '@/constants/categories'
import { translate } from '@/helpers/languageHelper'
import { useLanguage } from '@/stores/language'

const languageStore = useLanguage()

const { isWookieeEnabled } = storeToRefs(languageStore)
const categories = ref(CATEGORIES)
const drawer = ref(false)

const switchValue = ref(false)

function onWookieeToggle() {
	languageStore.toggleWookiee()
	switchValue.value = isWookieeEnabled.value
}

onMounted(() => {
	switchValue.value = isWookieeEnabled.value
})
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
	v-list-item(:title="translate('SWAPI Portal')" :to="{ name: 'index' }")

	v-divider

	v-list(density="compact" nav)
		v-list-item(
			v-for="(category, key) in categories"
			:key="key"
			:to="{ name: 'list', params: { category: category.value } }"
		)
			v-list-item-title.text-capitalize {{ translate(category.text.toLowerCase()) }}

	template(#append)
		div.pa-2
			v-switch(
				v-model="switchValue"
				label="Wookiee"
				@update:modelValue="onWookieeToggle"
			)
</template>
