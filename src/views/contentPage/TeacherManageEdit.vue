<template>
    <div>
        <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item v-for="(item, index) in $route.meta.breadcrumb" :key="index">{{item}}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-form :form="form">
            <div class="formTitle">账号信息</div>
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="用户名">
                        <a-input
                            v-decorator="['userName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入用户名',
                                    }
                                ]

                            }]"
                            placeholder="请输入用户名"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="角色">
                        <a-select
                            mode="multiple"
                            :filterOption="filterOption"
                            v-decorator="['roleId', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择角色',
                                    }
                                ]
                            }]"
                            placeholder="请选择"
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
                    <a-form-item label="密码">
                        <a-input-password
                            :visibilityToggle="false"
                            v-decorator="['password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入密码',
                                    }
                                ]

                            }]"
                            placeholder="请输入密码"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col :span="6">
                    <a-form-item label="状态">
                        <a-radio-group v-decorator="['state', {
                            initialValue: '1'
                        }]">
                            <a-radio value="1">启用</a-radio>
                            <a-radio value="0">停用</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
            </a-row>
            <div class="formTitle">个人信息</div>
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="教师姓名">
                        <a-input
                            v-decorator="['realName', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入教师姓名',
                                    }
                                ]

                            }]"
                            placeholder="请输入教师姓名"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="单位">
                        <a-input
                            v-decorator="['userGroup']"
                            placeholder="请输入单位"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="类型">
                        <a-select
                            v-decorator="['userGroupType']"
                            placeholder="请选择"
                        >
                            <a-select-option
                                v-for="item in userGroupTypeList"
                                :key="item.id"
                                :value="item.id"
                            >
                            {{item.text}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="课程名称">
                        <a-select
                             mode="multiple"
                            :filterOption="filterOption"
                            v-decorator="['courseCode']"
                            placeholder="请选择"
                        >
                            <a-select-option
                                v-for="item in courseList"
                                :key="item.id"
                                :value="item.id"
                            >
                            {{item.text}}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="手机号">
                        <a-input
                            v-decorator="['mobile']"
                            placeholder="请输入手机号"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="身份证号">
                        <a-input
                            v-decorator="['cardNumber']"
                            placeholder="请输入身份证号"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="学号/工号">
                        <a-input
                            v-decorator="['studentId']"
                            placeholder="请输入学号/工号"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <div class="formTitle">银行卡信息</div>
            <a-row :gutter="24">
                <a-col :span="6">
                    <a-form-item label="开户行">
                        <a-input
                            v-decorator="['bankName']"
                            placeholder="请输入开户行"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="开户行所在地">
                        <a-cascader
                            v-decorator="[
                                'residence',
                                {
                                    rules: [
                                        { type: 'array' },
                                    ],
                                }
                            ]"
                            :options="residences"
                            placeholder="请选择"
                        />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="银行卡号">
                        <a-input
                            v-decorator="['bankCardNumber']"
                            placeholder="请输入银行卡号"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row>
                <a-col>
                    <a-button @click="historyBack">
                        返回
                    </a-button>
                    <a-button
                        :style="{ marginLeft: '8px' }"
                        type="primary"
                        @click="saveAddTeacher"
                    >
                        保存
                    </a-button>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script>
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou'
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing'
      }
    ]
  }
]
const userGroupType = [{
  id: '0',
  text: '本校学生'
}, {
  id: '1',
  text: '本校职工'
}, {
  id: '2',
  text: '非本校'
}]
export default {
  data () {
    return {
      userList: [],
      courseList: [],
      userGroupTypeList: userGroupType,
      residences
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    // 获取角色数据
    this.$http.fetchGet(`${this.API}/Role/GetRoleSelectJsonByRoleType`, {
      roleType: 2,
      _: Math.random()
    }).then((oJson) => {
      this.userList = oJson.data
      // 判断时候是编辑
      if (this.$route.query.userId) {
        this.getRoleIds()
      }
    })
    // 获取课程名称
    this.$http.fetchGet(`${this.API}/Teacher/GetCourseJson`, {
      _: Math.random()
    }).then((oJson) => {
      this.courseList = oJson.data
    })
    // 判断时候是编辑
    if (this.$route.query.userId) {
      // 是编辑 请求教师默认数据
      // 获取教师信息
      this.$http.fetchGet(`${this.API}/Teacher/GetFormJson`, {
        userId: this.$route.query.userId,
        _: Math.random()
      }).then((oJson) => {
        const data = {}
        Object.assign(data, oJson.data[0].user, oJson.data[0].userCourse)
        data.courseCode = oJson.data[0].userCourse ? data.userCourse.split(',') : []
        data.residence = [data.bankProvince, data.bankCity]
        data.state = `${data.state}`
        // data.userGroupType = data.userGroupType ? data.userGroupType : ''
        delete data.userId
        delete data.bankProvince
        delete data.bankCity
        delete data.userType
        console.log(data)
        this.form.setFieldsValue(data)
      })
    }
  },
  methods: {
    saveAddTeacher () {
      this.form.validateFields((error, results) => {
        if (!error) {
          // 格式化参数
          const para = this.formatPara(results)
          // 整理参数
          para.roleId = para.roleId.length > 0 ? para.roleId.join(',') : ''
          para.courseCode = para.courseCode.length > 0 ? para.courseCode.join(',') : ''
          para.bankProvince = para.residence[0]
          para.bankCity = para.residence[1]
          para.userType = '2'
          delete para.residence
          this.$http.fetchPost(`${this.API}/Teacher/SubmitForm?keyValue=${this.$route.query.userId}`, para).then((oJson) => {
            if (oJson.data.state === 'success') {
              this.$message.success(oJson.data.message)
              this.$router.push('TeacherManage')
            } else {
              this.$error({
                centered: true,
                title: oJson.data.message
              })
            }
          })
        }
      })
    },
    historyBack () {
      this.$router.go(-1)
    },
    // 自定义下拉框搜索规则
    filterOption (input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    },
    getRoleIds () {
      this.$http.fetchPost(`${this.API}/Role/GetUserRoleIds`, {
        userId: this.$route.query.userId
      }).then((oJson) => {
        this.form.setFieldsValue({ roleId: oJson.data })
      })
    }
  }
}
</script>

<style lang="less">
</style>
