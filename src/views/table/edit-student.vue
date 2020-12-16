<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="grade" placeholder="年级">
        <el-option v-for="item in grade_options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
        <el-option key="empty" label="全部年级" value="-999" />
      </el-select>
      <el-select v-model="classId" placeholder="班级">
        <el-option v-for="item in class_options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
        <el-option key="empty" label="全部班级" value="-999" />
      </el-select>
      <el-button @click="getList(grade,classId)">查询数据</el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="95" :sortable="true">
        <template slot-scope="scope">
          {{ scope.row.sId }}
        </template>
      </el-table-column>
      <el-table-column label="年级" width="110" align="center" :sortable="true">
        <template slot-scope="scope">
          <span>{{ scope.row.grade }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班级" width="110" align="center" :sortable="true">
        <template slot-scope="scope">
          <span>{{ scope.row.classId }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学生" width="95" :sortable="true">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="备注">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              cancel
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="修改" width="120">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            Ok
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            Edit
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getStudentList } from '@/api/table'
import { getClassList } from '@/api/charts'
import { editStudent } from '@/api/edit'

export default {
  name: 'InlineEditTable',
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      grade_options: [],
      class_options: [],
      exam_options: [],
      grade: '-999',
      classId: '-999',
      list: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.initSelect()
  },
  methods: {
    initSelect() {
      const _this = this
      getClassList().then(response => {
        _this.grade_options = response.data.grade_options
        _this.class_options = response.data.class_options
      })
    },
    async getList(grade, classId) {
      this.listLoading = true
      this.list = null
      const params = {
        classId: classId,
        grade: grade
      }
      const { data } = await getStudentList(params)
      this.list = data.map(v => {
        this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
        v.originalTitle = v.title //  will be used when user click the cancel botton
        return v
      })
      this.listLoading = false
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.title
      const params = {
        examId: row.examId,
        sId: row.sId,
        title: row.title
      }
      editStudent(params).then(() => {
        this.$message({
          message: 'The title has been edited',
          type: 'success'
        })
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
