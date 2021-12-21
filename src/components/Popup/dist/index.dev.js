"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
},);
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue",),);

var _index = _interopRequireDefault(require("./index.vue",),);

function _interopRequireDefault(obj,) { return obj && obj.__esModule ? obj : { "default": obj, }; }

var PopupBox = _vue["default"].extend(_index["default"],);

_index["default"].install = function (data,) {
  var instance = new PopupBox({
    data: data,
  },).$mount();
  document.body.appendChild(instance.$el,);

  _vue["default"].nextTick(function () {
    instance.show = true; // show 和弹窗组件里的show对应，用于控制显隐
  },);
};

var _default = _index["default"];
exports["default"] = _default;