// 定义通用的接口响应数据的ts类型--规定了所有接口返回的数据都必须包含三个核心字段--不同接口的响应数据结构会有差异，但它们的基础格式是一致的（都包含 code、message、ok）。
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

// 文件上传接口的响应数据类型
export interface FileUploadResponseData extends ResponseData {
  data: string  // 上传成功后返回的图片URL
}

//已有的品牌的ts数据类型
export interface TradeMark {
  id?: number// id是可选的，因为，已有的品牌，id是存在的，但是新增的，id是不存在的
  tmName: string
  logoUrl: string
}
//包含全部品牌数据的ts类型   
export type Records = TradeMark[]//TradeMark[] 表示一个由 TradeMark 类型的对象组成的数组。
//获取全部的已有品牌的数据ts类型
export interface TradeMarkResponseData extends ResponseData {
  data: {
    records: Records  //records ：当前页的品牌数据列表---是一个数组，数组的元素是 TradeMark 类型的对象
    total: number
    size: number
    current: number
    searchCount: boolean
    pages: number
  }
}
