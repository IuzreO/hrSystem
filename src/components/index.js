import pageTools from '@/components/pageTools/'
// 全局注册
export default {
  install: function (Vue) {
    Vue.component(pageTools.name, pageTools)
  }
}
