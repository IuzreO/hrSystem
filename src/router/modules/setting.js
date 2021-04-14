// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/setting',
  component: layout,
  children: [
    {
      path: '',
      name: 'settings',
      meta: {
        title: '公司设置',
        icon: 'setting'
      },
      component: () => import('@/views/setting/index.vue')
    }
  ]
}
