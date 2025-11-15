<template>
  <div class="box5">
    <div class="title">
      <p>未来30天游客量趋势图</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <!-- 图表区域 -->
    <div class="charts" ref="line"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts';
  let line = ref();
  onMounted(() => {
    let mycharts = echarts.init(line.value);
    mycharts.setOption({
      // 标题
      title: {
        text: '访问量'
      },
      // x轴
      xAxis: {
        type: 'category',
        boundaryGap: false,// 类目轴是否显示在两端
        splitLine: {
          show: false // 隐藏网格线
        },
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      // y轴
      yAxis: {
        // type: 'value'
        splitLine: {
          show: false // 隐藏网格线
        },
        // 轴线的设置
        axisLine: {
          show: true // 显示轴线
        },
        // 轴线的刻度
        axisTick: {
          show: true // 显示轴线刻度
        },
      },
      grid: {
        left: 40,
        top: 0,
        right: 20,
        bottom: 20,
      },
      // 数据系列：决定展示什么样的图形图标
      series: [{
        type: 'line', // 图表类型：折线图
        data: [0, 120, 1240, 699, 1321, 890, 1200], // 数据
        // 平滑曲线设置
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'gold' // 0% 处的颜色
            }, {
              offset: 1, color: 'white' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        }
      }],
    })
  })
</script>

<style scoped lang="scss">
  .box5 {
    height: calc(100% - 20px);
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin: 0px 10px;

    .title {
      margin-left: 20px;

      p {
        color: white;
        font-size: 20px;
      }
    }

    .charts {
      height: calc(100% - 40px);
    }
  }
</style>