// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axiosPlugin from './api/fetch'
import loading from '@/plugins/loading/loading.js'
import toast from '@/plugins/toast/toast.js'
import './directive'
// import 'zepto'

Vue.config.productionTip = false
Vue.use(axiosPlugin)
Vue.use(loading)
Vue.use(toast)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
