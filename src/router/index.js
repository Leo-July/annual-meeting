import Vue from 'vue'
import Router from 'vue-router'
// const home = () => import('@/views/home.vue')
const pc = () => import('@/views/pc.vue')
const mobile = () => import('@/views/mobile.vue')
// const signIn = () => import('@/views/mobile/sign-in.vue')
// const chatRoom = () => import('@/views/mobile/chat-room.vue')

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
