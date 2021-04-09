<template>
  <div class="ashboard">
    <uploadImg v-model="imageUrl"></uploadImg>
  </div>
</template>

<script>
export default {
  created () {},
  data () {
    return {
      imageUrl:
        'https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/cdbf6c81800a19d86524639732fa828ba61e4679.jpg'
    }
  }
}
</script>

<style lang="scss" scoped></style>
