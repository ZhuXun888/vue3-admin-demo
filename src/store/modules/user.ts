//创建用户相关的小仓库

//引入pinia
import { defineStore } from "pinia";
import { reqLogin, reqUserInfo } from "@/api/user";
//引入用户相关的接口类型定义
import type { loginForm, loginResponseData } from "@/api/user/type";
import type { UserState } from "./types/type";

//引入封装的token工具
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token';

//引入路由（常量路由）
import { constantRoutes } from '@/router/routes'
import { UserFilled } from "@element-plus/icons-vue";

//创建用户小仓库
const useUserStore = defineStore("User", {
  //state:小仓库中用于存放数据的地方-----类似于数据data
  state: (): UserState => {  //UserState:用户信息类型
    return {
      token: GET_TOKEN(),//用户唯一标识token    //利用浏览器本地存储，将token保存在浏览器中，刷新页面后，token还在
      // userInfo: {},  //用户信息
      menuRoutes: constantRoutes, //仓库存储生成菜单需要的数组（路由）
      username: '',
      avatar: '',
    }
  },
  //actions:小仓库中用于操作数据的方法，处理业务逻辑|异步-----类似于methods
  actions: {
    //用户登录的方法 
    async userLogin(data: loginForm) {
      //接收到用户登录的参数data之后就要调用接口发请求了
      //登录请求
      let result: loginResponseData = await reqLogin(data)  //loginResponseData:登陆成功时，接口返回的数据类型
      if (result.code == 200) {
        this.token = (result.data.token as string)//保存token--由于pinia|vuex存储数据其实利用js对象，每次刷新页面后，数据会丢失，所以要利用浏览器本地存储，将token保存在浏览器中，刷新页面后，token还在
        SET_TOKEN((result.data.token as string)) //本地存储持久化存储一份---利用浏览器本地存储，将token保存在浏览器中，刷新页面后，token还在
        //能保证当前async方法返回一个成功的promise对象，promise对象中可以返回成功的结果
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
    // 获取用户信息方法
    async userInfo() {
      // 获取用户信息进行存储仓库当中[用户头像、名字]
      let result = await reqUserInfo();
      // 如果获取用户信息成功，存储以下用户信息--存到user仓库中
      if (result.code == 200) {
        this.username = result.data.checkUser.username
        this.avatar = result.data.checkUser.avatar
        return 'ok'//能保证当前async方法返回一个成功的promise对象，promise对象中可以返回成功的结果
      } else {
        return Promise.reject(new Error('获取用户信息失败'))//能保证当前async方法返回一个失败的promise对象，promise对象中可以返回失败的原因
      }
    },
    //退出登录方法
    userLogout() {
      // 退出登录，清空仓库数据，回到登录页面 
      this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN()//退出登录时，清除本地存储的token
    }
  },
  //getters:用于简化仓库数据，让组件获取仓库数据更加方便-----类似于计算属性computed
  getters: {}
})
//暴露小仓库
export default useUserStore;