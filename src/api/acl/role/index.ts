// 角色管理模块的接口
import request from '@/utils/request'
import type { RoleResponseData, RoleData, MenuResponseData } from './type'
// 枚举接口地址
enum API {
  // 获取全部角色的接口地址
  ALLROLE_URL = '/admin/acl/role/',
  // 新增角色的接口地址
  ADDROLE_URL = '/admin/acl/role/save',
  // 更新已有的角色
  UPDATEROLE_URL = '/admin/acl/role/update',
  //获取全部的菜单权限与按钮的数据
  ALLPERMISSTION_URL = '/admin/acl/permission/toAssign/',
  // 删除已有的角色
  REMOVEROLE_URL = '/admin/acl/role/remove/'
}

// 获取全部的角色
export const reqAllRoleList = (page: number, limit: number, roleName: string) => request.get<any, RoleResponseData>(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)

// 新增角色于更新已有角色的接口
export const reqAddOrUpdateRole = (role: RoleData) => {
  if (role.id) {
    return request.put<any, any>(API.UPDATEROLE_URL, role)
  } else {
    return request.post<any, any>(API.ADDROLE_URL, role)
  }
}

// 获取全部的菜单权限与按钮的接口
export const reqAllMenuList = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPERMISSTION_URL + roleId)

// 删除已有的角色
export const reqRemoveRole = (roleId: number) => request.delete<any, any>(API.REMOVEROLE_URL + roleId)