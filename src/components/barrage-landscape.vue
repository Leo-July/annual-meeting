<template>
    <transition-group tag="ul" name="slide" class="barrage-container"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"

      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
    >

    <li v-for="(item, index) in barrageList" :key="index" class="barrage-item">
      {{ item}}
    </li>
  </transition-group>
</template>
<script>
import $ from 'zepto'
import velocity from 'velocity-animate'
export default {
  name: 'barrage',
  data () {
    return {
      barrageList: [], // 弹幕列表
      dataList: null, // 接口更新的数据
      container: null, // 弹幕容器
      containerW: 0, // 弹幕宽度
      containerParentH: 0, // 弹幕高度
      timer: null,
      speed: {
        min: 10,
        max: 30
      },
      color: [
        'pink',
        'red',
        'yellow',
        'blue'
      ],
      colorL: 0
    }
  },
  created () {},
  watch: {
    dataList (value) {
      this.barrageList.push(value)
    }
  },
  methods: {
    __init () {
      this.container = $('.barrage-container')
      this.containerW = this.container.width()
      this.containerParentH = this.container.parent().height()
      this.colorL = this.color.length
    },
    // 随机获取定位
    positionRandom () {
      const top = Math.floor(Math.random() * this.containerParentH)
      console.log('top', top)
      return top
    },
    // 获取随机字体颜色
    colorRandom () {
      const index = Math.floor(Math.random() * this.colorL)
      return this.color[index]
    },
    // 获取随机移动速度
    speedRandom () {
      const speed = this.containerW / (Math.floor(Math.random() * (this.speed.max - this.speed.min + 1) + this.speed.min))
      return speed.toFixed(3) * 1000
    },

    beforeEnter (el) {
      el.style.cssText = `top: ${this.positionRandom()}px;left: 100%;color:${this.colorRandom()}`
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function (el, done) {
      velocity(el, {left: 0}, {duration: this.speedRandom(), complete: done})
    },
    afterEnter: function (el) {
      velocity(el, {left: '-100%'}, {duration: 2000,
        complete: () => {
          el.parentNode.removeChild(el)
        }})
    },
    beforeLeave: function (el) {
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    leave: function (el, done) {
      done()
    },
    afterLeave: function (el) {
    },

    stop () {
      clearInterval(this.timer)
    }

  },
  mounted () {
    this.$nextTick(() => {
      this.__init()
      let index = 0
      this.dataList = index++
      this.timer = setInterval(() => {
        console.log(index)
        this.dataList = '傲娇给啊股东和公安噩耗额回购和耦合个i' + index++
        this.currentIndex++
      }, 2000)
    })
  }
}
</script>
<style lang="less" scoped>
.barrage-container {
  width: 100%;
  z-index: 9999;
}
.barrage-item{
  position: absolute;
  width: 100%;
}

</style>
