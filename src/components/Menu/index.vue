<template>
  <div class="menu-components-contanier">
    <h2 class="menu-components-home-title">
      <y-svg-icon icon-class="winStore" />
      <span class="title">WinStore</span>
    </h2>
    <div class="menu-components-select">
      <a-select
        v-model="value"
        style="width: 136px"
        :dropdownMatchSelectWidth="false"
        @change="handleChange"
      >
        <a-select-opt-group>
          <span slot="label"><a-icon type="user" /> 集群用户</span>
          <a-select-option
            v-for="item in optionsList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select-opt-group>
        <a-select-opt-group label="操作项">
          <a-select-option value="1">集群管理</a-select-option>
        </a-select-opt-group>
      </a-select>
    </div>
    <a-menu
      v-model="selectedKeys"
      style="width: 100%"
      mode="inline"
      :inlineIndent="16"
    >
      <a-menu-item key="home" @click="goHome">概览</a-menu-item>
      <a-sub-menu :key="item.id" v-for="item in menuTree">
        <span slot="title"
          ><a-icon type="mail" /><span>{{ item.name || "" }}</span></span
        >
        <a-menu-item
          @click="handleClick(children)"
          :key="children.id"
          v-for="children in item.childrens"
        >
          {{ children.name || "" }}
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "Menu",
  data() {
    return {
      openKeys: [],
      selectedKeys: ["home"],
      value: "",
    };
  },
  watch: {
    "$route.path": function (value) {
      this.getPath(value);
    },
  },
  computed: {
    ...mapGetters(["storageList", "collectMenuList", "menuTree"]),
    menuListStr() {
      const data = this.collectMenuList;
      let str = "";
      data.forEach((value) => {
        str += value.menuId + ",";
      });
      return str;
    },
    menuTreeList() {
      const data = this.menuTree;
    },
    optionsList() {
      return [];
    },
  },
  created() {
    console.log(this.menuTreeList);
    this.getPath();
  },
  methods: {
    getPath(value) {
      let path = value ? value : this.$route.path;
      console.log("path-->", path);
      if ((path = "/winstore/index")) {
        this.selectedKeys = ["home"];
      }
    },
    goHome() {
      this.$router.push("/winstore/index");
    },
    handleClick(item) {
      console.log(item);
      // const path = "/winstore" + item.url;
      // console.log(path);
      // this.$router.push(item.path);
      // const path = "/winstore" + item.url;
      // this.$router.push({ name: " StoragePoolManagement" });
      // console.log(path);
      // this.$router.push(path);
      this.$router.push(item.url);
      // this.$router.push({ name: "StoragePoolManagement" });
    },
    changeValue(value) {
      const { fullPath } = this.$route;
      this.$store.commit("user/SET_STORAGE_ID", value);
      this.$nextTick(() => {
        this.$router.replace({
          path: "/redirect" + fullPath,
        });
      });
    },
    handleChange(value) {
      if (value === "1") {
        console.log(`selected ${value}`);
        this.$router.push({ name: "WinstoreClusterManagement" });
      }
    },
  },
};
</script>

<style lang="less">
.menu-components-contanier {
  font-size: 14px;
  text-align: left;
  .ant-menu-item .anticon,
  .ant-menu-submenu-title .anticon {
    display: none;
  }
  .menu-components-home-title {
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #ebeef5;
    font-size: 14px;
    font-weight: 400;
    color: #83878f;
    padding-left: 16px;
    .title {
      padding-left: 10px;
    }
  }
  .menu-components-select {
    padding: 16px 0 8px 16px;
  }
  .ant-menu-inline {
    border-right: none;
  }
  .main-title {
    color: #83878f;
  }
  ::v-deep.ant-menu-inline .ant-menu-submenu-title {
    padding: 0 !important;
    color: #454852;
  }
  ::v-deep .ant-menu-sub.ant-menu-inline > .ant-menu-item {
    padding-left: 24px !important;
    color: rgba(0, 0, 0, 0.65);
  }
  ::v-deep .ant-menu-sub.ant-menu-inline > .ant-menu-item-selected {
    color: #d93934;
    font-weight: 500;
    background-color: transparent;
    &::after {
      right: unset;
      left: 14px;
      top: 11px;
      height: 16px;
    }
  }
}
</style>
