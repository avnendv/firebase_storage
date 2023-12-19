"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _controllers = require("../controllers");
var _middlewares = require("../middlewares");
// Setting up multer as a middleware to grab photo uploads
var upload = (0, _multer["default"])({
  storage: _multer["default"].memoryStorage()
});
var router = function router(app) {
  // say hello world
  app.get('/', _controllers.HelloWorld);
  app.post('/upload', upload.single('file'), _controllers.UploadController.upload);

  // handle errors
  app.use(_middlewares.errorHandle);
};
var _default = exports["default"] = router;