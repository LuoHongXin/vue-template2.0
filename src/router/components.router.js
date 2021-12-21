/** When your routing table is too long, you can split it into small modules **/

import Layout from "@/layout";

// 根据是否需要登录增加校验
// meta:{
//   needLogin:true
// }

// {
//   path: "/business", // 菜单路由
//   component: Layout, // layout
//   name: "Business",
//   meta: {
//     title: "服务运营", // 菜单标题
//   },
//   children: [{
//     path: "serviceDirectory", // 子菜单路由
//     component: () =>
//       import(
//         /* webpackChunkName: "serviceDirectory" */
//         "@/views/business/ServiceDirectory.vue"
//       ), // 展示的组件
//     name: "ServiceDirectory", // 用于keep-alive页面缓存
//     meta: {
//       title: "服务目录", // 显示name
//       icon: "serviceDirectory", // icon: "el-icon-s-help" 'el-' 用i标签显示 否则 svg 显示
//       permission: "1fca91fe8ec2447fb2b6cbc31d1cba55", // 权限判断是否显示
//       needLogin: true, // 根据是否需要登录增加校验
//       noCache: false // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
//     },
//   }],
// }

const componentsRouter = [
  {
    path: "/business",
    component: Layout,
    name: "Business",
    meta: {
      title: "服务运营",
      id: "1fca91fe8ec2447fb2b6cbc31d1cba55awewa122"
    },
    redirect: "/business/serviceDirectory",
    children: [
      {
        path: "serviceDirectory", // 跳转路径
        component: () =>
          import(
            /* webpackChunkName: "serviceDirectory" */
            "@/views/business/ServiceDirectory.vue"
          ), // 展示的组件
        name: "ServiceDirectory", // 用于keep-alive页面缓存
        meta: {
          title: "服务目录", // 显示name
          icon: "serviceDirectory", // icon: "el-icon-s-help" 'el-' 用i标签显示 否则 svg 显示
          id: "1fca91fe8ec2447fb2b6cbc31d1cba55", // 权限判断是否显示
          needLogin: true,
          noCache: false
        }
      }
    ]
  }
];

export default componentsRouter;
