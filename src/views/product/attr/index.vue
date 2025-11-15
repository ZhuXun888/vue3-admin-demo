<template>
  <div>
    <!-- 三级分类全局组件 -->
    <Category :scene="scene"></Category>
    <!-- 属性列表  -->
    <el-card style="margin-top:  10px;">
      <div v-show="scene==0">
      <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id?false:true" @click="addAttr">添加平台属性</el-button>
      <el-table border style="margin: 10px 0px;" :data="attrArr">
                                            <!-- :data="attrArr"：这个属性告诉表格要显示的数据源是 attrArr 数组 -->
        <!-- 四列                     type="index"：当设置这个属性时，该列会自动显示行号/序号 -->
        <el-table-column label="序号" type="index" align="center" width="150px"></el-table-column>
        <el-table-column label="属性名称" width="200px" prop="attrName"></el-table-column>
        <el-table-column label="属性值名称">
          <template #default="{row,$index}">
            <!-- row：数组的每一个属性对象，index：数组的索引 -->
            <el-tag style="margin: 5px;" v-for="(item,index) in row.attrValueList" :key="item.id">{{item.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
          <template #="{row,$index}">
            <el-button type="primary" size="small" icon="Edit" @click="$event=>updataAttr(row)">修改</el-button>           
            <!-- 点击删除按钮的气泡确认框 -->
              <el-popconfirm :title="`确定不要${row.attrName}?`" width="200px" icon="Delete" @confirm="removeAttr(row.id)" >
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" @click="$event=>deleteAttr(row)" >删除</el-button>
                </template>
              </el-popconfirm>
            </template>    
        </el-table-column>
      </el-table>
      </div>
<!-- 展示添加属性与修改数据的结构 -->
      <div v-show="scene==1">
         <el-form :inline="true">
          <el-form-item label="属性名称"> 
            <el-input v-model="attrParmas.attrName"  placeholder="请输入属性名称"></el-input>
          </el-form-item>
          </el-form>
          <el-button :disabled="attrParmas.attrName?false:true" @click="addAttrValue" type="primary"  size="default"  icon="Plus" >添加属性值</el-button>
          <el-button type="primary"  size="default" @click="cancel" >取消</el-button>
         <el-table border style="margin: 10px 0px;" :data="attrParmas.attrValueList">
          <el-table-column label="序号" type="index" align="center" width="200px"></el-table-column>
          <el-table-column label="属性值"  >
            <template #default="{row,$index}">
              <el-input v-model="row.valueName" placeholder="请输入属性值名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="300px"></el-table-column>
         </el-table>
          <el-button type="primary"  size="default" @click="save" >保存</el-button>
          <el-button type="primary"  size="default" @click="cancel" >取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
// 引入组合式API函数watch
import { watch ,ref,reactive} from 'vue'
// 引入获取已有属性与属性值接口
import { reqAttr,reqAddOrUpdateAttr,reqDeleteAttr } from '@/api/product/attr';
import type { AttrResponseData,Attr } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus'
//获取分类的仓库
import  useCategoryStore  from '@/store/modules/category';
let categoryStore=useCategoryStore()
//定义card组件内容切换的变量
let scene=ref<number>(0)//scene=1，显示属性列表，scene=0，展示添加与修改属性结构
// 存储已有的属性和属性值
let attrArr=ref<Attr[]>([])
// 收集新增的属性的数据对象
let attrParmas=reactive<Attr>({
  attrName:'',       //属性名称
   attrValueList:[], //新增的属性值数组
  categoryId:'',     //三级分类的ID
  categoryLevel:3    //属性级别，这里代表的是三级分类
})
//监听仓库三级分类ID数据，当三级分类ID发生变化时，重新获取属性数据
watch(()=>categoryStore.c3Id, ()=>{ 
  //1、清空上一次查询的属性与属性值
  attrArr.value=[]
  //2、要按保证有三级分类ID数据c3ID时，才能发请求
  if(!categoryStore.c3Id) return
  //3、调用函数获取分类的id
  getAttr()
})
// 获取已有的属性与属性值方法
const getAttr=async()=>{ 
  //从categoryStore中解构出三级分类ID数据
  const {c1Id,c2Id,c3Id}=categoryStore
  // 调用获取属性接口方法，发请求，获取分类下的已有属性与属性值
  let result:AttrResponseData=await reqAttr(c1Id,c2Id,c3Id)
  if(result.code==200){ 
    attrArr.value=result.data
  }
}
//添加平台属性按钮的回调
const addAttr=()=>{ 
  // 1、每一次点击的时候，先清空上一次的表单数据，再收集本次数据
  Object.assign(attrParmas,{
  attrName:'',       //属性名称
   attrValueList:[], //新增的属性值数组
  categoryId:categoryStore.c3Id,     //三级分类的ID，收集的新增属性的三级分类id
  categoryLevel:3   //属性级别
})
  //2、打开添加属性对话框
  scene.value=1
  //2、点击这个按钮的时候，收集新增属性的三级分类id--清空数据的同时，收集了三级分类id
 
}
// 修改属性按钮的回调
const updataAttr=async(data:Attr)=>{ 
  //1、打开修改属性对话框
  scene.value=1
  // 2、把点击的该属性的数据给表单
  Object.assign(attrParmas,data)
}
// 取消按钮的回调
const cancel=()=>{ 
  //1、关闭对话框
  scene.value=0
  //2、清空表单数据
  // formRef.value.resetFields()
  //3、清空表单数据校验结果
  // formRef.value.clearValidate()
  //4、在每次收集数据之前，清除掉上Once()方法：等待组件更新完成后，再执行回调函数--它告诉 Vue："请在下一次 DOM}
}
// 添加属性值按钮的回调
const addAttrValue=()=>{ 
  //1、点击添加属性值按钮的时候，像数组添加一个属性值对象
  attrParmas.attrValueList.push(
    {
      valueName:''
    }
  )
}
// 保存按钮的回调
const save=async()=>{ 
  //1、携带收集到的attrParmas数据，发送请求
  let result=await reqAddOrUpdateAttr(attrParmas)
  // 添加属性成功
  if(result.code==200){
    //跳转到属性列表页面
    scene.value=0
    //添加成功消息提示
    ElMessage.success(attrParmas.id?'修改属性成功':'添加属性成功')
    // 更新页面，重新获取全部已有的属性与属性值
    getAttr()
  }else{ 
    //添加失败消息提示
    ElMessage.error(attrParmas.id?'修改属性成功':'添加属性成功')
  }
}
// 删除属性按钮的回调
const deleteAttr=async(data:Attr)=>{ 
}
//点击气泡框确认按钮的回调
const removeAttr=async(id:number)=>{ 
  //1、点击气泡框确认按钮，发送请求，删除属性
  let result=await reqDeleteAttr(id)
  // 删除成功
  if(result.code==200){
    // 删除成功消息提示
    ElMessage.success('删除属性成功')
    // 删除成功，重新获取全部已有的属性与属性值
    getAttr()
  }else{ 
}
}
</script>

<style scoped></style>