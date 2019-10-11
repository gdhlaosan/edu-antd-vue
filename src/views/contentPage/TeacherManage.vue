<template>
  <div id="components-form-demo-advanced-search">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
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
            @click="handleSearch"
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
        <template slot="State" slot-scope="text, record">
          <a-tag v-if="record.state === 1" color="#87d068">{{text}}</a-tag>
          <a-tag v-else color="gray">{{text}}</a-tag>
        </template>
        <template slot="courseName" slot-scope="text">
          <a-tooltip v-if="text !== null" placement="top">
            <template slot="title">
              <span>{{text}}</span>
            </template>
            <span class="courseName">{{text}}</span>
          </a-tooltip>
          <a-tag v-else color="green">未设置</a-tag>
        </template>
        <template slot="operate">
          <a class="operateItem">修改</a>
          <a class="operateItem">删除教师</a>
          <a class="operateItem">删除课程</a>
        </template>
    </a-table>
    </div>
  </div>
</template>
<script>
const columns = [{
  title: '序号',
  scopedSlots: { customRender: 'order' },
  customRender: (text, row, index) => {
    return index + 1
  }
}, {
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
  dataIndex: 'State',
  scopedSlots: { customRender: 'State' }
}, {
  title: '课程名称',
  dataIndex: 'courseName',
  scopedSlots: { customRender: 'courseName' }
}, {
  title: '操作',
  scopedSlots: { customRender: 'operate' },
  align: 'center'
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
      pagePara: {
        page: 1,
        rows: 10
      },
      columns
    }
  },
  mounted () {
    // 获取角色下拉框数据
    this._getUserList()
  },
  methods: {
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
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.pagePara = {
        rows: pagination.pageSize,
        page: pagination.current
      }
      this.handleSearch({
        rows: pagination.pageSize,
        page: pagination.current,
        ...filters
      })
    },
    handleSearch (params = {}) {
      console.log(params)
      this.loading = true
      this.form.validateFields((error, values) => {
        if (!error) {
          // 查询表格数据
          Object.assign(values, this.pagePara, params)
          for (let key in values) {
            values[key] = !values[key] ? '' : values[key]
          }
          this.$http.fetchGet(`${this.API}/Teacher/GetTeacherCourseGridJson`, values).then((oJson) => {
            this.data = oJson.data.rows
            const pagination = { ...this.pagination }
            pagination.total = oJson.data.records
            this.loading = false
            this.pagination = pagination
          })
        }
      })
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
  padding: 0 10px;
}

.courseName {
  display: inline-block;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.operateItem {
  padding: 0 5px;
}
</style>
