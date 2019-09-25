const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#3b8eff',
          'link-color': '#3891FF',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/common/common.less')] // 引入公共文件
    }
  }
}
