# vue-template2.0

使用 `vue 2.6.14` `vue-i18n` `vuex 3.4.0` `webpack 4` `vue cli 4.5` `eslint` `less 3` 搭建的 vue 2 系统管理项目模板。

## 安装依赖
```
npm install
```

### 启动服务
```
npm run serve
```

### 构架应用
```
npm run build
```

### 使用eslint校验格式
```
npm run lint
```

### 项目目录：
- common-resources // 公共资源库，可作为git 子仓库 与其它应用一起共用
- src
  - api // 请求层
  - assets // 静态资源
  - common // 当前应用的公共资源
  - components // 封装的组件
  - icons // svg图片使用
  - plugins // 第三方插件引用
  - router // 路由
  - store // vuex 仓库
  - styles // 全局样式
  - utils // 封装的工具和方法
  - views // 视图层

