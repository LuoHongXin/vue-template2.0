<template>
  <div class="drawer-container">
    <h2>
      <div class="drawer-left">
        <span class="title">任务日志</span>
        <span class="button" @click="toRouter">进入日志管理</span>
      </div>
      <span class="drawer-close" @click="close">
        <a-icon type="close" />
      </span>
    </h2>
    <div v-if="taskList.length > 0" class="card-section">
      <div v-for="item in taskList" :key="item.id" class="card-item">
        <div class="card-top">
          <div class="l">
            <Tag :status="item.status" />
            <a-progress :percent="Math.round(item.stepIndex / item.stepCount * 10000) / 100.00" :show-info="true" style="width:100px;" />
          </div>
          <div class="r">
            <span class="time">{{ item.timeCreate }}</span>
            <!-- <span>创建</span> -->
          </div>
        </div>
        <div class="card-content">
          <a-tooltip>
            <template slot="title">
              {{ item.name }}
            </template>
            <span class="title">{{ item.name }}</span>
          </a-tooltip>
          <a-tooltip>
            <template slot="title">
              {{ item.description }}
            </template>
            <p class="desc">{{ item.description }}</p>
          </a-tooltip>
        </div>
      </div>
    </div>
    <a-empty v-else />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tag from "./Tag";
export default {
  components: {
    Tag
  },
  computed: {
    ...mapGetters(["taskList"])
  },
  methods: {
    close() {
      this.$emit("close");
    },
    toRouter() {
      this.$router.push({ path: "/monitor/tasklogManager" });
      this.$emit("close");
    }
  }
};
</script>

<style lang="less">
.drawer-container {
  h2 {
    display: flex;
    height: 56px;
    align-items: center;
    justify-content: space-between;
    padding: 0 12px;
    .title {
      font-size: 16px;
      font-weight: 500;
      text-align: left;
      color: #1f2229;
      padding-right: 8px;
    }
    .button {
      display: inline-block;
      width: 96px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background: #fafbfc;
      border: 1px solid #dcdfe6;
      font-size: 12px;
      font-weight: 400;
      text-align: center;
      color: #454852;
      cursor: pointer;
    }
    .drawer-close {
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      background: rgba(0, 0, 0, 0.04);
      cursor: pointer;
    }
  }
  .card-item {
    & + .card-item {
      margin-top: 12px;
    }
    .card-top {
      background: #f5f7f9;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 12px;
      .l {
        display: flex;
        .ant-progress {
          width: 56px;
        }
      }
      .r {
        font-size: 12px;
        font-weight: 400;
        text-align: left;
        color: #83878f;
        .time {
          padding-right: 8px;
        }
      }
    }
    .card-content {
      height: 72px;
      background-color: #fff;
      padding: 12px 12px 0;
      box-sizing: border-box;
      .title {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        color: #1f2229;
        padding-bottom: 4px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: inline-block;
      }
      .desc {
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        color: #83878f;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
