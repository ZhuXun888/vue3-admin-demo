<template>
  <!-- 顶部导航栏 采用flex弹性布局 -->
  <div class="tabbar">
    <!-- 顶部左侧 -->
    <div class="tabbar_left">
      <Breadcrumb></Breadcrumb>
    </div>
    <!-- 顶部右侧 -->
    <div class="tabbar_right">
      <Setting></Setting>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入顶部导航栏-左侧-面包屑组件
import Breadcrumb from './breadcrumb/index.vue';
// 引入顶部导航栏-右侧-设置组件
import Setting from './setting/index.vue';

</script>
<script lang="ts">
export default {
  name: 'Tabbar'
}
</script>
<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  background: white;
  display: flex; //开启flex弹性布局，使当前元素成为弹性容器，其子元素自动成为弹性项
  justify-content: space-between; //弹性盒子，均分剩余空间
  background-image: linear-gradient(to right, rgb(159, 195, 242), rgb(136, 221, 252), white);

  // 控制弹性项在主轴（默认水平方向）上的对齐方式：space-between表示弹性项两端对齐，中间的弹性项之间间隔相等
  .tabbar_left {
    display: flex;
    align-items: center; //弹性项在交叉轴（垂直方向）上居中
    margin-left: 20px;
  }

  .tabbar_right {
    display: flex;
    align-items: center;
  }
}
</style>