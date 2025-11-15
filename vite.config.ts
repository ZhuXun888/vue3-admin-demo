import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'  // 引入SVG图标插件 
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock' // 引入mock插件,否则无法配置，也无法使用

import DefineOptions from 'unplugin-vue-define-options/vite' // 导入插件--可用来获取组件的name属性，就不用再写双script标签了

// https://vite.dev/config/
export default defineConfig(({ command }) => {       //command 获取开发者环境的， 用来区分是开发环境还是生产环境
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        //将来要缓存的图标文件夹，用来存放SVG图标
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // symbolId格式配置，用来定义生成的SVG符号ID的命名规则
        symbolId: 'icon-[dir]-[name]',
      }),

      DefineOptions(), // 注册插件

      //配置mock插件
      viteMockServe({
        localEnabled: command === 'serve', //开发环境下启用mock功能，保证在开发阶段可以使用mock接口
        mockPath: './mock', // 新增：指定Mock文件所在目录（关键，确保能找到你的mock数据）
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src') //相对路径别名配置，使用 @ 代替 src 目录
      }
    },
    // 新增：添加代理配置，处理/api前缀
    //表面上代码层请求时路径还是带有/api的，为了代码能够运行必须携带/api，但是为了能够获取数据，要偷偷代理去掉/api，
    //这种方式既兼容了前端代码的既有逻辑（必须带 /api 才能跑起来），又解决了后端 / Mock 接口不认 /api 前缀的问题，
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5173', // 转发到本地Vite服务（Mock服务运行在此）
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '') // 去掉/api前缀，让Mock能识别原始路径
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 只注入全局变量文件，reset 在 index.scss 中手动导入
          additionalData: `@use "@/styles/variable.scss" as *;`
        },
      },
    }
  }
})
