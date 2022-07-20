export default function maintainRouter({component}) {
    return [
        {
          path: "/app-vue-maintain",
          component,
          name: "app-vue-maintain",
          meta: {
            title: "运维",
            icon: "app-vue-maintain"
          },
          children: [
            {
              path: "monitor",
              name: "maintain.monitor",
              redirect: {
                name: "maintain.monitor.overview"
              },
              meta: {
                title: "监控告警"
              },
              children: [
                {
                  path: "overview",
                  name: "maintain.monitor.overview",
                  meta: {
                    icon: "business-GaiLan",
                    id: "5265f04bf6dd11ecb309000c2945749e",
                    title: "概览"
                  }
                },
                {
                  path: "performanceMonitor",
                  name: "maintain.monitor.performanceMonitor",
                  meta: {
                    id: "57d29ae5f6dd11ecb309000c2945749e",
                    icon: "business-XingNengJianKong",
                    title: "性能监控"
                  }
                },
                {
                  path: "alarmList",
                  name: "maintain.monitor.alarmList",
                  meta: {
                    title: "告警列表",
                    icon: "business-GaoJingLieBiao",
                    id: "4d81bd82f6dd11ecb309000c2945749e"
                  }
                },
                {
                  path: "alarmConfig",
                  name: "maintain.monitor.alarmConfig",
                  meta: {
                    icon: "business-GaoJingPeiZhi",
                    title: "告警配置",
                    id: "gaojingpeizhi"
                  }
                }
              ]
            },
            {
              path: "businessSystem",
              name: "maintain.businessSystem",
              meta: {
                title: "业务系统",
                icon: "business-YeWuXiTong",
                id: "f43a7704f89a42c89af68cd0e0e7ea9b"
              },
              redirect: {
                name: "maintain.businessSystem.operationSystemIndex"
              },
              children: [
                {
                  path: "operationSystemIndex",
                  name: "maintain.businessSystem.operationSystemIndex",
                  meta: {
                    icon: "allFun",
                    title: "业务系统"
                  }
                },
                {
                  path: "operationSystemDetail",
                  name: "maintain.businessSystem.operationSystemDetail",
                  meta: {
                    icon: "allFun",
                    title: "业务系统详情"
                  }
                }
              ]
            },
            {
              path: "operation",
              name: "maintain.operation",
              meta: {
                title: "日常运维",
                id: "2c6c39fa-025f-476a-84c3-fce5b88f6680"
              },
              children: [
                {
                  path: "inspection",
                  name: "maintain.operation.Inspection",
                  meta: {
                    icon: "business-YiJianXunJian",
                    title: "一键巡检",
                    id: "5fc8ea05f6dd11ecb309000c2945749e"
                  }
                },
                {
                  path: "installationWork",
                  name: "maintain.operation.installationWork",
                  meta: {
                    icon: "business-AnZhuangZuoYe",
                    title: "安装作业",
                    id: "62334102f6dd11ecb309000c2945749e"
                  }
                },
                {
                  path: "workOrderManagement",
                  name: "maintain.operation.workOrderManagement",
                  meta: {
                    icon: "business-GongDanGuangLi",
                    title: "工单管理",
                    id: "64bfd99af6dd11ecb309000c2945749e"
                  },
                  redirect: {
                    name: "maintain.operation.workOrderManagement.index"
                  },
                  children: [
                    {
                      path: "index",
                      name: "maintain.operation.workOrderManagement.index",
                      meta: {
                        icon: "GongDanGuanLi",
                        title: "工单列表"
                      }
                    },
                    {
                      path: ":uuid/workOrderDetail",
                      name: "maintain.operation.workOrderManagement.workOrderDetail",
                      meta: {
                        icon: "GongDanGuanLi",
                        title: "工单详情"
                      }
                    },
                    {
                      path: "createWorkOrder",
                      name: "maintain.operation.workOrderManagement.createWorkOrder",
                      meta: {
                        icon: "GongDanGuanLi",
                        title: "新增工单"
                      }
                    }
                  ]
                }
              ]
            },
            {
              path: "auditLog",
              name: "maintain.auditLog",
              meta: {
                title: "审计日志",
                id: "cc3bcae3-59cd-4622-af47-c5a07b2486d0"
              },
              children: [
                {
                  path: "operationLog",
                  name: "maintain.auditLog.operationLog",
                  meta: {
                    icon: "business-CaoZuoRiZhi",
                    title: "操作日志",
                    id: "8caf510ff6dd11ecb309000c2945749e"
                  }
                },
                {
                  path: "loginLog",
                  name: "maintain.auditLog.loginLog",
                  meta: {
                    icon: "business-DengLuRiZhi",
                    title: "登录日志",
                    id: "90776fddf6dd11ecb309000c2945749e"
                  }
                }
              ]
            },
            {
              path: "messageNotification",
              name: "maintain.messageNotification",
              redirect: {
                name: "maintain.messageNotification.messageLog"
              },
              meta: {
                title: "消息通知",
                id: "ba7703d1a017431388d6dab69204e9d0"
              },
              children: [
                {
                  path: "messageLog",
                  name: "maintain.messageNotification.messageLog",
                  meta: {
                    icon: "business-XiaoXiJiLu",
                    title: "消息记录",
                    id: "7e9b1053f6dd11ecb309000c2945749e"
                  }
                },
                {
                  path: "advertiseMessage",
                  name: "maintain.messageNotification.advertiseMessage",
                  meta: {
                    icon: "business-GongGaoXiaoXi",
                    title: "公告消息",
                    id: "8121356cf6dd11ecb309000c2945749e"
                  }
                },
                {
                  path: "messageSettings",
                  name: "maintain.messageNotification.messageSettings",
                  meta: {
                    icon: "business-XiaoXiSheZhi",
                    title: "消息设置",
                    id: "84e31e4ff6dd11ecb309000c2945749e"
                  }
                },
                {
                  path: "messageServerConfig",
                  name: "maintain.messageNotification.messageServerConfig",
                  meta: {
                    icon: "business-XiaoXiFuWuQiPeiZhi",
                    title: "消息服务器配置",
                    id: "894ab6a2f6dd11ecb309000c2945749e"
                  }
                }
              ]
            },
            {
              path: "heterogeneous",
              name: "maintain.heterogeneous",
              meta: {
                title: "异构私有云",
                id: "a6ab1b40f6dd11ecb309000c2945749e",
                icon: "business-PingTai1"
              }
            }
          ]
        }
      ];
}