<template>
  <!-- 路由组件出口的位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <!-- name="fade"：定义过渡效果，fade为过渡效果的名称，可以自定义，但必须与css中的过渡效果名称一致 -->
      <!-- 渲染layout一级路由组件的子路由 -->
      <component :is="Component"></component>
      <!-- 组件的动态切换 -->
    </transition>
  </router-view>
</template>
印客学院静静的前端面试合集
<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue';
import useLayOutSettingStore from '@/store/modules/setting';
let layOutSettingStore = useLayOutSettingStore();
// 监听刷新页面的标识符--控制当前组件是否销毁重建
let flag = ref(false);
// 监听仓库内部数据是否发生变化，如果发生变化，说明用户点击过刷新按钮，需要刷新标识符的变化，当标识符发生变化时，重新创建当前组件
watch(() => layOutSettingStore.refresh, () => {
  // 点击刷新按钮：路由组件销毁
  flag.value = !flag.value
  console.log('已销毁组件');
  //利用nextTick()方法，等待组件销毁完成后，重新创建组件
  nextTick(() => {
    flag.value = true
    console.log('已重新创建组件');
  })
})
</script>
<script lang="ts">
export default {
  name: 'Main'
}
</script>
<style scoped>
/* 进入时的动画 */
.fade-enter-from {
  opacity: 0;
  transform: scale(0)
}

.fade-enter-active {
  transition: all 2s
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>