<template>
  <!-- 顶部导航栏-右侧-小功能实现 -->
  <!-- 刷新按钮 -->
  <el-button size="small" icon="Refresh" circle @click="updateRefresh"></el-button>
  <!-- 全屏按钮 -->
  <el-button size="small" icon="FullScreen" circle @click="FullScreen"></el-button>
  <!-- 设置按钮 -->

  <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
    <!-- 表单元素 -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker @change="setColor" v-model="color" show-alpha :predefine="predefineColors" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch @change="changeDark" v-model="dark" size="small" active-icon="MoonNight" inactive-icon="Sunny"
          class="mt-2" inline-prompt />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" icon="Setting" circle></el-button>
    </template>
  </el-popover>
  <!-- 用户头像 -->
  <img :src="userStore.avatar" style="width:24px; height:24px; margin: 0 10px; border-radius:50%">
  <!-- 这里的../../../logo.png等同于../../../public/logo.png -->
  <!-- 下拉菜单 -->
  <el-dropdown>
    <span class="el-dropdown-link">
      <!-- 用户名 -->
      {{ userStore.username }}
      <!-- 箭头图标 -->
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <!-- 下拉菜单内容 -->
    <template #dropdown>
      <el-dropdown-menu>
        <!-- 下拉菜单项 -->
        <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  // 引入骨架的小仓库
  import useLayOutSettingStore from '@/store/modules/setting';
  // 引入用户相关的小仓库，因为要展示用户头像和名字
  import useUserStore from '@/store/modules/user';
  //引入路由
  import { useRouter, useRoute } from 'vue-router';
  // 获取路由器
  const $router = useRouter();
  // 获取路由对象
  let $route = useRoute();
  //获取用户小仓库
  let userStore = useUserStore();
  // 获取骨架小仓库
  let layoutSettingStore = useLayOutSettingStore();
  // 控制暗黑模式的开关
  let dark = ref < boolean > (false)

  // 刷新按钮点击回调函数
  const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh
    console.log('马上销毁咯');
  }

  // 全屏按钮点击回调函数
  const FullScreen = () => {
    //DOM对象的一个属性：可以用来判断当前是不是全屏模式[全屏：true, 不是全屏：false]
    let full = document.fullscreenElement;
    //切换全屏模式
    if (!full) {
      //文档根节点的方法requestFullscreen()，实现全屏模式
      document.documentElement.requestFullscreen();
    } else {
      //文档根节点的方法exitFullscreen()，退出全屏模式
      //变为不是全屏模式->退出全屏模式
      document.exitFullscreen();
    }
  }

  // 退出登录按钮点击回调函数logout()
  const logout = () => {
    // 第一件事情：需要向服务器发请求[退出登录接口]--目前没有这个接口，这里不做这个需求
    // 第二件事：需要清空用户信息，仓库当中关于相关的数据清空[token|username|avatar]
    userStore.userLogout()
    // 第三件事：需要跳转到登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } })//$router.push()用于跳转到指定页面
    // 退出登录

  }

  // 颜色组件的数据
  const color = ref('rgba(255, 69, 0, 0.68)')
  const predefineColors = ref([
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585',
    'rgba(255, 69, 0, 0.68)',
    'rgb(255, 120, 0)',
    'hsv(51, 100, 98)',
    'hsva(120, 40, 94, 0.5)',
    'hsl(181, 100%, 37%)',
    'hsla(209, 100%, 56%, 0.73)',
    '#c7158577',
  ])

  // switch开关的change事件进行暗黑模式的回调
  const changeDark = () => {
    // 获取html根节点
    let html = document.documentElement
    // 判断html标签是否有类型dark
    html.className = dark.value ? 'dark' : ''
  }

  // 颜色组件的change事件进行主题颜色的回调
  const setColor = () => {
    // 获取html根节点
    let html = document.documentElement
    // 设置html标签的样式属性--变量--主题颜色
    html.style.setProperty('--el-color-primary', color.value)
  }

</script>
<script lang="ts">
  export default {
    name: 'Setting'
  }
</script>
<style scoped></style>