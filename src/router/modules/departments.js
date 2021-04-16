// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/departments',
  component: layout,
  children: [
    {
      path: '',
      name: 'departments',
      meta: {
        title: 'departments',
        icon: 'skill'
      },
      component: () => import('@/views/departments/index.vue')
    }
  ]
}
