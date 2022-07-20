export default function wstRouter({component}) {
    return [
        {
          path: "/app-vue-wst",
          component,
          redirect: "/app-vue-wst/index",
          name: "WinStorage",
          meta: {
            title: "存储",
            icon: "business-AnQuanGaoJing",
            id: "df38cc3cf6dc11ecb309000c2945749e"
          },
          children: [
            {
              path: "/app-vue-wst/business",
              name: "Business",
              meta: {
                title: "服务运营",
                id: "1fca91fe8ec2447fb2b6cbc31d1cba55awewa122"
              },
              redirect: "/app-vue-wst/business/serviceDirectory",
              children: [
                {
                  path: "serviceDirectory",
                  name: "ServiceDirectory",
                  meta: {
                    title: "服务目录",
                    icon: "serviceDirectory",
                    id: "1fca91fe8ec2447fb2b6cbc31d1cba55",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "order",
                  name: "Order",
                  meta: {
                    title: "订单审批",
                    icon: "order",
                    id: "ca0634c5cd684df491f97d6d9e47b2b2",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "workflow",
                  name: "WorkFlow",
                  meta: {
                    title: "流程管理",
                    icon: "workflow",
                    id: "d96d6d970ab441d29fa34a3cfd97fa7e",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "billingManager",
                  name: "BillingManager",
                  meta: {
                    title: "计费管理",
                    icon: "billingManager",
                    id: "53f72fcc790c4a7a849d4c6f5089304d",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "reportManager",
                  name: "ReportManager",
                  meta: {
                    title: "报表管理",
                    icon: "reportManager",
                    id: "285473a6511540b9acece1fd7a541003",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/resource",
              name: "Resource",
              meta: {
                title: "资源管理",
                id: "fa1aa081-bc7d-4c0c-9daf-4ac497007813"
              },
              children: [
                {
                  path: "storagePoolManagement",
                  name: "StoragePoolManagement",
                  meta: {
                    title: "存储池管理",
                    icon: "storagePoolManagement",
                    id: "f6bfd3a8-cc7c-4e17-9ab3-04e7fe69815c",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "dataDiskSystem",
                  name: "DataDiskSystem",
                  meta: {
                    title: "数据盘管理",
                    icon: "dataDiskSystem",
                    id: "fc488f4a-59ae-4ceb-af45-b64feaf48bd5",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "cacheDiskSystem",
                  name: "CacheDiskSystem",
                  meta: {
                    title: "缓存盘管理",
                    icon: "cacheDiskSystem",
                    id: "c31dc4c7-2603-4fe1-8f51-7885bef17204",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "logDiskSystem",
                  name: "LogDiskSystem",
                  meta: {
                    title: "日志盘管理",
                    icon: "logDiskSystem",
                    id: "2d451df5-b697-4276-9b8a-56ff48f6a1ea",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "serverSystem",
                  name: "ServerSystem",
                  meta: {
                    title: "服务器管理",
                    icon: "serverSystem",
                    id: "cf13102a-5efc-40a4-bd9a-ce045bc7bc42",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "VDC",
                  name: "VDC",
                  meta: {
                    title: "VDC管理",
                    icon: "VDC",
                    id: "a759cfe62b3d4b6292d516c774654a05",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "bussinessSystem",
                  name: "BussinessSystem",
                  meta: {
                    title: "业务系统",
                    icon: "bussinessSystem",
                    id: "f43a7704f89a42c89af68cd0e0e7ea9b",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "VMS",
                  name: "VMS",
                  meta: {
                    title: "资源实例",
                    icon: "VMS",
                    id: "0e6ab27955e04f088e3d797fab85e0ef",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "vpcMain",
                  name: "VpcMain",
                  meta: {
                    title: "VPC管理",
                    icon: "vpcMain",
                    id: "d756fccbae4b47fdb7632d5e6f3ebcd5",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "orcManager",
                  name: "OrcManager",
                  meta: {
                    title: "资源编排",
                    icon: "orcManager",
                    id: "12fd18b2424b4bbca132547704acc448",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "bussinesscutover",
                  name: "BussinessCutover",
                  meta: {
                    title: "业务割接",
                    icon: "bussinesscutover",
                    id: "ef2223fce21c4d8e8335643ece57de9d",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "recycleMain",
                  name: "RecycleMain",
                  meta: {
                    title: "回收站",
                    icon: "recycleMain",
                    id: "f888347756f549299f501b24d3b5ba40",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/blockStorage",
              name: "BlockStorage",
              meta: {
                title: "块存储",
                id: "4a4e6ae5-28fd-443b-b70b-e4a5a6120a9d"
              },
              redirect: "/app-vue-wst/blockStorage/blockStorageVolume",
              children: [
                {
                  path: "blockStorageVolume",
                  name: "BlockStorageVolume",
                  meta: {
                    title: "块存储卷",
                    icon: "blockStorage",
                    id: "ebcfbb67-ae99-4cbd-988c-bb05f9da84fe",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/monitor",
              name: "Monitor",
              meta: {
                title: "运维监控",
                id: "6c20a2b2-a2bc-4c82-8960-ec7307fa0377"
              },
              redirect: "/app-vue-wst/monitor/operationManager",
              children: [
                {
                  path: "operationManager",
                  name: "OperationManager",
                  meta: {
                    title: "告警信息",
                    icon: "operationManager",
                    id: "5f9cc14f-b2a7-4e76-ab47-032725891c1d",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "capabilityManager",
                  name: "CapabilityManager",
                  meta: {
                    title: "容量监控",
                    icon: "capabilityManager",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "installWork",
                  name: "InstallWork",
                  meta: {
                    title: "安装作业",
                    icon: "installWork",
                    id: "841fabf6e35211ea995f0a580a2a03c6",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "tasklogManager",
                  name: "TasklogManager",
                  meta: {
                    title: "任务日志",
                    icon: "tasklogManager",
                    id: "7417d13f-a8b2-4654-b352-446854f4e7dc",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "notifyManager",
                  name: "NotifyManager",
                  meta: {
                    title: "消息通知",
                    icon: "notifyManager",
                    id: "f0768a02-e263-4f4a-9f81-5a7359fa0f75",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "clusterParameters",
                  name: "ClusterParameters",
                  meta: {
                    title: "集群参数",
                    icon: "clusterParameters",
                    id: "be944edd-aa15-476b-b986-7f5f8710e3d0",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/baseResource",
              name: "BaseResource",
              meta: {
                title: "基础设施",
                id: "b5015d1b191a44b3b0ae60e15bb4638a212"
              },
              redirect: "/app-vue-wst/baseResource/resourceaccess",
              children: [
                {
                  path: "resourceaccess",
                  name: "Resourceaccess",
                  meta: {
                    title: "资源入云",
                    icon: "resourceaccess",
                    id: "b5015d1b191a44b3b0ae60e15bb4638a",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "datacenter",
                  name: "DataCenter",
                  meta: {
                    title: "数据中心",
                    icon: "datacenter",
                    id: "680da311f6dd11ecb309000c2945749e",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "availpartitions",
                  name: "Availpartitions",
                  meta: {
                    title: "可用分区",
                    icon: "availpartitions",
                    id: "71999b18f6dd11ecb309000c2945749e",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "softwareAndScriptManager",
                  name: "SoftwareAndScriptManager",
                  meta: {
                    title: "软件及脚本",
                    icon: "softwareAndScriptManager",
                    id: "766ec1a1263a4594a59390f880de0c60",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/baseResource",
              name: "BaseResource",
              meta: {
                title: "基础设施",
                id: "b5015d1b191a44b3b0ae60e15bb4638a212"
              },
              redirect: "/app-vue-wst/baseResource/resourceaccess",
              children: [
                {
                  path: "resourceaccess",
                  name: "Resourceaccess",
                  meta: {
                    title: "资源入云",
                    icon: "resourceaccess",
                    id: "b5015d1b191a44b3b0ae60e15bb4638a",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/LicenseManagement",
              name: "LicenseManagement",
              meta: {
                firstMenu: true,
                title: "许可管理",
                icon: "serviceDirectory",
                id: "18ba1aaa-73d5-42c7-95ee-8b57aeac9afb"
              },
              redirect: "/app-vue-wst/LicenseManagement/index",
              isCollect: false,
              children: [
                {
                  path: "index",
                  name: "WinstoreLicenseManagement",
                  meta: {
                    title: "",
                    icon: "serviceDirectory",
                    id: "18ba1aaa-73d5-42c7-95ee-8b57aeac9afb",
                    noCache: true
                  }
                }
              ]
            },
            {
              path: "/redirect",
              hidden: true,
              children: [
                {
                  path: "/redirect/:path(.*)"
                }
              ]
            },
            {
              path: "/",
              redirect: "/home",
              isCollect: true,
              children: [
                {
                  path: "home",
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
              redirect: "/home/index",
              isCollect: true,
              children: [
                {
                  path: "index",
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
              path: "/app-vue-wst",
              isCollect: false,
              children: [
                {
                  path: "index",
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
              path: "/app-vue-wst/task",
              name: "Task",
              meta: {
                title: "任务日志",
                id: "1fca91fe8ec2447fb2b6c22bc31d1cba55awewa122ss"
              },
              isCollect: false,
              children: [
                {
                  path: "index",
                  name: "WinstoreTasklogManager",
                  meta: {
                    title: "",
                    icon: "serviceDirectory",
                    id: "1fca91fe8ec2447fb2b622cbcsss31d1cba55",
                    noCache: true
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/clusterManagement",
              name: "ClusterManagement",
              meta: {
                title: "集群管理",
                id: "1fca91fe8ec2447fb2b6c22bc31d1cba55awewa122"
              },
              isCollect: false,
              children: [
                {
                  path: "index",
                  name: "WinstoreClusterManagement",
                  meta: {
                    title: "",
                    icon: "serviceDirectory",
                    id: "1fca91fe8ec2447fb2b622cbc31d1cba55",
                    noCache: true
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/clusterManagement",
              hidden: true,
              children: [
                {
                  path: "form",
                  name: "WinstoreClusterManagementForm",
                  meta: {
                    title: "新建集群",
                    icon: "",
                    needLogin: true,
                    path: [
                      {
                        back: true,
                        path: "/app-vue-wst/clusterManagement/index"
                      },
                      {
                        path: "/",
                        name: "首页"
                      },
                      {
                        path: "/app-vue-wst/clusterManagement/index",
                        name: "集群管理"
                      },
                      {
                        path: "/app-vue-wst/clusterManagement/form",
                        name: "新建集群"
                      }
                    ]
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/serverSystem",
              hidden: true,
              children: [
                {
                  path: "form",
                  name: "WinstoreForm",
                  meta: {
                    title: "添加节点",
                    icon: "",
                    needLogin: true,
                    path: [
                      {
                        back: true,
                        path: "/app-vue-wst/resource/serverSystem"
                      },
                      {
                        path: "/",
                        name: "首页"
                      },
                      {
                        path: "/app-vue-wst/resource/serverSystem",
                        name: "服务器管理"
                      },
                      {
                        path: "/app-vue-wst/serverSystem/form",
                        name: "添加节点"
                      }
                    ]
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/storagePoolDetail",
              hidden: true,
              children: [
                {
                  path: "index",
                  name: "WinstoreDetail",
                  meta: {
                    redirect: "/app-vue-wst/resource/storagePoolManagement",
                    title: "存储池详情",
                    icon: "",
                    needLogin: true,
                    path: [
                      {
                        back: true,
                        path: "/app-vue-wst/resource/storagePoolManagement"
                      },
                      {
                        path: "/app-vue-wst/resource/storagePoolManagement",
                        name: "存储池管理"
                      },
                      {
                        path: "/app-vue-wst/storagePoolDetail/index",
                        name: "存储池详情"
                      }
                    ]
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/diskDetail",
              hidden: true,
              children: [
                {
                  path: "index",
                  name: "WinstoreDataDetail",
                  meta: {
                    redirect: "/app-vue-wst/resource/dataDiskSystem",
                    title: "数据盘详情",
                    icon: "",
                    needLogin: true,
                    noCache: false,
                    path: [
                      {
                        back: true,
                        path: "/app-vue-wst/resource/dataDiskSystem"
                      },
                      {
                        path: "/app-vue-wst/resource/dataDiskSystem",
                        name: "数据盘管理"
                      },
                      {
                        path: "/app-vue-wst/diskDetail/index",
                        name: "数据盘详情"
                      }
                    ]
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/cacheDetail",
              hidden: true,
              children: [
                {
                  path: "index",
                  name: "WinstoreCacheDetail",
                  meta: {
                    redirect: "/app-vue-wst/resource/cacheDiskSystem",
                    title: "缓存盘详情",
                    icon: "",
                    needLogin: true,
                    noCache: false,
                    path: [
                      {
                        back: true,
                        path: "/app-vue-wst/resource/cacheDiskSystem"
                      },
                      {
                        path: "/app-vue-wst/resource/cacheDiskSystem",
                        name: "缓存盘管理"
                      },
                      {
                        path: "/app-vue-wst/cacheDetail/index",
                        name: "缓存盘详情"
                      }
                    ]
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/logDetail",
              hidden: true,
              children: [
                {
                  path: "index",
                  name: "WinstoreLogDetail",
                  meta: {
                    redirect: "/app-vue-wst/resource/logDiskSystem",
                    title: "日志盘详情",
                    icon: "",
                    needLogin: true,
                    noCache: false,
                    path: [
                      {
                        back: true,
                        path: "/app-vue-wst/resource/logDiskSystem"
                      },
                      {
                        path: "/app-vue-wst/resource/logDiskSystem",
                        name: "日志盘管理"
                      },
                      {
                        path: "/app-vue-wst/logDetail/index",
                        name: "日志盘详情"
                      }
                    ]
                  }
                }
              ]
            },
            {
              path: "/app-vue-wst/serverDetail",
              hidden: true,
              children: [
                {
                  path: "index",
                  name: "WinstoreServerDetail",
                  meta: {
                    redirect: "/app-vue-wst/resource/serverSystem",
                    title: "服务器详情",
                    icon: "",
                    needLogin: true,
                    noCache: false,
                    path: [
                      {
                        back: true,
                        path: "/app-vue-wst/resource/serverSystem"
                      },
                      {
                        path: "/app-vue-wst/resource/serverSystem",
                        name: "服务器管理"
                      },
                      {
                        path: "/app-vue-wst/serverDetail/index",
                        name: "服务器详情"
                      }
                    ]
                  }
                }
              ]
            },
            {
              path: "/reg",
              name: "Reg"
            },
            {
              path: "/login",
              name: "Login"
            }
          ]
        }
      ];
}