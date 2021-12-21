// 左侧菜单权限
const menuLeft = [{
    code: "a759cfe62b3d4b6292d516c774654a05", // VDC管理
    order: 3
  },
  {
    code: "0e6ab27955e04f088e3d797fab85e0ef", // 资源实例
    order: 5
  },
  {
    code: "527c06d3e35211ea995f0a580a2a03c6", // 监控告警
    order: 6
  },
  {
    code: "ca0634c5cd684df491f97d6d9e47b2b2", // 订单审批
    order: 2
  },
  {
    code: "f43a7704f89a42c89af68cd0e0e7ea9b", // 业务系统
    order: 4
  },
  {
    code: "1fca91fe8ec2447fb2b6cbc31d1cba55", // 服务目录
    order: 1
  },
  {
    code: "a759cfe62b3d4b6292d516c7274654a05", // 存储池管理
    order: 7
  },
];


module.exports = [{
    url: '/winstore/menu/list',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: menuLeft
      }
    }
  },
  // update
  {
    url: '/winstore/menu/list/update',
    type: 'post',
    response: config => {
      const {
        code
      } = config.body

      let i = -1
      menuLeft.forEach((value, index) => {
        if (value.code === code) {
          i = index
        }
      });

      if (i > 0) {
        menuLeft.splice(i, 1);
      } else {
        const obj = {
          code: code,
          order: menuLeft.length + 1
        };
        menuLeft.push(obj);
      }
      return {
        code: 20000,
        data: menuLeft
      }
    }
  },
]
