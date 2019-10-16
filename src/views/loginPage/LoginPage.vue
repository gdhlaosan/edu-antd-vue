<template>
<div>
  <a-button type="primary" @click="login" :loading="loading">登录</a-button>
</div>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    login () {
      const _this = this
      this.loading = true
      // 模拟异步登录成功
      setTimeout(() => {
        // 记录登录后的userId
        const userId = 'gaodonghao'
        _this.$store.commit('recordUserId', userId)
        localStorage.setItem('userId', userId)

        _this.$store.dispatch('getSiderData').then((data) => {
          _this.loading = false
          _this.$router.$addRoutes(data) // 调取自定义添加路由方法
          _this.$router.push('/layout')
        })
      }, 500)
    }
  }
}
</script>

<style lang="less">

</style>
