export function LoginRoute(path = "login") {
  return [
    {
      path,
      name: "login",
      component: () => import(/* webpackChunkName: "login" */ "./views")
    }
  ];
}
