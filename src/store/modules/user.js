import { common } from "@/api";

const state = {
  userInfo: null
};

const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data;
    window.setLocal("userInfo", data);
  }
};

const actions = {
  // 获取用户信息
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      common
        .getLoginInfo()
        .then(response => {
          resolve(response);
          commit("SET_USER_INFO", response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  // 校验token是否过期
  setSession() {
    return new Promise(resolve => {
      common
        .checkSession()
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          console.log(error);
          resolve(false);
        });
    });
  },
  // 登录
  login(context, data) {
    return new Promise((resolve, reject) => {
      common
        .login(data)
        .then(res => {
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // 退出登录
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      common
        .logout()
        .then(() => {
          commit("menu/SET_MENU_LIST", [], { root: true }); // 退出时把菜单的数据清空，重新登录重新获取
          history.pushState(null, "#/app-vue-login", "#/app-vue-login");
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
