<template>
  <div class="Login">
    Login
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  methods: {
    ...mapActions("user", ["userLogin"]),
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            await this.userLogin({
              ...this.ruleForm,
              uid: this.uid,
            });
            this.$router.push("/");
          } catch (e) {
            this.$message({ type: "error", message: e });
          }
        } else {
          alert("失败");
          return false;
        }
      });
    },
  },
};
</script>
