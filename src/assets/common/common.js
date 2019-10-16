export const siderWidth = '256' // layout-sider宽度

export default {
  install (Vue, options) {
    Vue.prototype.formatPara = (values) => {
      for (let key in values) {
        values[key] = !values[key] ? '' : values[key]
      }
      return values
    }
  }
}
