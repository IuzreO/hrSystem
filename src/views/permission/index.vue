<template>
  <div class="permissoio">
    <el-card>
      <el-button type="primary" @click="addClick(1, '0')">添加页面</el-button>
      <!-- 树形结构
        1.需要数据中有children
        2.需要在el-table上定义一个row-key="数据上一个字段名,他的值一定要是独一无二的"
       -->
      <el-table :data="list" row-key="id">
        <el-table-column label="菜单名称" prop="name"></el-table-column>
        <el-table-column label="权限标识" prop="code"></el-table-column>
        <el-table-column label="描述" prop="derscription"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="{ row }">
            <div>
              <el-button type="text" @click="addClick(2, row.id)"
                >添加权限点</el-button
              >
              <el-button type="text" @click="edit(row)">编辑</el-button>
              <el-button type="text" @click="del(row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <add ref="add"></add>
  </div>
</template>

<script>
import { sysPermission, delSysPermission } from '@/api/permission'
export default {
  components: {
    add: () => import('./components/add.vue')
  },
  data () {
    return {
      list: []
    }
  },
  async created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await sysPermission()
      this.list = this.changeData(res, '0')
    },

    // 树形结构函数
    changeData (arr, pid) {
      return arr.filter(item => {
        if (item.pid === pid) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    // 添加点击事件
    addClick (type, pid) {
      // 打开弹窗并调用父级修改父级的form内type
      this.$refs.add.isShow = true
      this.$refs.add.setFormData(type, pid)
    },
    // 删除权限点
    del (id) {
      this.$confirm('确定删除', '提示')
        .then(() => {
          return delSysPermission(id)
        })
        .then(() => {
          // 调用接口
          this.$message.success('删除成功')
          // 刷新数据
          this.getData()
        })
    },
    edit (row) {
      this.$refs.add.isShow = true
      this.$refs.add.form = JSON.parse(JSON.stringify(row))
      this.$refs.add.mode = 'edit'
    }
  }
}
</script>

<style></style>
