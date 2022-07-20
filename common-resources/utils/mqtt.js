import mqtt from "mqtt";

const mattClass = function ({
  userId, //用户ID，用于连接
  messageCallBack // 收到消息回调
}) {
  this.options = {
    protocol: "mqtts",
    // hostname: "cloud.cloudos.dev",
    // username: "xxx",
    // password: "xxxx",
    // cleanSession: false,
    // keepAlive: 60,
    // clientId:
    //   "mqttjs_" +
    //   Math.random()
    //     .toString(16)
    //     .substr(2, 8),
    connectTimeout: 4000
  };
  this.messageCallBack = messageCallBack;
  this.userId = userId || "";
  this.client = null;
};

// 连接
mattClass.prototype.connect = function () {
  let hostname = process.env.NODE_ENV === "production" ? window.location.hostname : "cloud.cloudos.dev";
  this.client = mqtt.connect(`wss://${hostname}/mqtt`);
  // 连接
  this.client.on("connect", e => {
    console.log("成功连接服务器:", e);
    //订阅三个名叫'top/#', 'three/#'和'#'的主题
    this.client.subscribe(
      ["/topic/subscriber", `/topic/action/${this.userId}`],
      { qos: 1 },
      err => {
        if (!err) {
          console.log("订阅成功");
        } else {
          console.log("消息订阅失败！");
        }
      }
    );
  });
  // 接收消息
  this.client.on("message", (topic, message) => {
    if (message) {
      console.log("收到来着", topic, "的信息", message.toString());
      const res = JSON.parse(message.toString());
      switch (topic) {
        case "top/#":
          this.msg = res;
          break;
        case "three/#":
          this.msg = res;
          break;
        default:
          this.msg = res;
      }
      if (this.messageCallBack) {
        this.messageCallBack(res);
      }
    }
  });

  //监听服务器是否连接失败
  this.client.on("error", error => {
    console.log("连接失败：", error); // 连接失败，mqtt会自动重连
    this.disconnect();
  });

  //监听服务器重新连接
  this.client.on("reconnect", error => {
    console.log("正在重连:", error);
  });
};

//发布消息
mattClass.prototype.publish = function (topic, message) {
  if (!this.client.connected) {
    console.log("客户端未连接");
    return;
  }
  this.client.publish(topic, message, { qos: 1 }, err => {
    if (!err) {
      console.log("主题为" + topic + "发布成功");
    }
  });
};

//取消订阅
mattClass.prototype.unsubscribe = function () {
  this.client.unsubscribe(this.mtopic, error => {
    console.log("主题为" + this.mtopic + "取消订阅成功", error);
  });
};

//断开连接
mattClass.prototype.disconnect = function () {
  if (this.client) {
    this.client.end();
    this.client = null;
    console.log("服务器已断开连接！");
  }
};

export default mattClass;
