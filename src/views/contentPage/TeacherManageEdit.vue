<template>
    <div>
        <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item v-for="(item, index) in $route.meta.breadcrumb" :key="index">{{item}}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-form :form="form" @submit="saveAddTeacher">
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
                        <a-input
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
                    <a-form-item label="课程名称">
                        <a-select
                            v-decorator="['courseCode']"
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
                        html-type="submit"
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
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake'
          }
        ]
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men'
          }
        ]
      }
    ]
  }
]
export default {
  data () {
    return {
      userList: [],
      residences
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this)
  },
  mounted () {
    this.$http.fetchGet(`${this.API}/Role/GetRoleSelectJsonByRoleType`, {
      roleType: 2,
      _: Math.random()
    }).then((oJson) => {
      this.userList = oJson.data
    })
  },
  methods: {
    saveAddTeacher () {
    //   this.form.validateFields((error, results) => {
    //     console.log(results)
    //   })
    },
    historyBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">

</style>
