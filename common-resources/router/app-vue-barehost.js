export default function barehostRouter({component}) {
    return [
        {
          path: "/bare-host",
          name: "bareHost",
          component,
          children: [
            {
              path: "localMange",
              name: "bareHost.localMange",
              redirect: "localMange/bareMetalManagement",
              meta: {
                title: "裸金属管理"
              },
              children: [
                {
                  path: "bareMetalManagement",
                  name: "bareHost.bareMetalManagement",
                  meta: {
                    parentTitle: "裸金属管理",
                    icon: "business-LuoJinShuGuanLi",
                    id: "d2faf598f6dc11ecb309000c2945749e",
                    parent: "localMange"
                  }
                },
                {
                  path: "deviceDiscovery",
                  name: "bareHost.localMange.deviceDiscovery",
                  meta: {
                    hideMenu: true,
                    title: "设备发现",
                    parent: "localMange"
                  }
                },
                {
                  path: "deviceDiscoveryIpmi",
                  name: "bareHost.localMange.deviceDiscoveryIPMI",
                  meta: {
                    hideMenu: false,
                    title: "设备发现",
                    parent: "localMange"
                  }
                },
                {
                  path: "hardwareDetails/:id/:regionUuid",
                  name: "bareHost.localMange.hardwareDetails",
                  meta: {
                    hideMenu: false,
                    title: "详情",
                    parent: "localMange"
                  }
                },
                {
                  path: "ipmiDeviceDetails/:id",
                  name: "bareHost.localMange.ipmiDeviceDetails",
                  meta: {
                    hideMenu: false,
                    title: "详情",
                    parent: "localMange"
                  }
                },
                {
                  path: "modifyPhysicalHost/:id",
                  name: "bareHost.localMange.modifyPhysicalHost",
                  meta: {
                    hideMenu: true,
                    title: "详情",
                    parent: "localMange"
                  }
                }
              ]
            },
            {
              path: "hardwareCentralizeManagePlatform",
              name: "hardwareCentralizeManagePlatform",
              redirect: "hardwareCentralizeManagePlatform/platformList",
              children: [
                {
                  path: "platformList",
                  name: "hardwareCentralizeManagePlatformList",
                  meta: {
                    platformType: "HEMING",
                    title: "平台列表",
                    parent: "hardwareCentralizeManagePlatform"
                  }
                },
                {
                  path: "index",
                  name: "hardwareCentralizeManagePlatformIndex",
                  meta: {
                    parentTitle: "硬件集中管理平台",
                    parent: "hardwareCentralizeManagePlatform"
                  }
                },
                {
                  path: "detail",
                  name: "hardwareCentralizeManagePlatform.detail",
                  meta: {
                    hideMenu: false,
                    title: "详情",
                    parent: "hardwareCentralizeManagePlatform"
                  }
                },
                {
                  path: "template",
                  name: "hardwareCentralizeManagePlatformIndex.template",
                  meta: {
                    hideMenu: true,
                    title: "模板",
                    parent: "hardwareCentralizeManagePlatform"
                  }
                }
              ],
              meta: {
                redirect: "/bare-host/hardwareCentralizeManagePlatform/index",
                title: "SDN硬件管理"
              }
            },
            {
              path: "cobblerManagePlatform",
              name: "cobblerManagePlatform",
              redirect: "cobblerManagePlatform/platformList",
              children: [
                {
                  path: "platformList",
                  name: "cobblerManagePlatformList",
                  meta: {
                    platformType: "COBBLER",
                    title: "平台列表",
                    parent: "cobblerManagePlatform"
                  }
                },
                {
                  path: "index",
                  name: "cobblerManagePlatformIndex",
                  meta: {
                    parentTitle: "cobbler管理平台",
                    parent: "cobblerManagePlatform"
                  }
                },
                {
                  path: "detail",
                  name: "cobblerManagePlatform.detail",
                  meta: {
                    hideMenu: true,
                    title: "物理裸机详情",
                    parent: "cobblerManagePlatform"
                  }
                },
                {
                  path: "deviceType",
                  name: "cobblerManagePlatform.deviceType",
                  meta: {
                    hideMenu: true,
                    title: "设备录入",
                    parent: "cobblerManagePlatform"
                  }
                },
                {
                  path: "installHost",
                  name: "cobblerManagePlatform.installHost",
                  meta: {
                    hideMenu: true,
                    title: "装机",
                    parent: "cobblerManagePlatform"
                  }
                }
              ],
              meta: {
                redirect: "/bare-host/cobblerManagePlatform/index",
                title: "硬件负载均衡"
              }
            }
            // {
            //   path: "hardwarePlatform",
            //   name: "hardwarePlatform",
            //   redirect: "hardwarePlatform/index",
            //   children: [
            //     {
            //       path: "index",
            //       name: "hardwarePlatforms",
            //       meta: {
            //         hideMenu: true,
            //         parentTitle: "硬件集中管理平台",
            //         parent: "hardwareCentralizeManagePlatform"
            //       }
            //     }
            //   ],
            //   meta: {
            //     hideMenu: true,
            //     title: "硬件平台设置"
            //   }
            // }
          ],
          meta: {
            title: "物理裸机"
          }
        }
      ];
}