<template>
  <div class="pagetools">
    <div class="left">
      <div v-if="showLeft">
        <slot name="left"></slot>
      </div>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageTools',
  props: {
    showLeft: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.pagetools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
</style>
