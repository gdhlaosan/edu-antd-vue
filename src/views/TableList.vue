<template>
  <div id="components-form-demo-advanced-search">
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch" v-if="dropdownData.length > 0">
      <a-row :gutter="24">
        <a-col
          v-for="(dropItem, i) in dropdownData"
          :key="dropItem.id"
          :span="8"
          :style="{ display: i < count ? 'block' : 'none' }"
        >
          <a-form-item :label="dropItem.label">
            <a-select :defaultValue="dropItem.list[0].name" v-model="searchParams[dropItem.type]" placeholder="请选择">
              <a-select-option
                v-for="itemVal in dropItem.list"
                :key="itemVal.value"
                :value="itemVal.value"
              >{{itemVal.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
          <a-button type="primary" @click="showModal">弹窗</a-button>
          <a-button :style="{ marginLeft: '8px' }" type="primary" html-type="submit">查询</a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">清除</a-button>
          <a v-if="count > 7" :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            展开
            <a-icon :type="expand ? 'up' : 'down'" />
          </a>
        </a-col>
      </a-row>
    </a-form>
    <div class="search-result-list">
      <a-row>
        <a-col :span="22" :offset="1">
          <a-table
            :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
            :columns="columns"
            :dataSource="listData"
            :bordered="true"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <!-- <span slot="customTitle">
              <a-icon type="smile-o" />name
            </span> -->
            <a slot="areaManageCenterID" slot-scope="text" href="javascript:;">{{text}}</a>

            <!-- <span slot="tags" slot-scope="aaa">
              <a-tag v-for="tag in aaa" color="blue" :key="tag">{{tag}}</a-tag>
            </span> -->
          </a-table>
        </a-col>
      </a-row>
    </div>
    <a-modal
      title="弹窗"
      v-model="visible"
      @ok="handleOk"
    >
     <a-button>sdfsf</a-button>
    </a-modal>
  </div>
</template>
<script>
export default {
  data () {
    return {
      expand: false,
      form: this.$form.createForm(this),
      dropdownData: [],
      searchParams: {},
      selectedRowKeys: [],
      columns: [],
      listData: [],
      pagination: {
        position: 'bottom',
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showQuickJumper: true
      },
      loading: false,
      visible: false,
      testData: ['ss', '33']
    }
  },
  computed: {
    count () {
      return this.expand ? 11 : 7
    }
  },
  mounted () {
    this._getFromData()

    console.log(this.testData.join(''))
  },
  methods: {
    _getFromData () {
      // 获取江大数据
      this.loading = true
      fetch(
        'https://www.easy-mock.com/mock/5d5d16896bbb6266a064d7af/example/upload',
        {
          method: 'POST'
        }
      )
        .then(response => {
          return response.json()
        })
        .then(json => {
          this.loading = false
          this.dropdownData = json.dropdown
          this.columns = json.tableList.columns.map(element => {
            return {
              title: element.title,
              key: element.name,
              dataIndex: element.name,
              align: 'center',
              scopedSlots: { customRender: element.name }
            }
          })
          json.tableList.tableData.forEach((element, index) => {
            element.key = index
          })
          this.listData = json.tableList.tableData
        })
    },
    onSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    handleTableChange (pagination, filters, sorter) {
      console.log(pagination)
      console.log(filters)
      console.log(sorter)
    },
    handleSearch (e) {
      e.preventDefault()
      this.form.validateFields(() => {
        this._getFromData()
      })
    },

    handleReset () {
      this.searchParams = {}
      this.form.resetFields()
    },

    toggle () {
      this.expand = !this.expand
    },
    showModal () {
      this.visible = true
    },
    handleOk (e) {
      console.log(e)
    }
  }
}
</script>
<style>
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
