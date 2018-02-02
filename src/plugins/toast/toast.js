import toastComponent from './toast.vue'
// import './style.less'

let toastObj = {}

export default {
  install: function (Vue) {
    if (toastObj.installed) {

    } else {
      const ToastPlugin = Vue.extend(toastComponent)
      toastObj = new ToastPlugin({
        el: document.createElement('div')
      })

      document.body.appendChild(toastObj.$el)

      Vue.prototype.$toast = (text, duration = 1500) => {
        toastObj.show = true
        toastObj.text = text
        const timer = setTimeout(() => {
          toastObj.show = false
          clearTimeout(timer)
        }, duration)
      }

      toastObj.installed = true
    }
  }
}

export const toast = (text, duration = 1500) => {
  const loadWrapper = document.querySelector('.toast-wrapper')
  loadWrapper.classList.add('visible')
  loadWrapper.innerHTML = text
  const timer = setTimeout(() => {
    loadWrapper.classList.remove('visible')
    clearTimeout(timer)
  }, duration)
}
