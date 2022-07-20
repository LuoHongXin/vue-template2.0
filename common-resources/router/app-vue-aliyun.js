export default function aliyunRouter({component}) {
    return [
        {
          path: "/alicloud",
          component,
          redirect: "/alicloud/public-cloudaccount/overview",
          name: "alicloud",
          meta: {
            title: "阿里云资源",
            icon: "business-AliYun",
            id: "a9df7bb9f6dd11ecb309000c2945749e"
          },
          children: [
            {
              path: "public-cloudaccount",
              name: "alicloud.publiccloudaccount",
              redirect: "/alicloud/public-cloudaccount/overview",
              children: [
                {
                  path: "overview",
                  name: "alicloud.publiccloudaccount.overview"
                },
                {
                  path: "account-management",
                  name: "alicloud.publiccloudaccount.account-management",
                  children: [
                    {
                      path: "account-access",
                      name: "alicloud.publiccloudaccount.account-access",
                      meta: {
                        title: "账号接入",
                        parent: "alicloud",
                        menuHidden: true,
                        breadcrumb: true,
                        route: true
                      }
                    }
                  ],
                  meta: {
                    title: "账号管理",
                    parent: "alicloud",
                    menuHidden: true,
                    route: true
                  }
                }
              ],
              meta: {
                title: "概览",
                parent: "alicloud",
                route: true
              }
            },
            {
              path: "calculate",
              name: "alicloud.calculate",
              redirect: "/alicloud/calculate/cloud-server",
              children: [
                {
                  path: "cloud-server",
                  name: "alicloud.calculate.cloudServer",
                  children: [
                    {
                      path: "details/:instanceId/:id",
                      name: "alicloud.calculate.cloudServer.details",
                      meta: {
                        title: "实例详情",
                        menuHidden: true
                      }
                    },
                    {
                      path: "add-cloud-server",
                      name: "alicloud.calculate.cloudServer.addcloudserver",
                      meta: {
                        title: "新建云服务器ECS",
                        menuHidden: true
                      }
                    }
                  ],
                  meta: {
                    title: "云服务器ECS"
                  }
                }
              ]
            },
            {
              path: "storage",
              name: "alicloud.storage",
              redirect: "/alicloud/storage/cloud-dresource",
              children: [
                {
                  path: "cloud-dresource",
                  name: "alicloud.storage.cloudresource",
                  children: [
                    {
                      path: "details/:title/:diskName",
                      name: "alicloud.storage.cloudresource.details",
                      meta: {
                        title: "云硬盘详情",
                        menuHidden: true,
                        breadcrumb: true
                      }
                    },
                    {
                      path: "add-cloud-drive",
                      name: "alicloud.storage.cloudresource.addclouddrive",
                      meta: {
                        title: "创建云硬盘",
                        menuHidden: true
                      }
                    }
                  ],
                  meta: {
                    title: "云硬盘"
                  }
                }
              ]
            },
            {
              path: "dispatcher-task",
              name: "alicloud.dispatcherTask",
              redirect: "/alicloud/dispatcher-task/task-list",
              children: [
                {
                  path: "task-list",
                  name: "alicloud.dispatcherTask.taskList"
                }
              ],
              meta: {
                title: "调度任务"
              }
            }
          ]
        }
      ];
}