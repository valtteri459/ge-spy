// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import vueAxios from 'vue-axios'
import 'vuetify/dist/vuetify.min.css'
import 'hchs-vue-charts'

Vue.config.productionTip = false
Vue.use(window.VueCharts)
Vue.use(vueAxios, axios)
Vue.use(Vuetify)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
