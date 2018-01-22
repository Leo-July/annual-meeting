<template>
  <div class="lucky-wrapper">
    <div class="main">
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <!-- <swiper-slide v-for="(item, index) of peopleList" :key="index"><img src="../assets/images/peak-140.jpg" :alt="index">{{index}}</swiper-slide> -->
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/peak-140.jpg"></swiper-slide>
        <swiper-slide><img src="../assets/images/city-140.jpg"></swiper-slide>
      </swiper>
    </div>

    <div class="button" @click="move">click</div>
  </div>

</template>
<script>
import 'swiper/dist/css/swiper.css'

import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  name: 'lucky',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    return {
      peopleList: [{
        headSrc: '../assets/images/city-140.jpg'
      },
      {
        headSrc: '../assets/images/peak-140.jpg'
      },
      {
        headSrc: '../assets/images/city-140.jpg'
      },
      {
        headSrc: '../assets/images/peak-140.jpg'
      }
      ],
      swiperOption: {
        updateOnImagesReady: true,
        speed: 30,
        slidesPerView: 3,
        centeredSlides: true,
        loop: true
      },
      timerInter: null,
      timerOut: null,
      swiper: null,
      moving: false
    }
  },
  watch: {
    moving (value) {
      console.log(value)
      if (value) {
        clearTimeout(this.timeOut)

        // this.swiper.autoplay.start()
        this.timerInter = setInterval(() => {
          this.swiper.slideNext()
        })
      } else {
        // this.swiper.autoplay.stop()
        let speed = 30
        clearInterval(this.timerInter)
        this.timerInter = setInterval(() => {
          this.swiper.slideNext(speed + 80)
        })
        this.timeOut = setTimeout(() => {
          clearInterval(this.timerInter)
          console.log(this.swiper.activeIndex)
          clearTimeout(this.timeOut)
        }, 1000)
      }
    }
  },

  methods: {
    move () {
      if (!this.moving) {
        if (this.swiper.animating) {
          return
        }
      }
      this.moving = !this.moving
    }
  },

  created () {

  },
  mounted () {
    this.swiper = this.$refs.mySwiper.swiper
    // this.swiper.autoplay.start()
  }
}
</script>
<style lang="less" scoped>
@import url("../assets/less/common.less");

.lucky-wrapper {
  .position-center();
  width: 500px;
  height: 200px;
  background: pink;
  overflow: hidden;
}
.main{
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 180px;
  transform: translate3d(-50%, -50%, 0);
}
.swiper-container{
  width: 100%;
  height: 100%;
}
.lucky-item {
  display: inline-block;
  @width: 80px;
  width: @width;
  height: @width;
}
.button{
  width: 40px;
  height: 20px;
  border-radius: 8px;
  background: blue;
  cursor: pointer;
}
</style>
