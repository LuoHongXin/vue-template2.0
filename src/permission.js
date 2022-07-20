import router from "./router";
import store from "./store";
router.beforeEach(async (to, from, next) => {
  if (to.name === "login") {
    initLogin();
    next();
    return;
  }
  // 检查登录是否失效
  // const hasToken = await store.dispatch("user/setSession");
  const hasToken = true;
  if (hasToken) {
    if (judgeRoute()) {
      next();
    } else {
      store.getters.VueInstance.$YMessage.warn("无权访问！");
    }
    return;
  } else {
    next({ name: "login", query: { redirect: to.path } });
  }
});

// 初始化登录
async function initLogin() {
  store.commit("user/SET_USER_INFO", null); // 清空用户信息
}
// 判断是否有权限跳转
function judgeRoute(route) {
  console.log(route);
  return true;
}
