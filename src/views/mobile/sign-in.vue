<template>
  <div class="sign-in-wrapper" v-loading="true" >

  </div>
</template>
<script>
export default {
  name: 'sign-in',
  data () {
    return {
    }
  },
  mounted () {
    this.$loading.close()
  }
}
</script>
<style lang="less" scoped>
  .sign-in-wrapper{
    height: 100%;
  }

</style>
