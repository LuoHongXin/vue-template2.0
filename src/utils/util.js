/*
 * @Author: luohongxin
 * @Date: 2020-09-14 14:11:59
 * @Last Modified by: luohongxin
 * @Last Modified time: 2020-09-22 14:11:59
 */

const isCidr = require("is-cidr");

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;

  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string") {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time);
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), "/");
      }
    }

    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    return value.toString().padStart(2, "0");
  });
  return time_str;
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000;
  } else {
    time = +time;
  }
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return "刚刚";
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前";
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前";
  } else if (diff < 3600 * 24 * 2) {
    return "1天前";
  }
  if (option) {
    return parseTime(time, option);
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

/**
 * 时间戳转换为 2018-11-14 15:21:14 格式
 * @returns {}
 */

export function stampTurnDateAndClock(value, type) {
  if (value) {
    var time = new Date(value);
    var _y = time.getFullYear();
    var _m =
      time.getMonth() > 8 ? time.getMonth() + 1 : "0" + (time.getMonth() + 1);
    var _d = time.getDate() > 9 ? time.getDate() : "0" + time.getDate();
    var _h = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
    var _min =
      time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
    var _s =
      time.getSeconds() > 9 ? time.getSeconds() : "0" + time.getSeconds();
    var turnTime = "";
    if (!type) {
      turnTime = _y + "-" + _m + "-" + _d + " " + _h + ":" + _min + ":" + _s;
    } else if (type == "m_d") {
      turnTime = _m + "-" + _d;
    }
  } else {
    var turnTime = null;
  }
  return turnTime;
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url;
  const search = url.substring(url.lastIndexOf("?") + 1);
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1);
    let val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s += 2;
    if (code >= 0xdc00 && code <= 0xdfff) i--;
  }
  return s;
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return "";
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
  ).join("&");
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ");
  if (!search) {
    return {};
  }
  const obj = {};
  const searchArr = search.split("&");
  searchArr.forEach(v => {
    const index = v.indexOf("=");
    if (index !== -1) {
      const name = v.substring(0, index);
      const val = v.substring(index + 1, v.length);
      obj[name] = val;
    }
  });
  return obj;
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement("div");
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== "object") {
    target = {};
  }
  if (Array.isArray(source)) {
    return source.slice();
  }
  Object.keys(source).forEach(property => {
    const sourceProperty = source[property];
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty);
    } else {
      target[property] = sourceProperty;
    }
  });
  return target;
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf(className);
  if (nameIndex === -1) {
    classString += "" + className;
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === "start") {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date(new Date().toDateString());
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function(...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone");
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr));
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + "";
  const randomNum = parseInt((1 + Math.random()) * 65536) + "";
  return (+(randomNum + timestamp)).toString(32);
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

/**
 * 存储单位转换：由字节 B 转 其他
 * @param {}
 * value  : （数字）一个单位为字节的数值  (必须)
 * unitType : （字符串）限制转换的单位，有KB、MB、GB、TB 四种类型 (可选)
 * floatNumber ：（数字）限制转换返回值的小数位数  （可选）
 * addUnit  :   (布尔值) 限制转换返回值是否需要带上单位返回 （可选）
 */
export function byteTurnOther(params) {
  var backData = null;
  if (params.value) {
    if (params.unitType) {
      backData = filterBTurn(params.value, params.unitType, params.floatNumber);
    } else {
      //没有params.unitType，根据字节值大小来智能转换。
      if (params.value >= 1024) {
        if (params.value >= 1024 * 1024) {
          if (params.value >= 1024 * 1024 * 1024) {
            if (params.value >= 1024 * 1024 * 1024 * 1024) {
              params.unitType = "TB";
              filterBTurn(params.value, params.unitType, params.floatNumber);
            } else {
              params.unitType = "GB";
              filterBTurn(params.value, params.unitType, params.floatNumber);
            }
          } else {
            params.unitType = "MB";
            filterBTurn(params.value, params.unitType, params.floatNumber);
          }
        } else {
          params.unitType = "KB";
          filterBTurn(params.value, params.unitType, params.floatNumber);
        }
      } else {
        params.unitType = "B";
        backData = params.value;
      }
    }
    //返回值是否需要带上单位
    // if (params.addUnit){
    //     return backData + params.unitType;
    // }else{
    //     return backData;
    // }
    //返回值是否需要带上单位
    if (params.addUnit) {
      backData = backData + params.unitType;
    }
  } else {
    backData = 0;
  }
  return backData;
}

/**
 * 存储单位转换 turnKb
 * value  : （数字）一个单位为字节的数值  (必须)
 * pointNum ：（数字）限制转换返回值的小数位数  （可选）
 * unitType : （字符串）限制转换的单位，有KB、MB、GB、TB 四种类型 (必须) 默认KB
 */
export function filterBTurn(value, unitType = "KB", pointNum) {
  if (value == null) {
    return "null";
  }

  const unit = unitType.toUpperCase();
  var m;
  var backValue = null;

  if (unit === "KB") {
    m = value / 1024;
  }

  if (unit === "MB") {
    m = value / 1048576;
  }

  if (unit === "GB") {
    m = value / 1073741824;
  }

  if (unit === "TB") {
    m = value / 1099511627776;
  }

  if (unit === "KB" || unit === "MB" || unit === "TB") {
    if (typeof pointNum === "number" && pointNum >= 0) {
      return parseFloat(m.toFixed(pointNum));
    } else {
      return parseInt(m);
    }
  }

  if (unit === "GB") {
    if (typeof pointNum === "number" && pointNum >= 0) {
      if (Number.isInteger(m)) {
        backValue = m;
      } else {
        backValue = parseFloat(m.toFixed(pointNum)); //四舍五入
      }
    } else {
      backValue = parseInt(m); //只取整数部分
    }
    return backValue;
  }
}

//IP转二进制
export function praseIpToBinary(ipAddress) {
  var numArray = ipAddress.split(".");

  if (numArray.length != 4) {
    return;
  }

  var returnIpStr = "";

  for (var i = 0; i < 4; i++) {
    var curr_num = numArray[i];
    var number_Bin = parseInt(curr_num);
    number_Bin = number_Bin.toString(2);
    var iCount = 8 - number_Bin.length;
    for (var j = 0; j < iCount; j++) {
      number_Bin = "0" + number_Bin;
    }
    returnIpStr += number_Bin;
  }

  return returnIpStr;
}

//二进制转IP
export function praseBinaryToIp(binary) {
  var ipAddress =
    parseInt(binary.substr(0, 8), 2) +
    "." +
    parseInt(binary.substr(8, 8), 2) +
    "." +
    parseInt(binary.substr(16, 8), 2) +
    "." +
    parseInt(binary.substr(24, 8), 2);
  return ipAddress;
}

export function calculateCIDR(cidr) {
  var cidr = cidr.split("/");

  var netmask = ""; //子网掩码
  var netid = ""; //网络号
  var hostid = ""; //主机号
  var netaddress = ""; //网络地址
  var broadcast = ""; //广播地址
  var startip = ""; //起始IP
  var endip = ""; //结束IP

  //第一步：计算二进制子网掩码
  for (var i = 0; i < cidr[1]; i++) {
    netmask = netmask + "1";
  }

  for (var i = 0; i < 32 - cidr[1]; i++) {
    netmask = netmask + "0";
  }

  //第二步：IP地址与子网掩码做与运算
  var ip_sec = praseIpToBinary(cidr[0]);

  for (var i = 0; i < 32; i++) {
    if (ip_sec.charAt(i) == netmask.charAt(i)) {
      netaddress = netaddress + "1";
    } else {
      netaddress = netaddress + "0";
    }
  }

  netid = netaddress.substr(0, cidr[1]); //网络号保持不变

  //第三步：计算网络地址（网络号保持不变，主机号全为0）
  for (var i = 0; i < 32 - cidr[1]; i++) {
    hostid = hostid + "0";
  }

  netaddress = praseBinaryToIp(netid + hostid);

  //第四步：计算起始IP（网络号保持不变，主机号最后一位为1）
  hostid = "";
  for (var i = 0; i < 31 - cidr[1]; i++) {
    hostid = hostid + "0";
  }
  hostid += "1";
  startip = praseBinaryToIp(netid + hostid);

  //第五步：计算广播地址（网络号保持不变，主机号全为1）
  hostid = "";
  for (var i = 0; i < 32 - cidr[1]; i++) {
    hostid = hostid + "1";
  }
  broadcast = praseBinaryToIp(netid + hostid);

  //第六步：计算结束IP（网络号保持不变，主机号最后一位为0）
  hostid = "";
  for (var i = 0; i < 31 - cidr[1]; i++) {
    hostid = hostid + "1";
  }
  hostid += "0";
  endip = praseBinaryToIp(netid + hostid);

  //封装数据
  var result = [
    praseBinaryToIp(netmask), //子网掩码
    netaddress, //网络地址
    broadcast, //广播地址
    startip, //起始IP
    endip //结束IP
  ];

  return result;
}

export function isFunction(func) {
  return typeof func === "function";
}

/**
 * 验证 CIDR 检查输入是否 为 IPv4/IPv6 CIDR地址
 * @return {Boolean}
 */
export function checkCidrIp(ip) {
  return isCidr.v4(ip); //=> false
}
