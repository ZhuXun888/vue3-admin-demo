//书写品牌管理模块的接口
import request from '@/utils/request'//导入封装的axios请求工具
import type { TradeMarkResponseData, TradeMark, FileUploadResponseData, } from './type'

//品牌管理模块接口地址
enum API {
  //获取品牌列表接口
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  // 添加品牌接口
  ADDTRADMARK_URL = '/admin/product/baseTrademark/save',
  // 修改品牌接口
  UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
  // 删除品牌接口
  DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove',
  // 图片上传接口
  FILE_UPLOAD_URL = '/admin/product/fileUpload'
}
// 获取品牌列表数据接口方法
//page:获取第几页 ---默认第一页
//limit:获取几个已有品牌的数据
export const reqHasTradeMark = (page: number, limit: number) =>
  request.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)

//添加或修改品牌接口方法
export const reqAddOrUpdateTradeMark = (data: TradeMark) => {
  // 判断携带的参数data是否存在id
  if (data.id) {
    //有id，修改品牌
    return request.put<any, TradeMarkResponseData>(API.UPDATETRADEMARK_URL, data)
  } else {
    //没有id，添加品牌
    return request.post<any, TradeMarkResponseData>(API.ADDTRADMARK_URL, data)
  }
}
// 删除品牌接口方法
export const reqDeleteTradeMark = (id: number) =>
  request.delete<any, TradeMarkResponseData>(`/admin/product/baseTrademark/remove/${id}`)
// 文件上传接口方法
export const reqFileUpload = () =>
  request.post<any, FileUploadResponseData>(API.FILE_UPLOAD_URL)