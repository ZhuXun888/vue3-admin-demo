//品牌相关mock模拟数据

// 模拟品牌数据
// 修正后：去重人民文学出版社重复数据
const trademarkList = [
  { id: 1, tmName: '华为', logoUrl: '/mock/trademark/zhanshi/huawei.png' },
  { id: 2, tmName: '苹果', logoUrl: '/mock/trademark/zhanshi/apple.png' },
  { id: 3, tmName: '小米', logoUrl: '/mock/trademark/zhanshi/xiaomi.png' },
  { id: 4, tmName: 'vivo', logoUrl: '/mock/trademark/zhanshi/vivo.png' },
  { id: 5, tmName: 'oppo', logoUrl: '/mock/trademark/zhanshi/oppo.png' },
  { id: 6, tmName: "诺基亚", logoUrl: "https://example.com/images/nokia-logo.jpg" },
  { id: 7, tmName: "飞利浦", logoUrl: "https://example.com/images/philips-logo.jpg" },
  { id: 8, tmName: "手机壳品牌A", logoUrl: "https://example.com/images/case-brand1.jpg" },
  { id: 9, tmName: "手机壳品牌B", logoUrl: "https://example.com/images/case-brand2.jpg" },
  { id: 10, tmName: "手机壳品牌C", logoUrl: "https://example.com/images/case-brand3.jpg" },
  { id: 11, tmName: "联想", logoUrl: "https://example.com/images/lenovo-logo.jpg" },
  { id: 12, tmName: "苹果电脑", logoUrl: "https://example.com/images/apple-logo.jpg" },
  { id: 13, tmName: "华为电脑", logoUrl: "https://example.com/images/huawei-logo.jpg" },
  { id: 14, tmName: "人民文学出版社", logoUrl: "https://example.com/images/rmwx-logo.jpg" }, // 保留唯一记录
  { id: 15, tmName: "中华书局", logoUrl: "https://example.com/images/zhonghua-logo.jpg" },
  { id: 17, tmName: "惠氏", logoUrl: "https://example.com/images/wyeth-logo.jpg" },
  { id: 18, tmName: "美赞臣", logoUrl: "https://example.com/images/meadjohnson-logo.jpg" },
  { id: 19, tmName: "格力", logoUrl: "https://example.com/images/gree-logo.jpg" },
  { id: 20, tmName: "美的", logoUrl: "https://example.com/images/midea-logo.jpg" },
  { id: 21, tmName: "佳能", logoUrl: "https://example.com/images/canon-logo.jpg" },
  { id: 22, tmName: "资生堂", logoUrl: "https://example.com/images/shiseido-logo.jpg" }
];

// 导出Mock配置数组 - 每个对象对应一个API接口的模拟配置
export default [
  //获取品牌列表（不分页--获取所有品牌列表）--通常用于下拉选择框、表单选择等需要完整品牌列表的场景
  {
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: trademarkList,
      }
    },
  },
  // 获取品牌列表(分页获取品牌列表)--用于品牌管理页面，需要分页显示大量数据
  {
    url: '/admin/product/baseTrademark/:page/:limit',// 接口请求路径，包含动态参数：page(页码)和limit(每页数量)
    method: 'get',
    response: (request) => {
      // 从URL中提取page和limit参数
      const urlParts = request.url.split('/')
      const page = Number(urlParts[urlParts.length - 2]) // 倒数第二个是page
      const limit = Number(urlParts[urlParts.length - 1]) // 最后一个是limit

      // 计算分页起始和结束位置
      const start = (page - 1) * limit
      const end = start + limit

      // 获取当前页的数据
      const records = trademarkList.slice(start, end)

      return {
        code: 200,
        data: {
          records: records, // 只返回当前页的数据
          total: trademarkList.length, // 总记录数
          size: limit, // 每页记录数
          current: page, // 当前页
          searchCount: true,
          pages: Math.ceil(trademarkList.length / limit), // 总页数
        },
        message: '获取成功',
        ok: true,
      }
    },
  },
  // 文件上传接口 - 用于上传品牌Logo--------------------------------前端点击上传 → Mock拦截请求 → 生成假URL → 返回给前端 → 前端显示图片
  {
    url: '/admin/product/fileUpload',// 接口地址--前端请求的地址
    method: 'post',                  // 请求方法--必须是POST，因为要上传文件
    response: () => {                // 响应处理函数-- 当收到请求时执行这个函数
      // // 模拟上传成功，返回一个图片URL
      // // 在实际项目中，这里应该返回服务器存储的图片路径
      // const mockImageUrl = `/mock/trademark/upload-${Date.now()}.png`  // 模拟上传成功，返回一个图片URL--Date.now() 获取当前时间戳，确保每次上传返回的URL都不同--Date.now() 获取当前时间戳，确保每次上传返回的URL都不同

      // 预置的默认图片数组
      const defaultImages = [
        '/mock/trademark/moren/01.jpg',
        '/mock/trademark/moren/02.jpg',
        '/mock/trademark/moren/03.jpg'
      ]

      // 随机选择一张默认图片，模拟"不同"的上传结果
      const randomIndex = Math.floor(Math.random() * defaultImages.length)
      const mockImageUrl = defaultImages[randomIndex]

      console.log('模拟上传成功，返回图片:', mockImageUrl)

      // 返回标准响应格式--// 前端在 handleAvatarSuccess 函数中收到的 response 参数就是这个对象
      return {
        code: 200,
        data: mockImageUrl, // 返回模拟的图片URL
        message: '上传成功',
        ok: true,
      }
    },
  },
  // 添加品牌
  {
    url: '/admin/product/baseTrademark/save',
    method: 'post',// HTTP请求方法：POST，用于创建新资源
    response: ({ body }) => {
      // 响应处理函数，body参数包含前端传递的品牌数据
      // 将新品牌添加到品牌列表中
      trademarkList.push({
        ...body,// 使用展开运算符复制body中的所有属性
        id: Date.now(),// 生成新的品牌ID，使用当前时间戳模拟自增ID
      })
      return {
        code: 200,
        data: null,// 响应数据，添加操作通常不返回具体数据
        message: '添加成功',// 响应消息
        ok: true,// 操作是否成功的标志
      }
    },
  },
  // 更新品牌
  {
    url: '/admin/product/baseTrademark/update',
    method: 'put',
    response: ({ body }) => {
      // 响应处理函数，body参数包含要更新的品牌数据
      // 在品牌列表中查找要更新的品牌索引
      const index = trademarkList.findIndex((item) => item.id === body.id)
      // 如果找到对应的品牌，更新品牌信息
      if (index !== -1) {
        trademarkList[index] = {
          ...trademarkList[index], // 保留原有的品牌属性
          ...body // 用新的数据覆盖要更新的属性
        }
      }
      return {
        code: 200,
        data: null,// 响应数据，更新操作通常不返回具体数据
        message: '更新成功',
        ok: true,
      }
    },
  },
  // 删除品牌
  {
    url: '/admin/product/baseTrademark/remove/:id',// 接口请求路径，包含动态参数：id(要删除的品牌ID)
    method: 'delete',// HTTP请求方法：DELETE，用于删除资源
    response: (request) => {
      // 响应处理函数，request参数包含请求信息
      // 从请求URL中提取品牌ID
      const id = Number(request.url.split('/').pop())// 将URL按'/'分割，取最后一部分作为ID，并转换为数字类型
      // 在品牌列表中查找要删除的品牌索引
      const index = trademarkList.findIndex((item) => item.id === id)
      if (index !== -1) {
        // 如果找到对应的品牌，从数组中删除该品牌
        trademarkList.splice(index, 1)// 从index位置删除1个元素
      }
      return {
        code: 200,
        data: null,// 响应数据，删除操作通常不返回具体数据
        message: '删除成功',
        ok: true,
      }
    },
  },
]