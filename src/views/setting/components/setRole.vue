<template>
  <el-dialog :visible="showRole" :title="title" @close="closeEvent">
    <!-- el-tree 
            data:数据绑定
            props:{
                label:'label'
                children:'children'
            }
            show-checkbox:是否显示勾选项
            check-strictly在显示复选框的情况下 是否严格的遵循父子不相互关联的做法,默认为false
            1:设置树形结构勾选后能设置与获取相应ID
              加入node-key='字段名(需要独一无二,常用语id)'
            2:获取勾选项的数据
              this.$refs.tree.getCheckedKeys()
            3:设置勾选某些项
              this.$refs.tree.setCheckedKeys([node-key相对应的值])
             -->
    <el-tree
      ref="tree"
      node-key="id"
      show-checkbox
      check-strictly
      :data="treeData"
      :props="{ label: 'name' }"
    ></el-tree>
    <template #footer>
      <div style="text-align='center'">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="closeEvent">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { sysPermission } from '@/api/permission'
import { sysRoleAssignPrem, getSysRole } from '@/api/setting'
import { treeChange } from '@/utils'
export default {
  data () {
    return {
      showRole: false,
      treeData: [],
      title: '',
      id: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    closeEvent () {
      this.showRole = false
      this.$refs.tree.setCheckedKeys([])
    },
    // 获取权限列表
    async getData () {
      const res = await sysPermission()
      // 过滤掉不可见的数据
      let _arr = res.filter(item => {
        return item.enVisible === '1'
      })
      // 转换成树形结构
      this.treeData = treeChange(_arr, '0')
      //   window.console.log(res, _arr, 'treeData', this.treeData)
    },
    // 获取当前角色所有的权限页面
    async getRoleInfo (id, name) {
      // 接收name修改标题
      this.title = '[' + name + ']分配权限'
      this.id = id
      const res = await getSysRole(id)
      this.$refs.tree.setCheckedKeys(res.permIds)
      // window.console.log(res)
    },
    // 点击确定
    async submit () {
      let _arr = this.$refs.tree.getCheckedKeys()
      await sysRoleAssignPrem({
        id: this.id,
        permIds: _arr
      })
      this.$message.success('分配权限点成功')
      this.closeEvent()
      //   window.console.log(this.$refs.tree.getCheckedKeys)
    }
  }
}
</script>

<style></style>
