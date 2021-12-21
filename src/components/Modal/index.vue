<template>
  <div class="yu-modal">
    <a-modal
      :wrap-class-name="wrapClassName"
      :centered="centered"
      :mask-closable="maskClosable"
      :width="width"
      :visible="dialogVisible"
      @cancel="handleCancel"
    >
      <template slot="title">
        <div class="yu-modal-title">
          <span>{{ title }}</span>
          <img src="@images/modalTitle.png" alt="" />
        </div>
      </template>
      <template slot="closeIcon">
        <div class="yu-modal-close">
          <y-svg-icon icon-class="close" />
        </div>
      </template>
      <template slot="footer">
        <div class="yu-modal-footer">
          <a-button key="back" @click="handleCancel">
            {{ cancelText }}
          </a-button>
          <a-button
            key="submit"
            type="primary"
            :loading="confirmLoading"
            @click="handleOk"
          >
            {{ confirmText }}
          </a-button>
        </div>
      </template>
      <template v-if="contentSlot">
        <div>
          <slot></slot>
        </div>
      </template>
      <p v-else>{{ ModalText }}</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  name: "Modal",
  model: {
    prop: "value",
    event: "update-value",
  },
  props: {
    isBtn: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "标题",
    },
    ModalText: {
      type: String,
      default: "Content of the modal",
    },
    width: {
      type: Number,
      default: 480,
    },
    value: {
      type: Boolean,
      default: true,
    },
    centered: {
      type: Boolean,
      default: false,
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    confirmText: {
      type: String,
      default: "确认",
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    asyncLoading: {
      type: Boolean,
      default: false,
    },
    confirmLoading: {
      type: Boolean,
      default: false,
    },
    contentSlot: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    wrapClassName() {
      return this.isBtn ? "yu-modal-contanier" : "yu-modal-contanier-active";
    },
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
  },
  methods: {
    handleCancel(e) {
      this.dialogVisible = false;
      this.$emit("update-value", this.dialogVisible);
    },
    handleOk(e) {
      if (!this.asyncLoading) {
        this.dialogVisible = false;
      }
      this.$emit("update-value", this.dialogVisible);
      this.$emit("confirm-update");
    },
  },
};
</script>

