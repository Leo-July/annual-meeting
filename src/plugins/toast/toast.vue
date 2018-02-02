<template>
  <div class="toast-wrapper" :class="{visible: show}">
    {{text}}
  </div>

</template>
<script>
export default {
  name: 'loading',
  data () {
    return {
      text: '',
      show: false
    }
  }
}
</script>
<style lang="less" scoped>
// @import url('../../assets/less/common');
.toast-wrapper {
  // .position-center();
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0.1rem 1em;
  border-radius: 0.08rem;
  background: rgba(0, 0, 0, 0.5);
  font-size: 0.18rem;
  color: #fff;
  transition: transform 0.3s ease-out;
  transform: translate3d(-50%, -50%, 0) scale(0);
  &.visible {
    transform: translate3d(-50%, -50%, 0) scale(1);
  }
}
</style>
