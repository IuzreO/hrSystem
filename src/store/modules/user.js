import { sysLogin } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken (state, value) {
    state.token = value
    setToken(value)
  },
  removeToken () {
    state.token = null
    removeToken()
  }
}
const actions = {
  async getUserToken (store, form) {
    const res = await sysLogin(form)
    store.commit('setToken', res)
    window.console.log(res)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
