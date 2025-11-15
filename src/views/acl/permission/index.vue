<template>
  <div>
    <el-table :data="PermissionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #="{row,$index}">
          <el-button @click="addPermisstion(row)" type="primary" size="small" icon="Plus" :disabled="row.level==4?true:false">{{
            row.level==3?'添加功能':'添加菜单' }}</el-button>
          <el-button @click="updatePermisstion(row)" type="primary" size="small" icon="Edit" :disabled="row.level==1?true:false">编辑</el-button>         
          <el-popconfirm :title="`你确定要删除${row.name}?`" width="260px" @confirm="removePermisstion(row.id)">
              <template #reference>
                <el-button  type="primary" size="small" icon="Delete" :disabled="row.level==1?true:false">删除</el-button>
              </template>
            </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框组件 -->
     <el-dialog :title="menuDta.id?'更新菜单':'添加菜单' " v-model="dialogVisible" width="35%">
      <!-- 表单组件 -->
      <el-form  label-width="80px">
        <el-form-item label="权限名称">
          <el-input v-model="menuDta.name" placeholder="请输入权限名称" ></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input v-model="menuDta.code"  placeholder="请输入权限值" ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="save" >确定</el-button>
      </template>
     </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted,reactive} from 'vue'
  import { reqAllPermission,reqAddOrUpdateMenu,reqRemoveMenu } from '@/api/acl/menu'
  import type { PermissionList, PermissionResponseData,Permission,MenuParams } from '@/api/acl/menu/type'
  import { ElMessage } from 'element-plus'
import { id } from 'element-plus/es/locales.mjs'
import { remove } from 'nprogress'
  // 存储菜单的数据
  const PermissionArr = ref < PermissionList > ([])
  // 控制对话框的显示与隐藏
  let dialogVisible = ref(false)
  // 发请求时携带的参数
  let menuDta=reactive<MenuParams>({
    level: 0,
    code: '',
    name: '',
    pid: 0,
  })
  // 组件挂载完毕时，获取权限列表
  onMounted(() => {
    getHasPermission()
  })
  // 获取菜单数据的方法
  const getHasPermission = async () => {
    const result: PermissionResponseData = await reqAllPermission()
    if (result.code === 200) {
      PermissionArr.value = result.data
    } else {
      ElMessage.error(result.message)
    }
  }
  // 添加按钮的回调
  const addPermisstion = (row: Permission) => {
    // 发请求之前，清除上一次的残留数据
    Object.assign(menuDta, {
      id: 0,
      level: 0,
    code: '',
    name: '',
    pid: 0,
    })
    // 显示对话框
    dialogVisible.value = true
    // 收集新增的菜单的level数值
    menuDta.level = row.level + 1
    // 给谁新增子菜单pid--父级id
    menuDta.pid = row.id
    
  }

  // 编辑按钮的回调
  const updatePermisstion = (row: Permission) => {
    // 显示对话框
    dialogVisible.value = true
    // 点击修改按钮：收集已有的菜单的数据进行更新 
    Object.assign(menuDta,row)
  }
  // 点击对话框中确定按钮的回调
  const save = async () => { 
    //发请求 ：新增子菜单|修改某一个已有的菜单数据
    let result: PermissionResponseData=await reqAddOrUpdateMenu(menuDta)
    if(result.code==200){
      // 提示成功
      ElMessage.success(result.message)
      // 关闭对话框
      dialogVisible.value=false
      // 重新获取菜单数据
      getHasPermission()
    }else{
      ElMessage.error(result.message)
    }
  }
  // 删除按钮的回调
  const removePermisstion = async (id: number) => { 
    let result = await reqRemoveMenu(id)
    if (result.code == 200) { 
      ElMessage.success(result.message)
      getHasPermission()
    } else {
      ElMessage.error(result.message)
    }
  }
</script>

<style scoped></style>