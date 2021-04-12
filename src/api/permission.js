import request from '@/utils/request'
// 获取权限列表api
export function sysPermission () {
  return request({
    url: '/sys/permission'
  })
}
// 添加权限api
export function AddsysPermission (data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
// 删除权限点
export function delSysPermission (id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'delete'
  })
}
// 编辑权限点
export function editSysPermission (data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'put',
    data
  })
}
