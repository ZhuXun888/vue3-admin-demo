<!-- 封装一个svg图标组件    谁用谁引用，也可以在main.ts中全局注册，这样就只用注册一次 ，往后谁要用可以直接用，也不用一次次的引用了-->

<template>
  <div>
    <!-- <h1>测试svg图标</h1> -->
    <!-- svg:图标外层容器节点，内部需要与use标签结合使用 -->
    <!-- 在svg标签设置样式，可以改变图标的大小 r，这里的宽高也可以设置成响应式的 -->
    <svg :style="{ width: width, height: height }">
      <!-- 如何显示图标?    xlink: href="图标的id(一般是 # icon-文件名)"==>即执行用哪一个图标 -->
      <!-- use 标签fill属性可以设置图表的颜色，图标的大小可以在 svg标签上设置 -->

      <use :xlink:href="qianzui + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script lang="ts" setup>
//  <use :xlink:href="'#icon-' + name" :fill="color"></use>这种写法也是可以的，注意#icon-要加单引号

// 定义组件接收的props属性，用于接收父组件传递的数据
defineProps({
  //图标前缀
  qianzui: {
    type: String,      //限制类型
    default: '#icon-'  //default默认值
  },
  //图标名称
  name: String,        //限制类型
  //图标颜色
  color: {
    type: String,      //限制类型
    default: ''        //default默认值,这里设置为空字符串，表示默认使用svg图标本身的颜色，也可以传入具体颜色值对其覆盖
  },
  //图标宽度
  width: {
    type: String,
    default: '50px'     //设置默认宽度为50px
  },
  //图标高度
  height: {
    type: String,
    default: '50px'     //设置默认高度为50px
  }
})
</script>

<style scoped></style>