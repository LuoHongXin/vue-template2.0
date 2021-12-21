import { parseTime } from "@/utils/util";

export function getCommonChart(chartUnit = "") {
  const commonChart = {
    chart: {
      type: "area" //图表类型line(折线图),
    },
    title: {
      text: ""
    },
    credits: {
      enabled: false //右下角不显示LOGO
    },
    subtitle: {
      //副标题
      text: ""
    },
    legend: {
      // 图例
      enabled: true
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [[0, "#EFF3FA"]]
        },
        lineWidth: 1,
        marker: {
          enabled: false
        },
        fillOpacity: 0.1
      }
    },
    xAxis: {
      crosshair: true,
      type: "datetime",
      dateTimeLabelFormats: {
        millisecond: "%H:%M:%S.%L",
        second: "%H:%M:%S",
        minute: "%H:%M",
        hour: "%H:%M"
      },
      labels: {
        formatter: function() {
          return parseTime(new Date(this.value), "{h}:{i}");
        }
      }
    },
    tooltip: {
      padding: 10,
      borderRadius: 5,
      borderColor: "#4F96F3",
      backgroundColor: "#4F96F3",
      formatter: function() {
        return (
          '<br /><span style="color:#fff;font-size:16px;">' +
          this.y +
          " " +
          chartUnit +
          '</span> <br /><div><br /></div><span style="color:#fff;">' +
          parseTime(new Date(this.x), "{y}-{m}-{d} {h}:{i}") +
          "</span>"
        );
      }
    },
    yAxis: {
      title: {
        text: ""
      }
    },
    series: [
      {
        name: "磁盘利用率",
        data: []
      }
    ]
  };
  return commonChart;
}
