<template>
    <a-layout-header>
      <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="chageCollapsed"
      />
      <span @click="toLogin">退出</span>
    </a-layout-header>
</template>

<script>
export default {
  computed: {
    collapsed () {
      return this.$store.state.collapsed
    },
    contentWidth () {
      return this.$store.getters.contentWidth
    }
  },
  methods: {
    chageCollapsed () {
      this.$store.commit('changeCollapsed')
    },
    toLogin () {
      this.$store.commit('signOut')
      // 必须用window.location.href来跳转 是为了刷新页面重置router 否则再次登录路由重复
      window.location.href = '/'
    }
  }
}
</script>

<style lang="less">
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
