import request from '@/utils/request'
// 通过ID获取企业数据
export function getCompany (id) {
  return request({
    url: `/company/${id}`
  })
}
// 获取所有角色列表数据
export function sysRole (params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 新增角色
export function addSysRole (data) {
  return request({
    url: 'sys/role',
    method: 'post',
    data
  })
}
// 删除角色
export function delSysRole (id) {
  return request({
    url: `sys/role/${id}`,
    method: 'delete'
  })
}
// 编辑角色
export function editSysRole (data) {
  return request({
    url: `sys/role/${data.id}`,
    method: 'put',
    data
  })
}
// 根据id获取角色 详情
export function getSysRole (id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 角色分配权限api
export function sysRoleAssignPrem (data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
