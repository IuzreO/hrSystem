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
    },
    {
      path: 'importExcel',
      name: 'importExcel',
      // 配置上传路由,需要加入hidden:true不在菜单中显示该项
      hidden: true,
      meta: {
        title: '导入excel'
      },
      component: () => import('@/views/employees/importExcel.vue')
    },
    {
      path: 'detail/:id',
      name: 'detail',
      hidden: true,
      meta: {
        title: '员工详细'
      },
      component: () => import('@/views/employees/detail.vue')
    }
  ]
}
