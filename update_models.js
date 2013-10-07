/**
 * Tomato CMS 更新数据模型
 *
 * @author 老雷<leizongmin@gmail.com>
 */

var fs = require('fs');
var path = require('path');
var rd = require('rd');
var async = require('async');
var MySQLPool = require('lei-mysql');
var config = require('./config');

// 创建数据库连接
var db = new MySQLPool(config.db.connection);

// 读取出所有模型描述文件
var models = {};
var MODELS_PATH = './models';
rd.eachSync(MODELS_PATH, function (f, s) {
  if (s.isFile() && f.substr(-5) === '.json') {
    f = path.resolve(MODELS_PATH, f);
    var n = path.basename(f).slice(0, -5).toLowerCase();
    models[n] = require(f);
  }
});

async.eachSeries(Object.keys(models), function (n, next) {

  // 依次读取出模型描述信息，并更新数据库
  var info = models[n];
  console.log(info);
  next();

}, function (err) {
  if (err) throw err;
  process.exit();
});