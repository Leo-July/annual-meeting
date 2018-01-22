<template>
  <div class="pc-page">
    <div class="barrage-wrapper">
      <barrage></barrage>
    </div>
  </div>
</template>
<script>
import barrage from '@/components/barrage-landscape.vue'

export default {
  components: {
    barrage
  }
}
</script>
<style lang="less" scoped>
.barrage-wrapper{
  width: 300px;
  height: 400px;
  background: yellowgreen;
  overflow: hidden;
}
</style>
