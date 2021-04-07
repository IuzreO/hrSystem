import request from '@/utils/request'
// 组织架构输数据
export function companyDepartment () {
  return request({
    url: '/company/department'
  })
}
// 获取部门负责人
export function sysUserSimple () {
  return request({
    url: '/sys/user/simple'
  })
}
// 新增部门
export function addDepartment (data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
// 删除部门
export function delDepartment (id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
// 编辑部门
export function editDepartment (data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
