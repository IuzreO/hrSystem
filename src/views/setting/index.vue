<template>
  <div class="setting">
    <!-- tab点击事件 -->
    <el-tabs @tab-click="tabClick" v-model="activeName">
      <el-tab-pane label="角色管理" name="role">
        <el-button type="primary" @click="addRole">新增角色</el-button>
        <el-table :data="tableData">
          <!-- 如果设置了 type=index，可以通过传递 index 属性来自定义索引 -->
          <!-- 对应列内容的字段名，也可以使用 property 属性	 -->
          <el-table-column label="序号">
            <!-- scope $index:当前数据的索引,row:当前行的数据 -->
            <template v-slot="scope">
              {{ (page.currPage - 1) * page.pageSize + scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="角色名" prop="name"></el-table-column>
          <el-table-column label="描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <!-- 作用域插槽 -->
            <template v-slot="scope">
              <div>
                <el-button type="text" @click="setRole(scope.row)"
                  >分配权限</el-button
                >
                <el-button type="text" @click="edit(scope.row)">修改</el-button>
                <el-button type="text" @click="del(scope.row)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <div class="page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.currPage"
            :page-sizes="[1, 5, 10, 15]"
            :page-size="page.pageSize"
            :total="page.total"
            layout="total , sizes, prev, pager, next, jumper"
          >
            <!--layout 组件布局，子组件名用逗号分隔	 -->
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="company">
        <el-form label-width="80px">
          <el-form-item label="企业名称">
            <el-input disabled v-model="companyInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="企业地址">
            <el-input disabled v-model="companyInfo.companyAddress"></el-input>
          </el-form-item>
          <el-form-item label="企业电话">
            <el-input disabled v-model="companyInfo.companyPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input disabled v-model="companyInfo.mailbox"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input disabled v-model="companyInfo.remarks"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 导入子组件 -->
    <add ref="add" v-model="showAdd" @getData="getData"></add>
    <setRole ref="setRole" v-model="showRole"></setRole>
  </div>
</template>

<script>
// 导入封装好的api接口
import { sysRole, getCompany, delSysRole } from '@/api/setting'
export default {
  components: {
    add: () => import('./components/add'),
    setRole: () => import('./components/setRole')
  },
  data () {
    return {
      tableData: [], // 表格数据源
      companyInfo: '', // 企业信息
      activeName: 'role',
      showAdd: false,
      showRole: false,
      page: {
        // 当前页数
        currPage: 1,
        // 每页显示个数选择器的选项设置 需要包含在:page-sizes中
        pageSize: 5,
        // 总条目数
        total: 10
      }
    }
  },
  async created () {
    // 调用方法获取角色列表数据
    this.getData()
  },
  methods: {
    async getData () {
      // 调用接口获取所有角色列表
      const res = await sysRole({
        page: this.page.currPage,
        pagesize: this.page.pageSize
      })
      this.tableData = res.rows
      this.page.total = res.total
      window.console.log(res)
    },
    // pageSize 页容量改变时会触发
    handleSizeChange (size) {
      this.page.pageSize = size
      // 重新获取数据
      this.page.currPage = 1
      this.getData()
    },
    // currentPage 页码改变时会触发
    handleCurrentChange (num) {
      this.page.currPage = num
      // 重新获取数据
      this.getData()
    },
    // 获取企业信息
    async getCompanyInfo () {
      // 如果企业信息已存在则不需要获取
      if (this.companyInfo) {
        return
      }
      const res = await getCompany(this.$store.getters.userInfo.companyId)
      this.companyInfo = res
    },
    // 点击实现删除功能
    del (row) {
      this.$confirm('确认删除', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 调用删除接口
          await delSysRole(row.id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.page.currPage = 1
          // 重新渲染页面数据
          this.getData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // tab点击事件
    tabClick (obj, event) {
      // 点击企业时才获取企业信息
      console.log(obj.name)
      if (obj.name === 'company') {
        // 调用方法获取企业信息
        this.getCompanyInfo()
      }
    },
    // 点击新增弹窗
    addRole () {
      this.showAdd = true
      // this.$refs.add.isShow = true
    },
    // 编辑按钮点击事件
    edit (row) {
      this.showAdd = true
      // 深拷贝数据
      // this.$refs.add.form = JSON.parse(JSON.stringify(row))
      // 当数据只有一层时 也可使用浅拷贝
      this.$refs.add.form = { ...row }
      // 将字段修改为编辑
      this.$refs.add.mode = 'edit'
    },
    // 权限分配按钮
    setRole (row) {
      this.$refs.setRole.showRole = true
      // 点击分配权限时传入name
      this.$refs.setRole.getRoleInfo(row.id, row.name)
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 20px;
  .page {
    ::v-deep .el-pagination {
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
