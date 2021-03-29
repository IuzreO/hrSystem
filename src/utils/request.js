import axios from 'axios'
import { Promise } from 'core-js'
// 创建axios副本
const _http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
  // 携带cookie到服务器
  // withCredentials: true
})
// 请求拦截
_http.interceptors.request.use(
  function (config) {
    window.console.log('config:', config)
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截
_http.interceptors.response.use(
  function (res) {
    window.console.log(res)
    return res
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 暴露出去
export default _http
