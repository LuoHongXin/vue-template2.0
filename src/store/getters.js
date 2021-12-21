/**
 * 解决批量引入多个文件里的对应的state
 * import { mapGetters } from "vuex";
 * computed: {
 *  ...mapGetters(["lang", "storageList"]),
 * },
 **/
const getters = {
  // vuex中store保存的数据，刷新页面会清空
  userInfo: state => {
    if (!state.commonData.userInfo) {
      try {
        const user = window.getLocal("userInfo");
        state.commonData.userInfo = user;
      } catch (e) {
        console.error(e);
      }
    }
    return state.commonData.userInfo;
  },
  isApp: state => state.user.isApp,
  menuShrinkList: state => state.menu.menuShrinkList,
  menuDialogTree: state => state.menu.menuDialogTree,
  collectMenuList: state => state.menu.collectMenuList,
  commonTaskList: state => state.websocket.commonTaskList,
  taskList: state => state.websocket.taskList
};
export default getters;
