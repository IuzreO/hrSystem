<template>
  <div class="top">
    <div class="name">{{ nodeData.name }}</div>
    <div class="manager">{{ nodeData.manager }}</div>
    <div class="option">
      <!-- 加入下拉菜单 -->
      <el-dropdown @command="commandEvent">
        <span>
          <span>操作</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- 下拉菜单事件基本绑定 -->
            <el-dropdown-item command="add">新增</el-dropdown-item>
            <el-dropdown-item command="edit" v-if="isShow"
              >修改</el-dropdown-item
            >
            <el-dropdown-item command="remove" v-if="isShow"
              >删除</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nodeData: {
      type: Object,
      required: true
    },
    // 接收props传值控制修改与删除的显示
    isShow: {
      type: Boolean,
      default: true // 定义默认值,默认显示
    }
  },
  methods: {
    // 事件处理
    commandEvent (str) {
      switch (str) {
        case 'add': {
          // 通过bus传值弹框组件当前节点数据
          this.$bus.$emit('isShowEvent', this.nodeData)
          break
        }
        case 'edit': {
          window.console.log('修改')
          break
        }
        case 'remove': {
          window.console.log('删除')
          break
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  display: flex;
  align-items: center;
  .name {
    flex: 1;
  }
  .manager {
    width: 120px;
  }
}
</style>
