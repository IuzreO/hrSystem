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
