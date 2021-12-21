# Vue Antd admin 项目模板

基于 VUE CLI 工具生成的项目修改

## 文件结构

```bash
├── build # 构建相关
├── mock # 项目 mock 模拟数据
├── plop-templates # 基本模板
├── public # 静态资源
│ │── favicon.ico # favicon 图标
│ └── index.html # html 模板
├── src # 源代码
│ ├── api # 所有请求
│ ├── assets # 主题 字体等静态资源
│ ├── components # 全局公用组件
│ ├── directive # 全局指令
│ ├── filters # 全局 filter
│ ├── icons # 项目所有 svg icons
│ ├── lang # 国际化 language
│ ├── layout # 全局 layout
│ ├── router # 路由
│ ├── store # 全局 store 管理
│ ├── styles # 全局样式
│ ├── utils # 全局公用方法
│ ├── vendor # 公用 vendor
│ ├── views # views 所有页面
│ ├── App.vue # 入口页面
│ ├── main.js # 入口文件 加载组件 初始化等
│ └── permission.js # 权限管理
├── tests # 测试
├── .env.xxx # 环境变量配置
├── .eslintrc.js # eslint 配置项
├── ..eslintignore # eslint 忽视文件
├── .babelrc # babel-loader 配置
├── .travis.yml # 自动化 CI 配置
├── vue.config.js # vue-cli 配置
├── postcss.config.js # postcss 配置
└── package.json # package.json
```

## 环境变量

- ENV 环境模式
- BASE_URL 根路径
- VUE_APP_TITLE 应用标题
- VUE*APP*[...] 其他

### 项目安装

```bash
# 指定 npm 模块下载源
npm config set registry https://registry.npm.taobao.org

npm config set registry https://registry.npmjs.org

npm config set registry http://192.168.101.160:8081/repository/npm-group/

yarn config set registry http://192.168.101.160:8081/repository/npm-group/

npm install

```

mock 数据和后端请求接口如何共存

## 启动 Web 开发环境

```
npm run serve
```

## 打包

```
npm run build
```

## 测试

### 运行测试

```
npm run test
```

### 运行 Lints 和 修复文件

```
npm run lint
```

### 运行 e2e 测试

```
npm run test:e2e
```

### 运行单元测试

```bash
npm run test:unit
```

## 历史记录

1、echarts 问题

安装高版本出现报错
Module not found: Error: Can't resolve 'echarts/lib/visual/dataColor'

原因：v-charts 里面的 echarts-liquidfill 的版本是 2.0.2；

echarts 里面的 echarts-liquidfill 版本是 2.0.6；

npm i echart@4.1.0 v-charts@1.17.0 -S 或者 yarn add echart@4.1.0 v-charts@1.17.0

2021/1/28 新增 is-cidr 插件

yarn add is-cidr

问题：
当前验证方式规则 reg = /^([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){2}\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-4])\/([0-9]|[1-2][0-9]|3[0])\$/;

224 以上数字开头会提示格式不对，如：224.1.1.1/24

文档查看：https://github.com/silverwind/is-cidr#readme

2、处理"compression-webpack-plugin": "^7.1.2", 高版本报错
优雅降级"compression-webpack-plugin": "^5.0.1"  
···
npm uninstall compression-webpack-plugin --save
npm install compression-webpack-plugin@^5.0.1 --save
···

### 文档地址

https://www.yuque.com/zo5bgs/kpmh1b/qgqn1g/edit#B2n1Q

### 提交规范

代码每次提交 svn,请先执行 npm run lint 或者 yarn lint，保证代码风格统一。
