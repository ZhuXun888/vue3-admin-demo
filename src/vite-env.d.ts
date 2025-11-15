// src/vite-env.d.ts
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svg-icons/client" />

// 声明虚拟模块
declare module 'virtual:svg-icons-register' {
  const component: any;
  export default component;
}