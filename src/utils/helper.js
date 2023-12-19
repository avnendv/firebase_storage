"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slugify = exports.errorResponse = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
var errorResponse = exports.errorResponse = function errorResponse(error) {
  var errorResponseData = {
    result: 0,
    isLogger: true,
    msg: 'Server error!'
  };
  return _objectSpread(_objectSpread({}, errorResponseData), error);
};

/** slug generator */
var slugify = exports.slugify = function slugify(str) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '-';
  return String(str).normalize('NFKD') // split accented characters into their base characters and diacritical marks
  .replace(/[\u0300-\u036f]/g, '') // remove all the accents, which happen to be all in the \u03xx UNICODE block.
  .trim() // trim leading or trailing whitespace
  .toLowerCase() // convert to lowercase
  .replace(/[đ]/g, 'd') // change đ to d
  .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric characters
  .replace(/\s+/g, prefix) // replace spaces with hyphens
  .replace(/-+/g, prefix);
}; // remove consecutive hyphens +