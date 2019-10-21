<template>
    <a-layout-header>
      <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="chageCollapsed"
      />
      <span class="logout" @click="toLogin">
        <a-icon type="poweroff" /> 退出
      </span>
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
      this.$router.push('/')
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
.logout {
  float: right;
  margin-right: 30px;
  padding: 0 15px;
  cursor: pointer;
  line-height: 64px;
  &:hover {
    background-color: #e6f7ff;
  }
}
</style>
