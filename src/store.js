import Vue from 'vue'
import Vuex from 'vuex'

import $http from '@/https.js'
import { API } from '@/config/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapsed: false, // 菜单开闭状态
    authorizeMenu: JSON.parse(localStorage.getItem('siderData')) || []
  },
  mutations: {
    changeCollapsed (state) {
      state.collapsed = !state.collapsed
    },
    changeSiderData (state, data) {
      state.authorizeMenu = data
    }
  },
  getters: {
  },
  actions: {
    // 获取菜单数据
    getSiderData (context) {
      $http.fetchGet(`${API}/ClientsData/GetClientsDataJson`, { r: Math.random() })
        .then((oJson) => {
          context.commit('changeSiderData', JSON.parse(oJson.data.authorizeMenu))
          localStorage.setItem('siderData', oJson.data.authorizeMenu)
          console.log(JSON.parse(oJson.data.authorizeMenu))
        })
    }
  }
})
