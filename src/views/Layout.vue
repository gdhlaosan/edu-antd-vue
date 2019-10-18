<template>
  <a-layout id="layOut">
    <global-sider></global-sider>
    <a-layout
      :style="{marginLeft: mainLeft}"
      class="layoutMain"
    >
      <global-header class="layoutHeader" :style="{width: `calc(100% - ${mainLeft})`}"></global-header>
      <a-layout class="layoutWapper">
        <!-- <global-menu class="layoutMenu" :style="{width: `calc(100% - ${mainLeft})`}"></global-menu> -->
        <global-content class="layoutcontent"></global-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import GlobalContent from '@/components/GlobalContent/GlobalContent'
import GlobalSider from '@/components/GlobalSider/GlobalSider'
// import GlobalMenu from '@/components/GlobalMenu/GlobalMenu'

import { siderWidth } from '@/assets/common/common.js'

export default {
  components: {
    GlobalHeader,
    GlobalContent,
    GlobalSider
    // GlobalMenu
  },
  computed: {
    mainLeft () {
      return this.$store.state.collapsed ? '80px' : `${siderWidth}px`
    }
  }
}
</script>
<style lang='less'>
.layoutMain {
  transition: all 0.2s;
  min-height: 100vh;
  .layoutHeader {
    position: fixed;
    z-index: 10;
    background: #fff;
    padding: 0;
    right: 0;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    transition: all 0.2s;
  }
  .layoutWapper {
    margin-top: 64px;
    min-height: 280px;
    .layoutMenu {
      position: fixed;
      width: 100%;
      z-index: 5;
      right: 0;
      background-color: #ffffff;
      transition: all 0.2s;
    }
    .layoutcontent {
      margin: 16px 16px 24px 16px;
      padding: 24px;
      background: #ffffff;
    }
}
}
</style>
