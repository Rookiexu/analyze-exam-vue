<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="grade" placeholder="年级">
        <el-option v-for="item in grade_options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
      </el-select>
      <el-select v-model="classId" placeholder="班级">
        <el-option v-for="item in class_options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
      </el-select>
      <el-button @click="find(grade,classId)">查询数据</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="examId" width="95" :filter-method="filterHandler">
        <template slot-scope="scope">
          {{ scope.row.examId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="sId" width="95" :filter-method="filterHandler">
        <template slot-scope="scope">
          {{ scope.row.sId }}
        </template>
      </el-table-column>
      <el-table-column label="班级" width="110" align="center" :filter-method="filterHandler">
        <template slot-scope="scope">
          <span>{{ scope.row.classId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年级" width="110" align="center" :filter-method="filterHandler">
        <template slot-scope="scope">
          {{ scope.row.grade }}
        </template>
      </el-table-column>
      <el-table-column label="成绩" width="110" align="center" :filter-method="filterHandler">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column label="缺考" width="110" align="center" :filter-method="filterHandler">
        <template slot-scope="scope">
          {{ scope.row.score }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="备注" align="center">
        <template slot-scope="scope">
          {{ scope.row.info }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMockList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filterHandler(value, row, column) {
    const property = column['property']
    return row[property] === value || row[property].value === value
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getMockList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
