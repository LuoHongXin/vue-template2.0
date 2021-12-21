/**
 * 公共引入，勿随意修改，修改时需要经过确认
 * **/
import Vue from "vue";
import "./antd";
import "./whComponent";
import "./vCharts";
import "@/icons"; // icon
import myComponents from "@/utils"; /* 按需引入UI组件及全局方法 */
import mixins from "@/mixins"; // 引入全局mixins

//Less 主题
import "@/theme/index.less";

// css
import "@/styles/index.less"; // global css
import "animate.css/source/animate.css";
import "normalize.css/normalize.css"; // a modern alternative to CSS resets

Vue.use(myComponents);
Vue.mixin(mixins);
