<template>
  <a-locale-provider :locale="Chinese">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import Chinese from 'ant-design-vue/lib/locale-provider/zh_CN'

export default {
  data () {
    return {
      Chinese
    }
  }
}
</script>

<style lang="less">
</style>
