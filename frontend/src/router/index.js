import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Inventory from '@/components/Inventory'
import ItemSearch from '@/components/ItemSearch'
import InvHistory from '@/components/InvHistory'
import Transactions from '@/components/Transactions'

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
    }, {
      path: '/search',
      name: 'search',
      component: ItemSearch
    }, {
      path: '/valueHistory',
      name: 'valueHitory',
      component: InvHistory
    }, {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    }
  ]
})
