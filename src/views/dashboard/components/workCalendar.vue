<template>
  <div class="workCalendar">
    <el-row type="flex" justify="end">
      <el-select v-model="nowYear" @change="changeSelect">
        <el-option
          v-for="(item, index) in yearArr"
          :key="index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
      <el-select v-model="nowMonth" @change="changeSelect">
        <el-option
          v-for="item in 12"
          :key="item"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="calendarValue">
      <template v-slot:dateCell="{ data }">
        <div class="day">
          <!-- date:日历的相应的当前时间 -->
          <!-- data:day 转换成基本时间格式的时间 -->
          <span class="day1">{{ data.day | filterDay }}</span>
          <span class="day2" v-if="isWeekDay(data.day)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  props: {
    propsYear: {
      type: Date,
      default: () => new Date()
    }
  },
  data () {
    return {
      nowMonth: 4, //当前月份
      nowYear: 2021, // 当前年
      calendarValue: '',
      yearArr: [] // 年份数组
    }
  },
  // 过滤时间
  filters: {
    filterDay (str) {
      let _date = new Date(str)
      return _date.getDate()
    }
  },
  methods: {
    changeSelect () {
      let _date = new Date()
      let _year = _date.getFullYear()
      let _month = _date.getMonth() + 1
      if (_year === this.nomYear && _month === this.nowMonth) {
        this.calendarValue = _date
      } else {
        this.calendarValue = new Date(
          this.nowYear + '/' + this.nowMonth + '/01'
        )
      }
    },
    // 判断是否为周某
    isWeekDay (str) {
      let _date = new Date(str)
      let _day = _date.getDay()
      return _day === 0 || _day === 6
    }
  },
  created () {
    let _date = new Date()
    this.nowYear = _date.getFullYear()
    this.nowMonth = _date.getMonth() + 1
    this.calendarValue = _date
  },
  watch: {
    propsYear: {
      immediate: true, //希望第一次侦听的值赋值时也触发侦听
      handler (newVal) {
        let _year = newVal.getFullYear()
        let beforeYear = _year - 5
        let afterYear = _year + 5
        let numYear = beforeYear
        this.yearArr = []
        while (numYear <= afterYear && numYear >= beforeYear) {
          this.yearArr.push(numYear)
          numYear++
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.day {
  display: flex;
  .day1 {
    display: inline-block;
    width: 25px;
    margin-right: 10px;
  }
  .day2 {
    display: inline-block;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    line-height: 25px;
    background-color: #fa7c4d;
  }
}
</style>
