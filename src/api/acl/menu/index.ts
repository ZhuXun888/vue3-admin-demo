
import request from '@/utils/request'
import type { MenuParams, PermissionResponseData } from './type'
// 枚举地址
enum API {
  // 获取全部菜单与按钮的地址
  ALLPERMISSION_URL = '/admin/acl/permission',
  // 添加菜单与按钮的地址
  ADDMENU_URL = '/admin/acl/permission/save',
  // 修改菜单与按钮的地址
  UPDATE_URL = '/admin/acl/permission/update',
  // 删除菜单与按钮的地址
  DELETEMENU_URL = '/admin/acl/permission/remove/',
}
// 获取全部菜单与按钮的接口
export const reqAllPermission = () =>
  request.get<any, PermissionResponseData>(API.ALLPERMISSION_URL)

// 添加或者修改菜单与按钮的接口
export const reqAddOrUpdateMenu = (data: MenuParams) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATE_URL, data)
  } else {
    return request.post<any, any>(API.ADDMENU_URL, data)
  }
}

// 删除菜单与按钮的接口
export const reqRemoveMenu = (id: number) =>
  request.delete<any, any>(API.DELETEMENU_URL + id)
