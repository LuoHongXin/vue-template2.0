<template>
  <div class="y-table-page-a">
    <div class="contanier">
      <filterForm v-if="showFIlter" @onSubmit="onSubmit" />
      <y-model-table
        :search="search"
        :selectOptions="selectOptions"
        :api="getTableData"
        :paramsKeyFilter="paramsKeyFilter"
        :extraParams="extraParams"
        :columns="columns"
        :rowSelection="false"
        :setting="false"
        :tableHeader="tableHeader"
        :handleResponse="handleResponse"
        :scroll="{ y: 475 }"
        @download="download"
        @filter="
            () => {
              showFIlter = !showFIlter;
              search = !search;
              init();
              if (!showFIlter) {
                $refs.tableRef.onSearch();
              }
            }
          "
        ref="tableRef"
        v-if="showTable"
      >
        <template slot="tableHeaderRight" v-if="!showFIlter">
          <y-range-picker
            v-model="timeVal"
            widthSize="s"
            :disabled-date="disabledDate"
            @change="onChangePicker"
            class="operationLogRangePicker"
          />
        </template>
        <template slot="code" slot-scope="{ record }">
          <a
            class="y-button-link"
            @click="
                detailUuid = record.uuid;
                visible = true;
              "
          >{{ record.code }}</a>
        </template>
        <template v-slot:bizType="{ text }">
          <span>{{ text | operationBizType(bizTypeList) }}</span>
        </template>
        <template slot="bizName" slot-scope="{ record }">
          <a class="y-button-link" @click="goToObjDetail(record)">
            {{
            record.bizName
            }}
          </a>
        </template>
        <template v-slot:status="{ text }">
          <y-tag :color="text | operationStatusColor">
            {{
            text | operationStatus
            }}
          </y-tag>
        </template>
        <y-progress
          :percent="record.process"
          :strokeWidth="8"
          strokeColor="#5B8FF9"
          slot="process"
          slot-scope="{ record }"
        />
        <template v-slot:createTime="{ text }">
          <span>{{ text | dateFormat("Y-m-d H:i:s") }}</span>
        </template>
        <template v-slot:endTime="{ text }">
          <span>{{ text | dateFormat("Y-m-d H:i:s") }}</span>
        </template>
        <template slot="operation" slot-scope="{ record }">
          <y-table-action-button :buttonList="buttonList(record)"></y-table-action-button>
        </template>
      </y-model-table>
    </div>
    <operationLogDetail v-if="visible" :uuid="detailUuid" @close="close" />
  </div>
</template>

<script>
import filterForm from "./components/operationLogFilterForm";
import operationLogDetail from "./components/operationLogDetail";
import { auditLogApi } from "./api";
import {
  operationStatusColor,
  operationStatus,
  operationBizType,
  dateFormat
} from "./filters";
import moment from "moment";

export default {
  name: "CommonOperationLog",
  props: {
    mqttMessageObj: {
      type: Object
    },
    // 额外参数
    extraKeyParams: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  components: {
    filterForm,
    operationLogDetail
  },
  filters: {
    operationStatusColor,
    operationStatus,
    operationBizType,
    dateFormat
  },
  data() {
    return {
      showFIlter: false,
      search: true,
      bizTypeList: [],
      showTable: false,
      columns: [
        {
          dataIndex: "code",
          title: this.$t("maintain.auditLog.operationLog.logCode"),
          scopedSlots: { customRender: "code" },
          ellipsis: true,
          sorter: true,
          width: 104
        },
        {
          title: this.$t("maintain.auditLog.operationLog.objectType"),
          dataIndex: "bizType",
          scopedSlots: { customRender: "bizType" },
          filters: [],
          width: 105
        },
        {
          title: this.$t("maintain.auditLog.operationLog.operationalObject"),
          dataIndex: "bizName",
          scopedSlots: { customRender: "bizName" },
          ellipsis: true,
          width: 99
        },
        {
          title: this.$t(
            "maintain.auditLog.operationLog.operationalDescription"
          ),
          dataIndex: "interfaceName",
          ellipsis: true,
          width: 110
        },
        {
          title: this.$t("maintain.auditLog.operationLog.status"),
          dataIndex: "status",
          scopedSlots: {
            customRender: "status"
          },
          filters: [
            {
              text: this.$t("maintain.auditLog.operationLog.completed"),
              value: "completed"
            },
            {
              text: this.$t("maintain.auditLog.operationLog.error"),
              value: "error"
            },
            {
              text: this.$t("maintain.auditLog.operationLog.inProgress"),
              value: "in-progress"
            },
            {
              text: this.$t("maintain.auditLog.operationLog.cancel"),
              value: "cancel"
            }
          ],
          width: 70
        },
        {
          title: this.$t("maintain.auditLog.operationLog.progress"),
          dataIndex: "process",
          scopedSlots: {
            customRender: "process"
          },
          width: 140
        },
        {
          title: this.$t("maintain.auditLog.operationLog.operator"),
          dataIndex: "creatorAccount",
          ellipsis: true,
          width: 67
        },
        {
          title: this.$t("maintain.auditLog.operationLog.operatorIp"),
          dataIndex: "ip",
          ellipsis: true,
          sorter: true,
          width: 118
        },
        {
          title: this.$t("maintain.auditLog.operationLog.timeConsuming"),
          dataIndex: "consumeTimeStr",
          ellipsis: true,
          width: 80
        },
        {
          title: this.$t("maintain.auditLog.operationLog.createTime"),
          dataIndex: "createTime",
          scopedSlots: {
            customRender: "createTime"
          },
          sorter: true,
          width: 135
        },
        {
          title: this.$t("maintain.auditLog.operationLog.completedTime"),
          dataIndex: "endTime",
          scopedSlots: {
            customRender: "endTime"
          },
          sorter: true,
          width: 135
        },
        {
          title: this.$t("common.operation"),
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" },
          width: 60
        }
      ],
      tableHeader: {
        left: false,
        right: true
      },
      getTableData: auditLogApi.logs,
      paramsKeyFilter: {
        start: "current",
        startTime: "startTime",
        endTime: "endTime",
        codeLike: "codeLike",
        bizName: "bizName",
        interfaceName: "interfaceName",
        accountLike: "accountLike",
        ipLike: "ipLike"
      },
      extraParams: {
        startTime: null,
        endTime: null,
        codeLike: "",
        bizName: "",
        interfaceName: "",
        accountLike: "",
        ipLike: ""
      },
      buttonList: record => [
        {
          text: this.$t("common.details"),
          tips: this.$t("common.details"),
          type: "primary",
          icon: "plus",
          click: () => {
            this.detailUuid = record.uuid;
            this.visible = true;
          }
        }
      ],
      selectOptions: [
        {
          title: this.$t("maintain.auditLog.operationLog.logCode"),
          value: "codeLike2"
        },
        {
          title: this.$t("maintain.auditLog.operationLog.operationalObject"),
          value: "bizName2"
        },
        {
          title: this.$t(
            "maintain.auditLog.operationLog.operationalDescription"
          ),
          value: "interfaceName2"
        },
        {
          title: this.$t("maintain.auditLog.operationLog.operator"),
          value: "accountLike2"
        },
        {
          title: this.$t("maintain.auditLog.operationLog.operatorIp"),
          value: "ipLike2"
        }
      ],
      timeVal: null,
      disabledDate: current => {
        return current && current > moment().endOf("day");
      },
      visible: false,
      detailUuid: ""
    };
  },
  watch: {
    mqttMessageObj(msg) {
      let data = msg;
      if (this.showTable && data.refreshCode === "TASK_LOG") {
        const res = eval("(" + data.content + ")");
        const newTableData = this.$refs.tableRef.tableData.map(e => {
          if (e.uuid === res.uuid) {
            e = res;
          }
          return e;
        });
        this.$refs.tableRef.tableData = newTableData;
      }
    },
    extraKeyParams(obj) {
      this.init();
      this.extraParams = Object.assign(this.extraParams, obj);
      this.$nextTick(function() {
        if (this.$refs.tableRef) {
          this.$refs.tableRef.onSearch();
        }
      });
    }
  },
  mounted() {
    this.init();
    this.getLogsTypes();
  },
  methods: {
    //初始化
    init() {
      this.extraParams = {};
      this.extraParams = Object.assign(this.extraParams, this.extraKeyParams);
      this.extraParams.startTime = null;
      this.extraParams.endTime = null;
      this.extraParams.codeLike = "";
      this.extraParams.bizName = "";
      this.extraParams.interfaceName = "";
      this.extraParams.accountLike = "";
      this.extraParams.ipLike = "";
    },
    handleResponse(res, type) {
      if (type === "total") {
        return res.total;
      }
      if (type === "data") {
        return res.records;
      }
    },
    //对象类型
    getLogsTypes() {
      auditLogApi
        .logsTypes()
        .then(res => {
          this.columns[1].filters = [];
          this.bizTypeList = [];
          res.map(item => {
            this.columns[1].filters.push({
              text: item.name,
              value: item.code
            });
            this.bizTypeList.push({
              text: item.name,
              value: item.code
            });
          });
          this.showTable = true;
        })
        .catch(err => {
          this.showTable = true;
          this.$YMessage.error(err.message);
        });
    },
    //下载
    download() {
      let res = this.$refs.tableRef;
      let statusList = "",
        bizTypeList = "";
      if (res.filters && res.filters.status) {
        statusList = res.filters.status.toString();
      }
      if (res.filters && res.filters.bizType) {
        bizTypeList = res.filters.bizType.toString();
      }
      window.location.href =
        "/api" +
        "/aggregation/logs/export?startTime=" +
        this.extraParams.startTime +
        "&endTime=" +
        this.extraParams.endTime +
        "&codeLike=" +
        this.extraParams.codeLike +
        "&bizNameLike=" +
        this.extraParams.bizName +
        "&interfaceNameLike=" +
        this.extraParams.interfaceName +
        "&accountLike=" +
        this.extraParams.accountLike +
        "&ipLike=" +
        this.extraParams.ipLike +
        "&statusList=" +
        statusList +
        "&bizTypeList=" +
        bizTypeList +
        "&Authorization=" +
        window.getToken();
    },
    //改变日期
    onChangePicker(date, dateString) {
      this.extraParams.startTime = dateString[0]
        ? moment(dateString[0]).format("x")
        : null;
      this.extraParams.endTime = dateString[1]
        ? moment(dateString[1]).format("x") * 1 + 24 * 60 * 60 * 1000 * 1
        : null;
      this.$refs.tableRef.onSearch();
    },
    //showFIlter过滤参数
    onSubmit(params) {
      console.log(this.extraParams, 999999);
      this.extraParams.startTime = params.startTime;
      this.extraParams.endTime = params.endTime;
      this.extraParams.codeLike = params.codeLike;
      this.extraParams.bizName = params.bizName;
      this.extraParams.interfaceName = params.interfaceName;
      this.extraParams.accountLike = params.accountLike;
      this.extraParams.ipLike = params.ipLike;
      this.$refs.tableRef.onSearch();
    },
    //跳转操作对象
    goToObjDetail() {
      this.$YInfo({
        title: this.$t(
          "maintain.auditLog.operationLog.operationalObjDestroyedCannotJump"
        )
      });
    },
    close() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.y-page-header-a {
  p {
    margin-top: -8px;
    font-size: @y-font-size-s;
    color: @y-color-text-secondary;
  }
}
.operationLogRangePicker {
  margin-right: 8px;
}
</style>
