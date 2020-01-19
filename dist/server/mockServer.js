"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.server = void 0;

var _jsonServer = _interopRequireDefault(require("json-server"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _db = require("./db.js");

var _lowdb = _interopRequireDefault(require("lowdb"));

var _FileSync = _interopRequireDefault(require("lowdb/adapters/FileSync"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _expressListEndpoints = _interopRequireDefault(require("express-list-endpoints"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var server = _jsonServer["default"].create();

exports.server = server;
var database = JSON.stringify((0, _db.createData)());

var dbPath = _path["default"].join(__dirname, 'db.json');

_fs["default"].writeFileSync(dbPath, database);

var router = _jsonServer["default"].router(dbPath);

var middlewares = _jsonServer["default"].defaults({
  bodyParser: true,
  logger: true
});

var adapter = new _FileSync["default"](dbPath);
var db = (0, _lowdb["default"])(adapter);
server.set('db', db);
server.use(function (req, res, next) {
  res.db = db;
  next();
});
var port = process.env.NODE_PORT || 8080; // To handle POST, PUT and PATCH you need to use a body-parser You can use the
// one used by JSON Server

server.use(_jsonServer["default"].bodyParser); // Add an additional body parser for non json types

server.use(_bodyParser["default"].urlencoded({
  extended: true
})); // Set default middlewares (logger, static, cors and no-cache)

server.use(middlewares);
server.use(router);
server.get('/quit', function (req, res) {
  res.send('closing..');
  server.close();
});
server.get('/start', function (req, res) {
  server.listen(port, function () {
    var endpoints = (0, _expressListEndpoints["default"])(server).map(function (endpoint) {
      endpoint.path = "http://localhost:".concat(port).concat(endpoint.path);
      return endpoint;
    });
    res.send({
      endpoints: endpoints,
      port: port
    });
  });
});

try {
  if (!process.env.NO_SERVER) {
    server.listen(port, function () {
      var endpoints = (0, _expressListEndpoints["default"])(server).map(function (endpoint) {
        endpoint.path = "http://localhost:".concat(port).concat(endpoint.path);
        return endpoint;
      });
      console.log(endpoints);
      console.log("JSON Server is running on port ".concat(port));
    });
  }
} catch (err) {
  console.error('The server is already running', err);
}