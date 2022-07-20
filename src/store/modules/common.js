const state = {
  VueInstance: null, // vue 实例
  iframeInfo: { type: null, data: null } // iframe 通讯信息
};
const mutations = {
  // 在 vuex 中设置 vue 实例
  SET_VUE_INSTANCE: (state, data) => {
    state.VueInstance = data;
  },
  SET_IFRAMEINFO(state, data) {
    state.iframeInfo = data;
    window.setLocal("iframeInfo", data);
  }
};
const actions = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
