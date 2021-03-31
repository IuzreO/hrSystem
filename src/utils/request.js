import axios from 'axios'
import { Promise } from 'core-js'
import { Message } from 'element-ui'
// 创建axios副本
const _http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  // 携带cookie到服务器
  // withCredentials: true
})
// 请求拦截
_http.interceptors.request.use(
  function (config) {
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
