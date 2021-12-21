<template>
  <div>
    <a-table
      bordered
      :pagination="false"
      row-key="id"
      :columns="columns"
      :data-source="taskList"
      :scroll="{ y: 330 }" />
  </div>
</template>

<script>
import { mapState } from "vuex";
const columns = [
  {
    title: "任务名称",
    dataIndex: "name",
    width: 160
  },
  {
    title: "目标名称",
    dataIndex: "taskSetMain",
    width: 160
  },
  {
    title: "任务状态",
    dataIndex: "statusName",
    width: 100
  },
  {
    title: "任务描述",
    dataIndex: "description"
  },
  {
    title: "任务创建人",
    dataIndex: "createLoginName",
    width: 120
  },
  {
    title: "任务创建人IP",
    dataIndex: "createLoginIp",
    width: 140
  },
  {
    title: "创建时间",
    dataIndex: "timeCreate",
    width: 120
  },
  {
    title: "结束时间",
    dataIndex: "timeEnd",
    width: 120
  },
  {
    title: "任务当前状态",
    dataIndex: "stepDesc"
  }
];
export default {
  data() {
    return {
      columns
    };
  },
  computed: {
    ...mapState("websocket", ["taskList"])
  }
};
</script>
