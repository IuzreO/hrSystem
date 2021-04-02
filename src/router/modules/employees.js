// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/employees',
  component: layout,
  children: [
    {
      path: '',
      name: 'employees',
      meta: {
        title: '员工',
        icon: 'people'
      },
      component: () => import('@/views/employees/index.vue')
    }
  ]
}
