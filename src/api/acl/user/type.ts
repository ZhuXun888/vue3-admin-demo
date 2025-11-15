/*
 * @Description: Stay hungry，Stay foolish
 * @Author: Huccct
 * @Date: 2023-05-19 17:16:03
 * @LastEditors: Huccct
 * @LastEditTime: 2023-05-23 21:32:17
 */
// 登录接口需要携带参数ts类型
export interface LoginFormData {
  username?: string
  password?: string
}
// 账号信息的ts类型
export interface ResponseData {
  code?: number
  message?: string
  ok?: boolean
}
// 代表一个账号信息的ts类型
export interface User {
  id?: number
  username?: string
  password?: string
  name?: string
  phone?: string
  roleName?: string
  createTime?: string
  updateTime?: string
  status?: number
}
// 数组包含全部的用户信息
export type Records = User[]
// 获取全部用户信息接口返回的数据ts类型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    total: number
    size: number
    current: number
    pages: number
  }
}


export interface LoginResponseData extends ResponseData {
  data?: string
}

// 代表一个职位的ts类型
export interface RoleData {
  id?: number
  roleName?: string
  createTime?: string
  updateTime?: string
}
// 全部角色的列表
export type AllRole = RoleData[]
// 获取全部角色的接口返回的数据ts类型
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoleList: AllRole
    allRoleList: AllRole
  }
}
// 给用户分配角色接口携带参数的ts类型
export interface SetRoleData {
  roleIdList: number[] //当前用户所拥有的角色id的数组
  userId: number //当前用户id
}
