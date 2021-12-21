<template>
  <div class="dialog-menu-contanier">
    <searchRecord :menu-l="menuDialogTree" @to-path="handlerToPath" />
    <div class="menu-content">
      <div
        v-for="(item, index) in menuDialogTree"
        :key="index"
        class="menu-item"
      >
        <h2 class="title">{{ item.name }}</h2>
        <div class="sub-menu-content">
          <div
            v-for="(sitem, sindex) in item.childrens"
            :key="sindex"
            class="sub-menu-item"
            :class="
              menuListStr.includes(sitem.id) ? 'sub-menu-item-active' : ''
            "
          >
            <div class="sub-menu-item-left" @click="toRouter(sitem)">
              <item v-if="sitem.icon" :icon="sitem.icon" />
              <span class="sub-menu-name">{{ sitem.name }}</span>
            </div>
            <div class="star" @click="toLighten(sitem)">
              <img
                v-if="!menuListStr.includes(sitem.id)"
                src="@/assets/images/star.png"
              />
              <img v-else src="@/assets/images/starActive.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item";
import searchRecord from "./searchRecord";
import { mapState } from "vuex";
export default {
  name: "DialogMenu",
  components: { Item, searchRecord },
  data() {
    return {
      subMenu: [],
      recordList: [],
    };
  },
  computed: {
    ...mapState("menu", ["collectMenuList", "menuDialogTree"]),
    menuListStr() {
      const data = this.collectMenuList;
      let str = "";
      data.forEach((value) => {
        str += value.menuId + ",";
      });
      return str;
    },
  },
  methods: {
    async toLighten(item) {
      const flag = this.menuListStr.includes(item.id);
      const data = {
        menuId: item.id,
        type: flag ? 2 : 1,
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
    toRouter(item) {
      this.$router.push({ path: item.url });
      this.$emit("to-collapse");
    },
    handlerToPath() {
      this.$emit("to-collapse");
    },
  },
};
</script>

<style lang="less">
@import "~@/styles/mixin/index.less";
.dialog-menu-contanier {
  .menu-content {
    padding-top: 24px;
    .menu-item {
      width: 160px;
      padding-bottom: 41px;
      margin-right: 48px;
      float: left;
      .clearfix;
      .title {
        height: 32px;
        font-weight: 500;
        text-align: left;
        color: #1f2229;
        line-height: 32px;
        margin: 0;
        padding-left: 12px;
        font-size: 14px;
      }
      .sub-menu-content {
        .sub-menu-item {
          height: 32px;
          line-height: 32px;
          padding: 0 12px;
          font-weight: 400;
          color: #454852;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          cursor: pointer;
          .star {
            height: 100%;
            display: flex;
            align-items: center;
          }
          &:hover {
            color: #d93934;
            img {
              display: inline-block;
            }
            svg {
              color: #d93934 !important;
            }
          }
          .sub-menu-item-left {
            display: flex;
            align-items: center;
            svg {
              font-size: 16px;
            }
            .sub-menu-name {
              padding-left: 8px;
              font-weight: 400;
            }
          }
          img {
            width: 16px;
            height: 16px;
            display: none;
          }
        }
        .sub-menu-item-active {
          img {
            display: inline-block !important;
          }
        }
      }
    }
  }
}
</style>
