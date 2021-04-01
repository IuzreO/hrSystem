import axios from 'axios'
import { Promise } from 'core-js'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
// 创建axios副本
const _http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  // 携带cookie到服务器
  // withCredentials: true
})
// 请求拦截
_http.interceptors.request.use(
  function (config) {
    // 如果请求接口需要token才加,如果后端接口对token有限制
    if (getToken()) {
      // 请求拦截统一添加token
      config.headers.Authorization = `Bearer ${getToken()}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截
_http.interceptors.response.use(
  function (res) {
    if (res.data.success) {
      return res.data.data
    } else {
      Message.error(res.data.message)
      return Promise.reject(new Error(res.data.message))
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 让响应拦截return Promise.reject 不在浏览器中出现拦截警告(统一拦截catch)
function _ajax (data) {
  return new Promise((resolve, reject) => {
    _http(data)
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        if (data.hasCatch) {
          reject(err)
        }
      })
  })
}
// 暴露出去
export default _ajax
