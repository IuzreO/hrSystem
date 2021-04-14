// 导入路由
import router from '@/router'
// 导入store
import store from '@/store'
// 导入进度条
import NProgress from 'nprogress'
import { Message } from 'element-ui'
// 导入进度条css
import 'nprogress/nprogress.css'
// 不需要token的白名单
const whitePage = ['/login', '/404']
// 路由前置守卫
router.beforeEach(async (to, from, next) => {
  // 开启进度条
  NProgress.start()
  // 判断是否存在token
  // 1.如果有
  // 如果是登录页,直接跳转home页面
  // 如果不是登录页,判断是否已经登录 如果已登录 则直接跳转,如果未登录则调用接口获取用户信息再跳转页面
  // 2.如果没有
  // 如果不需要token的页面(存在白名单中),正常进入
  // 如果想进入需要token的页面 跳转回登录页
  const token = store.getters.token
  if (!token) {
    if (whitePage.includes(to.path)) {
      next()
    } else {
      Message.error('请先登录')
      // 跳转到登录时传参想去的路径
      next('/login?redirect=' + to.fullPath)
    }
  } else {
    if (to.path === '/login') {
      next('/')
    } else {
      // 已登录 进入相应的页面
      if (store.getters.isLogin) {
        next()
      } else {
        // 调用接口获取用户信息
        await store.dispatch('user/getUserInfo')
        // 将vuex中处理的addRouter应用到前置守卫
        await store.dispatch('permission/getUserRoutes')
        // 因为addRouters添加后,新路由还不能使用,需要next(to.fullPath)
        next(to.fullPath)
      }
    }
  }
  // 结束进度条
  NProgress.done()
})
// 路由后置守卫
router.afterEach((to, from) => {
  // 结束进度条
  NProgress.done()
})
