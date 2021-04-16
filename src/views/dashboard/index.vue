<template>
  <div class="dashboard">
    <div class="right">
      <work-calendar></work-calendar>
    </div>
    <div class="left"></div>
  </div>
</template>

<script>
export default {
  components: {
    workCalendar: () => import('./components/workCalendar')
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  display: flex;
  .right {
    flex: 1;
  }
  .left {
    flex: 1;
  }
  ::v-deep .el-calendar__header {
    display: none;
  }
}
</style>
