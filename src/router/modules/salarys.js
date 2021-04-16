// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/salarys',
  component: layout,
  children: [
    {
      path: '',
      name: 'salarys',
      meta: {
        title: 'salarys',
        icon: 'money'
      },
      component: () => import('@/views/salarys/index.vue')
    }
  ]
}
