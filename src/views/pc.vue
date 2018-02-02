<template>
  <div class="pc-page" v-font>
    <swiper :options="swiperOption">
      <swiper-slide class="home slide">
      </swiper-slide>
      <swiper-slide class="lucky slide">
        <lucky></lucky>
      </swiper-slide>
    </swiper>
    <!-- <div class="barrage-wrapper">
      <barrage></barrage>
    </div> -->
  </div>
</template>
<script>
import barrage from '@/components/barrage-landscape.vue'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import lucky from '@/components/my-lucky'

export default {
  components: {
    barrage,
    swiper,
    swiperSlide,
    lucky
  },
  data () {
    return {
      swiperOption: {
        updateOnImagesReady: true,
        height: window.innerHeight,
        direction: 'vertical',
        keyboard: true
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pc-page{
  height: 100%;
  overflow: hidden;
}
.slide{
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100vw 100vh;
  &.home{
    background-image: url('../assets/images/bg-pc01.png')
  }
  &.lucky{
    background-image: url('../assets/images/bg-pc02.png')
  }
}
.barrage-wrapper{
  width: 300px;
  height: 400px;
  background: yellowgreen;
  overflow: hidden;
}
</style>
