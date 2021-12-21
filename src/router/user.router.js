export default [
  {
    path: "/reg",
    name: "Reg",
    // route level code-splitting
    // this generates a separate chunk (reg.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "reg" */ "@/views/user/Reg.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "@/views/user/Login.vue")
  }
];
