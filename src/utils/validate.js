/*
 * @Author: luohongxin
 * @Date: 2020-09-14 14:11:59
 * @Last Modified by: luohongxin
 * @Last Modified time: 2020-09-22 14:11:59
 */

/**
 * 只允许输入字母或数字，并且以字母开头
 * @param {string} str
 * @returns {Boolean}
 */
export function validLetter(str) {
  // /^[a-zA-Z][A-Za-z0-9]+$/
  const reg = /^[a-zA-Z][A-Za-z0-9]+$/;
  return reg.test(str);
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return reg.test(url);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === "string" || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]";
  }
  return Array.isArray(arg);
}

/**
 * 验证IP
 * @param {string} str
 * @returns {Boolean}
 */
export function validIP(str) {
  const reg = /^(?:(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
  return reg.test(str);
}

/**
 * 验证IP 【如：172.26.177.0/24】
 * @param {string} str
 * @returns {Boolean}
 */
export function checkCidr(str) {
  const reg = /^([1-9]|[1-9]\d|1\d\d|2[0-1]\d|22[0-3])(\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){2}\.([0-9]|[1-9]\d|1\d\d|2[0-4]\d|25[0-4])\/([0-9]|[1-2][0-9]|3[0])$/;
  return reg.test(str);
}

/**
 * 只允许输入汉字，字母，数字，下划线及英文点。
 * @param {string} str
 * @returns {Boolean}
 */
export function checkInputName(str) {
  const reg = /^[a-zA-Z0-9_\x2d.\u4E00-\u9FA5\uF900-\uFA2D]+$/;
  return reg.test(str);
}
