import request from '@/utils/request'
// 组织架构输数据封装
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
