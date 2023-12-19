"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadController = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _storage = require("firebase/storage");
var _catchAsync = require("../utils/catchAsync");
var _response = require("../utils/response");
var _env = require("../config/env");
// Initialize Cloud Storage and get a reference to the service
var storage = (0, _storage.getStorage)();
var UploadController = exports.UploadController = {
  upload: (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
      var dateTime, storageRef, metadata, snapshot, downloadURL, data;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (req.file) {
              _context.next = 2;
              break;
            }
            throw new Error('File Upload Required!');
          case 2:
            if (!(req.headers['x-upload-secret'] !== _env.UPLOAD_SECRET)) {
              _context.next = 4;
              break;
            }
            throw new Error('Something wrong!');
          case 4:
            dateTime = giveCurrentDateTime();
            storageRef = (0, _storage.ref)(storage, "files/".concat("".concat(req.file.originalname, "__").concat(dateTime))); // Create file metadata including the content type
            metadata = {
              contentType: req.file.mimetype
            }; // Upload the file in the bucket storage
            _context.next = 9;
            return (0, _storage.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
          case 9:
            snapshot = _context.sent;
            _context.next = 12;
            return (0, _storage.getDownloadURL)(snapshot.ref);
          case 12:
            downloadURL = _context.sent;
            data = {
              message: 'File uploaded to firebase storage!',
              name: req.file.originalname,
              type: req.file.mimetype,
              downloadURL: downloadURL
            };
            return _context.abrupt("return", res.json((0, _response.successResponse)(data)));
          case 15:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }())
};
var giveCurrentDateTime = function giveCurrentDateTime() {
  var today = new Date();
  var date = "".concat(today.getFullYear(), "-").concat(today.getMonth() + 1, "-").concat(today.getDate());
  var time = "".concat(today.getHours(), "-").concat(today.getMinutes(), "-").concat(today.getSeconds());
  var dateTime = "".concat(date, "-").concat(time);
  return dateTime;
};