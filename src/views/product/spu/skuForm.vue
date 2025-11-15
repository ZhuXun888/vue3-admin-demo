<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="sku名称">
        <el-input  placeholder="请输入sku名称"  v-model="skuParams.skuName"  ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input  placeholder="请输入价格(元)"  type="number"  v-model="skuParams.price" ></el-input>
      </el-form-item>
      <el-form-item label="重量(克)" >
        <el-input  placeholder="请输入重量(克)" type="number"  v-model="skuParams.weight" ></el-input>
      </el-form-item>
      <el-form-item label="sku描述">
        <el-input placeholder="请输入sku描述" type="textarea"  v-model="skuParams.skuDefaultImg" ></el-input>
      </el-form-item> 
      <el-form-item label="平台属性" :inline="true" >
        <el-form :inline="true">
          <el-form-item v-for="(item,index) in attrArr " :key="item.id" :label="item.attrName" style="width: 250px;">
            <el-select  v-model="item.attrIdAndValueId" >
              <el-option  v-for="(attrValue,index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName" :value="`${item.id}:${attrValue.id}`"></el-option>
            </el-select>
          </el-form-item>            
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" >
          <el-form-item v-for="(item,index) in saleArr" :key="item.id" :label="item.saleAttrName" style="width: 250px;">
            <el-select  v-model="item.saleIdAndValueId" >
              <el-option v-for="(saleAttrValue,index) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName" :value="`${item.id}:${saleAttrValue.id}`" ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称"> 
        <el-table border :data="imgArr" ref="table">
          <el-table-column type="selection"  width="80px" align="center" ></el-table-column>
          <el-table-column label="图片" >
            <template #="{row,$index}">
              <img :src="row.imgUrl"  style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" ></el-table-column>
          <el-table-column label="操作">
            <template #="{row,$index}">
              <el-button type="danger" size="small" @click="handler(row)" >设置默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="save" >保存</el-button>
        <el-button type="primary" size="small" @click="cancel" >取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
// 接收父组件中绑定的自定义事件
let $emit = defineEmits(['changeScene'])

// 引入请求的api接口
import { reqAttr } from '@/api/product/attr';
import { reqSpuImageList ,reqSpHasSaleAttr,reqAddSku} from '@/api/product/spu/index';
import type { SkuData } from '@/api/product/spu/type';
import { ref,reactive } from 'vue';
import { ElMessage } from 'element-plus'
// 存储平台属性
let attrArr = ref<any>([])
// 存储销售属性
let saleArr = ref<any>([])
// 获取照片墙数据
let imgArr = ref<any>([])
// 收集SKU的参数，用于发请post请求时携带
let skuParams = reactive<SkuData>({
  category3Id: "",//三级分类的ID
  spuId: "",//已有的SPU的ID
  tmId: "",//SPU品牌的ID
  skuName: "",//sku名字
  price: "",//sku价格
  weight: "",//sku重量
  skuDesc: "",//sku的描述
  skuAttrValueList: [],//平台属性
  skuSaleAttrValueList: [],//销售属性
  skuDefaultImg: "",//sku图片地址
})
// 获取table组件实例
let table=ref<any>()
// 取消按钮的回调
const cancel=()=>{
  $emit('changeScene',{flag:0,pramas:''})
}

// 当前子组件的此方法对外暴露，供父组件调用
const initAkuData=async(c1Id:number|string,c2Id:number|string,spu:any)=>{
  // 收集三级分类id数据
  skuParams.category3Id=spu.category3Id
  skuParams.spuId=spu.id
  skuParams.tmId=spu.tmId

  // 获取平台属性--就是三级分类下获取的属性
  let result1=await reqAttr(c1Id,c2Id,spu.category3Id)
  // 获取对应的销售属性
  let result2=await reqSpHasSaleAttr(spu.id)
  // 获取相应的照片墙数据
  let result3=await reqSpuImageList(spu.id)
  //平台属性
  attrArr.value=result1.data
  //销售属性
  saleArr.value=result2.data
  //照片墙数据
  imgArr.value=result3.data
}
// 设置默认图片的方法
const handler=(row:any)=>{
  // 点击的时候，全部图片的复选框不勾选
  imgArr.value.forEach((item:any)=>{
    table.value.toggleRowSelection(item,false)//先遍历所有图片数据，强制取消每一行的勾选状态
  })
  // 选中的图片才勾选
  table.value.toggleRowSelection(row,true)//再对当前点击的行（row），强制设置为勾选状态----->最终实现 “点击某行时，仅选中这一行，其他行全部取消选中” 的单选效果。
}
// 点击保存按钮的回调
const save= async () => { 
  // 1、整理参数
  // 1.1：平台属性
  skuParams.skuAttrValueList=attrArr.value.reduce((prev:any,next:any)=>{
    if(next.attrIdAndValueId){
      let [attrId,valueId]=next.attrIdAndValueId.split(':')
      prev.push({
        attrId,
        valueId
      })
    }
    return prev
  },[])
  // 1.2：销售属性
  skuParams.skuSaleAttrValueList=saleArr.value.reduce((prev:any,next:any)=>{ 
    if(next.saleIdAndValueId){
      let [saleAttrId,saleAttrValueId]=next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId
      })
    }
    return prev
  },[])
  // 2、 发请求--添加SKU的请求
  let result=await reqAddSku(skuParams)
  if(result.code==200){
    ElMessage.success('添加SKU成功')
    // 添加成功，通知父组件切换为场景0
    $emit('changeScene',{flag:0,params:''})
  }else{
    ElMessage.error('添加SKU失败')
  }

  // 3、 提示用户结果
}

// 对外暴露方法
defineExpose({initAkuData})
</script>

<style scoped>

</style>