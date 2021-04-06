// 导入封装好的拦截器方法
import request from '@/utils/request'
import axios from 'axios'
let _cancelFn = ''
// 封装登录接口
export function sysLogin (data) {
  // 取消请求接口 防止用户反复请求同一个接口
  try {
    _cancelFn()
  } catch {}
  return request({
    url: '/sys/login',
    method: 'post',
    // 取消axios发送请求
    cancelToken: new axios.CancelToken(cancelFn => {
      _cancelFn = cancelFn
    }),
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
