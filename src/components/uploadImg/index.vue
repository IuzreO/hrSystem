<template>
  <!-- action:上传地址
     name:上传文件参数
     show-file-list:是否显示文件列表
     before-upload
     on-success
 -->
  <div class="uploadImg">
    <el-upload action="#" class="upload">
      <div class="flex">
        <img
          @click.stop.prevent="isShow = true"
          v-if="imageUrl"
          :src="imageUrl"
          class="avatar"
        />
        <i v-else class="el-icon-plus"></i>
      </div>
      <div v-if="imageUrl" class="delete" @click.stop.prevent="del">X</div>
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="isShow">
      <img :src="imageUrl" style="width:100%" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'uploadImg',
  props: ['imageUrl'],
  data () {
    return {
      isShow: false
    }
  },
  model: {
    prop: 'imageUrl',
    event: 'input'
  },
  methods: {
    del () {
      this.$emit('input', '')
    }
  }
}
</script>
<style lang="scss" scoped>
.uploadImg {
  .upload {
    position: relative;
    width: 130px;
    height: 130px;
    border: 2px dashed #ccc;
    .flex {
      width: 130px;
      height: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .delete {
      position: absolute;
      right: 0;
      top: 0;
      display: none;
      font-size: 16px;
      z-index: 999;
    }
    &:hover {
      .delete {
        display: block;
      }
    }
  }
}
</style>
