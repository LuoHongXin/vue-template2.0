const getters = {
  langLocal: state => {
    if (!state.lang.local) {
      try {
        const local = window.getLocal("lang");
        state.lang.local = local || "zh_CN";
      } catch (e) {
        console.error(e);
      }
    }
    return state.lang.local;
  },
  antdConfigLocal: state => state.lang.antdConfigLocal
};
export default getters;
