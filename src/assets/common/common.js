import store from '@/store'

export const siderWidth = '256' // layout-sider宽度

// 监听窗口缩放(防抖)
// 防抖
function debounce (fn, wait) {
  var timeout = null
  return function () {
    if (timeout !== null) clearTimeout(timeout)
    timeout = setTimeout(fn, wait)
  }
}
// 处理函数
function windowRisize () {
  let windowWidth = document.documentElement.clientWidth
  if (windowWidth <= 960) {
    store.commit('windowResize', true)
  } else {
    store.commit('windowResize', false)
  }
}
// 监听窗口缩放
window.addEventListener('resize', debounce(windowRisize, 100))

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
