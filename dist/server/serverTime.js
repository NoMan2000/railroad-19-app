"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "moment", {
  enumerable: true,
  get: function get() {
    return _moment["default"];
  }
});
exports.dateInPast = exports.convertToHumanReadable = exports.convertDateToString = exports.DEFAULT_FORMAT = void 0;

var _moment = _interopRequireDefault(require("moment"));

require("moment-timezone");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULT_FORMAT = 'MM/DD/YYYY';
exports.DEFAULT_FORMAT = DEFAULT_FORMAT;

var convertDateToString = function convertDateToString(time) {
  return time instanceof Date ? time.toISOString() : time;
};

exports.convertDateToString = convertDateToString;

var convertToHumanReadable = function convertToHumanReadable(time) {
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_FORMAT;
  time = convertDateToString(time);
  return time ? (0, _moment["default"])(time).format(format) : '';
};

exports.convertToHumanReadable = convertToHumanReadable;

var dateInPast = function dateInPast() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    years: 0,
    months: 0,
    days: 0
  };
  var refDate = arguments.length > 1 ? arguments[1] : undefined;
  var _time$years = time.years,
      years = _time$years === void 0 ? 0 : _time$years,
      _time$days = time.days,
      days = _time$days === void 0 ? 0 : _time$days,
      _time$months = time.months,
      months = _time$months === void 0 ? 0 : _time$months;
  var date = refDate ? new Date(Date.parse(refDate)) : new Date();
  var newDate = (0, _moment["default"])(date);

  if (days) {
    newDate.subtract(days, 'days');
  }

  if (months) {
    newDate.subtract(months, 'months');
  }

  if (years) {
    newDate.subtract(years, 'years');
  }

  return newDate.toDate();
};

exports.dateInPast = dateInPast;