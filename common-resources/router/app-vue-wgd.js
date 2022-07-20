export default function wgdRouter({component}) {
    return [
        {
          path: "/app-vue-wgd",
          component,
          name: "app-vue-wgd",
          redirect: { name: "app-vue-wgd.cluster" },
          meta: {
            title: "winGarden",
            icon: "business-AnQuanGaoJing",
            id: "b7aaaba4f6dd11ecb309000c2945749e"
          },
          children: [
            {
              path: "cluster",
              name: "app-vue-wgd.cluster",
              meta: {
                title: "集群管理"
              }
            },
            {
              path: "newCluster",
              name: "app-vue-wgd.newCluster",
              meta: {
                title: "创建集群",
                icon: ""
              }
            },
            {
              path: "showCluster/:clusterId",
              name: "app-vue-wgd.showCluster",
              meta: {
                title: "集群详情",
                icon: ""
              },
              children: [
                {
                  path: "dashboard",
                  name: "app-vue-wgd.showCluster.dashboard",
                  meta: {
                    title: "集群详情",
                    icon: ""
                  }
                },
                {
                  path: "appRoute",
                  name: "app-vue-wgd.showCluster.appRoute",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "config",
                  name: "app-vue-wgd.showCluster.config",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "node",
                  name: "app-vue-wgd.showCluster.node",
                  meta: {
                    icon: ""
                  }
                },
                {
                  path: "nodeDetails/:nodeId",
                  name: "app-vue-wgd.showCluster.nodeDetails",
                  meta: {
                    title: "",
                    icon: ""
                  },
                  children: [
                    {
                      path: "dashboard",
                      name: "app-vue-wgd.showCluster.nodeDetails.dashboard",
                      meta: {
                        title: "",
                        icon: ""
                      }
                    },
                    {
                      path: "containerGroup",
                      name: "app-vue-wgd.showCluster.nodeDetails.containerGroup",
                      meta: {
                        title: "",
                        icon: ""
                      }
                    },
                    {
                      path: "monitor",
                      name: "app-vue-wgd.showCluster.nodeDetails.monitor",
                      meta: {
                        title: "",
                        icon: ""
                      }
                    },
                    {
                      path: "event",
                      name: "app-vue-wgd.showCluster.nodeDetails.event",
                      meta: {
                        title: "",
                        icon: ""
                      }
                    }
                  ]
                },
                {
                  path: "workLoad",
                  name: "app-vue-wgd.showCluster.workLoad",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "containerGroup",
                  name: "app-vue-wgd.showCluster.containerGroup",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "namespace",
                  name: "app-vue-wgd.showCluster.namespace",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "service",
                  name: "app-vue-wgd.showCluster.service",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "serviceAccount",
                  name: "app-vue-wgd.showCluster.serviceAccount",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "ssh",
                  name: "app-vue-wgd.showCluster.ssh",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "task",
                  name: "app-vue-wgd.showCluster.task",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "volume",
                  name: "app-vue-wgd.showCluster.volume",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "volumeSnapshot",
                  name: "app-vue-wgd.showCluster.volumeSnapshot",
                  meta: {
                    title: "",
                    icon: ""
                  }
                },
                {
                  path: "volumeType",
                  name: "app-vue-wgd.showCluster.volumeType",
                  meta: {
                    title: "",
                    icon: ""
                  }
                }
              ]
            },
            {
              path: "terminal",
              name: "app-vue-wgd.terminal"
            },
            {
              path: "importCluster",
              name: "app-vue-wgd.importCluster",
              meta: {
                title: "导入集群",
                icon: ""
              }
            }
          ]
        }
      ];
}