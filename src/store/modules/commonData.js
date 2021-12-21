const state = {
  userInfo: undefined
};

const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data.userInfo;
    // userInfo存入localStorage
    window.setLocal("userInfo", data.userInfo);
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
