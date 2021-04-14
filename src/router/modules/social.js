// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/social',
  component: layout,
  children: [
    {
      path: '',
      name: 'social_securitys',
      meta: {
        title: '社保',
        icon: 'table'
      },
      component: () => import('@/views/social/index.vue')
    }
  ]
}
