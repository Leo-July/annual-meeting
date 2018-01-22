import axios from 'axios'
import qs from 'qs'

const Axios = axios.create({
  baseURL: '/',
  timeout: 5000
})

// POST 传参序列化（添加请求拦截器）
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做某事
    if (
      config.method === 'post' ||
      config.method === 'put' ||
      config.method === 'delete'
    ) { // 序列化
      config.data = qs.stringify(config.data)
    }

    // 若是有做鉴权token，就给头部带上token
    if (localStorage.token) {
      config.headers.Authorization = localStorage.token
    }

    return config
  },
  error => {
    // 消息弹窗组件显示，类似toast
    // ...
    console.log(`request ${error.data.error.message}`)

    return Promise.reject(error.data.error.message)
  }
)

// 返回状态判断（添加响应拦截器）
Axios.interceptors.response.use(
  res => {
    // 对响应数据做些事(请求成功，当时接口返回出错)
    if (res.data && !res.data.success) {
      // 消息弹窗组件显示，类似toast
      // ...res.data.error.message
      console.log(`res ${res.data.error.message}`)

      return Promise.reject(res.data.error.message)
    }
    return res
  },
  error => {
    // 返回 response 里的错误信息
    let errorInfo = error.data.error ? error.data.error.message : error.data

    // 消息弹窗组件显示，类似toast
    // ...
    console.log(`respone ${errorInfo}`)
  }
)

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
// 直接  this.$fetch  调用其方法

export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$fetch', { value: Axios })
  }
}
