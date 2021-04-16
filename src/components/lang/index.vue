<template>
  <div>
    <el-dropdown @command="commandEvent">
      <span>
        <svg-icon
          style="width:30px;height:30px;color:#fff;margin-right:20px;"
          iconClass="language"
        ></svg-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="zh" :disabled="$i18n.locale === 'zh'"
            >中文</el-dropdown-item
          >
          <el-dropdown-item command="en" :disabled="$i18n.locale === 'en'"
            >english</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import jsCookie from 'js-cookie'
export default {
  name: 'lang',
  methods: {
    commandEvent (str) {
      this.$i18n.locale = str
      jsCookie.set('language', str)
      this.$router.go(0)
    }
  }
}
</script>

<style></style>
