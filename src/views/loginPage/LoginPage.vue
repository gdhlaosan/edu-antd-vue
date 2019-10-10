<template>
<div>
<router-link to="layout">登录</router-link>
</div>
</template>

<script>
// import HomePage from '@/views/contentPage/HomePage.vue'

export default {
  // beforeRouteLeave (to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  //   // 离开登录页的时候获取菜单数据
  //   this.$store.dispatch('getSiderData', () => {
  //     const siderList = this.$store.state.authorizeMenu || JSON.parse(localStorage.getItem('siderData'))
  //     let siderRouter = []
  //     // 动态配置路由
  //     siderList.forEach(element => {
  //       element.ChildNodes.forEach(item => {
  //         let obj = {
  //           path: item.pName,
  //           name: item.pName,
  //           component: () => import(`@/views/contentPage/${item.pName}.vue`),
  //           meta: {
  //             pageName: item.realName
  //           }
  //         }
  //         siderRouter.push(obj)
  //       })
  //     })
  //     siderRouter.unshift({
  //       path: 'home',
  //       name: 'HomePage',
  //       component: HomePage
  //     })
  //     const routes = [{
  //       path: '/layout',
  //       name: 'layout',
  //       redirect: '/layout/home',
  //       component: () => import('@/views/Layout.vue'),
  //       children: siderRouter
  //     }]
  //     console.log(routes)
  //     this.$router.options.routes = routes
  //     this.$router.addRoutes(routes)
  //     console.log(this.$router)
  //     next()
  //   })
  // }
}
</script>

<style lang="less">

</style>
