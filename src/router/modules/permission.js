// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/permission',
  component: layout,
  children: [
    {
      path: '',
      name: 'permissions',
      meta: {
        title: 'permissions',
        icon: 'lock'
      },
      component: () => import('@/views/permission/index.vue')
    }
  ]
}
