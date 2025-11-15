// 用户管理模块的接口
import request from '@/utils/request'
import type { UserResponseData, User, AllRoleResponseData, SetRoleData } from './type'
// 枚举地址
enum API {
  //获取全部已有用户账号信息
  ALLUSER_URL = '/admin/acl/user/',
  // 添加一个新的用户账户
  ADDUSER_URL = '/admin/acl/user/save',
  // 修改一个用户账户
  UPDATEUSER_URL = '/admin/acl/user/update',
  // 获取全部角色，以及当前账号拥有的角色的接口
  ALLROLE_URL = '/admin/acl/user/toAssign/',
  // 给用户分配角色的接口
  SETROLE_URL = '/admin/acl/user/doAssignRole',
  // 删除一个用户账户
  DELETEUSER_URL = '/admin/acl/user/remove/',
  // 批量删除用户账户
  DELETEALLUSER_URL = '/admin/acl/user/batchRemove'

}

// 获取用户账户信息的接口
export const reqUserInfo = (page: number, limit: number, username: string) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)

// 添加用户|更新已有用户的接口
export const reqAddOrUpdateUser = (data: User) => {
  // 判断data是否有id
  if (data.id) { // 如果有id，说明是更新操作
    return request.put<any, any>(API.UPDATEUSER_URL, data)// 更新用户信息
  } else {  // 如果没有id，说明是添加操作
    return request.post<any, any>(API.ADDUSER_URL, data)// 添加用户信息
  }
}
// 获取全部角色以及包含当前用户已有的角色的接口
export const reqAllRole = (userId: number) => request.get<any, AllRoleResponseData>(API.ALLROLE_URL + userId)

// 给用户分配角色的接口
export const reqSetUserRole = (data: SetRoleData) => request.post<any, any>(API.SETROLE_URL, data)

// 删除某一个账号的信息的接口
export const reqRemoveUser = (userId: number) => request.delete<any, any>(API.DELETEUSER_URL + userId)

// 批量删除账号的接口
export const reqSelectUser = (idList: number[]) => request.delete<any, any>(API.DELETEALLUSER_URL, { data: idList })

