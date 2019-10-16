// 引入@babel/polyfill处理兼容
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import https from './https.js'
import { API } from '@/config/config.js'

// 引入公共方法
import common from '@/assets/common/common'

Vue.prototype.$http = https
Vue.prototype.API = API

Vue.use(Antd)
Vue.use(common)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  // 如果页面跳转的是登录页 需要取消登录状态
  if (to.path === '/') {
    store.commit('signOut')
  }
  next()
})
router.onReady(() => {
  const userId = localStorage.getItem('userId') // 判断用户已登录且已有权限
  if (userId) {
    store.dispatch('getSiderData') // 请求动态路由
      .then(data => {
        router.addRoutes(data) // 添加动态路由,这里不必用$addRoutes，因为刷新后就没有上一次的动态路由，故不必清除
      })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
