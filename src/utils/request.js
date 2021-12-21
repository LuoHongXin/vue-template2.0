/*
 * @Author: luohongxin
 * @Date: 2020-09-14 14:11:59
 * @Last Modified by: luohongxin
 * @Last Modified time: 2020-09-22 14:11:59
 */
import axios from "axios";
import qs from "qs";
import { BASE_URL } from "./config";

import { isFunction } from "./util";

/**
 * 是否取消重复的请求
 * @description 自定一个字段来让用户自己决定是否需要取消重复的请求
 */
const cancelDuplicated = true;

/**
 * 存储每个请求的标识和取消的函数
 * @description 声明一个Map。用来存储每个请求的 标识 和 取消的函数
 */
const pendingAjax = new Map();

// 生成重复标识的方式
const duplicatedKeyFn = config => `${config.method}${config.url}`;

const DUPLICATED_REQUEST = "duplicatedRequest"; // duplicated request

const veryConfig = { duplicatedKey: "duplicatedKey" } || {};

/**
 * 将请求添加到pendingAjax
 * @param {Object} config
 */
const addPendingAjax = function(config) {
  // 是否需要取消重复的请求
  if (!cancelDuplicated) return;
  // 使用duplicatedKey字段来让用户对单一请求自定义重复的标识
  // 或者可以使用一个函数duplicatedKeyFn统一的让用户自定义重复的标识
  const duplicatedKey = JSON.stringify({
    duplicatedKey: veryConfig.duplicatedKey || duplicatedKeyFn(config),
    type: DUPLICATED_REQUEST
  });

  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken(cancel => {
      // 如果pendingAjax中不存在当前请求，添加进去
      if (duplicatedKey && !pendingAjax.has(duplicatedKey)) {
        pendingAjax.set(duplicatedKey, cancel);
      }
    });
};

/**
 * 从pendingAjax中删除请求
 * @param {Object} config
 */
const removePendingAjax = function(config) {
  // 是否需要取消重复的请求
  if (!cancelDuplicated) return;
  const duplicatedKey = JSON.stringify({
    duplicatedKey: veryConfig.duplicatedKey || duplicatedKeyFn(config),
    type: DUPLICATED_REQUEST
  });

  // 如果pendingAjax中存在当前请求, 取消当前请求并将其删除
  if (duplicatedKey && pendingAjax.has(duplicatedKey)) {
    const cancel = pendingAjax.get(duplicatedKey);
    cancel(duplicatedKey);
    pendingAjax.delete(duplicatedKey);
  }
};

const setDefaultParams = params => {
  return params;
};

const resolve = function(response, success, error) {
  // const status = response.statue || response.status
  success(response);
};

const reject = function(response, error) {
  if (error) {
    error(response);
  }
};

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL, // url = base url + request url
  timeout: 100000 // request timeout
});

// 拦截请求
service.interceptors.request.use(
  config => {
    // 在请求开始之前检查先前的请求
    // removePendingAjax(config);
    // // 将当前请求添加到pendingAjax
    // addPendingAjax(config);

    return config;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  }
);

// 拦截响应
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data;
    // removePendingAjax(response)
    return res;
  },
  error => {
    // 请求完成之后的err里面做一个判断，判断如果当前请求是取消的类型，我们就不返回给用户错误的提示信息
    // 类型是否为重复请求
    // let isDuplicatedType;
    // try {
    //   const errorType = (JSON.parse(error.message) || {}).type
    //   isDuplicatedType = errorType === DUPLICATED_REQUEST;
    // } catch (error) {
    //   isDuplicatedType = false
    // }
    // if (isDuplicatedType) return;

    // 考虑后端框架不稳定，报500，处理后端返回错误提示。
    const data = error.response.data;
    return Promise.reject(data);
  }
);

service.get = (path, params, success, error) => {
  const paramsData = Object.assign(
    {
      t: new Date().getTime()
    },
    params
  );
  params = setDefaultParams(paramsData);
  const res = service({
    url: path + "?" + qs.stringify(params),
    method: "get",
    data: params,
    transformRequest: function(obj) {
      let ret = "";
      for (const it in obj) {
        ret += encodeURIComponent(it) + "=" + encodeURIComponent(obj[it]) + "&";
      }
      return ret;
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
  res.then(
    response => {
      resolve(response, success, error);
    },
    response => {
      reject(response, error);
    }
  );
};

service.post = (path, params, success, error) => {
  params = setDefaultParams(params);
  const res = service({
    url: path,
    method: "post",
    params: params
  });
  res.then(
    response => {
      resolve(response, success, error);
    },
    response => {
      reject(response, error);
    }
  );
};

service.postJson = (path, params, success, error) => {
  params = setDefaultParams(params);
  const res = service({
    url: path,
    method: "post",
    data: params,
    transformRequest: function(obj) {
      return JSON.stringify(obj);
    },
    headers: {
      "Content-Type": "application/json"
    }
  });
  res.then(
    response => {
      resolve(response, success, error);
    },
    response => {
      reject(response, error);
    }
  );
  return res;
};

export default service;
