<template>
  <ve-line
    :data="chartDatas"
    :extend="chartExtend"
    :settings="chartSettings"
    :grid="grid"
    :height="height"
    :width="width"
    :ref="id"
  />
</template>

<script>
import { parseTime } from "@/utils/util";
export default {
  props: {
    activeName: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    className: {
      type: String,
      default: "chart"
    },
    id: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "200px"
    },
    height: {
      type: String,
      default: "200px"
    },
    chartData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    this.chartSettings = {
      area: true
    };
    this.grid = {
      x: 0,
      y: 10,
      x2: 0,
      y2: 30,
      borderWidth: 10
    }; //设置canvas内部表格的内距
    this.chartExtend = {
      legend: {
        x: "center", //可设定图例在左、右、居中
        y: "bottom", //可设定图例在上、下、居中
        padding: [0, 0, 0, 0] //可设定图例[距上方距离，距右方距离，距下方距离，距左方距离]
      },
      tooltip: {
        trigger: "axis",
        textStyle: {
          align: "left"
        },
        formatter(params) {
          const time = parseTime(params[0].name, "{y}-{m}-{d} {h}:{i}");
          if(params.length>1){
            const str = `${time}</br>
            ${params[0].seriesName}：${params[0].value}</br>
            ${params[1].seriesName}：${params[1].value}`;
             return str;
          }else{
            const str = `${time}</br>
            ${params[0].seriesName}：${params[0].value}`;
             return str;
          }

        }
      },
      xAxis: {
        axisLabel: {
          formatter: function(value, index) {
            const time = parseTime(value, "{h}:{i}");
            return time;
          }
        }
      }
    };
    return {
      chartDatas: {
        columns: ["日期", "读", "写"],
        rows: []
      }
    };
  },
  watch: {
    chartData(arr) {
      this.initChart();
    }
    // activeName(v) {
    //   console.log("v-->",v)
    //   this.$nextTick(_ => {
    //     this.$refs[`${this.id}`].echarts.resize();
    //   });
    // }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    bTurnMb(value, pointNum) {
      if (value == null) {
        return "null";
      }
      var m = value / 1048576;
      if (typeof pointNum === "number" && pointNum >= 0) {
        return parseFloat(m.toFixed(pointNum));
      } else {
        return parseInt(m);
      }
    },
    initChart() {
      const title = this.title;
      let chartUnit = "";
      if (title.indexOf("IOPS") > -1) {
        chartUnit = "IOPS";
      } else if (title.indexOf("ms") > -1) {
        chartUnit = "ms";
      } else if (title.indexOf("MBPS") > -1) {
        chartUnit = "MBPS";
      }
      const arr = [];
      this.chartData.forEach(value => {
        const timestamp = new Date(Date.parse(value.time));//+(3600000*8)
        const valueRead = value.read ? value.read : 0;
        const valueWrite = value.write ? value.write : 0;
        const obj = {};
        obj["日期"] = Number(timestamp);
        if (title.indexOf("IOPS") > -1) {
          obj["读"] = valueRead;
          obj["写"] = valueWrite;
        } else if (title.indexOf("ms") > -1) {
          obj["读"] = parseFloat((valueRead * 1000).toFixed(2));
          obj["写"] = parseFloat((valueWrite * 1000).toFixed(2));
        } else if (title.indexOf("MBPS") > -1) {
          obj["读"] = this.bTurnMb(valueRead, 4);
          obj["写"] = this.bTurnMb(valueWrite, 4);
        }
        arr.push(obj);
      });
      this.$set(this.chartDatas, "rows", arr);
    }
  }
};
</script>
