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
  },
  created () {
    this.$http.fetchGet('/ClientsData/GetClientsDataJson', { r: Math.random() })
      .then((data) => {

      })
  }
}
</script>

<style lang="less">
</style>
