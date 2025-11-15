// 模拟品牌数据
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


// 模拟SPU数据 - 根据三级分类ID组织
const spuList = {
  // 智能手机分类 (1001) 的SPU数据
  1001: [
    {
      id: 1,
      spuName: "HUAWEI P40",
      description: "超感知影像\n品牌: 华为\n上市年份: 2020年\n摄像头: 徕卡三摄",
      category3Id: 1001,
      tmId: 1,
      spuSaleAttrList: [
        {
          id: 1,
          saleAttrName: "颜色",
          spuId: 1,
          spuSaleAttrValueList: [
            { id: 1, saleAttrValueName: "亮黑色", spuId: 1, saleAttrId: 1, isChecked: true },
            { id: 2, saleAttrValueName: "冰霜银", spuId: 1, saleAttrId: 1, isChecked: false },
            { id: 3, saleAttrValueName: "零度白", spuId: 1, saleAttrId: 1, isChecked: false }
          ]
        },
        {
          id: 2,
          saleAttrName: "版本",
          spuId: 1,
          spuSaleAttrValueList: [
            { id: 4, saleAttrValueName: "8GB+128GB", spuId: 1, saleAttrId: 2, isChecked: true },
            { id: 5, saleAttrValueName: "8GB+256GB", spuId: 1, saleAttrId: 2, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 1, spuId: 1, imgName: "p40-main", imgUrl: "https://example.com/images/p40-main.jpg" },
        { id: 2, spuId: 1, imgName: "p40-back", imgUrl: "https://example.com/images/p40-back.jpg" }
      ]
    },
    {
      id: 2,
      spuName: "iPhone 15 Pro",
      description: "钛金属设计\n品牌: 苹果\n上市年份: 2023年\n芯片: A17 Pro",
      category3Id: 1001,
      tmId: 2,
      spuSaleAttrList: [
        {
          id: 3,
          saleAttrName: "颜色",
          spuId: 2,
          spuSaleAttrValueList: [
            { id: 6, saleAttrValueName: "黑色钛金属", spuId: 2, saleAttrId: 3, isChecked: true },
            { id: 7, saleAttrValueName: "白色钛金属", spuId: 2, saleAttrId: 3, isChecked: false },
            { id: 8, saleAttrValueName: "蓝色钛金属", spuId: 2, saleAttrId: 3, isChecked: false }
          ]
        },
        {
          id: 4,
          saleAttrName: "存储",
          spuId: 2,
          spuSaleAttrValueList: [
            { id: 9, saleAttrValueName: "128GB", spuId: 2, saleAttrId: 4, isChecked: true },
            { id: 10, saleAttrValueName: "256GB", spuId: 2, saleAttrId: 4, isChecked: false },
            { id: 11, saleAttrValueName: "512GB", spuId: 2, saleAttrId: 4, isChecked: false },
            { id: 12, saleAttrValueName: "1TB", spuId: 2, saleAttrId: 4, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 3, spuId: 2, imgName: "iphone15-pro-main", imgUrl: "https://example.com/images/iphone15-pro-main.jpg" },
        { id: 4, spuId: 2, imgName: "iphone15-pro-back", imgUrl: "https://example.com/images/iphone15-pro-back.jpg" }
      ]
    },
    {
      id: 3,
      spuName: "小米14 Ultra",
      description: "影像旗舰\n品牌: 小米\n上市年份: 2024年\n摄像头: 徕卡四摄",
      category3Id: 1001,
      tmId: 3,
      spuSaleAttrList: [
        {
          id: 5,
          saleAttrName: "颜色",
          spuId: 3,
          spuSaleAttrValueList: [
            { id: 13, saleAttrValueName: "黑色", spuId: 3, saleAttrId: 5, isChecked: true },
            { id: 14, saleAttrValueName: "白色", spuId: 3, saleAttrId: 5, isChecked: false },
            { id: 15, saleAttrValueName: "蓝色", spuId: 3, saleAttrId: 5, isChecked: false }
          ]
        },
        {
          id: 6,
          saleAttrName: "内存组合",
          spuId: 3,
          spuSaleAttrValueList: [
            { id: 16, saleAttrValueName: "12GB+256GB", spuId: 3, saleAttrId: 6, isChecked: true },
            { id: 17, saleAttrValueName: "16GB+512GB", spuId: 3, saleAttrId: 6, isChecked: false },
            { id: 18, saleAttrValueName: "16GB+1TB", spuId: 3, saleAttrId: 6, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 5, spuId: 3, imgName: "mi14-ultra-main", imgUrl: "https://example.com/images/mi14-ultra-main.jpg" }
      ]
    },
    {
      id: 4,
      spuName: "VIVO X100 Pro",
      description: "VIVO X100 Pro 蔡司影像\n品牌: VIVO\n上市年份: 2023年\n芯片: 天玑9300",
      category3Id: 1001,
      tmId: 4,
      spuSaleAttrList: [
        {
          id: 7,
          saleAttrName: "颜色",
          spuId: 4,
          spuSaleAttrValueList: [
            { id: 19, saleAttrValueName: "星际黑", spuId: 4, saleAttrId: 7, isChecked: true },
            { id: 20, saleAttrValueName: "辰夜蓝", spuId: 4, saleAttrId: 7, isChecked: false },
            { id: 21, saleAttrValueName: "落日橙", spuId: 4, saleAttrId: 7, isChecked: false }
          ]
        },
        {
          id: 8,
          saleAttrName: "配置",
          spuId: 4,
          spuSaleAttrValueList: [
            { id: 22, saleAttrValueName: "12GB+256GB", spuId: 4, saleAttrId: 8, isChecked: true },
            { id: 23, saleAttrValueName: "16GB+512GB", spuId: 4, saleAttrId: 8, isChecked: false },
            { id: 24, saleAttrValueName: "16GB+1TB", spuId: 4, saleAttrId: 8, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 6, spuId: 4, imgName: "vivo-x100-main", imgUrl: "https://example.com/images/vivo-x100-main.jpg" }
      ]
    },
    {
      id: 5,
      spuName: "OPPO Find X7",
      description: "OPPO Find X7 超光影影像\n品牌: OPPO\n上市年份: 2024年\n芯片: 骁龙8 Gen3",
      category3Id: 1001,
      tmId: 5,
      spuSaleAttrList: [
        {
          id: 9,
          saleAttrName: "颜色",
          spuId: 5,
          spuSaleAttrValueList: [
            { id: 25, saleAttrValueName: "星空黑", spuId: 5, saleAttrId: 9, isChecked: true },
            { id: 26, saleAttrValueName: "大漠银", spuId: 5, saleAttrId: 9, isChecked: false },
            { id: 27, saleAttrValueName: "海阔天空", spuId: 5, saleAttrId: 9, isChecked: false }
          ]
        },
        {
          id: 10,
          saleAttrName: "版本",
          spuId: 5,
          spuSaleAttrValueList: [
            { id: 28, saleAttrValueName: "12GB+256GB", spuId: 5, saleAttrId: 10, isChecked: true },
            { id: 29, saleAttrValueName: "16GB+512GB", spuId: 5, saleAttrId: 10, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 7, spuId: 5, imgName: "oppo-findx7-main", imgUrl: "https://example.com/images/oppo-findx7-main.jpg" }
      ]
    }
  ],

  // 老人手机分类 (1002) 的SPU数据
  1002: [
    {
      id: 6,
      spuName: "老年机大按键",
      description: "专为老年人设计的大按键手机\n品牌: 诺基亚\n上市年份: 2022年\n特点: 大字体大音量",
      category3Id: 1002,
      tmId: 6,
      spuSaleAttrList: [
        {
          id: 11,
          saleAttrName: "颜色",
          spuId: 6,
          spuSaleAttrValueList: [
            { id: 30, saleAttrValueName: "黑色", spuId: 6, saleAttrId: 11, isChecked: true },
            { id: 31, saleAttrValueName: "红色", spuId: 6, saleAttrId: 11, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 8, spuId: 6, imgName: "oldphone-main", imgUrl: "https://example.com/images/oldphone-main.jpg" }
      ]
    },
    {
      id: 7,
      spuName: "飞利浦老人手机",
      description: "飞利浦超长待机老人手机\n品牌: 飞利浦\n待机时间: 30天\n紧急呼叫功能",
      category3Id: 1002,
      tmId: 7,
      spuSaleAttrList: [
        {
          id: 12,
          saleAttrName: "颜色",
          spuId: 7,
          spuSaleAttrValueList: [
            { id: 32, saleAttrValueName: "深蓝色", spuId: 7, saleAttrId: 12, isChecked: true },
            { id: 33, saleAttrValueName: "香槟金", spuId: 7, saleAttrId: 12, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 9, spuId: 7, imgName: "philips-oldphone", imgUrl: "https://example.com/images/philips-oldphone.jpg" }
      ]
    }
  ],

  // 手机壳分类 (1004) 的SPU数据
  1004: [
    {
      id: 8,
      spuName: "iPhone 15 Pro 保护壳",
      description: "iPhone 15 Pro 专用保护壳\n材质: 液态硅胶\n防摔防刮",
      category3Id: 1004,
      tmId: 8,
      spuSaleAttrList: [
        {
          id: 13,
          saleAttrName: "颜色",
          spuId: 8,
          spuSaleAttrValueList: [
            { id: 34, saleAttrValueName: "透明", spuId: 8, saleAttrId: 13, isChecked: true },
            { id: 35, saleAttrValueName: "黑色", spuId: 8, saleAttrId: 13, isChecked: false },
            { id: 36, saleAttrValueName: "蓝色", spuId: 8, saleAttrId: 13, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 10, spuId: 8, imgName: "iphone-case-main", imgUrl: "https://example.com/images/iphone-case-main.jpg" }
      ]
    },
    {
      id: 9,
      spuName: "华为P60 磨砂保护壳",
      description: "华为P60 系列专用保护壳\n材质: PC+TPU\n磨砂防指纹",
      category3Id: 1004,
      tmId: 9,
      spuSaleAttrList: [
        {
          id: 14,
          saleAttrName: "颜色",
          spuId: 9,
          spuSaleAttrValueList: [
            { id: 37, saleAttrValueName: "磨砂黑", spuId: 9, saleAttrId: 14, isChecked: true },
            { id: 38, saleAttrValueName: "磨砂透明", spuId: 9, saleAttrId: 14, isChecked: false },
            { id: 39, saleAttrValueName: "磨砂蓝", spuId: 9, saleAttrId: 14, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 11, spuId: 9, imgName: "huawei-case", imgUrl: "https://example.com/images/huawei-case.jpg" }
      ]
    },
    {
      id: 10,
      spuName: "小米14 凯夫拉保护壳",
      description: "小米14 凯夫拉材质保护壳\n超薄设计\n军工级防护",
      category3Id: 1004,
      tmId: 10,
      spuSaleAttrList: [
        {
          id: 15,
          saleAttrName: "颜色",
          spuId: 10,
          spuSaleAttrValueList: [
            { id: 40, saleAttrValueName: "碳纤维黑", spuId: 10, saleAttrId: 15, isChecked: true },
            { id: 41, saleAttrValueName: "凯夫拉原色", spuId: 10, saleAttrId: 15, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 12, spuId: 10, imgName: "mi14-kevlar", imgUrl: "https://example.com/images/mi14-kevlar.jpg" }
      ]
    }
  ],

  // 笔记本分类 (2001) 的SPU数据
  2001: [
    {
      id: 11,
      spuName: "联想小新 Pro 16",
      description: "联想小新 Pro 16 2023款\n处理器: Intel i5\n屏幕: 16英寸 2.5K",
      category3Id: 2001,
      tmId: 11,
      spuSaleAttrList: [
        {
          id: 16,
          saleAttrName: "配置",
          spuId: 11,
          spuSaleAttrValueList: [
            { id: 42, saleAttrValueName: "i5+16GB+512GB", spuId: 11, saleAttrId: 16, isChecked: true },
            { id: 43, saleAttrValueName: "i7+16GB+1TB", spuId: 11, saleAttrId: 16, isChecked: false }
          ]
        },
        {
          id: 17,
          saleAttrName: "颜色",
          spuId: 11,
          spuSaleAttrValueList: [
            { id: 44, saleAttrValueName: "深空灰", spuId: 11, saleAttrId: 17, isChecked: true },
            { id: 45, saleAttrValueName: "月光银", spuId: 11, saleAttrId: 17, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 13, spuId: 11, imgName: "lenovo-main", imgUrl: "https://example.com/images/lenovo-main.jpg" }
      ]
    },
    {
      id: 12,
      spuName: "MacBook Pro 14",
      description: "MacBook Pro 14英寸 M3芯片\n品牌: 苹果\n芯片: M3 Pro\n屏幕: Liquid Retina XDR",
      category3Id: 2001,
      tmId: 12,
      spuSaleAttrList: [
        {
          id: 18,
          saleAttrName: "配置",
          spuId: 12,
          spuSaleAttrValueList: [
            { id: 46, saleAttrValueName: "M3+8GB+512GB", spuId: 12, saleAttrId: 18, isChecked: true },
            { id: 47, saleAttrValueName: "M3 Pro+18GB+1TB", spuId: 12, saleAttrId: 18, isChecked: false }
          ]
        },
        {
          id: 19,
          saleAttrName: "颜色",
          spuId: 12,
          spuSaleAttrValueList: [
            { id: 48, saleAttrValueName: "深空灰色", spuId: 12, saleAttrId: 19, isChecked: true },
            { id: 49, saleAttrValueName: "银色", spuId: 12, saleAttrId: 19, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 14, spuId: 12, imgName: "macbook-pro", imgUrl: "https://example.com/images/macbook-pro.jpg" }
      ]
    },
    {
      id: 13,
      spuName: "华为MateBook X Pro",
      description: "华为MateBook X Pro 2023\n处理器: Intel i7\n屏幕: 13.9英寸 3K触控",
      category3Id: 2001,
      tmId: 13,
      spuSaleAttrList: [
        {
          id: 20,
          saleAttrName: "配置",
          spuId: 13,
          spuSaleAttrValueList: [
            { id: 50, saleAttrValueName: "i7+16GB+1TB", spuId: 13, saleAttrId: 20, isChecked: true },
            { id: 51, saleAttrValueName: "i7+32GB+2TB", spuId: 13, saleAttrId: 20, isChecked: false }
          ]
        },
        {
          id: 21,
          saleAttrName: "颜色",
          spuId: 13,
          spuSaleAttrValueList: [
            { id: 52, saleAttrValueName: "深空灰", spuId: 13, saleAttrId: 21, isChecked: true },
            { id: 53, saleAttrValueName: "皓月银", spuId: 13, saleAttrId: 21, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 15, spuId: 13, imgName: "huawei-matebook", imgUrl: "https://example.com/images/huawei-matebook.jpg" }
      ]
    }
  ],

  // 中国文学分类 (3001) 的SPU数据
  3001: [
    {
      id: 14,
      spuName: "鲁迅全集",
      description: "鲁迅经典作品全集\n出版社: 人民文学出版社\n出版年份: 2020年\n装帧: 精装",
      category3Id: 3001,
      tmId: 14,
      spuSaleAttrList: [
        {
          id: 22,
          saleAttrName: "版本",
          spuId: 14,
          spuSaleAttrValueList: [
            { id: 54, saleAttrValueName: "精装版", spuId: 14, saleAttrId: 22, isChecked: true },
            { id: 55, saleAttrValueName: "平装版", spuId: 14, saleAttrId: 22, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 16, spuId: 14, imgName: "luxun-book", imgUrl: "https://example.com/images/luxun-book.jpg" }
      ]
    },
    {
      id: 15,
      spuName: "红楼梦",
      description: "曹雪芹经典名著\n出版社: 中华书局\n出版年份: 2019年\n版本: 校注本",
      category3Id: 3001,
      tmId: 15,
      spuSaleAttrList: [
        {
          id: 23,
          saleAttrName: "版本",
          spuId: 15,
          spuSaleAttrValueList: [
            { id: 56, saleAttrValueName: "精装珍藏版", spuId: 15, saleAttrId: 23, isChecked: true },
            { id: 57, saleAttrValueName: "平装普及版", spuId: 15, saleAttrId: 23, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 17, spuId: 15, imgName: "hongloumeng", imgUrl: "https://example.com/images/hongloumeng.jpg" }
      ]
    },
    {
      id: 16,
      spuName: "三国演义",
      description: "罗贯中历史小说\n出版社: 人民文学出版社\n出版年份: 2021年\n装帧: 线装",
      category3Id: 3001,
      tmId: 16,
      spuSaleAttrList: [
        {
          id: 24,
          saleAttrName: "装帧",
          spuId: 16,
          spuSaleAttrValueList: [
            { id: 58, saleAttrValueName: "线装版", spuId: 16, saleAttrId: 24, isChecked: true },
            { id: 59, saleAttrValueName: "平装版", spuId: 16, saleAttrId: 24, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 18, spuId: 16, imgName: "sanguo", imgUrl: "https://example.com/images/sanguo.jpg" }
      ]
    }
  ],

  // 婴儿奶粉分类 (4001) 的SPU数据
  4001: [
    {
      id: 17,
      spuName: "惠氏启赋奶粉",
      description: "惠氏启赋婴幼儿配方奶粉\n段位: 1段\n适用年龄: 0-6个月\n产地: 爱尔兰",
      category3Id: 4001,
      tmId: 17,
      spuSaleAttrList: [
        {
          id: 25,
          saleAttrName: "段位",
          spuId: 17,
          spuSaleAttrValueList: [
            { id: 60, saleAttrValueName: "1段(0-6个月)", spuId: 17, saleAttrId: 25, isChecked: true },
            { id: 61, saleAttrValueName: "2段(6-12个月)", spuId: 17, saleAttrId: 25, isChecked: false },
            { id: 62, saleAttrValueName: "3段(1-3岁)", spuId: 17, saleAttrId: 25, isChecked: false }
          ]
        },
        {
          id: 26,
          saleAttrName: "规格",
          spuId: 17,
          spuSaleAttrValueList: [
            { id: 63, saleAttrValueName: "900g", spuId: 17, saleAttrId: 26, isChecked: true },
            { id: 64, saleAttrValueName: "1800g", spuId: 17, saleAttrId: 26, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 19, spuId: 17, imgName: "milk-powder", imgUrl: "https://example.com/images/milk-powder.jpg" }
      ]
    },
    {
      id: 18,
      spuName: "美赞臣蓝臻奶粉",
      description: "美赞臣蓝臻婴幼儿奶粉\n特点: 含乳铁蛋白\n段位: 1段\n适用年龄: 0-6个月",
      category3Id: 4001,
      tmId: 18,
      spuSaleAttrList: [
        {
          id: 27,
          saleAttrName: "段位",
          spuId: 18,
          spuSaleAttrValueList: [
            { id: 65, saleAttrValueName: "1段", spuId: 18, saleAttrId: 27, isChecked: true },
            { id: 66, saleAttrValueName: "2段", spuId: 18, saleAttrId: 27, isChecked: false },
            { id: 67, saleAttrValueName: "3段", spuId: 18, saleAttrId: 27, isChecked: false }
          ]
        },
        {
          id: 28,
          saleAttrName: "规格",
          spuId: 18,
          spuSaleAttrValueList: [
            { id: 68, saleAttrValueName: "800g", spuId: 18, saleAttrId: 28, isChecked: true },
            { id: 69, saleAttrValueName: "1600g", spuId: 18, saleAttrId: 28, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 20, spuId: 18, imgName: "meizanchen", imgUrl: "https://example.com/images/meizanchen.jpg" }
      ]
    }
  ],

  // 空调分类 (6001) 的SPU数据
  6001: [
    {
      id: 19,
      spuName: "格力空调 KFR-35GW",
      description: "格力变频空调\n匹数: 1.5匹\n能效等级: 一级\n特点: 静音节能",
      category3Id: 6001,
      tmId: 19,
      spuSaleAttrList: [
        {
          id: 29,
          saleAttrName: "匹数",
          spuId: 19,
          spuSaleAttrValueList: [
            { id: 70, saleAttrValueName: "大1匹", spuId: 19, saleAttrId: 29, isChecked: false },
            { id: 71, saleAttrValueName: "1.5匹", spuId: 19, saleAttrId: 29, isChecked: true },
            { id: 72, saleAttrValueName: "2匹", spuId: 19, saleAttrId: 29, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 21, spuId: 19, imgName: "air-conditioner", imgUrl: "https://example.com/images/air-conditioner.jpg" }
      ]
    },
    {
      id: 20,
      spuName: "美的空调 KFR-26GW",
      description: "美的智能变频空调\n匹数: 1匹\n能效等级: 新一级\n特点: 智能控制",
      category3Id: 6001,
      tmId: 20,
      spuSaleAttrList: [
        {
          id: 30,
          saleAttrName: "匹数",
          spuId: 20,
          spuSaleAttrValueList: [
            { id: 73, saleAttrValueName: "1匹", spuId: 20, saleAttrId: 30, isChecked: true },
            { id: 74, saleAttrValueName: "1.5匹", spuId: 20, saleAttrId: 30, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 22, spuId: 20, imgName: "midea-ac", imgUrl: "https://example.com/images/midea-ac.jpg" }
      ]
    }
  ],

  // 单反相机分类 (1008) 的SPU数据
  1008: [
    {
      id: 21,
      spuName: "佳能 EOS R5",
      description: "佳能全画幅微单相机\n像素: 4500万\n连拍: 20张/秒\n视频: 8K录制",
      category3Id: 1008,
      tmId: 21,
      spuSaleAttrList: [
        {
          id: 31,
          saleAttrName: "套机配置",
          spuId: 21,
          spuSaleAttrValueList: [
            { id: 75, saleAttrValueName: "单机身", spuId: 21, saleAttrId: 31, isChecked: true },
            { id: 76, saleAttrValueName: "24-105mm套机", spuId: 21, saleAttrId: 31, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 23, spuId: 21, imgName: "canon-r5", imgUrl: "https://example.com/images/canon-r5.jpg" }
      ]
    }
  ],

  // 洁面分类 (5001) 的SPU数据
  5001: [
    {
      id: 22,
      spuName: "资生堂洗面奶",
      description: "资生堂温和洁面乳\n功效: 深层清洁\n肤质: 所有肤质\n净含量: 120g",
      category3Id: 5001,
      tmId: 22,
      spuSaleAttrList: [
        {
          id: 32,
          saleAttrName: "规格",
          spuId: 22,
          spuSaleAttrValueList: [
            { id: 77, saleAttrValueName: "120g", spuId: 22, saleAttrId: 32, isChecked: true },
            { id: 78, saleAttrValueName: "200g", spuId: 22, saleAttrId: 32, isChecked: false }
          ]
        }
      ],
      spuImageList: [
        { id: 24, spuId: 22, imgName: "shiseido-cleanser", imgUrl: "https://example.com/images/shiseido-cleanser.jpg" }
      ]
    }
  ]
}

// 模拟SKU数据 - 基于SPU数据生成
const skuList = [
  // HUAWEI P40 (SPU ID: 1) 的SKU数据
  {
    id: 1,
    spuId: 1,
    price: 4299,
    stock: 50,
    skuName: 'HUAWEI P40 亮黑色 8GB+128GB',
    skuDesc: 'HUAWEI P40 超感知影像 亮黑色 8GB+128GB',
    weight: '0.175',
    isSale: 1,
    skuImageList: [
      {
        id: 1,
        imgName: 'HUAWEI P40 亮黑色正面',
        imgUrl: 'https://example.com/images/p40-black-front.jpg',
        skuId: 1,
        spuImgId: 1,
      },
      {
        id: 2,
        imgName: 'HUAWEI P40 亮黑色背面',
        imgUrl: 'https://example.com/images/p40-black-back.jpg',
        skuId: 1,
        spuImgId: 1,
      },
      {
        id: 3,
        imgName: 'HUAWEI P40 亮黑色侧面',
        imgUrl: 'https://example.com/images/p40-black-side.jpg',
        skuId: 1,
        spuImgId: 1,
      },
      {
        id: 4,
        imgName: 'HUAWEI P40 亮黑色细节',
        imgUrl: 'https://example.com/images/p40-black-detail.jpg',
        skuId: 1,
        spuImgId: 1,
      }
    ],
    skuAttrValueList: [
      {
        id: 1,
        attrId: 1,
        valueId: 1,
        skuId: 1,
        attrName: '颜色',
        valueName: '亮黑色',
      },
      {
        id: 2,
        attrId: 2,
        valueId: 4,
        skuId: 1,
        attrName: '版本',
        valueName: '8GB+128GB',
      },
      {
        id: 3,
        attrId: 99,
        valueId: 101,
        skuId: 1,
        attrName: '网络类型',
        valueName: '5G全网通',
      },
      {
        id: 4,
        attrId: 100,
        valueId: 102,
        skuId: 1,
        attrName: '保修',
        valueName: '全国联保2年',
      }
    ],
  },
  {
    id: 2,
    spuId: 1,
    price: 4699,
    stock: 30,
    skuName: 'HUAWEI P40 冰霜银 8GB+128GB',
    skuDesc: 'HUAWEI P40 超感知影像 冰霜银 8GB+128GB',
    weight: '0.175',
    isSale: 1,
    skuImageList: [
      {
        id: 5,
        imgName: 'HUAWEI P40 冰霜银正面',
        imgUrl: 'https://example.com/images/p40-silver-front.jpg',
        skuId: 2,
        spuImgId: 1,
      },
      {
        id: 6,
        imgName: 'HUAWEI P40 冰霜银背面',
        imgUrl: 'https://example.com/images/p40-silver-back.jpg',
        skuId: 2,
        spuImgId: 1,
      },
      {
        id: 7,
        imgName: 'HUAWEI P40 冰霜银侧面',
        imgUrl: 'https://example.com/images/p40-silver-side.jpg',
        skuId: 2,
        spuImgId: 1,
      }
    ],
    skuAttrValueList: [
      {
        id: 5,
        attrId: 1,
        valueId: 2,
        skuId: 2,
        attrName: '颜色',
        valueName: '冰霜银',
      },
      {
        id: 6,
        attrId: 2,
        valueId: 4,
        skuId: 2,
        attrName: '版本',
        valueName: '8GB+128GB',
      },
      {
        id: 7,
        attrId: 99,
        valueId: 101,
        skuId: 2,
        attrName: '网络类型',
        valueName: '5G全网通',
      },
      {
        id: 8,
        attrId: 100,
        valueId: 102,
        skuId: 2,
        attrName: '保修',
        valueName: '全国联保2年',
      }
    ],
  },
  {
    id: 3,
    spuId: 1,
    price: 4899,
    stock: 25,
    skuName: 'HUAWEI P40 亮黑色 8GB+256GB',
    skuDesc: 'HUAWEI P40 超感知影像 亮黑色 8GB+256GB',
    weight: '0.175',
    isSale: 1,
    skuImageList: [
      {
        id: 8,
        imgName: 'HUAWEI P40 亮黑色256GB正面',
        imgUrl: 'https://example.com/images/p40-black-256-front.jpg',
        skuId: 3,
        spuImgId: 1,
      },
      {
        id: 9,
        imgName: 'HUAWEI P40 亮黑色256GB背面',
        imgUrl: 'https://example.com/images/p40-black-256-back.jpg',
        skuId: 3,
        spuImgId: 1,
      },
      {
        id: 10,
        imgName: 'HUAWEI P40 亮黑色256GB开箱',
        imgUrl: 'https://example.com/images/p40-black-256-unbox.jpg',
        skuId: 3,
        spuImgId: 1,
      }
    ],
    skuAttrValueList: [
      {
        id: 9,
        attrId: 1,
        valueId: 1,
        skuId: 3,
        attrName: '颜色',
        valueName: '亮黑色',
      },
      {
        id: 10,
        attrId: 2,
        valueId: 5,
        skuId: 3,
        attrName: '版本',
        valueName: '8GB+256GB',
      },
      {
        id: 11,
        attrId: 99,
        valueId: 101,
        skuId: 3,
        attrName: '网络类型',
        valueName: '5G全网通',
      },
      {
        id: 12,
        attrId: 100,
        valueId: 102,
        skuId: 3,
        attrName: '保修',
        valueName: '全国联保2年',
      }
    ],
  },

  // iPhone 15 Pro (SPU ID: 2) 的SKU数据
  {
    id: 4,
    spuId: 2,
    price: 8999,
    stock: 80,
    skuName: 'iPhone 15 Pro 黑色钛金属 128GB',
    skuDesc: 'iPhone 15 Pro 钛金属设计 黑色钛金属 128GB',
    weight: '0.187',
    isSale: 1,
    skuImageList: [
      {
        id: 11,
        imgName: 'iPhone 15 Pro 黑色正面',
        imgUrl: 'https://example.com/images/iphone15-black-front.jpg',
        skuId: 4,
        spuImgId: 3,
      },
      {
        id: 12,
        imgName: 'iPhone 15 Pro 黑色背面',
        imgUrl: 'https://example.com/images/iphone15-black-back.jpg',
        skuId: 4,
        spuImgId: 3,
      },
      {
        id: 13,
        imgName: 'iPhone 15 Pro 黑色侧面',
        imgUrl: 'https://example.com/images/iphone15-black-side.jpg',
        skuId: 4,
        spuImgId: 3,
      },
      {
        id: 14,
        imgName: 'iPhone 15 Pro 黑色细节',
        imgUrl: 'https://example.com/images/iphone15-black-detail.jpg',
        skuId: 4,
        spuImgId: 3,
      }
    ],
    skuAttrValueList: [
      {
        id: 13,
        attrId: 3,
        valueId: 6,
        skuId: 4,
        attrName: '颜色',
        valueName: '黑色钛金属',
      },
      {
        id: 14,
        attrId: 4,
        valueId: 9,
        skuId: 4,
        attrName: '存储',
        valueName: '128GB',
      },
      {
        id: 15,
        attrId: 103,
        valueId: 104,
        skuId: 4,
        attrName: '网络',
        valueName: '5G双卡双待',
      },
      {
        id: 16,
        attrId: 104,
        valueId: 105,
        skuId: 4,
        attrName: '配件',
        valueName: '含充电线',
      }
    ],
  },
  {
    id: 5,
    spuId: 2,
    price: 9999,
    stock: 60,
    skuName: 'iPhone 15 Pro 白色钛金属 256GB',
    skuDesc: 'iPhone 15 Pro 钛金属设计 白色钛金属 256GB',
    weight: '0.187',
    isSale: 1,
    skuImageList: [
      {
        id: 15,
        imgName: 'iPhone 15 Pro 白色正面',
        imgUrl: 'https://example.com/images/iphone15-white-front.jpg',
        skuId: 5,
        spuImgId: 3,
      },
      {
        id: 16,
        imgName: 'iPhone 15 Pro 白色背面',
        imgUrl: 'https://example.com/images/iphone15-white-back.jpg',
        skuId: 5,
        spuImgId: 3,
      },
      {
        id: 17,
        imgName: 'iPhone 15 Pro 白色侧面',
        imgUrl: 'https://example.com/images/iphone15-white-side.jpg',
        skuId: 5,
        spuImgId: 3,
      }
    ],
    skuAttrValueList: [
      {
        id: 17,
        attrId: 3,
        valueId: 7,
        skuId: 5,
        attrName: '颜色',
        valueName: '白色钛金属',
      },
      {
        id: 18,
        attrId: 4,
        valueId: 10,
        skuId: 5,
        attrName: '存储',
        valueName: '256GB',
      },
      {
        id: 19,
        attrId: 103,
        valueId: 104,
        skuId: 5,
        attrName: '网络',
        valueName: '5G双卡双待',
      },
      {
        id: 20,
        attrId: 104,
        valueId: 105,
        skuId: 5,
        attrName: '配件',
        valueName: '含充电线',
      }
    ],
  },
  {
    id: 6,
    spuId: 2,
    price: 11799,
    stock: 40,
    skuName: 'iPhone 15 Pro 蓝色钛金属 512GB',
    skuDesc: 'iPhone 15 Pro 钛金属设计 蓝色钛金属 512GB',
    weight: '0.187',
    isSale: 1,
    skuImageList: [
      {
        id: 18,
        imgName: 'iPhone 15 Pro 蓝色正面',
        imgUrl: 'https://example.com/images/iphone15-blue-front.jpg',
        skuId: 6,
        spuImgId: 3,
      },
      {
        id: 19,
        imgName: 'iPhone 15 Pro 蓝色背面',
        imgUrl: 'https://example.com/images/iphone15-blue-back.jpg',
        skuId: 6,
        spuImgId: 3,
      },
      {
        id: 20,
        imgName: 'iPhone 15 Pro 蓝色侧面',
        imgUrl: 'https://example.com/images/iphone15-blue-side.jpg',
        skuId: 6,
        spuImgId: 3,
      }
    ],
    skuAttrValueList: [
      {
        id: 21,
        attrId: 3,
        valueId: 8,
        skuId: 6,
        attrName: '颜色',
        valueName: '蓝色钛金属',
      },
      {
        id: 22,
        attrId: 4,
        valueId: 11,
        skuId: 6,
        attrName: '存储',
        valueName: '512GB',
      },
      {
        id: 23,
        attrId: 103,
        valueId: 104,
        skuId: 6,
        attrName: '网络',
        valueName: '5G双卡双待',
      },
      {
        id: 24,
        attrId: 104,
        valueId: 105,
        skuId: 6,
        attrName: '配件',
        valueName: '含充电线',
      }
    ],
  },

  // 小米14 Ultra (SPU ID: 3) 的SKU数据
  {
    id: 7,
    spuId: 3,
    price: 5999,
    stock: 45,
    skuName: '小米14 Ultra 黑色 12GB+256GB',
    skuDesc: '小米14 Ultra 影像旗舰 黑色 12GB+256GB',
    weight: '0.224',
    isSale: 1,
    skuImageList: [
      {
        id: 21,
        imgName: '小米14 Ultra 黑色正面',
        imgUrl: 'https://example.com/images/mi14-black-front.jpg',
        skuId: 7,
        spuImgId: 5,
      },
      {
        id: 22,
        imgName: '小米14 Ultra 黑色背面',
        imgUrl: 'https://example.com/images/mi14-black-back.jpg',
        skuId: 7,
        spuImgId: 5,
      },
      {
        id: 23,
        imgName: '小米14 Ultra 黑色侧面',
        imgUrl: 'https://example.com/images/mi14-black-side.jpg',
        skuId: 7,
        spuImgId: 5,
      },
      {
        id: 24,
        imgName: '小米14 Ultra 黑色徕卡镜头',
        imgUrl: 'https://example.com/images/mi14-black-camera.jpg',
        skuId: 7,
        spuImgId: 5,
      }
    ],
    skuAttrValueList: [
      {
        id: 25,
        attrId: 5,
        valueId: 13,
        skuId: 7,
        attrName: '颜色',
        valueName: '黑色',
      },
      {
        id: 26,
        attrId: 6,
        valueId: 16,
        skuId: 7,
        attrName: '内存组合',
        valueName: '12GB+256GB',
      },
      {
        id: 27,
        attrId: 105,
        valueId: 106,
        skuId: 7,
        attrName: '快充',
        valueName: '120W有线快充',
      },
      {
        id: 28,
        attrId: 106,
        valueId: 107,
        skuId: 7,
        attrName: '相机',
        valueName: '徕卡四摄',
      }
    ],
  },
  {
    id: 8,
    spuId: 3,
    price: 6499,
    stock: 35,
    skuName: '小米14 Ultra 白色 16GB+512GB',
    skuDesc: '小米14 Ultra 影像旗舰 白色 16GB+512GB',
    weight: '0.224',
    isSale: 1,
    skuImageList: [
      {
        id: 25,
        imgName: '小米14 Ultra 白色正面',
        imgUrl: 'https://example.com/images/mi14-white-front.jpg',
        skuId: 8,
        spuImgId: 5,
      },
      {
        id: 26,
        imgName: '小米14 Ultra 白色背面',
        imgUrl: 'https://example.com/images/mi14-white-back.jpg',
        skuId: 8,
        spuImgId: 5,
      },
      {
        id: 27,
        imgName: '小米14 Ultra 白色侧面',
        imgUrl: 'https://example.com/images/mi14-white-side.jpg',
        skuId: 8,
        spuImgId: 5,
      }
    ],
    skuAttrValueList: [
      {
        id: 29,
        attrId: 5,
        valueId: 14,
        skuId: 8,
        attrName: '颜色',
        valueName: '白色',
      },
      {
        id: 30,
        attrId: 6,
        valueId: 17,
        skuId: 8,
        attrName: '内存组合',
        valueName: '16GB+512GB',
      },
      {
        id: 31,
        attrId: 105,
        valueId: 106,
        skuId: 8,
        attrName: '快充',
        valueName: '120W有线快充',
      },
      {
        id: 32,
        attrId: 106,
        valueId: 107,
        skuId: 8,
        attrName: '相机',
        valueName: '徕卡四摄',
      }
    ],
  },

  // VIVO X100 Pro (SPU ID: 4) 的SKU数据
  {
    id: 9,
    spuId: 4,
    price: 4999,
    stock: 55,
    skuName: 'VIVO X100 Pro 星际黑 12GB+256GB',
    skuDesc: 'VIVO X100 Pro 蔡司影像 星际黑 12GB+256GB',
    weight: '0.221',
    isSale: 1,
    skuImageList: [
      {
        id: 28,
        imgName: 'VIVO X100 Pro 星际黑正面',
        imgUrl: 'https://example.com/images/vivo-black-front.jpg',
        skuId: 9,
        spuImgId: 6,
      },
      {
        id: 29,
        imgName: 'VIVO X100 Pro 星际黑背面',
        imgUrl: 'https://example.com/images/vivo-black-back.jpg',
        skuId: 9,
        spuImgId: 6,
      },
      {
        id: 30,
        imgName: 'VIVO X100 Pro 星际黑侧面',
        imgUrl: 'https://example.com/images/vivo-black-side.jpg',
        skuId: 9,
        spuImgId: 6,
      },
      {
        id: 31,
        imgName: 'VIVO X100 Pro 蔡司镜头',
        imgUrl: 'https://example.com/images/vivo-zeiss-camera.jpg',
        skuId: 9,
        spuImgId: 6,
      }
    ],
    skuAttrValueList: [
      {
        id: 33,
        attrId: 7,
        valueId: 19,
        skuId: 9,
        attrName: '颜色',
        valueName: '星际黑',
      },
      {
        id: 34,
        attrId: 8,
        valueId: 22,
        skuId: 9,
        attrName: '配置',
        valueName: '12GB+256GB',
      },
      {
        id: 35,
        attrId: 107,
        valueId: 108,
        skuId: 9,
        attrName: '芯片',
        valueName: '天玑9300',
      },
      {
        id: 36,
        attrId: 108,
        valueId: 109,
        skuId: 9,
        attrName: '影像',
        valueName: '蔡司T*镀膜',
      }
    ],
  },

  // OPPO Find X7 (SPU ID: 5) 的SKU数据
  {
    id: 10,
    spuId: 5,
    price: 4499,
    stock: 40,
    skuName: 'OPPO Find X7 星空黑 12GB+256GB',
    skuDesc: 'OPPO Find X7 超光影影像 星空黑 12GB+256GB',
    weight: '0.202',
    isSale: 1,
    skuImageList: [
      {
        id: 32,
        imgName: 'OPPO Find X7 星空黑正面',
        imgUrl: 'https://example.com/images/oppo-black-front.jpg',
        skuId: 10,
        spuImgId: 7,
      },
      {
        id: 33,
        imgName: 'OPPO Find X7 星空黑背面',
        imgUrl: 'https://example.com/images/oppo-black-back.jpg',
        skuId: 10,
        spuImgId: 7,
      },
      {
        id: 34,
        imgName: 'OPPO Find X7 星空黑侧面',
        imgUrl: 'https://example.com/images/oppo-black-side.jpg',
        skuId: 10,
        spuImgId: 7,
      }
    ],
    skuAttrValueList: [
      {
        id: 37,
        attrId: 9,
        valueId: 25,
        skuId: 10,
        attrName: '颜色',
        valueName: '星空黑',
      },
      {
        id: 38,
        attrId: 10,
        valueId: 28,
        skuId: 10,
        attrName: '版本',
        valueName: '12GB+256GB',
      },
      {
        id: 39,
        attrId: 109,
        valueId: 110,
        skuId: 10,
        attrName: '处理器',
        valueName: '骁龙8 Gen3',
      },
      {
        id: 40,
        attrId: 110,
        valueId: 111,
        skuId: 10,
        attrName: '屏幕',
        valueName: '2K超清屏',
      }
    ],
  },

  // 老年机大按键 (SPU ID: 6) 的SKU数据
  {
    id: 11,
    spuId: 6,
    price: 299,
    stock: 200,
    skuName: '老年机大按键 黑色',
    skuDesc: '老年机大按键 专为老年人设计 黑色',
    weight: '0.15',
    isSale: 1,
    skuImageList: [
      {
        id: 35,
        imgName: '老年机大按键 黑色正面',
        imgUrl: 'https://example.com/images/oldphone-black-front.jpg',
        skuId: 11,
        spuImgId: 8,
      },
      {
        id: 36,
        imgName: '老年机大按键 黑色背面',
        imgUrl: 'https://example.com/images/oldphone-black-back.jpg',
        skuId: 11,
        spuImgId: 8,
      },
      {
        id: 37,
        imgName: '老年机大按键 黑色侧面',
        imgUrl: 'https://example.com/images/oldphone-black-side.jpg',
        skuId: 11,
        spuImgId: 8,
      },
      {
        id: 38,
        imgName: '老年机大按键 键盘特写',
        imgUrl: 'https://example.com/images/oldphone-keyboard.jpg',
        skuId: 11,
        spuImgId: 8,
      }
    ],
    skuAttrValueList: [
      {
        id: 41,
        attrId: 11,
        valueId: 30,
        skuId: 11,
        attrName: '颜色',
        valueName: '黑色',
      },
      {
        id: 42,
        attrId: 111,
        valueId: 112,
        skuId: 11,
        attrName: '功能',
        valueName: '大字体大音量',
      },
      {
        id: 43,
        attrId: 112,
        valueId: 113,
        skuId: 11,
        attrName: '电池',
        valueName: '超长待机',
      },
      {
        id: 44,
        attrId: 113,
        valueId: 114,
        skuId: 11,
        attrName: '网络',
        valueName: '4G全网通',
      }
    ],
  },

  // 飞利浦老人手机 (SPU ID: 7) 的SKU数据
  {
    id: 12,
    spuId: 7,
    price: 399,
    stock: 150,
    skuName: '飞利浦老人手机 深蓝色',
    skuDesc: '飞利浦超长待机老人手机 深蓝色',
    weight: '0.16',
    isSale: 1,
    skuImageList: [
      {
        id: 39,
        imgName: '飞利浦老人手机 深蓝色正面',
        imgUrl: 'https://example.com/images/philips-blue-front.jpg',
        skuId: 12,
        spuImgId: 9,
      },
      {
        id: 40,
        imgName: '飞利浦老人手机 深蓝色背面',
        imgUrl: 'https://example.com/images/philips-blue-back.jpg',
        skuId: 12,
        spuImgId: 9,
      },
      {
        id: 41,
        imgName: '飞利浦老人手机 深蓝色侧面',
        imgUrl: 'https://example.com/images/philips-blue-side.jpg',
        skuId: 12,
        spuImgId: 9,
      }
    ],
    skuAttrValueList: [
      {
        id: 45,
        attrId: 12,
        valueId: 32,
        skuId: 12,
        attrName: '颜色',
        valueName: '深蓝色',
      },
      {
        id: 46,
        attrId: 114,
        valueId: 115,
        skuId: 12,
        attrName: '待机时间',
        valueName: '30天超长待机',
      },
      {
        id: 47,
        attrId: 115,
        valueId: 116,
        skuId: 12,
        attrName: '特色功能',
        valueName: '紧急呼叫',
      },
      {
        id: 48,
        attrId: 116,
        valueId: 117,
        skuId: 12,
        attrName: '网络',
        valueName: '4G全网通',
      }
    ],
  },

  // iPhone 15 Pro 保护壳 (SPU ID: 8) 的SKU数据
  {
    id: 13,
    spuId: 8,
    price: 89,
    stock: 300,
    skuName: 'iPhone 15 Pro 保护壳 透明',
    skuDesc: 'iPhone 15 Pro 专用保护壳 液态硅胶 透明',
    weight: '0.03',
    isSale: 1,
    skuImageList: [
      {
        id: 42,
        imgName: 'iPhone 15 Pro 保护壳 透明正面',
        imgUrl: 'https://example.com/images/iphone-case-clear-front.jpg',
        skuId: 13,
        spuImgId: 10,
      },
      {
        id: 43,
        imgName: 'iPhone 15 Pro 保护壳 透明背面',
        imgUrl: 'https://example.com/images/iphone-case-clear-back.jpg',
        skuId: 13,
        spuImgId: 10,
      },
      {
        id: 44,
        imgName: 'iPhone 15 Pro 保护壳 透明侧面',
        imgUrl: 'https://example.com/images/iphone-case-clear-side.jpg',
        skuId: 13,
        spuImgId: 10,
      },
      {
        id: 45,
        imgName: 'iPhone 15 Pro 保护壳 装机效果',
        imgUrl: 'https://example.com/images/iphone-case-installed.jpg',
        skuId: 13,
        spuImgId: 10,
      }
    ],
    skuAttrValueList: [
      {
        id: 49,
        attrId: 13,
        valueId: 34,
        skuId: 13,
        attrName: '颜色',
        valueName: '透明',
      },
      {
        id: 50,
        attrId: 117,
        valueId: 118,
        skuId: 13,
        attrName: '材质',
        valueName: '液态硅胶',
      },
      {
        id: 51,
        attrId: 118,
        valueId: 119,
        skuId: 13,
        attrName: '防护等级',
        valueName: '军规防摔',
      },
      {
        id: 52,
        attrId: 119,
        valueId: 120,
        skuId: 13,
        attrName: '兼容性',
        valueName: 'iPhone 15 Pro专用',
      }
    ],
  },

  // 联想小新 Pro 16 (SPU ID: 11) 的SKU数据
  {
    id: 14,
    spuId: 11,
    price: 6499,
    stock: 25,
    skuName: '联想小新 Pro 16 i5+16GB+512GB 深空灰',
    skuDesc: '联想小新 Pro 16 2023款 i5+16GB+512GB 深空灰',
    weight: '1.95',
    isSale: 1,
    skuImageList: [
      {
        id: 46,
        imgName: '联想小新 Pro 16 深空灰正面',
        imgUrl: 'https://example.com/images/lenovo-gray-front.jpg',
        skuId: 14,
        spuImgId: 13,
      },
      {
        id: 47,
        imgName: '联想小新 Pro 16 深空灰背面',
        imgUrl: 'https://example.com/images/lenovo-gray-back.jpg',
        skuId: 14,
        spuImgId: 13,
      },
      {
        id: 48,
        imgName: '联想小新 Pro 16 深空灰侧面',
        imgUrl: 'https://example.com/images/lenovo-gray-side.jpg',
        skuId: 14,
        spuImgId: 13,
      },
      {
        id: 49,
        imgName: '联想小新 Pro 16 键盘',
        imgUrl: 'https://example.com/images/lenovo-keyboard.jpg',
        skuId: 14,
        spuImgId: 13,
      }
    ],
    skuAttrValueList: [
      {
        id: 53,
        attrId: 16,
        valueId: 42,
        skuId: 14,
        attrName: '配置',
        valueName: 'i5+16GB+512GB',
      },
      {
        id: 54,
        attrId: 17,
        valueId: 44,
        skuId: 14,
        attrName: '颜色',
        valueName: '深空灰',
      },
      {
        id: 55,
        attrId: 120,
        valueId: 121,
        skuId: 14,
        attrName: '屏幕',
        valueName: '16英寸2.5K',
      },
      {
        id: 56,
        attrId: 121,
        valueId: 122,
        skuId: 14,
        attrName: '显卡',
        valueName: '集成显卡',
      }
    ],
  },

  // MacBook Pro 14 (SPU ID: 12) 的SKU数据
  {
    id: 15,
    spuId: 12,
    price: 15999,
    stock: 15,
    skuName: 'MacBook Pro 14 M3+8GB+512GB 深空灰色',
    skuDesc: 'MacBook Pro 14英寸 M3芯片 M3+8GB+512GB 深空灰色',
    weight: '1.6',
    isSale: 1,
    skuImageList: [
      {
        id: 50,
        imgName: 'MacBook Pro 14 深空灰色正面',
        imgUrl: 'https://example.com/images/macbook-gray-front.jpg',
        skuId: 15,
        spuImgId: 14,
      },
      {
        id: 51,
        imgName: 'MacBook Pro 14 深空灰色背面',
        imgUrl: 'https://example.com/images/macbook-gray-back.jpg',
        skuId: 15,
        spuImgId: 14,
      },
      {
        id: 52,
        imgName: 'MacBook Pro 14 深空灰色侧面',
        imgUrl: 'https://example.com/images/macbook-gray-side.jpg',
        skuId: 15,
        spuImgId: 14,
      },
      {
        id: 53,
        imgName: 'MacBook Pro 14 屏幕显示',
        imgUrl: 'https://example.com/images/macbook-screen.jpg',
        skuId: 15,
        spuImgId: 14,
      }
    ],
    skuAttrValueList: [
      {
        id: 57,
        attrId: 18,
        valueId: 46,
        skuId: 15,
        attrName: '配置',
        valueName: 'M3+8GB+512GB',
      },
      {
        id: 58,
        attrId: 19,
        valueId: 48,
        skuId: 15,
        attrName: '颜色',
        valueName: '深空灰色',
      },
      {
        id: 59,
        attrId: 122,
        valueId: 123,
        skuId: 15,
        attrName: '屏幕',
        valueName: 'Liquid Retina XDR',
      },
      {
        id: 60,
        attrId: 123,
        valueId: 124,
        skuId: 15,
        attrName: '系统',
        valueName: 'macOS',
      }
    ],
  },

  // 鲁迅全集 (SPU ID: 14) 的SKU数据
  {
    id: 16,
    spuId: 14,
    price: 298,
    stock: 100,
    skuName: '鲁迅全集 精装版',
    skuDesc: '鲁迅经典作品全集 精装版',
    weight: '2.5',
    isSale: 1,
    skuImageList: [
      {
        id: 54,
        imgName: '鲁迅全集 精装版封面',
        imgUrl: 'https://example.com/images/luxun-hardcover-cover.jpg',
        skuId: 16,
        spuImgId: 16,
      },
      {
        id: 55,
        imgName: '鲁迅全集 精装版书脊',
        imgUrl: 'https://example.com/images/luxun-hardcover-spine.jpg',
        skuId: 16,
        spuImgId: 16,
      },
      {
        id: 56,
        imgName: '鲁迅全集 精装版内页',
        imgUrl: 'https://example.com/images/luxun-hardcover-inside.jpg',
        skuId: 16,
        spuImgId: 16,
      },
      {
        id: 57,
        imgName: '鲁迅全集 精装版套装',
        imgUrl: 'https://example.com/images/luxun-hardcover-set.jpg',
        skuId: 16,
        spuImgId: 16,
      }
    ],
    skuAttrValueList: [
      {
        id: 61,
        attrId: 22,
        valueId: 54,
        skuId: 16,
        attrName: '版本',
        valueName: '精装版',
      },
      {
        id: 62,
        attrId: 124,
        valueId: 125,
        skuId: 16,
        attrName: '出版社',
        valueName: '人民文学出版社',
      },
      {
        id: 63,
        attrId: 125,
        valueId: 126,
        skuId: 16,
        attrName: '页数',
        valueName: '1500页',
      },
      {
        id: 64,
        attrId: 126,
        valueId: 127,
        skuId: 16,
        attrName: '印刷',
        valueName: '彩色插图',
      }
    ],
  },

  // 惠氏启赋奶粉 (SPU ID: 17) 的SKU数据
  {
    id: 17,
    spuId: 17,
    price: 389,
    stock: 200,
    skuName: '惠氏启赋奶粉 1段 900g',
    skuDesc: '惠氏启赋婴幼儿配方奶粉 1段(0-6个月) 900g',
    weight: '0.9',
    isSale: 1,
    skuImageList: [
      {
        id: 58,
        imgName: '惠氏启赋奶粉 1段正面',
        imgUrl: 'https://example.com/images/milk-powder-1-front.jpg',
        skuId: 17,
        spuImgId: 19,
      },
      {
        id: 59,
        imgName: '惠氏启赋奶粉 1段背面',
        imgUrl: 'https://example.com/images/milk-powder-1-back.jpg',
        skuId: 17,
        spuImgId: 19,
      },
      {
        id: 60,
        imgName: '惠氏启赋奶粉 1段侧面',
        imgUrl: 'https://example.com/images/milk-powder-1-side.jpg',
        skuId: 17,
        spuImgId: 19,
      },
      {
        id: 61,
        imgName: '惠氏启赋奶粉 营养成分',
        imgUrl: 'https://example.com/images/milk-powder-nutrition.jpg',
        skuId: 17,
        spuImgId: 19,
      }
    ],
    skuAttrValueList: [
      {
        id: 65,
        attrId: 25,
        valueId: 60,
        skuId: 17,
        attrName: '段位',
        valueName: '1段(0-6个月)',
      },
      {
        id: 66,
        attrId: 26,
        valueId: 63,
        skuId: 17,
        attrName: '规格',
        valueName: '900g',
      },
      {
        id: 67,
        attrId: 127,
        valueId: 128,
        skuId: 17,
        attrName: '产地',
        valueName: '爱尔兰',
      },
      {
        id: 68,
        attrId: 128,
        valueId: 129,
        skuId: 17,
        attrName: '保质期',
        valueName: '24个月',
      }
    ],
  },

  // 格力空调 (SPU ID: 19) 的SKU数据
  {
    id: 18,
    spuId: 19,
    price: 3299,
    stock: 30,
    skuName: '格力空调 KFR-35GW 1.5匹',
    skuDesc: '格力变频空调 1.5匹 一级能效',
    weight: '28',
    isSale: 1,
    skuImageList: [
      {
        id: 62,
        imgName: '格力空调 1.5匹室内机',
        imgUrl: 'https://example.com/images/gree-ac-indoor.jpg',
        skuId: 18,
        spuImgId: 21,
      },
      {
        id: 63,
        imgName: '格力空调 1.5匹室外机',
        imgUrl: 'https://example.com/images/gree-ac-outdoor.jpg',
        skuId: 18,
        spuImgId: 21,
      },
      {
        id: 64,
        imgName: '格力空调 1.5匹遥控器',
        imgUrl: 'https://example.com/images/gree-ac-remote.jpg',
        skuId: 18,
        spuImgId: 21,
      },
      {
        id: 65,
        imgName: '格力空调 能效标识',
        imgUrl: 'https://example.com/images/gree-ac-energy-label.jpg',
        skuId: 18,
        spuImgId: 21,
      }
    ],
    skuAttrValueList: [
      {
        id: 69,
        attrId: 29,
        valueId: 71,
        skuId: 18,
        attrName: '匹数',
        valueName: '1.5匹',
      },
      {
        id: 70,
        attrId: 129,
        valueId: 130,
        skuId: 18,
        attrName: '能效等级',
        valueName: '一级能效',
      },
      {
        id: 71,
        attrId: 130,
        valueId: 131,
        skuId: 18,
        attrName: '变频定频',
        valueName: '变频',
      },
      {
        id: 72,
        attrId: 131,
        valueId: 132,
        skuId: 18,
        attrName: '适用面积',
        valueName: '15-25㎡',
      }
    ],
  },

  // 佳能 EOS R5 (SPU ID: 21) 的SKU数据
  {
    id: 19,
    spuId: 21,
    price: 25999,
    stock: 10,
    skuName: '佳能 EOS R5 单机身',
    skuDesc: '佳能全画幅微单相机 EOS R5 单机身',
    weight: '0.65',
    isSale: 1,
    skuImageList: [
      {
        id: 66,
        imgName: '佳能 EOS R5 单机身正面',
        imgUrl: 'https://example.com/images/canon-r5-body-front.jpg',
        skuId: 19,
        spuImgId: 23,
      },
      {
        id: 67,
        imgName: '佳能 EOS R5 单机身背面',
        imgUrl: 'https://example.com/images/canon-r5-body-back.jpg',
        skuId: 19,
        spuImgId: 23,
      },
      {
        id: 68,
        imgName: '佳能 EOS R5 单机身顶部',
        imgUrl: 'https://example.com/images/canon-r5-body-top.jpg',
        skuId: 19,
        spuImgId: 23,
      },
      {
        id: 69,
        imgName: '佳能 EOS R5 传感器',
        imgUrl: 'https://example.com/images/canon-r5-sensor.jpg',
        skuId: 19,
        spuImgId: 23,
      }
    ],
    skuAttrValueList: [
      {
        id: 73,
        attrId: 31,
        valueId: 75,
        skuId: 19,
        attrName: '套机配置',
        valueName: '单机身',
      },
      {
        id: 74,
        attrId: 132,
        valueId: 133,
        skuId: 19,
        attrName: '像素',
        valueName: '4500万',
      },
      {
        id: 75,
        attrId: 133,
        valueId: 134,
        skuId: 19,
        attrName: '连拍速度',
        valueName: '20张/秒',
      },
      {
        id: 76,
        attrId: 134,
        valueId: 135,
        skuId: 19,
        attrName: '视频能力',
        valueName: '8K录制',
      }
    ],
  },

  // 资生堂洗面奶 (SPU ID: 22) 的SKU数据
  {
    id: 20,
    spuId: 22,
    price: 189,
    stock: 150,
    skuName: '资生堂洗面奶 120g',
    skuDesc: '资生堂温和洁面乳 120g 所有肤质',
    weight: '0.12',
    isSale: 1,
    skuImageList: [
      {
        id: 70,
        imgName: '资生堂洗面奶 120g正面',
        imgUrl: 'https://example.com/images/shiseido-120g-front.jpg',
        skuId: 20,
        spuImgId: 24,
      },
      {
        id: 71,
        imgName: '资生堂洗面奶 120g背面',
        imgUrl: 'https://example.com/images/shiseido-120g-back.jpg',
        skuId: 20,
        spuImgId: 24,
      },
      {
        id: 72,
        imgName: '资生堂洗面奶 120g侧面',
        imgUrl: 'https://example.com/images/shiseido-120g-side.jpg',
        skuId: 20,
        spuImgId: 24,
      },
      {
        id: 73,
        imgName: '资生堂洗面奶 质地展示',
        imgUrl: 'https://example.com/images/shiseido-texture.jpg',
        skuId: 20,
        spuImgId: 24,
      }
    ],
    skuAttrValueList: [
      {
        id: 77,
        attrId: 32,
        valueId: 77,
        skuId: 20,
        attrName: '规格',
        valueName: '120g',
      },
      {
        id: 78,
        attrId: 135,
        valueId: 136,
        skuId: 20,
        attrName: '功效',
        valueName: '深层清洁',
      },
      {
        id: 79,
        attrId: 136,
        valueId: 137,
        skuId: 20,
        attrName: '肤质',
        valueName: '所有肤质',
      },
      {
        id: 80,
        attrId: 137,
        valueId: 138,
        skuId: 20,
        attrName: '成分',
        valueName: '温和配方',
      }
    ],
  },

  // 新增SKU数据 - 华为P60 磨砂保护壳 (SPU ID: 9)
  {
    id: 21,
    spuId: 9,
    price: 79,
    stock: 180,
    skuName: '华为P60 磨砂保护壳 磨砂黑',
    skuDesc: '华为P60 系列专用保护壳 磨砂防指纹 磨砂黑',
    weight: '0.035',
    isSale: 1,
    skuImageList: [
      {
        id: 74,
        imgName: '华为P60 磨砂保护壳 磨砂黑正面',
        imgUrl: 'https://example.com/images/huawei-case-matte-black-front.jpg',
        skuId: 21,
        spuImgId: 11,
      },
      {
        id: 75,
        imgName: '华为P60 磨砂保护壳 磨砂黑背面',
        imgUrl: 'https://example.com/images/huawei-case-matte-black-back.jpg',
        skuId: 21,
        spuImgId: 11,
      },
      {
        id: 76,
        imgName: '华为P60 磨砂保护壳 磨砂黑装机',
        imgUrl: 'https://example.com/images/huawei-case-matte-black-installed.jpg',
        skuId: 21,
        spuImgId: 11,
      }
    ],
    skuAttrValueList: [
      {
        id: 81,
        attrId: 14,
        valueId: 37,
        skuId: 21,
        attrName: '颜色',
        valueName: '磨砂黑',
      },
      {
        id: 82,
        attrId: 138,
        valueId: 139,
        skuId: 21,
        attrName: '材质',
        valueName: 'PC+TPU',
      },
      {
        id: 83,
        attrId: 139,
        valueId: 140,
        skuId: 21,
        attrName: '表面处理',
        valueName: '磨砂防指纹',
      },
      {
        id: 84,
        attrId: 140,
        valueId: 141,
        skuId: 21,
        attrName: '兼容型号',
        valueName: '华为P60系列',
      }
    ],
  },

  // 新增SKU数据 - 小米14 凯夫拉保护壳 (SPU ID: 10)
  {
    id: 22,
    spuId: 10,
    price: 129,
    stock: 120,
    skuName: '小米14 凯夫拉保护壳 碳纤维黑',
    skuDesc: '小米14 凯夫拉材质保护壳 超薄设计 碳纤维黑',
    weight: '0.025',
    isSale: 1,
    skuImageList: [
      {
        id: 77,
        imgName: '小米14 凯夫拉保护壳 碳纤维黑正面',
        imgUrl: 'https://example.com/images/mi14-kevlar-black-front.jpg',
        skuId: 22,
        spuImgId: 12,
      },
      {
        id: 78,
        imgName: '小米14 凯夫拉保护壳 碳纤维黑背面',
        imgUrl: 'https://example.com/images/mi14-kevlar-black-back.jpg',
        skuId: 22,
        spuImgId: 12,
      },
      {
        id: 79,
        imgName: '小米14 凯夫拉保护壳 碳纤维黑侧面',
        imgUrl: 'https://example.com/images/mi14-kevlar-black-side.jpg',
        skuId: 22,
        spuImgId: 12,
      }
    ],
    skuAttrValueList: [
      {
        id: 85,
        attrId: 15,
        valueId: 40,
        skuId: 22,
        attrName: '颜色',
        valueName: '碳纤维黑',
      },
      {
        id: 86,
        attrId: 141,
        valueId: 142,
        skuId: 22,
        attrName: '材质',
        valueName: '凯夫拉',
      },
      {
        id: 87,
        attrId: 142,
        valueId: 143,
        skuId: 22,
        attrName: '厚度',
        valueName: '超薄0.8mm',
      },
      {
        id: 88,
        attrId: 143,
        valueId: 144,
        skuId: 22,
        attrName: '防护等级',
        valueName: '军工级防护',
      }
    ],
  },

  // 新增SKU数据 - 华为MateBook X Pro (SPU ID: 13)
  {
    id: 23,
    spuId: 13,
    price: 8999,
    stock: 20,
    skuName: '华为MateBook X Pro i7+16GB+1TB 深空灰',
    skuDesc: '华为MateBook X Pro 2023 i7+16GB+1TB 深空灰',
    weight: '1.26',
    isSale: 1,
    skuImageList: [
      {
        id: 80,
        imgName: '华为MateBook X Pro 深空灰正面',
        imgUrl: 'https://example.com/images/huawei-matebook-gray-front.jpg',
        skuId: 23,
        spuImgId: 15,
      },
      {
        id: 81,
        imgName: '华为MateBook X Pro 深空灰背面',
        imgUrl: 'https://example.com/images/huawei-matebook-gray-back.jpg',
        skuId: 23,
        spuImgId: 15,
      },
      {
        id: 82,
        imgName: '华为MateBook X Pro 深空灰侧面',
        imgUrl: 'https://example.com/images/huawei-matebook-gray-side.jpg',
        skuId: 23,
        spuImgId: 15,
      },
      {
        id: 83,
        imgName: '华为MateBook X Pro 屏幕',
        imgUrl: 'https://example.com/images/huawei-matebook-screen.jpg',
        skuId: 23,
        spuImgId: 15,
      }
    ],
    skuAttrValueList: [
      {
        id: 89,
        attrId: 20,
        valueId: 50,
        skuId: 23,
        attrName: '配置',
        valueName: 'i7+16GB+1TB',
      },
      {
        id: 90,
        attrId: 21,
        valueId: 52,
        skuId: 23,
        attrName: '颜色',
        valueName: '深空灰',
      },
      {
        id: 91,
        attrId: 144,
        valueId: 145,
        skuId: 23,
        attrName: '屏幕',
        valueName: '13.9英寸3K触控',
      },
      {
        id: 92,
        attrId: 145,
        valueId: 146,
        skuId: 23,
        attrName: '处理器',
        valueName: 'Intel i7',
      }
    ],
  },

  // 新增SKU数据 - 红楼梦 (SPU ID: 15)
  {
    id: 24,
    spuId: 15,
    price: 128,
    stock: 80,
    skuName: '红楼梦 精装珍藏版',
    skuDesc: '曹雪芹经典名著 精装珍藏版',
    weight: '1.8',
    isSale: 1,
    skuImageList: [
      {
        id: 84,
        imgName: '红楼梦 精装珍藏版封面',
        imgUrl: 'https://example.com/images/hongloumeng-hardcover-cover.jpg',
        skuId: 24,
        spuImgId: 17,
      },
      {
        id: 85,
        imgName: '红楼梦 精装珍藏版书脊',
        imgUrl: 'https://example.com/images/hongloumeng-hardcover-spine.jpg',
        skuId: 24,
        spuImgId: 17,
      },
      {
        id: 86,
        imgName: '红楼梦 精装珍藏版内页',
        imgUrl: 'https://example.com/images/hongloumeng-hardcover-inside.jpg',
        skuId: 24,
        spuImgId: 17,
      }
    ],
    skuAttrValueList: [
      {
        id: 93,
        attrId: 23,
        valueId: 56,
        skuId: 24,
        attrName: '版本',
        valueName: '精装珍藏版',
      },
      {
        id: 94,
        attrId: 146,
        valueId: 147,
        skuId: 24,
        attrName: '出版社',
        valueName: '中华书局',
      },
      {
        id: 95,
        attrId: 147,
        valueId: 148,
        skuId: 24,
        attrName: '版本类型',
        valueName: '校注本',
      },
      {
        id: 96,
        attrId: 148,
        valueId: 149,
        skuId: 24,
        attrName: '插图',
        valueName: '彩色插图',
      }
    ],
  },

  // 新增SKU数据 - 三国演义 (SPU ID: 16)
  {
    id: 25,
    spuId: 16,
    price: 98,
    stock: 60,
    skuName: '三国演义 线装版',
    skuDesc: '罗贯中历史小说 线装版',
    weight: '1.5',
    isSale: 1,
    skuImageList: [
      {
        id: 87,
        imgName: '三国演义 线装版封面',
        imgUrl: 'https://example.com/images/sanguo-thread-cover.jpg',
        skuId: 25,
        spuImgId: 18,
      },
      {
        id: 88,
        imgName: '三国演义 线装版书脊',
        imgUrl: 'https://example.com/images/sanguo-thread-spine.jpg',
        skuId: 25,
        spuImgId: 18,
      },
      {
        id: 89,
        imgName: '三国演义 线装版内页',
        imgUrl: 'https://example.com/images/sanguo-thread-inside.jpg',
        skuId: 25,
        spuImgId: 18,
      }
    ],
    skuAttrValueList: [
      {
        id: 97,
        attrId: 24,
        valueId: 58,
        skuId: 25,
        attrName: '装帧',
        valueName: '线装版',
      },
      {
        id: 98,
        attrId: 149,
        valueId: 150,
        skuId: 25,
        attrName: '出版社',
        valueName: '人民文学出版社',
      },
      {
        id: 99,
        attrId: 150,
        valueId: 151,
        skuId: 25,
        attrName: '特色',
        valueName: '传统线装工艺',
      },
      {
        id: 100,
        attrId: 151,
        valueId: 152,
        skuId: 25,
        attrName: '收藏价值',
        valueName: '具有收藏价值',
      }
    ],
  },

  // 新增SKU数据 - 美赞臣蓝臻奶粉 (SPU ID: 18)
  {
    id: 26,
    spuId: 18,
    price: 359,
    stock: 150,
    skuName: '美赞臣蓝臻奶粉 1段 800g',
    skuDesc: '美赞臣蓝臻婴幼儿奶粉 1段 800g',
    weight: '0.8',
    isSale: 1,
    skuImageList: [
      {
        id: 90,
        imgName: '美赞臣蓝臻奶粉 1段正面',
        imgUrl: 'https://example.com/images/meizanchen-1-front.jpg',
        skuId: 26,
        spuImgId: 20,
      },
      {
        id: 91,
        imgName: '美赞臣蓝臻奶粉 1段背面',
        imgUrl: 'https://example.com/images/meizanchen-1-back.jpg',
        skuId: 26,
        spuImgId: 20,
      },
      {
        id: 92,
        imgName: '美赞臣蓝臻奶粉 1段侧面',
        imgUrl: 'https://example.com/images/meizanchen-1-side.jpg',
        skuId: 26,
        spuImgId: 20,
      }
    ],
    skuAttrValueList: [
      {
        id: 101,
        attrId: 27,
        valueId: 65,
        skuId: 26,
        attrName: '段位',
        valueName: '1段',
      },
      {
        id: 102,
        attrId: 28,
        valueId: 68,
        skuId: 26,
        attrName: '规格',
        valueName: '800g',
      },
      {
        id: 103,
        attrId: 152,
        valueId: 153,
        skuId: 26,
        attrName: '特色成分',
        valueName: '含乳铁蛋白',
      },
      {
        id: 104,
        attrId: 153,
        valueId: 154,
        skuId: 26,
        attrName: '适用年龄',
        valueName: '0-6个月',
      }
    ],
  },

  // 新增SKU数据 - 美的空调 (SPU ID: 20)
  {
    id: 27,
    spuId: 20,
    price: 2899,
    stock: 25,
    skuName: '美的空调 KFR-26GW 1匹',
    skuDesc: '美的智能变频空调 1匹 新一级能效',
    weight: '25',
    isSale: 1,
    skuImageList: [
      {
        id: 93,
        imgName: '美的空调 1匹室内机',
        imgUrl: 'https://example.com/images/midea-ac-1p-indoor.jpg',
        skuId: 27,
        spuImgId: 22,
      },
      {
        id: 94,
        imgName: '美的空调 1匹室外机',
        imgUrl: 'https://example.com/images/midea-ac-1p-outdoor.jpg',
        skuId: 27,
        spuImgId: 22,
      },
      {
        id: 95,
        imgName: '美的空调 1匹遥控器',
        imgUrl: 'https://example.com/images/midea-ac-1p-remote.jpg',
        skuId: 27,
        spuImgId: 22,
      }
    ],
    skuAttrValueList: [
      {
        id: 105,
        attrId: 30,
        valueId: 73,
        skuId: 27,
        attrName: '匹数',
        valueName: '1匹',
      },
      {
        id: 106,
        attrId: 154,
        valueId: 155,
        skuId: 27,
        attrName: '能效等级',
        valueName: '新一级能效',
      },
      {
        id: 107,
        attrId: 155,
        valueId: 156,
        skuId: 27,
        attrName: '智能控制',
        valueName: '支持APP控制',
      },
      {
        id: 108,
        attrId: 156,
        valueId: 157,
        skuId: 27,
        attrName: '适用面积',
        valueName: '10-15㎡',
      }
    ],
  }
];


// 基础销售属性数据
const baseSaleAttrList = [
  { id: 1, name: "颜色" },
  { id: 2, name: "版本" },
  { id: 3, name: "存储" },
  { id: 4, name: "内存组合" },
  { id: 5, name: "配置" },
  { id: 6, name: "段位" },
  { id: 7, name: "规格" },
  { id: 8, name: "匹数" },
  { id: 9, name: "套机配置" },
  { id: 10, name: "装帧" }
]

// 导出Mock配置数组（保持不变，与之前相同）
export default [

  // 获取品牌列表
  {
    url: '/admin/product/baseTrademark/getTrademarkList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: trademarkList,
        message: '获取成功',
        ok: true,
      }
    },
  },

  // 获取SPU图片列表
  {
    url: '/admin/product/spuImageList/:spuId',
    method: 'get',
    response: (request) => {
      const spuId = Number(request.url.split('/').pop())
      // 从spuList中查找SPU
      const allSpus = Object.values(spuList).flat()
      const spu = allSpus.find((item) => item.id === spuId)
      const imageList = spu?.spuImageList || []
      return {
        code: 200,
        data: imageList,
        message: '获取成功',
        ok: true,
      }
    },
  },

  // 获取SPU销售属性
  {
    url: '/admin/product/spuSaleAttrList/:spuId',
    method: 'get',
    response: (request) => {
      const spuId = Number(request.url.split('/').pop())
      // 从spuList中查找SPU
      const allSpus = Object.values(spuList).flat()
      const spu = allSpus.find((item) => item.id === spuId)
      const saleAttrList = spu?.spuSaleAttrList || []
      return {
        code: 200,
        data: saleAttrList,
        message: '获取成功',
        ok: true,
      }
    },
  },

  // 更简单的参数获取方式
  {
    url: '/admin/product/findBySpuId/:spuId',
    method: 'get',
    response: (req) => {
      // 直接从 URL 中提取 spuId
      const url = req.url || '';
      const spuIdStr = url.split('/').pop(); // 获取最后一个路径参数
      const spuId = Number(spuIdStr);

      console.log('请求URL:', url);
      console.log('提取的SPU ID字符串:', spuIdStr);
      console.log('转换后的SPU ID:', spuId);

      if (!spuId || isNaN(spuId)) {
        return {
          code: 400,
          data: null,
          message: `SPU ID 参数错误: ${spuIdStr}`,
          ok: false,
        }
      }

      const skuData = skuList.filter(sku => sku.spuId === spuId);

      return {
        code: 200,
        data: skuData,
        message: '获取成功',
        ok: true,
      }
    },
  },


  // 修正SPU列表接口的分页逻辑，确保返回条数与请求一致
  {
    url: '/admin/product/:page/:limit',
    method: 'get',
    response: (request) => {
      // 解析参数（兼容数字/字符串类型）
      const page = Number(request.params?.page) || 1;
      const limit = Number(request.params?.limit) || 10;
      const category3Id = Number(request.query?.category3Id);

      // 校验分页参数有效性（确保为正整数）
      const validPage = Math.max(1, Math.floor(page));
      const validLimit = Math.max(1, Math.floor(limit));

      // 获取目标分类下的所有SPU（确保分类存在）
      const allSpus = spuList[category3Id] ? [...spuList[category3Id]] : [];
      const total = allSpus.length;

      // 计算分页索引（核心修正：确保endIndex不超出数组长度）
      const startIndex = (validPage - 1) * validLimit;
      const endIndex = Math.min(startIndex + validLimit, total); // 限制endIndex最大为数组长度
      const paginatedSpus = allSpus.slice(startIndex, endIndex);

      // 验证返回条数是否与请求一致（最后一页可能不足）
      const actualSize = paginatedSpus.length;

      return {
        code: 200,
        message: '获取SPU列表成功',
        ok: true,
        data: {
          records: paginatedSpus,
          total: total,
          size: validLimit, // 始终返回请求的条数（前端展示用）
          current: validPage,
          searchCount: true,
          pages: Math.ceil(total / validLimit)
        }
      }
    }
  },

  // 添加/更新SPU
  {
    url: '/admin/product/saveSpuInfo',
    method: 'post',
    response: ({ body }) => {
      const allSpus = Object.values(spuList).flat()

      if (body.id) {
        // 更新SPU
        const category3Id = body.category3Id
        if (spuList[category3Id]) {
          const index = spuList[category3Id].findIndex((item) => item.id === body.id)
          if (index !== -1) {
            spuList[category3Id][index] = {
              ...spuList[category3Id][index],
              ...body,
              spuImageList: body.spuImageList || spuList[category3Id][index].spuImageList,
              spuSaleAttrList: body.spuSaleAttrList || spuList[category3Id][index].spuSaleAttrList,
            }
          }
        }
      } else {
        // 添加新SPU
        const newSpu = {
          ...body,
          id: Date.now(),
          spuImageList: body.spuImageList || [],
          spuSaleAttrList: body.spuSaleAttrList || [],
        }
        const category3Id = body.category3Id
        if (!spuList[category3Id]) {
          spuList[category3Id] = []
        }
        spuList[category3Id].push(newSpu)
      }

      return {
        code: 200,
        data: null,
        message: '保存成功',
        ok: true,
      }
    },
  },
  // 更新SPU
  {
    url: '/admin/product/updateSpuInfo',
    method: 'post',
    response: ({ body }) => {
      const allSpus = Object.values(spuList).flat()
      const category3Id = body.category3Id

      if (spuList[category3Id]) {
        const index = spuList[category3Id].findIndex((item) => item.id === body.id)
        if (index !== -1) {
          spuList[category3Id][index] = {
            ...spuList[category3Id][index],
            ...body,
            spuImageList: body.spuImageList || spuList[category3Id][index].spuImageList,
            spuSaleAttrList: body.spuSaleAttrList || spuList[category3Id][index].spuSaleAttrList,
          }
        }
      }

      return {
        code: 200,
        data: null,
        message: '更新成功',
        ok: true,
      }
    },
  },
  // 删除SPU
  {
    url: '/admin/product/deleteSpu/:spuId',
    method: 'delete',
    response: (request) => {
      const spuId = Number(request.url.split('/').pop())

      // 遍历所有分类删除SPU
      for (const category3Id in spuList) {
        const index = spuList[category3Id].findIndex((item) => item.id === spuId)
        if (index !== -1) {
          spuList[category3Id].splice(index, 1)
          break
        }
      }

      return {
        code: 200,
        data: null,
        message: '删除成功',
        ok: true,
      }
    },
  },
  // 获取基础销售属性
  {
    url: '/admin/product/baseSaleAttrList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: baseSaleAttrList,
        message: '获取成功',
        ok: true,
      }
    },
  },


  // 添加SKU
  {
    url: '/admin/product/saveSkuInfo',
    method: 'post',
    response: ({ body }) => {
      const spuId = body.spuId;

      // 生成新的 SKU ID
      const newSkuId = Math.max(...skuList.map(sku => sku.id), 0) + 1;

      const newSku = {
        ...body,
        id: newSkuId,
        skuName: body.skuName || `SKU-${newSkuId}`,
        price: body.price || 0,
        weight: body.weight || "0g",
        skuDesc: body.skuDesc || "",
        skuDefaultImg: body.skuDefaultImg || "",
        category3Id: body.category3Id || 0,
        tmId: body.tmId || 0,
        skuAttrValueList: body.skuAttrValueList || [],
        skuSaleAttrValueList: body.skuSaleAttrValueList || []
      };

      // 直接添加到 skuList 数组中
      skuList.push(newSku);

      return {
        code: 200,
        data: null,
        message: '添加SKU成功',
        ok: true,
      };
    },
  }
]