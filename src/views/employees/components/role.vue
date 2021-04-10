<template>
  <el-dialog :visible.sync="isShow" title="角色列表" @close="closeEvent">
    <el-checkbox-group v-model="checkboxValue">
      <!-- 渲染页面 -->
      <el-checkbox
        v-for="(item, index) in roleList"
        :key="index"
        :label="item.id"
        >{{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <div style="text-align:center">
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="closeEvent">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
// 导入角色列表api
import { sysRole } from '@/api/setting'
import { getUserInfo, sysUserAssignRoles } from '@/api/employees'
export default {
  data () {
    return {
      isShow: false,
      checkboxValue: [],
      roleList: [],
      id: ''
    }
  },
  async created () {
    // 进入页面获取角色
    const { rows } = await sysRole()
    this.roleList = rows
    console.log(rows)
  },
  methods: {
    // 关闭事件
    closeEvent () {
      this.isShow = false
      this.checkboxValue = []
    },
    // 获取当前员工角色列表
    async getUserRole (id) {
      this.id = id
      const res = await getUserInfo(id)
      this.checkboxValue = res.roleIds
    },
    // 修改当前员工角色分配
    async submit () {
      await sysUserAssignRoles({ id: this.id, roleIds: this.checkboxValue })
      this.$message.success('修改成功')
      this.closeEvent()
    }
  }
}
</script>

<style></style>
