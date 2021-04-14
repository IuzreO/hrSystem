// 混入控制按钮
export default {
  methods: {
    filterButtonFn (str) {
      return this.$store.getters.userInfo.roles.points.includes(str)
    }
  }
}
