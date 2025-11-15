<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <!-- 图形图标容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts';
  let charts = ref()
  onMounted(() => {
    let mycharts = echarts.init(charts.value)
    let option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '40px',
        right: '15px',
        orient: 'vertical',//图例组件方向设置竖直
        textStyle: {
          color: 'white',
          fontSize: '14px'
        }
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'inside',
            color: 'white',
          },
          // 选中状态下的样式（放大效果）
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: 40,
          //     fontWeight: 'bold'
          //   }
          // },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: '军事' },
            { value: 735, name: '新闻' },
            { value: 580, name: '娱乐' },
            { value: 484, name: '财经' },
            { value: 300, name: '科技' }
          ]
        }
      ],
      // 调整图形图标的位置和边距
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }
    };
    mycharts.setOption(option)
  })


</script>

<style scoped lang="scss">
  .box2 {
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
      height: 260px;

    }
  }
</style>