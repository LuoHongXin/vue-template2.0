import Vue from "vue";
import Antd from "ant-design-vue";
Vue.use(Antd);

// ant-design-vue 按需组件引入，导致主题色失效
// import {
//   Button,
//   Icon,
//   Input,
//   Select,
//   AutoComplete,
//   Drawer,
//   Modal
// } from "ant-design-vue";

// Vue.component(Button.name, Button);
// Vue.component(Icon.name, Icon);
// Vue.component(Input.name, Input);
// Vue.component(Select.name, Select);
// Vue.component(Select.Option.name, Select.Option);
// Vue.component(Select.OptGroup.name, Select.OptGroup);
// Vue.component(AutoComplete.name, AutoComplete);
// Vue.component(AutoComplete.Option.name, AutoComplete.Option);
// Vue.component(AutoComplete.OptGroup.name, AutoComplete.OptGroup);
// // Vue.component(Drawer.name, Drawer);
// // Vue.component(Modal.name, Modal);

// // Vue 2.x使用ant-design-vue 1.6.2版本,jsx写法下弹出组件报ant-portal指令异常解决姿势
// // 来源:https://blog.csdn.net/crper/article/details/106672400
// Vue.use(Drawer);
// Vue.use(Modal);
