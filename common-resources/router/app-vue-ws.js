export default function wsRouter({component}) {
    return [
        {
          path: "/app-vue-ws",
          component,
          name: "ws",
          redirect: { name: "ws.vr.calculate" },
          meta: {
            title: "虚拟化资源",
            icon: "business-JiSuanZiYuan",
            id: "94b1ecb9f6dd11ecb309000c2945749e"
          },
          children: [
            {
              path: "vr",
              name: "ws.vr",
              redirect: {
                name: "ws.vr.calculate"
              },
              children: [
                {
                  path: "calculate",
                  name: "ws.vr.calculate"
                },
                {
                  path: "storage",
                  name: "ws.vr.storage"
                },
                {
                  path: "addStoragePool",
                  name: "ws.vr.addStoragePool"
                },
                {
                  path: "addStoragePool",
                  name: "ws.vr.addVirtualMachine"
                },
                {
                  path: "customLayout",
                  name: "ws.vr.customLayout"
                },
                {
                  path: "addHost",
                  name: "ws.vr.addHost"
                }
              ]
            }
          ]
        }
      ];
}