<template>
  <el-dialog :visible.sync="isShow" title="新增" @close="closeEvent">
    <el-form label-width="120px" :model="form" :rules="rules" ref="form">
      <el-form-item prop="name" label="权限名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item prop="code" label="权限标识">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item prop="name" label="权限描述">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item prop="enVisible" label="企业可见">
        <!-- el-swich v-model:默认是一个boolean值 
        acitve-color为启动时的颜色 
        inactive为没启动时的颜色
        active为启动时的值 
        inactive为没启动的值-->
        <el-switch v-model="form.enVisible" active-value="1" inactive-value="0">
        </el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <div style="text-align:center">
        <el-button type="primary" @click="sumbit">确定</el-button>
        <el-button @click="closeEvent">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { AddsysPermission, editSysPermission } from '@/api/permission'
export default {
  data () {
    return {
      isShow: false,
      mode: 'add', // 默认为新增
      form: {
        name: '',
        code: '',
        description: '',
        enVisible: '1', // 0 为未启用 1为启用
        type: '',
        pid: ''
      },
      rules: {
        name: [{ required: true, message: '必填', trigger: 'blur' }],
        code: [{ required: true, message: '必填', trigger: 'blur' }],
        description: [{ required: true, message: '必填', trigger: 'blur' }],
        enVisible: [{ required: true, message: '必填', trigger: 'blur' }]
      }
    }
  },
  methods: {
    sumbit () {
      this.$refs.form.validate(async result => {
        if (result) {
          if (this.mode === 'add') {
            await AddsysPermission(this.form)
            this.$message.success('添加成功')
          } else {
            await editSysPermission(this.form)
            this.$message.success('编辑成功')
          }
          this.isShow = false
          //   // 调用父组件方法更新数据
          this.$parent.getData()
        }
      })
    },
    // 设置type与pid
    setFormData (type, pid) {
      this.form.type = type
      this.form.pid = pid
    },
    // 关闭方法
    closeEvent () {
      // 重置表单
      this.$refs.form.resetFields()
      // 清空表单
      this.form = {
        name: '',
        code: '',
        description: '',
        enVisible: '1',
        type: '',
        pid: ''
      }
      this.isShow = false
      this.mode = 'add'
    }
  }
}
</script>

<style></style>
