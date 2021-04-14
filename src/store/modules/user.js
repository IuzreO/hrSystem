import { getUserInfo, sysLogin, getSysUser } from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
  // setTime,
  // removeTime
} from '@/utils/auth'
import router, { resetRouter } from '@/router'
const state = {
  // 拿到token
  token: getToken(),
  // 用户信息
  userInfo: ''
}
const mutations = {
  setToken (state, value) {
    state.token = value
    // 存储到浏览器中的Cookies中
    setToken(value)
    // // 设置token的有效时间
    // setTime()
  },
  removeToken (state) {
    state.token = null
    // 删除浏览器中的Cookies中token
    removeToken()
    // 删除保存的时间
    // removeTime()
  },
  // 设置用户信息
  setUserInfo (state, value) {
    state.userInfo = value
  },
  // 清空用户信息
  removeUserInfo (state, value) {
    state.userInfo = ''
  }
}
const actions = {
  // 定义方法获取token
  async getUserToken (store, form) {
    // 调用接口获取token
    const res = await sysLogin(form)
    store.commit('setToken', res)
  },
  // 定义方法获取用户信息
  async getUserInfo (store) {
    // 调用接口获取用户信息
    const res = await getUserInfo()
    store.commit('setUserInfo', res)
    // 调用接口获取用户头像等其他详细信息
    const sysRes = await getSysUser(res.userId)
    store.commit('setUserInfo', { ...res, ...sysRes })
  },
  // 退出时删除token以及清空用户信息
  signOut (store) {
    // 删除token
    store.commit('removeToken')
    // 清空用户信息
    store.commit('removeUserInfo')
    // bug:退出登录后 vuex中的路由不会还原 需要设置还原
    // 方法一 调用路由重置方法
    // 路由内的routes还原只有静态路由
    resetRouter()
    // 方法二 刷新页面
    // router.go(0)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
