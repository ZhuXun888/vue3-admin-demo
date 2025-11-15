// 模拟所有角色
const allRolesList = [
  {
    id: 1,
    roleName: '超级管理员',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 2,
    roleName: '产品经理',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 3,
    roleName: '前端工程师',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 4,
    roleName: '后端工程师',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 5,
    roleName: 'UI设计师',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 6,
    roleName: '测试工程师',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 7,
    roleName: '运维工程师',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 8,
    roleName: '数据分析师',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 9,
    roleName: 'Android开发',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 10,
    roleName: 'iOS开发',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 11,
    roleName: '项目经理',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
  {
    id: 12,
    roleName: '技术负责人',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
  },
]
// 模拟权限数据
const menuList = [
  {
    id: 1,
    name: '系统管理',
    path: '/system',
    component: 'Layout',
    icon: 'setting',
    children: [
      {
        id: 11,
        name: '用户管理',
        path: 'user',
        component: 'system/user/index',
        icon: 'user',
        children: [
          {
            id: 111,
            name: '用户查询',
            path: 'query',
            component: 'system/user/query',
            icon: 'search',
            children: [
              { id: 1111, name: '精确查询', path: 'exact', component: 'system/user/query/exact' },
              { id: 1112, name: '模糊查询', path: 'fuzzy', component: 'system/user/query/fuzzy' },
              { id: 1113, name: '高级查询', path: 'advanced', component: 'system/user/query/advanced' },
              { id: 1114, name: '批量查询', path: 'batch', component: 'system/user/query/batch' }
            ]
          },
          {
            id: 112,
            name: '用户操作',
            path: 'operation',
            component: 'system/user/operation',
            icon: 'edit',
            children: [
              { id: 1121, name: '添加用户', path: 'add', component: 'system/user/operation/add' },
              { id: 1122, name: '编辑用户', path: 'edit', component: 'system/user/operation/edit' },
              { id: 1123, name: '删除用户', path: 'delete', component: 'system/user/operation/delete' },
              { id: 1124, name: '导入用户', path: 'import', component: 'system/user/operation/import' }
            ]
          },
          {
            id: 113,
            name: '用户权限',
            path: 'permission',
            component: 'system/user/permission',
            icon: 'lock',
            children: [
              { id: 1131, name: '权限分配', path: 'assign', component: 'system/user/permission/assign' },
              { id: 1132, name: '权限回收', path: 'revoke', component: 'system/user/permission/revoke' },
              { id: 1133, name: '权限审核', path: 'review', component: 'system/user/permission/review' },
              { id: 1134, name: '权限日志', path: 'log', component: 'system/user/permission/log' }
            ]
          }
        ]
      },
      {
        id: 12,
        name: '角色管理',
        path: 'role',
        component: 'system/role/index',
        icon: 'peoples',
        children: [
          {
            id: 121,
            name: '角色配置',
            path: 'config',
            component: 'system/role/config',
            icon: 'setting',
            children: [
              { id: 1211, name: '角色创建', path: 'create', component: 'system/role/config/create' },
              { id: 1212, name: '角色修改', path: 'modify', component: 'system/role/config/modify' },
              { id: 1213, name: '角色删除', path: 'remove', component: 'system/role/config/remove' },
              { id: 1214, name: '角色复制', path: 'copy', component: 'system/role/config/copy' }
            ]
          },
          {
            id: 122,
            name: '权限分配',
            path: 'assign',
            component: 'system/role/assign',
            icon: 'share',
            children: [
              { id: 1221, name: '菜单权限', path: 'menu', component: 'system/role/assign/menu' },
              { id: 1222, name: '数据权限', path: 'data', component: 'system/role/assign/data' },
              { id: 1223, name: '操作权限', path: 'operation', component: 'system/role/assign/operation' },
              { id: 1224, name: '接口权限', path: 'api', component: 'system/role/assign/api' }
            ]
          },
          {
            id: 123,
            name: '角色审核',
            path: 'review',
            component: 'system/role/review',
            icon: 'document',
            children: [
              { id: 1231, name: '申请审核', path: 'apply', component: 'system/role/review/apply' },
              { id: 1232, name: '变更审核', path: 'change', component: 'system/role/review/change' },
              { id: 1233, name: '权限审计', path: 'audit', component: 'system/role/review/audit' },
              { id: 1234, name: '违规检测', path: 'violation', component: 'system/role/review/violation' }
            ]
          }
        ]
      },
      {
        id: 13,
        name: '权限管理',
        path: 'permission',
        component: 'system/permission/index',
        icon: 'key',
        children: [
          {
            id: 131,
            name: '菜单管理',
            path: 'menu',
            component: 'system/permission/menu',
            icon: 'menu',
            children: [
              { id: 1311, name: '菜单配置', path: 'config', component: 'system/permission/menu/config' },
              { id: 1312, name: '菜单排序', path: 'sort', component: 'system/permission/menu/sort' },
              { id: 1313, name: '菜单隐藏', path: 'hide', component: 'system/permission/menu/hide' },
              { id: 1314, name: '菜单导出', path: 'export', component: 'system/permission/menu/export' }
            ]
          },
          {
            id: 132,
            name: '接口管理',
            path: 'api',
            component: 'system/permission/api',
            icon: 'link',
            children: [
              { id: 1321, name: '接口注册', path: 'register', component: 'system/permission/api/register' },
              { id: 1322, name: '接口测试', path: 'test', component: 'system/permission/api/test' },
              { id: 1323, name: '接口监控', path: 'monitor', component: 'system/permission/api/monitor' },
              { id: 1324, name: '接口日志', path: 'log', component: 'system/permission/api/log' }
            ]
          },
          {
            id: 133,
            name: '数据权限',
            path: 'data',
            component: 'system/permission/data',
            icon: 'pie-chart',
            children: [
              { id: 1331, name: '数据范围', path: 'scope', component: 'system/permission/data/scope' },
              { id: 1332, name: '数据过滤', path: 'filter', component: 'system/permission/data/filter' },
              { id: 1333, name: '数据脱敏', path: 'masking', component: 'system/permission/data/masking' },
              { id: 1334, name: '数据导出', path: 'export', component: 'system/permission/data/export' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: '商品管理',
    path: '/product',
    component: 'Layout',
    icon: 'shopping',
    children: [
      {
        id: 21,
        name: '商品列表',
        path: 'list',
        component: 'product/list/index',
        icon: 'list',
        children: [
          {
            id: 211,
            name: '商品查询',
            path: 'query',
            component: 'product/list/query',
            icon: 'search',
            children: [
              { id: 2111, name: '分类查询', path: 'category', component: 'product/list/query/category' },
              { id: 2112, name: '关键词查询', path: 'keyword', component: 'product/list/query/keyword' },
              { id: 2113, name: '价格区间', path: 'price', component: 'product/list/query/price' },
              { id: 2114, name: '库存查询', path: 'stock', component: 'product/list/query/stock' }
            ]
          },
          {
            id: 212,
            name: '商品操作',
            path: 'operation',
            component: 'product/list/operation',
            icon: 'edit',
            children: [
              { id: 2121, name: '上架商品', path: 'publish', component: 'product/list/operation/publish' },
              { id: 2122, name: '下架商品', path: 'unpublish', component: 'product/list/operation/unpublish' },
              { id: 2123, name: '批量操作', path: 'batch', component: 'product/list/operation/batch' },
              { id: 2124, name: '商品推荐', path: 'recommend', component: 'product/list/operation/recommend' }
            ]
          },
          {
            id: 213,
            name: '商品审核',
            path: 'review',
            component: 'product/list/review',
            icon: 'document',
            children: [
              { id: 2131, name: '新品审核', path: 'new', component: 'product/list/review/new' },
              { id: 2132, name: '修改审核', path: 'modify', component: 'product/list/review/modify' },
              { id: 2133, name: '违规审核', path: 'violation', component: 'product/list/review/violation' },
              { id: 2134, name: '紧急审核', path: 'urgent', component: 'product/list/review/urgent' }
            ]
          }
        ]
      },
      {
        id: 22,
        name: '商品分类',
        path: 'category',
        component: 'product/category/index',
        icon: 'tree',
        children: [
          {
            id: 221,
            name: '分类管理',
            path: 'manage',
            component: 'product/category/manage',
            icon: 'folder',
            children: [
              { id: 2211, name: '添加分类', path: 'add', component: 'product/category/manage/add' },
              { id: 2212, name: '编辑分类', path: 'edit', component: 'product/category/manage/edit' },
              { id: 2213, name: '删除分类', path: 'delete', component: 'product/category/manage/delete' },
              { id: 2214, name: '移动分类', path: 'move', component: 'product/category/manage/move' }
            ]
          },
          {
            id: 222,
            name: '分类排序',
            path: 'sort',
            component: 'product/category/sort',
            icon: 'sort',
            children: [
              { id: 2221, name: '拖拽排序', path: 'drag', component: 'product/category/sort/drag' },
              { id: 2222, name: '权重排序', path: 'weight', component: 'product/category/sort/weight' },
              { id: 2223, name: '热门排序', path: 'hot', component: 'product/category/sort/hot' },
              { id: 2224, name: '自定义排序', path: 'custom', component: 'product/category/sort/custom' }
            ]
          },
          {
            id: 223,
            name: '分类属性',
            path: 'attribute',
            component: 'product/category/attribute',
            icon: 'collection',
            children: [
              { id: 2231, name: '属性配置', path: 'config', component: 'product/category/attribute/config' },
              { id: 2232, name: '属性分组', path: 'group', component: 'product/category/attribute/group' },
              { id: 2233, name: '属性模板', path: 'template', component: 'product/category/attribute/template' },
              { id: 2234, name: '属性导入', path: 'import', component: 'product/category/attribute/import' }
            ]
          }
        ]
      },
      {
        id: 23,
        name: '品牌管理',
        path: 'brand',
        component: 'product/brand/index',
        icon: 'price-tag',
        children: [
          {
            id: 231,
            name: '品牌维护',
            path: 'maintain',
            component: 'product/brand/maintain',
            icon: 'edit',
            children: [
              { id: 2311, name: '品牌添加', path: 'add', component: 'product/brand/maintain/add' },
              { id: 2312, name: '品牌编辑', path: 'edit', component: 'product/brand/maintain/edit' },
              { id: 2313, name: '品牌删除', path: 'delete', component: 'product/brand/maintain/delete' },
              { id: 2314, name: '品牌合并', path: 'merge', component: 'product/brand/maintain/merge' }
            ]
          },
          {
            id: 232,
            name: '品牌授权',
            path: 'authorize',
            component: 'product/brand/authorize',
            icon: 'key',
            children: [
              { id: 2321, name: '授权管理', path: 'manage', component: 'product/brand/authorize/manage' },
              { id: 2322, name: '授权审核', path: 'review', component: 'product/brand/authorize/review' },
              { id: 2323, name: '授权统计', path: 'statistics', component: 'product/brand/authorize/statistics' },
              { id: 2324, name: '授权日志', path: 'log', component: 'product/brand/authorize/log' }
            ]
          },
          {
            id: 233,
            name: '品牌展示',
            path: 'display',
            component: 'product/brand/display',
            icon: 'view',
            children: [
              { id: 2331, name: '品牌推荐', path: 'recommend', component: 'product/brand/display/recommend' },
              { id: 2332, name: '品牌排序', path: 'sort', component: 'product/brand/display/sort' },
              { id: 2333, name: '品牌专区', path: 'zone', component: 'product/brand/display/zone' },
              { id: 2334, name: '品牌故事', path: 'story', component: 'product/brand/display/story' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: '订单管理',
    path: '/order',
    component: 'Layout',
    icon: 'ticket',
    children: [
      {
        id: 31,
        name: '订单列表',
        path: 'list',
        component: 'order/list/index',
        icon: 'list',
        children: [
          {
            id: 311,
            name: '订单查询',
            path: 'query',
            component: 'order/list/query',
            icon: 'search',
            children: [
              { id: 3111, name: '订单号查询', path: 'number', component: 'order/list/query/number' },
              { id: 3112, name: '用户查询', path: 'user', component: 'order/list/query/user' },
              { id: 3113, name: '时间查询', path: 'time', component: 'order/list/query/time' },
              { id: 3114, name: '状态查询', path: 'status', component: 'order/list/query/status' }
            ]
          },
          {
            id: 312,
            name: '订单处理',
            path: 'process',
            component: 'order/list/process',
            icon: 'edit',
            children: [
              { id: 3121, name: '订单确认', path: 'confirm', component: 'order/list/process/confirm' },
              { id: 3122, name: '订单取消', path: 'cancel', component: 'order/list/process/cancel' },
              { id: 3123, name: '订单修改', path: 'modify', component: 'order/list/process/modify' },
              { id: 3124, name: '订单拆分', path: 'split', component: 'order/list/process/split' }
            ]
          },
          {
            id: 313,
            name: '订单审核',
            path: 'review',
            component: 'order/list/review',
            icon: 'document',
            children: [
              { id: 3131, name: '价格审核', path: 'price', component: 'order/list/review/price' },
              { id: 3132, name: '优惠审核', path: 'discount', component: 'order/list/review/discount' },
              { id: 3133, name: '异常审核', path: 'exception', component: 'order/list/review/exception' },
              { id: 3134, name: '风险审核', path: 'risk', component: 'order/list/review/risk' }
            ]
          }
        ]
      },
      {
        id: 32,
        name: '售后管理',
        path: 'after-sale',
        component: 'order/after-sale/index',
        icon: 'chat-dot-round',
        children: [
          {
            id: 321,
            name: '退货处理',
            path: 'return',
            component: 'order/after-sale/return',
            icon: 'refresh',
            children: [
              { id: 3211, name: '退货申请', path: 'apply', component: 'order/after-sale/return/apply' },
              { id: 3212, name: '退货审核', path: 'review', component: 'order/after-sale/return/review' },
              { id: 3213, name: '退货入库', path: 'storage', component: 'order/after-sale/return/storage' },
              { id: 3214, name: '退款处理', path: 'refund', component: 'order/after-sale/return/refund' }
            ]
          },
          {
            id: 322,
            name: '换货处理',
            path: 'exchange',
            component: 'order/after-sale/exchange',
            icon: 'swap',
            children: [
              { id: 3221, name: '换货申请', path: 'apply', component: 'order/after-sale/exchange/apply' },
              { id: 3222, name: '换货审核', path: 'review', component: 'order/after-sale/exchange/review' },
              { id: 3223, name: '换货出库', path: 'outbound', component: 'order/after-sale/exchange/outbound' },
              { id: 3224, name: '换货跟踪', path: 'track', component: 'order/after-sale/exchange/track' }
            ]
          },
          {
            id: 323,
            name: '投诉处理',
            path: 'complaint',
            component: 'order/after-sale/complaint',
            icon: 'warning',
            children: [
              { id: 3231, name: '投诉受理', path: 'accept', component: 'order/after-sale/complaint/accept' },
              { id: 3232, name: '投诉调查', path: 'investigate', component: 'order/after-sale/complaint/investigate' },
              { id: 3233, name: '投诉处理', path: 'handle', component: 'order/after-sale/complaint/handle' },
              { id: 3234, name: '投诉回访', path: 'followup', component: 'order/after-sale/complaint/followup' }
            ]
          }
        ]
      }
    ]
  }
]

//对外暴露接口数组：数组里面包含两个接口对象-----一个是用户登录假的接口，一个是获取用户信息假的接口
export default [
  // 获取角色列表
  {
    url: '/admin/acl/role/:page/:limit',
    method: 'get',
    response: ({ query }) => {
      const { page = 1, limit = 10, roleName = '' } = query
      let filteredList = [...allRolesList]
      if (roleName) {
        filteredList = allRolesList.filter((role) =>
          role.roleName.includes(roleName),
        )
      }
      return {
        code: 200,
        data: {
          records: filteredList,
          total: filteredList.length,
        },
        message: '获取角色列表成功',
        ok: true,
      }
    },
  },
  // 添加角色
  {
    url: '/admin/acl/role/save',
    method: 'post',
    response: ({ body }) => {
      allRolesList.push({
        ...body,
        id: allRolesList.length + 1,
        createTime: new Date().toISOString().split('T')[0],
        updateTime: new Date().toISOString().split('T')[0],
      })
      return {
        code: 200,
        data: null,
        message: '添加成功',
        ok: true,
      }
    },
  },
  // 更新角色
  {
    url: '/admin/acl/role/update',
    method: 'put',
    response: ({ body }) => {
      const index = allRolesList.findIndex((item) => item.id === body.id)
      if (index !== -1) {
        allRolesList[index] = { ...allRolesList[index], ...body }
      }
      return {
        code: 200,
        data: null,
        message: '更新成功',
        ok: true,
      }
    },
  },
  // 获取角色权限
  {
    url: '/admin/acl/permission/toAssign/:roleId',
    method: 'get',
    response: (request) => {
      const roleId = Number(request.url.split('/').pop())
      const role = allRolesList.find((item) => item.id === roleId)
      return {
        code: 200,
        data: menuList, // 完整的权限菜单树
        // data: {
        //   assignPermissions: role?.permissions || [],
        //   allPermissions: menuList, // 完整的权限菜单树
        // },
        message: '获取成功',
        ok: true,
      }
    },
  },
  // 分配角色权限
  {
    url: '/admin/acl/permission/doAssign',
    method: 'post',
    response: ({ query }) => {
      const { roleId, permissionId } = query
      const role = allRolesList.find((item) => item.id === Number(roleId))
      if (role) {
        role.permissions = Array.isArray(permissionId)
          ? permissionId
          : [permissionId]
      }
      return {
        code: 200,
        data: null,
        message: '分配权限成功',
        ok: true,
      }
    },
  },
  // 删除角色
  {
    url: '/admin/acl/role/remove/:roleId',
    method: 'delete',
    response: (request) => {
      const roleId = Number(request.url.split('/').pop())
      const index = allRolesList.findIndex((item) => item.id === roleId)
      if (index !== -1) {
        allRolesList.splice(index, 1)
      }
      return {
        code: 200,
        data: null,
        message: '删除成功',
        ok: true,
      }
    },
  },

]