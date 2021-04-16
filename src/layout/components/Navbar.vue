<template>
  <div class="navbar">
    <div class="left">
      <i
        :class="sidebar.opened ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="iClick"
      ></i>
      <div class="app-breadcrumb">
        江苏传智播客教育科技股份有限公司
        <span class="breadBtn">体验版</span>
      </div>
    </div>
    <div class="right">
      <!-- 多语言组件 -->
      <lang></lang>
      <!-- 全屏组件使用 -->
      <FullScreen style="width:20px;height:20px;margin-right:20px"></FullScreen>
      <!-- 绑定点击事件 -->
      <el-dropdown @command="commandEvent">
        <span class="top-info">
          <!-- 自定义指令 -->
          <img
            v-image="imageSrc"
            class="avatar"
            :src="userInfo.staffPhoto"
            alt=""
          />
          <span class="name">{{ userInfo.username }}</span>
          <i class="el-icon-arrow-down el-icon-right"></i>
        </span>
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="home">首页</el-dropdown-item>
            <el-dropdown-item command="exit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  data () {
    return {
      // 默认定义一张图片
      imageSrc: require('@/assets/common/head.jpg')
    }
  },
  computed: {
    ...mapState('app', ['sidebar']),
    ...mapGetters(['userInfo'])
  },
  methods: {
    // 点击切换收起或展开
    iClick () {
      this.$store.dispatch('app/toggleSideBar')
    },
    commandEvent (command) {
      switch (command) {
        case 'exit': {
          // 调用vuex中的actions方法中的signout方法删除token和userInfo
          this.$confirm('确定退出', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.$message({
                type: 'success',
                message: '退出成功'
              })
              this.$store.dispatch('user/signOut')
              this.$router.push('/login?redirect=' + this.$route.fullPath)
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消'
              })
            })
        }
      }
    },
    btnClick () {
      // this.$il8n===il8n的实例化对象
      // 后端和前端商量好用一个language字段 1:设置时 2:il8n默认配制时
      // 语言有记忆功能 il8n实例化时使用
      // 点击切换语言
      if (this.$il8n.locale === 'zh') {
        this.$il8n.locale == 'en'
      } else {
        this.$il8n.locale = 'zh'
      }
      // 把语言作一个cookie储存
      jsCookie.set('language', this.$il8n.locale)
    }
  }
}
// directives: {
//   image: {
//     inserted (el, obj) {
//       window.console.log(el, obj)
//       el.onerror = function () {
//         // 只要图片地址错误 则使用默认图片地址
//         el.src = obj.value
//       }
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  background-color: #4979fb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    color: #fff;
    i {
      margin-right: 20px;
      margin-left: 15px;
    }
  }
  .right {
    color: #fff;
    display: flex;
    align-items: center;
    .avatar {
      width: 25px;
      height: 25px;
      border-radius: 25px;
    }
    .top-info {
      display: flex;
      align-items: center;
      color: #fff;
      .name {
        padding: 0 10px;
      }
    }
  }
}
</style>
