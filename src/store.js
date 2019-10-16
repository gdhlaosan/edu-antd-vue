import Vue from 'vue'
import Vuex from 'vuex'

import $http from '@/https.js'
import { API } from '@/config/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapsed: false, // 菜单开闭状态
    authorizeMenu: JSON.parse(localStorage.getItem('siderData')) || [],
    userId: ''
  },
  mutations: {
    changeCollapsed (state) {
      state.collapsed = !state.collapsed
    },
    changeSiderData (state, data) {
      state.authorizeMenu = data
    },
    recordUserId (state, data) {
      state.userId = data
    },
    signOut (state) {
      state.userId = ''
      localStorage.removeItem('userId')
      localStorage.removeItem('siderData')
    }
  },
  getters: {
  },
  actions: {
    // 获取菜单数据
    getSiderData (context) {
      return new Promise((resolve, reject) => {
        $http.fetchGet(`${API}/ClientsData/GetClientsDataJson`, { r: Math.random() })
          .then((oJson) => {
            context.commit('changeSiderData', JSON.parse(oJson.data.authorizeMenu))
            localStorage.setItem('siderData', oJson.data.authorizeMenu)
            const siderList = JSON.parse(oJson.data.authorizeMenu)
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
            const routes = [{
              path: '/layout',
              name: 'layout',
              redirect: '/layout/home',
              component: () => import('@/views/Layout.vue'),
              children: siderRouter
            }]
            resolve(routes)
          })
      })
    }
  }
})
