<template>
  <div class="app-wrapper">
    <Navbar @mouseenter.native="mouseenterEvent" />
    <div class="main-container">
      <Sidebar
        ref="sidebar"
        class="sidebar-container"
        @dialog-show="maskShow = true"
      />

      <AppMain
        :class="maskShow ? 'sider-class-active' : ''"
        @mouseenter.native="mouseenterEvent"
      />

      <div
        v-if="maskShow"
        class="yu-drawer-mask"
        @mouseenter="mouseenterEvent"
      ></div>
    </div>
    <div
      class="drawer-section"
      :class="visible ? 'drawer-section-open' : ''"
      @click="showDrawer"
    >
      <a-drawer
        title="设置主题"
        width="276px"
        placement="right"
        :closable="false"
        :mask="false"
        :after-visible-change="afterVisibleChange"
        :visible="visible"
        @close="onClose"
      >
        <Setting />
      </a-drawer>
      <a-icon :type="visible ? 'close' : 'setting'" />
    </div>
    <a-back-top />
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, SocketTable } from "./components";
import Setting from "../components/Setting";

export default {
  name: "Layout",
  components: {
    Navbar,
    Sidebar,
    AppMain,
    SocketTable,
    Setting,
  },
  data() {
    return {
      maskShow: false,
      showSetting: false,
      visible: false,
      show: false,
    };
  },
  methods: {
    mouseenterEvent() {
      this.$refs.sidebar.dialogShow = false;
      this.$refs.sidebar.isCollapse = false;
      this.maskShow = false;
    },
    afterVisibleChange(val) {},
    showDrawer() {
      this.visible = !this.visible;
    },
    onClose() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/mixin/index.less";
.socket-table-contanier {
  right: 0;
  top: 24%;
  position: fixed;
  z-index: 100;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: @primary-color;
  color: @base-bg-color;
  border-radius: 5px 0 0 5px;
  box-shadow: -2px 0 8px @shadow-color;
  transition: right 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  i {
    font-size: 26px;
  }
  .socket-section {
    position: absolute;
    right: 40px;
    top: -1px;
  }
}
.app-wrapper {
  .clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  .main-container {
    position: relative;
  }
  .sider-class-active {
    padding-left: 240px !important;
  }
}
.menu-is-qiankun-wrapper {
  position: fixed;
  left: 48px;
  top: 56px;
  width: 168px;
  background-color: #fff;
  height: 100%;
}
.drawer-section {
  right: 0;
  top: 34%;
  position: fixed;
  z-index: 100;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: @primary-color;
  color: @base-bg-color;
  border-radius: 5px 0 0 5px;
  box-shadow: -2px 0 8px @shadow-color;
  transition: right 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  cursor: pointer;
  i {
    font-size: 26px;
  }
}

.drawer-section-open {
  right: 276px !important;
}

.yu-drawer-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: rgba(0, 0, 0, 0.45);
  filter: alpha(opacity=45);
  transition: opacity 0.3s linear, height 0s ease 0.3s;
  width: 100%;
  height: 100%;
}
</style>
