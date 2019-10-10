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
      查询结果
    </div>
  </div>
</template>
<script>

export default {
  data () {
    return {
      expand: false,
      form: this.$form.createForm(this),
      userList: []
    }
  },
  mounted () {
    // 获取角色下拉框数据
    this._getUserList()
  },
  methods: {
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          // 查询表格数据
          this.$http.fetchGet(`${this.API}/Teacher/GetTeacherCourseGridJson`, values).then((oJson) => {

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
  text-align: center;
  padding-top: 80px;
}
</style>
