// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axiosPlugin from './api/fetch'

// import 'zepto'

Vue.config.productionTip = false
Vue.use(axiosPlugin)

Vue.directive('font', {
  bind (el, binding) {
    let width = window.innerWidth

    let rootFontS = 0
    if (binding.arg === 'mobile') {
      rootFontS = Math.floor(width / 375 * 100)
    } else {
      rootFontS = 1000
    }
    document.querySelector('html').style.fontSize = `${rootFontS}px`
  }
})

Vue.directive('head', {
  bind (el, binding) {
    el.style.backgroundImage = binding.expression
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
