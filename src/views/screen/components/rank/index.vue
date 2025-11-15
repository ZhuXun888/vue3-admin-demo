<template>
  <div class="box6">
    <div class="title">
      <p>热门景区排行榜</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <!-- 图表区域 -->
    <div class="charts" ref="rank"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  // 引入echarts
  import * as echarts from 'echarts';
  // 获取图形图标挂载节点
  let rank = ref()
  // 当组件挂在出来时，获取echarts实例，并绘制图形
  onMounted(() => {
    // 获取echarts实例并初始化
    let mycharts = echarts.init(rank.value)
    // 设置配置项
    mycharts.setOption({
      // 标题组件
      title: {
        // 主标题
        text: '景区排行',
        // 主标题位置
        left: '50%',
        // 主标题文字样式
        textStyle: {
          color: 'yellowgreen',
          fontSize: 20
        },
        // 子标题
        subtext: '各大景区的排行',
        // 子标题的样式
        subTextStyle: {
          color: 'pink',
          fontSize: 14
        }
      },

      // x|y轴
      xAxis: {
        type: 'category',//在x轴上均匀分布 
        data: ['北京', '上海', '广州', '深圳', '成都'],
        axisLabel: {
          color: 'white'
        },
        splitLine: {
          show: false // 隐藏网格线
        },
      },
      yAxis: {
        type: 'value',
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
        axisLabel: {
          color: 'white'
        }
      },

      // 布局组件
      grid: {
        left: 40,
        top: 20,
        right: 20,
        bottom: 20,
      },
      // 图形系列：决定显示的图标是哪一种的  series写成对象就只能用一种图形，写成对象数组，就可以显示多种图形
      series: [
        {
          name: '景区排行',
          type: 'bar',
          data: [1048, 735, 580, 484, 300],
          // 柱状图的：图形上的文本标签
          label: {
            show: true,
            position: 'insideTop',//文字的位置
            color: 'white'
          },
          // 柱状图的：是否显示背景颜色
          showBackground: true,
          // 柱条的样式
          itemStyle: {
            // 圆角
            borderRadius: 10,
            // color: 'yellowgreen',
            color: function (data: any) {
              let arr = ['yellowgreen', 'orange', 'red', 'pink', 'purple']
              return arr[data.dataIndex]
            }
          }

        },
        {
          type: 'line',
          data: [350, 240, 250, 530, 607],
          smooth: true,
        }
      ],
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        textStyle: {
          color: 'white'
        }
      }
    })
  })
</script>

<style scoped lang="scss">
  .box6 {
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
      height: calc(100% - 42px);
    }
  }
</style>