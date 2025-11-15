//统一管理项目中与用户相关的接口

// 1. 导入封装好的 axios 实例-----发请求时会用到
import request from '@/utils/request' //导入二次封装的axios请求工具,用于发送HTTP请求,因为这个文件是对外暴露接口的，所以要用到request请求工具
import type { loginForm, loginResponseData, userResponseData } from './type' //导入用户相关的接口类型定义
//这里impory 后面的type表示导入的是一个类型，而不是具体的值

// 2. 使用枚举统一管理所有接口路径，api是一个枚举对象，包含用户相关的接口路径
enum API {
  LOGIN_URL = "/user/login",     // 登录接口路径
  USERINFO_URL = "/user/info"    // 用户信息接口路径
}

// 3. 封装登录接口请求函数
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data);      //----------Axios 的 post 方法有两个泛型参数：post<T, R >()
//data - 作为请求体发送给服务器的登录数据（数据对象），通常包含用户名和密码等信息                                                                             T: 响应体数据（response.data）的类型
//request.post - 使用封装好的 axios 实例发送 POST 请求                                                                                                    R: 整个响应对象 response 的类型
// 相当于：发送 POST 请求到 "/user/login"，携带 data 参数

// 4. 封装获取用户信息接口请求函数  
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL);   //----------Axios 的 get 方法有两个泛型参数：get<T, R >()，T 表示接口返回的数据类型，R 表示接口返回的数据类型
//request.get - 使用封装好的 axios 实例发送 GET 请求
// 相当于：发送 GET 请求到 "/user/info"x