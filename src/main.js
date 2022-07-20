import Vue from "vue";
import App from "./App.vue";
import vueRouter from "./router";
import store from "./store";

import "./permission";
import "@/plugins";

// 子应用全局样式
import "@/styles";

// 引入 i18n 和 lang 配置文件
import VueI18n from "vue-i18n";
import { lang } from "@/common";

import "@/icons"; // svg
import "@/utils/local"; // 挂载在Windows本地方法

let router = null;
let instance = null;
let i18n = null;
function render({ data = {}, container } = {}) {
  router = vueRouter;
  // 页面节点权限显示，如按钮权限
  Vue.directive("permission", {
    // 当被绑定的元素插入到 DOM 中时……
    inserted: (el, binding) => {
      if (!data.store) return;
      // el 当前绑定的元素 binding.value指令的绑定值
      let permissionList = data.store.getters.operationMenu;
      // 判断一下是否包含这个元素，如果不包含的话，那就让他爸爸元素把子元素扔进垃圾堆
      if (!permissionList.includes(binding.value)) {
        el.parentNode.removeChild(el);
      }
    }
  });

  Vue.use(VueI18n);
  //从localstorag中获取
  let locale = localStorage.getItem("lang") || "zh_CN";
  i18n = new VueI18n({
    locale, // 设置地区
    messages: lang // 设置地区信息
  });
  instance = new Vue({
    router,
    store,
    data: {
      parentVuex: data.store
    },
    i18n,
    render: h => h(App)
  }).$mount(
    container ? container.querySelector("#example-app") : "#example-app"
  );
  window.app = instance;
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("vue example-app bootstraped");
}

export async function mount(props) {
  console.log("props from main framework", props);
  render(props);
}

export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
  router = null;
}
