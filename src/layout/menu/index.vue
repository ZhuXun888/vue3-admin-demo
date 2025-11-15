<template>
  <!-- <h1>{{ menuList }}</h1> -->
  <template v-for="(item, index) in menuList" :key="item.path">
    <!-- 没有子路由 -->
    <template v-if="!item.children">
      <!-- 注意！！：
       1.el-menu-item的index属性，index 应该绑定唯一标识，通常是 path，
       2.el-menu-item的title插槽，只控制显示内容，路由跳转由 index 属性控制，
       3.template标签上的 v-show 是无效的，要使用v-if -->
      <el-menu-item :index="item.path" v-if="!item.meta.hidden" @click="goRoute">
        <!-- 把图标写在title插槽外面，防止折叠菜单时，图标也被折叠了  -----因为我的业务要求是：实现菜单折叠效果时，只折叠文字，不折叠图标 -->
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <!-- 点击菜单项时回调函数, 参数为菜单项实例 -->
        <!-- item.meta.hidden 为ture 时，不显示该菜单项-->
        <template #title>
          <!-- #title：插槽名称 没有这个插槽，就无法显示内容 -->

          <span>{{ item.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由，但只有一个子路由 -->
    <template v-if="item.children && item.children.length == 1">
      <el-menu-item :index="item.children[0].path" v-if="!item.meta.hidden" @click="goRoute">
        <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
        <template #title>
          <span>{{ item.children[0].meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <!-- 有子路由，且有多个子路由 -->
    <el-sub-menu v-if="item.children && item.children.length > 1" :index="item.path">
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <!-- 递归组件 -->
      <!-- 关键点：1. 组件必须设置 name选项（用于递归调用）2.必须有终止条件（否则会无限递归） 3.参数：子路由列表 ，注意是动态的，所以需要绑定-->
      <Menu :menuList="item.children"></Menu>

    </el-sub-menu>
  </template>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
//获取父组件传递过来的全部路由数据
defineProps(['menuList'])

const $router = useRouter()
//点击菜单的回调函数--事件的回调函数（执行逻辑）--点击菜单项时回调函数, 参数为菜单项实例vc(组件实例)
const goRoute = (vc: any) => {
  $router.push(vc.index)//跳转路由 vc.index为菜单项实例的index属性(路径)，
  //  用于跳转到指定路由，其参数可以是字符串路径或包含路由信息的配置对象：直接写路径字符串或传一个对象（更灵活）
}
</script>
<script lang="ts">
export default {
  name: 'Menu'
}
</script>
<style scoped></style>