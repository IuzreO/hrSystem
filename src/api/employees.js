import request from '@/utils/request'
// 获取员工列表接口
export function sysUser (params) {
  return request({
    url: '/sys/user',
    params
  })
}
// 删除员工信息接口
export function delEmployee (id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
// 新增员工
export function addSysUser (data) {
  return request({
    url: '/sys/user',
    method: 'post',
    data
  })
}
// 导入员工接口
export function sysUserBatch (data) {
  return request({
    url: '/sys/user/batch',
    method: 'post',
    data
  })
}
// 获取员工详细
export function getUserInfo (id) {
  return request({
    url: `/sys/user/${id}`
  })
}
// 修改员工基本信息
export function editUserInfo (data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}
// 获取员工完整信息
export function employeesPersonalInfo (id) {
  return request({
    url: `/employees/${id}/personalInfo`
  })
}
// 保存员工个人信息
export function employeesPersonalInfoPut (data) {
  return request({
    url: `/employees/${data.userId}/personalInfo`,
    method: 'put',
    data
  })
}
// 获取用户的岗位信息

export function getJobDetail (id) {
  return request({
    url: `/employees/${id}/jobs`
  })
}

// 保存岗位信息

export function updateJob (data) {
  return request({
    url: `/employees/${data.userId}/jobs`,
    method: 'put',
    data
  })
}
