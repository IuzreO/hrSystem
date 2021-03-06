import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import i18n from '@/lang'
// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
// Vue.directive('image', {
//   inserted: function (el, obj) {
//     el.src = obj.value
//   }
// })
// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。
// 将自定义指令挂载到Vue全局上
import directivesObj from '@/directives'
Object.keys(directivesObj).forEach(item => {
  Vue.directive(item, directivesObj[item])
})
// 注册全局过滤器
import filterObj from '@/filters'
Object.keys(filterObj).forEach(item => {
  Vue.filter(item, filterObj[item])
})
Vue.config.productionTip = false
// 将兄弟组件传值方法$bus挂载到vue原型上
Vue.prototype.$bus = new Vue()
// 将全局组件挂载到vue上
import conponentsJs from '@/components'
Vue.use(conponentsJs)
// 注册打印插件
import Print from 'vue-print-nb'
Vue.use(Print)
// 导入封装好的混入文件
import mixinsObj from '@/mixins'
// 全局混入
Vue.mixin(mixinsObj)
// 设置element为当前的语言
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
