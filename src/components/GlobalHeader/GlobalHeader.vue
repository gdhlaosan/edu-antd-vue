<template>
    <a-layout-header class="layoutHeader">
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
.layoutHeader {
  position: fixed;
  z-index: 1;
  width: 100%;
  background: #fff;
   padding: 0;
   box-shadow: 0 1px 4px rgba(0,21,41,.08);
}
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
  &:hover {
    color: #1890ff;
  }
}
</style>
