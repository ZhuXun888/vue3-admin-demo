<template>
  <div>
    <!-- 搜索栏 -->
    <el-card style="height: 80px; ">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
          <el-input v-model="keyword" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="default" :disabled="keyword?false:true" @click="search">搜索</el-button>
          <el-button type="info" size="default" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 展示列表 -->
    <el-card style="margin: 10px 0px;">
      <el-button type="primary" size="default" @click="addUser">添加用户</el-button>
      <el-button type="danger" size="default" :disabled="selectIdArr.length?false:true"
        @click="deleteSelectUser">批量删除</el-button>
      <!-- table展示用户信息 -->
      <el-table border style="margin-top: 10px;" :data="userArr" @selection-change="selectChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="#" type="index" align="center"></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column label="用户名字" align="center" prop="username" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户名称" align="center" prop="name" show-overflow-tooltip></el-table-column>
        <el-table-column label="用户角色" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
        <el-table-column label="更新时间" align="center" prop="updateTime"></el-table-column>
        <el-table-column label="操作" align="center" width="270px">
          <template #="{ row, $index }">
            <el-button type="primary" size="small" icon="User" @click="setRole(row)">分配角色</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateUser(row)">编辑</el-button>
            <el-popconfirm :title="`你确定要删除${row.name}?`" width="260px" @confirm="deleteUser(row.id)">
              <template #reference>
                <el-button type="primary" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5,7,9,12]"
      :background="true" layout="prev, pager, next, jumper,->, sizes,total " :total="total" @current-change="getHasUser"
      @size-change="handler" />
    <!-- 抽屉组件1：完成添加新的账号|更新已有的账号信息 -->
    <el-drawer v-model="drawer">
      <!-- 头部标题：利用插槽，文字内容应是动态的 -->
      <template #header>
        <h4>{{userParmas.id ? '编辑用户' : '添加用户'}}</h4>
      </template>
      <!-- 抽屉内容区域：利用插槽，展示表单内容 -->
      <template #default>
        <el-form :model="userParmas" :rules="rules" ref="formRef">
          <el-form-item label="用户姓名:" prop="username">
            <el-input placeholder="请输入用户名" v-model="userParmas.username"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称:" prop="name">
            <el-input placeholder="请输入用户昵称" v-model="userParmas.name"></el-input>
          </el-form-item>
          <el-form-item label="用户密码:" prop="password" v-if="!userParmas.id">
            <el-input placeholder="请输入用户密码" v-model="userParmas.password"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <!-- 抽屉底部区域：利用插槽，展示按钮内容 -->
      <template #footer>
        <div style="flex:auto">
          <el-button type="info" size="default" @click="cancel">取消</el-button>
          <el-button type="primary" size="default" @click="save">确定</el-button>
        </div>
      </template>
    </el-drawer>
    <!-- 抽屉组件2：完成用户某一个已有的账号进行职位分配 -->
    <el-drawer v-model="drawer1">
      <!-- 头部标题：利用插槽，文字内容应是动态的 -->
      <template #header>
        <h4>用户角色分配</h4>
      </template>
      <!-- 抽屉内容区域：利用插槽，展示表单内容 -->
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="userParmas.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
              @change="handleCheckAllChange">全选</el-checkbox>
            <!-- 显示角色的复选框们 -->
            <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
              <el-checkbox v-for="(item,index) in allRole" :label="item" :key="index">{{item.roleName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <!-- 抽屉底部区域：利用插槽，展示按钮内容 -->
      <template #footer>
        <div style="flex:auto">
          <el-button type="info" size="default" @click="drawer1=false">取消</el-button>
          <el-button type="primary" size="default" @click="saveUserRole">确定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, nextTick } from 'vue'
  import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqRemoveUser, reqSelectUser } from '@/api/acl/user'
  import type { UserResponseData, Records, User, AllRoleResponseData, AllRole, SetRoleData } from '@/api/acl/user/type'
  import { ElMessage } from 'element-plus'
  import useLayOutSetting from '@/store/modules/setting'
  // 默认页码
  const pageNo = ref < number > (1)
  // 一页展示几条数据
  const pageSize = ref < number > (5)
  // 存储用户总个数
  const total = ref < number > (0)
  // 存储全部用户的数组
  const userArr = ref < Records > ([])
  // 定义响应式数据：控制抽屉的显示和隐藏
  let drawer = ref < boolean > (false)
  // 定义响应式数据1：控制抽屉的显示和隐藏
  let drawer1 = ref < boolean > (false)
  // 收集用户信息的响应式数据
  let userParmas = reactive < User > ({
    username: '',
    name: '',
    password: '',
  })
  // 获取form实例
  let formRef = ref < any > ()
  // 存储全部角色的数据
  let allRole = ref < AllRole > ([])
  // 存储当前用户已有的角色
  let userRole = ref < AllRole > ([])
  // 定义响应式数据：收集用户输入进来的关键字
  let keyword = ref < string > ('')
  // 获取模板setting仓库
  let settingStore = useLayOutSetting()
  // 当组件挂载时，获取全部账号信息并展示
  onMounted(() => {
    getHasUser()
  })
  // 获取已有的账号信息的方法
  const getHasUser = async (pager = 1) => {
    // 收集当前页码
    pageNo.value = pager
    let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
    if (result.code == 200) {
      // 存储账号信息数据
      userArr.value = result.data.records
      // 存储总数据条数
      total.value = result.data.total
    } else {
      ElMessage.error('获取账号信息失败')
    }
  }
  // 分页器下拉菜单自定义事件的回调
  const handler = () => {
    getHasUser()
  }
  // 点击添加用户按钮的回调
  const addUser = () => {
    // 显示抽屉
    drawer.value = true
    // 每次收集数据之前，都先清空数据
    Object.assign(userParmas, {
      id: 0,
      username: '',
      name: '',
      password: '',
    })
    // 清除上一次的错误的表单校验信息
    nextTick(() => {
      formRef.value.clearValidate('username')
      formRef.value.clearValidate('name')
      formRef.value.clearValidate('password')
    })
  }
  // 点击编辑按钮的回调-------row:当前行的数据,即为当前的用户信息
  const updateUser = (row: User) => {
    // 显示抽屉
    drawer.value = true
    console.log(row)
    // 存储收集已有的账号信息
    Object.assign(userParmas, row)
    console.log(userParmas)
    // 清除上一次的错误的表单校验信息
    nextTick(() => {
      formRef.value.clearValidate('username')
      formRef.value.clearValidate('name')
    })
  }
  // 抽屉确定按钮的回调
  const save = async () => {
    // 点击确定按钮的时候，务必先保证表单校验通过才能发请求
    await formRef.value.validate()
    // 发请求--确定按钮：添加新的用户|更新已有的用户账号信息
    let result = await reqAddOrUpdateUser(userParmas)
    if (result.code == 200) {
      // 添加成功，关闭抽屉，并重新获取用户信息列表
      drawer.value = false
      // 添加成功，提示成功消息
      ElMessage.success(result.message)
      // 重新获取用户信息列表
      getHasUser(userParmas.id ? pageNo.value : 1)
      // 浏览器自动刷新一次
      // window.location.reload()//重新加载
    } else {
      // 添加失败，关闭抽屉，并重新获取用户信息列表
      drawer.value = false
      // 添加失败，提示失败消息
      ElMessage.error(result.message)
    }
  }
  // 抽屉取消按钮的回调
  const cancel = () => {
    // 关闭抽屉
    drawer.value = false
  }
  // 校验用户名的方法
  const validatorUserName = (rule: any, value: string, callback: any) => {
    // 用户名字|昵称，长度至少5位
    if (value.trim().length >= 5) {
      callback()//验证通过，放行
    } else {
      callback(new Error('用户名长度至少5位'))  //验证失败，返回错误信息
    }
  }
  // 校验昵称的方法
  const validatorName = (rule: any, value: string, callback: any) => {
    // 用户名字|昵称，长度至少5位
    if (value.trim().length >= 5) {
      callback()//验证通过，放行
    } else {
      callback(new Error('昵称长度至少5位'))  //验证失败，返回错误信息
    }
  }
  // 校验密码的方法
  const validatorPassword = (rule: any, value: string, callback: any) => {
    // 用户密码，长度至少6位
    if (value.trim().length >= 6) {
      callback()//验证通过，放行
    } else {
      callback(new Error('用户密码长度至少6位'))  //验证失败，返回错误信息
    }
  }
  // 表单校验规则的对象
  const rules = {
    // 用户名字
    username: [{ required: true, trigger: 'blur', validator: validatorUserName }],
    // 用户昵称
    name: [{ required: true, trigger: 'blur', validator: validatorName }],
    // 用户密码
    password: [{ required: true, trigger: 'blur', validator: validatorPassword }]
  }
  // 点击分配角色按钮的回调
  const setRole = async (row: User) => {
    // 显示抽屉
    drawer1.value = true
    // 存储当前用户信息
    Object.assign(userParmas, row)
    // 发请求：获取全部角色与当前用户已有角色的数据
    let result: any = await reqAllRole((userParmas.id as number))
    if (result.code === 200) {
      allRole.value = result.data.allRolesList// 存储全部角色
      userRole.value = result.data.assignRoles// 存储当前用户已有角色
      drawer1.value = true// 展示抽屉
    }
  }
  // 收集顶部全选复选框数据
  const checkAll = ref < boolean > (false)
  // 控制顶部全选复选框不确定的样式
  const isIndeterminate = ref < boolean > (true)
  // 顶部全选复选框change事件回调
  const handleCheckAllChange = (val: boolean) => {
    // val:true 全选  val:false 取消全选
    userRole.value = val ? allRole.value : []
    // 不确定样式取消
    isIndeterminate.value = false
  }
  // 底部全部复选框们的change事件回调--每勾上或取消一个复选框都会触发
  const handleCheckedCitiesChange = (value: string[]) => {
    // value:勾选上的复选框的value组成的数组
    // 勾选顶部复选框-----如果value的长度(勾选上的项目个数)等于allRole的长度，则chaeckAll=true，勾上全选复选框
    checkAll.value = value.length === allRole.value.length
    // 不确定样式-----如果value的长度(勾选上的项目个数)不等于于allRole的长度，则isIndeterminate=true，不确定样式显示
    isIndeterminate.value = value.length > 0 && value.length < allRole.value.length
  }
  // 分配角色的确定按钮的回调
  const saveUserRole = async () => {
    // 收集参数
    let data: SetRoleData = {
      userId: userParmas.id as number,
      roleIdList: userRole.value.map(item => item.id) as number[]
    }
    console.log(data)
    let result = await reqSetUserRole(data)
    if (result.code == 200) {
      // 提示成功
      ElMessage.success(result.message)
      // 关闭抽屉
      drawer1.value = false
      // 获取跟新完毕后的所有用户信息,更新完毕留在当前页
      getHasUser(pageNo.value)
    }
  }
  // 删除某一个用户：点击气泡确认框的确认按钮时，触发deleteUser方法，执行删除某一个用户
  const deleteUser = async (id: number) => {
    let result = await reqRemoveUser(id)
    if (result.code == 200) {
      // 提示成功
      ElMessage.success(result.message)
      // 获取跟新完毕后的所有用户信息,更新完毕留在当前页
      getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
  }

  // 准备一个数组，存储表格左侧复选框选中的所有用户的id，用于批量删除用户
  let selectIdArr = ref < any > ([])
  // table复选框勾选的时候会触发的事件
  const selectChange = (value: any) => {
    // 获取勾选的id数组
    selectIdArr.value = value
  }
  // 批量删除按钮的回调
  const deleteSelectUser = async () => {
    // 整理批量删除的参数
    let idList = selectIdArr.value = selectIdArr.value.map((item: any) => item.id)
    // 发请求，批量删除
    let result = await reqSelectUser(idList)
    if (result.code === 200) {
      ElMessage.success('批量删除成功')
      // 刷新列表
      getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
  }
  // 搜索按钮的回调
  const search = async () => {
    // 根据关键字，获取相应的用户列表
    getHasUser()
    // 搜索框置空：搜索完之后，清空搜索框
    keyword.value = ''
  }
  // 重置按钮的回调：相当于刷新-----------其实这里重新发一下请求就好了
  const reset = async () => {
    // 获取全部用户列表
    settingStore.refresh = !settingStore.refresh
  }
</script>

<style scoped>
  .form {
    display: flex;
    justify-content: space-between;
    /* 均等分 */
    align-items: center;
    /* 垂直居中 */
  }
</style>