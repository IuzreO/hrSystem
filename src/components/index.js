import pageTools from '@/components/pageTools/'
import uploadExcel from '@/components/uploadExcel'
import uploadImg from '@/components/uploadImg'
import FullScreen from '@/components/FullScreen'
import lang from '@/components/lang/index.vue'
// 全局注册
export default {
  install: function (Vue) {
    // 插槽
    Vue.component(pageTools.name, pageTools)
    // 文件上传
    Vue.component(uploadExcel.name, uploadExcel)
    // 图片上传
    Vue.component(uploadImg.name, uploadImg)
    // 注册全屏组件
    Vue.component(FullScreen.name, FullScreen)
    // // 语言切换组件
    Vue.component(lang.name, lang)
  }
}
