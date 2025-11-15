//二次封装axios:使用请求拦截器和响应拦截器

//1、导入axios
import axios from 'axios'

// 引入用户相关仓库
import useUserStore from '@/store/modules/user'
//2、利用axios对象的create方法创建axios实例对象request，并进行配置
const request = axios.create({  //axios.create() 的参数是一个配置对象，用于定制化 Axios 实例的行为  
  baseURL: '/api',  //基础路径，发请求时，路径中会出现api--------当传入的 url 以 / 开头时（如 /user/login），最终请求路径为 baseURL + url，即 /api/user/login。会自动加上/api
  timeout: 5000,    //请求超时时间
})
//3.request实例添加请求拦截器
request.interceptors.request.use((config) => {

  // 获取用户相关的小仓库：获取仓库内部token，登录成功疑惑携带给服务器
  const useStore = useUserStore()
  console.log(useStore.token);
  if (useStore.token) {
    config.headers.token = useStore.token
  }

  //请求发送之前会执行这里的代码,执行顺序：发请求之前==>请求拦截器==>请求到达服务器
  //config:本次请求的请求配置对象
  //比如config中有个属性很重要，headers请求头:经常给服务器端携带公共参数
  config.headers.token = 'Admin Token'
  //可以给请求头添加token令牌
  return config //必须返回config配置对象，否则请求发不出去
})
//4.request实例添加响应拦截器
request.interceptors.response.use((response) => {//-----------------------------------------------------------------成功的回调
  //响应成功会执行这里的代码,执行顺序：请求服务器==>响应成功==>响应拦截器==>将数据返回给组件

  //response:响应结果对象
  //response.data  //返回响应结果对象中的data数据
  return response.data  //返回响应结果对象
}, (error) => {//---------------------------------------------------------------------------------------------------失败的回调
  //响应失败会执行这里的代码,执行顺序：请求服务器==>响应失败==>响应拦截器

  //error:错误对象
  //error.message : 失败的错误信息

  return Promise.reject(error) //返回错误信息----------promise.reject() 用于创建一个被拒绝的 Promise 对象，表示操作失败,参数是拒绝的原因，即错误信息
})
//5、对外暴露request实例对象
export default request