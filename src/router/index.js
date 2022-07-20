import Vue from "vue";
import indexViews from "@/views";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 像前端的读写文件 路径 读取的子目录
const files = require.context("./", true, /.router.js$/);
const routes = [];
files.keys().forEach(key => {
  routes.push(...files(key).default);
});
// 解决router版本过高 重复点击路由控制台报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
// 入口文件
const router = new VueRouter({
  // mode: "history",
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [
    // 子应用只有一个根路由
    {
      name: "example-app",
      path: "/example-app",
      component: indexViews,
      children: routes
    }
  ]
});
export const routesList = routes;
export default router;
