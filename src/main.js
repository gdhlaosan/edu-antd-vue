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

Vue.prototype.$http = https
Vue.prototype.API = API

Vue.use(Antd)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.path === '/') { // 如果跳转到了登录页，清除store和localStorage里面的userId、addRoutes和siderData
    store.commit('signOut')
  } else {
    if (localStorage.getItem('userId')) {
      if (!store.state.userId) { // localStorage中有userId 但是Vuex中没有userId 证明用户刷新页面了
        const routes = JSON.parse(localStorage.getItem('addRoutes'))
        store.commit('recordUserId', localStorage.getItem('userId'))
        router.addRoutes([routes])
        router.options.routes.push(routes)
        router.push(to.path)
      }
    }
  }
  setTimeout(() => {
    next()
  }, 100)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
