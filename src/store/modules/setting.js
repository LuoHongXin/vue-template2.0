import config from "@/config";
import { ADMIN } from "@/config/default";

import { getLocalSetting } from "@/utils/themeUtil";

const localSetting = getLocalSetting(true);

const state = {
  palettes: ADMIN.palettes,
  ...config,
  ...localSetting
};

const mutations = {
  setTheme(state, theme) {
    state.theme = theme;
  },
  setLang(state, lang) {
    state.lang = lang;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
