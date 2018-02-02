import Vue from 'vue'
import Router from 'vue-router'
const pc = () => import('@/views/pc.vue')
const mobile = () => import('@/views/mobile.vue')
// import pc from '@/views/pc'
// import mobile from '@/views/mobile'

Vue.use(Router)

export default new Router({
  routes: [
    {
		  path: '/pc',
		  name: 'pc',
		  component: pc
    },
    {
		  path: '/',
		  name: 'mobile',
		  component: mobile
    }
  ]
})
