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
    this.$http.fetchGet('/ExamPlan/GetAllExamJson', {})
      .then((data) => {
        console.log(data)
      })
  }
}
</script>

<style lang="less">
</style>
