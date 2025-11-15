<template>
  <el-card>
    <!-- 表格展示 -->
    <el-table border style="margin: 10px 0px;" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
      <el-table-column label="名称" show-overflow-tooltip width="170px" prop="skuName"></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip width="170px" prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片" width="170px">
        <template #="{row,$index}">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px;">
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" width="170px" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" width="170px" prop="price"></el-table-column>
      <!-- fixed="right" 列固定在右侧 -->
      <el-table-column label="操作" width="300px" fixed="right">
        <template #="{row,$index}">
          <el-button type="primary" size="small" :icon="row.isSale==1?'Bottom':'Top'"
            @click="updateSale(row)"></el-button>
          <el-button type="primary" size="small" icon="Edit" @click=updateSku()></el-button>
          <el-button type="primary" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>
          <el-popconfirm :title="`你确定删除${row.skuName}?`" width="200px" @confirm="removesku(row.id)">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器组件 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5,7,9,12]"
      :background="true" layout="prev, pager, next, jumper,->, sizes,total " :total="total" @current-change="getHasSku"
      @size-change="handler" />
    <!-- 侧边抽屉组件：展示商品详情 -->
    <el-drawer v-model="drawer">
      <!-- 标题部分-----利用插槽展示 -->
      <template #header>
        <h4>查看商品的详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{skuInfo.skuName}}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{skuInfo.skuDesc}}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{skuInfo.price}}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="(item,index) in skuInfo.skuAttrValueList" :key="item.id"
              style="margin: 5px;">{{item.valueName}}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag v-for="(item,index) in skuInfo.skuSaleAttrValueList" :key="item.id"
              style="margin: 5px;">{{item.saleAttrValueName}}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px;">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" style="width: 100%; height: 100%;">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import { reqSkuList, reqCancelSale, reqSaleSku, reqSkuInfo, reqRemoveSku } from '@/api/product/sku'
  import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
  import { ElMessage } from 'element-plus'

  // 分页器当前页码
  let pageNo = ref < number > (1)
  // 每一页展示几条数据
  let pageSize = ref < number > (5)
  // 存储SKU总数
  let total = ref < number > (0)
  // 存储SKU数据数组
  let skuArr = ref < SkuData[] > ([])
  // 控制抽屉显示与隐藏
  let drawer = ref < boolean > (false)
  // 存储SKU详情数据
  let skuInfo = ref < any > ({})
  // 组件挂载完毕，发一次请求，获取并展示SKU列表
  onMounted(() => {
    getHasSku()
  })
  // 获取已有的SKU列表
  const getHasSku = async (pager = 1) => {                   // 分页器当前页码发生变化时，触发current-change事件，执行getHasSku方法，重新获取数据
    // 当前分页器的页码
    pageNo.value = pager
    const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
    if (result.code == 200) {
      // 存储SKU总数
      total.value = result.data.total
      // 存储SKU数据数组
      skuArr.value = result.data.records

    } else {
      ElMessage.error('获取已有的SKU列表失败')
    }
  }
  // 分页器下拉菜单发生变化时触发
  const handler = async (pageSize: number) => {                  // 分页器下拉菜单发生变化时，触发size-change事件，执行handler方法，重新获取数据
    getHasSku()
  }
  // 修改商品上架状态
  const updateSale = async (row: SkuData) => {
    // 判断当前商品是否上架
    // 如果当前商品的isSale==1，说明当前商品是上架的状态，点击这个箭头按钮时，发请求更新为下架，否则else情况与之相反
    if (row.isSale == 1) {
      const result: any = await reqCancelSale((row.id as number))
      ElMessage.success(result.message)
      // 发请求获取当前更新完毕的全部已有SKU
      getHasSku(pageNo.value)

    } else {
      const result: any = await reqSaleSku((row.id as number))
      ElMessage.success(result.message)
      // 发请求获取当前更新完毕的全部已有SKU
      getHasSku(pageNo.value)

    }
  }
  // 更新已有的sku
  const updateSku = async () => {
    ElMessage.success('程序员在努力地更新中...')
  }
  // 查看当前商品详情按钮的回调
  const findSku = async (row: SkuData) => {
    // 显示抽屉
    drawer.value = true
    // 发请求获取当前商品的详情
    let result: SkuInfoData = await reqSkuInfo((row.id as number))
    if (result.code == 200) {
      // 存储SKU详情数据
      skuInfo.value = result.data
      console.log(skuInfo.value.skuSaleAttrValueList)

    } else {
      ElMessage.error('获取商品详情失败')
    }
  }
  // 删除商品按钮的回调
  // 点击删按钮时，弹出气泡确认框，点击确定时，发请求删除当前商品
  const removesku = async (id: number) => {
    //1、点击气泡框确认按钮，发送请求，删除属性
    let result = await reqRemoveSku(id)
    // 删除成功
    if (result.code == 200) {
      // 删除成功消息提示
      ElMessage.success(result.message)
      // 删除成功，重新获取全部已有的属性与属性值
      getHasSku(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
      ElMessage.error(result.message)
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
</style>