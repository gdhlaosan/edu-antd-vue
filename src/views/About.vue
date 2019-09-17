<template>
  <div class="about">
    <h1>{{count}}</h1>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <h2>{{countTotal}}</h2>
    <h3 @click="handleClick" data-type="handle">点击</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      count: state => state.count,
      testData: 'testData'
    }),
    countTotal () {
      return this.$store.getters.countTotal
    }
  },
  methods: {
    increment () {
      this.$store.commit('increment', {
        type: 'add'
      })
    },
    decrement () {
      this.$store.commit('decrement', {
        type: 'delete'
      })
    },
    handleClick (e) {
      this.$store.dispatch('lazyChange')
    }
  }
}
</script>

<style lang="less">

</style>
