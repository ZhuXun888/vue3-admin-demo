<template>
  <div class="layout_container ">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ fold: LayoutSettingStore.fold }">
      <logo></logo>
      <!-- 展示菜单 -->
      <!-- 滚动组件：滚动组件，用于处理滚动条，使其在滚动时保持可见 <el-scrollbar/> -->
      <el-scrollbar class="scrollbar">
        <!-- 菜单组件 -->
        <!-- <el-menu/> 表示菜单     
          <el-menu-item/> 表示菜单的一项      
          :collapse="true"：折叠菜单 
          :default-active="$route.path"  能够实现页面刷新信后，仍显示原来浏览的页面（路由组件），不论是一级还是二级三级，会自动展开到原来的菜单项-->
        <el-menu :collapse="LayoutSettingStore.fold" background-color="#001529" text-color="white"
          :default-active="$route.path">
          <!-- 更具路由动态生成菜单 -->
          <Menu :menuList="userStore.menuRoutes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabber" :class="{ fold: LayoutSettingStore.fold }">
      <!-- 封装一个组件，专门展示顶部导航栏 -->
      <Tabbar></Tabbar>
    </div>
    <!-- 内容（二级路由）展示区域 -->
    <div class="layout_main" :class="{ fold: LayoutSettingStore.fold }">
      <Main></Main>
    </div>
  </div>

</template>

<script lang="ts" setup>
// 引入路由对象
import { useRoute } from 'vue-router';
// 获取路由对象
// $router  用来操作路由对象的
// $route   用来获取路由信息的，操作路由对象中的属性

//引入左侧菜单logo子组件
import logo from '@/layout/logo/index.vue'
//引入菜单组件
import Menu from '@/layout/menu/index.vue'
//右侧内容展示区
import Main from '@/layout/main/index.vue'
//引入顶部导航子组件
import Tabbar from '@/layout/tabbar/index.vue'
//引入用户模块store，用于获取菜单数据
import useUserStore from '@/store/modules/user';
//引入layout模块store
import useLayoutSettingStore from '@/store/modules/setting';
let LayoutSettingStore = useLayoutSettingStore()//获取layout模块store实例

const userStore = useUserStore()//获取用户模块store实例
console.log(userStore)

const $route = useRoute()
console.log($route.path)

</script>

<script lang="ts">
export default {
  name: 'Layout'
}
</script>

<style scoped lang="scss">
.layout_container {
  width: 100%; //全屏宽度
  height: 100vh; //全屏高度



  .layout_slider {
    width: $base-menu-width; //用全局变量，方便日后维护
    height: 100vh;
    background: $base-menu-bg;
    //如果不写下面两行代码，那么菜单就会撑开左侧组件，菜单内容溢出容器
    overflow: hidden; // 新增：防止内容溢出容器
    box-sizing: border-box; // 新增：包含padding在尺寸内
    color: white;
    transition: all 0.3s; //添加过渡效果-----注意：过度只能添加在这里，添加在folf时，只有折叠时才生效，因为当fold为true时，才添加fold样式；过度添加在.layout_container也无效

    &.fold {
      width: $base-menu-min-width;
    }

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);

      .el-menu {
        border-right: none;

      }
    }
  }

  .layout_tabber {
    position: fixed; // 固定定位：脱离文档流，相对于浏览器窗口定位,顶部导航位置不会变
    /*- 参考点：浏览器窗口（viewport）
      - 滚动行为：固定不动，不随页面滚动
      - 文档流：脱离文档流，不占据空间
      - 使用场景：固定导航栏、悬浮按钮、侧边栏*/
    top: 0;
    left: $base-menu-width;
    width: calc(100% - $base-menu-width); //calc() ：当使用固定宽度的侧边栏时，可以用 calc() 来计算剩余区域的宽度。
    height: $base-tabber-height;
    background: bisque;
    transition: all 0.3s;

    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;

    }
  }

  //下面的写法有bug
  // .layout_main {
  //   position: relative;//相对定位
  //   /*- 参考点：自身原位置 / 正常文档流
  //     - 滚动行为：随页面滚动
  //     - 文档流：保持在文档流中，占据空间
  //     - 使用场景：作为定位容器、位置微调 */
  //   left: $base-menu-width;
  //   top: $base-tabber-height;
  //   width: calc(100% - $base-menu-width);
  //   height: calc(100vh - $base-tabber-height);
  //   background: yellow;
  // }

  .layout_main {
    position: absolute; //绝对定位
    /*- 参考点：最近的已定位祖先元素(.layout_container)
      - 滚动行为：在容器内滚动
      - 文档流：脱离文档流，不占据空间
      - 使用场景：精确控制位置 */
    left: $base-menu-width;
    top: $base-tabber-height;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    // background: yellow;
    padding: 20px;
    overflow: auto; //auto内容超出容器时自动显示滚动条，不超出时不显示
    transition: all 0.3s;

    /*overflow 是 CSS 中控制元素内容溢出时如何显示的属性。
      属性值有：
          - auto：内容超出容器时自动显示滚动条，不超出时不显示
          - hidden：裁剪溢出内容，不可见也不可滚动
          - scroll：始终显示滚动条（即使内容未溢出）
          - visible：内容溢出时不裁剪，会显示在容器外部
 */
    &.fold {
      width: calc(100vw - $base-menu-min-width);
      left: $base-menu-min-width;

    }
  }
}
</style>