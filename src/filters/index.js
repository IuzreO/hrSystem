// 定义全局过滤器
// 导入JS资源
import employeesData from '@/api/constant/employees'
import store from '@/store'
// 导入moment
import moment from 'moment'
export default {
  // 定义状态格式的过滤器
  formatterOf (cellValue) {
    let _index = employeesData.hireType.findIndex(item => {
      return item.id == cellValue
    })
    if (_index !== -1) {
      return employeesData.hireType[_index].value
    } else {
      return '未知'
    }
  },
  // 时间转换
  formatTime: function (value) {
    return moment(value).format('YYYY-MM-DD')
  },

  // 按钮权限过滤器
  filterButton (str) {
    return !store.getters.userInfo.roles.points.includes(str)
  }
}
