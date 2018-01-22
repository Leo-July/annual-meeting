<template>
  <div class="mobile-page" v-font:mobile>
    <div class="bg" :class="{loaded: !loading}" @click="signInShow = true"><img @onload="bgComplete" src="../assets/images/ic_background@2x.png" alt="" ref="bgImg"></div>
    <!-- sign in -->
    <div class="sign-in" :class="{down: signInShow}">
      <div class="sign-form" :class="{visible: signFormS}">
        <div class="header"></div>
        <input class="name" type="text" v-model.trim="name" placeholder="请输入您的真实姓名">
        <div class="button" :class="{disabled: canSubmit}" @click="submit">确定</div>
      </div>
    </div>

    <!-- chat room -->
    <div class="chat-room">
      <!-- info -->
      <div class="info">
        <div class="head"></div>
        <div class="name-wrapper">
          <p class="nick-name">匿名：你是猪</p>
          <p class="real-name">追勤于</p>
        </div>
      </div>

      <!-- barrage -->
      <div class="comment">
        <barrage :my-message-list="myMessageList" :anonymous-name-list="anonymousNameList" ref="barrage"></barrage>
      </div>

      <!-- send message -->
      <div class="send-wrapper">
        <!-- anonymous -->
        <div class="switch" :class="{anonymous: anonymous}" @click="anonymous = !anonymous">

        </div>

        <!-- input -->
        <div class="input-send">
          <input  v-model.trim="message" @focus="messageFocus" class="input-comment" type="text" placeholder="说点什么...">
          <div class="send-button" :class="{disabled: canSend}" @click="send">send-button</div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import barrage from '@/components/barrage-portrait'
export default {
  name: 'mobile-page',
  components: {
    barrage
  },
  data () {
    return {
      loading: true,
      bgImg: null,
      signInShow: false, // 签到层显示
      name: '', // name 表单
      canSubmit: false, // 是否可以提交
      signFormS: false, // 签到form 显示
      anonymous: false, // 匿名
      message: '', // message
      myMessageList: [], // 我发送的message列表
      canSend: false, // 是否可以发送message
      barrage: null, // 弹幕组件对象
      anonymousNameList: [ // 匿名昵称
        '感觉自己萌萌哒',
        '按时女汉子',
        '我污但不色',
        '你丑你先睡',
        '乡村土鳖'
      ]
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
    signInShow (value) {
      if (value) {
        const timer = setTimeout(() => {
          this.signFormS = true
          clearTimeout(timer)
        }, 300)
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

      }
    },
    // 发送message
    send () {
      if (this.canSend) {
        this.myMessageList.push({id: 2, self: true, anonymous: this.anonymous, message: this.message, nickName: '一生所爱'})
        this.message = ''
        this.barrageScrollDown()
      }
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
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.__init()
    })
  }
}
</script>
<style lang="less" scoped>
@import url('../assets/less/common.less');
.mobile-page {
  height: 100%;
  overflow: hidden;
}
.bg {
  opacity: 0;
  transform: scale(0);
  transition: all .3s linear;
}
.loaded {
  opacity: 1;
  transform: scale(1);
}
.sign-in {
  .position-fill();
  transform: translateY(-100%);
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: 100vh;
    height: 100vh;
    border-radius: 50%;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
    transform: translateX(-50%) scale(0);
    transition: transform .3s ease-out;
  }
  &.down{
    transform: translateY(0);
    &::before{
      transform: translateX(-50%) scale(1.3);
    }
    .sign-form.visible{
      top: .58rem;
    }
  }
  .sign-form{
    position: absolute;
    top: -100%;
    left: 50%;
    padding-top: 1.8rem;
    width: 2.52rem;
    height: 5.12rem;
    box-sizing: border-box;
    text-align: center;
    background: url(../assets/images/ic_popup@2x.png) no-repeat center/contain;
    z-index: 2;
    transform: translateX(-50%);
    transition: top .3s ;
  }
  .header{
    @width: .41rem;
    margin: 0 auto .24rem;
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
  .name{
    display: block;
    margin: 0 auto .35rem;
    width: 1.7rem;
    border-bottom: 1px solid #fff;
    font-size: .18rem;
    font-weight: lighter;
    text-align: center;
    color: #fff;
    &::-webkit-input-placeholder{
      color: rgba(255,255,255,.5);
    }
  }
  .button{
    margin: 0 auto;
    width: 1.53rem;
    height: .4rem;
    line-height: .4rem;
    border-radius: .04rem;
    background: #FF9600;
    font-size: .18rem;
    color: #DF6F0C;
    box-shadow: 0 3px 0 0 #FD7100;
    &.disabled{
      color: #AE2B1E;
      background: #FFDE00;
    }
  }
}
  .chat-room{
    .position-fill();
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.6);
    .info{
      display: flex;
      align-items: center;
      padding: .1rem .15rem .22rem;
      .head{
        @width: .43rem;
        margin-right: .1rem;
        width: @width;
        height: @width;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.6);
      }
      .name-wrapper{
        flex: 1;
      }
      .nick-name{
        font-size: .17rem;
        color: #fff;
      }
      .real-name{
        font-size: .14rem;
        color: rgba(255, 255, 255, .7);
      }
    }
    .comment{
      position: relative;
      flex: 1;
      overflow: hidden;
      font-size: .17rem;
    }
  }
  .send-wrapper{
    display: flex;
    padding: 0 0 0 .15rem;
    // align-items: center;
    height: .6rem;
    box-sizing: border-box;
    background: #fff;
    overflow: hidden;
    .switch{
      position: relative;
      top: 50%;
      flex: 0 0 .44rem;
      margin-right: .3rem;
      height: .16rem;
      border-radius: .16rem;
      background: #C6C5C5;
      transition: all .3s linear;
      transform: translateY(-50%);
      &::after{
        content: "\533f";
        position: absolute;
        top: 50%;
        left: 0;
        @width: .22rem;
        width: @width;
        height: @width;
        line-height: @width;
        border-radius: 50%;
        background: #F1F1F1;
        font-size: .1rem;
        color: #C6C5C5;
        text-align: center;
        transform: translate3d(0, -50%,0);
        transition: all .3s linear;
      }
      &.anonymous{
        background: #7FDAC7;
        &::after{
          left: 100%;
          color: #fff;
          background: #00B58F;
          transform: translate3d(-100%, -50%,0);
        }
      }
    }
    .input-send{
      @height: .56rem;
      display: flex;
      align-items: center;
      position: relative;
      top: .04rem;
      padding: 0 0 0 .25rem;
      flex: 1;
      height: @height;
      border-top-left-radius: @height / 2;
      background: #F5F5F5;
      .input-comment{
        display: block;
        flex: 1;
        height: 100%;
        font-size: .15rem;
        // text-indent: .25rem;
        word-wrap: break-word;
        word-break: break-all;
        caret-color: #157CF8;
        &::-webkit-input-placeholder{
          color: #D1D1D1;
        }
      }
      .send-button{
        @width: .17rem;
        width: .56rem;
        height: 100%;
        font-size: 0;
        background-repeat: no-repeat;
        background-size: @width;
        background-position: center;
        background-image: url(../assets/images/send1@2x.png);
        &.disabled{
          background-image: url(../assets/images/send2@2x.png);
        }
      }
    }
  }
</style>
