<template>
  <div>
    <div class="y-filter-form">
      <y-filter-form :form="form" :layoutType="layoutType" @submit="onSubmit">
        <y-filter-form-item
          :label="$t('maintain.auditLog.operationLog.logCode')"
        >
          <y-input
            :placeholder="$t('common.pleaseEnter')"
            v-model="form.codeLike"
          />
        </y-filter-form-item>
        <y-filter-form-item
          :label="$t('maintain.auditLog.operationLog.operationalObject')"
        >
          <y-input
            :placeholder="$t('common.pleaseEnter')"
            v-model="form.bizName"
          />
        </y-filter-form-item>
        <y-filter-form-item
          :label="$t('maintain.auditLog.operationLog.operationalDescription')"
        >
          <y-input
            :placeholder="$t('common.pleaseEnter')"
            v-model="form.interfaceName"
          />
        </y-filter-form-item>
        <y-filter-form-item
          :label="$t('maintain.auditLog.operationLog.operator')"
        >
          <y-input
            :placeholder="$t('common.pleaseEnter')"
            v-model="form.accountLike"
          />
        </y-filter-form-item>
        <y-filter-form-item
          :label="$t('maintain.auditLog.operationLog.operatorIp')"
        >
          <y-input
            :placeholder="$t('common.pleaseEnter')"
            v-model="form.ipLike"
          />
        </y-filter-form-item>
        <y-filter-form-item
          :label="$t('maintain.auditLog.operationLog.createDate')"
        >
          <y-range-picker
            v-model="form.timeVal"
            @change="onChangePicker"
            :disabled-date="disabledDate"
          />
        </y-filter-form-item>
        <template slot="btnCol">
          <y-button @click="reset">
            {{ $t("common.reset") }}
          </y-button>
          <y-button type="primary" html-type="submit">
            {{ $t("common.query") }}
          </y-button>
        </template>
      </y-filter-form>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "OperationLogFilterForm",
  props: {
    layoutType: {
      type: String,
      default: "3col"
    }
  },
  data() {
    return {
      form: {
        codeLike: "",
        bizName: "",
        interfaceName: "",
        accountLike: "",
        ipLike: "",
        timeVal: [],
        startTime: null,
        endTime: null
      },
      disabledDate: current => {
        return current && current > moment().endOf("day");
      }
    };
  },
  methods: {
    onChangePicker(date, dateString) {
      this.form.startTime = dateString[0]
        ? moment(dateString[0]).format("x")
        : null;
      this.form.endTime = dateString[1]
        ? moment(dateString[1]).format("x") * 1 + 24 * 60 * 60 * 1000 * 1
        : null;
    },
    onSubmit() {
      this.$emit("onSubmit", this.form);
    },
    reset() {
      this.form.codeLike = "";
      this.form.bizName = "";
      this.form.interfaceName = "";
      this.form.accountLike = "";
      this.form.ipLike = "";
      this.form.timeVal = [];
      this.$emit("onSubmit", "");
    }
  }
};
</script>
