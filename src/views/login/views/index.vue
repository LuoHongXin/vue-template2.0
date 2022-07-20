<template>
  <div>
    <div
      class="login-bg"
      :style="{
        background: 'url(' + require('../images/bg.png') + ')'
      }"
    >
      <img alt src="@/assets/images/logo.png" />
      <div class="login-view">
        <h2>{{ $t("example.login.title") }}</h2>
        <y-input
          autoWidth
          :placeholder="$t('example.login.form.account')"
          size="large"
        />
        <div style="height: 16px"></div>
        <y-input
          autoWidth
          :placeholder="$t('example.login.form.password')"
          size="large"
        />
        <div style="height: 16px"></div>
        <y-button type="primary" size="large" block @click="login">{{
          $t("example.login.loginButton")
        }}</y-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
const { userDev } = require("@/utils/account");
export default {
  name: "LoginView",
  methods: {
    ...mapActions("user", { userLogin: "login" }),
    login() {
      this.userLogin(userDev.account).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style style="less" scoped>
.login-bg {
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
}

.login-bg img {
  position: relative;
  top: 20px;
  left: 20px;
}

.login-view {
  background-color: #fff;
  border-radius: 2px;
  padding: 30px;
  position: absolute;
  left: 65vw;
  top: 30vh;
  width: 336px;
}
</style>
