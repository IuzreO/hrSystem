import { getUserInfo, sysLogin, getSysUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  // 拿到token
  token: getToken(),
  // 用户信息
  userInfo: ''
}
const mutations = {
  setToken (state, value) {
    state.token = value
    setToken(value)
  },
  removeToken () {
    state.token = null
    removeToken()
  },
  // 设置用户信息
  setUserInfo (state, value) {
    state.userInfo = value
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
    window.console.log(sysRes)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
