<template>
  <div class="detail">
    <el-card>
      <el-tabs>
        <el-tab-pane label="登录账户设置">
          <!-- 放置表单 -->
          <el-form
            label-width="120px"
            style="margin-left: 120px; margin-top:30px"
            :model="form"
            :rules="rules"
            ref="form"
          >
            <el-form-item label="姓名:" prop="username">
              <el-input style="width:300px" v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input
                style="width:300px"
                type="password"
                v-model="form.password"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit">更新</el-button>
              <el-button type="primary" @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="个人详细" lazy>
          <!-- 使用组件 -->
          <userInfo :userInfo="user2"></userInfo>
        </el-tab-pane>
        <el-tab-pane label="岗位信息" lazy>
          <component :is="componentId"></component>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo, editUserInfo } from '@/api/employees'

export default {
  components: {
    // 注册组件
    userInfo: () => import('./components/userInfo'),
    jobInfo: () => import('./components/jobInfo')
  },
  data () {
    return {
      componentId: 'jobInfo',
      id: this.$route.params.id,
      user: '',
      user2: '',
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          { min: 6, max: 12, message: '请输入6-12位密码', trigger: 'blur' }
        ]
      }
    }
  },
  async created () {
    this.user = await getUserInfo(this.id)
    this.user2 = JSON.parse(JSON.stringify(this.user))
    this.form.username = this.user.username
  },
  methods: {
    submit () {
      this.$refs.form.validate(async result => {
        if (result) {
          await editUserInfo({ ...this.user, ...this.form })
          this.$message.success('更新成功')
          this.$router.push('/employees')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  padding: 20px;
}
</style>
