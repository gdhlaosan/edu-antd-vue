<template>
  <a-layout-sider
    :trigger="null"
    collapsible
    v-model="collapsed"
    theme="light"
    class="layoutSider"
    :width="siderWidth"
  >
    <div class="logo">
      <span class="logo-img">OMS</span>
      <span class="logo-text" :style="{display: collapsed ? 'none' : 'inline'}"> 在线阅卷系统</span>
    </div>
    <a-menu mode="inline"
        :openKeys="openKeys"
        @openChange="onOpenChange"
    >
      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="mail" />
          <span>Navigation One</span>
        </span>
        <a-menu-item key="1" @click="changeRouter('home')">homePage</a-menu-item>
        <a-menu-item key="2" @click="changeRouter('table')">tablePage</a-menu-item>
        <a-menu-item key="3">Option 3</a-menu-item>
        <a-menu-item key="4">Option 4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="appstore" />
          <span>Navigation Two</span>
        </span>
        <a-menu-item key="5">Option 5</a-menu-item>
        <a-menu-item key="6">Option 6</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <span slot="title">
          <a-icon type="setting" />
          <span>Navigation Three</span>
        </span>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-menu-item key="11">Option 11</a-menu-item>
        <a-menu-item key="12">Option 12</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { siderWidth } from '@/assets/common/common.js'

export default {
  computed: {
    collapsed () {
      return this.$store.state.collapsed
    }
  },
  data () {
    return {
      siderWidth: siderWidth,
      rootSubmenuKeys: ['sub1', 'sub2', 'sub4'],
      openKeys: ['sub2']
    }
  },
  methods: {
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      )
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    },
    changeRouter (changeRouter) {
      this.$router.push(changeRouter)
    }
  }
}
</script>

<style lang="less">
.layoutSider {
  position: fixed;
  left: 0;
  height: 100vh;
  overflow: auto;
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  .logo {
    height: 32px;
    line-height: 32px;
    text-align: center;
    margin: 16px;
    font-size: 18px;
    font-weight: bold;
    .logo-img {
      color: @primary-color;
    }
  }
}
</style>
