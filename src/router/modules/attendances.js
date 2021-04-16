// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/attendances',
  component: layout,
  children: [
    {
      path: '',
      name: 'attendances',
      meta: {
        title: 'attendances',
        icon: 'skill'
      },
      component: () => import('@/views/attendances/index.vue')
    }
  ]
}
