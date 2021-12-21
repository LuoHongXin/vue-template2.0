// socket功能
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import store from "@/store";
import { notification } from "ant-design-vue";
import { BASE_URL } from "./config";
import { parseTime } from "./util";
let isConnectWebsocket = false;
let stompClient = null;
let taskEnd = false;

function actionMessageHandle(data) {
  const getMessage = JSON.parse(data.body);
  // const getMessage = data;
  // console.log("getMessage:", getMessage);
  if (getMessage.serviceId && getMessage.content) {
    getMessage.content.serviceId = getMessage.serviceId;
  }
  if (processActionMessage[getMessage.command]) {
    processActionMessage[getMessage.command](getMessage.content);
  }
}

function taskMessageHandle(data) {
  const getMessage = JSON.parse(data.body);
  // const getMessage = data;
  // console.log("getMessage-任务:", getMessage);

  // smSource: null source: "COMPUTE" WINSTORE
  const { smSource, source } = getMessage;
  if (smSource === "WINSTORE" || source === "WINSTORE") {
    getMessage.content.command = getMessage.command;
    if (getMessage.serviceId && getMessage.content) {
      getMessage.content.serviceId = getMessage.serviceId;
    }
    getTaskSet(getMessage.content);
  }
}

//捕捉广播事件“onShowTaskList”：某些行为需要自动打开任务台
export function getTaskSet(getMsg) {
  // console.log("getMsg-rrr:", getMsg);
  const { command } = getMsg;
  // 创建中,获取任务列表日志
  if (command == "NOTIFY_TASK_CREATE_NOTE") {
    // console.log("===========>NOTIFY_TASK_CREATE_NOTE:", getMsg);
    getMsg.timeCreate = parseTime(
      new Date(getMsg.timeCreate),
      "{y}-{m}-{d} {h}:{i}:{s}"
    );
    if (getMsg.timeEnd) {
      getMsg.timeEnd = parseTime(
        new Date(getMsg.timeEnd),
        "{y}-{m}-{d} {h}:{i}:{s}"
      );
    }
    // console.log("CREATE-getMsg:==,", getMsg);
    const result = getMsg;
    // console.log("CREATE-result:==,", result);

    store.dispatch("websocket/setTaskList", result);
    // 开始中
  } else if (command == "NOTIFY_TASK_START_NOTE") {
    getMsg.timeStart = parseTime(
      new Date(getMsg.timeStart),
      "{y}-{m}-{d} {h}:{i}:{s}"
    );

    if (getMsg.timeEnd) {
      getMsg.timeEnd = parseTime(
        new Date(getMsg.timeEnd),
        "{y}-{m}-{d} {h}:{i}:{s}"
      );
    }
    // console.log("==============>NOTIFY_TASK_START_NOTE:", getMsg);
    store.commit("websocket/UPDATE_TASK_LIST", {
      obj: getMsg,
      type: "START"
    });
    // 进行中
  } else if (command == "NOTIFY_TASK_PROGRESS_NOTE") {
    if (taskEnd) return;
    // console.log("==============>NOTIFY_TASK_PROGRESS_NOTE:", getMsg);
    store.commit("websocket/UPDATE_TASK_LIST", {
      obj: getMsg,
      type: "PROGRESS"
    });
    // 结束
  } else if (command == "NOTIFY_TASK_END_NOTE") {
    taskEnd = true;
    const result = getMsg;
    // console.log("========>NOTIFY_TASK_END_NOTE:", result);
    store.commit("websocket/UPDATE_TASK_LIST", {
      obj: result,
      type: "END"
    });

    const data = result;
    // console.log("data==>", data);

    const taskStatusList = [
      {
        value: "0",
        label: "未开始"
      },
      {
        value: "1",
        label: "已开始"
      },
      {
        value: "2",
        label: "已取消"
      },
      {
        value: "3",
        label: "成功"
      },
      {
        value: "4",
        label: "失败"
      }
    ];

    // 转换状态
    const arr = taskStatusList.filter(
      item => item.value === String(data.status)
    );
    const statusName = arr[0].label;

    if (data.status < 5) {
      let message = "";
      if (data.status == 4) {
        if (data.stepDesc) {
          message = data.description + statusName + ";" + data.stepDesc;
        } else {
          message = data.description + statusName;
        }
      } else if (data.status == 3) {
        message = data.description + statusName + "。";
      }

      notification.open({
        message: "",
        description: message
      });
    }
  }
}

// 192.168.205.127 root/winserver
// 192.168.205.231 root/winserver
//事件标识对象
var processActionMessage = {
  // 删除集群
  NOTIFY_DELETE_DISTRIBUTED_STORAGE_NOTE: content => {
    // console.log("==删除集群==");
    const { serviceId } = content;
    updateClusterTaskList(serviceId);
  },
  //增加存储集群
  NOTIFY_ADD_DISTRIBUTED_STORAGE_NOTE: content => {
    // console.log("==增加存储集群==");
    const { serviceId } = content;
    updateClusterTaskList(serviceId);
  },
  //删除存储节点
  NOTIFY_DEL_DISTRIBUTED_NODE_NOTE: content => {
    setCommonTaskList(content);
  },
  //新增存储节点
  NOTIFY_ADD_DISTRIBUTED_NODE_NOTE: content => {
    setCommonTaskList(content);
  },
  //删除分布式存储设备
  NOTIFY_DEL_DISTRIBUTED_DEV_NOTE: content => {
    setCommonTaskList(content);
  },
  //增加分布式存储设备
  NOTIFY_ADD_DISTRIBUTED_DEV_NOTE: content => {
    setCommonTaskList(content);
  },
  //增加分布式存储池
  NOTIFY_ADD_DISTRIBUTED_POOl_NOTE: content => {
    setCommonTaskList(content);
  },
  //修改分布式存储池
  NOTIFY_MODIFY_DISTRIBUTED_POOl_NOTE: content => {
    setCommonTaskList(content);
  },
  //删除分布式存储池
  NOTIFY_DEL_DISTRIBUTED_POOl_NOTE: content => {
    setCommonTaskList(content);
  }
};

export function setCommonTaskList(content) {
  const { serviceId } = content;
  store.commit("websocket/SET_COMMON_TASK_LIST", serviceId);
}

export function updateClusterTaskList(serviceId) {
  const clusterTaskIdArr = window.getLocal("clusterTaskIdArr") || [];
  if (clusterTaskIdArr.length > 0) {
    const arr = clusterTaskIdArr.filter(value => value === serviceId);
    if (arr.length > 0) {
      store.dispatch("user/setStorageList");
    }
  }
}

export function stompClientConnect() {
  stomp();
}

export function stomp() {
  const API_NOTIFY = BASE_URL + "/notify";
  // wss://192.168.205.248/api/notify/websocket/789/5uhl1asj/websocket
  // 连接SockJS的endpoint名称为"websocket"
  if (!isConnectWebsocket) {
    var _self = this;
    var socket = new SockJS(API_NOTIFY + "/websocket");
    stompClient = Stomp.over(socket); //建立stomp客户端 //获取STOMP子协议的客户端对象
    stompClient.heartbeat.outgoing = 20000;
    stompClient.heartbeat.incoming = 20000;
  }
  //进行链接
  if (stompClient) {
    // 定义客户端的认证信息,按需求配置
    // const headers = {};
    stompClient.connect(
      {},
      function(frame) {
        //连接
        console.log("websocket链接成功！");
        isConnectWebsocket = true;
        stompClient.subscribe("/topic/heartbeat", function(data) {
          //消息订阅  心跳（预留）
          console.log(
            "--------------------------------心跳--------------------------------:"
          );
          // console.log("心跳:", data.body);
          // processHeartbeatMessage(data.body);
        });
        stompClient.subscribe("/topic/task", function(data) {
          //消息订阅  进度
          console.log(
            "--------------------------------进度--------------------------------:"
          );
          // console.log("进度:", data.body);
          taskMessageHandle(data);
        });
        stompClient.subscribe("/topic/action", function(data) {
          //消息订阅  成功结果
          //事件标识对象
          //这里成功返回的标识
          console.log(
            "--------------------------------成功进行--------------------------------:"
          );
          // console.log("成功-action:", data.body);
          actionMessageHandle(data);
        });
        stompClient.subscribe("/topic/log", function(data) {
          //消息订阅  成功结果
          console.log(
            "--------------------------------成功日志-------------------------------:"
          );
          // console.log("成功-log:", data.body);
          // $rootScope.$broadcast("RefreshVmLog", JSON.parse(data.body));
        });
        // if(userInfo && userInfo.userId){
        //  stompClient.subscribe(
        //     "/topic/action/" + userInfo.userId,
        //     function(data) {
        //       //消息订阅  成功结果
        //       actionMessageHandle(data);
        //     }
        //   );

        //   stompClient.subscribe(
        //     "/topic/task/" + userInfo.userId,
        //     function(data) {
        //       //消息订阅  成功结果
        //       taskMessageHandle(data);
        //     }
        //   );
        //   //}

        //   stompClient.ws.onclose = function(e) {
        //     if ($rootScope.isConnectWebsocket) {
        //       setTimeout($rootScope.stompClientConnect, 5000); //stompClient.ws._connect()
        //     }
        //   };
      },
      function(error) {
        console.log("websocket链接失败");
        if (isConnectWebsocket) {
          setTimeout(stompClientConnect, 5000);
        }
      }
    );
  }
}

// 手动断开websocket
export function stompClientOnclose() {
  isConnectWebsocket = false;
  if (stompClient) {
    stompClient.ws.close();
  }
}
