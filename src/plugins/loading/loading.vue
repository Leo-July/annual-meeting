<template>
  <div class="loading-wrapper"  v-show="show">
      <div class="loading">

  </div>
  </div>

</template>
<script>
export default {
  name: 'loading',
  data () {
    return {
      show: false
    }
  }
}
</script>
<style lang="less" scoped>
@keyframes loading {
  0% {
    transform-origin: 100% 100%;
    transform: rotate(0deg);
  }
  100% {
    transform-origin: 100% 100%;
    transform: rotate(360deg);
  }
}

* { box-sizing: border-box; }
.loading-wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
}
.loading {
  position: relative;
  display: block;
  top: 50%;
  margin: -50px auto;
  width: 100px;
  height: 100px;
  border: 5px solid transparent;
  border-radius: 50%;
  background-color: transparent;
  z-index: 13;

  &:hover {
    border-color: rgba(210, 210, 210, .5);
  }

  &:hover:before {
    background-color: rgba(210, 210, 210, .4);
  }

  &:before {
    position: absolute;
    display: block;
    content: '';
    z-index: 12;
    top: 4px;
    left: 4px;
    width: 82px;
    height: 82px;
    border-radius: 50%;
  }

  &:after {
    position: absolute;
    display: block;
    top: 0;
    content: '';
    z-index: 11;
    top: 0px;
    left: 0px;
    width: 45px;
    height: 45px;
    border-radius: 200px 0 0 0;
    background: linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(69,154,215,1) 50%,rgba(69,154,215,1) 100%);
    animation: loading .9s linear infinite;
  }
}
</style>
