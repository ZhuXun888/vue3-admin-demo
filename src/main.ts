import { createApp } from 'vue'

//整体导入 ElementPlus 组件库
import ElementPlus from 'element-plus' //导入 ElementPlus 组件库的所有模块和功能 
import 'element-plus/dist/index.css' //导入 ElementPlus 组件库所需的全局 CSS 样式
import zhCn from 'element-plus/es/locale/lang/zh-cn' //导入 ElementPlus 组件库的中文语言包--配置element-plus国际化
// 引入暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'

import App from './App.vue'

const app = createApp(App)

//整体注册 /安装 ElementPlus 组件库
app.use(ElementPlus, {
  locale: zhCn  //配置 element-plus国际化 ，使用中文语言包
}) //将 ElementPlus 组件库作为 Vue 应用程序的插件进行注册，使其组件和功能在应用中可用，并配置为使用中文语言包

import 'virtual:svg-icons-register' //导入 SVG 图标注册模块，启用 SVG 图标功能，允许使用 SVG 图标

//注册全局组件--这里是一个一个注册，适用于小型项目，如果是大型项目，组件较多，再一个一个注册麻烦，建议看下面，封装并使用自定义全局组件的插件
// import SvgIcon from './components/SvgIcon/index.vue'//导入自定义（二次封装）的 SVG 图标组件，用于在应用中显示 SVG 图标
// app.component('SvgIcon', SvgIcon) //全局注册 SVG 图标组件，使其可以在应用的任何地方使用，同时无需单独导入

//引入自定义插件对象：注册整个项目的全局组件
import allQuanjuComponents from './components'//导入自定义的全局组件插件对象，用于批量注册和管理多个全局组件
app.use(allQuanjuComponents) //使用自定义的全局组件插件，批量注册和管理多个全局组件，简化组件注册过程

//引入模板的全局样式
import './styles/index.scss' //导入全局 SCSS 样式文件，应用于整个 Vue 应用程序，确保一致的样式和布局

//引入axios
//测试代码，测试mock假的接口能否使用
import axios from 'axios' //导入 Axios 库，用于发送 HTTP 请求和处理响应
axios({
  url: '/api/user/login',
  method: 'post',
  data: {
    username: 'admin',
    password: '111111',
  },
}).then((response) => {
  console.log('登录成功：', response.data);
}).catch((error) => {
  console.error('登录失败：', error.response.data);
});

//引入路由
import router from './router'
//注册模板路由
app.use(router)

//引入pinia仓库
import pinia from './store'
//安装/注册 pinia仓库
app.use(pinia)

// 引入路由鉴权文件
import './permission'

//环境变量
// console.log('当前环境变量：', import.meta.env) //输出当前的环境变量信息到控制台，便于调试和查看环境配置
//通过import.meta.env获取环境变量,包含Vite项目中的所有环境变量

app.mount('#app')//将 Vue 应用程序挂载到具有指定选择器（#app）的 DOM 元素上，使应用程序开始运行并显示在页面上
