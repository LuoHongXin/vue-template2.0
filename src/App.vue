<template>
  <div id="exampleApp">
    <a-config-provider :locale="antdConfigLocal">
      <router-view />
    </a-config-provider>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "ExampleApp",
  computed: {
    ...mapGetters(["langLocal", "antdConfigLocal"])
  },
  methods: {
    // ...mapMutations("lang", ["SET_LANG_LOCAL"]),
    ...mapMutations("common", ["SET_VUE_INSTANCE"])
    // changeLang(lang) {
    //   this.SET_LANG_LOCAL(lang);
    // }
  },
  created() {
    this.SET_VUE_INSTANCE(this);
  }
};
</script>
