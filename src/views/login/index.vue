<template>
  <div class="login_container">
    <el-row>
      <!-- :span='12' 表示占12列       :xs='0' 在超小屏幕下(< 768px)，该列不显示（宽度为 0）-->
      <!-- 注意：这里span和xs要用动态的，即要用: -->
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <!-- 注意：这里是:model,不是v-model                         这里的ref用来打标识，loginForms.value可以获取el-form表单的数据 -->
          <h1>hello</h1>
          <h2>食用小苏打</h2>
          <el-form-item prop="username">
            <!-- 这里表示要进行校验的数据是loginForm.username -->
            <el-input :prefix-icon="User" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <!-- 这里表示要进行校验的数据是loginForm.password -->
            <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password" placeholder="请输入密码"
              show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_btn" type="primary" size="default" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
//引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
const userStore = useUserStore()

//导入路由
import { useRouter, useRoute } from 'vue-router'
// 获取路由器对象（用于编程式导航）
const $router = useRouter()
// 获取当前路由信息（包含路径、参数、查询等）
const $route = useRoute()

//引入element-plus的提示框组件--当登录成功/失败时，弹出提示框
import { ElNotification } from 'element-plus';

//引入获取当前时间的函数
import { getTime } from '@/utils/time'

//定义变量控制按钮加载效果
const loading = ref(false)

//收集用户名和密码的数据
const loginForm = reactive({
  username: 'admin', //初始化用户名和密码
  password: '111111'
})

//获取el-form表单数据
const loginForms = ref()

//自定义表单验证规则函数
const validatorUserName = (rule: any, value: string, callback: any) => {
  //第一个参数：rule:即为校验规则对象
  //第二个参数：value:即为用户输入的数据，表单元素文本内容
  //第三个参数：callback--是一个函数，校验结果，如果校验通过，则调用callback()放行，如果校验失败，则调用callback(new Error('错误提示信息'))
  if (value.length >= 5) {
    callback()//验证通过，放行
  } else {
    callback(new Error('账号长度至少5位'))//验证失败，返回错误信息
  }
}
const validatorPassword = (rule: any, value: string, callback: any) => {
  if (value.length >= 6) {
    callback()//验证通过，放行
  } else {
    callback(new Error('密码长度至少6位'))//验证失败，返回错误信息
  }
}

//定义表单验证规则--需要配置对象
const rules = reactive({
  username: [  //数组里面写对该表单数据的校验规则：一条规则就写成一个对象，十条规则，就是十个对象，
    // required:true 表示该表单数据必填，不能为空
    // message:  错误提示信息
    // trigger:  触发校验表单的时机  change-->文本发生变化时触发校验     blur-->文本框失去焦点时触发校验
    // min:5     最小长度为5
    // max:8     最大长度为8

    // { required: true, min: 5, max: 8, message: '账号长度5到8位', trigger: 'change' }

    // 自定义表单验证规则
    { trigger: 'change', validator: validatorUserName }
  ],
  password: [
    // { required: true, min: 6, max: 10, message: '密码长度6到10位', trigger: 'change' }

    // 自定义表单验证规则
    { trigger: 'change', validator: validatorPassword }
  ]
})
//登录按钮回调
const login = async () => {

  //点击登录按钮后，在发请求之前先校验表单数据，不通过则不准发请求
  await loginForms.value.validate()  //返回一个promise对象，promise对象中可以返回成功或者失败的结果
  //用await等待promise对象返回结果

  //点击登录按钮以后干什么？
  //1、通知仓库pnina发请求
  //2、请求成功->跳转到首页:展示数据的地方
  //3、请求失败->弹出登录失败信息
  loading.value = true//点击按钮，触发事件，显示按钮的加载效果
  try {//----------------------------------登录成功执行
    //保证登陆成功，必须等待请求成功
    await userStore.userLogin(loginForm);
    //编程时导航跳转到首页------- $router.push('/');
    // 判断登录时，路由路径中是否又query参数，如果有，就往query参数跳转，如果没有，就往首页跳转
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })

    //登录成功的提示信息
    ElNotification({
      title: `hi~~ ${getTime()} 好~~`,
      message: '欢迎回来',
      type: 'success',         //类型
      duration: 2000
    });
    //登录成功后，取消按钮的加载效果
    loading.value = false
  } catch (error) {//----------------------------------登录失败执行
    //登录失败，取消按钮的加载效果
    loading.value = false
    //登录成功的提示信息
    ElNotification({
      title: '登录失败',
      message: (error as Error).message,
      type: 'error',         //类型
      duration: 2000
    })
  }
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%; //宽度100%
  height: 100vh; //vh 视口高度
  // background-color: green
  background: url(/src/assets/images/background.jpg) no-repeat; //no-repeat 表示不重复
  background-size: cover; //cover 表示填充整个容器

  .login_form {
    position: relative;
    width: 70%;
    top: 30vh;
    background: url(/src/assets/images/login_form.png);
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>