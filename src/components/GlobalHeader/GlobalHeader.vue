<template>
    <a-layout-header style="background: #fff; padding: 0">
    <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="chageCollapsed"
    />
    </a-layout-header>
</template>

<script>
export default {
  computed: {
    collapsed () {
      return this.$store.state.collapsed
    }
  },
  methods: {
    chageCollapsed () {
      this.$store.commit('changeCollapsed')
    }
  }
}
</script>

<style lang="less">
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}
</style>
