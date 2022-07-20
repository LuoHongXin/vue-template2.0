export function operationStatusColor(value) {
    //操作日志状态颜色
    let _back;
    switch (value) {
      case "error":
        _back = "red";
        break;
      case "completed":
        _back = "green";
        break;
      case "in-progress":
        _back = "geekblue";
        break;
      case "cancel":
        _back = "";
        break;
    }
    return _back;
  }
  export function operationStatus(value) {
    //操作日志状态
    let _back;
    switch (value) {
      case "error":
        _back = window.app.$t("maintain.auditLog.operationLog.error");
        break;
      case "completed":
        _back = window.app.$t("maintain.auditLog.operationLog.completed");
        break;
      case "in-progress":
        _back = window.app.$t("maintain.auditLog.operationLog.inProgress");
        break;
      case "cancel":
        _back = window.app.$t("maintain.auditLog.operationLog.cancel");
        break;
    }
    return _back;
  }
  export function operationBizType(value, bizTypeList) {
    //操作日志对象类型
    let _back = "";
    bizTypeList.map(e => {
      if (e.value === value) {
        _back = e.text;
      }
    });
    return _back;
  }
  export function loginType(value) {
    //登录日志登录类型
    let _back;
    switch (value) {
      case window.app.$t("maintain.auditLog.loginLog.passwordCardError"):
        _back = "0";
        break;
      case window.app.$t("maintain.auditLog.loginLog.passwordError"):
        _back = "1";
        break;
      case window.app.$t("maintain.auditLog.loginLog.login"):
        _back = "2";
        break;
      case window.app.$t("maintain.auditLog.loginLog.logout"):
        _back = "3";
        break;
      default:
        _back = "4";
    }
    return _back;
  }
  export function dateFormat(value, dateFormat) {
    let _back = "";
  if (value === null || value === undefined) {
    _back = null;
  } else {
    let standardTime;
    if (typeof value === "number") {
      if (value.toString().length < 13) {
        value = value * 1000;
      }
      standardTime = new Date(value);
    } else {
      standardTime = new Date(value);
    }
    let year = standardTime.getFullYear();
    let month = standardTime.getMonth() + 1;
    let date = standardTime.getDate();
    let hours = standardTime.getHours();
    let minutes = standardTime.getMinutes();
    let seconds = standardTime.getSeconds();
    let milliseconds = standardTime.getMilliseconds();

    month = month >= 10 ? month : "0" + month;
    date = date >= 10 ? date : "0" + date;
    hours = hours >= 10 ? hours : "0" + hours;
    minutes = minutes >= 10 ? minutes : "0" + minutes;
    seconds = seconds >= 10 ? seconds : "0" + seconds;

    if (dateFormat === "TimeCode") {
      //时间编码
      _back =
        "" + year + month + date + hours + minutes + seconds + milliseconds;
    } else if (dateFormat === "Y-m-d") {
      _back = year + "-" + month + "-" + date;
    } else if (dateFormat === "Y-m-d H:i:s") {
      _back =
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
    } else {
      _back = year + "-" + month + "-" + date;
    }
    if (year === 2099 && month === 12 && date === 31) {
      _back = "永久";
    }
  }
  return _back;
  }