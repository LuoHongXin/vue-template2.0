
/**
 * @description 操作浏览器方法
 * @author luohongxin
 * @date 13/05/2022
 */


export const setLocal = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
};

export const setSession = (key, value) => {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  sessionStorage.setItem(key, value);
};

export const getLocal = key => {
  let value = localStorage.getItem(key);
  if (!value) {
    return;
  }
  if (value.includes("[") || value.includes("{")) {
    return JSON.parse(value);
  } else {
    return localStorage.getItem(key) || "";
  }
};

export const getSession = key => {
  let value = sessionStorage.getItem(key);
  if (!value) {
    return;
  }
  if (value.includes("[") || value.includes("{")) {
    return JSON.parse(value);
  } else {
    return sessionStorage.getItem(key) || "";
  }
};

// clear local存储
export const removeLocal = key => {
  localStorage.removeItem(key);
};

export const removeSession = key => {
  sessionStorage.removeItem(key);
};

export default {
  setLocal,
  setSession,
  getSession,
  removeSession,
  getLocal,
  removeLocal
};