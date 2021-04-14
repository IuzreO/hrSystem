<template>
  <div class="login">
    <el-form class="form" :model="form" :rules="rules" ref="form">
      <img src="../../assets/common/login-logo.png" alt="" />
      <el-form-item prop="mobile">
        <el-input
          placeholder="请输入手机号"
          prefix-icon="el-icon-user-solid"
          v-model="form.mobile"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <!-- @keyup.enter.**`native`** 表示监听组件的原生事件，
        比如 keyup就是于input的原生事件，这里写native表示keyup是一个原生事件 -->
        <el-input
          placeholder="请输入密码"
          type="password"
          prefix-icon="el-icon-unlock"
          v-model="form.password"
          @keyup.enter.native="enter"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="loginBtn" @click="enter">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入封装好的手机号验证方法
import { checkPhone } from '@/utils/validate'
import { mapActions } from 'vuex'
// 导入登录接口
// import { sysLogin } from '@/api/user'
export default {
  data () {
    return {
      form: {
        mobile: '13800000002',
        password: '123456'
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              checkPhone(value)
                ? callback()
                : callback(new Error('请输入正确的手机号'))
            }
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 16, message: '密码长度应为6-16位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('user', ['getUserToken']),
    enter () {
      this.$refs.form.validate(async result => {
        if (result) {
          // this.$message.success('验证成功')
          // 表单验证通过后调用登录方法
          // const res = await sysLogin(this.form)
          // window.console.log(res)
          await this.getUserToken(this.form)
          this.$message.success('登录成功')
          const _redirect = this.$route.query.redirect
          if (_redirect) {
            this.$router.push(_redirect)
          } else {
            this.$router.push('/')
          }
        } else {
          this.$message.error('验证失败')
        }
      })
    }
  },
  created () {}
}
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url('../../assets/common/login.jpg');
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    width: 500px;
    text-align: center;
    image {
      margin-bottom: 15px;
    }
    .loginBtn {
      width: 100%;
      background-color: #407ffe;
      border-color: #407ffe;
      color: #fff;
    }
  }
}
</style>
