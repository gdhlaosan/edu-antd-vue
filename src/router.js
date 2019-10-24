import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 默认的路由规则，比如登录页（非权限页）
const constantRouterMap = [{
  path: '/',
  name: 'login',
  component: () => import('./views/loginPage/LoginPage.vue')
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})

router.$addRoutes = (params) => {
  router.matcher = new Router({ // 重置路由规则
    mode: 'history',
    base: process.env.BASE_URL,
    routes: constantRouterMap
  }).matcher
  router.addRoutes(params) // 添加路由
}

export default router
