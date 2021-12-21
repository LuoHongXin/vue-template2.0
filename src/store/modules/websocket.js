const state = {
  clusterManagementRefreshPage: "",
  taskList: [],
  commonTaskList: []
};

const mutations = {
  // 设置集群删除是否刷新
  SET_CLUSTER_IS_REFRESH: (state, data) => {
    state.clusterManagementRefreshPage = data;
  },
  SET_TASK_LIST: (state, obj) => {
    // console.log("obj---1-------------->",obj)
    // console.log("state---1-------------->",state.taskList)
    const arr = state.taskList.filter(value => value.id === obj.id);
    if (arr.length === 0) {
      state.taskList.unshift(obj);
      // console.log("SET_TASK_LIST-state.taskList----->:", state.taskList);
    }
  },
  // 更新任务日志列表
  UPDATE_TASK_LIST: (state, data) => {
    // console.log("=====UPDATE_TASK_LIST--->===");
    const { type, obj } = data;
    // console.log("type---->:", type);
    // console.log("obj---->:", obj);
    if (type === "START") {
      state.taskList.forEach(item => {
        if (item.id === obj.id) {
          item.timeStart = obj.timeStart;
          item.stepCount = obj.stepCount;
          item.status = 1;
        }
      });
    }

    if (type === "PROGRESS") {
      // console.log("store-PROGRESS:", state.taskList);
      // console.log("store-PROGRESS-obj:", obj);

      state.taskList.forEach(item => {
        if (item.id === obj.id) {
          const compare =
            !item.progressTime ||
            (item.progressTime && item.progressTime < obj.createTime);

          if (compare) {
            // console.log("store-PROGRESS-obj----------------->", item);
            item.progressTime = obj.createTime;
            item.stepIndex = obj.stepIndex;
            item.stepDesc = obj.stepDesc;
            if (item.status === 0) {
              item.status = 1;
            }
          } else if (item.progressTime) {
            return;
          }
        }
      });
    }

    if (type === "END") {
      const taskList = state.taskList;

      taskList.forEach(item => {
        if (item.id === obj.id) {
          item.timeEnd = obj.timeEnd;
          item.stepIndex = obj.stepIndex;
          item.stepDesc = obj.description;
          item.status = obj.status;

          // console.log("end-item.status----->:", item.status);
        }

        if (obj.code && obj.code.indexOf("domain") != -1) {
          // console.log("end-item-->", item);
        }

        if (
          obj.code &&
          obj.code == "domain.export.to.ovf" &&
          obj.status === 4
        ) {
          //导出ovf
          // const msg = {
          //   taskId: getMsg.id,
          //   status: getMsg.status,
          //   description: getMsg.description
          // };
          //$rootScope.$broadcast("ovfFailure", msg);
        }
      });

      // if(taskList.length === 0){
      //   taskList.push(obj)
      // }
      //console.log("end-state.taskList--->", state.taskList);
    }
  },
  // 服务器task/新增数据盘/删除数据盘 收集
  SET_COMMON_TASK_LIST: (state, obj) => {
    // console.log("add------------------>", obj);
    state.commonTaskList = [obj];
    // console.log("state---------------task--->", state.commonTaskList);
  }
};

const actions = {
  setClusterManagementRefresh({ commit }) {},
  // 设置任务日志列表
  setTaskList({ commit }, obj) {
    commit("SET_TASK_LIST", obj);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
