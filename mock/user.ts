//用户信息数据
//createUserList函数用于创建用户信息列表:此函数执行后会返回一个数组，数组里面包含两个用户信息对象
function createUserList() {
  return [
    {
      //第一个用户信息对象
      userId: 1,                      //用户id
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',  //用户头像
      username: 'admin',             //用户名
      password: '111111',            //密码
      desc: '平台管理员',             //用户角色描述
      roles: ['平台管理员'],          //用户角色
      buttons: ['cuser.detail'],     //用户权限点
      routes: ['home'],              //用户可访问路由
      token: 'Admin Token',          //用户token
    },

    //第二个用户信息对象
    {
      userId: 2,
      avatar:
        'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token',
    },
  ]
}

//对外暴露接口数组：数组里面包含两个接口对象-----一个是用户登录假的接口，一个是获取用户信息假的接口
export default [
  // 用户登录接口
  {
    url: '/api/user/login',//请求地址
    method: 'post',//请求方式
    //
    response: ({ body }) => {
      //获取请求体携带过来的用户名与密码
      const { username, password } = body;
      //调用获取用户信息函数,用于判断是否有此用户
      const checkUser = createUserList().find(
        (item) => item.username === username && item.password === password,
      )
      //没有用户返回失败信息
      if (!checkUser) {
        return { code: 201, data: { message: '账号或者密码不正确' } }
      }
      //如果有返回成功信息
      const { token } = checkUser
      return { code: 200, data: { token } }
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request) => {
      //获取请求头携带token
      const token = request.headers.token;
      //查看用户信息是否包含有次token用户
      const checkUser = createUserList().find((item) => item.token === token)
      //没有返回失败的信息
      if (!checkUser) {
        return { code: 201, data: { message: '获取用户信息失败' } }
      }
      //如果有返回成功信息
      return { code: 200, data: { checkUser } }
    },
  },

]