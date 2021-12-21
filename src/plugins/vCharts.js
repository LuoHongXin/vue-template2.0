// echarts
import Vue from "vue";
import VeLine from "v-charts/lib/line.common";
[VeLine].forEach(comp => {
  Vue.component(comp.name, comp);
});
