//路由鉴权文件
//鉴权：项目当中路由能不能被访问的权限的设置（权限管理：控制路由权限）即：某一个路由什么条件下可以访问，什么条件不能访问

// 引入路由
import router from '@/router'
// 引入进度条插件--引入之前需要安装nprogress  1、npm install nprogress@^0.2.0   2、npm install @types/nprogress --save-dev
import nprogress from 'nprogress'
// 引入进度条样式--否则进度条样式没有效果
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })//配置：隐藏加载时的小圆球

// 
import setting from './setting'

//1.在非组件环境下，使用小仓库前要先引入大仓库,,这里导入 pinia 实例，是为了让 “小仓库” 能挂载到全局 Pinia 上，确保数据能被全局访问。
import pinia from '@/store'
//2.获取用户相关的小仓库内部token数据，去判断用户是否登陆成功..获取用户相关的 “小仓库” 定义，这个函数封装了用户状态和操作方法。
import useUserStore from '@/store/modules/user'
//3. 创建用户仓库实例-----这一步是核心：调用 useUserStore 函数，并传入全局的 pinia 实例，创建出一个可以操作的 “用户仓库实例”。
let userStore = useUserStore(pinia) //useUserStore(pinia) 把小仓库挂载到全局大仓库，这样就能在任何地方访问到统一的用户状态（如 token）。
//为什么要传 pinia？
// 因为 useUserStore 函数需要知道自己属于哪个全局 Pinia 实例（相当于 “给小仓库找一个大仓库挂靠”），否则无法共享状态。只有传入全局 pinia 实例，才能确保在任何地方（组件、路由守卫等）获取到的 userStore 是同一个，数据是同步的。


//全局守卫：项目当中任意路由切换都会触发的钩子,路由的拦截器（方法）
//全局前置守卫
router.beforeEach(async (to, from, next) => {
  // to:要访问的路由对象
  // from:当前访问的路由对象，即你从那个路由来 
  // next:放行函数，调用next()方法，路由才能继续进行
  // next() 放行，路由可以继续进行
  // next(path) 放行，路由跳转到path路径
  // next(false) 拦截，路由不能进行
  // next(error) 错误，路由不能进行，并把错误对象传递给路由导航失败的回调函数

  document.title = `${setting.title}-${to.meta.title}`//设置页面标题
  // 开启进度条
  nprogress.start()//nprogress.start() 用于开启进度条，不用参数
  //获取token，去判断用户登录、还是未登录
  let token = userStore.token
  // 获取用户名字，用于判断是否要重新发请求获取用户信息
  let username = userStore.username
  //用户登录判断
  if (token) { //已登录
    //用户已登录，再访问登录页，则不能访问，强制跳转到首页
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 已登录，可以访问除登录页的6个路由
      if (username) {
        //如果用户已登录，且有用户信息，就放行
        next()
      } else {
        //如果没有用户信息，在守卫这里请求获取到了用户信息，再放行
        try {
          // 获取用户信息
          await userStore.userInfo()
          next()
        } catch (error) {
          //如果获取用户信息失败：情况1：token过期，获取不到用信息   情况2：用户手动修改本地存储token

          //退出登录-> 删除token，用户相关数据清空
          userStore.userLogout()
          // 跳转到登录页
          next({ path: '/login', query: { path: to.path } })
        }
      }
    }
  } else { //未登录
    if (to.path == '/login') {
      next()  //放行
    } else {
      // 进入 else 分支，说明用户未登录，且想访问的不是登录页（比如首页 /home、权限管理 /acl 等）
      // 这种情况下，需要拦截访问，强制跳转到登录页，并记录用户原本想访问的路径

      next({
        path: '/login',  // 跳转的目标路径：登录页
        query: { redirect: to.path }  // 携带查询参数：记录用户原本想访问的路径（to.path） 例如：用户想访问 /home，这里会跳转到 /login?redirect=/home     
      })
    }
  }
})

//全局后置守卫
router.afterEach((to, from) => {
  console.log('7777')

  // 关闭进度条
  nprogress.done()//nprogress.done() 用于关闭进度条，不用参数
})



//第一个问题：任意路由切换实现进度条业务  --nprogress
//第二个问题：路由鉴权（路由组件访问权限的设置）
//全部路由组件：登录|404|任意路由|数据大屏|首页|权限管理acl|商品管理product   （子路由不算入）

//           一级路由：登录、404、任意路由、数据大屏、权限管理路由acl(有3个子路由)、商品管理路由product(有4个子路由)
//           二级路由：首页（首页作为一级路由根，但实质是layout下的二级路由）、角色管理、菜单管理、用户管理、属性管理、品牌管理、spu管理、SKU管理 