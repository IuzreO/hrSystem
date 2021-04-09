import pageTools from '@/components/pageTools/'
import uploadExcel from '@/components/uploadExcel'
import uploadImg from '@/components/uploadImg'
// 全局注册
export default {
  install: function (Vue) {
    // 插槽
    Vue.component(pageTools.name, pageTools)
    // 文件上传
    Vue.component(uploadExcel.name, uploadExcel)
    // 图片上传
    Vue.component(uploadImg.name, uploadImg)
  }
}
