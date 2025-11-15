// 模拟一二三级分类数据
const categoryList = {
  // 一级分类数据
  c1: [
    { id: 1, name: '手机数码' },
    { id: 2, name: '电脑办公' },
    { id: 3, name: '图书画册' },
    { id: 4, name: '母婴用品' },
    { id: 5, name: '个护清洁' },
    { id: 6, name: '家用电器' },
  ],
  // 二级分类数据
  c2: {
    1: [ // 手机数码下的二级分类
      { id: 101, name: '手机通讯', parentId: 1 },
      { id: 102, name: '手机配件', parentId: 1 },
      { id: 103, name: '摄影摄像', parentId: 1 },
      { id: 104, name: '数码配件', parentId: 1 },
      { id: 105, name: '智能设备', parentId: 1 }
    ],
    2: [ // 电脑办公下的二级分类
      { id: 201, name: '电脑整机', parentId: 2 },
      { id: 202, name: '电脑配件', parentId: 2 },
      { id: 203, name: '外设产品', parentId: 2 },
      { id: 204, name: '办公设备', parentId: 2 },
      { id: 205, name: '文具用品', parentId: 2 }
    ],
    3: [ // 图书画册下的二级分类
      { id: 301, name: '文学小说', parentId: 3 },
      { id: 302, name: '经济管理', parentId: 3 },
      { id: 303, name: '教育考试', parentId: 3 },
      { id: 304, name: '艺术设计', parentId: 3 },
      { id: 305, name: '少儿读物', parentId: 3 }
    ],
    4: [ // 母婴用品下的二级分类
      { id: 401, name: '奶粉辅食', parentId: 4 },
      { id: 402, name: '尿裤湿巾', parentId: 4 },
      { id: 403, name: '童装童鞋', parentId: 4 },
      { id: 404, name: '玩具乐器', parentId: 4 },
      { id: 405, name: '孕产用品', parentId: 4 }
    ],
    5: [ // 个护清洁下的二级分类
      { id: 501, name: '面部护理', parentId: 5 },
      { id: 502, name: '身体护理', parentId: 5 },
      { id: 503, name: '口腔护理', parentId: 5 },
      { id: 504, name: '洗发护发', parentId: 5 },
      { id: 505, name: '家居清洁', parentId: 5 }
    ],
    6: [ // 家用电器下的二级分类
      { id: 601, name: '大家电', parentId: 6 },
      { id: 602, name: '厨房电器', parentId: 6 },
      { id: 603, name: '生活电器', parentId: 6 },
      { id: 604, name: '个护健康', parentId: 6 },
      { id: 605, name: '影音电器', parentId: 6 }
    ]
  },
  // 三级分类数据
  c3: {
    101: [ // 手机通讯下的三级分类
      { id: 1001, name: '智能手机', parentId: 101 },
      { id: 1002, name: '老人手机', parentId: 101 },
      { id: 1003, name: '对讲机', parentId: 101 }
    ],
    102: [ // 手机配件下的三级分类
      { id: 1004, name: '手机壳', parentId: 102 },
      { id: 1005, name: '贴膜', parentId: 102 },
      { id: 1006, name: '数据线', parentId: 102 },
      { id: 1007, name: '充电器', parentId: 102 }
    ],
    103: [ // 摄影摄像下的三级分类
      { id: 1008, name: '单反相机', parentId: 103 },
      { id: 1009, name: '微单相机', parentId: 103 },
      { id: 1010, name: '摄像机', parentId: 103 },
      { id: 1011, name: '镜头', parentId: 103 }
    ],
    201: [ // 电脑整机下的三级分类
      { id: 2001, name: '笔记本', parentId: 201 },
      { id: 2002, name: '台式机', parentId: 201 },
      { id: 2003, name: '平板电脑', parentId: 201 },
      { id: 2004, name: '服务器', parentId: 201 }
    ],
    202: [ // 电脑配件下的三级分类
      { id: 2005, name: 'CPU', parentId: 202 },
      { id: 2006, name: '内存', parentId: 202 },
      { id: 2007, name: '硬盘', parentId: 202 },
      { id: 2008, name: '显卡', parentId: 202 }
    ],
    301: [ // 文学小说下的三级分类
      { id: 3001, name: '中国文学', parentId: 301 },
      { id: 3002, name: '外国文学', parentId: 301 },
      { id: 3003, name: '网络小说', parentId: 301 }
    ],
    401: [ // 奶粉辅食下的三级分类
      { id: 4001, name: '婴儿奶粉', parentId: 401 },
      { id: 4002, name: '成人奶粉', parentId: 401 },
      { id: 4003, name: '米粉米糊', parentId: 401 }
    ],
    501: [ // 面部护理下的三级分类
      { id: 5001, name: '洁面', parentId: 501 },
      { id: 5002, name: '爽肤水', parentId: 501 },
      { id: 5003, name: '精华', parentId: 501 },
      { id: 5004, name: '面霜', parentId: 501 }
    ],
    601: [ // 大家电下的三级分类
      { id: 6001, name: '空调', parentId: 601 },
      { id: 6002, name: '冰箱', parentId: 601 },
      { id: 6003, name: '洗衣机', parentId: 601 },
      { id: 6004, name: '电视机', parentId: 601 }
    ]
  }
};

// 模拟平台属性数据
const attrList = {
  // 一级分类对应的平台属性
  1: [ // 手机数码
    {
      id: 1,
      attrName: '品牌',
      categoryId: 1,
      categoryLevel: 1,
      attrValueList: [
        { id: 1, valueName: '苹果', attrId: 1 },
        { id: 2, valueName: '华为', attrId: 1 },
        { id: 3, valueName: '小米', attrId: 1 },
        { id: 4, valueName: 'OPPO', attrId: 1 },
        { id: 5, valueName: 'VIVO', attrId: 1 }
      ]
    },
    {
      id: 2,
      attrName: '网络',
      categoryId: 1,
      categoryLevel: 1,
      attrValueList: [
        { id: 6, valueName: '5G', attrId: 2 },
        { id: 7, valueName: '4G', attrId: 2 },
        { id: 8, valueName: '3G', attrId: 2 }
      ]
    }
  ],
  2: [ // 电脑办公
    {
      id: 3,
      attrName: '品牌',
      categoryId: 2,
      categoryLevel: 1,
      attrValueList: [
        { id: 9, valueName: '联想', attrId: 3 },
        { id: 10, valueName: '戴尔', attrId: 3 },
        { id: 11, valueName: '惠普', attrId: 3 },
        { id: 12, valueName: '苹果', attrId: 3 }
      ]
    },
    {
      id: 4,
      attrName: '处理器',
      categoryId: 2,
      categoryLevel: 1,
      attrValueList: [
        { id: 13, valueName: 'Intel i5', attrId: 4 },
        { id: 14, valueName: 'Intel i7', attrId: 4 },
        { id: 15, valueName: 'AMD Ryzen 5', attrId: 4 },
        { id: 16, valueName: 'AMD Ryzen 7', attrId: 4 }
      ]
    }
  ],
  3: [ // 图书画册
    {
      id: 5,
      attrName: '出版社',
      categoryId: 3,
      categoryLevel: 1,
      attrValueList: [
        { id: 17, valueName: '人民文学出版社', attrId: 5 },
        { id: 18, valueName: '商务印书馆', attrId: 5 },
        { id: 19, valueName: '中华书局', attrId: 5 }
      ]
    },
    {
      id: 6,
      attrName: '装帧',
      categoryId: 3,
      categoryLevel: 1,
      attrValueList: [
        { id: 20, valueName: '平装', attrId: 6 },
        { id: 21, valueName: '精装', attrId: 6 },
        { id: 22, valueName: '线装', attrId: 6 }
      ]
    }
  ],

  // 二级分类对应的平台属性
  101: [ // 手机通讯
    {
      id: 7,
      attrName: '运行内存',
      categoryId: 101,
      categoryLevel: 2,
      attrValueList: [
        { id: 23, valueName: '8GB', attrId: 7 },
        { id: 24, valueName: '12GB', attrId: 7 },
        { id: 25, valueName: '16GB', attrId: 7 }
      ]
    },
    {
      id: 8,
      attrName: '存储容量',
      categoryId: 101,
      categoryLevel: 2,
      attrValueList: [
        { id: 26, valueName: '128GB', attrId: 8 },
        { id: 27, valueName: '256GB', attrId: 8 },
        { id: 28, valueName: '512GB', attrId: 8 },
        { id: 29, valueName: '1TB', attrId: 8 }
      ]
    }
  ],
  102: [ // 手机配件
    {
      id: 9,
      attrName: '材质',
      categoryId: 102,
      categoryLevel: 2,
      attrValueList: [
        { id: 30, valueName: '硅胶', attrId: 9 },
        { id: 31, valueName: 'PC', attrId: 9 },
        { id: 32, valueName: '金属', attrId: 9 }
      ]
    }
  ],
  201: [ // 电脑整机
    {
      id: 10,
      attrName: '屏幕尺寸',
      categoryId: 201,
      categoryLevel: 2,
      attrValueList: [
        { id: 33, valueName: '13英寸', attrId: 10 },
        { id: 34, valueName: '14英寸', attrId: 10 },
        { id: 35, valueName: '15.6英寸', attrId: 10 },
        { id: 36, valueName: '16英寸', attrId: 10 }
      ]
    }
  ],

  // 三级分类对应的平台属性
  1001: [ // 智能手机
    {
      id: 11,
      attrName: '摄像头像素',
      categoryId: 1001,
      categoryLevel: 3,
      attrValueList: [
        { id: 37, valueName: '4800万', attrId: 11 },
        { id: 38, valueName: '6400万', attrId: 11 },
        { id: 39, valueName: '1亿', attrId: 11 }
      ]
    },
    {
      id: 12,
      attrName: '电池容量',
      categoryId: 1001,
      categoryLevel: 3,
      attrValueList: [
        { id: 40, valueName: '4000mAh', attrId: 12 },
        { id: 41, valueName: '5000mAh', attrId: 12 },
        { id: 42, valueName: '6000mAh', attrId: 12 }
      ]
    }
  ],
  1004: [ // 手机壳
    {
      id: 13,
      attrName: '适用机型',
      categoryId: 1004,
      categoryLevel: 3,
      attrValueList: [
        { id: 43, valueName: 'iPhone 15', attrId: 13 },
        { id: 44, valueName: '华为 Mate 60', attrId: 13 },
        { id: 45, valueName: '小米 14', attrId: 13 }
      ]
    }
  ],
  2001: [ // 笔记本
    {
      id: 14,
      attrName: '显卡类型',
      categoryId: 2001,
      categoryLevel: 3,
      attrValueList: [
        { id: 46, valueName: '集成显卡', attrId: 14 },
        { id: 47, valueName: '独立显卡', attrId: 14 }
      ]
    }
  ],
  3001: [ // 中国文学
    {
      id: 15,
      attrName: '作者',
      categoryId: 3001,
      categoryLevel: 3,
      attrValueList: [
        { id: 48, valueName: '鲁迅', attrId: 15 },
        { id: 49, valueName: '茅盾', attrId: 15 },
        { id: 50, valueName: '巴金', attrId: 15 }
      ]
    }
  ]
}

// 导出Mock配置数组
export default [
  // 获取一级分类
  {
    url: '/admin/product/getCategory1',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: categoryList.c1,//响应数据 ，一级分类列表数组
        ok: true
      }
    }
  },
  // 根据一级分类ID获取二级分类
  {
    url: '/admin/product/getCategory2/:category1Id',
    method: 'get',
    response: (request: any) => {  //request 请求对象，包含URL、参数等信息
      // 从请求URL中提取category1Id参数  // 1、request.url.split('/') 将URL按'/'分割成数组  2、.pop() 获取数组最后一个元素，即请求路径中的category1Id
      const category1Id = Number(request.url.split('/').pop())
      // 从categoryList.c2对象中根据category1Id获取对应的二级分类数据
      const data = categoryList.c2[category1Id as keyof typeof categoryList.c2] || []// 如果找不到对应的数据，返回空数组避免undefined
      //typeof 是 TypeScript 的类型操作符，用于获取 categoryList.c2 的类型==
      // keyof 是 TypeScript 的关键字，用于获取某个类型的所有键名组成的联合类型，如键有'a','b',则建名组成的联合类型是'a' | 'b'（表示只能是 'a' 或 'b' 这两个字符串）
      //as 是类型断言，强制把 category1Id 的类型 “指定” 为 c2 的键名类型（即 keyof typeof categoryList.c2）。
      return {
        code: 200,
        message: 'success',
        data,
        ok: true
      }
    }
  },
  // 根据二级分类ID获取三级分类
  {
    url: '/admin/product/getCategory3/:category2Id',
    method: 'get',
    response: (request: any) => {
      // 从URL中提取category2Id参数
      const category2Id = Number(request.url.split('/').pop())
      // 从categoryList.c3对象中根据category2Id获取对应的三级分类数据
      const data = categoryList.c3[category2Id as keyof typeof categoryList.c3] || []
      return {
        code: 200,
        message: 'success',
        data,
        ok: true
      }
    }
  },
  // 根据分类ID获取平台属性
  {
    // 包含三个路径参数的URL：category1Id, category2Id, category3Id
    url: '/admin/product/attrInfoList/:category1Id/:category2Id/:category3Id',
    method: 'get',
    response: (request: any) => {
      // request.url.split('/')将请求对象里的URL属性值 按'/'分割成>>数组，便于提取路径参数
      const urlParts = request.url.split('/')
      const category1Id = Number(urlParts[urlParts.length - 3])//获取数组中倒数第 3 个元素（数组长度减 3 的索引）--一级分类id
      const category2Id = Number(urlParts[urlParts.length - 2])
      const category3Id = Number(urlParts[urlParts.length - 1])

      // 优先获取三级分类的属性，如果没有则获取二级分类的属性，最后获取一级分类的属性
      let data = attrList[category3Id as keyof typeof attrList] ||
        attrList[category2Id as keyof typeof attrList] ||
        attrList[category1Id as keyof typeof attrList] || []

      return {
        code: 200,
        message: 'success',
        data,
        ok: true
      }
    }
  },
  // 添加或更新平台属性
  {
    url: '/admin/product/saveAttrInfo',
    method: 'post',
    response: ({ body }: any) => {  // {body}请求体数据，包含属性信息--这里直接结构出来了，因为传递的参数是params,我们需要的是params.body,这里直接结构出来更方便
      const { id, attrName, categoryId, categoryLevel, attrValueList } = body// 从请求体中解构需要的字段
      // 判断是更新操作还是新增操作
      if (id) {
        // 如果有id-->更新属性
        // 1、获取对应分类的属性列表
        const categoryAttrs = attrList[categoryId as keyof typeof attrList]
        // 2、判断属性列表是否存在
        if (categoryAttrs) { //如果存在
          const index = categoryAttrs.findIndex((attr: any) => attr.id === id)
          if (index !== -1) {
            categoryAttrs[index] = {
              ...categoryAttrs[index],
              attrName,
              attrValueList: attrValueList.map((value: any, idx: number) => ({
                ...value,
                id: value.id || Date.now() + idx
              }))
            }
          }
        }
      } else {
        // 没有id-->添加新属性
        const newAttr = {
          id: Date.now(),
          attrName,
          categoryId,
          categoryLevel,
          attrValueList: attrValueList.map((value: any, idx: number) => ({
            id: Date.now() + idx,
            valueName: value.valueName,
            attrId: Date.now()
          }))
        }
        if (!attrList[categoryId as keyof typeof attrList]) {
          attrList[categoryId as keyof typeof attrList] = []
        }
        attrList[categoryId as keyof typeof attrList].push(newAttr)
      }
      return {
        code: 200,
        message: id ? '更新成功' : '添加成功',
        data: null,
        ok: true
      }
    }
  },
  // 删除平台属性
  {
    url: '/admin/product/deleteAttr/:attrId',
    method: 'delete',
    response: (request: any) => {
      const attrId = Number(request.url.split('/').pop())
      // 遍历所有分类的属性列表，删除对应的属性
      for (const categoryId in attrList) {
        const categoryAttrs = attrList[categoryId as keyof typeof attrList]
        const index = categoryAttrs.findIndex((attr: any) => attr.id === attrId)
        if (index !== -1) {
          categoryAttrs.splice(index, 1)
          break
        }
      }
      return {
        code: 200,
        message: '删除成功',
        data: null,
        ok: true
      }
    }
  }
]