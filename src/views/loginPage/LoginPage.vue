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

        _this.$store.dispatch('getSiderData', (data) => {
          _this.loading = false
          const siderList = data
          let siderRouter = []
          // 动态配置路由
          siderList.forEach(element => {
            element.ChildNodes.forEach(item => {
              let obj = {
                path: item.pName,
                name: item.pName,
                component: () => import(`@/views/contentPage/${item.pName}.vue`),
                meta: {
                  preKey: item.parentId,
                  key: item.pId,
                  name: item.realName
                }
              }
              siderRouter.push(obj)
            })
          })
          siderRouter.unshift({
            path: 'home',
            name: 'HomePage',
            component: () => import('@/views/contentPage/HomePage.vue')
          })
          const routes = {
            path: '/layout',
            name: 'layout',
            redirect: '/layout/home',
            component: () => import('@/views/Layout.vue'),
            children: siderRouter
          }
          _this.$router.addRoutes([routes])
          _this.$router.options.routes.push(routes)
          _this.$router.push('layout/home')
          localStorage.setItem('addRoutes', JSON.stringify(routes))
        })
      }, 500)
    }
  }
}
</script>

<style lang="less">

</style>
