import { byteTurnOther } from "@/utils/util";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      severityList: {
        warning: "一般警告",
        critical: "紧急告警"
      },
      storageMediumList: [
        {
          value: "1",
          label: "HDD",
          svg: "hdd"
        },
        {
          value: "2",
          label: "SSD",
          svg: "ssd"
        },
        {
          value: "3",
          label: "NVME",
          svg: "nvme"
        },
        {
          value: "4",
          label: "其他",
          svg: "other"
        }
      ],
      healthList: {
        UNKNOWN: "未知",
        PASSED: "健康",
        FAILED: "异常"
      },
      taskStatusList: [
        {
          value: "0",
          label: "未开始",
          color: "#454852"
        },
        {
          value: "1",
          label: "已开始",
          color: "#3D61CC"
        },
        {
          value: "2",
          label: "已取消",
          color: "#E69A29"
        },
        {
          value: "3",
          label: "成功",
          color: "#53B324"
        },
        {
          value: "4",
          label: "失败",
          color: "#D93934"
        }
      ],
      taskStatus: {
        notStarted: "未开始",
        haveStarted: "已开始",
        canceled: "已取消",
        successful: "成功",
        failure: "失败"
      },
      radioList: [
        {
          value: 1,
          label: "X86",
          name: "x86_64"
        },
        {
          value: 2,
          label: "ARM",
          name: "aarch64"
        },
        {
          value: 3,
          label: "MIPS",
          name: "mips64"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["commonTaskList"])
  },
  methods: {
    byteTurnOther,
    /**
     * 日志状态类型转化
     * @param {String} value
     */
    formatTaskStatusName(value) {
      return this.taskStatus[value];
    },
    /**
     * 日志状态列表类型转化
     * @param {String} value
     */
    formatTaskStatusListLabel(value) {
      const strValue = String(value);
      const arr = this.taskStatusList.filter(item => item.value === strValue);
      return arr[0].label;
    },
    /**
     * 告警级别类型转化
     * @param {String} value
     */
    formatSeverity(value) {
      return this.severityList[value];
    },
    /**
     * 健康状态类型转化
     * @param {String} value
     */
    formatHealth(value) {
      return this.healthList[value];
    },
    /**
     * table表格偶数行高亮颜色
     */
    setRowClassName(record, index) {
      if (index % 2 !== 0) {
        return "yu-row-color";
      }
    },
    /**
     * 存储容量大小换算
     * @param {Number} value 需要转化的值
     * @param {Number} pointNum 设置保留小数位后几位
     */
    toCapacityFilter(value, pointNum) {
      if (value === null || value === 0) {
        return value;
      }
      const m = value / 1073741824;
      let backValue = null;
      if (typeof pointNum === "number" && pointNum >= 0) {
        if (Number.isInteger(m)) {
          backValue = m;
        } else {
          backValue = parseFloat(m.toFixed(pointNum));
        }
      } else {
        backValue = parseInt(m);
      }
      return backValue;
    },
    // 比较大小
    checkCompareSize(size, total) {
      if (!size || !total) {
        return true;
      }
      return parseInt(size) > parseInt(total);
    },
    tipShow(data) {
      const tip = data.message;
      if (tip) {
        this.$message.error(tip, 5);
      }
    }
  }
};
