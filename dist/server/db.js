"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createData = exports.createServerData = void 0;

var _faker = _interopRequireDefault(require("faker"));

var _serverTime = require("./serverTime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createServerData = function createServerData(length) {
  return Array.from({
    length: length
  }).map(function () {
    var months = _faker["default"].random.number({
      min: 0,
      max: 12
    });

    var days = _faker["default"].random.number({
      min: 0,
      max: 28
    });

    var futureDate = (0, _serverTime.dateInPast)({
      months: months,
      days: days
    });
    var pastDate = (0, _serverTime.dateInPast)({
      months: _faker["default"].random.number({
        min: months,
        max: 12
      }),
      days: _faker["default"].random.number({
        min: days,
        max: 28
      })
    });
    return {
      title: _faker["default"].name.title(),
      division: _faker["default"].commerce.department(),
      project_owner: _faker["default"].name.findName(),
      budget: Number(_faker["default"].commerce.price()),
      status: _faker["default"].random.arrayElement(['active', 'inactive', 'completed']),
      created: (0, _serverTime.convertToHumanReadable)(pastDate),
      // MM/DD/YYYY
      modified: (0, _serverTime.convertToHumanReadable)(futureDate) // MM/DD/YYYY

    };
  });
};

exports.createServerData = createServerData;

var createData = function createData() {
  var length = Number(process.env.TOTAL_DATA) || 50;
  var serverData = createServerData(length);
  return {
    serverData: serverData
  };
};

exports.createData = createData;