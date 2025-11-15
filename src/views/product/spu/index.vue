<template>
  <div>
    <!-- 三级分类组件 -->
    <Category :scene="scene"></Category>
    <!-- 卡片组件-----spu列表组件 -->
    <el-card style="margin:10px 0px ;">
      <div v-show="scene==0">
        <el-button type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id?false:true"
          @click="aadSpu">添加spu</el-button>
        <el-table border style="margin: 10px 0px;" :data="records">
          <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
          <el-table-column label="spu名称" width="180px" prop="spuName"></el-table-column>
          <el-table-column label="spu描述" prop="description" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="260px">
            <template #="{row,$index}">
              <el-button type="primary" size="small" icon="Plus" title="添加SKU" @click="addsku(row)"></el-button>
              <el-button type="primary" size="small" icon="Edit" title="修改SPU" @click="updateSpu(row)"></el-button>
              <el-button type="primary" size="small" icon="View" title="查看SKU列表" @click="findSku(row)"></el-button>
              <el-popconfirm :title="`你确定删除${row.spuName}?`" width="200px" @confirm="deleteSpu(row)">
                <template #reference>
                  <el-button type="danger" size="small" icon="Delete" title="删除SPU"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页器组件 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3,5,7,9]"
          :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
          @current-change="getHasSpu" @size-change="changesize" />
        <!-- @current-change="getHasSpu"   分页器当前页码发生变化时，触发current-change事件，执行getHasSpu方法，重新获取数据-->
      </div>
      <!-- 添加spu|修改spu子组件 -->
      <SpuForm ref="spu" v-show="scene==1" @changeScene="changeScene"></SpuForm>
      <!-- 添加sku子组件 -->
      <SkuForm  ref="sku" v-show="scene==2" @changeScene="changeScene"></SkuForm>
      <!-- dialog对话框：点击查看SKU列表时，展示已有的SKU数据 -->
       <el-dialog title="SKU列表" v-model="show" >
        <el-table border :data="skuArr">
          <el-table-column label="sku名字" prop="skuName" ></el-table-column>
          <el-table-column label="sku价格" prop="price" ></el-table-column>
          <el-table-column label="sku重量" prop="weight" ></el-table-column>
          <el-table-column label="sku图片" >
            <template #="{row,$index}" >
              <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
        </el-table>
       </el-dialog>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch,onBeforeUnmount } from 'vue'
  // 引入并获得分类的仓库
  import useCategoryStore from '@/store/modules/category';
  // 引入接口请求方法
  import { reqHasSpu,reqSkuList,reqRemoveSpu } from '@/api/product/spu';
  import type { HasSpuResponseData, Records, SpuData ,SkuInfoData,SkuData} from '@/api/product/spu/type';
  import { ElMessage } from 'element-plus'
  //引入子组件
  import SpuForm from './spuForm.vue'
  import SkuForm from './skuForm.vue'
  let categoryStore = useCategoryStore();
  // 场景切换的控制变量
  let scene = ref < number > (0);//0：显示SPU列表  1：添加|修改 SPU  2：添加SKU
  // 分页器默认页吗
  let pageNo = ref < number > (1);
  // 分页器默认每一页显示几条数据
  let pageSize = ref < number > (3);
  // 存储获取到的SPU数据的数组
  let records = ref < Records > ([])
  // 存储已有的SPU的总个数
  let total = ref < number > (0);
  // 获取spuForm子组件实例
  let spu = ref < any > ()
  // 获取skuForm子组件实例
  let sku = ref < any > ();
  // 存储全部的SKU数据 
  let skuArr=ref<SkuData[]>([])
  //控制展示sku列表的dialog对话框的显示和隐藏
  let show=ref<boolean>(false)
  // 监听三级分类ID变化
  watch(() => categoryStore.c3Id, () => {
    // 务必保证有三级分类的id，再发请求 
    if (!categoryStore.c3Id) return;
    getHasSpu();
  })
  // 获取某一个三级分类下全部的已有的SPU
  const getHasSpu = async (pager = 1) => {
    // 修改当前页码
    pageNo.value = pager
    let result: HasSpuResponseData = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (result.code == 200) {
      records.value = result.data.records;
      total.value = result.data.total;
    } else {
      ElMessage.error(result.message)

    }
  }
  // 分页器下拉菜单发生变化时触发
  const changesize = () => {
    getHasSpu();
  }
  // 添加spu的回调
  const aadSpu = () => {
    // 切换为场景1：添加与修改已有SPU结构->SpuForm组件
    scene.value = 1;
    //点击添加SPU按钮，调用子组件SpuForm的initAddSpuData方法，并传递三级分类ID，初始化数据 
    spu.value.initAddSpu(categoryStore.c3Id)
  }
  // 修改spu的回调
  const updateSpu = (row: SpuData) => {
    // 切换为场景2：添加SKU结构->SkuForm组件
    scene.value = 1;
    console.log(row);
    // 调用子组件SpuForm的initHasSpuData方法，并传递spu数据
    spu.value.initHasSpuData(row);
    console.log('修改spu', spu.value);
  }
  //子组件SpuForm绑定自定义事件： 目的是 在子组件点击取消按钮时通知父组件切换场景为0
  const changeScene = (obj:any) => {
    //子组件SpuForm点击取消按钮时，通知父组件切换场景值为0，展示已有的spu数据
    scene.value = obj.flag;
    // 再次获取全部已有的SPU数据--刷新
    if(obj.params=='update'){
      // 如果是更新修改操作，则留在当前页
      getHasSpu(pageNo.value);
    }else{
      // 如果是添加操作，则切换到第一页
      getHasSpu();
    }
  }
  // 添加sku按钮的回调
  const addsku = (row: SpuData) => {
    // 切换为场景2：添加sku结构->SkuForm组件
    scene.value = 2;
    // 调用子组件的方法初始化添加sku的数据
    sku.value.initAkuData(categoryStore.c1Id, categoryStore.c2Id,row)
  }
  // 查看SKU列表的数据的回调
  const findSku = async(row: SpuData) => { 
    let result=await reqSkuList((row.id as number))
    if(result.code==200){
      // 存储sku数据
      skuArr.value=result.data;
      // 显示dialog对话框,展示sku列表
      show.value=true;
    }else{
      ElMessage.error(result.message)
    }    
  }
  // 删除SPU的回调
  const deleteSpu = async (row: SpuData) => {
    let result=await reqRemoveSpu((row.id as number))
    if(result.code==200){
      ElMessage.success(result.message)
      // 删除成功，重新获取数据，刷新展示列表
      getHasSpu(records.value.length>1?pageNo.value:pageNo.value-1);
    }else{
      ElMessage.error(result.message)
    }
  }
  // 每次路由组件销毁前，清空仓库关于分类的数据
  onBeforeUnmount(()=>{
    categoryStore.$reset()//$reset()方法--清空仓库数据
  })

</script>

<style scoped>
  .avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
  }
</style>