import Cookies from "js-cookie";

// const TokenKey = "Authorization";
const TokenKey = "SESSION";
export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}

export function getkeyCookie(key) {
  return Cookies.get(key);
}
