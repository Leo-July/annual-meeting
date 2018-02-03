<template>
    <transition-group tag="ul" name="slide" class="barrage-container"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
    >

    <li v-for="(item, index) in barrageList" :key="index" class="barrage-item">
      <div v-if="!item.anonymous" class="head" v-head="'../../static/head/ic_head'+ item.id+'@2x.png'"></div>
      <div v-else class="head" v-head="item.head"></div>

      <p class="content">
        {{ item.content}}
      </p>
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
        min: 200,
        max: 300
      },
      color: [
        '#585858',
        '#285886',
        '#f9180b',
        '#e818ff',
        '#289918'
      ],
      colorL: 0,
      socket: null,
      socketCode: 1
    }
  },
  created () {},
  methods: {
    __init () {
      this.container = $('.barrage-container')
      this.containerW = this.container.width()
      this.containerParentH = this.container.parent().height()
      this.colorL = this.color.length
      this.__initWebSocket()
    },
    // 初始化websocket
    __initWebSocket () {
      this.socket = new WebSocket(`ws://118.190.69.213:9999?userName=zsyl&passWord=wazsyl`)
      this.socket.onmessage = this.onMessage
      this.socket.onclose = this.onClose
      this.socket.onerror = this.onError
    },
    onMessage (event) {
      const data = JSON.parse(event.data)
      if (data.code != 1) {
        this.$toast(data.content)
        return
      }
      switch (data.type) {
        case 'otherBarrage':
          this.isOtherBarrage(data)
          break
        default :
          break
      }
    },
    onError () {
      this.$toast('webSocket error')
    },
    onClose () {
      this.socketCode == 1 ? this.__initWebSocket() : false
    },
    isOtherBarrage (data) {
      this.barrageList.push(data.content)
    },
    // 随机获取定位
    positionRandom (el) {
      const height = el.offsetHeight
      const top = Math.floor(Math.random() * (this.containerParentH - height))
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
      el.style.cssText = `left: 100%;color:${this.colorRandom()}`
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function (el, done) {
      el.style.top = `${this.positionRandom(el)}px`

      velocity(el, {left: 0}, {duration: this.speedRandom(), complete: done})
    },
    afterEnter: function (el) {
      velocity(el, {left: '-100%'}, {duration: 2000,
        complete: () => {
          el.parentNode.removeChild(el)
        }})
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.__init()
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
  height: 1.25rem;
  line-height: 1;

  &::before{
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 1.54rem;
    height: .95rem;
    background: url('../assets/images/icon-cloud.png') no-repeat center bottom/cover;
    z-index: 3;
  }
  .head{
    position: absolute;
    top: 0;
    left: .46rem;
    @width: .7rem;
    width: @width;
    height: @width;
    border: 3px solid #ff827d;
    border-radius: 50%;
    z-index: 2;
  }
  .content{
    display: inline-block;
    position: absolute;
    left: 1.8em;
    bottom: .23rem;
    padding: .15rem 2em;
    font-size: .38rem;
    background: #fae9d5;
    border-radius: .68rem;
    box-shadow: .02rem .02rem .01rem .02rem rgba(0, 0, 0, .1);
    z-index: 1;
  }
}

</style>
