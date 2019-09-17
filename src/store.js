import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: localStorage.count || 0,
    testData: 'gaodonghao'
  },
  mutations: {
    increment: (state, payload) => {
      console.log(payload)
      state.count++
      localStorage.count = state.count
    },
    decrement: (state, payload) => {
      console.log(payload)
      state.count--
      localStorage.count = state.count
    }
  },
  getters: {
    countTotal (state, getters) {
      return state.count * 2
    },
    preCount (state) {
      return state.count * 3
    }
  },
  actions: {
    lazyChange (context) {
      console.log(context)
      setTimeout(() => {
        context.commit('increment')
      }, 1000)
    }
  }
})
