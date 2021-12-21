<template>
  <transition-group name="fade">
    <!-- 蒙版 -->
    <!-- <div
      class="mask"
      key="1"
      @click="show = false"
      v-if="show"
      @touchmove.prevent
    ></div> -->
    {{ show }}
    <div
      v-show="show"
      key="2"
      class="v-pop"
      :style="{ width: width ? width : '' }">
      <!-- <img :src="imgUrl" :alt="imgLoadTip" /> -->
      <h2>{{ title }}</h2>
      <p class="content" v-html="content"></p>
      <div class="footer-button">
        <!-- <el-button size="mini" @click="show = false">
          取消
        </el-button>
        <el-button size="mini" type="primary">
          确认
        </el-button> -->
      </div>
      <!-- <button @click="btnClick">{{ btnText }}</button> -->
      <span class="close-button" @click="show = false">x</span>
      <!-- <img @click="show = false" class="close" src="" alt="" /> -->
    </div>
  </transition-group>
</template>
<script>
export default {
  name: "Popup",
  data() {
    return {
      show: false,
      imgUrl: "",
      title: "",
      content: "",
      btnText: "",
      width: ""
    };
  },
  created() {},
  methods: {
    btnClick() {
      this.click();
      this.show = false;
    }
  }
};
</script>
<style lang="less" scoped>
// 渐变过渡
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}
// 全局弹窗
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
}

.v-pop {
  min-height: 240px;
  min-width: 330px;
  background: #fff;
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 20;
  text-align: center;
  border: 1px solid #ccc;
  h2 {
    text-align: center;
    font-weight: bold;
    padding: 10px 0;
    margin: 0;
    border-bottom: 1px solid #ccc;
  }
  .content {
    padding: 0 20px;
  }
  .footer-button {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 100%;
  }

  .close-button {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 26px;
    cursor: pointer;
  }
}
</style>
