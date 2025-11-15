<template>
  <div>
    <!-- 卡片组件 -->
    <el-card class="box-card">
      <!-- 卡片顶部的添加品牌按钮 -->
      <el-button type="primary" size="default" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <!-- 表格组件 ：用于展示已有的品牌数据-->
      <el-table style="margin: 10px 0px " border :data="tradeMarkArr">
        <!-- <el-table>:代表的是一个表格组件（相当于表格的容器）   <el-table-column>:代表一个列组件   这里两个必须搭配使用 ，就像ur-li-->
        <!-- 
              table
                 ---border:可以设置表格纵向是否有边框
              table-column
                 ---label:可以是设置某一列的标题
                 ---width:设置列的宽度
                 ---align:设置列的对齐方式
        <-->
        <el-table-column label="序号" width="200px" align="center" type="index"> </el-table-column>
        <el-table-column label="品牌名称">
          <!-- 注意：这里可以用prop和作用域插槽两种方式来展示数据（什么时候用什么方式呢）
                    prop:展示数据用的是div标签包裹，传过来的如果是图片路径都会转化成字符串显示
                    作用域插槽:可以自定义标签内容，和标签结构，根据业务需求
        -->
          <!-- 作用域插槽 -->
          <template #="{ row, $index }">
            <!-- row：是每个品牌的数据对象，对象中包含当前行的所有数据 -->
            <pre style="color: darkblue;">{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌logo">
          <template #="{ row, $index }">
            <!-- row：是每个品牌的数据对象，对象中包含当前行的所有数据 -->
            <img :src="row.logoUrl" alt="图片加载失败" width="120px" height="100px">
          </template>
        </el-table-column>
        <el-table-column label=" 品牌操作" align="center" width="200px">
          <template #="{ row, $index }">
            <!-- row：是每个品牌的数据对象，对象中包含当前行的所有数据 -->
            <el-button type="primary" size="small" icon="Edit" @click="$event => updateTrademark(row)">修改</el-button>
            <el-popconfirm :title="`确定要删除${row.tmName} ?`" width="200px" icon="Delete"
              @confirm="removeTrademark(row.id)">
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"
                  @click="$event => deleteTrademark(row)">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column> 
      </el-table>
      <!-- 分页器组件 ：用于分页功能 
        pagination:
           v-model:current-page:设置分页器当前的页码
           v-model:page-size:设置每一页的展示数据条数
           :page-sizes:每页显示个数选择器的选项设置（下拉菜单数据的设置）
           :size="size"：设置分页器的大小
           :disabled="true"：设置分页器显示但禁用
           :background="background"：设置分页器的背景颜色
           layout="total, sizes, prev, pager, next,(->,) jumper"：可以设置分页器六个子组件布局调整,其中(->,)可以把在箭头右边的子组件顶到最右侧
           total:设置分页器总页数
    -->
      <div class="demo-pagination-block">
        <!-- 页码发生变化时,触发current-change事件,执行getHasTradeMark()方法，获取品牌列表    
        至于为什么不用再获取跳转的新页码，是因为v-model:current-page="pageNo"已经双向绑定当前页码，
        当当前页码发生改变，绑定的数据也会发生改变，从而触发getHasTradeMark方法，重新获取数据，所以不需要重新获取新页码也可以获取新数据 

        下拉菜单发生变化时，触发size-change事件，执行getHasTradeMark方法，重新获取数据
          v-model:page-size="limit"：已经双向绑定当前页显示几条数据的设置,
          当下拉菜单改变，绑定的数据也会发生改变，会触发getHasTradeMark方法，重新获取数据，所以不需要重新获取新页码也可以获取新数据 
          

      -->
        <el-pagination @size-change="sizeChange" @current-change="getHasTradeMark" v-model:current-page="pageNo"
          v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
          layout=" prev, pager, next, jumper,->,sizes,total" :total=total />
      </div>
    </el-card>
    <!-- 对话框组件：在添加品牌与修改已有品牌的业务时候使用的结构 -->
    <!-- v-model：控制对话框的显示和隐藏  true:显示  false:隐藏 
        title：设置对话框的标题
        
        -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="600">
      <!-- 表单组件： el-form: 表单组件(大容器)   el-from-item: 表单项组件(小容器) -->
      <el-form :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" prop="tmName">
          <!-- prop:是表单项的验证属性，必须和表单数据对象中的属性名一致  用于绑定校验规则中的属性tmName  -->
          <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌logo" prop="logoUrl">
          <!-- 上传组件 ：el-upload:上传组件(大容器) -->
          <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
            :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <!-- 这里img和icon的展示只能二选一 -->
            <el-icon v-else class="avatar-uploader-icon">
              <Plus />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽:footer -->
      <template #footer>
        <el-button type="primary" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqHasTradeMark, reqAddOrUpdateTradeMark, reqDeleteTradeMark } from '@/api/product/trademark'
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
// 当前页码--pageNo
const pageNo = ref<number>(1)
// 每一页展示多少条数据
let limit = ref<number>(3)
// 存储已有品牌总数
let total = ref<number>(0)
// 存储已有品牌列表数据--tradeMarkArr--用数组存储
let tradeMarkArr = ref<Records>([])
// 控制对话框的显示和隐藏的变量
let dialogFormVisible = ref<boolean>(false)
// 定义收集新增品牌表单的数据对象
let trademarkParams = reactive<TradeMark>({
  // id: undefined,------id是可选的，因为，已有的品牌，id是存在的，但是新增的，id是不存在的，在定义数据类型时，id是可选的
  tmName: '',
  logoUrl: ''
})
// 获取el-form组件实例
let formRef = ref()
// 获取品牌列表数据--封装成一个函数，需要用的时候直接调用，复用性强，如：组件挂载完毕需调用，点击页码调转需调用
const getHasTradeMark = async (pager = 1) => {//pager:当前页码,如果传进来的参数是5，那么5会覆盖1=>pager=5
  pageNo.value = pager// 设置当前页码为1，每次调用getHasTradeMark()方法时，都会重置当前页码为1
  let result: TradeMarkResponseData = await reqHasTradeMark(pageNo.value, limit.value)
  if (result.code === 200) {
    // 如果请求成功，就去存储一下有多少条数据（已有品牌总个数），方便分页器使用
    total.value = result.data.total
    // 存储已有品牌列表数据--用数组存储
    tradeMarkArr.value = result.data.records
  }
  //测试代码
  // try {
  //   const res = await reqHasTradeMark(pageNo.value, limit.value)
  //   console.log('接口返回数据：', res) // 关键：打印结果
  // } catch (err) {
  //   console.error('请求失败：', err)
  // }
}
//组件挂载完毕钩子--发一次请求，获取第一页、一页三个已有品牌数据
onMounted(() => {
  getHasTradeMark()
})

// // 分页器当前页码发生变化的时候会触发
// // 对于当前页码发生变化自定义事件，组件pagination父组件回传了数据（当前页码），但是当前页码已设置双向绑定，所以此举多此一举，所以促发事件时，可以不用在这个函数，直接执行getHasTradeMark()方法，获取数据
// const changePageNo = () => {
//   //当前页码发生变化的时候再次发请求获取对应已有品牌数据展示
//   getHasTradeMark()
// }

//当下拉菜单发生变化的时候触发方法sizeChange()
//这个自定义事件，分页器组件会将下拉菜单选中数据返回
const sizeChange = () => {
  // pageNo.value=1  //当前每一页的展示数量发生变化的时候，当前页码归1
  getHasTradeMark()
}

// 添加品牌按钮点击事件
const addTrademark = () => {
  dialogFormVisible.value = true//对话框显示
  // 在每次收集数据之前，清空表单数据-----点击添加按钮的时候，表单清空上一次的数据，最好在这里清空，这样后面就不用在取消和确定的回调函数里写了，省了一次冗余代码
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  trademarkParams.id = undefined

  //在每次收集数据之前，清除掉上一次的表单校验结果--//clearValidate() 清理对应表单项的校验结果--el-form组件的内置方法 
  // 第一种写法：问号法   
  /*  为什么要用？ 因为第一次点击添加按钮的时候，表单是新的，没有残余数据，value为undefined 
      如果value有值，则执行clearValidate()方法，如果value为undefined，则不执行clearValidate()方法 */
  // formRef.value?.clearValidate('tmName')
  // formRef.value?.clearValidate('logoUrl')

  // 第二种写法：vue全局方法：nextTick()方法：等待组件更新完成后，再执行回调函数--它告诉 Vue："请在下一次 DOM 更新周期之后执行我交给你的任务"。
  nextTick(() => {
    // 清理表单数据校验结果
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
  })
}
// 修改品牌按钮点击事件
const updateTrademark = (row: TradeMark) => {
  // 在每次收集数据之前，清空上一次校验规则错误提示信息
  nextTick(() => {        // 第二种写法：vue全局方法：nextTick()方法：等待组件更新完成后，再执行回调函数--它告诉 Vue："请在下一次 DOM 更新周期之后执行我交给你的任务"。
    // 清理表单数据校验结果
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
  })
  dialogFormVisible.value = true //对话框显示
  console.log('点击修改按钮，当前点击的行数据为：', row)

  //ES6语法：合并对象--assign(target, source1, source2, ...)
  //第一个参数：target目标对象（会被修改）
  //第二个参数：source1, source2, ...源对象（不会被修改）--可以有多个
  Object.assign(trademarkParams, row)//等同于下面的三行赋值代码

  // trademarkParams.id = row.id//id是标志，有id->修改,无id->添加
  // // 在对话框展示要求改的品牌数据
  // trademarkParams.tmName = row.tmName
  // trademarkParams.logoUrl = row.logoUrl
}
// 删除品牌按钮点击事件
const deleteTrademark = (row: TradeMark) => {
  // dialogDeleteVisible.value = true
  // Object.assign(trademarkParams, row)
}
// 对话框底部取消按钮点击事件
const cancel = () => {
  // 关闭对话框
  dialogFormVisible.value = false
}
// 对话框底部确定按钮点击事件
const confirm = async () => {
  // 1. 验证表单数据-----在发请求之前，要对整个表单进行验证
  // await ,调用这个方法进行全部表单的校验，如果校验全部通过，再执行后面的语法，发请求等等...
  await formRef.value.validate()  //validate() 验证整个表单数据--el-form组件的内置方法
  let result = await reqAddOrUpdateTradeMark(trademarkParams)//result 请求返回的响应数据对象
  // 判断添加是否成功
  if (result.code === 200) { // 添加成功
    // 1. 关闭对话框
    dialogFormVisible.value = false
    // 2. 提示添加成功
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改成功' : '添加成功'
    })
    // 3. 刷新数据,再次发请求获取已有全部的品牌数据
    getHasTradeMark(trademarkParams.id ? pageNo.value : 1)//判断有没有id，如果有id，证明执行的修改，页码留在当前页，如果没有id,执行的添加，页码跳转到第一页
  } else {//添加失败
    // 1. 提示添加失败
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改失败' : '添加失败'
    }),
      // 2. 关闭对话框
      dialogFormVisible.value = false
  }
}
// 上传图片组件->上传图片之前触发的钩子函数beforeAvatarUpload(),上传文件之前可以约束文件类型和大小
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {//在触发钩子的时候，会把用户上传的文件封装成一个对象（rawFile）作为参数传递给钩子函数的
  // 验证文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(rawFile.type)) {  //includes() - 检查数组是否包含某个元素 ，
    ElMessage.error('图片格式必须是 JPG/PNG/GIF!')
    return false
  }

  // 验证文件大小 (4MB)
  const isLt4M = rawFile.size / 1024 / 1024 < 4
  if (!isLt4M) {
    ElMessage.error('图片大小不能超过 4MB!')
    return false
  }

  return true
}
// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {  //['onSuccess']：表示从 UploadProps 接口中提取 onSuccess 这个属性的类型。
  // response 就是当前这次上传图片post请求，Mock接口返回的数据 { code: 200, data: '图片URL', ... }
  if (response.code === 200) {
    trademarkParams.logoUrl = response.data
    // 图片上传成功，清除掉对应图片校验结果
    formRef.value.clearValidate('logoUrl')//clearValidate() 清理对应表单项的校验结果--el-form组件的内置方法
    ElMessage.success('图片上传成功')
  } else {
    ElMessage.error('图片上传失败')
  }
}
// 品牌自定义校验规则函数-品牌名称-----执行方法是会给函数注入三个参数  rule: 当前规则对象  value: 当前表单项的值  callback: 放行函数（参数名可自定义）
const validatortmName = (rule: any, value: string, callback: any) => {
  //当表单元素触发blur时，会触发此函数
  // 自定义校验规则
  //1. 先检查必填
  if (!value || value.trim().length === 0) {
    callback(new Error('请输入品牌名称'))
    return
  }
  //2. 再检查长度
  if (value.trim().length < 2 || value.trim().length > 10) {
    callback(new Error('品牌名称长度必须在2到10个字符之间'))
    return
  }
  callback() // 验证通过
}
// 品牌logo图片的自定义校验规则函数
const validatorLogoUrl = (rule: any, value: string, callback: any) => {  //这里value是图片的地址
  //当表单元素触发blur时，会触发此函数
  // 自定义校验规则
  if (value) { //value有值，证明上传了图片
    callback()//验证通过，放行
  } else {
    callback(new Error('请上传品牌LOGO'))//验证失败，返回错误信息
  }
}
//表单校验规则对象
const rules = {
  tmName: [//一个对象就是一条规则，十个对象就是十条规则，放在一个数组里
    // required: 这个字段务必校验，表单项前面画出来五角星   // message: 错误提示信息
    // trigger: 代表触发校验规则的时机 'blur' 表单失去焦点的时候触发校验，'change' 表单数据改变的时候触发校验
    // validator: 自定义校验规则， validatortmName--自定义规则函数
    { required: true, trigger: 'blur', validator: validatortmName },
  ],
  logoUrl: [
    { required: true, validator: validatorLogoUrl }
  ]
}

// 气泡确认框确定按钮的回调
const removeTrademark = async (id: number) => {
  // 点击确定按钮删除已有品牌的请求
  const result = await reqDeleteTradeMark(id)
  // 判断请求是否成功
  if (result.code === 200) {
    // 1. 提示删除成功
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    // 2. 刷新数据,再次发请求获取已有全部的品牌数据
    getHasTradeMark(tradeMarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

:deep(.el-table .el-table__cell .cell) {
  display: flex;
  justify-content: center;
  gap: 8px;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>