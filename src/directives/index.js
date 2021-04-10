export default {
  image: {
    inserted (el, obj) {
      el.onerror = function () {
        // 只要图片地址错误 则使用默认图片地址
        el.src = obj.value
      }
    },
    // 完善自定义指令
    componentUpdated (el, obj) {
      el.src = el.src || obj.value
    }
  }
}
