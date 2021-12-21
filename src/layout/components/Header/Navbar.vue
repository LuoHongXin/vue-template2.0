<template>
  <div class="navbar">
    <div class="navber-left">
      <div class="logo">
        <y-svg-icon icon-class="logo" class="svglogo" v-if="!productIcon" />
        <img
          alt=""
          v-if="productIcon"
          v-bind:src="productIcon"
          style="height: 32px"
        />
      </div>
      <div>
        <span class="webName">{{ webName }}</span>
      </div>
      <div class="select-content">
        <a-select
          v-model="value"
          @change="changeValue"
          :dropdownMatchSelectWidth="false"
        >
          <a-select-option
            v-for="item in optionsList"
            :key="item.value"
            :value="item.value"
          >
            {{ item.label }}
          </a-select-option>
        </a-select>
      </div>
    </div>
    <div class="navber-right">
      <span class="file-log-icon" @click="showDrawer">
        <span v-if="taskList.length > 0" class="num">
          {{ taskList.length }}
        </span>
        <y-svg-icon icon-class="fileLog" />
      </span>

      <div class="icon-group">
        <a-dropdown class="lang header-item">
          <div><a-icon type="user" /></div>
          <a-menu slot="overlay" @click="dropdownClick">
            <a-menu-item v-for="item in userOptions" :key="item.key">
              {{ item.name }}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>

      <a-drawer
        style="top: 55px"
        title=""
        placement="right"
        :closable="false"
        :mask="true"
        width="400"
        wrap-class-name="drawer-wrap-class-name"
        :visible="visible"
        @close="onClose"
      >
        <DrawerList @close="visible = false" />
      </a-drawer>
    </div>
  </div>
</template>

<script>
import HeaderSearch from "./HeaderSearch";
import DrawerList from "./drawerList";
import { mapState, mapGetters, mapMutations } from "vuex";
import { getkeyCookie } from "@/utils/auth";
import { configUi } from "@/api/user";
export default {
  name: "Navbar",
  components: {
    HeaderSearch,
    DrawerList,
  },
  data() {
    return {
      visible: false,
      value: "",
      searchActive: false,
      webName: "",
      productIcon: "",
      langList: [
        { key: "CN", name: "简体中文", alias: "简体" },
        { key: "HK", name: "繁體中文", alias: "繁體" },
        { key: "US", name: "English", alias: "English" },
      ],
      userList: [
        {
          key: "1",
          name: "admin",
        },
        {
          key: "2",
          name: "集群管理",
        },
        {
          key: "3",
          name: "任务管理",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["lang", "storageList", "taskList", "userInfo"]),
    optionsList() {
      return [];
    },
    langAlias() {
      let lang = this.langList.find((item) => item.key == this.lang);
      return lang.alias;
    },
    userOptions() {
      return this.userList;
    },
  },
  created() {
    this.webName = " WinStore ";
    const _this = this;
    configUi()
      .then((response) => {
        _this.productIcon = response.productIcon;
        _this.webName = response.sdsName;
      })
      .catch((error) => {
        _this.tipShow(error);
        _this.loading = false;
      });
  },
  methods: {
    ...mapMutations("setting", ["setLang"]),
    showDrawer() {
      this.visible = !this.visible;
    },
    onClose() {
      this.visible = false;
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
    dropdownClick(value) {
      const { key } = value;
      if (key === "2") {
        this.$router.push({ name: "WinstoreClusterManagement" });
      }
      if (key === "3") {
        this.$router.push("/task/index");
      }
    },
  },
};
</script>

<style lang="less">
@import "index";
.drawer-wrap-class-name {
  .ant-drawer-content {
    padding: 0 12px 60px;
    background: #ebedf2;
    box-shadow: 0px 16px 48px 16px rgba(0, 0, 0, 0.03),
      0px 12px 28px 0px rgba(0, 0, 0, 0.05),
      0px 6px 16px -8px rgba(0, 0, 0, 0.08);
  }
  .ant-drawer-body {
    padding: 0;
    height: 100%;
  }
}
</style>
