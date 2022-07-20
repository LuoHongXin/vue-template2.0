export function exampleRoute(path = "example") {
  return {
    path,
    name: "example",
    component: () => import(/* webpackChunkName: "example" */ "./views")
  };
}
