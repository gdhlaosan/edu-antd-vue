import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    collapsed: false // 菜单开闭状态
  },
  mutations: {
    changeCollapsed (state) {
      state.collapsed = !state.collapsed
    }
  },
  getters: {
  },
  actions: {
  }
})
