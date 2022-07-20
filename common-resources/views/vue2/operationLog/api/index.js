import request from "@utils/request";
const service = "/aggregation";
export const auditLogApi = {
  logs(params) {
    //操作日志 - 查询任务日志列表
    params.codeLike = params.codeLike2 ? params.codeLike2 : params.codeLike;
    params.bizName = params.bizName2 ? params.bizName2 : params.bizName;
    params.interfaceName = params.interfaceName2
      ? params.interfaceName2
      : params.interfaceName;
    params.accountLike = params.accountLike2
      ? params.accountLike2
      : params.accountLike;
    params.ipLike = params.ipLike2 ? params.ipLike2 : params.ipLike;
    delete params.codeLike2;
    delete params.bizName2;
    delete params.interfaceName2;
    delete params.accountLike2;
    delete params.ipLike2;
    return request({
      url: service + "/logs",
      method: "get",
      params
    });
  },
  logsDetails(uuid) {
    //操作日志 - 查询任务日志详情
    return request({
      url: service + "/logs/" + uuid + "/details",
      method: "get"
    });
  },
  logsTypes() {
    //操作日志 - 对象类型
    return request({
      url: service + "/logs/types",
      method: "get"
    });
  }
};
