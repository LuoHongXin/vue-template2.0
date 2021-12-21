/* Layout */
import Layout from "@/layout";

const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () =>
          import(/* webpackChunkName: "redirect" */ "@/views/redirect")
      }
    ]
  },
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    isCollect: true,
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/Home.vue"),
        name: "Home",
        meta: {
          title: "总览",
          icon: "home",
          id: "001",
          needLogin: true
        }
      }
    ]
  },
  {
    path: "/home",
    component: Layout,
    redirect: "/home/index",
    isCollect: true,
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "home" */ "@/views/home/Home.vue"),
        name: "Home",
        meta: {
          title: "所有功能",
          icon: "allFun",
          id: "002",
          needLogin: true
        }
      }
    ]
  },
  {
    path: "/table",
    component: Layout,
    redirect: "/table/index",
    isCollect: true,
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName: "tabele" */ "@/views/table/index.vue"),
        name: "table",
        meta: {
          title: "table表格",
          icon: "allFun",
          id: "003",
          needLogin: true
        }
      }
    ]
  }
];
export default constantRoutes;
