<template>
    <a-tabs
        @change="callback"
        type="editable-card"
        hideAdd
        v-model="activeKey"
        size="small"
    >
        <a-tab-pane tab="Tab 1" key="1"></a-tab-pane>
        <a-tab-pane tab="Tab 2" key="2"></a-tab-pane>
        <a-tab-pane tab="Tab 3" key="3"></a-tab-pane>
    </a-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeKey: '2'
    }
  },
  methods: {
    callback () {

    }
  }
}
</script>

<style lang="less">
.ant-tabs-bar {
    padding: 10px 0 0 24px;
    margin-bottom: 0;
}
</style>
