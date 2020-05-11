import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import info from '../views/Info.vue'
import Item from '../views/Item.vue'
import Error from '../views/Error.vue'

import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/info',
    name: 'Info',
    component: info
  },
  {
    path: '/item/id',
    name: 'Item',
    component: Item
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  store.dispatch('navTabs/openTab', to)
  next()
})

export default router
