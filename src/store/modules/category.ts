//商品分类全局组件的小仓库
import { defineStore } from 'pinia'
import { reqC1, reqC2, reqC3, reqAttr } from '@/api/product/attr'
import type { CategoryResponseData, AttrResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './types/type'
let useCategoryStore = defineStore('Category', {
  state: (): CategoryState => {
    return {
      // 存储一级分类的数据数组
      c1Arr: [],
      // 存储一级分类的数据id
      c1Id: '',
      // 存储一级分类下的二级分类数据数组
      c2Arr: [],
      // 存储一级分类下的二级分类数据id
      c2Id: '',
      // 存储一级分类下的三级分类数据数组
      c3Arr: [],
      // 存储一级分类下的三级分类数据id
      c3Id: '',
      // 存储根据一二三级分类数据id获取的属性数据数组
      // attrList: <AttrResponseData>[]
    }
  },
  actions: {
    //获取一级分类列表方法
    async getC1() {
      let result: CategoryResponseData = await reqC1()
      console.log(result);
      if (result.code == 200) {
        this.c1Arr = result.data
      }
    },
    //获取二级分类列表方法
    async getC2() {
      //获取一级分类下的二级分类数据
      let result: CategoryResponseData = await reqC2(this.c1Id)
      if (result.code == 200) {
        this.c2Arr = result.data
      }
    },
    //获取三级分类列表方法
    async getC3() {
      let result: CategoryResponseData = await reqC3(this.c2Id)
      if (result.code == 200) {
        this.c3Arr = result.data
      }
    },
    // 获取属性方法
    async getAttr() {
      let result: AttrResponseData = await reqAttr(this.c1Id, this.c2Id, this.c3Id)
      console.log(result);
    }
  },
  getters: {}
})
export default useCategoryStore