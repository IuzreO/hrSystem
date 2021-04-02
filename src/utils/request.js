import axios from 'axios'
import { Promise } from 'core-js'
import { Message } from 'element-ui'
import { getTime, getToken } from '@/utils/auth'
import store from '@/store'
import router from '@/router'
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
      // 后端做法
      // 比较时间
      // const nowTime = Date.now()
      // const expriesTime = getTime()
      // if (nowTime - expriesTime > 3 * 1000) {
      //   // token失效处理 1.删除token 2:删除用户信息 3:提示用户 4:跳转登录页面
      //   store.dispatch('user/signOut')
      //   Message.error('token过期')
      //   // 如果是登录页则不需要取
      //   router.push('/login?redirect=' + window.location.href.split('#')[1])
      //   return Promise.reject(new Error('token过期'))
      // }
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
    // 前端做法
    if (
      error.response &&
      error.response.data &&
      // 状态码为10002则表示token已超时
      error.response.data.code === 10002
    ) {
      // token失效处理 1.删除token 2:删除用户信息 3:提示 4:跳转登录页面
      store.dispatch('user/signOut')
      Message.error(error.response.data.message)
      // 如果是登录页则不需要取
      router.push('/login?redirect=' + window.location.href.split('#')[1])
      // window.console.log('401:'[error])
    }
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
