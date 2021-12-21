import router from "./router";
import store from "./store";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
//import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

import { userDev } from "@/utils/account";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login", "/auth-redirect"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  if (process.env.NODE_ENV === "development") {
    const userInfo1 = userDev.account;

    // const userInfo1 = {
    //   user: "admin",
    //   pwd: "passw0rd"
    // };

    const userInfo = {
      cerStatus: 0,
      email: "admin@winhong.com",
      isSysDefault: true,
      lastLoginSuccessIp: "10.10.112.183",
      lastLoginSuccessTime: "2020-12-09T09:13:11+0800",
      loginIp: "10.10.112.183",
      loginName: "admin",
      loginTime: "2020-12-09T09:13:11+0800",
      name: "管理员",
      onlineSingle: false,
      roleId: "7e2bb856a0b74e709b324a7392d870c9",
      roleName: "系统管理员",
      roleTypeCode: "SYSTEM_MANAGER",
      roleTypeId: "902d08d4bdf244859583478c855a67b8",
      roleTypeName: "系统管理员",
      sessionId: "511b152f-7682-4ab6-ab97-0c9fe5794f0a",
      sessionTimeOut: 120,
      tel: null,
      userId: "4f6241cc-8035-11e8-aa69-0cda411d462e",
      userPwdDeadline: 0
    };

    window.setSession("userInfo", userInfo);

    store.dispatch("user/userLogin", userInfo1);
  }
  const userInfo = window.getSession("userInfo") || {};

  // 获取登录信息
  store.commit("user/SET_USER", userInfo);
  // start progress bar
  NProgress.start();
  // set page title
  document.title = await getPageTitle(to.meta.title);
  // 确定用户是否已经登录
  // const hasToken = getToken();
  const hasToken = true;
  // 检查是否登录
  store.dispatch("user/setSession");
  if (hasToken) {
    // 确定用户是否通过getInfo获得了他的权限角色
    const hasRoles =
      store.getters.menuShrinkList && store.getters.menuShrinkList.length > 0;

    if (hasRoles) {
      next();
    } else {
      console.log("---123---");
      try {
        await store.dispatch("menu/setMenuDialogTree");
        // 获取收藏点亮菜单列表
        const setCollectMenuList = await store.dispatch(
          "menu/setCollectMenuList"
        );
        // await store.dispatch("user/setStorageList");
        store.dispatch("menu/setMenuList", setCollectMenuList);

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true });
      } catch (error) {
        console.log("----------error-->", error);
        // remove token and go to login page to re-login
        // await store.dispatch("user/resetToken");
        // Message.error(error || "Has Error");
        next(`/login?redirect=${to.path}`);
        NProgress.done();
      }
    }
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
