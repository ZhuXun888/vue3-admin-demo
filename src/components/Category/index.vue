<!-- 三级分类全局组件-----在index.ts中注册为全局组件   -->
<template>
  <el-card>
    <el-form :inline="true">
      <!-- :inline="true" 可设置成一行方多个输入框  -->
      <el-form-item label="一级分类" value="111" >
        <el-select :disabled="scene==0?false:true" v-model="categoryStore.c1Id" @change="handler1"> 
          <!-- el-option 中  label 属性是显示的文字  value 中设置要收集的数据，在v-model 中接收,有了v-model接收，才能在文本框展示选择数据并存储其id  -->
          <el-option  v-for="(c1,index) in categoryStore.c1Arr" :key="c1.id"  :label="c1.name"  :value=c1.id />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" value="11">
        <el-select :disabled="scene==0?false:true" v-model="categoryStore.c2Id" @change="handler2">
          <el-option v-for="(c2,index) in categoryStore.c2Arr" :key="c2.id" :label="c2.name" :value=c2.id />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" value="1113">
        <el-select :disabled="scene==0?false:true" v-model="categoryStore.c3Id" @change="handler3">
          <el-option v-for="(c3,index) in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id" />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
// 引入分类分类相关的仓库
import useCategoryStore from '@/store/modules/category'
let categoryStore=useCategoryStore()
// 分类全局组件挂载完毕，通知仓库发请求获取一级分类的数据
onMounted(()=>{
  getC1()
})
// 通知仓库获取一级分类的方法
const getC1=()=>{
  // 通知仓库发请求获取一级分类的数据
  categoryStore.getC1()
}
// 通知仓库获取二级分类的方法
//此方法为一级分类下拉菜单的change 事件（选中值发生变化时触发）-----内置的
//handler(value)--事件回调方法，回调参数value 是当前选中的选项的value值,也就是value收集的当前数据id
const handler1=()=>{ 
  //每一次一级分类框的数据发生变化时，就要清空二级三级的数据（通过id）清空 
  categoryStore.c2Id=''
  categoryStore.c3Id=''
  // 获取二级分类数据
  categoryStore.getC2()
}
// 通知仓库获取三级分类的方法
const handler2=()=>{  
  //每一次二级分类框的数据发生变化时，就要清空三级的数据（通过id）清空 
  categoryStore.c3Id=''
  // 获取三级分类数据
  categoryStore.getC3()
}
// 
const handler3=()=>{  
  // 获取三级分类数据
  categoryStore.getAttr()
}
// 接受父组件传过来的scene
const props = defineProps(['scene'])
</script>

<style scoped>
.el-form-item{
  width: 220px;
}
el-select{
  width:  220px;
}
</style>