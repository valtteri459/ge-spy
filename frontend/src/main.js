// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import axios from 'axios'
import vueAxios from 'vue-axios'
import VueMuuri from 'vue-muuri'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'vue-muuri/dist/vue-muuri.css'
import 'vuetify/dist/vuetify.min.css'
import 'hchs-vue-charts'

Vue.config.productionTip = false
Vue.use(VueMuuri)
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
