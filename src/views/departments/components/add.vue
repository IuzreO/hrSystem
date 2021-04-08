<template>
  <!-- 兄弟组件的基本使用
1.Vue.prototype.$bus = new Vue()
2.监听 接收值 this.$bus.$on('方法名',(参数)=>时间处理)
3.触发 传值   this.$bus.$emit('方法名',参数值)
4.销毁 this.$bus.$off('方法名')
 -->
  <div class="add">
    <el-dialog
      :visible.sync="isShow"
      :title="mode == 'add' ? '新增' : '修改'"
      @close="closeEvent"
    >
      {{ vnode }}
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            v-model="form.manager"
            placeholder="请选择"
            @focus="focusEvent"
          >
            <!-- 部门负责人数据渲染 -->
            <!-- label 选择框中所看到的的内容,value 选中的值 -->
            <el-option
              v-for="(item, index) in selectList"
              :key="index"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input v-model="form.introduce"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="footer">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script>
// 导入获取部门负责人api
import { sysUserSimple, addDepartment, editDepartment } from '@/api/departments'
export default {
  // 接收父组件传入的值
  props: ['treeDepts'],
  data () {
    return {
      isShow: false,
      vnode: '', // 当前点击节点的数据
      selectList: '', // 选择列表
      mode: '', // 当前按钮状态
      form: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 验证方法
      rules: {
        name: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '请输入1-50字符',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (this.mode === 'add') {
                // 1.找到同级部门 treeDepts vnode.id
                this.treeDepts
                  .filter(
                    // 找出兄弟节点中所有的数据
                    item => item.pid === this.vnode.id
                  )
                  // 2.验证在统计部门中是否存在
                  // 返回值 = 数组.some(item=>return boolean) 只要一项为true,返回值=值,如果每一项都是false 返回值则为false
                  .some(item => {
                    return item.name === value
                  })
                  ? callback(new Error('该部门已存在'))
                  : callback()
              } else {
                // 1. 找同级兄弟
                this.treeDepts
                  .filter(item => item.pid === this.vnode.pid)
                  .some(item => {
                    // 排除自己
                    return item.name === value && item.id !== this.vnode.id
                  })
                  ? callback(new Error('该部门已存在'))
                  : callback()
              }
            },
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入编码',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '请输入1-50字符',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              // 2.验证在该编码是否存在
              // 返回值 = 数组.some(item=>return boolean) 只要一项为true,返回值=值,如果每一项都是false 返回值则为false
              if (this.mode === 'add') {
                this.treeDepts.some(item => item.code === value)
                  ? callback(new Error('该编码已存在'))
                  : callback()
              } else {
                // 排除掉自己 当前为自己的ID可以用
                this.treeDepts.some(
                  item => item.code === value && item.id !== this.vnode.id
                )
                  ? callback(new Error('该编码已存在'))
                  : callback()
              }
            },
            trigger: 'blur'
          }
        ],
        manager: [
          {
            required: true,
            message: '请选择负责人',
            trigger: 'change'
          }
        ],
        introduce: [
          {
            required: true,
            message: '请输入部门介绍',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 50,
            message: '请输入1-300字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 确定点击事件
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          if (this.mode === 'add') {
            //   this.$message.success('验证成功')
            await addDepartment({ ...this.form, pid: this.vnode.id })
            this.$message.success('新增成功')
            this.isShow = false
            // 调用成功后,提示用户,关闭弹窗 触发父级数据刷新
            this.$store.dispatch('departments/getTreeData')
          } else {
            await editDepartment(this.form)
            this.$message.success('编辑成功')
            this.isShow = false
            this.$store.dispatch('departments/getTreeData')
          }
        }
      })
    },
    // 取消点击事件
    cancel () {
      this.isShow = false
      this.$refs.form.resetFields()
    },
    // 当 input 获得焦点时触发
    async focusEvent () {
      // 如果有数据则不调用接口
      if (this.selectList.length === 0) {
        this.selectList = await sysUserSimple()
      }
    },
    // 表单关闭事件,重置表单
    closeEvent () {
      this.$refs.form.resetFields()
      // 把form表单清空
      this.form = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    }
  },

  created () {
    // 监听兄弟组件传值
    // 加入一个形参处理,判断当前是新增还是编辑
    this.$bus.$on('isShowEvent', (data, mode) => {
      // 如果是编辑按钮,则将form表单数据使用深拷贝当前点击项数据
      if (mode === 'edit') {
        // 进行深拷贝
        this.form = JSON.parse(JSON.stringify(data))
      }
      // 接收bus传值当前点击的节点数据
      this.mode = mode
      this.vnode = data
      this.isShow = true
    })
  },
  // 销毁
  beforeCreate () {
    this.$bus.$off('isShowEvent')
  }
}
</script>

<style lang="scss" scoped>
.add {
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
