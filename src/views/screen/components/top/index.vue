<template>
  <div class="top">
    <!-- 左侧 -->
    <div class="left">
      <span class="lbtn" @click="goHome" >首页</span>
    </div>
    <!-- 中间 -->
     <div class="center">
      <div class="title">智慧旅游可视化大数据平台</div>
     </div>
     <!-- 右侧 -->
     <div class="right">
      <span class="rbtn">统计报告</span>
      <span class="time">当前时间:{{ time }}</span>
     </div>
  </div>
</template>

<script lang="ts" setup>
import { ref,onMounted ,onBeforeUnmount} from 'vue';
import { useRouter } from 'vue-router';
import moment from 'moment';
// 获取路由对象
let  $router = useRouter()
// 存储当前的时间
let time = ref(moment().format('YYYY年MM月DD日 HH:mm:ss'))
let timer=ref(0)

// 点击顶部首页的回调:跳转到首页
const goHome = () => {
  // 跳转到首页
  $router.push('/')
}
// 组件挂载完毕，实时更新时间：利用定时器
onMounted(() => {
  // 定时器，每隔1秒，更新时间
 timer.value= setInterval(() => {
    time.value = moment().format('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})
// 当组件销毁时，清除定时器
onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top{
  width: 100%;
  height: 40px;
  display: flex;
  .left{
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    .lbtn{
      width: 150px;
      height: 40px;
      float:right;
      background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color:#29fcff;
      font-size: 20px;
    }
  }
  .center{
    flex: 2;
    .title{
      width: 100%;
      height: 74px;
      background:url(../../images/dataScreen-header-center-bg.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 74px;
      color:#29fcff;
      font-size: 30px;
    }
  }
  .right{
    flex: 1;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: 100% 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .rbtn{
      width: 150px;
      height: 40px;
      float:left;
      background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 40px;
      color:#29fcff;
      font-size: 20px;
    }
    .time{
      color:#29fcff;
      margin-right: 10px;
      font-size: 15px;
    }
  }
}
</style>