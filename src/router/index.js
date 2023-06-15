import { createRouter, createWebHashHistory } from 'vue-router'
import { CATEGORY_VALUES } from '@/constants/categories'
import DetailsPage from '@/pages/DetailsPage.vue'
import HomePage from '@/pages/HomePage.vue'
import ListPage from '@/pages/ListPage.vue'

/**
 * Category route guard
 * 
 * Checks if the category param is valid
 */
function validateCategory(category) {
  return CATEGORY_VALUES.includes(category)
}

const routes = [
  { 
    path: '/',
    name: 'index',
    component: HomePage,
  },
  {
    path: '/list/:category',
    name: 'list',
    component: ListPage,
    beforeEnter: (to) => {
      return validateCategory(to.params.category)
    }
  },
  {
    path: '/details/:category/:id',
    name: 'details',
    component: DetailsPage,
    beforeEnter: (to) => {
      return validateCategory(to.params.category)
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router