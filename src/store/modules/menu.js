import * as menu from "@/api/menu";
import componentsRouter from "@/router/components.router.js";
import router from "@/router/index";

// 过滤的当前用户支持的菜单
const filterMenuList = arr => {
  componentsRouter.forEach(item => {
    arr.forEach(aitem => {
      if (item.meta && item.meta.id && item.meta.id === aitem.id) {
        if (item.children.length > 0) {
          item.children.forEach(subItem => {
            aitem.childrens.forEach(aSubItem => {
              if (
                subItem.meta &&
                subItem.meta.id &&
                subItem.meta.id === aSubItem.id
              ) {
                aSubItem.url = item.path + "/" + subItem.path;
                aSubItem.icon = subItem.meta.icon;
              }
            });
          });
        }
      }
    });
  });
  return arr;
};

const state = {
  menuShrinkList: [], // 左侧菜单收缩
  menuDialogTree: [], // 弹出dialog菜单
  collectMenuList: [] // 收藏点亮菜单列表
};

const mutations = {
  SET_MENU_TREE: (state, data) => {
    state.menuDialogTree = filterMenuList(data);
  },
  SET_COLLECT_MENU_LIST: (state, data) => {
    state.collectMenuList = data;
  },
  SET_MENU_LIST: (state, data) => {
    const result = [];
    const collectMenuList = state.collectMenuList;
    data.forEach(item => {
      const obj = {};
      item.children.forEach(sub => {
        obj.path = item.path + "/" + sub.path;
        obj.name = sub.meta.title;
        obj.icon = sub.meta.icon;
        obj.id = sub.meta.id;
        obj.collectId = sub.meta.collectId ? sub.meta.collectId : "";
        obj.isCollect = item.isCollect;
        if (item.path === "/") {
          obj.path = "/";
        }
      });
      result.push(obj);
    });

    const newArr = [];
    result.forEach(v1 => {
      if (v1.isCollect) {
        newArr.push(v1);
      }
    });

    collectMenuList.forEach(v => {
      result.forEach(v1 => {
        if (v.id === v1.collectId) {
          newArr.push(v1);
        }
      });
    });
    state.menuShrinkList = newArr;
  }
};

const actions = {
  // 获取弹出dialog 菜单
  setMenuDialogTree({ commit }) {
    menu.getMenuTrees().then(response => {
      // console.log("setMenuTree-->",response)
      commit("SET_MENU_TREE", response);
    });
  },
  // 获取收藏点亮菜单列表
  setCollectMenuList({ commit }) {
    return new Promise(reslove => {
      menu.getCollectionMenuList().then(response => {
        reslove(response);
        commit("SET_COLLECT_MENU_LIST", response);
      });
    });
  },
  // 设置菜单列表
  async setMenuList({ commit }, data) {
    // 后端返回的用户的权限
    const newMenu = [];
    const routes = router.options.routes;
    const arr = [];
    let LIST = [];

    routes.forEach(value => {
      if (value.children) {
        data.forEach(auth => {
          value.children.forEach(v => {
            const children = [];
            if (v.meta && v.meta.id && auth.menuId === v.meta.id) {
              v.meta.collectId = auth.id; // 收藏id
              children.push(v);
              const row = {
                path: value.path,
                component: value.component,
                name: value.name,
                meta: value.meta,
                children: children
              };
              newMenu.push(row);
            }
          });
        });

        if (value.isCollect) {
          arr.push(value);
        }
        LIST = [...arr, ...newMenu];
      }
    });

    commit("SET_MENU_LIST", LIST);
  },
  // 更新菜单权限列表
  updateMenuList({}, data) {
    return new Promise(reslove => {
      menu.updateMenu(data).then(response => {
        reslove(response);
      });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
