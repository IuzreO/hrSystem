<template>
  <div class="importExcel">
    <uploadExcel
      :beforeUpload="beforeUpload"
      :onSuccess="onSuccess"
    ></uploadExcel>
  </div>
</template>

<script>
import { sysUserBatch } from '@/api/employees'
export default {
  data () {
    return {}
  },
  methods: {
    beforeUpload (file) {
      let _limi2M = file.size / 1024 / 1024 < 2
      if (!_limi2M) {
        this.$message.error('请上传2m内的excele')
      }
      return _limi2M
    },
    async onSuccess ({ header, results }) {
      let _tempObj = {
        入职时间: 'timeOfEntry',
        姓名: 'username',
        工号: 'workNumber',
        手机号: 'mobile',
        转正日期: 'correctionTime'
      }
      let _newArr = []
      results.forEach(item => {
        let _obj = {}
        Object.keys(item).forEach(item2 => {
          if (
            _tempObj[item2] === 'timeOfEntry' ||
            _tempObj[item2] === 'correctionTime'
          ) {
            // 将excel内的天数转换成我们想要的时间格式 excel时间它是从1900开始算的天数,而且它是从1开始计算的
            let _date = new Date((item[item2] - 1) * 24 * 60 * 60 * 1000)
            // new Date是从1970开始计算
            _date.setYear(_date.getFullYear() - 70)
            _obj[_tempObj[item2]] = _date
          } else {
            _obj[_tempObj[item2]] = item[item2]
          }
        })
        _newArr.push(_obj)
      })
      // 上传到服务器
      await sysUserBatch(_newArr)
      this.$message.success('导入成功')
      this.$router.push('/employees')
    }
  }
}
</script>

<style lang='scss' scoped></style>
