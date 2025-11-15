<template>
  <div>
    <el-card>
      <!-- 欢迎信息 -->
      <div class="box">
        <img :src="userStore.avatar" class="avatar">
        <div class="bottom">
          <h3 class="title">{{ getTime() }}好呀~~~~~~{{ userStore.username }}</h3>
          <p class="subtitle">食用小苏打平台</p>
        </div>
      </div>
    </el-card>
    <!-- svg图片展示 -->
    <div class="bottoms">
      <svg-icon name="welcome" width="600px" height="470px"></svg-icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
  // 引入用户相关的仓库，获取当前用户的头像、昵称
  import useUserStore from '@/store/modules/user'
  import { getTime } from '@/utils/time'
  // 获取存储用户信息的仓库对象
  let userStore = useUserStore()
</script>

<style scoped lang="scss">
  .box {
    display: flex;

    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    .bottom {
      margin-left: 20px;

      .title {
        font-size: 30px;
        font-weight: 900;
        margin-bottom: 25px;
        margin-top: 10px;
      }

      .subtitle {
        font-style: italic;
        color: darkgrey;
      }
    }
  }

  .bottoms {
    display: flex;
    justify-content: center;
  }
</style>