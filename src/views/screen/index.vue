<template>
  <div class="container">
    <!-- 数据大屏展示内容区 -->
    <div class="screen" ref="screen">
      <!-- 顶部区域 -->
      <div class="top">
        <Top></Top>
      </div>
      <!-- 底部区域 -->
      <div class="bottom">
        <!-- 底部-左侧 -->
        <div class="left">
          <Tourist class="tourist"></Tourist>
          <Sex class="sex"></Sex>
          <Age class="age"></Age>
        </div>
        <!-- 底部-中间 -->
        <div class="center">
          <Map class="map"></Map>
          <Line class="line"></Line>
        </div>
        <!-- 底部-右侧 -->
        <div class="right">
          <Rank class="rank"></Rank>
          <Year class="year"></Year>
          <Couter class="counter"></Couter>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import Top from './components/top/index.vue'
  import Tourist from './components/tourist/index.vue'
  import Age from './components/age/index.vue'
  import Sex from './components/sex/index.vue'
  import Map from './components/map/index.vue'
  import Line from './components/line/index.vue'
  import Rank from './components/rank/index.vue'
  import Year from './components/year/index.vue'
  import Couter from './components/couter/index.vue'

  // 获取数据大屏展示内容盒子的DOM元素screen
  let screen = ref()

  onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  })

  // 定义大屏缩放的比例
  function getScale(w = 1920, h = 1080) {
    // 计算大屏的宽度的缩放比例ww
    const ww = window.innerWidth / w
    // 获取大屏的高度的缩放比例wh
    const wh = window.innerHeight / h
    // 取较小的缩放比例
    return ww < wh ? ww : wh
  }

  // 监听窗口变化，重新计算缩放比例
  window.onresize = () => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100vw;
    height: 100vh;
    background: url('./images/bg.png') no-repeat;
    /*  no-repeat  背景图片不重复 */
    background-size: cover;
    /* background-size: cover  背景图片覆盖整个容器 */
  }

  .screen {
    position: fixed;
    width: 1920px;
    height: 1080px;
    left: 50%;
    top: 50%;
    transform-origin: left top;

    .top {
      width: 100%;
      height: 40px;
    }

    .bottom {
      display: flex;
      height: 100%;

      .left {
        flex: 1;
        height: calc(100% - 40px);
        display: flex;
        flex-direction: column;

        .tourist {
          flex: 1.1;

        }

        .sex {
          flex: 1;
        }

        .age {
          flex: 1;
        }
      }

      .center {
        flex: 2;
        height: calc(100% - 40px);
        display: flex;
        flex-direction: column;

        .map {
          flex: 3;
        }

        .line {
          flex: 1;
        }
      }

      .right {
        flex: 1;
        display: flex;
        height: calc(100% - 40px);
        flex-direction: column;

        .rank {
          flex: 1.2;
        }

        .year {
          flex: 1;
        }

        .counter {
          flex: 1;
        }
      }
    }
  }
</style>