<template>
  <div class="mobile-page" v-font:mobile>
    <div class="bg" :class="{loaded: !loading}" @click="signShow = true"><img @onload="bgComplete" src="../assets/images/ic_background@2x.png" alt="" ref="bgImg"></div>
    <!-- sign in -->
    <transition
      v-on:enter="enter"
      v-on:leave="leave"
    >
      <div class="sign-in" v-if="signShow">
        <div class="sign-form" ref="signForm">
          <div class="header" v-head="personInfo.head"></div>
          <input class="name" type="text" v-model.trim="name" placeholder="请输入您的真实姓名">
          <div class="button" :class="{disabled: canSubmit}" @click="submit">确定</div>
        </div>
      </div>
    </transition>

    <!-- chat room -->
    <div class="chat-room" v-if="chatShow">
      <!-- info -->
      <div class="info">
        <div class="head" v-head="personInfo.head"></div>
        <div class="name-wrapper">
          <p class="nick-name">匿名：{{anonymousNameList[personInfo.id]}}</p>
          <p class="real-name">{{personInfo.name}}</p>
        </div>
      </div>

      <!-- barrage -->
      <div class="comment">
        <barrage :my-message-list="myMessageList" :anonymous-name-list="anonymousNameList" ref="barrage"></barrage>
      </div>

      <!-- send message -->
      <div class="send-wrapper">
        <!-- anonymous -->
        <div class="switch" :class="{anonymous: anonymous}" @click="switchAnonymous">

        </div>

        <!-- input -->
        <div class="input-send">
          <input  v-model.trim="message" @focus="messageFocus" class="input-comment" type="text" placeholder="说点什么..." ref="message">
          <div class="send-button" :class="{disabled: canSend}" @click="send">send-button</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import barrage from '@/components/barrage-portrait'
import velocity from 'velocity-animate'
import anonymousList from '@/assets/js/anonymousList.js'

export default {
  name: 'mobile-page',
  components: {
    barrage
  },
  data () {
    return {
      loading: true,
      bgImg: null,
      personInfo: {},
      socket: null,
      socketCode: 1,
      name: '', // name 表单
      canSubmit: false, // 是否可以提交
      signShow: false, // 签到form 显示
      chatShow: false, // 聊天室显示

      anonymous: false, // 匿名
      message: '', // message
      myMessageList: [], // 我发送的message列表
      canSend: false, // 是否可以发送message
      barrage: null, // 弹幕组件对象
      anonymousNameList: anonymousList
    }
  },
  watch: {
    name (value) {
      if (value.length >= 2) {
        this.canSubmit = true
      } else {
        this.canSubmit = false
      }
    },
    message (value) {
      if (value.length > 0) {
        this.canSend = true
      } else {
        this.canSend = false
      }
    }
  },
  methods: {
    __init () {
      this.bgImg = this.$refs.bgImg
      this.bgComplete()
      this.getPersonInfo()
    },
    getPersonInfo () {
      this.$fetch({
        url: 'wx.php?a=AnnualDinner&m=user'
      }).then(res => {
        this.personInfo = res.data.content
        this.__initWebSocket()

        if (this.personInfo.name != '') {
          this.chatShow = true
        } else {
          this.signShow = true
        }
      })
    },
    // 背景图片加载完成
    bgComplete () {
      const timer = setTimeout(() => {
        this.loading = false
        clearTimeout(timer)
      }, 500)
    },
    // 签到 提交
    submit () {
      if (this.canSubmit) {
        this.socket.send(JSON.stringify({'type': 'signIn', 'name': this.name}))
      }
    },
    // 发送message
    send () {
      if (this.canSend) {
        this.$refs.message.focus()
        this.socket.send(JSON.stringify({
          type: 'barrage',
          content: this.message,
          anonymous: this.anonymous ? 1 : 0
        }))
      }
    },
    // 匿名 切换
    switchAnonymous () {
      this.anonymous = !this.anonymous
      this.$refs.message.focus()
    },
    // message input 获取焦点后
    messageFocus () {
      this.barrageScrollDown()
    },
    // 手动触发弹幕滚动到底部
    barrageScrollDown () {
      this.barrage ? false : (this.barrage = this.$refs.barrage)
      setTimeout(() => {
        this.barrage.scrollDownHook()
      }, 500)
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    enter: function (el, done) {
      velocity(
        this.$refs.signForm,
        { top: ['.58rem', '-100vh'] },
        { duration: 600, complete: done }
      )
    },
    // 此回调函数是可选项的设置
    // 与 CSS 结合时使用
    leave: function (el, done) {
      velocity(
        this.$refs.signForm,
        {top: '-100vh'},
        { duration: 3000, complete: done }
      )
    },
    __initWebSocket () {
      this.socket = new WebSocket(`ws://118.190.69.213:9999?id=${this.personInfo.id}&sign=${this.personInfo.sign}`)
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
        case 'signIn':
          this.isSignIn()
          break
        case 'otherBarrage':
          this.isOtherBarrage(data)
          break
        case 'barrage':
          this.isBarrage()
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
      this.myMessageList.push(data.content)
    },
    isSignIn (data) {
      this.signShow = false
      this.chatShow = true
    },
    isBarrage () {
      this.myMessageList.push({
        ...this.personInfo,
        content: this.message,
        self: true,
        anonymous: this.anonymous
      })
      this.message = ''
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.__init()
    })
  },
  beforeDestroy () {
    this.socketCode = 0
    this.socket.close()
  }
}
</script>
<style lang="less" scoped>
@import url("../assets/less/common.less");
.mobile-page {
  height: 100%;
  overflow: hidden;
}
.bg {
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s linear;
}
.loaded {
  opacity: 1;
  transform: scale(1);
}
.sign-in {
  .position-fill();
  overflow: hidden;
  &::before {
    content: "";
    .position-fill();
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
  }
  .sign-form {
    position: absolute;
    top: 0.58rem;
    left: 50%;
    margin-left: -1.26rem;
    padding-top: 1.8rem;
    width: 2.52rem;
    height: 5.12rem;
    box-sizing: border-box;
    text-align: center;
    background: url(../assets/images/ic_popup@2x.png) no-repeat center/contain;
    z-index: 2;
  }
  .header {
    @width: 0.41rem;
    margin: 0 auto 0.24rem;
    width: @width;
    height: @width;
    border: 1px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.6);
  }
  .name {
    display: block;
    margin: 0 auto 0.35rem;
    width: 1.7rem;
    border-bottom: 1px solid #fff;
    font-size: 0.18rem;
    font-weight: lighter;
    text-align: center;
    color: #fff;
    &::-webkit-input-placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .button {
    margin: 0 auto;
    width: 1.53rem;
    height: 0.4rem;
    line-height: 0.4rem;
    border-radius: 0.04rem;
    background: #ff9600;
    font-size: 0.18rem;
    color: #df6f0c;
    box-shadow: 0 3px 0 0 #fd7100;
    &.disabled {
      color: #ae2b1e;
      background: #ffde00;
    }
  }
}
.chat-room {
  .position-fill();
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);
  .info {
    display: flex;
    align-items: center;
    padding: 0.1rem 0.15rem 0.22rem;
    .head {
      @width: 0.43rem;
      margin-right: 0.1rem;
      width: @width;
      height: @width;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
    }
    .name-wrapper {
      flex: 1;
    }
    .nick-name {
      font-size: 0.17rem;
      color: #fff;
    }
    .real-name {
      font-size: 0.14rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }
  .comment {
    position: relative;
    flex: 1;
    font-size: 0.17rem;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
.send-wrapper {
  display: flex;
  padding: 0 0 0 0.15rem;
  // align-items: center;
  height: 0.6rem;
  box-sizing: border-box;
  background: #fff;
  overflow: hidden;
  .switch {
    position: relative;
    top: 50%;
    flex: 0 0 0.44rem;
    margin-right: 0.3rem;
    height: 0.16rem;
    border-radius: 0.16rem;
    background: #c6c5c5;
    transition: all 0.3s linear;
    transform: translateY(-50%);
    &::after {
      content: "\533f";
      position: absolute;
      top: 50%;
      left: 0;
      @width: 0.22rem;
      width: @width;
      height: @width;
      line-height: @width;
      border-radius: 50%;
      background: #f1f1f1;
      font-size: 0.1rem;
      color: #c6c5c5;
      text-align: center;
      transform: translate3d(0, -50%, 0);
      transition: all 0.3s linear;
    }
    &.anonymous {
      background: #7fdac7;
      &::after {
        left: 100%;
        color: #fff;
        background: #00b58f;
        transform: translate3d(-100%, -50%, 0);
      }
    }
  }
  .input-send {
    @height: 0.56rem;
    display: flex;
    align-items: center;
    position: relative;
    top: 0.04rem;
    padding: 0 0 0 0.25rem;
    flex: 1;
    height: @height;
    border-top-left-radius: @height / 2;
    background: #f5f5f5;
    .input-comment {
      display: block;
      flex: 1;
      height: 100%;
      font-size: 0.15rem;
      // text-indent: .25rem;
      word-wrap: break-word;
      word-break: break-all;
      caret-color: #157cf8;
      &::-webkit-input-placeholder {
        color: #d1d1d1;
      }
    }
    .send-button {
      @width: 0.17rem;
      width: 0.56rem;
      height: 100%;
      font-size: 0;
      background-repeat: no-repeat;
      background-size: @width;
      background-position: center;
      background-image: url(../assets/images/send1@2x.png);
      &.disabled {
        background-image: url(../assets/images/send2@2x.png);
      }
    }
  }
}
</style>
