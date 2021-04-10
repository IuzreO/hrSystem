<template>
  <el-dialog
    :visible="value"
    :title="mode == 'add' ? '新增角色' : '编辑角色'"
    @close="closeEvent"
  >
    <el-form label-width="100px" :model="form" :rules="rules" ref="form">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" prop="name">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label-width="0">
        <div style="text-align:center">
          <el-button @click="closeEvent">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
// 导入api接口
import { addSysRole, editSysRole } from '@/api/setting'
export default {
  props: ['value'],
  //   model: {
  //     prop: 'value', // 修改v-model传值的属性名
  //     event: 'input' // 修改v-model绑定事件的input
  //   },
  data () {
    return {
      mode: 'add', // 默认字段为新增
      // isShow: false, // 弹窗默认不显示
      form: {
        name: '', // 角色名称
        description: '' // 角色描述
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入描述',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    closeEvent () {
      // 重置表单内容
      this.$refs.form.resetFields()
      // 清空表单
      this.form = {
        name: '',
        description: ''
      }
      this.mode = 'add' // 每次关闭还原mode为新增
      this.$emit('input', false)
      //   this.isShow = false
    },
    async submit () {
      try {
        await this.$refs.form.validate()
        if (this.mode === 'add') {
          await addSysRole(this.form)
          this.$message.success('添加角色成功')
        } else {
          await editSysRole(this.form)
          this.$message.success('编辑角色成功')
        }
        // 关闭弹窗
        this.closeEvent()
        // 刷新页面数据
        this.$emit('getData')
      } catch (error) {
        window.console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
