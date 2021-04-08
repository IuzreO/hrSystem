<template>
  <el-dialog
    class="dialog"
    :visible.sync="isShow"
    @close="closeEvent"
    title="新增员工"
  >
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item prop="username" label="姓名">
        <el-input v-model="form.username" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item prop="mobile" label="手机">
        <el-input v-model="form.mobile" placeholder="请输入手机"></el-input>
      </el-form-item>
      <el-form-item prop="formOfEmployment" label="聘用形式	">
        <el-select v-model="form.formOfEmployment" placeholder="请输入聘用形式">
          <el-option
            v-for="(item, index) in employeesSelect"
            :key="index"
            :value="item.id"
            :label="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="workNumber" label="工号">
        <el-input v-model="form.workNumber" placeholder="请输入工号"></el-input>
      </el-form-item>
      <el-form-item prop="departmentName" label="组织名称">
        <!-- 聚焦事件 -->
        <el-input
          v-model="form.departmentName"
          placeholder="请输入组织名称"
          @focus="focusEvent"
          readonly
        ></el-input>
        <el-tree
          v-if="showTree"
          :data="treeData"
          :props="{ label: 'name', children: 'children' }"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </el-form-item>
      <el-form-item prop="timeOfEntry" label="入职时间">
        <el-date-picker
          v-model="form.timeOfEntry"
          placeholder="请输入入职时间	"
        ></el-date-picker>
      </el-form-item>
      <el-form-item prop="correctionTime" label="转正时间">
        <el-date-picker
          v-model="form.correctionTime"
          placeholder="请输入转正时间	"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="closeEvent">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </template>
  </el-dialog>
</template>

<script>
// 导入封装好的手机号验证方法
import { checkPhone } from '@/utils/validate'
// 组织架构接口API
import { companyDepartment } from '@/api/departments'
// 新增员工API
import { addSysUser } from '@/api/employees'
// 应聘形式
import employeesData from '@/api/constant/employees'
export default {
  //   props: {
  //     isShow: {
  //       type: Boolean,
  //       default: false
  //     }
  //   },
  data () {
    return {
      isShow: false, // 弹窗默认不显示
      treeData: '', // tree数据
      showTree: false, // 默认不显示
      initForm: '', // 替代form数据
      employeesSelect: employeesData.hireType,
      form: {
        username: '', //	string	非必须		姓名
        mobile: '', //	string 非必须		手机号
        formOfEmployment: '', //	number	非必须		聘用形式
        workNumber: '', //	  string	非必须		工号
        departmentName: '', //string	非必须		组织名称
        timeOfEntry: '', //	  string:	非必须		入职时间
        correctionTime: '' //	string	非必须		转正时间
      },
      rules: {
        username: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        mobile: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              // let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
              // if (reg.test(value)) {
              //   callback()
              // } else {
              //   callback(new Error('手机号有误'))
              // }
              return checkPhone(value)
                ? callback()
                : callback(new Error('请输入正确手机号'))
            }
          }
        ],
        formOfEmployment: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        workNumber: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        departmentName: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        timeOfEntry: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          }
        ],
        correctionTime: [
          {
            required: true,
            message: '必填',
            trigger: 'change'
          }
        ]
      }
    }
  },
  created () {
    // 解决重置问题
    this.initForm = JSON.parse(JSON.stringify(this.form))
  },
  methods: {
    // 关闭弹窗
    closeEvent () {
      this.isShow = false
      this.$refs.form.resetFields()
      // 重置问题 id等其他字段会留在里面
      this.form = JSON.parse(JSON.stringify(this.initForm))
      // 关闭树形结构
      this.showTree = false
    },
    // 点击确定
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          await addSysUser(this.form)
          this.$message.success('新增成功')
          this.closeEvent()
          // 刷新父级数据
          this.getData()
        }
      })
    },
    // 获取组织架构数据并转换成树形结构数据
    async focusEvent () {
      if (this.treeData.lenth > 0) {
        return
      }
      const res = await companyDepartment()
      const _tempArr = res.depts
      this.treeData = this.changeData(_tempArr, '')
      this.showTree = true
    },
    changeData (arr, str) {
      return arr.filter(item => {
        if (item.pid === str) {
          item.children = this.changeData(arr, item.id)
          return true
        }
      })
    },
    // 树形组件点击事件,点击赋值给相应的input
    handleNodeClick (data) {
      window.console.log(data)
      this.form.departmentName = data.name
      this.showTree = false
      // 单独校验
      this.$refs.form.validateField(['departmentName'])
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  ::v-deep.el-dialog__header {
    background-color: #64b0fd;
    font-size: 16px;
  }
  ::v-deep.el-dialog__title {
    color: white;
  }
  ::v-deep .el-dialog__footer {
    text-align: center;
  }
}
</style>
