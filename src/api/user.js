import request from "@/utils/request";

/**
 * 登录
 */
export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data
  });
}

/**
 * 检查是否登录
 */
export function checkSession() {
  return request({
    url: "/check/session",
    method: "get",
    params: {
      t: new Date().getTime()
    }
  });
}

/**
 * 配置信息
 */
export function configUi() {
  return request({
    url: "/identity/sys/config/ui",
    method: "get",
    params: {
      t: new Date().getTime()
    }
  });
}
