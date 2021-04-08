<template>
  <div class="departments">
    <!-- <div class="top">
      <div class="name">传智教育</div>
      <div class="manager">负责人</div>
      <div class="option">操作</div>
    </div> -->
    <treeItem class="topTitle" :nodeData="topData" :isShow="false"> </treeItem>
    <div class="tree" v-loading="loading">
      <hr />
      <el-tree :data="treeData">
        <!-- 作用域插槽,template slot-scope='scope' template v-slot='scope
              scope.node:element表示我们包装的数据 scope.data表示当前行的数据
               -->
        <template v-slot="scope">
          <!-- <div class="top">
            <div class="name">{{ scope.data.label }}</div>
            <div class="manager">负责人</div>
            <div class="option" @click="btnClick(scope)">操作</div>
          </div> -->
          <treeItem :nodeData="scope.data"></treeItem>
        </template>
      </el-tree>
    </div>
    <!-- 弹框组件 -->
    <!-- 通过父子组件传值传递原始组织结构数据 -->
    <add :treeDepts="treeDepts"></add>
  </div>
</template>

<script>
// 导入api和子组件
const treeItem = () => import('./components/treeItem')
const add = () => import('./components/add')
// import { companyDepartment } from '@/api/departments'
// import { treeChange } from '@/utils'
import { mapState } from 'vuex'
export default {
  components: {
    treeItem,
    add
  },
  computed: {
    ...mapState('departments', ['topData', 'treeData', 'treeDepts'])
  },
  data () {
    return {
      loading: false
      // 将顶部的数据进行统一处理
      // topData: {
      //   id: '',
      //   name: '江苏传智',
      //   manager: '负责人',
      //   children: []
      // },
      // treeData: [
      //   // {
      //   //   name: '财务部',
      //   //   children: {
      //   //     label: '薪资管理部',
      //   //     children: []
      //   //   }
      //   // }
      // ],
      // // 原始组织结构数据
      // treeDepts: []
    }
  },
  async created () {
    // 进入页面刷新数据
    this.getData()
  },
  methods: {
    async getData () {
      this.loading = true
      // 调用Vuex中转换属性结构的方法
      await this.$store.dispatch('departments/getTreeData')
      this.loading = false
      // 调用接口获取组织架构数据
      // const res = await companyDepartment()
      // this.topData.name = res.companyName
      // // 当前数据的id与自己子集数据的pid保持一致
      // let _depts = res.depts
      // // 储存原始组织结构数据
      // this.treeDepts = _depts
      // // 第一层数据 进行数据转换 将数据结构转换成树形结构数据
      // this.treeData = treeChange(_depts, '')
    }
    // 树形数据转换
    // treeChange (arr, str) {
    //   return arr.filter(item => {
    //     if (item.pid === str) {
    //       item.children = this.treeChange(arr, item.id)
    //       return true
    //     }
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.departments {
  padding: 50px 130px 15px;
  .topTitle {
    font-size: 24px;
  }
}
</style>
