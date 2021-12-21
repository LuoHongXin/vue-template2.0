<template>
  <div class="drawer-tag-contanier">
    <span class="tag tag-start" :class="className">{{ statusName }}</span>
  </div>
</template>
<script>
export default {
  props: ["status"],
  data() {
    return {
      statusName: ""
    };
  },
  computed: {
    className() {
      const status = Number(this.status);
      let classStr = "";
      let statusName = "";
      switch (status) {
        case 0:
          classStr = "tagNoStart";
          statusName = "未开始";
          break;
        case 1:
          classStr = "tagStart";
          statusName = "已开始";
          break;
        case 2:
          classStr = "tagCancel";
          statusName = "已取消";
          break;
        case 3:
          classStr = "tagSuccess";
          statusName = "成功";
          break;
        case 4:
          classStr = "tagError";
          statusName = "失败";
          break;
      }
      this.statusName = statusName;
      return classStr;
    }
  }
};
</script>
<style lang="less">
.drawer-tag-contanier {
  .tag {
    margin-right: 8px;
    width: 52px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 400;
  }
  .tagSuccess {
    background: #EDF7E8;
    border: 1px solid #53B324;
    color: #53B324;
  }
  .tagNoStart {
    background: #F2F6FC;
    border: 1px solid #454852;
    color: #454852;
  }
  .tagStart {
    background: #EBEFFA;
    border: 1px solid #3d61cc;
    color: #3d61cc;
  }
  .tagCancel {
    background: #FCF5EA;
    border: 1px solid #E69A29;
    color: #E69A29;
  }
  .tagError {
    background: #FBEBEB;
    border: 1px solid #d93934;
    color: #d93934;
  }
}
</style>
