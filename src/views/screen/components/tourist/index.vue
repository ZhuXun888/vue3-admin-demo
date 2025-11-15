<template>
  <div class="box">
    <div class="top">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">可预约总量<span>999999</span>人</p>
    </div>
    <div class="number">
      <span v-for="(item,index) in people" :key="index">{{item}}</span>
    </div>
    <!-- 盒子量展示图形图标的节点 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  let people = ref('216908人')
  // 引入echarts
  import * as echarts from 'echarts';
  // 引入水球图的组件
  import 'echarts-liquidfill';
  // 获取图形图标挂载节点
  let charts = ref()
  // 当组件挂载完毕，拿到图形图标挂载节点，并绘制
  onMounted(() => {
    // 获取echarts类的实例
    let mycharts = echarts.init(charts.value)
    // 设置实例的配置项
    mycharts.setOption({
      // // 标题
      // title: {
      //   text: '水球图'
      // },
      // x轴
      // xAxis: {},
      // y轴
      // yAxis: {},
      // 数据系列：决定展示什么样的图形图标
      series: [{
        type: 'liquidFill', // 图表类型：水球图
        data: [0.6, 0.5, 0.4, 0.3, 0.2], // 数据
        waveAnimation: true, // 开启水波纹动画
        animationDuration: 3, // 动画时长
        animationDurationUpdate: 0, // 动画时长更新
        radius: '90%', // 半径
        outline: { // 轮廓样式
          show: true,
          borderWidth: 8,
          itemStyle: { // 样式
            color: '#29fcff'
          }
        },
      }]
    })
  })

</script>

<style scoped lang="scss">
  .box {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    // filter: opacity(0.8); /* 只设置背景图片透明度，0.5表示50% */
    .top {
      .title {
        color: white;
        font-size: 20px;
        margin-left: 20px;
        margin-top: 15px;
      }

      .bg {
        width: 68px;
        height: 7px;
        background: url(../../images/dataScreen-title.png) no-repeat;
        background-size: 100% 100%;
        margin-left: 20px;
        margin-top: 10px;
        margin-top: 15px;
      }

      .right {
        float: right;
        color: white;
        font-size: 20px;

        span {
          color: yellow;
        }
      }

    }

    .number {
      padding: 20px 20px 0px 20px;
      margin-top: 30px;
      display: flex;

      span {
        flex: 1;
        height: 40px;
        text-align: center;
        line-height: 40px;
        background: url(../../images/total.png) no-repeat;
        background-size: 100% 100%;
        color: #29fcff;
        font-size: 20px;
      }
    }

    .charts {
      width: 100%;
      height: 250px;
    }
  }
</style>