import router, { needControlRoutes, constantRoutes } from '@/router'
const state = {
  routes: [...constantRoutes] // 当前用户所有能访问的页面所有路由
}
const mutations = {
  setRoutes (state, value) {
    state.routes = value
  }
}
const actions = {
  getUserRoutes (store) {
    // 根据当前用户信息里的menus字段匹配出那些页面它有权限
    let _menus = store.rootGetters.userInfo.roles.menus
    console.log(_menus)
    let _newRoutes = needControlRoutes.filter(item => {
      return _menus.includes(item.children[0].name)
    })
    // 把404在匹配权限路由完成后添加进去
    _newRoutes = [..._newRoutes, { path: '*', redirect: '/404', hidden: true }]
    store.commit('setRoutes', [...constantRoutes, ..._newRoutes])
    // 把过滤出来的权限路由添加上去 注意:addRouters添加完成,路由还不能直接使用
    router.addRoutes(_newRoutes)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
