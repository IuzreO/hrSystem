// 定义全局过滤器
// 导入JS资源
import employeesData from '@/api/constant/employees'
// 导入moment
import moment from 'moment'
export default {
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
  }
}
