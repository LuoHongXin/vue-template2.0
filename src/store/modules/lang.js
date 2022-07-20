import { antdLangMap } from "@/common";
const state = {
  local: "zh_CN",
  antdConfigLocal: antdLangMap.zh_CN // antd 组件配置
};

const mutations = {
  SET_LANG_LOCAL: (state, value) => {
    state.local = value;
    if (state.VueInstance) {
      // 页面国际化切换
      state.VueInstance.$i18n.locale = value;
      // 切换wh组件库国际化
      state.VueInstance.$wci18n.locale = value;
    }
    // 切换antd组件库国际化
    state.antdConfigLocal = antdLangMap[value] || {};
    window.setLocal("lang", value);
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
