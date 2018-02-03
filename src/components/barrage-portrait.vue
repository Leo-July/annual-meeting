<template>
    <transition-group tag="ul" name="slide" class="barrage-container"
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
    >

    <li v-for="(item, index) in barrageList" :key="index" class="barrage-item" :class="{self: item.self}">
      <!-- head -->
      <div v-if="item.anonymous" class="head" v-head="'./head/ic_head'+ item.id+'@2x.png'"></div>
      <div v-else class="head" v-head="item.head"></div>

      <div class="info">
        <p v-if="item.anonymous" class="name">{{item.name}}</p>
        <p v-else class="name">{{anonymousNameList[item.id]}}</p>

        <p class="message">
          {{item.content}}
        </p>
      </div>
    </li>
  </transition-group>
</template>
<script>
import $ from 'zepto'
export default {
  name: 'barrage',
  props: {
    myMessageList: {
      type: Array,
      default () {
        return []
      }
    },
    anonymousNameList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      barrageList: [], // 弹幕列表
      container: null, // 弹幕容器
      containerW: 0, // 弹幕宽度
      containerH: 30, // 所有弹幕的高度 初始值是因为加了个padding-top
      containerParentH: 0 // 弹幕显示区域的高
    }
  },
  created () {},
  watch: {
    myMessageList () {
      this.barrageList.push(this.myMessageList[this.myMessageList.length - 1])
    },
    containerParentH (value) {
      console.log(value)
    }
  },
  methods: {
    __init () {
      this.container = $('.barrage-container')
      this.containerW = this.container.width()
      this.containerParentH = this.container.parent().height()
    },

    beforeEnter (el) {
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function (el, done) {
      done()
    },
    afterEnter: function (el) {
      const insertDomH = el.offsetHeight
      this.containerH += insertDomH
      this.scroll(insertDomH)
    },
    // 滚动
    scroll (insertDomH) {
      // console.log(this.containerH - this.getScrollTop()- - insertDomH)
      if (this.scrollDownY() - this.getScrollTop() - insertDomH > 40) {
        return false
      } else {
        this.scrollDown()
      }
    },
    // 获得滚动的距离
    getScrollTop () {
      return this.container.scrollTop()
    },

    // 滚动到底部
    scrollDown () {
      this.scrollTop = this.scrollDownY()
      this.container.scrollTop(this.scrollTop)
      return this.scrollTop
    },
    // 获取滚动到底部要滚动的距离
    scrollDownY () {
      const Y = this.containerH - this.containerParentH
      return Y > 0 ? Y : 0
    },
    // 手动触发滚动底部
    scrollDownHook () {
      this.containerParentH = this.container.parent().height()
      this.scrollDown()
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
  padding-top: 30px;
  width: 100%;
  box-sizing: border-box;
  mask-image: linear-gradient(to top, rgba(0,0,0,1) 96%, rgba(0,0,0,0));
  &::-webkit-scrollbar {
    display: none;
  }
}
.barrage-item {
  position: relative;
  display: flex;
  padding: 0 0 0.12rem;
  // padding: 0 0.54rem 0.12rem 0.16rem;
  width: 100%;
  box-sizing: border-box;
  color: #fff;
  z-index: 1;
  &.self{
    flex-direction: row-reverse;
    .name{
      text-align: right;
    }
    .message{
      background: #00B58F !important;
    }
  }
  &::before {
    content: "";
    flex: 0 0 .1rem;
  }
  &::after {
    content: "";
    flex: 1;
    min-width: .54rem;
  }
  .head {
    @width: 0.33rem;
    margin: 0 0.05rem;
    flex: 0 0 @width;
    height: @width;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.6);
  }
  .info {
    .name {
      margin-bottom: 0.02rem;
      font-size: 0.12rem;
      color: rgba(255, 255, 255, 0.6);
    }
    .message {
      padding: 0.1rem;
      font-size: 0.17rem;
      border-radius: 0.08rem;
      background: rgba(0, 0, 0, 0.6);
    }
  }
}
</style>
