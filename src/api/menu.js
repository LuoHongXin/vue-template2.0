import request from "@/utils/request";

/**
 * 获取菜单左侧列表权限
 */
export function getMenu() {
  return request({
    url: "/winstore/menu/list",
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 更新菜单左侧列表权限
 * type 类型 1 加入 2 取消
 * menuId
 */
export function updateMenu(data) {
  return request({
    url: `/winstore/collection/cancel/menu`,
    method: "post",
    data
  });
}

/**
 * 获取弹出菜单左侧列表
 */
export function getMenuTrees() {
  return request({
    url: `/winstore/menuTrees`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取收藏菜单列表
 */
export function getCollectionMenuList() {
  return request({
    url: `/winstore/collectionMenu/list`,
    method: "get",
    params: {
      t:new Date().getTime()
    }
  });
}

/**
 * 获取拖拽排序列表
 */
export function getCollectionMenuSort(data) {
  return request({
    url: `/winstore/collectionMenu/sort`,
    method: "post",
    data
  });
}
