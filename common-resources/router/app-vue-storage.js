export default function storageRouter({component}) {
    return [
        {
          path: "/storage/dataStorage",
          component,
          name: "DataStorage",
          redirect: { name: "DataStorage.StoragePoolManagement" },
          meta: {
            title: "数据存储",
            id: "989f89b3f6dd11ecb309000c2945749e",
            icon: "business-CunChu"
          },
          children: [
            {
              path: "storagePool/storagePoolManagement",
              name: "DataStorage.StoragePoolManagement",
              meta: {
                title: "存储池",
                needLogin: true,
                noCache: false
              }
            },
            {
              path: "storagePool/:id/storagePoolDetails",
              name: "DataStorage.StoragePoolDetails",
              meta: {
                title: "存储池详情",
                icon: "",
                needLogin: true,
                noCache: false
              }
            },
            {
              path: "storagePool/createStoragePool",
              name: "CreateStoragePool",
              meta: {
                title: "新建存储池",
                icon: "",
                needLogin: true,
                noCache: false
              }
            },
            {
              path: "storagePool/mirrorStoragePool",
              redirect: "mirrorStoragePool/storagePoolManagement",
              name: "mirrorStoragePool",
              meta: {
                title: "镜像存储池",
                icon: "",
                needLogin: true,
                noCache: false
              },
              children: [
                {
                  path: "storagePoolManagement",
                  name: "mirrorStoragePool.storagePoolManagement",
                  meta: {
                    title: "存储池管理",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: ":id/mirrorStoragePoolDetails",
                  name: "mirrorStoragePoolDetails",
                  meta: {
                    title: "存储池详情",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: "mirrorStoragePoolCreateStoragePool",
                  name: "mirrorStoragePoolCreateStoragePool",
                  meta: {
                    title: "新建存储池",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            }
          ]
        },
        {
          path: "/storage/storageResource",
          component: Layout,
          name: "StorageResource",
          meta: {
            title: "存储资源",
            id: ""
          },
          children: [
            {
              path: "FC-SAN",
              name: "FC-SAN",
              meta: {
                title: "FC-SAN",
                icon: "business-CunChuZiYuan",
                id: "9c437978f6dd11ecb309000c2945749e",
                needLogin: true,
                noCache: false
              }
            },
            {
              path: "nvme",
              name: "NVMe",
              meta: {
                title: "NVMe",
                icon: "NVMe",
                id: "73f9ae21-eba9-4c9c-be22-14af70792b71",
                needLogin: true,
                noCache: false
              }
            },
            {
              path: "IP-SAN",
              name: "IP-SAN",
              meta: {
                title: "IP-SAN",
                icon: "ipSan",
                id: "fd965be1-3629-49d0-a956-1e26100143bc",
                needLogin: true,
                noCache: false
              },
              children: [
                {
                  path: "management",
                  name: "IpSanManagement",
                  meta: {
                    // title: "IP-SAN",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: ":id/details",
                  name: "StorageDeviceDetails",
                  meta: {
                    title: "存储设备详情",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            },
            {
              path: "NAS",
              name: "NAS",
              meta: {
                title: "NAS",
                icon: "nas",
                id: "452eb740-ae6c-4458-ae30-bb6b6887ab3c",
                needLogin: true,
                noCache: false
              },
              children: [
                {
                  path: "management",
                  name: "NasManagement",
                  meta: {
                    // title: "NAS",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: ":id/details",
                  name: "NasDetails",
                  meta: {
                    title: "存储资源详情",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            },
            {
              path: "distributedStorage",
              name: "distributedStorage",
              meta: {
                title: "分布式存储",
                icon: "distributedStorage",
                id: "99d57828-8fd2-4bbb-8e6e-27893182a6ca",
                needLogin: true,
                noCache: false
              },
              children: [
                {
                  path: "management",
                  name: "DistributeStorageManagement",
                  meta: {
                    // title: "NAS",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                },
                {
                  path: ":id/details",
                  name: "DistributeStorageDetails",
                  meta: {
                    title: "存储资源详情",
                    icon: "",
                    needLogin: true,
                    noCache: false
                  }
                }
              ]
            }
          ]
        }
      ];
}