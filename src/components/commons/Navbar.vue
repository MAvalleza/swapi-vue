<script setup>
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { useDisplay } from 'vuetify';
import { CATEGORIES } from '@/constants/categories';
import { translate } from '@/helpers/languageHelper';
import { useLanguage } from '@/stores/language';

const languageStore = useLanguage();

const { isWookieeEnabled } = storeToRefs(languageStore);
const categories = ref(CATEGORIES);
const drawer = ref(false);

const switchValue = ref(false);

const { mobile } = useDisplay();

function onWookieeToggle() {
  languageStore.toggleWookiee();
  switchValue.value = isWookieeEnabled.value;
}

onMounted(() => {
  switchValue.value = isWookieeEnabled.value;
});
</script>

<template lang="pug">
v-app-bar(color="primary")
	template(v-if="mobile")
		v-app-bar-nav-icon(color="white" variant="text" @click.stop="drawer = !drawer")
	v-app-bar-title.text-h5
		router-link(:key="switchValue" :to="{ name: 'index' }").app-bar-title.font-weight-bold {{ translate('SWAPI Portal') }}
	template(v-if="!mobile")
		v-btn(
			v-for="(category, key) in categories"
			:key="key"
			:to="{ name: 'list', params: { category: category.value } }"
			text
		) {{ translate(category.text.toLowerCase()) }}
		v-spacer
		div.mr-1.pt-5
			v-switch(
				v-model="switchValue"
				label="Wookiee"
				@update:model-value="onWookieeToggle"
			)

v-navigation-drawer(
	v-model="drawer"
	location="left"
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
				@update:model-value="onWookieeToggle"
			)
</template>

<style scoped>
.app-bar-title {
  color: white !important;
}
</style>
