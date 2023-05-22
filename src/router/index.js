import { createRouter, createWebHashHistory } from 'vue-router'
import { ENTITY_TYPES } from '@/constants/entityTypes'
import DetailsPage from '@/pages/DetailsPage.vue'
import HomePage from '@/pages/HomePage.vue'
import ListPage from '@/pages/ListPage.vue'

/**
 * Entity type route guard
 * 
 * Checks if the entityType param is valid
 */
function validateEntityType(entityType) {
  return ENTITY_TYPES.map(type => type.value).includes(entityType)
}
const routes = [
  { 
    path: '/',
    name: 'index',
    component: HomePage,
  },
  {
    path: '/list/:entityType',
    name: 'list',
    component: ListPage,
    beforeEnter: (to, from) => {
      return validateEntityType(to.params.entityType)
    }
  },
  {
    path: '/details/:entityType/:id',
    name: 'details',
    component: DetailsPage,
    beforeEnter: (to, from) => {
      return validateEntityType(to.params.entityType)
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router