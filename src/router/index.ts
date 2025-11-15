//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router'//从vue-router插件中导入createRouter函数，用于创建路由实例
import { constantRoutes } from './routes'//导入路由配置文件中的常量路由

//创建路由器
let router = createRouter({
  history: createWebHashHistory(), //使用hash模式的路由历史记录
  routes: constantRoutes, //使用导入的常量路由配置
  //滚动行为配置-----滚动行为这段代码的作用是无论何时发生路由跳转，页面都会自动滚动到最顶部，最左侧的位置。
  // 这是一种常见的用户体验（UX）设计，确保用户在进入新的页面或视图时，总是从屏幕的起始位置开始阅读内容。
  scrollBehavior() {  //scrollBehavior 是 Vue Router 中的一个导航守卫函数，用于在路由导航时控制滚动条的位置
    // scrollBehavior(to:要导航到的目标路由对象, from:当前导航离开的路由对象, savedPosition:之前保存的滚动位置,是一个对象（仅当通过浏览器前进/后退触发时）) 是一个函数，它的作用是定义滚动行为。 
    // { 返回滚动位置（一个对象） }
    // 
    return {
      top: 0,
      left: 0
    }
  }
})
//对外暴露路由器
export default router