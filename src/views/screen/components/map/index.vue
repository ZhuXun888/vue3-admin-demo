<template>
  <div class="box3" ref="map">

  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import * as echarts from 'echarts';
  // 引入中国地图json数据
  import chinaJson from './cina.json'
  // 获取图形图标挂载节点
  let map = ref()
  // 要先注册中国地图，才能使用
  echarts.registerMap('china', chinaJson as any)
  // 当组件挂在出来时，获取echarts实例，并绘制图形
  onMounted(() => {
    // 获取echarts实例并初始化
    let mycharts = echarts.init(map.value)
    // 设置配置项 绘制图形
    mycharts.setOption({
      //地图组件
      geo: {
        map: 'china',// 地图名称: 中国
        roam: true,// 允许鼠标拖拽平移
        // 地图的位置
        top: 66,
        left: 72,
        right: 72,
        labrl: {
          show: true,//文字显示出来
          color: 'white',
          fontSize: 12,
        },
        itemStyle: {
          // normal: {
          //   //地图颜色
          //   color: 'skyblue',
          //   //鼠标移入地图颜色
          //   areaColor: 'skyblue',
          // }
          // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'pink' // 0% 处的颜色
            }, {
              offset: 1, color: 'blue' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        opacity: 0.8,
        // 地图高亮的样式
        emphasis: {
          itemStyle: {
            color: 'yellow'
          },
          label: {
            fontSize: 30,
          }
        },
      },
      // 布局位置
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      series: [
        {
          type: 'lines',//航线系列
          data: [
            {
              coords: [
                [116.405285, 39.904989],//起点
                [118.767413, 32.041544]//终点
              ],
              // 航线的统一的样式设置
              lineStyle: {
                color: 'red',
                width: 2,
                type: 'dashed'
              },
            },
          ],
          // 开启航线特效样式
          effect: {
            show: true,
            constantSpeed: 50,//
            trailLength: 0.5,
            symbolSize: 10,
            symbol: 'arrow',
            symbolColor: 'red',
          }
        }
      ]
    })
  })
</script>

<style scoped lang="scss">

</style>