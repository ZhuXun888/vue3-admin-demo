// 这里书写属性相关的api文件
import request from '@/utils/request'
import type {
  CategoryResponseData,
  AttrResponseData,
  Attr
} from './type'

// 平台属性管理模块接口地址
enum API {
  // 获取一级分类接口
  C1_URL = '/admin/product/getCategory1',
  // 获取二级分类接口
  C2_URL = '/admin/product/getCategory2/',
  // 获取三级分类接口
  C3_URL = '/admin/product/getCategory3/',
  // 根据分类ID获取平台属性接口
  GET_ATTR_LIST_URL = '/admin/product/attrInfoList/',
  // 添加或更新平台属性接口
  ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
  // 删除平台属性接口
  DELETE_ATTR_URL = '/admin/product/deleteAttr/'
}

// 获取一级分类接口方法
export const reqC1 = () => { return request.get<any, CategoryResponseData>(API.C1_URL) }

// 获取二级分类接口方法
export const reqC2 = (category1Id: number | string) => { return request.get<any, CategoryResponseData>(API.C2_URL + category1Id) }

// 获取三级分类接口方法
export const reqC3 = (category2Id: number | string) => { return request.get<any, CategoryResponseData>(API.C3_URL + category2Id) }

// 根据分类ID获取平台属性接口方法
export const reqAttr = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => { return request.get<any, AttrResponseData>(API.GET_ATTR_LIST_URL + `${category1Id}/${category2Id}/${category3Id}`) }

// 添加或修改平台属性接口方法
export const reqAddOrUpdateAttr = (data: Attr) => { return request.post<any, any>(API.ADDORUPDATEATTR_URL, data) }

// 删除平台属性接口方法
export const reqDeleteAttr = (attrId: number) => { return request.delete<any, any>(API.DELETE_ATTR_URL + attrId) }