import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins";
import "./permission"; // permission control

Vue.config.productionTip = false;

import { initI18n } from "@/utils/i18n";
const i18n = initI18n("CN", "US");

/**
 * 如果您不想使用模拟服务器
 * 你想用MockJs来模拟api
 * 可以执行:mockXHR()
 * 目前MockJs将用于生产环境，
 * 请在上线前删除!!!
 **/
// 通过环境变量来判断是否需要加载启用
if (process.env.NODE_ENV === "production") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
