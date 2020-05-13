import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import itemsRepository from './repositories/items'

Vue.config.productionTip = false
itemsRepository.getPrefix().then(data => {
  Vue.prototype.$prefix = data.data.imagePrefix
  Vue.use(VueAxios, axios)
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}).catch(e => {
  alert('Loading essential UI elements failed, try again later (imageprefix call to backend failed')
})
