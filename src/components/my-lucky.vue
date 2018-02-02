<template>
  <div class="lucky-wrapper">
    <!-- 签到列表 -->
    <ul class="sign-list">
      <li v-for="(item, index) in 44 " class="list-item" :class="{current: index == current}" :key="index">
        <template v-if="signList[index]">
          <div class="head" v-head="signList[index].head"></div>
          <p class="name">{{signList[index].name}}</p>
        </template>
        <template v-else>
          <div class="head"></div>
          <p class="name">暂时缺席</p>
        </template>
      </li>
      <li class="button" @click="luckyDraw">点击抽奖</li>
      <li class="shadow" v-if="luckying">蒙层</li>
    </ul>
    <!-- 中奖 -->
    <transition
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <div class="win" v-show="winShow">
        <div class="head" v-head="signList[current].head"></div>
        <p class="name">{{signList[current].name}}</p>
      </div>
    </transition>

  </div>
</template>
<script>
import velocity from 'velocity-animate'

export default {
  name: 'lucky',
  data () {
    return {
      signList: [
        {
          'head': 'http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJqibb3ibNYvm4icXNeRjGicJVD6PXzY5oIFHicD5Z6pNfrfIQicTZCeQpfzH1q5JJm3fIgVpeF7HlxPZPw\/132',
          'name': 'test'
        },
        {
          'head': 'http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJqibb3ibNYvm4icXNeRjGicJVD6PXzY5oIFHicD5Z6pNfrfIQicTZCeQpfzH1q5JJm3fIgVpeF7HlxPZPw\/132',
          'name': 'test'
        },
        {
          'head': 'http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJqibb3ibNYvm4icXNeRjGicJVD6PXzY5oIFHicD5Z6pNfrfIQicTZCeQpfzH1q5JJm3fIgVpeF7HlxPZPw\/132',
          'name': 'test'
        },
        {
          'head': 'http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJqibb3ibNYvm4icXNeRjGicJVD6PXzY5oIFHicD5Z6pNfrfIQicTZCeQpfzH1q5JJm3fIgVpeF7HlxPZPw\/132',
          'name': 'test'
        },
        {
          'head': 'http:\/\/wx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJqibb3ibNYvm4icXNeRjGicJVD6PXzY5oIFHicD5Z6pNfrfIQicTZCeQpfzH1q5JJm3fIgVpeF7HlxPZPw\/132',
          'name': 'test'
        }
      ],
      luckying: false,
      winShow: false,
      current: 0
    }
  },
  watch: {
    winShow (value) {
      const body = document.querySelector('body')

      if (value) {
        body.onclick = () => {
          this.winShow = false
          this.luckying = false
        }
      } else {
        body.onclick = () => {}
      }
    }
  },
  methods: {
    getSignList () {
      this.$fetch({
        url: 'wx.php?a=AnnualDinner&m=signInList&userName=zsyl&passWord=wazsyl'
      }).then(res => {
        this.signList = res.data
      })
    },
    luckyDraw () {
      this.luckying = true
      this.winShow = true
    },
    enter (el, done) {
      velocity(
        el,
        { height: ['3.69rem', '.12rem'] },
        { duration: 600, complete: done }
      )
    },
    leave (el, done) {
      velocity(
        el,
        { height: '.12rem' },
        { duration: 600, complete: done }
      )
    }
  }
}
</script>

<style lang="less" scoped>
@import url("../assets/less/common.less");

.lucky-wrapper {
  position: absolute;
  top: 2.3rem;
  right: 4.58rem;
  bottom: .54rem;
  left: 5.48rem;
}
.sign-list{
  display: flex;
  flex-wrap: wrap;
  margin-right:  -.3rem;
  .list-item{
    margin: 0 .2rem .15rem 0;
    &.current{
      z-index: 99;
    }
    &:nth-of-type(19),
    &:nth-of-type(25){
      margin-right: 2.56rem;
    }
    .head{
      @width: .98rem;
      width: @width;
      height: @width;
      background: #ff8b82 url('../assets/images/icon-sign.png') no-repeat center/contain;
      border-radius: .1rem;
    }
    .name{
      margin-top: .06rem;
      font-size: .22rem;
      color: #393152;
      text-align: center;
    }
  }
  .button{
    .position-center();
    margin-top: -.18rem;
    width: 2.14rem;
    height: 2.5rem;
    background: url('../assets/images/bg-button01.png') no-repeat center/contain;
    font-size: 0;
  }
  .shadow{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, .5);
    font-size: 0;
  }

}
  .win{
    position: absolute;
    top: 2.25rem;
    left: 2.84rem;
    width: 3.43rem;
    height: 3.69rem;
    box-sizing: border-box;
    background: url('../assets/images/bg-win.png') no-repeat center top / cover;
    overflow: hidden;
    &::after{
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: .12rem;
      background: url('../assets/images/bg-win.png') no-repeat center bottom / cover;
    }
    .head{
      position: relative;
      left: .02rem;
      @width: 1.6rem;
      margin: 1.15rem auto .12rem;
      width: @width  + .03rem;
      height: @width;
      border-radius: .16rem;
    }
    .name{
      text-align: center;
      color: #fff;
      font-size: .44rem;
    }
  }
</style>
