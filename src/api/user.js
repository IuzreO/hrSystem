// 导入封住好的拦截器方法
import request from '@/utils/request'
// 封装登录接口
export function sysLogin (data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
