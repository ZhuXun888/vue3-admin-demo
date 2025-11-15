//用自定义插件来管理所有公共（全局）组件的引入和注册，以简化main.ts的代码量

// 引入项目中的全部全局组件
import SvgIcon from './SvgIcon/index.vue';
import Category from './Category/index.vue';
import *as ElementPlusIconsVue from '@element-plus/icons-vue';

//定义全局对象
const allQuanjuComponents = { SvgIcon, Category }; //把所有要注册的全局组件都放在这个对象中

//对外暴露插件对象----------------------------------不要忘了在main.ts中使用app.use(组件库插件对象)使用这个自定义插件
export default {
  //插件对象必须有一个install方法，务必叫做install
  install(app: any) {   //这里会把 Vue 应用实例app传递进来

    // app.component("svg-icon", SvgIcon);  //这样写就是一个一个地注册全局组件

    //注册多个组件：注册项目的全部组件
    Object.keys(allQuanjuComponents).forEach(key => {// Object.keys(allQuanjuComponents)-----拿到allQuanjuComponents对象中所有的key组成的数组
      //这里的key就是组件的名字，比如 SvgIcon
      const component = allQuanjuComponents[key as keyof typeof allQuanjuComponents]; //根据key获取对应的组件对象
      //可以在这里做一些额外的处理，比如自动注册等
      app.component(key, component); //注册全局组件
    });
    //将element-plus的图标注册为全局组件--方便以后要使用图表组件时可以直接使用，不用再一个个引入了
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {//Object.entries(ElementPlusIconsVue)-----拿到ElementPlusIconsVue对象中所有的key和value组成的数组
      app.component(key, component)
    }
  },
};