// 通用的接口响应数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 分类数据类型
export interface CategoryItem {
  id: number | string
  name: string
  parentId1?: number// 1级分类id
  parentId2?: number// 2级分类id
}

// 分类列表响应返回的数据类型
export interface CategoryResponseData extends ResponseData {
  data: CategoryItem[]
}

// // 平台属性值数据类型
// export interface AttrValue {
//   id: number
//   valueName: string
//   attrId: number
// }
// //存储每一个属性值的数组类型
// export type AttrValueList =AttrValue[];
// //属性对象
// export interface Attr {
//   id: number
//   attrName: string
//   categoryId: number
//   categoryLevel: number
// }
// // 存储每一个属性对象的数组ts类型
// export type AttrList = Attr[];
// // 平台属性接口响应返回的数据ts类型
// export interface AttrResponseData extends ResponseData {
//   data: Attr[]
// }

// 平台属性值数据类型
export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  isEditing?: boolean // 前端使用，用于标识是否在编辑状态
}

// 平台属性数据对象的ts类型
export interface Attr {
  id?: number | string
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValue[]
}

// 平台属性列表响应数据类型
export interface AttrResponseData extends ResponseData {
  data: Attr[]
}

// 获取分类参数类型
export interface GetCategoryParams {
  parentId: number
  level: number
}

// 获取平台属性参数类型
export interface GetAttrParams {
  category1Id: number
  category2Id: number
  category3Id: number
}