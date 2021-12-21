/*
 * @Author: luohongxin
 * @Date: 2021-01-25 14:11:59
 * @Last Modified by: luohongxin
 * @Last Modified time: 2021-01-25 14:11:59
 * @describe: 切换代理环境后需要重新 yarn dev
 */

const userDev = {
  api: "http://192.168.205.213:8080/",
  socket: "http://192.168.205.213:8086/websocket",
  account: {
    user: "admin",
    pwd: "1234567890"
  }
};

// const userDev = {
//   api:"http://192.168.205.252:8080/",
//   socket:"http://192.168.205.213:8086/websocket",
//   account:{
//     user: "admin",
//     pwd: "passw0rd"
//   }
// }

// const userDev = {
//   api:"http://192.168.105.248:8080/",
//   socket:"http://192.168.205.213:8086/websocket",
//   account:{
//     user: "admin",
//     pwd: "passw0rd"
//   }
// }

module.exports = {
  userDev
};
