export default function huaweicloudRouter({component}) {
    return [
        {
          path: "/hwcloud",
          component,
          redirect: "/hwcloud/public-cloudaccount",
          name: "hwcloud",
          meta: {
            title: "华为云资源",
            icon: "business-HuaWeiYun",
            id: "ae5c4b69f6dd11ecb309000c2945749e"
          },
          children: [
            {
              path: "public-cloudaccount",
              name: "hwcloud.publiccloudaccount",
              redirect: "/hwcloud/public-cloudaccount/overview",
              children: [
                {
                  path: "overview",
                  name: "hwcloud.publiccloudaccount.overview",
                  meta: {
                    menuHidden: false
                  }
                },
                {
                  path: "account-management",
                  name: "hwcloud.publiccloudaccount.account-management",
                  children: [
                    {
                      path: "account-access",
                      name: "hwcloud.publiccloudaccount.account-access",
                      meta: {
                        title: "账号接入",
                        parent: "hwcloud",
                        menuHidden: true,
                        breadcrumb: true,
                        route: true
                      }
                    }
                  ],
                  meta: {
                    title: "账号管理",
                    parent: "hwcloud",
                    menuHidden: true,
                    route: true
                  }
                }
              ],
              meta: {
                title: "概览",
                parent: "hwcloud",
                menuHidden: false
              }
            },
            {
              path: "calculate",
              name: "hwcloud.calculate",
              redirect: "/hwcloud/calculate/cloud-server",
              children: [
                {
                  path: "cloud-server",
                  name: "hwcloud.calculate.cloudServer",
                  children: [
                    {
                      path: "details/:id/:regionId",
                      name: "hwcloud.calculate.cloudServer.details",
                      meta: {
                        title: "实例详情",
                        menuHidden: true
                      }
                    },
                    {
                      path: "add-cloud-server",
                      name: "hwcloud.calculate.cloudServer.addcloudserver",
                      meta: {
                        title: "新建云服务器",
                        menuHidden: true
                      }
                    },
                    {
                      path: "renewal",
                      name: "hwcloud.calculate.cloudServer.renewal",
                      meta: {
                        menuHidden: true
                      }
                    }
                  ],
                  meta: {
                    title: "云服务器",
                    menuHidden: false
                  }
                }
              ],
              meta: {
                menuHidden: false
              }
            },
            {
              path: "storage",
              name: "hwcloud.storage",
              redirect: "/hwcloud/storage/cloud-dresource",
              children: [
                {
                  path: "cloud-dresource",
                  name: "hwcloud.storage.cloudresource",
                  children: [
                    {
                      path: "details/:title/:diskName",
                      name: "hwcloud.storage.cloudresource.details",
                      meta: {
                        title: "云硬盘详情",
                        menuHidden: true,
                        breadcrumb: true
                      }
                    },
                    {
                      path: "capacity",
                      name: "hwcloud.storage.cloudresource.capacity",
                      meta: {
                        title: "扩容磁盘",
                        menuHidden: true,
                        breadcrumb: true
                      }
                    },
                    {
                      path: "add-cloud-drive",
                      name: "hwcloud.storage.cloudresource.addclouddrive",
                      meta: {
                        title: "新建云硬盘",
                        menuHidden: true
                      }
                    }
                  ],
                  meta: {
                    title: "云硬盘",
                    menuHidden: false
                  }
                }
              ]
            },
            {
              path: "dispatcher-task",
              name: "hwcloud.dispatcherTask",
              redirect: "/hwcloud/dispatcher-task/task-list",
              children: [
                {
                  path: "task-list",
                  name: "hwcloud.dispatcherTask.taskList"
                }
              ],
              meta: {
                title: "调度任务",
                menuHidden: false
              }
            }
          ]
        }
      ];
}