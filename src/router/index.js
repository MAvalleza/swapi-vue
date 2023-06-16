import { createRouter, createWebHashHistory } from 'vue-router';
import { CATEGORY_VALUES } from '@/constants/categories';
import DetailsPage from '@/pages/DetailsPage.vue';
import HomePage from '@/pages/HomePage.vue';
import ListPage from '@/pages/ListPage.vue';
import ListLayout from '@/layouts/ListLayout.vue';

/**
 * Category route guard
 *
 * Checks if the category param is valid
 */
function validateCategory(category) {
  return CATEGORY_VALUES.includes(category);
}

const routes = [
  {
    path: '/',
    name: 'index',
    component: HomePage,
  },
  {
    path: '/list',
    component: ListLayout,
    beforeEnter: to => {
      return validateCategory(to.params.category);
    },
    children: [
      {
        path: '/list/:category',
        name: 'list',
        component: ListPage,
      },
      {
        path: '/list/:category/:id',
        name: 'details',
        component: DetailsPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
