<template>
  <!-- 顶部导航栏-左侧-面包屑 -->

  <!-- 左侧图标 -->
  <el-icon style="margin-right: 20px ;" @click="changeIcon">
    <component :is="LayoutSettingStore.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <!-- 左侧面包屑 -->
  <el-breadcrumb separator-icon="ArrowRight">
    <!-- separator="/"表示用/作为分隔符，属性值只能是字符串，静态写死的   :separator-icon="ArrowRight"表示用箭头图标作为分隔符，属性值可以是字符串或组件，注意，是动态的  -->
    <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="item.path" v-show="item.meta.title">
      <!-- 注意：这里不能用v-if,因为v3里面，v-if比v-for优先级高----- 当item.meta.icon有值，才显示当前级别组件的title，为空不显示，为了过滤掉首页的一级路由layout的显示  -->
      <!-- <el-icon>{{ item.meta.icon }}</el-icon>  <el-icon> 组件需要直接嵌套图标组件（如 <ArrowRight />），
        而不是图标名称字符串--无法识别 -----所以用component组件去动态渲染图标-->
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 5px;">{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
//引入layout配置相关的仓库
import useLayOutSettingStore from '@/store/modules/setting';
// 引入路由
import { useRoute } from 'vue-router'
// 调用useRoute()获取路由对象
const $route = useRoute()
//获取layout配置相关的仓库
let LayoutSettingStore = useLayOutSettingStore()
// 点击图标的方法
const changeIcon = () => {
  LayoutSettingStore.fold = !LayoutSettingStore.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb'
}
</script>
<style scoped></style>