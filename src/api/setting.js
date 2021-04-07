import request from '@/utils/request'
// 获取所有角色列表数据
export function sysRole (params) {
  return request({
    url: '/sys/role',
    params
  })
}
// 通过ID获取企业数据
export function getCompany (id) {
  return request({
    url: `/company/${id}`
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
