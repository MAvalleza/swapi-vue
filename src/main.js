import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import DetailsPage from './pages/DetailsPage.vue'
import HomePage from './pages/HomePage.vue'
import ListPage from './pages/ListPage.vue'

// Pinia
const pinia = createPinia()

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

// Vue Router
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
  },
  {
    path: '/details/:entityType/:id',
    name: 'details',
    component: DetailsPage
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
