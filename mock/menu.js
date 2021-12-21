export default menu = [{
    group: "business",
    name: "服务运营",
    items: [{
        name: "服务管理",
        icon: "FuWu",
        svg: "FuWu-White",
        url: "#/main/bussinessFrame/service/serviceDirectory",
        permission: "1fca91fe8ec2447fb2b6cbc31d1cba55",
        currentMenu: "serviceDirectory"
      },
      {
        name: "订单审批",
        icon: "DingDanShenPi",
        svg: "DingDanShenPi",
        url: "#/main/bussinessFrame/order/index",
        permission: "ca0634c5cd684df491f97d6d9e47b2b2",
        currentMenu: "order"
      },
      {
        name: "流程管理",
        icon: "LiuChenSeZhi",
        svg: "LiuChenSeZhi-White",
        url: "#/main/systemManagerFrame/workflow/index",
        permission: "d96d6d970ab441d29fa34a3cfd97fa7e",
        currentMenu: "workflow"
      },
      {
        name: "计费管理",
        icon: "JiFeiZhangDan",
        svg: "JiFeiZhangDan-White",
        url: "#/main/systemManagerFrame/billing/billingManager",
        permission: "53f72fcc790c4a7a849d4c6f5089304d",
        currentMenu: "billingManager"
      },
      {
        name: "报表管理",
        icon: "YeWuBaoBiao",
        svg: "YeWuBaoBiao-White",
        url: "#/main/reportFrame/report/reportManager",
        permission: "285473a6511540b9acece1fd7a541003",
        currentMenu: "reportManager"
      }
    ]
  },
  {
    group: "resource",
    name: "资源管理",
    items: [{
        name: "VDC管理",
        icon: "VDC",
        svg: "VDC-White",
        url: "#/main/bussinessFrame/VDC/main/index",
        permission: "a759cfe62b3d4b6292d516c774654a05",
        currentMenu: "vdc"
      },
      {
        name: "业务系统",
        icon: "YeWuXiTong1",
        svg: "YeWuXiTong-White",
        url: "#/main/bussinessFrame/bussystem/main/index/0",
        permission: "f43a7704f89a42c89af68cd0e0e7ea9b",
        currentMenu: "bussinessSystem"
      },
      {
        name: "资源实例",
        icon: "ZiYuanShiLi",
        svg: "ZiYuanShiLi-White",
        url: "#/main/bussinessFrame/instance/resource/vms",
        permission: "0e6ab27955e04f088e3d797fab85e0ef",
        currentMenu: "vms"
      },
      {
        name: "VPC管理",
        icon: "VPC",
        svg: "VPC-White",
        url: "#/main/bussinessFrame/instance/VPC",
        permission: "d756fccbae4b47fdb7632d5e6f3ebcd5",
        currentMenu: "vpcMain"
      },
      {
        name: "资源编排",
        icon: "ZiYuanBianPai1",
        svg: "ZiYuanBianPai-White",
        url: "#/main/bussinessFrame/resourcedesign/orcManager",
        permission: "12fd18b2424b4bbca132547704acc448",
        currentMenu: "orcManager"
      },
      {
        name: "业务割接",
        icon: "YeWuGeJie",
        svg: "YeWuGeJie-White",
        url: "#/main/bussinessFrame/bussinesscutover/index",
        permission: "ef2223fce21c4d8e8335643ece57de9d",
        currentMenu: "bussinesscutover"
      },
      {
        name: "回收站",
        icon: "ShanChu-white",
        svg: "ShanChu-white",
        url: "#/main/bussinessFrame/instance/recycle",
        permission: "f888347756f549299f501b24d3b5ba40",
        currentMenu: "recycleMain"
      }
    ]
  },
  {
    group: "monitor",
    name: "运维监控",
    items: [{
        name: "监控告警",
        icon: "JianKongGaoJing",
        svg: "JianKongGaoJing",
        url: "#/main/operationFrame/operationManager",
        permission: "527c06d3e35211ea995f0a580a2a03c6",
        currentMenu: "operationManager"
      },
      {
        name: "容量监控",
        icon: "RongLiangGuanLi",
        svg: "RongLiangGuanLi",
        url: "#/main/operationFrame/capabilityManager",
        permission: "fde893aeca0346518b3a559753a3e542",
        currentMenu: "capabilityManager"
      },
      {
        name: "安装作业",
        icon: "AnZhuangRenWu",
        svg: "AnZhuangRenWu",
        url: "#/main/operationFrame/installWork",
        permission: "841fabf6e35211ea995f0a580a2a03c6",
        currentMenu: "installWork"
      },
      {
        name: "任务日志",
        icon: "PingTaiRiZhi",
        svg: "PingTaiRiZhi-White",
        url: "#/main/systemManagerFrame/syslog",
        permission: "032725dfe35311ea995f0a580a2a03c6",
        currentMenu: "tasklogManager"
      },
      {
        name: "消息通知",
        icon: "FuWuQiPeiZhi",
        svg: "FuWuQiPeiZhi-White",
        url: "#/main/systemManagerFrame/notify/index",
        permission: "ba7703d1a017431388d6dab69204e9d0",
        currentMenu: "notifyManager"
      }
    ]
  },
  {
    group: "baseResource",
    name: "基础设施",
    items: [{
        name: "资源入云",
        icon: "KongZhiQi",
        svg: "KongZhiQi-White",
        url: "#/main/addPlatformFrame/resourceaccess/index",
        permission: "b5015d1b191a44b3b0ae60e15bb4638a",
        currentMenu: "resourceaccess"
      },
      {
        name: "数据中心",
        icon: "ShuJuZhongXin",
        svg: "ShuJuZhongXin-White",
        url: "#/main/addPlatformFrame/datacenter/index",
        permission: "eebb0b2df9284a75be3d77efd83a304c",
        currentMenu: "datacenter"
      },
      {
        name: "可用分区",
        icon: "KeYongFenQu",
        svg: "KeYongFenQu-White",
        url: "#/main/addPlatformFrame/availpartitions/index",
        permission: "b4293ab21c4540e79e281c82b0143bae",
        currentMenu: "availpartitions"
      },
      {
        name: "软件及脚本",
        icon: "JiaoBen",
        svg: "JiaoBen-White",
        url: "#/main/addPlatformFrame/softwareAndScript",
        permission: "766ec1a1263a4594a59390f880de0c60",
        currentMenu: "softwareAndScriptManager"
      }
    ]
  }
];
