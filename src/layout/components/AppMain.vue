<template>
  <section
    class="app-main"
    :class="{
      'app-main-home': !isBreadcrumb,
      'app-page-home': this.isPage,
    }"
  >
    <y-breadcrumb
      v-if="isBreadcrumb"
      id="breadcrumb-container"
      class="breadcrumb-container"
    />

    <div class="app-main-view">
      <transition name="fade-transform" mode="out-in">
        <keep-alive v-if="noCache">
          <router-view />
        </keep-alive>
        <router-view v-else />
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {
      isBreadcrumb: true,
      noCache: true,
      isPage: false,
    };
  },
  watch: {
    "$route.path": function (newVal, oldVal) {
      this.getCachedViews();
    },
  },
  created() {
    this.getCachedViews();
  },
  methods: {
    getCachedViews() {
      const { noCache, path } = this.$route.meta;
      this.noCache = noCache;
      this.isPage = false;
      this.isBreadcrumb = true;

      if (path && path.length > 0) {
        this.isPage = true;
      }

      if (this.$route.path === "/home") {
        this.isBreadcrumb = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  margin-top: @headerHeight;
  padding-right: 24px;
  padding-left: 72px;
  .app-main-view {
    padding: 16px 24px 16px;
    background: #fff;
  }
}

.app-main-is-qiankun {
  padding: 0;
  margin: 24px 24px 0 185px;
  .app-main-view {
    padding: 0 !important;
    margin-top: 0 !important;
  }
}

.app-main-is-qiankun-breadcrumb {
  margin-top: 0;
  .app-main-view {
    padding: 24px !important;
  }
}

.app-page-home {
  padding-left: 48px;
  padding-right: 0px;
  .yu-breadcrumb {
    background: #fff;
    padding-left: 24px;
  }
  .app-main-view {
    padding: 0;
  }
}

.app-main-home {
  .app-main-view {
    margin-top: 24px;
    background: #f7f8fa !important;
    padding: 0;
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
