<template>
  <div class="dashboard-container">
    <div class="dashboard-text">go go go</div>
    <template>
      <el-select v-model="event" clearable placeholder="请选择当日计划" @clear="clearSelect">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="createEvent">创建计划</el-button>
      <el-form v-if="event!==null" ref="form" :model="form" label-width="80px">
        <el-form-item label="待办标题">
          <el-input v-model="form.title" style="width: 12%;" />
        </el-form-item>
        <el-form-item label="待办类型">
          <el-select v-model="form.type" placeholder="请选择计划类型" style="width: 12%;">
            <el-option label="重要紧急" value="4" />
            <el-option label="重要不紧急" value="3" />
            <el-option label="不重要紧急" value="2" />
            <el-option label="不重要不紧急" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间" style="width: 12%;">
          <el-col :span="11">
            <el-date-picker v-model="form.startDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间" style="width: 12%;">
          <el-col :span="11">
            <el-date-picker v-model="form.endDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" />
          </el-col>
        </el-form-item>
        <el-form-item label="已完成">
          <el-switch v-model="form.eventComplete" />
        </el-form-item>
        <el-form-item label="待办内容" inline-message>
          <el-input v-model="form.descData" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button v-loading="listLoading" type="primary" @click="onSubmit">保存</el-button>
          <el-button v-loading="listLoading" type="primary" @click="onDelete">删除</el-button>
        </el-form-item>
      </el-form>
    </template>
    <el-calendar>
      <template
        slot="dateCell"
        slot-scope="{date, data}"
      >
        <p :class="data.isSelected ? 'is-selected' : ''" v-bind="data.isSelected ? setDate(data) : ''">
          {{ !data.isSelected ? data.day.split('-').slice(1).join('-') + getTodoInfo(data.day): '' }}
        </p>
        <p :class="data.isSelected ? 'is-selected' : 'is-not-selected'">
          {{ !data.isSelected ? getSimpleInfo(data.day) : getFullInfo(data.day) }}
        </p>
      </template>
    </el-calendar>

    <div />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { saveEvent, deleteEvent, findAllEvent } from '@/api/event'
import { validEventForm } from '@/utils/validate'

export default {
  name: 'Dashboard',
  data() {
    return {
      lastDay: '',
      listLoading: false,
      event: null,
      events: [],
      options: [],
      form: {
        id: -1,
        title: '',
        type: '',
        startDate: '',
        endDate: '',
        eventComplete: false,
        descData: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    event(val) {
      this.onChangeEvent(val)
    }
  },
  created() {
    this.initAllEvent()
  },
  methods: {
    initAllEvent() {
      const _this = this
      findAllEvent().then((response) => {
        _this.events = response.data
      })
    },
    onDelete() {
      const _this = this
      if (_this.form.id != null) {
        deleteEvent(_this.form.id).then(() => {
          _this.listLoading = false
          this.initAllEvent()
          this.form = {}
        })
      } else {
        this.$message({
          message: '没有生成事件id',
          type: 'error'
        })
      }
    },
    onSubmit() {
      if (validEventForm(this.form) !== 'success') {
        this.$message({
          message: validEventForm(this.form),
          type: 'warning'
        })
      } else {
        const _this = this
        _this.listLoading = true
        saveEvent(_this.form).then(response => {
          _this.form.id = response.data
          _this.listLoading = false
          this.initAllEvent()
        })
      }
    },
    onChangeEvent(event) {
      if (event != null && event !== '新计划') {
        for (const e of this.events) {
          if (e.id === event || e.id + '' === event) {
            this.form = e
          }
        }
      }
    },
    clearSelect() {
      this.event = null
      this.form = {}
    },
    createEvent() {
      this.event = '新计划'
      this.form = {}
    },
    setDate(date) {
      // 获取当天事件信息
      const todayEvents = []
      let i = 0
      for (const e of this.events) {
        if (this.isInDay(date.day, e)) {
          todayEvents[i++] = e
        }
      }
      if (todayEvents.length > 0) {
        const optionsToday = [todayEvents.length]
        i = 0
        for (const e of todayEvents) {
          optionsToday[i++] = {
            value: e.id,
            label: e.title
          }
        }
        this.options = optionsToday
      }
      if (this.lastDay !== date.day) {
        this.$message({
          message: date.day + ' 今日待办事件: ' + this.getFullInfo(date.day),
          type: 'info'
        })
        this.lastDay = date.day
      }
    }, isInDay(date, e) {
      const startDate = e.startDate
      const endDate = e.endDate
      const a = date >= startDate
      const b = date <= endDate
      return a && b
    },
    getTodoInfo(day) {
      let count = 0
      let completeCount = 0
      for (const e of this.events) {
        if (this.isInDay(day, e)) {
          if (!e.eventComplete) {
            count++
          } else {
            completeCount++
          }
        }
      }

      const s = (count === 0 ? '' : '  待办 : ' + count + ',') +
      (completeCount === 0 ? '' : '  完成 : ' + completeCount + ',')
      return s.substring(0, s.lastIndexOf(','))
    },
    getSimpleInfo(day) {
      let level4 = 0
      let level3 = 0
      let level2 = 0
      let level1 = 0
      for (const e of this.events) {
        if (!e.eventComplete && this.isInDay(day, e)) {
          switch (e.type) {
            case 1:
              level1++
              break
            case 2:
              level2++
              break
            case 3:
              level3++
              break
            case 4:
              level4++
              break
          }
        }
      }
      let str = (level4 === 0 ? '' : '紧要:' + level4 + ',') +
        (level3 === 0 ? '' : '重要:' + level3 + ',') +
        (level2 === 0 ? '' : '紧急:' + level2 + ',') +
        (level1 === 0 ? '' : '普通:' + level1 + ',')
      str = str.substring(0, str.lastIndexOf(','))
      return str
    },
    getFullInfo(day) {
      let info = ''
      let i = 0
      for (const e of this.events) {
        if (!e.eventComplete && this.isInDay(day, e)) {
          if (i++ !== 0) {
            info = info + ','
          }
          info = info + (e.title)
        }
      }
      return info
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.is-selected {
  color: #3b924e;
}
.is-not-selected {
  color: #ff0000;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
