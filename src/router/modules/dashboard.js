// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/',
  component: layout,
  redirect: '/dashboard',
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        title: 'dashboard'
      },
      component: () => import('@/views/dashboard/index.vue')
    }
  ]
}
