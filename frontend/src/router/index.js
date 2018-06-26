import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Inventory from '@/components/Inventory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    }, {
      path: '/inventory',
      name: 'inventory',
      component: Inventory
    }
  ]
})
