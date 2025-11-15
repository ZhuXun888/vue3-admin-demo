<template>
  <div class="box8">
    <div class="title">
      <p>渠道统计</p>
      <img src="../../images/dataScreen-title.png">
    </div>
    <!-- 渠道统计图表 -->
    <div class="charts" ref="couter"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  // 引入echarts
  import * as echarts from 'echarts';
  // 获取图形图标挂载节点
  let couter = ref()
  // 配置项
  let option = {
    title: {
      text: '游客消费统计',
      textStyle: {
        color: 'white',
        fontSize: 20,
      },
      left: '40%',
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感度', max: 16000 },
        { name: '出行', max: 30000 },
        { name: '小吃', max: 38000 },
        { name: '爱好', max: 52000 },
        { name: '景点', max: 25000 }
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '购物'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '吃饭'
          }
        ]
      }
    ]
  };
  // 当组件挂在出来时，获取echarts实例，并绘制图形
  onMounted(() => {
    // 获取echarts实例并初始化
    let mycharts = echarts.init(couter.value)
    // 设置配置项
    mycharts.setOption(option)
  })
</script>

<style scoped lang="scss">
  .box8 {
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