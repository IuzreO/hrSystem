// 需要权限处理的页面,创建路由配置成单独文件
import layout from '@/layout'
export default {
  path: '/approvals', //路径
  // 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
  component: layout, // 组件
  // 配置二级路由的路由表
  children: [
    {
      path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
      name: 'approvals', //给路由规则加一个name
      // 路由元信息  存储数据的对象
      meta: {
        title: 'approvals',
        icon: 'tree-table'
      },
      component: () => import('@/views/approvals/index.vue')
    }
  ]
}
