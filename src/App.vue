<template>
    <!-- <div>
        <h1>我是APP</h1>
        <el-button type="primary" :icon="Plus">主要按钮</el-button>
        <el-button type="success" :icon="Edit">编辑按钮</el-button>
        <el-button type="danger" :icon="Delete">删除按钮</el-button> -->
    <!-- 这里将父组件传递的 name 和 color 转换为 SVG 需要的属性-- 即在svg图标组件中自定义的属性name 和 color ，就不再用它原始的属性了-->
    <!-- <svg-icon name="home" color="green" width="100px" height="100px"></svg-icon> -->
    <!-- SvgIcon组件 已经在main.ts中全局注册了，所以这里就不用再引入了 -->
    <!-- </div>
    <hr>
    <h1>测试axios二次封装</h1>
    <hr> -->
    <router-view></router-view>
</template>
<script setup lang="ts">
//引入图标组件----------引入之前，要先在项目下载相关组件库 npm i @element-plus/icons-vue
// import { Plus, Edit, Delete } from '@element-plus/icons-vue'
// import request from '@/utils/request' //引入axios二次封装的request.ts文件/]
import { onMounted } from 'vue'
import { reqLogin } from './api/user';

onMounted(() => {
    //测试axios二次封装的request.ts文件
    reqLogin({ username: 'admin', password: '111111' }).then((response) => {
        console.log('#请求成功：', response.data);
    }).catch((error) => {
        console.error('登录失败：', error.response.data);
    });
    // request({
    //     url: '/user/login',  //这里可以不用写成 '/api/user/login'，因为已经配置了baseURL: '/api'，运行代码时会自动加上'/api'
    //     method: 'post',
    //     data: {
    //         username: 'admin',
    //         password: '111111',
    //     },
    // }).then((response) => {
    //     console.log('#登录成功：', response.data);
    //     console.log('##response------', response)
    // }).catch((error) => {
    //     console.error('登录失败：', error.response.data);
    //     console.log('##error------', error)
    //     console.log('##error.message------', error.message)

    // });
});

</script>
<style scoped lang="scss">
div {
    h1 {
        color: $color; //使用全局变量文件中的颜色变量
    }
}
</style>