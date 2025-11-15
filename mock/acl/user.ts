//用户信息数据

// 模拟用户列表数据
const userList = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    name: '超级管理员',
    phone: '13800138000',
    roleName: '超级管理员',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
    status: 1,
  },
  {
    id: 2,
    username: 'product_mgr',
    password: '123456',
    name: '张产品',
    phone: '13800138001',
    roleName: '产品经理',
    createTime: '2024-03-21',
    updateTime: '2024-03-21',
    status: 1,
  },
  {
    id: 3,
    username: 'fe_dev',
    password: '123456',
    name: '李前端',
    phone: '13800138002',
    roleName: '前端工程师',
    createTime: '2024-03-22',
    updateTime: '2024-03-22',
    status: 1,
  },
  {
    id: 4,
    username: 'be_dev',
    password: '123456',
    name: '王后端',
    phone: '13800138003',
    roleName: '后端工程师',
    createTime: '2024-03-23',
    updateTime: '2024-03-23',
    status: 1,
  },
  {
    id: 5,
    username: 'ui_designer',
    password: '123456',
    name: '赵设计',
    phone: '13800138004',
    roleName: 'UI设计师',
    createTime: '2024-03-24',
    updateTime: '2024-03-24',
    status: 1,
  },
  {
    id: 6,
    username: 'test_engineer',
    password: '123456',
    name: '孙测试',
    phone: '13800138005',
    roleName: '测试工程师',
    createTime: '2024-03-25',
    updateTime: '2024-03-25',
    status: 1,
  },
  {
    id: 7,
    username: 'ops_engineer',
    password: '123456',
    name: '周运维',
    phone: '13800138006',
    roleName: '运维工程师',
    createTime: '2024-03-26',
    updateTime: '2024-03-26',
    status: 1,
  },
  {
    id: 8,
    username: 'data_analyst',
    password: '123456',
    name: '吴数据',
    phone: '13800138007',
    roleName: '数据分析师',
    createTime: '2024-03-27',
    updateTime: '2024-03-27',
    status: 0,
  },
  {
    id: 9,
    username: 'android_dev',
    password: '123456',
    name: '郑安卓',
    phone: '13800138008',
    roleName: 'Android开发',
    createTime: '2024-03-28',
    updateTime: '2024-03-28',
    status: 1,
  },
  {
    id: 10,
    username: 'ios_dev',
    password: '123456',
    name: '钱苹果',
    phone: '13800138009',
    roleName: 'iOS开发',
    createTime: '2024-03-29',
    updateTime: '2024-03-29',
    status: 1,
  },
  {
    id: 11,
    username: 'project_mgr',
    password: '123456',
    name: '冯项目',
    phone: '13800138010',
    roleName: '项目经理',
    createTime: '2024-03-30',
    updateTime: '2024-03-30',
    status: 1,
  },
  {
    id: 12,
    username: 'tech_lead',
    password: '123456',
    name: '陈架构',
    phone: '13800138011',
    roleName: '技术负责人',
    createTime: '2024-03-31',
    updateTime: '2024-03-31',
    status: 1,
  }
]
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


//对外暴露接口数组：数组里面包含两个接口对象-----一个是用户登录假的接口，一个是获取用户信息假的接口
export default [
  // 获取用户角色的接口函数
  {
    url: '/admin/acl/user/toAssign/:userId',
    method: 'get',
    response: (config) => {
      // 从URL参数中获取userId
      const userId = config.url.split('/').pop();

      // 根据userId查找用户
      const user = userList.find(user => user.id == userId);

      if (!user) {
        return {
          code: 404,
          message: '用户不存在！',
          ok: false
        }
      }

      // 根据用户的roleName在allRolesList中查找对应的角色
      let assignRoles = [];
      if (user.roleName) {
        assignRoles = allRolesList.filter(role =>
          role.roleName === user.roleName
        );
      }
      return {
        code: 200,
        data: {
          assignRoles, // 当前用户已拥有的角色
          allRolesList // 系统所有角色
        },
        message: '获取用户角色成功！',
        ok: true
      }
    },
  },
  // 获取用户列表
  {
    url: '/admin/acl/user/:page/:limit',
    method: 'get',
    response: ({ query }) => {
      const { username } = query
      let filteredList = userList
      if (username) {
        filteredList = userList.filter((user) =>
          user.username.includes(username),
        )
      }
      return {
        code: 200,
        data: {
          records: filteredList,
          total: filteredList.length,
        },
        message: '获取用户列表成功1',
        ok: true,
      }
    },
  },
  // // 获取用户列表接口（需要分页）
  // {
  //   url: '/admin/acl/user/:page/:limit',
  //   method: 'get',
  //   response: ({ query, params }) => {
  //     const { username } = query
  //     const { page, limit } = params  // 这里只在用户列表接口解构

  //     let filteredList = userList
  //     if (username) {
  //       filteredList = userList.filter((user) =>
  //         user.username.includes(username),
  //       )
  //     }

  //     // 分页逻辑
  //     const startIndex = (page - 1) * limit
  //     const endIndex = startIndex + Number(limit)
  //     const paginatedList = filteredList.slice(startIndex, endIndex)

  //     return {
  //       code: 200,
  //       data: {
  //         records: paginatedList,
  //         total: filteredList.length,
  //         size: Number(limit),
  //         current: Number(page),
  //         pages: Math.ceil(filteredList.length / limit),
  //       },
  //       message: '获取用户列表成功2',
  //       ok: true,
  //     }
  //   },
  // },
  // 分配用户角色
  {
    url: '/admin/acl/user/doAssignRole',
    method: 'post',
    response: (config) => {
      const { userId, roleIdList } = config.body

      // 找到用户
      const targetUserIndex = userList.findIndex(u => u.id === userId)
      if (targetUserIndex > -1) {
        // 根据角色ID列表获取角色名称
        const assignedRoles = allRolesList.filter(role =>
          roleIdList.includes(role.id)
        )

        // 更新用户角色信息
        if (assignedRoles.length > 0) {
          // 如果有多个角色，用逗号分隔
          userList[targetUserIndex].roleName = assignedRoles
            .map(role => role.roleName)
            .join(', ')
          userList[targetUserIndex].updateTime = new Date().toISOString().split('T')[0]

          console.log('用户角色更新:', {
            userId,
            newRoleName: userList[targetUserIndex].roleName,
            roleIdList
          })
        }
      }

      return { code: 200, data: null, message: '分配角色成功' }
    },
  },
  // 添加/更新用户
  {
    url: '/admin/acl/user/save',
    method: 'post',
    response: ({ body }) => {
      const newUser = {
        ...body,
        id: userList.length + 1,
        createTime: new Date().toISOString().split('T')[0],
        updateTime: new Date().toISOString().split('T')[0],
        status: 1,
      }
      userList.push(newUser)
      return { code: 200, data: null, message: '添加成功' }
    },
  },
  // 修改用户
  {
    url: '/admin/acl/user/update',
    method: 'put',
    response: ({ body }) => {
      const index = userList.findIndex((item) => item.id === body.id)
      if (index !== -1) {
        userList[index] = {
          ...userList[index],
          ...body,
          updateTime: new Date().toISOString().split('T')[0],
        }
      }
      return { code: 200, data: null, message: '更新成功' }
    },
  },
  // 删除用户
  {
    url: '/admin/acl/user/remove/:id',
    method: 'delete',
    response: (request) => {
      const id = request.query.id
      if (!id) {
        return { code: 201, data: null, message: '参数错误' }
      }
      const index = userList.findIndex((item) => item.id === Number(id))
      if (index !== -1) {
        userList.splice(index, 1)
        return { code: 200, data: null, message: '删除成功' }
      }
      return { code: 201, data: null, message: '用户不存在' }
    },
  },
  // 批量删除用户
  {
    url: '/admin/acl/user/batchRemove',
    method: 'delete',
    response: ({ body }) => {
      console.log('批量删除请求体:', body) // 调试信息

      // 修复：直接使用body作为idList，因为前端发送的是直接数组
      let idList = body;

      // 如果body是对象形式，尝试提取idList
      if (body && typeof body === 'object' && body.idList) {
        idList = body.idList;
      }

      if (!idList || !Array.isArray(idList) || idList.length === 0) {
        return {
          code: 201,
          data: null,
          message: '参数错误：idList不能为空'
        }
      }

      // 记录删除前的用户数量
      const beforeDeleteCount = userList.length

      // 从后往前删除，避免索引问题
      for (let i = userList.length - 1; i >= 0; i--) {
        if (idList.includes(userList[i].id)) {
          userList.splice(i, 1)
        }
      }

      console.log(`批量删除完成，删除了 ${beforeDeleteCount - userList.length} 个用户`)

      return {
        code: 200,
        data: null,
        message: `批量删除成功，共删除 ${beforeDeleteCount - userList.length} 个用户`
      }
    },
  },
  // 用户登出接口
  {
    url: '/admin/user/logout',
    method: 'post',
    response: () => {
      return { code: 200, data: null, message: '退出成功' }
    },
  },
]