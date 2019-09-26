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
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/np/' : '/'
  // axios域代理，解决axios跨域问题
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://172.16.16.212:40020',
  //       changeOrigin: true,
  //       ws: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
}