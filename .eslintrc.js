module.exports = {
  root: true,
  env: {
    browser: true, // 浏览器全局变量
    node: true, // Node.js 全局变量和 Node.js 作用域
    es6: true // 启用 ES6 语法支持以及新的 ES6 全局变量或类型
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint", // 使用babel进行编译,解决import报错：error  Parsing error: Unexpected token import
    sourceType: "module"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-v-html": 0, // v-html：会有xss风险、会覆盖子组件
    "complexity": [0, 11], //循环复杂度
    "eqeqeq": 2, //必须使用全等
    "func-names": 0, //函数表达式必须有名字
    "semi": [2, "always"], //语句强制分号结尾
    "semi-spacing": [
      0,
      {
        before: false,
        after: true
      }
    ], //分号前后空格
    "no-useless-escape": 0, // 模板文字和正则表达式中的非特殊字符关闭
    "max-len": [0, 80, 4], //字符串最大长度
    "vue/name-property-casing": [2, "PascalCase"], // 组件必须设置name：PascalCase命名
    "vue/component-definition-name-casing": ["error", "PascalCase"] // 组件必须设置name且驼峰命名
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
