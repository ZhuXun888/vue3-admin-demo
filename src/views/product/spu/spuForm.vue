<template>
  <div>
    <!-- 添加spu表单 -->
    <el-form label-width="100px">
      <el-form-item label="spu名称">
        <el-input placeholder="请输入spu名称" v-model="SpuParams.spuName" ></el-input>
      </el-form-item>
      <el-form-item label="spu品牌" style="width: 300px;">
        <el-select v-model="SpuParams.tmId">
          <el-option v-for="(item,index) in allTradeMark" :key="item.id" :label="item.tmName" :value="item.id" ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="spu描述">
        <el-input placeholder="请输入spu描述" type="textarea" v-model="SpuParams.description"></el-input>
      </el-form-item>
      <el-form-item label="spu图片">
        <!-- 上传组件 ：el-upload:上传组件(大容器) -->
         <!-- v-model:file-list:上传组件的属性，绑定上传的图片数据，展示当前的默认图片
              action:上传图片的接口地址 
              list-type:上传组件的属性，设置上传组件的类型
              on-preview:上传组件的属性，设置上传组件的预览图片的回调
-->
        <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload"
          list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
          <el-icon>
            <Plus />
          </el-icon>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" style="width: 100%; height: 100%;" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="spu销售属性">
        <!-- 展示销售属性的下拉菜单 -->
        <el-select v-model="saleAttrIdAndValueName" :placeholder="unSelectSaleAttr.length?`还未选择${unSelectSaleAttr.length}个`:`无`" style="width: 200px;">
          <el-option :value="`${item.id}:${item.name}`" v-for="(item,index) in unSelectSaleAttr" :key="item.id" :label="item.name" ></el-option>
        </el-select>
        <el-button  @click="addSaleAttr" :disabled="saleAttrIdAndValueName?false:true" type="primary" icon="Plus" style="margin-left: 10px;">添加销售属性</el-button>
        <!-- table展示已有销售属性与属性值的地方 -->
        <el-table border style="margin: 10px 0px;" :data="SaleAttr" >
          <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
          <el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值" >
            <template #="{row,$index}">
              <!-- row：即为当前SPU已有的销售属性对象 ，当前行数据对象；index：当前SPU已有的销售属性的索引 -->
               <el-tag v-for="(item,index) in row.spuSaleAttrValueList" :key="item.id" @close="row.spuSaleAttrValueList.splice(index,1)" style="margin: 0 5px;"  class="mx-1" closable >{{ item.saleAttrValueName }}</el-tag>
               <el-input @blur="toLook(row)" v-model="row.saleAttrValue" v-if="row.flag==true" placeholder="请输入属性值" size="small" style="width: 100px;"></el-input>
               <el-button @click="toEdit(row)" v-else type="primary" size="small" icon="Plus"  ></el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{row,$index}">
              <el-button type="danger" size="small" icon="Delete" @click="SaleAttr.splice($index,1)" ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="save" :disabled="SaleAttr.length>0?false:true">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  let $emit = defineEmits(['changeScene']);
  import type { SpuData,AllTradeMark ,SpuHasImg,SpuImg,SaleAttrResponseData,Trademark,SaleAttr,HasSaleAttr, SaleAttrValue } from '@/api/product/spu/type';
  import { reqAllTradeMark, reqSpuImageList, reqSpHasSaleAttr, reqALLSaleAttr,reqAddOrUpdateSpu } from '@/api/product/spu'
  import { ref ,computed} from 'vue';
  import  {ElMessage}from 'element-plus'
  
  // 点击取消按钮时触发的回调,通知父组件切换场景值为1，展示已有的spu数据
  const cancel = () => {
    //子组件SpuForm点击取消按钮时，通知父组件切换场景值为0，展示已有的spu数据
    $emit('changeScene', {flag:0,pramas:'updata'});
  }
  // 下面5个变量allTradeMark,imgList,SaleAttr,allSaleAttr,SpuParams 共同组成了一个完整的spu数据
  // 存储所有品牌数据
  let allTradeMark=ref<Trademark[]>([]);
  //当前品牌的spu图片数据
  let imgList=ref<SpuImg[]>([]);
  //已有的spu销售属性数据
  let SaleAttr=ref<SaleAttr[]>([]);
  // 所有的销售属性数据
  let allSaleAttr=ref<HasSaleAttr[]>([]);
  // 控制图片预览对话框的显示与隐藏
  let dialogVisible = ref<boolean>(false);
  // 存储图片预览的图片地址
  let dialogImageUrl = ref<string|undefined>("");
  // 接收父组件传递过来的已有的spu数据
  let SpuParams = ref<SpuData>({
    category3Id: "",  //收集三级分类id：表示当前这个SPU是属于哪个三级分类的
    description: "",  //收集spu描述
    spuName: "",      //收集spu名称
    tmId: "",         //收集品牌id：表示当前这个SPU是属于哪个品牌
    spuSaleAttrList: [],  //收集spu销售属性数据
    spuImageList: [],     //收集spu图片数据
  })
  // 将来收集还未选择的销售属性的ID和属性值的名字
  let saleAttrIdAndValueName=ref<string>('')
  // 方法
  const initHasSpuData = async (spu: SpuData) => {
    // 存储已有的SPU对象，将来在模板中展示
    SpuParams.value = spu;
    //spu：即为父组件传递过来的已有的SPU对象，接下来只用发四个请求，然后把这5个数据合并成一个完整的spu数据对象，给父组件
    //1.发请求，获取所有品牌的数据
    let reault:AllTradeMark= await reqAllTradeMark();
    console.log("品牌获取成功!!!!!!!!!!111",reault);
    //2.发请求获取，获取某一个品牌旗下全部售卖商品的图片
    let result1:SpuHasImg = await reqSpuImageList((spu.id as number));
    console.log("图片获取成功!!!!!!!!!!222",result1);
    //3.发请求，获取已有的SPU销售属性的数据
    let result2:SaleAttrResponseData = await reqSpHasSaleAttr((spu.id as number));
    console.log("SPU销售属性获取成功!!!!!!!!!!333",result2);
    //4.发请求，获取所有销售属性的数据
    let result3 = await reqALLSaleAttr();
    console.log("所有销售属性获取成功!!!!!!!!!!444",result3);

    //存储全部品牌的数据
    allTradeMark.value=reault.data;
    //存储当前spu的图片数据
    imgList.value=result1.data.map(item=>{
      return{
        name: item.imgName,
        url: item.imgUrl,
      }
    })
    //存储已有的spu销售属性数据
    SaleAttr.value=result2.data;
    //存储所有的销售属性数据
    allSaleAttr.value=result3.data;
  }
  // 照片墙点击预览按钮时出发的钩子，用于放大预览图片
  const handlePictureCardPreview = (file: SpuImg) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
  }
  // 删除图片墙中图片的回调
  const handleRemove = (file: SpuImg) => {
    // 删除图片墙中图片的回调
    // 1. 获取图片墙中图片的索引
    let index = imgList.value.findIndex(item => item.url === file.url);
    // 2. 删除图片墙中图片
    imgList.value.splice(index, 1);
  }
  // 照片强上传成功之前的钩子，用于约束文件的大小与类型
  const handlerUpload=(file:any)=>{
    if(file.type==="image/jpeg"||file.type==="image/png"||file.type==="image/gif"){
      if(file.size/1024/1024<3){
        return true;
      }else{
        ElMessage.error("上传图片不能大于3M");
        return false;
      }
    }else{
      ElMessage.error("上传图片只能是jpg/png/gif格式");
      return false;
    }
  }
  //用计算属性----- 计算出当前SPU还未拥有的销售属性
  let unSelectSaleAttr=computed(()=>{
    let unSelectArr=allSaleAttr.value.filter(item=>{
      // .filter()方法返回一个新数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
      return SaleAttr.value.every(item1=>{
        // .every()方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
        return item.name!==item1.saleAttrName
      })
    })
    return unSelectArr;
  })
  // 点击添加销售属性按钮的回调
  const addSaleAttr = () => {
    // 直接数组结构
    const [baseSaleAttrId,saleAttrName]=saleAttrIdAndValueName.value.split(':');
    let newSaleAtt:SaleAttr={
      baseSaleAttrId:baseSaleAttrId as number|string,
      saleAttrName:saleAttrName as string,
      spuSaleAttrValueList:[]
    }
    // 追加到数组当中
    SaleAttr.value.push(newSaleAtt);
    // 添加完后清空下拉单收集到的数据
    saleAttrIdAndValueName.value='';
  }
  // 属性值按钮的点击事件
  const toEdit=(row:SaleAttr)=>{
    // 点击按钮的时候，input组件显示，进入编辑模式
    row.flag=true
    row.saleAttrValue=''
  }
  // 表单元素失去焦点时的回调
  const toLook=(row:SaleAttr)=>{
    // 整理收集的属性的ID和属性值的名字
    const{baseSaleAttrId,saleAttrValue}=row 
    // 把收集到的数据整理成服务器需要的属性值形式
    let newSaleAttrValue:SaleAttrValue={
      baseSaleAttrId,
      saleAttrValueName:(saleAttrValue as string)
    }
    // 校验表单数据不能为空--判断是否为空
    if((saleAttrValue as string)?.trim()==''){
      return ElMessage.error('属性值不能为空')
    }
    // 校验表单数据不能重复--判断是否有重复
    let repeat=row.spuSaleAttrValueList.find(item=>{
      return item.saleAttrValueName===newSaleAttrValue.saleAttrValueName
    })
    if(repeat){
      return ElMessage.error('属性值不能重复')
    }

    // 追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    // 追加完后，切换为查看模式
    row.flag=false
  }
  // 保存按钮的回调
  const save=async()=>{
    //1、 整理参数
    // 1.1：照片墙的数据
    SpuParams.value.spuImageList=imgList.value.map(item=>{
      return{
        imgName:item.name,//图片名称
        // imgUrl:(item.response&&item.response.data)||item.url
        imgUrl:item.url
      }
    }) 
    // 1.2：整理销售属性的数据
    SpuParams.value.spuSaleAttrList=SaleAttr.value
    // console.log("整理后的参数",SpuParams.value);
    //2、 发请求
   let result= await reqAddOrUpdateSpu(SpuParams.value)
   if(result.code===200){
     ElMessage.success(SpuParams.value.id?'修改成功':'保存成功')
     //修改成功，通知父组件切换场景为0-----用自定义事件，在子组件用$emit()触发自定义事件
     $emit('changeScene',{flag:0,params:SpuParams.value.id?'update':'add'})
     // 跳转到列表页面
    //  router.push('/product/spu/list')
   }else{
     ElMessage.error(SpuParams.value.id?'修改失败':'保存失败')
   }
  }
  // 添加一个新的SPU初始化请求方法-----这里要发两个请求：1、获取所有品牌数据  2、获取所有销售属性数据
  const initAddSpu=async(c3Id:number|string)=>{
    //1、 在每次收集数据之前，清空上一次残留的数据
    Object.assign(SpuParams.value,{
      category3Id: "",   
      description: "",  
      spuName: "",       
      tmId: "",         
      spuSaleAttrList: [],  
      spuImageList: [],    
    })
    // 清空照片
    imgList.value=[]
    // 清空销售属性
    SaleAttr.value=[]
    // 清空之前收集的销售属性数据
    saleAttrIdAndValueName.value=''

    //2、 存储三级分类ID
    SpuParams.value.category3Id=c3Id//没有这个三级分类ID的话，系统就不知道要给谁添加SPU，导致添加失败
    //3、发请求，获取所有品牌的数据
    let reault1:AllTradeMark= await reqAllTradeMark();
    console.log("SPU品牌获取成功!!!!!!!!!!222",reault1);
    //4、发请求，获取所有销售属性的数据
    let result2 = await reqALLSaleAttr();
    console.log("所有销售属性获取成功!!!!!!!!!!444",result2);
    //5、存储请求回来的响应数据,否则即便得到了数据，也无法在页面中展示
    allTradeMark.value=reault1.data;//存储所有的品牌数据
    allSaleAttr.value=result2.data;//存储所有的销售属性数据
  }

  // 对外暴露方法，与属性，使父组件可以拿到
  defineExpose({initHasSpuData,initAddSpu})//允许父组件调用子组件内部的初始化逻辑
</script>

<style scoped>

</style>