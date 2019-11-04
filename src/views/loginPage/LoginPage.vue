<template>
<div class="loginPage">
  <a-row>
    <a-col>
      <a-form class="loginForm" :form="form">
        <a-form-item>
          <span class="loginTitle">登录</span>
        </a-form-item>
        <a-form-item>
          <a-input type="text" size="large" placeholder="用户名:gaodonghao" v-decorator="['username',{ rules: [{ required: true, message: '用户名不能为空' }] }]">
            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input type="password" size="large" placeholder="密码:G123456" v-decorator="['password',{ rules: [{ required: true, message: '密码不能为空' }] }]">
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <a-row :gutter="16">
          <a-col :span="18">
            <a-form-item>
              <a-input size="large" placeholder="验证码:随便填" v-decorator="['code',{ rules: [{ required: true, message: '验证码不能为空' }] }]">
                <a-icon slot="prefix" type="code-sandbox" :style="{ color: 'rgba(0,0,0,.25)' }"/>
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <img class="imgCode" :src="imgSrc" @click="changeImgCode" alt="">
          </a-col>
        </a-row>
        <a-form-item v-if="isError">
          <a-alert type="error" :message="errorMessage" showIcon />
        </a-form-item>
        <a-form-item>
          <a-row>
            <a-col>
              <a-button :loading="loading" size="large" type="primary" @click="login" class="login-button">
                登录
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</div>
</template>

<script>
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false,
      timeCode: Math.random(),
      errorMessage: '',
      isError: false
    }
  },
  computed: {
    imgSrc () {
      return `http://172.16.16.212:40020/Api/Login/GetAuthCode?time=${this.timeCode}`
    }
  },
  methods: {
    login () {
      this.form.validateFields((err, loginPara) => {
        if (!err) {
          this.loading = true
          // 登录
          this.$http.fetchPost(`${this.API}/Login/CheckLogin`, loginPara).then((oJson) => {
            this.loading = false
            if (oJson.data.state === 'error') {
              this.isError = true
              this.timeCode = Math.random()
              this.errorMessage = oJson.data.message
            } else {
              this.isError = false
              const omsToken = oJson.data.data
              this.$store.commit('recordOmsToken', omsToken)
              localStorage.setItem('oms_token', omsToken)

              this.$store.dispatch('getSiderData').then((data) => {
                this.$router.$addRoutes(data) // 调取自定义添加路由方法
                console.log(data)
                this.$router.push('/layout')
              })
            }
          })
        }
      })
      // const _this = this
      // setTimeout(() => {
      //   // 记录登录后的userId
      //   const userId = 'gaodonghao'
      //   _this.$store.commit('recordUserId', userId)
      //   localStorage.setItem('userId', userId)

      //   _this.$store.dispatch('getSiderData').then((data) => {
      //     _this.loading = false
      //     _this.$router.$addRoutes(data) // 调取自定义添加路由方法
      //     console.log(data)
      //     _this.$router.push('/layout')
      //   })
      // }, 500)
    },
    // 换验证码
    changeImgCode () {
      this.timeCode = Math.random()
    }
  }
}
</script>

<style lang="less">
.loginPage {
  min-height: 100%;
  background: #f0f2f5 url(../../assets/background.svg) no-repeat 50%;
  .loginForm {
    width: 368px;
    margin: 0 auto;
    padding-top: 220px;
    .login-button {
      width: 100%;
    }
    .ant-form-item-control {
      .loginTitle {
        color: rgba(0, 0, 0, 0.85);
        font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-size: 24px;
        font-weight: bold;
      }
    }
    .imgCode {
      margin-top: 6px;
    }
  }
}
</style>
