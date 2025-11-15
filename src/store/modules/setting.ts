//小仓库：layout组件相关配置仓库
import { defineStore } from 'pinia'
let useLayOutSetting = defineStore('layout', {
  state: () => {
    return {
      fold: false,//用户控制菜单是否折叠
      refresh: false,//用户控制菜单刷新，（可用于setting组件和main组件通信）点击刷新按钮后，将refresh设置为true，刷新页面，将refresh设置为false，刷新完成
    }
  }
})
export default useLayOutSetting