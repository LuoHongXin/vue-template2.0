export default function vmwareRouter({component}) {
    return [
        {
          path: "/app-vue-vmware",
          component,
          name: "app-vue-vmware",
          meta: {
            icon: "VMware"
          },
          children: [
            {
              path: "commect-platform",
              name: "app-vue-vmware.commectPlatform"
            },
            {
              path: "vcenter/:vcenterId",
              name: "app-vue-vmware.vcenter"
            },
            {
              path: "create-virtual-machine/:vcenterId",
              name: "app-vue-vmware.createVirtualMachine"
            },
            {
              path: "dcenter/:vcenterId/:dataCenterId",
              name: "app-vue-vmware.dcenter"
            },
            {
              path: "cluster/:vcenterId/:resPoolId",
              name: "app-vue-vmware.cluster"
            },
            {
              path: "host/:vcenterId/:hostId",
              name: "app-vue-vmware.host"
            },
            {
              path: "virtualMachine/:vcenterId/:hostId/:virtualMachineId",
              name: "app-vue-vmware.virtualMachine"
            },
            {
              path: "storagePoolDetails/:vcenterId/:id/:storageId",
              name: "app-vue-vmware.storagePoolDetails"
            }
          ]
        }
      ];
}