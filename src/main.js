import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 将兄弟组件传值方法$bus挂在到vue原型上
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
import directivesObj from '@/directives'
// Vue.directive('image', {
//   inserted: function (el, obj) {
//     el.src = obj.value
//   }
// })
// Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组,数组中属性名的排列顺序和使用 for...in 循环遍历该对象时返回的顺序一致 。
Object.keys(directivesObj).forEach(item => {
  Vue.directive(item, directivesObj[item])
})
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
