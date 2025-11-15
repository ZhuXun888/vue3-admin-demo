// 从vue-router中导入RouteRecordRaw类型，用于描述路由规则的类型
// RouteRecordRaw是vue-router内置的路由配置类型，规定了一个路由规则应该包含哪些属性（如path、component、children等）
import type { RouteRecordRaw } from 'vue-router'

// 定义用户相关的小仓库（Pinia仓库）的state数据类型
// 这里使用TypeScript的接口（interface）来约束state的结构，确保数据类型一致
export interface UserState {
  // token：用户登录后的唯一标识，用于身份验证-----类型为 string 或 null（未登录时为null，登录后为字符串token）
  token: string | null;

  // // userInfo：存储用户的基本信息（如用户名、头像、角色等）-----这里暂时定义为object类型，实际项目中可以更具体（如{name: string; avatar: string; roles: string[]}）
  // userInfo: object;

  // menuRoutes：存储当前用户有权访问的路由规则列表，用于动态生成导航菜单-----类型为RouteRecordRaw[]（路由规则数组），每个元素都符合vue-router的路由配置规范
  menuRoutes: RouteRecordRaw[];

  //username:用户名
  username: string;

  // avatar:用户头像
  avatar: string;
}




import type { CategoryItem } from '@/api/product/attr/type'
// 定义分类仓库state对象的ts类型
export interface CategoryState {
  c1Arr: CategoryItem[]
  c1Id: number | string
  c2Arr: CategoryItem[]
  c2Id: number | string
  c3Arr: CategoryItem[]
  c3Id: number | string
}