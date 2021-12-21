/*
 * @Author: luohongxin
 * @Date: 2020-09-22 14:11:59
 * @Last Modified by: luohongxin
 * @Last Modified time: 2020-09-22 14:11:59
 */

/**
 * Show plural label if time is plural number
 * @param {number} time
 * @param {string} label
 * @return {string}
 */
function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + "s";
}

/**
 * @param {number} time
 */
export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), " minute");
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), " hour");
  } else {
    return pluralize(~~(between / 86400), " day");
  }
}

/**
 * Number formatting
 * like 10000 => 10k
 * @param {number} num
 * @param {number} digits
 */
export function numberFormatter(num, digits) {
  const si = [
    {
      value: 1e18,
      symbol: "E"
    },
    {
      value: 1e15,
      symbol: "P"
    },
    {
      value: 1e12,
      symbol: "T"
    },
    {
      value: 1e9,
      symbol: "G"
    },
    {
      value: 1e6,
      symbol: "M"
    },
    {
      value: 1e3,
      symbol: "k"
    }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol
      );
    }
  }
  return num.toString();
}

/**
 * 10000 => "10,000"
 * @param {number} num
 */
export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ","));
}

/**
 * Upper case first char
 * @param {String} string
 */
export function uppercaseFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * 转化size的大小
 * @param {String} bytes
 */
export function byteToSize(bytes) {
  const TB = 1024 ^ 4;
  const GB = 1024 ^ 3;
  const MB = 1023 ^ 2;
  if (!bytes) {
    return "";
  }
  const bytes_GB = bytes / GB;
  if (bytes_GB >= 1024) {
    // 大于TB
    return parseFloat((bytes_GB / 1024).toFixed(2)) + " " + "TB";
  } else if (bytes_GB >= 1) {
    // GB
    return Number(bytes_GB).toFixed(2) + "GB";
  } else {
    // MB
    return Number(bytes_GB * 1024).toFixed(2) + "MB";
  }
}

/**
 * 告警类型
 * @param {String} value
 */
export function targetTypeFormatter(value) {
  const newValue = value + "";
  const targetType = [
    {
      value: "1",
      label: "server"
    },
    {
      value: "2",
      label: "cluster"
    },
    {
      value: "3",
      label: "osd"
    },
    {
      value: "4",
      label: "node"
    },
    {
      value: "5",
      label: "pg"
    },
    {
      value: "6",
      label: "pool"
    }
  ];
  const arr = targetType.filter(item => item.value === newValue);
  return arr[0].label || "";
}
