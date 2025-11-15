// import js from "@eslint/js";
// import globals from "globals";
// import tseslint from "typescript-eslint";
// import pluginVue from "eslint-plugin-vue";
// import { defineConfig } from "eslint/config";

// export default defineConfig([
//   { files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
//   tseslint.configs.recommended,
//   pluginVue.configs["flat/essential"],
//   { files: ["**/*.vue"], languageOptions: { parserOptions: { parser: tseslint.parser } } },
// ]);


// eslint.config.js

/**
 * ESLint 扁平化配置文件 (ESLint v9+)
 * 此配置用于 Vue 3 + TypeScript 项目
 */

// ========== 导入必要的模块和插件 ==========
import globals from 'globals'                    // 提供全局变量定义（如 browser、node 等环境变量）
import pluginJs from '@eslint/js'                // ESLint 官方 JavaScript 规则
import tseslint from 'typescript-eslint'         // TypeScript ESLint 插件和解析器
import pluginVue from 'eslint-plugin-vue'        // Vue.js ESLint 插件
import commpnParser from 'vue-eslint-parser'     // Vue 文件解析器，用于解析 .vue 文件
import prettier from 'eslint-plugin-prettier'    // Prettier 代码格式化插件

// ========== 导出配置数组 ==========
export default [
  // ========== 配置1: 基础配置和忽略文件设置 ==========
  {
    /**
     * 名称: 基础配置
     * 作用: 设置全局的语言选项和忽略文件
     * 范围: 影响所有后续配置
     */
    name: 'base-config',

    // 忽略的文件和目录模式
    ignores: [
      '**/*.config.js',          // 忽略所有配置文件
      'dist/**',                 // 忽略构建输出目录
      'node_modules/**',         // 忽略依赖包目录
      'coverage/**',             // 忽略测试覆盖率报告
      '*.min.js',                // 忽略压缩后的 JS 文件
      '!**/eslint.config.js',    // 但包含 ESLint 配置文件本身（! 表示不忽略）
    ],

    // 语言选项配置
    languageOptions: {
      /**
       * 全局变量配置
       * globals.browser: 提供浏览器环境全局变量（window、document、console 等）
       * 可以根据需要添加其他环境变量，如 node、es2021 等
       */
      globals: {
        ...globals.browser,      // 浏览器环境全局变量
        ...globals.es2021,       // ES2021 全局变量
        ...globals.node,         // Node.js 环境全局变量（如果项目中也使用 Node API）
      },

      /**
       * 主解析器：用于解析 .vue 文件
       * vue-eslint-parser 专门用于解析 Vue 单文件组件
       */
      parser: commpnParser,

      // 解析器选项
      parserOptions: {
        ecmaVersion: 'latest',           // 使用最新的 ECMAScript 版本
        sourceType: 'module',            // 使用 ES 模块语法
        /**
         * 对于 .vue 文件中的 <script> 块，使用 TypeScript 解析器
         * 这样可以在 Vue 文件中获得 TypeScript 支持
         */
        parser: '@typescript-eslint/parser',

        // JSX 相关配置（如果项目中使用 JSX）
        jsxPragma: 'React',
        ecmaFeatures: {
          jsx: true,                     // 启用 JSX 语法支持
          impliedStrict: true,           // 隐式严格模式
        },
      },
    },
  },

  // ========== 配置2: 纯 JavaScript 文件规则 ==========
  {
    name: 'javascript-files',

    // 仅对 JavaScript 文件生效
    files: ['**/*.{js,mjs,cjs,jsx}'],

    /**
     * 扩展 ESLint 官方推荐的 JavaScript 规则
     * 包含：
     * - 可能的错误规则
     * - 最佳实践规则
     * - 变量相关规则
     * - Node.js 规则
     * - ES6+ 规则
     * - 严格模式规则
     */
    ...pluginJs.configs.recommended,

    // JavaScript 特定的自定义规则
    rules: {
      /**
       * 覆盖或扩展推荐配置中的规则
       * 这里可以针对纯 JS 文件进行特殊配置
       */
      'no-unused-vars': 'warn',          // JS 文件中未使用变量警告（非错误）
    },
  },

  // ========== 配置3: TypeScript 文件规则 ==========
  {
    name: 'typescript-files',

    // 仅对 TypeScript 文件生效
    files: ['**/*.{ts,tsx,mts,cts}'],

    /**
     * 扩展 TypeScript ESLint 推荐配置
     * 包含：
     * - TypeScript 特定规则
     * - 类型检查相关规则
     * - 与 JavaScript 规则对应的 TypeScript 版本规则
     */
    ...tseslint.configs.recommended,

    // TypeScript 特定的自定义规则
    rules: {
      /**
       * TypeScript 规则说明：
       * - 以 @typescript-eslint/ 开头的规则是 TypeScript 特定规则
       * - 这些规则通常比对应的 ESLint 规则更智能，能理解 TypeScript 类型
       */
      '@typescript-eslint/no-unused-vars': 'error',      // TypeScript 未使用变量报错
      '@typescript-eslint/no-explicit-any': 'warn',      // 使用 any 类型时警告
      '@typescript-eslint/no-non-null-assertion': 'warn', // 非空断言操作符警告
    },
  },

  // ========== 配置4: Vue 文件规则 ==========
  {
    name: 'vue-files',

    // 仅对 .vue 文件生效
    files: ['**/*.vue'],

    /**
     * 扩展 Vue ESLint 基础配置
     * flat/essential 包含：
     * - Vue 模板相关规则
     * - 脚本部分基础规则
     * - 样式部分基础规则
     * - 优先级 A：错误预防（Essential）
     */
    ...pluginVue.configs['flat/essential'],

    // Vue 特定的自定义规则
    rules: {
      /**
       * Vue 特定规则说明：
       * - 以 vue/ 开头的规则是 Vue 特定规则
       * - 这些规则专门针对 Vue 单文件组件的各种特性
       */
      'vue/multi-word-component-names': 'off',           // 允许单名单词组件名
      'vue/no-mutating-props': 'warn',                   // 修改 props 时警告
      'vue/attribute-hyphenation': 'off',                // 不强制属性名使用连字符
    },
  },

  // ========== 配置5: 全局自定义规则（应用到所有文件类型） ==========
  {
    name: 'global-custom-rules',

    // 应用到所有 JavaScript、TypeScript 和 Vue 文件
    files: ['**/*.{js,jsx,ts,tsx,vue}'],

    // 注册 Prettier 插件
    plugins: {
      prettier: prettier,  // 启用 prettier 插件，用于代码格式化
    },

    // 全局规则配置
    rules: {
      // ========== ESLint 基础规则 ==========
      /**
       * 变量声明规则
       */
      'no-var': 'error',                                  // 强制使用 let 或 const，禁止 var
      'prefer-const': 'error',                            // 建议使用 const 声明不会重新赋值的变量

      /**
       * 代码格式规则
       */
      'no-multiple-empty-lines': ['warn', { max: 1 }],    // 最多允许连续 1 个空行
      'no-unexpected-multiline': 'error',                 // 禁止令人困惑的多行表达式
      'no-useless-escape': 'off',                         // 关闭不必要的转义字符检查

      /**
       * 开发工具规则（根据环境动态配置）
       */
      'no-console': process.env.NODE_ENV === 'production'
        ? 'error'         // 生产环境：禁止 console
        : 'warn',         // 开发环境：警告 console

      'no-debugger': process.env.NODE_ENV === 'production'
        ? 'error'         // 生产环境：禁止 debugger
        : 'warn',         // 开发环境：警告 debugger

      // ========== TypeScript 规则覆盖 ==========
      /**
       * 关闭基础 ESLint 的规则，使用 TypeScript 特定规则
       * 因为 TypeScript 规则能理解类型信息，更准确
       */
      'no-unused-vars': 'off',                           // 关闭基础未使用变量检查
      '@typescript-eslint/no-unused-vars': 'error',      // 使用 TypeScript 的未使用变量检查

      /**
       * TypeScript 特定规则配置
       */
      '@typescript-eslint/prefer-ts-expect-error': 'error', // 推荐使用 @ts-expect-error 而不是 @ts-ignore
      '@typescript-eslint/no-explicit-any': 'off',         // 不禁止使用 any 类型（有时需要）
      '@typescript-eslint/no-namespace': 'off',            // 允许使用命名空间
      '@typescript-eslint/semi': 'off',                    // 不强制分号（由 Prettier 处理）

      // ========== Vue 规则覆盖 ==========
      /**
       * Vue 特定规则配置
       */
      'vue/script-setup-uses-vars': 'error',              // 确保 <script setup> 中使用的变量在模板中不被标记为未使用
      'vue/multi-word-component-names': 'off',            // 允许单名单词组件名（兼容旧代码）
      'vue/no-mutating-props': 'off',                     // 不禁止修改 props（有时需要）
      'vue/attribute-hyphenation': 'off',                 // 不强制属性名使用连字符

      // ========== Prettier 集成规则 ==========
      /**
       * Prettier 规则：将 Prettier 的格式问题作为 ESLint 错误报告
       * 这样可以通过 ESLint 自动修复代码格式问题
       */
      'prettier/prettier': 'error',                       // 将 Prettier 规则作为 ESLint 错误
    },
  },

  // ========== 配置6: TypeScript 文件额外规则 ==========
  {
    name: 'typescript-extra-rules',

    // 仅对 TypeScript 文件生效
    files: ['**/*.{ts,tsx}'],

    rules: {
      /**
       * TypeScript 文件的额外严格规则
       * 这些规则只在 TypeScript 文件中启用，因为需要类型信息
       */
      '@typescript-eslint/explicit-function-return-type': 'off',    // 不要求显式函数返回类型
      '@typescript-eslint/explicit-module-boundary-types': 'off',   // 不要求导出函数的返回类型
      '@typescript-eslint/strict-boolean-expressions': 'off',       // 不强制严格的布尔表达式
    },
  },

  // ========== 配置7: Vue 文件额外规则 ==========
  {
    name: 'vue-extra-rules',

    // 仅对 .vue 文件生效
    files: ['**/*.vue'],

    rules: {
      /**
       * Vue 文件的额外规则
       * 这些规则专门针对 Vue 3 的 Composition API 和 <script setup> 语法
       */
      'vue/require-default-prop': 'off',                  // 不要求 props 有默认值
      'vue/require-prop-types': 'off',                    // 不要求 props 有类型定义
      'vue/no-v-html': 'warn',                            // 使用 v-html 时警告（安全考虑）
    },
  },

  // ========== 配置8: 测试文件特殊规则 ==========
  {
    name: 'test-files',

    // 对测试文件应用宽松的规则
    files: [
      '**/*.test.{js,ts,jsx,tsx}',
      '**/*.spec.{js,ts,jsx,tsx}',
      '**/tests/**/*.{js,ts,jsx,tsx}',
      '**/__tests__/**/*.{js,ts,jsx,tsx}',
    ],

    rules: {
      /**
       * 测试文件中放宽一些规则
       * 因为测试代码可能有不同的模式和需求
       */
      'no-console': 'off',                                // 测试中允许 console
      'no-debugger': 'off',                               // 测试中允许 debugger
      '@typescript-eslint/no-explicit-any': 'off',        // 测试中允许使用 any
      'no-unused-vars': 'off',                            // 测试中关闭未使用变量检查
    },
  },
]