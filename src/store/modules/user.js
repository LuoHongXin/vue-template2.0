import { checkSession, logout, login } from "@/api/user";

const state = {
  userInfo: {}, // 用户信息
  isApp: false // 判断当前页面为子应用
};

const mutations = {
  SET_IS_APP(state, value) {
    state.isApp = value;
  },
  SET_USER: (state, payload) => {
    state.userInfo = payload;
  }
};

const actions = {
  // 登录
  userLogin({}, userInfo) {
    login(userInfo);
  },

  setSession({}) {
    return new Promise((resolve, reject) => {
      checkSession()
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          if (error.message === "Request failed with status code 401") {
            resolve(false);
          }
        });
    });
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
