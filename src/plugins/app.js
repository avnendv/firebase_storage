"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupApp = void 0;
var _lib = require("./lib");
var _routes = _interopRequireDefault(require("../routes"));
var setupApp = exports.setupApp = function setupApp(app) {
  // setup libs
  (0, _lib.setupLibs)(app);

  // register routes
  (0, _routes["default"])(app);
};