// 通用的接口响应数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}
// 角色数据类型 
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark?: null
}
// 全部角色的数组的ts类型
export type Records = RoleData[]
// 全部角色数据的相应的ts类型
export interface RoleResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    orders: []
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: number
    pages: number
  }
}
// 菜单与按钮数据的ts类型
export interface MenuData {
  id: number
  createTime: string
  updateTime: string
  pid: number
  name: string
  code: string
  toCode: string
  type: number
  status: null
  level: number
  children?: []
  select: boolean// 是否被选中
}
// 菜单权限列表的ts类型
export type MenuList = MenuData[]
// 菜单权限与按钮权限数据的ts类型
export interface MenuResponseData extends ResponseData {
  data: MenuList
}
