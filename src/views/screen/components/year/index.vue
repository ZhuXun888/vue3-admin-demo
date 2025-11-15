<template>
  <div class="box7">
    <div class="title">
      <p>年度数据量对比</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <!-- 图表区域 -->
    <div class="charts" ref="year"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  // 引入echarts
  import * as echarts from 'echarts';
  // 获取图形图标挂载节点
  let year = ref()
  // 当组件挂在出来时，获取echarts实例，并绘制图形
  onMounted(() => {
    // 获取echarts实例并初始化
    let mycharts = echarts.init(year.value)
    // 设置配置项
    mycharts.setOption({
      // 标题
      title: {
        text: '散点图',
        left: '40%',
        textStyle: {
          color: 'white'
        }
      },
      // x轴
      xAxis: {
        type: 'category',
        splitLine: {
          show: false // 隐藏网格线
        },
      },
      // y轴
      yAxis: {
        splitLine: {
          show: false // 隐藏网格线
        },
      },
      grid: {
        top: '30',
        left: '30',
        right: '20',
        bottom: '20'
      },
      // 数据系列：决定展示什么样的图形图标
      series: [{
        type: 'scatter', // 图表类型：散点图
        data: [22, 33, 654, 234, 136, 553, 690, 24, 47, 69, 57, 322, 142, 773],
        symbol: 'arrow', // 散点图的图标:箭头
        symbolSize: 10, // 散点图的大小
        itemStyle: {
          color: 'red' // 散点图的颜色
        },
        label: {
          show: true,
          position: 'top',
          fontSize: 10,
          color: 'white'
        }
      }]
    })
  })
</script>

<style scoped lang="scss">
  .box7 {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .title {
      margin-top: 10px;
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