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
        :defaultSelectedKeys="defaultSelectedKeys"
    >
      <a-sub-menu v-for="menu in authorizeMenu" :key="menu.pId">
        <span slot="title">
          <a-icon type="mail" />
          <span>{{menu.realName}}</span>
        </span>
        <a-menu-item
          v-for="item in menu.ChildNodes"
          :key="item.pId"
          @click="changeRouter(item.pName)"
        >{{item.realName}}</a-menu-item>
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
    },
    authorizeMenu () {
      return this.$store.state.authorizeMenu
    },
    rootSubmenuKeys () {
      const rootKeys = []
      this.$store.state.authorizeMenu.forEach(elem => {
        rootKeys.push(elem.pId)
      })
      return rootKeys
    },
    // 默认选中菜单项
    defaultSelectedKeys () {
      return this.$route.meta.key ? [this.$route.meta.key] : []
    }
  },
  data () {
    return {
      siderWidth: siderWidth,
      openKeys: this.$route.meta.preKey ? [this.$route.meta.preKey] : [] // 展开的菜单项
    }
  },
  mounted () {
    this.$store.dispatch('getSiderData')
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
