import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Inventory from '@/components/Inventory'
import ItemSearch from '@/components/ItemSearch'
import Transactions from '@/components/Transactions'
import Item from '@/components/Item'

import CalcWrapper from '@/components/CalculatorWrapper'
import flip from '@/components/CalculatorViews/FlipCalc'
import ha from '@/components/CalculatorViews/HaCalc'
import herb from '@/components/CalculatorViews/HerbCalc'
import lunar from '@/components/CalculatorViews/LunarCalc'

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
      path: '/item/:id/:name',
      name: 'item',
      component: Item
    }, {
      path: '/transactions',
      name: 'transactions',
      component: Transactions
    }, {
      path: '/calculators',
      name: 'Calculators',
      component: CalcWrapper,
      children: [
        {
          path: 'flip',
          component: flip
        }, {
          path: 'ha',
          component: ha
        }, {
          path: 'herb',
          component: herb
        }, {
          path: 'lunar',
          component: lunar
        }
      ]
    }
  ]
})
