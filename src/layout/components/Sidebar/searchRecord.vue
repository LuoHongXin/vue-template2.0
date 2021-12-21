<template>
  <div class="yu-search-record">
    <div class="header-search">
      <y-svg-icon icon-class="menuSearch" />
      <a-select
        show-search
        :value="value"
        placeholder="搜索关键字"
        :default-active-first-option="false"
        :show-arrow="false"
        :filter-option="false"
        @search="handleSearch"
        @change="handleChange"
      >
        <a-select-option v-for="d in data" :key="d.id">
          {{ d.name }}
        </a-select-option>
      </a-select>
    </div>
    <div class="search-record">
      <span class="label">最近访问：</span>
      <div class="value">
        <span v-for="item in recordListNew" :key="item.id" class="tag">
          <a href="javascript:void(0)" @click="toRouterPath(item)">{{
            item.name
          }}</a>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
let timeout;
let currentValue;

export default {
  props: {
    menuL: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      data: [],
      value: undefined,
      recordList: [],
    };
  },
  computed: {
    recordListNew() {
      return this.recordList.slice(0, 4);
    },
  },
  created() {
    this.recordList = window.getLocal("recordList") || [];
  },
  methods: {
    toRouterPath(item) {
      const { url } = item;
      this.activeTitle = url;
      this.$router.push({ path: url });
      this.$emit("to-path");
    },
    handleSearch(value) {
      this.fetch(value, (data) => (this.data = data));
    },
    handleChange(value) {
      const r = this.filterData(value);
      this.$router.push({ path: r.url });
      const recordList = this.recordList.filter((v) => v.id === value);
      if (recordList.length === 0) {
        this.recordList.unshift(r);
      }
      window.setLocal("recordList", this.recordList);
    },
    filterData(value) {
      let item;
      this.menuL.forEach((r) => {
        r.childrens.forEach((r1) => {
          if (r1.id === value) {
            item = r1;
          }
        });
      });
      return item;
    },
    fetch(value, callback) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      currentValue = value;
      const _that = this;
      const result = [];
      function fake() {
        if (currentValue === value) {
          _that.menuL.forEach((r) => {
            r.childrens.forEach((r1) => {
              if (r1.name.indexOf(currentValue) > -1) {
                result.push(r1);
              }
            });
          });
          callback(result);
        }
      }
      timeout = setTimeout(fake, 300);
    },
  },
};
</script>

<style lang="less">
.yu-search-record {
  .header-search {
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 8px;
    width: 360px;
    background-color: #f7f8fa;
    .ant-select {
      color: #454852;
      width: 336px;
    }
    .ant-select-selection {
      border: 0;
      background-color: #f7f8fa;
    }
    .ant-select-selection:hover {
      border: 0 !important;
    }
    .ant-select-focused .ant-select-selection,
    .ant-select-selection:focus,
    .ant-select-selection:active {
      border: 0 !important;
      outline: 0;
      box-shadow: none !important;
    }
    .svg-icon {
      width: 16px;
      height: 16px;
      margin: 0 0 0 4px;
    }
  }
  .search-record {
    display: flex;
    padding-top: 16px;
    padding-left: 8px;
    .label {
      font-weight: 400;
      color: #83878f;
    }
    .value {
      font-weight: 400;
      color: #454852;
      .tag {
        padding-right: 16px;
      }
    }
  }
}
</style>
