// 用户相关接口类型定义

// 用户登录请求参数类型
export interface loginForm {
  username: string; //用户名
  password: string; //密码
}

interface dataType {
  token?: string;
  message?: string;
}

// 用户信息接口返回数据类型
export interface loginResponseData {
  code: number;        //状态码
  data: dataType;      //用户token
}


interface userInfo {
  userId: number;                //用户id
  avatar: string;                //用户头像
  username: string;             //用户名
  password: string;            //密码
  desc: string;             //用户角色描述
  roles: string[];          //用户角色
  buttons: string[];       //用户权限点
  routes: string[];        //用户可访问路由
  token: string;          //用户token
}
interface user { checkUser: userInfo }
// 用户信息接口返回数据类型
export interface userResponseData {
  code: number;        //状态码
  data: user
}