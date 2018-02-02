import loadingComponent from './loading.vue'
// import './style.less'

let loading = {}

export default {
  install: function (Vue) {
    if (loading.installed) {

    } else {
      const Loadplugin = Vue.extend(loadingComponent)
      loading = new Loadplugin({
        el: document.createElement('div')
      })

      document.body.appendChild(loading.$el)

      Vue.prototype.$loading = (value) => {
        loading.show = value
      }

      loading.installed = true
    }
  }
}

export const load = (value) => {
  const loadWrapper = document.querySelector('.loading-wrapper')
  loadWrapper.style.display = 'block'
}
