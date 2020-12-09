<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="grade" placeholder="年级">
        <el-option v-for="item in grade_options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
      </el-select>
      <el-select v-model="checkList" multiple placeholder="班级">
        <el-option v-for="item in class_options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
      </el-select>
      <el-button @click="find(grade,checkList)">查询数据</el-button>
    </div>
    <div class="chart-container">
      <chart height="100%" width="100%" :series-data="seriesData" :title-info="titleInfo" />
    </div>
  </div>
</template>

<script>
import Chart from '@/components/Charts/LineMarker'
import { getClassList } from '@/api/charts.js'
import { getScore } from '@/api/charts.js'

export default {
  name: 'LineChart',
  components: { Chart },
  data() {
    return {
      grade_options: [],
      class_options: [],
      grade: '2017',
      checkList: [4],
      seriesData: null,
      titleInfo: null
    }
  }, mounted() {
    this.initSelect()
  }, methods: {
    initSelect() {
      const _this = this
      getClassList().then(response => {
        _this.grade_options = response.data.grade_options
        _this.class_options = response.data.class_options
      })
    }, find(grade, checkList) {
      const that = this
      getScore(grade, checkList).then(response => {
        console.log('Chart', Chart)
        console.log('that.chart', that.chart)
        that.seriesData = response.data.seriesData
        that.titleInfo = response.data.titleInfo
      })
    }
  }
}
</script>

<style scoped>
  .chart-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 84px);
  }
</style>

