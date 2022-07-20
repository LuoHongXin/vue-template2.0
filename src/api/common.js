import request from "@utils/request";
export const common = {
  /**
   * @description 登录
   * @author luohongxin
   * @date 04/05/2022
   * @param {*} data
   */
  login(data) {
    return request({
      url: "/login",
      method: "post",
      data
    });
  },
  /**
   * @description 校验token是否过期
   * @author luohongxin
   * @date 04/05/2022
   */
  checkSession() {
    return request({
      url: "/check/session",
      method: "get",
      params: {
        t: new Date().getTime()
      }
    });
  },
  /**
   * @description 退出登录
   * @author luohongxin
   * @date 04/05/2022
   */
  logout() {
    return request({
      url: "/logout",
      method: "post"
    });
  },
  /**
   * 获取登录用户信息
   */
  getLoginInfo() {
    return request({
      url: "/users/loginInfo",
      method: "get"
    });
  }
};
