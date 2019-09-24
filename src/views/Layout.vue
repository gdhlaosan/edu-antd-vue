<template>
  <a-layout id="layOut">
    <global-sider></global-sider>
    <a-layout
      :style="{marginLeft: mainLeft}"
      class="layoutMain"
    >
      <global-header></global-header>
      <a-layout class="layoutWapper">
        <global-menu class="layoutMenu"></global-menu>
        <global-content class="layoutcontent"></global-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader'
import GlobalContent from '@/components/GlobalContent/GlobalContent'
import GlobalSider from '@/components/GlobalSider/GlobalSider'
import GlobalMenu from '@/components/GlobalMenu/GlobalMenu'

export default {
  components: {
    GlobalHeader,
    GlobalContent,
    GlobalSider,
    GlobalMenu
  },
  computed: {
    mainLeft () {
      return this.$store.state.collapsed ? '80px' : '200px'
    }
  }
}
</script>
<style lang='less'>
.layoutMain {
  transition: all 0.2s;
  min-height: 100vh;
  .layoutWapper {
    margin-top: 64px;
    min-height: 280px;
    .layoutMenu {
      position: fixed;
      width: 100%;
      background-color: #ffffff;
    }
    .layoutcontent {
      margin: 60px 16px 24px 16px;
      padding: 24px;
      background: #ffffff;
    }
}
}
</style>
