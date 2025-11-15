<template>
  <div class="login" v-if="setting.logoHidden">
    <img :src="setting.logo">
    <!-- 图片这里要用v-bind:src="setting.logo" 绑定 ，因为这个时候的属性值是动态的-->
    <p>{{ setting.title }}</p>
  </div>
</template>

<script lang="ts" setup>
//引入设置标题与logo的配置文件
import setting from '@/setting'
</script>
<script lang="ts">
export default {
  name: 'Logo'
}
</script>

<style scoped lang="scss" name="Login">
.login {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex; //弹性布局 
  align-items: center; //垂直居中
  padding: 40px 15px;

  img {
    width: 40px;
    height: 40px;
  }

  p {
    font-size: $base-menu-title-fontSize;
    margin-left: 10px;
  }
}
</style>