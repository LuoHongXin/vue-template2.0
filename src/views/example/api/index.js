import request from "@utils/request";
export const loginApi = {
  login(data) {
    return request({
      url: "/login",
      method: "post",
      data
    });
  }
};
