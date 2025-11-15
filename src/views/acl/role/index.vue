<template>
  <div>
    <!-- 搜索栏 -->
    <el-card style="height: 80px; ">
      <el-form :inline="true" class="form">
        <el-form-item label="角色名称">
          <el-input v-model="keyword" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="keyword?false:true" @click="search">搜索</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 列表展示 -->
    <el-card style="margin: 10px 0px;">
      <el-button type="primary" icon="Plus" @click="addRole">添加角色</el-button>
      <!-- 表格展示角色列表 -->
      <el-table border style="margin-top:10px" :data="allRole">
        <el-table-column label="#" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column label="角色名称" align="center" show-overflow-tooltip prop="roleName"></el-table-column>
        <el-table-column label="创建时间" align="center" show-overflow-tooltip prop="createTime"></el-table-column>
        <el-table-column label="更新时间" align="center" show-overflow-tooltip prop="updateTime"></el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <template #="{row,$index}">
            <el-button type="primary" size="small" icon="User" @click="setPermisstion">分配权限</el-button>
            <el-button type="primary" size="small" icon="Edit" @click="updateRole(row)">编辑</el-button>
            <el-popconfirm :title="`你确定要删除${row.name}?`" width="260px" @confirm="removeRole(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页器 -->
    <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5,7,9,12]"
      :background="true" layout="prev, pager, next, jumper,->, sizes,total " :total="total" @current-change="getHasRole"
      @size-change="sizeChange" />
    <!-- 添加角色与更新已有角色的结构：对话框 -->
    <el-dialog v-model="dialogVisite" :title="RoleParams.id ? '修改角色' : '添加角色'" width="500" :before-close="handleClose">
      <el-form :model="RoleParams" :rules="rules" ref="form">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="RoleParams.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="info" @click="dialogVisite = false">取消</el-button>
        <el-button type="primary" @click="save">确定</el-button>
      </template>
    </el-dialog>
    <!-- 抽屉组件 ：分配角色的菜单权限与按钮的权限-->
    <el-drawer v-model="drawer">
      <!-- 头部标题：利用插槽，文字内容应是动态的 -->
      <template #header>
        <h4>分配权限</h4>
      </template>
      <!-- 抽屉内容区域：利用插槽，展示表单内容 -->
      <template #default>
        <!-- 树形控件 -->
        <el-tree :data="menuArr" show-checkbox node-key="id" default-expand-all :default-checked-keys="  selectArr"
          :props="defaultProps" />

      </template>
      <!-- 抽屉底部区域：利用插槽，展示按钮内容 -->
      <template #footer>
        <div style="flex:auto">
          <el-button type="info" size="default" @click="drawer=false">取消</el-button>
          <el-button type="primary" size="default">确定</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, reactive, nextTick } from 'vue'
  import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqRemoveRole } from '@/api/acl/role'
  import type { RoleResponseData, Records, RoleData, MenuList } from '@/api/acl/role/type'
  import { ElMessage, roleTypes } from 'element-plus'
  import useLayOutSetting from '@/store/modules/setting'
  // 当前页码
  let pageNo = ref < number > (1)
  // 一页显示几条数据
  let pageSize = ref < number > (12)
  // 数据总条数
  let total = ref < number > (0)
  // 搜索角色关键字
  let keyword = ref < string > ('')
  // 存储已有的全部角色
  let allRole = ref < Records > ([])
  // 获取模板setting仓库
  let settingStore = useLayOutSetting()
  // 控制对话框的显示与隐藏
  let dialogVisite = ref < boolean > (false)
  // 收集新增岗位的数据
  let RoleParams = reactive < RoleData > ({
    roleName: '',
  })
  // 获取form组件实例
  let form = ref < any > ()
  // 控制抽屉的显示与隐藏的响应式数据
  let drawer = ref < boolean > (false)
  // 定义数组存储用户权限的数据
  let menuArr = ref < MenuList > ([])
  // 准备一个数组：存储勾选的节点的id(四级)
  let selectArr = ref < any > ([])
  // 定义树形控件的配置
  const defaultProps = {
    children: 'children',
    label: 'name'
  }
  // 组件挂载完毕时，发请求，获取全部角色数据并展示
  onMounted(() => {
    getHasRole()
  })
  // 获取全部角色信息的方法
  const getHasRole = async (pager = 1) => {
    // 修改当前页码
    pageNo.value = pager
    // 发请求，获取全部角色数据
    const result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
    if (result.code === 200) {
      total.value = result.data.total//存储总数
      allRole.value = result.data.records//存储全部角色数据
    }
  }
  // 点击选择分页器下拉菜单的回调
  const sizeChange = () => {
    getHasRole()
  }
  // 搜索按钮的回调
  const search = () => {
    // 再次发请求：本次是根据关键字检索并获取角色信息
    getHasRole()
    // 请求成功后，清空关键字==清空搜索框
    keyword.value = ''
  }
  // 重置按钮的回调：相当于刷新-----------其实这里重新发一下请求就好了
  const reset = async () => {
    // 获取全部用户列表
    settingStore.refresh = !settingStore.refresh
  }
  // 点击添加角色按钮的回调
  const addRole = () => {
    // 显示对话框
    dialogVisite.value = true
    // 每次，在收集数据和发请求之前，清空表单数据
    Object.assign(RoleParams, {
      roleName: '',
      id: 0,
    })
    // 同时，也要清空表单上一次的校验结果
    nextTick(() => {
      form.value.clearValidate('roleName')
    })
  }
  // 点击编辑按钮的回调
  const updateRole = (row: RoleData) => {
    // 显示对话框
    dialogVisite.value = true
    // 同时，也要清空表单上一次的校验结果
    nextTick(() => {
      form.value.clearValidate('roleName')
    })
    // 存储当前的角色--带有id的
    Object.assign(RoleParams, row)

  }
  // 自定义校验规则的回调：roleName字段表单校验方法
  const validatorRoleName = (rule: any, value: string, callback: any) => {
    if (value.trim().length < 2) {
      callback(new Error('角色名称不能少于两个字符'))
    } else {
      callback()
    }
  }
  // 角色相关的校验规则
  const rules = {
    roleName: [
      { required: true, trigger: 'blur', validator: validatorRoleName },
    ],
  }
  // 对话框点击确定按钮的回调
  const save = async () => {
    // 表单校验结果，结果通过，才能发请求
    await form.value.validate()
    // 发请求：添加角色|更新角色
    let result = await reqAddOrUpdateRole(RoleParams)
    if (result.code === 200) {
      // 提示信息
      ElMessage.success(result.message)
      // 关闭对话框
      dialogVisite.value = false
      // 重新获取全部角色信息
      getHasRole(RoleParams.id ? pageNo.value : 1)
    } else {
      ElMessage.error('添加角色失败')
    }
  }
  // 点击分配权限按钮的回调
  const setPermisstion = async (row: RoleData) => {
    // 显示抽屉
    drawer.value = true
    // 发请求：获取当前角色的权限信息
    let result = await reqAllMenuList(RoleParams.id as number)
    if (result.code === 200) {
      // 存储菜单数据
      menuArr.value = result.data
      filterSelectArr(menuArr.value, [])
    }
  }
  const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
      if (item.select) {
        initArr.push(item.id)
      }
    })
  }
  // 点击删除的气泡确认框的确定按钮的回调
  const removeRole = async (id: number) => {
    let result = await reqRemoveRole(id)
    if (result.code == 200) {
      ElMessage.success('删除角色成功')
      getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
      ElMessage.error('删除角色失败')
    }
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