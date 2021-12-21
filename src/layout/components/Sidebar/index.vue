<template lang="html">
  <div
    class="m-scrollbar-wrapper m-sidebar-container scrollbar-wrapper-hide" ref="scrollbarWrapperRef">
    <div class="scrollbar-wrapper-menu" @mouseover="mouseOverChange">
      <div class="scrollbar-wrapper-show">
        <draggable v-model="menuList" @change="changeDraggable">
          <div
            v-for="item in menuList"
            :key="item.id"
            class="yu-menu-item"
            :class="
              activeTitle === item.path ||
              (item.path === '/home/index' && dialogShow)
                ? 'yu-menu-item-active'
                : ''
            "
            @mouseover="menuItemMouseOver(item)"
          >
            <div class="yu-menu-item-left">
              <div class="yu-icon">
                <item v-if="item.icon" :icon="item.icon" />
              </div>
              <span class="yu-name" @click="toRouterPath(item)">{{
                item.name
              }}</span>
              <a-icon
                v-if="!item.close"
                type="close"
                class="yu-close"
                @click="delMenuItem(item.id)"
              />
            </div>
            <div v-if="item.path !== '/'">
              <img
                v-if="item.name !== '所有功能'"
                class="l-drop-img"
                src="@/assets/images/menu.png"
              />
              <img
                v-else
                class="l-drop-img"
                src="@/assets/images/linkRight.png"
              />
            </div>
          </div>
        </draggable>
      </div>

      <div :class="dialogShow ? 'yu-dialog-menu active' : 'yu-dialog-menu'" @mouseout="getLocation">
        <DialogMenu @to-collapse="handlerCollapse"/>
      </div>

    </div>
  </div>
</template>

<script>
import Item from "./Item";
import DialogMenu from "./DialogMenu";
import draggable from "vuedraggable";
import { mapState } from "vuex";
import * as menu from "@/api/menu";
export default {
  name: "Sidebar",
  components: { Item, DialogMenu, draggable },
  props: {},
  data() {
    return {
      isCollapse: false,
      dialogShow: false,
      activeTitle: "/",
      draggList: [],
    };
  },
  computed: {
    ...mapState("menu", ["menuShrinkList"]),
    menuList: {
      get() {
        this.menuShrinkList.forEach((value) => {
          if (value.name === "总览" || value.name === "所有功能") {
            value.close = true;
          }
        });
        return this.menuShrinkList;
      },
      set() {},
    },
  },
  watch: {
    $route(value) {
      this.activeTitle = this.getPath();
    },
  },
  created() {
    this.activeTitle = this.getPath();
  },
  methods: {
    getLocation(e) {
      const x = e.clientX;
      if (x > 886) {
        this.dialogShow = false;
      }
    },
    changeDraggable(evt) {
      const menuShrinkList = this.menuShrinkList;

      const { newIndex, oldIndex } = evt.moved;
      const oldId = menuShrinkList[oldIndex].collectId;
      const newId = menuShrinkList[newIndex].collectId;

      const data = {
        id: oldId,
        prevId: newId,
      };

      menu.getCollectionMenuSort(data).then(async (response) => {
        if (response) {
          const setCollectMenuList = await this.$store.dispatch(
            "menu/setCollectMenuList"
          );
          this.$store.dispatch("menu/setMenuList", setCollectMenuList);
        }
      });
    },
    getPath() {
      var curWwwPath = window.document.location.href; // 获取当前网址
      const i = curWwwPath.indexOf("#");
      const n = curWwwPath.indexOf("?");
      let strPath = "";
      if (n > -1) {
        strPath = curWwwPath.substring(i + 2, n);
      } else {
        strPath = curWwwPath.substring(i + 2);
      }

      if (strPath === "home") {
        strPath = "/";
      }
      return strPath;
    },
    toRouterPath(item) {
      const { path } = item;
      this.activeTitle = path;
      this.dialogShow = false;
      this.isCollapse = false;

      // 指定跳转 子应用的路径上
      // if (id === "4d302dd0-f831-4c31-b140-183ce98aa670") {
      //   this.$router.push({ path: "/app-vue-kv/about1" });
      //   return;
      // }

      // if (id === "05c81e4f-a84a-4bd1-81de-57e2313e62be") {
      //   this.$router.push({ path: "/app-vue-kv/about2" });
      //   return;
      // }

      this.$router.push({ path });
    },
    mouseOverChange() {
      if (name === "所有功能") {
        this.$emit("dialog-show");
      } else {
        this.$emit("dialog-show-a");
      }
    },
    handlerCollapse() {
      this.dialogShow = false;
    },
    async delMenuItem(id) {
      const data = {
        menuId: id,
        type: 2,
      };
      const updateFlag = await this.$store.dispatch(
        "menu/updateMenuList",
        data
      );

      if (updateFlag) {
        const setCollectMenuList = await this.$store.dispatch(
          "menu/setCollectMenuList"
        );
        this.$store.dispatch("menu/setMenuList", setCollectMenuList);
      }
    },
    menuItemMouseOver(item) {
      if (item.path === "/home/index") {
        this.dialogShow = true;
      } else {
        this.dialogShow = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.m-sidebar-container {
  width: 48px;
  transition-delay: 300ms;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid #ebeef5;
  .yu-name {
    opacity: 0;
  }
  &:hover {
    width: @sideBarWidth;
    will-change: width;
    .yu-name {
      opacity: 1;
    }
  }
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.v-enter-active,
.v-leave-active {
  transition: all 0.4s ease;
}

.scrollbar-wrapper-menu {
  height: 100%;
}
.scrollbar-wrapper-hide {
  .scrollbar-wrapper-collapse {
    width: 100%;
    height: 100%;
    border-right: 1px solid #ebeef5;
  }
}

.m-scrollbar-wrapper {
  .yu-menu-item-active {
    background: @menuActive !important;
    margin-bottom: 4px;
    .l-drop-img {
      display: inline-block !important;
    }
    .yu-name {
      pointer-events: none;
      color: @menuActiveText !important;
      font-weight: 500 !important;
    }
    .yu-close {
      display: inline-block !important;
      position: absolute;
      right: 44px;
      top: 16px;
    }
  }
  .yu-menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 44px;
    padding: 0 16px;
    position: relative;
    margin-bottom: 4px;
    overflow: hidden;
    &:nth-child(2) {
      border-bottom: 1px solid #ebeef5;
    }
    .svg-icon {
      color: #1f2229;
    }
    &:hover {
      background: @menuHover;
      .l-drop-img {
        display: inline-block !important;
      }
      .yu-close {
        display: inline-block !important;
        position: absolute;
        right: 44px;
        top: 16px;
      }
    }
    .l-drop-img {
      cursor: pointer;
      display: none;
    }
    .yu-menu-item-left {
      display: flex;
      font-size: 14px;
      .yu-close {
        cursor: pointer;
        display: none;
        position: absolute;
        right: 44px;
        top: 16px;
      }
      .yu-icon {
        font-size: 16px;
        color: #333;
        padding-right: 20px;
      }
      .yu-name {
        font-weight: 400;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 120px;
        text-align: left;
        cursor: pointer;
        color: @menuText;
      }
    }
  }

  .yu-dialog-menu {
    width: 0;
    overflow: hidden;
    background: @menuDialogBg;
    position: absolute;
    top: 0;
    left: @sideBarWidth;
    height: 100%;
    color: @menuDialogColor;
    font-size: 14px;
    text-align: left;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    &.active {
      width: @menuDialogWidth;
      padding: 24px 0 0 48px;
      box-shadow: 16px 0px 32px 0px rgba(36, 41, 46, 0.08),
        2px 0px 4px 0px rgba(36, 41, 46, 0.04);
    }
  }
}
</style>
