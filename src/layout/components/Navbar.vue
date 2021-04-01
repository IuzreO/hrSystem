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
      <el-dropdown>
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
            <el-dropdown-item>退出</el-dropdown-item>
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
}
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
    margin-right: 25px;
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
