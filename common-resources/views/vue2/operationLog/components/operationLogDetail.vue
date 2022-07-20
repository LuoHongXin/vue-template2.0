<template>
  <div class="operationLogDetail">
    <y-drawer
      title="日志详情"
      placement="right"
      :visible="visible"
      :maskClosable="false"
      @close="onClose('visible')"
    >
      <div id="alarmInfoCommon">
        <y-sign-title class="marginBottom-16">
          <span slot="title">
            {{
            $t("common.baseInformation")
            }}
          </span>
        </y-sign-title>
        <a-row>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.logCode") }}：</span>
            <span class="info-text">{{ detailInfo.code }}</span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.objectType") }}：</span>
            <span class="info-text">{{ detailInfo.bizType }}</span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">
              {{
              $t("maintain.auditLog.operationLog.operationalObject")
              }}：
            </span>
            <span class="info-text">{{ detailInfo.bizName || "-" }}</span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">
              {{
              $t("maintain.auditLog.operationLog.operationalDescription")
              }}：
            </span>
            <span class="info-text">{{ detailInfo.interfaceName || "-" }}</span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.status") }}：</span>
            <span class="info-text">
              <y-tag :color="detailInfo.status | operationStatusColor">
                {{
                detailInfo.status
                }}
              </y-tag>
            </span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.timeConsuming") }}：</span>
            <span class="info-text">
              {{
              detailInfo.consumeTimeStr || "-"
              }}
            </span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.operator") }}：</span>
            <span class="info-text">
              {{
              (detailInfo.logVO && detailInfo.logVO.creatorAccount) || "-"
              }}
            </span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.operatorIp") }}：</span>
            <span class="info-text">
              {{
              detailInfo.logVO && detailInfo.logVO.ip
              }}
            </span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.createTime") }}：</span>
            <span class="info-text">
              {{
              detailInfo.createTime | dateFormat("Y-m-d H:i:s")
              }}
            </span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.completedTime") }}：</span>
            <span class="info-text">
              {{
              detailInfo.endTime | dateFormat("Y-m-d H:i:s")
              }}
            </span>
          </a-col>
        </a-row>
        <y-sign-title class="marginBottom-16">
          <span slot="title">
            {{
            $t("maintain.auditLog.operationLog.detailInfo")
            }}
          </span>
        </y-sign-title>
        <a-row>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.failureReason") }}：</span>
            <span class="info-text">{{ detailInfo.errorReason || "-" }}</span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.requestAddress") }}：</span>
            <span class="info-text">
              {{
              (detailInfo.logVO && detailInfo.logVO.requestUrl) || "-"
              }}
            </span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.requestParams") }}：</span>
            <span class="info-text">
              <y-json-viewer :value="detailInfo.logVO.requestParam" v-if="detailInfo.logVO"></y-json-viewer>
            </span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.requestBody") }}：</span>
            <span class="info-text">
              <y-json-viewer :value="detailInfo.logVO.requestBody" v-if="detailInfo.logVO"></y-json-viewer>
            </span>
          </a-col>
          <a-col :span="24">
            <span class="info-title">{{ $t("maintain.auditLog.operationLog.requestResults") }}：</span>
            <span class="info-text">
              <y-json-viewer :value="detailInfo.logVO.response" v-if="detailInfo.logVO"></y-json-viewer>
            </span>
          </a-col>
        </a-row>
      </div>
      <div slot="footer" style="text-align:right">
        <y-button @click="onClose('visible')">{{ $t("common.cancel") }}</y-button>
        <y-button type="primary" @click="onClose('visible')">{{ $t("common.confirm") }}</y-button>
      </div>
    </y-drawer>
  </div>
</template>
<script>
import { auditLogApi } from "../api";
import { YJsonViewer } from "hx-antd-vue";
import { operationStatusColor } from "../filters";
export default {
  name: "OperationLogDetail",
  props: {
    uuid: String
  },
  components: {
    YJsonViewer
  },
  filters: {
    operationStatusColor
  },
  data() {
    return {
      visible: true,
      labelCol: {
        span: 3
      },
      wrapperCol: {
        span: 21
      },
      detailInfo: {}
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      auditLogApi
        .logsDetails(this.uuid)
        .then(res => {
          this.detailInfo = res;
          this.detailInfo.logVO.requestBody = eval(
            "(" + this.detailInfo.logVO.requestBody + ")"
          );
          this.detailInfo.logVO.response = eval(
            "(" + this.detailInfo.logVO.response + ")"
          );
          this.detailInfo.logVO.requestParams = eval(
            "(" + this.detailInfo.logVO.requestParams + ")"
          );
        })
        .catch(err => {
          this.$YMessage.error(err.message);
        });
    },
    //关闭抽屉
    onClose(v) {
      this.$emit("close", { type: "close", data: this.alarmData });
      this[v] = false;
    }
  }
};
</script>
<style lang="less" scoped></style>
