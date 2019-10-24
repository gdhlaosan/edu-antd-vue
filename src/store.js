import Vue from 'vue'
import Vuex from 'vuex'

import $http from '@/https.js'
import { API, windowSize } from '@/config/config.js'
import extraRoutes from './extraRoutes.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapsed: document.documentElement.clientWidth <= windowSize.middleSize, // 菜单开闭状态
    authorizeMenu: JSON.parse(localStorage.getItem('siderData')) || [],
    userId: '',
    isMobile: document.documentElement.clientWidth <= windowSize.mobileSize,
    visible: false
  },
  mutations: {
    changeCollapsed (state) {
      if (state.isMobile) {
        state.collapsed = false
        state.visible = !state.visible
      } else {
        state.collapsed = !state.collapsed
      }
    },
    windowResize (state, flag) {
      if (flag === 'isPc') {
        state.collapsed = false
        state.isMobile = false
      } else if (flag === 'isMiddle') {
        state.collapsed = true
        state.isMobile = false
      } else if (flag === 'isMobile') {
        state.collapsed = true
        state.isMobile = true
        state.visible = false
      }
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
    },
    changeSiderVisible (state) {
      state.visible = false
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
                    key: item.pId,
                    preKey: item.parentId,
                    breadcrumb: [element.realName, item.realName]
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
            // 添加额外的路由
            const newSiderRouter = siderRouter.concat(extraRoutes)
            newSiderRouter.push(
              {
                path: '/layout/404',
                name: 'notFound',
                component: () => import('@/views/contentPage/notFound.vue')
              }, {
                path: '*', // 此处需特别注意置于最底部
                redirect: '/layout/404'
              }
            )
            const routes = [{
              path: '/layout',
              name: 'layout',
              redirect: '/layout/home',
              component: () => import('@/views/Layout.vue'),
              children: newSiderRouter
            }]
            resolve(routes)
          })
      })
    }
  }
})
