<template>
  <div class="box1">
    <div class="title">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png">
      </div>
      <div class="woman">
        <img src="../../images/woman.png">
      </div>
    </div>
    <div class="rate">
      <p>男士58%</p>
      <p>女士42%</p>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  // 引入echarts
  import * as echarts from 'echarts';
  // 获取图形图标挂载节点
  let charts = ref()
  // 当组件挂在出来时，获取echarts实例，并绘制图形
  onMounted(() => {
    // 获取echarts实例并初始化
    let mycharts = echarts.init(charts.value)
    // 设置配置项
    mycharts.setOption({
      //组件标题
      title: {
        text: '男女比例', //主标题
        textStyle: {
          //主标题颜色
          color: 'skyblue',
        },
        left: '40%',
      },
      //x|y
      xAxis: {
        show: false,// 不显示X轴
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,// 不显示Y轴
        type: 'category',// 坐标轴类型为类目轴
      },
      // 数据系列：决定展示什么样的图形图标
      series: [
        // 第一个柱状图系列 - 代表男性比例
        {
          type: 'bar',    // 图表类型：柱状图
          data: [58],     // 数据值：58%
          barWidth: 20,   // 柱条宽度
          z: 100,         // 层级控制，数值大的在上面
          itemStyle: {
            color: 'skyblue', // 柱条颜色
            borderRadius: 20, // 柱条圆角
          },
        },
        // 第二个柱状图系列 - 作为背景，代表总比例(100%)
        {
          type: 'bar',        // 图表类型：柱状图
          data: [100],        // 数据值：100%
          barWidth: 20,       // 柱条宽度
          barGap: '-100%',    // 柱条间距为-100%，使两个柱条重叠
          itemStyle: {
            color: 'pink',    // 柱条颜色
            borderRadius: 10, // 柱条圆角
          }
        }
      ],

      // 网格配置 - 控制图表的位置和边距
      grid: {
        left: 0,   // 左边距
        top: 0,    // 上边距
        right: 0,  // 右边距
        bottom: 0, // 下边距
      },
    })
  })


</script>

<style scoped lang="scss">
  .box1 {
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

    .sex {
      display: flex;
      justify-content: center;

      /* 添加垂直居中 */
      .man {
        margin: 30px;
        width: 111px;
        height: 115px;
        background: url(../../images/man-bg.png) no-repeat;
        background-size: 100% 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .woman {
        margin: 30px;
        width: 111px;
        height: 115px;
        background: url(../../images/woman-bg.png) no-repeat;
        background-size: 100% 100%;
        /* 背景图片覆盖整个容器 */
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .rate {
      display: flex;
      justify-content: space-between;
      color: white;
    }

    .charts {
      height: 100px;
    }
  }
</style>