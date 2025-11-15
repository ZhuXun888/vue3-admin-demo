
//对外暴露配置路由 （常量路由）

//constantRoutes:常量路由   是一个数组，里面放置着所有常量路由
export const constantRoutes = [
  //登录路由
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),//懒加载登录页面
    name: 'Login',
    meta: {  //meta:元数据，用于放置一些路由的额外信息，比如：路由的标题、是否需要登录权限、是否隐藏路由等等
      title: '登录', //路由的标题
      hidden: true, //是否隐藏路由
      icon: 'Promotion'//菜单文字左侧的图标
    }
  },
  //首页路由--登陆成功后展示数据的路由
  {
    path: '/', //----------这里写成'/'，表示根路径，也就是默认进入的页面，如果写成'home'，就没有根路径，那么代码初次运行时，就会进入404
    component: () => import('@/layout/index.vue'),//懒加载首页页面
    name: 'Layout',
    meta: {
      title: '',
      hidden: false,
      icon: ''//这里设置为空，方便后续面包屑过滤掉首页的一级标题layout
    },
    redirect: '/home',//重定向 到 /home
    children: [  //嵌套二级路由:定义子路由
      {
        path: '/home', //注意：虽然是二级路由的路径，这里要写'/'，否则点击首页跳转时，路径匹配错误，跳转到404 
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: '首页',
          icon: 'HomeFilled'
        }
      },
    ]
  },
  //404路由
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'CircleCloseFilled'
    },
    children: [
      {
        path: '404',
        component: () => import('@/views/404/index.vue'),
        meta: {
          title: '40404',
          icon: 'CircleCloseFilled'
        }
      }
    ]
  },
  //任意路由--匹配未定义的路由,就是用户输入的地址找不到的时候，会匹配这个路由
  {
    path: '/:pathMatch(.*)*',//匹配所有其他路由规则没有匹配到的路径
    // : - 表示动态参数
    // pathMatch - 参数名称（可以自定义，常用 pathMatch 或 catchAll）
    // (.*) - 正则表达式： . 匹配任意字符（除了换行符） *  匹配前面的模式0次或多次 .* - 匹配任意字符任意次数
    // * - 最后的星号表示可以匹配多级路径
    redirect: '/404',//当匹配到任意未定义的路由时，自动重定向到 /404 路径
    name: 'Any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'HelpFilled'
    }
  },
  //数据大屏路由
  {
    path: '/screen',
    component: () => import('@/views/screen/index.vue'),
    name: 'Screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Platform'
    }
  },
  //权限管理路由
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),//路径映射到layout组件,因为权限管理、商品管理和layout一样，都只是骨架，一个容器，“布局容器路由”—— 它们本身不展示具体业务内容，而是作为 “骨架” 承载子路由对应的页面组件。
    // 为什么自身不展示内容？因为这些一级容器路由的作用是 “承载子路由”，所以配置了 redirect 自动跳转到具体的子路由
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock'
    },
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        component: () => import('@/views/acl/user/index.vue'),
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        }
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled'
        }
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Monitor'
        }
      }
    ]
  },
  //商品管理路由
  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods'
    },
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: () => import('@/views/product/trademark/index.vue'),
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull',
          hidden: false
        }
      },
      {
        path: '/product/attr',
        component: () => import('@/views/product/attr/index.vue'),
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled',
          hidden: false
        }
      },
      {
        path: '/product/spu',
        component: () => import('@/views/product/spu/index.vue'),
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Monitor',
          hidden: false
        }
      },
      {
        path: '/product/sku',
        component: () => import('@/views/product/sku/index.vue'),
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Tickets',
          hidden: false
        }
      }
    ]
  }
]