import { companyDepartment } from '@/api/departments'
import { treeChange } from '@/utils'
const state = {
  treeData: [], // 树形组织架构数据
  treeDepts: [], // 原始组织架构数据
  topData: {
    id: '',
    name: '江苏传智',
    manager: '负责人',
    children: []
  }
}
const mutations = {
  setTreeData (state, value) {
    state.treeData = value
  },
  setTreeDepts (state, value) {
    state.treeDepts = value
  },
  setTopData (state, value) {
    state.topData = value
  }
}
const actions = {
  async getTreeData (store) {
    // 调用接口获取数据
    const res = await companyDepartment()
    store.commit('setTopData', {
      id: '',
      name: res.companyName,
      manager: '负责人',
      children: []
    })
    let _depts = res.depts
    // 树形组织架构数据赋值
    store.commit('setTreeData', treeChange(_depts, ''))
    // 原生组织架构数据赋值
    store.commit('setTreeDepts', _depts)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
