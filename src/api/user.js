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
// 封装获取用户数据的接口
export function getUserInfo () {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
// 获取用户图片等详细信息
export function getSysUser (id) {
  return request({
    url: `/sys/user/${id}`
  })
}
