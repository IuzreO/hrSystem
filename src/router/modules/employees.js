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
        title: 'employees',
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
    },
    {
      // 个人详细打印所有信息+岗位信息
      // 动态路由匹配 1:配置路由, 2:传值 3:接收
      // 动态路由的优点 可以控制该参数是否必传 2:参数url更友好
      path: 'print/:type',
      name: 'print',
      hidden: true,
      meta: {
        title: '打印详细'
      },
      component: () => import('@/views/employees/print.vue')
    }
  ]
}
