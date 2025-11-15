// SPU 相关的 API 请求函数
import request from '@/utils/request'
import type {
  HasSpuResponseData,
  SpuData,
  SpuHasImg,
  SaleAttrResponseData,
  HasSaleAttrResponseData,
  SkuInfoData,
  SkuData,
  AllTradeMark
} from './type'

enum API {
  // SPU 相关接口
  // 获取已有的SPU的数据
  HASSPU_URL = '/admin/product/',
  // 获取某个SPU下的全部的售卖商品的图片数据
  IMAGE_URL = '/admin/product/spuImageList/',
  // 获取某一个SPU下全部的已有的销售属性接口地址
  SPUHASSALEATTR_URL = '/admin/product/spuSaleAttrList/',
  // 获取整个项目全部的销售属性[颜色、内存、磁盘等]
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  // 添加SPU
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  // 修改SPU
  UPDATESPU_URL = '/admin/product/saveSpuInfo',
  // 删除SPU
  REMOVESPU_URL = '/admin/product/deleteSpu/',

  // SKU 相关接口
  // 查看某一个已有的SPU下全部售卖的商品
  SKUINFO_URL = '/admin/product/findBySpuId/',
  // 追加一个新增的SKU地址
  ADDSKU_URL = '/admin/product/saveSkuInfo',

  // 品牌相关接口
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList'
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu = (page: number, limit: number, category3Id: number | string) =>
  request.get<any, HasSpuResponseData>(API.HASSPU_URL + `${page}/${limit}?category3Id=${category3Id}`)

// 获取SPU图片列表
export const reqSpuImageList = (spuId: number) =>
  request.get<any, SpuHasImg>(API.IMAGE_URL + spuId)

// 获取某一个已有的SPU拥有多少个销售属性
export const reqSpHasSaleAttr = (spuId: number) =>
  request.get<any, SaleAttrResponseData>(API.SPUHASSALEATTR_URL + spuId)

// 获取基础(全部的)销售属性
export const reqALLSaleAttr = () =>
  request.get<any, HasSaleAttrResponseData>(API.ALLSALEATTR_URL)

// 添加SPU
export const reqAddSpu = (data: SpuData) =>
  request.post<any, any>(API.ADDSPU_URL, data)

// 更新|修改 SPU
// data:即为新增的SPU | 或和已有的SPU对象
export const reqAddOrUpdateSpu = (data: SpuData) => {
  if (data.id) {
    //有id，修改SPU
    return request.post<any, any>(API.UPDATESPU_URL, data)
  } else {
    //没有id，添加SPU
    return request.post<any, any>(API.ADDSPU_URL, data)
  }
}


// 删除SPU
export const reqRemoveSpu = (spuId: number | string) =>
  request.delete<any, any>(API.REMOVESPU_URL + `${spuId}`)

// 获取SKU列表
export const reqSkuList = (spuId: number | string) =>
  request.get<any, SkuInfoData>(API.SKUINFO_URL + `${spuId}`)

// 添加SKU
export const reqAddSku = (data: SkuData) =>
  request.post<any, any>(API.ADDSKU_URL, data)

// 获取品牌列表
export const reqAllTradeMark = () =>
  request.get<any, AllTradeMark>(API.ALLTRADEMARK_URL)