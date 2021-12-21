/*
 * @Author: luohongxin
 * @Date: 2020-09-22 14:11:59
 * @Last Modified by: luohongxin
 * @Last Modified time: 2020-09-22 14:11:59
 */

import * as filters from "../filters"; // global filters
import Popup from "@/components/Popup";
import loading from "@/components/Loading/index.js";
import VueI18nPlugin from "./i18n-extend";
import request from "./request";
import "./local";

export default {
  install: Vue => {
    // 绑定到vue实例的原型链上，这样可以在组件中直接调用this.$axios.get()，而不需要用import引入axios模块
    Vue.prototype.$axios = request;
    // 绑定到vue实例的原型链上
    Vue.prototype.$popup = Popup.install;
    // register global utility filters
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key]);
    });
    Vue.use(VueI18nPlugin);
    Vue.use(loading); // 全局使用loading
  }
};

// 全局使用loading 使用
// this.$loading.show(),  this.$loading.hide()
