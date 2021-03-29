<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created () {
    axios({
      url: process.env.VUE_APP_BASE_API + '/sys/login',
      method: 'post',
      data () {
        return {
          mobile: '1360000002',
          password: '123456'
        }
      }
    }).then(res => {
      //成功回调
      console.log(res)
    })
  }
}
</script>
