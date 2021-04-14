<template>
  <div class="employees">
    <el-card>
      <pageTools :showLeft="false">
        <template #right>
          <!-- <el-button
            type="primary"
            @click="importEvent"
            :disabled="'employees_import' | filterButton"
            >导入
          </el-button> -->
          <el-button
            type="primary"
            @click="importEvent"
            v-if="filterButtonFn('employees_import')"
            >导入
          </el-button>
          <el-button type="primary" @click="add">+新增员工</el-button>
        </template>
      </pageTools>
    </el-card>
    <el-card class="info">
      <el-table :data="list">
        <el-table-column label="序号" width="50px">
          <template v-slot="scope">
            <div>
              {{ (page.page - 1) * page.size + scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <!-- 员工头像 -->
        <el-table-column label="头像" prop="staffPhoto">
          <template v-slot="{ row }">
            <!-- 自定义指令处理图片错误的情况 -->
            <img
              @click="imgClick(row.staffPhoto)"
              style="width:50px"
              v-image="errorImg"
              :src="row.staffPhoto"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="手机号"
          width="106px"
        ></el-table-column>
        <el-table-column prop="workNumber" label="工号"></el-table-column>
        <!-- 在相应要转换的项加入属性formatter  用来格式化内容-->
        <!-- <el-table-column
          prop="formOfEmployment"
          label="聘用形式"
          :formatter="formatterOf"
        ></el-table-column> -->
        <el-table-column prop="formOfEmployment" label="聘用形式">
          <template v-slot="{ row }">
            <div>
              {{ row.formOfEmployment | formatterOf }}
            </div>
          </template>
        </el-table-column>
        <el-input prop="departmentName" label="部门"></el-input>
        <el-table-column prop="timeOfEntry" label="入职时间" width="106px">
          <!-- 使用过滤器处理时间格式 -->
          <template v-slot="{ row }">
            <div>{{ row.timeOfEntry | formatTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="correctionTime" label="转正时间" width="106px">
          <template v-slot="{ row }">
            <div>{{ row.correctionTime | formatTime }}</div>
          </template></el-table-column
        >
        <el-table-column prop="formOfEmployment" label="状态">
          <!-- 使用过滤器处理状态格式 -->
          <template v-slot="{ row }">
            <div>
              {{ row.formOfEmployment | formatterOf }}
            </div>
          </template></el-table-column
        >
        <el-table-column label="操作" width="300px">
          <template v-slot="{ row }">
            <div class="btn">
              <el-button type="text" @click="look(row.id)">查看</el-button>
              <el-button type="text">转正</el-button>
              <el-button type="text">调岗</el-button>
              <el-button type="text">离职</el-button>
              <el-button type="text" @click="role(row)">角色</el-button>
              <el-button type="text" @click="del(row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <div class="page">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="page.size"
        :total="page.total"
        layout="total , sizes, prev, pager, next, jumper"
      >
        <!--layout 组件布局，子组件名用逗号分隔	 -->
      </el-pagination>
    </div>
    <!-- 新增组件 -->
    <add ref="add"></add>
    <!-- 二维码弹窗 -->
    <el-dialog
      :visible.sync="showAvatar"
      title="头像二维码"
      @opened="openedEvent"
    >
      <!-- 二维码 -->
      <canvas ref="qrcodedom"></canvas>
    </el-dialog>
    <!-- 角色弹窗 -->
    <role ref="roleDialog"></role>
  </div>
</template>

<script>
// 导入接口API
import { sysUser, delEmployee } from '@/api/employees'
// 导入JS资源
// import employeesData from '@/api/constant/employees'
import qrcode from 'qrcode'
export default {
  components: {
    add: () => import('./components/add'),
    role: () => import('./components/role')
  },
  data () {
    return {
      list: [], // 信息列表
      showAvatar: false, // 默认弹窗为false
      avatar: '', // 二维码
      page: {
        page: 1, // 当前页码
        size: 5, // 每页条数
        total: 10 // 总条数
      },
      // v-imgerror使用的头像地址
      errorImg: require('@/assets/common/head.jpg')
    }
  },
  created () {
    // 调用方法获取员工信息数据
    this.getData()
  },
  methods: {
    async getData () {
      const { total, rows } = await sysUser(this.page)
      this.list = rows
      this.page.total = total
    },
    // pageSize 页容量改变时会触发
    handleSizeChange (size) {
      this.page.size = size
      // 重新获取数据
      this.page.page = 1
      this.getData()
    },
    // currentPage 页码改变时会触发
    handleCurrentChange (num) {
      this.page.page = num
      // 重新获取数据
      this.getData()
    },
    // 点击删除事件
    del (id) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          await delEmployee(id)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          // 刷新数据
          this.page.page = 1
          this.getData()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击新增员工
    add () {
      this.$refs.add.isShow = true
    },
    // 点击导入事件
    importEvent () {
      this.$router.push('/employees/importExcel')
    },
    // 查看
    look (id) {
      this.$router.push('/employees/detail/' + id)
    },
    // 头像点击事件
    imgClick (avatar) {
      if (!avatar) {
        this.$message.error('暂无头像')
        return
      }
      // 有头像处理
      // 打开弹窗
      this.showAvatar = true
      // 图片赋值
      this.avatar = avatar
      // 因为el-dialog第一次打开时,内部的body还没有渲染,所以需要等它渲染完成后在进行dom操作
      // 方法一
      // this.$nextTick(() => {
      //   qrcode.toCanvas(this.$refs.qrcodedom, this.avatar)
      // })
    },
    // 方法二
    // 弹窗后生成二维码
    openedEvent () {
      qrcode.toCanvas(this.$refs.qrcodedom, this.avatar)
    },
    // 点击弹出角色页面弹窗
    role (row) {
      this.$refs.roleDialog.isShow = true
      // 调用获取当前点击员工的基本信息
      this.$refs.roleDialog.getUserRole(row.id)
    }
  }

  // 定义方法进行转换
  // formatterOf (row, column, cellValue, index) {
  //   let _index = employeesData.hireType.findIndex(item => {
  //     return item.id == cellValue
  //   })
  //   if (_index !== -1) {
  //     return employeesData.hireType[_index].value
  //   } else {
  //     return '未知'
  //   }
  // }
  // 局部过滤器
  // filters: {
  //   formatterOf (cellValue) {
  //     let _index = employeesData.hireType.findIndex(item => {
  //       return item.id == cellValue
  //     })
  //     if (_index !== -1) {
  //       return employeesData.hireType[_index].value
  //     } else {
  //       return '未知'
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.employees {
  padding: 20px;
  .info {
    margin-top: 20px;
  }
  .page {
    text-align: center;
    margin-top: 20px;
  }
  ::v-deep .el-dialog__body {
    text-align: center;
  }
}
</style>
