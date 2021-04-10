<template>
  <!-- action:上传地址
     name:上传文件参数
     show-file-list:是否显示文件列表
     before-upload 用于上传前的文件类型和大小等限制
     on-success
     http:request 自定义上传的function
 -->
  <div class="uploadImg">
    <el-upload
      action="#"
      class="upload"
      :before-upload="beforeupload"
      :http-request="httpRequest"
      :show-file-list="false"
    >
      <div class="flex">
        <img
          @click.stop.prevent="isShow = true"
          v-if="value"
          :src="value"
          class="avatar"
        />
        <i v-else class="el-icon-plus"></i>
      </div>
      <div v-if="value" class="delete" @click.stop.prevent="del">X</div>
    </el-upload>
    <!-- 动画效果 -->
    <transition name="animate">
      <!--percentage 进度值 showProgress是否显示进度条  -->
      <el-progress
        v-if="showProgress"
        style="width:150px"
        :percentage="percentage"
        color="skyblue"
      ></el-progress>
    </transition>
    <el-dialog title="图片预览" :visible.sync="isShow">
      <img :src="value" style="width:100%" alt="" />
    </el-dialog>
  </div>
</template>
<script>
// 导入与实例化COS插件
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKID9MRKxLjK6k8h0dkf05vXv3NTLyOahEf8', // 身份识别 ID
  SecretKey: 'XJsDyegWcT5RchbuxVpmTvBLuKr9F5f1' // 身份秘钥
})
export default {
  name: 'uploadImg',
  props: ['value'],
  // model: {
  //   prop: 'imageUrl',
  //   event: 'input'
  // },
  data () {
    return {
      isShow: false, // 默认不显示弹窗
      showProgress: false, // 默认不显示进度条
      percentage: 0 // 进度条默认为0
    }
  },
  methods: {
    del () {
      this.$emit('input', '')
    },
    // 上传前显示图片规则
    beforeupload (file) {
      let _arr = ['image/png', 'image/jpeg', 'image/gif']
      let _result = _arr.some(item => item === file.type)
      if (!_result) {
        this.$message.error('请上传pgn,jpeg,gif图片')
      }
      let _limit2M = file.size / 1024 / 1024 / 4
      if (!_limit2M) {
        this.$message.error('请上传2M以内的图片')
      }
      return _result && _limit2M
    },
    // 自定义上传的function
    httpRequest (file) {
      if (file.file) {
        // 上传过程中显示进度条
        this.showProgress = true
        cos.putObject(
          {
            Bucket: 'mystore-1305553147', // 存储桶
            Region: 'ap-shenzhen-fsi', // 地域
            Key: file.file.name, // 文件名
            Body: file.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
            onProgress: progressData => {
              this.percentage = progressData.percent * 100
              console.log(JSON.stringify(progressData))
            }
          },
          (err, data) => {
            // data返回数据之后 应该如何处理
            if (!err && data.statusCode === 200) {
              //显示图片
              this.$emit('input', 'http://' + data.Location)
            }
            // 设置定时器
            setTimeout(() => {
              this.showProgress = false
              this.percentage = 0
            }, 1000)
            console.log(err || data)
          }
        )
      }
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
      // 元素的内容应该如何去适应指定容器的高度与宽度,cover保持原有尺寸比例。但部分内容可能被剪切。
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
    // .xxx-enter-active 进入动画的执行体,用于放tansition animation
    // .xxx-leave-active 离开动画的执行体
    // .xxx-enter 进入时状态(希望从什么状态过渡到正常状态)
    // .xxx-leave-to 离开时状态(希望从正常状态过渡到设置的状态)
  }
  .animate-enter-active,
  .animate-leave-active {
    transition: all 2s;
  }
  .animate-enter {
    opacity: 0;
    transform: translateX(-30px);
  }
  .animate-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
