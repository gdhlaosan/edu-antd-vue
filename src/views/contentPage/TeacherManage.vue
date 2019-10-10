<template>
  <div id="components-form-demo-advanced-search">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSearch"
    >
      <a-row :gutter="24">
          <a-col :span="6">
            <a-form-item label="角色">
                <a-select
                    v-decorator="['roleId', {
                        initialValue: -1
                    }]"
                >
                    <a-select-option
                        v-for="item in userList"
                        :key="item.id"
                        :value="item.id"
                    >
                    {{item.text}}
                    </a-select-option>
                </a-select>
            </a-form-item>
          </a-col>
        <a-col :span="6">
          <a-form-item label="教师信息">
            <a-input
                v-decorator="['keyword']"
                placeholder="请输入教师或课程信息"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col
          :span="24"
          :style="{ textAlign: 'right' }"
        >
          <a-button
            type="primary"
            html-type="submit"
          >
            查询
          </a-button>
          <a-button
            :style="{ marginLeft: '8px' }"
            @click="handleReset"
          >
            重置
          </a-button>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">
      <a-table
        :rowKey="record => record.userId"
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
    >
        <!-- <template slot="name" slot-scope="name">
        {{name.first}} {{name.last}}
        </template> -->
    </a-table>
    </div>
  </div>
</template>
<script>
const columns = [{
  title: '教师用户名',
  dataIndex: 'userName',
  scopedSlots: { customRender: 'userName' }
}, {
  title: '教师姓名',
  dataIndex: 'realName'
}, {
  title: '角色',
  dataIndex: 'roleName'
}, {
  title: '状态',
  dataIndex: 'State'
}, {
  title: '课程名称',
  dataIndex: 'courseName'
}]
export default {
  data () {
    return {
      expand: false,
      form: this.$form.createForm(this),
      userList: [],
      loading: false,
      pagination: {
        showSizeChanger: true
      },
      data: [],
      columns
    }
  },
  mounted () {
    // 获取角色下拉框数据
    this._getUserList()
  },
  methods: {
    handleSearch (e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields((error, values) => {
        if (!error) {
          // 查询表格数据
          Object.assign(values, {
            page: 1,
            rows: 15
          })
          this.$http.fetchGet(`${this.API}/Teacher/GetTeacherCourseGridJson`, values).then((oJson) => {
            console.log(oJson)
            const pagination = { ...this.pagination }
            pagination.total = oJson.data.total
            this.loading = false
            this.data = oJson.data.rows
            this.pagination = pagination
          })
        }
      })
    },
    handleReset () {
      this.form.resetFields()
    },
    _getUserList () {
      this.$http.fetchGet(`${this.API}/Role/GetRoleSelectJsonByRoleType`, {
        roleType: 2,
        _: Math.random()
      }).then((oJson) => {
        oJson.data.unshift({
          id: -1,
          text: '全部'
        })
        this.userList = oJson.data
      })
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      console.log(filters)
      console.log(sorter)
    }
  }
}
</script>
<style lang="less">
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  padding: 10px;
}
</style>
