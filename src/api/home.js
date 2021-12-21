import request from "@/utils/request";

/**
 * test 测试
 */
export function test() {
  return request({
    url: `/admin-api/test`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 查询WinStore存储集群下的存储卷数量
 */
export function getVolsList(clusterId) {
  return request({
    url: `/winstore/distributed_storage_clusters/${clusterId}/vols`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 统计存储集群关联的存储设备的数量
 */
export function getDevices(clusterId) {
  return request({
    url: `/winstore/distributed_storage_clusters/${clusterId}/devices/count`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取分布式资源数量统计/服务器
 */
export function getResources(clusterId) {
  return request({
    url: `/winstore/distributed_storage_clusters/${clusterId}/resources/count`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取WinStore存储集群详情
 */
export function getDetails(clusterId) {
  return request({
    url: `/winstore/distributed_storage_clusters/${clusterId}/details`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取WinStore存储池详情
 */
export function getStoragePoolsDetails() {
  return request({
    url: `/winstore/distributed_storage_clusters/storage_pools/details`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取查询未处理告警列表
 */
export function getPendingAlarmsList(clusterId) {
  return request({
    url: `/winstore/clusters/${clusterId}/pending_alarms`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取集群性能数据
 */
export function getPerformancesList(clusterId,data) {
  data = data ? (data.t = new Date().getTime()) : { t: new Date().getTime() };
  return request({
    url: `/winstore/clusters/${clusterId}/performances`,
    method: "get",
    params: data
  });
}

/**
 * 获取集群下使用率前五的存储池
 */
export function getPoolsTheFirstRateList(clusterId) {
  return request({
    url: `/winstore/clusters/${clusterId}/pools/theFirstRate`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取集群下使用率前五的osd
 */
export function getOsdsTheFirstRateList(clusterId) {
  return request({
    url: `/winstore/clusters/${clusterId}/osds/theFirstRate`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取服务器CPU
 */
export function getCpuTheFirstRateList(clusterId) {
  return request({
    url: `/winstore/clusters/${clusterId}/hosts/cpuTheFirstRate`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取服务器内存
 */
export function getMemTheFirstRateList(clusterId) {
  return request({
    url: `/winstore/clusters/${clusterId}/hosts/memTheFirstRate`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

