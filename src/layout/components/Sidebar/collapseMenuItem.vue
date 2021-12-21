<template>
  <div class="collapse-menu-contanier">
    <div
      v-for="(item, index) in menuList"
      :key="index"
      class="yu-collapse-menu"
    >
      <div class="yu-collapse-icon">
        <item v-if="item.icon" :icon="item.icon" />
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./Item";
export default {
  name: "CollapseMenuItem",
  components: { Item },
  props: {
    menuList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
};
</script>

<style lang="less" scoped>
.collapse-menu-contanier {
  .yu-collapse-menu {
    &:nth-child(2) {
      .yu-collapse-icon {
        border-bottom: 1px solid #ebeef5;
      }
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
    }
  }

  .yu-collapse-icon {
    font-size: 16px;
  }
}
</style>
