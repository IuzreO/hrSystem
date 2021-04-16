<template>
  <div @click="fullScreenClick">
    <svg-icon iconClass="fullscreen"></svg-icon>
  </div>
</template>

<script>
import screenfull from 'screenfull'
export default {
  name: 'FullScreen',
  methods: {
    fullScreenClick () {
      window.console.log(screenfull)
      if (!screenfull.isEnabled) {
        this.$message.error('该浏览器不支持全屏')
      } else {
        screenfull.toggle()
      }
    }
  }
}
</script>

<style></style>
