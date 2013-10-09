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

// 读取数据表
db.query('SHOW TABLES', function (err, list) {
  if (err) throw err;
  if (!Array.isArray(list)) throw new Error('Unknow error');

  var tables = {};
  if (list.length > 0) {
    var k = Object.keys(list[0])[0];
    list.forEach(function (item) {
      tables[item[k]] = true;
    });
  }

  async.eachSeries(Object.keys(models), function (n, next) {

    // 依次读取出模型描述信息，并更新数据库
    var info = models[n];
    for (var i in info) {
      info[i] = fillModelItem(info[i]);
    }

    // 生成数据表描述
    var fields = {};
    for (var i in info) {
      fields[i] = makeFieldsItem(info[i]);
    }

    // 生成索引描述
    var indexes = [];
    for (var i in info) {
      if (info[i].primary || info[i].type === 'auto-id') indexes.push({fields: i, primary: true});
      if (info[i].unique) indexes.push({fields: i, unique: true});
      if (info[i].index) {
        indexes.push(makeIndexesItem(i, info[i]));
      }
    }

    if (tables[n]) {
      db.updateTable(n, fields, indexes, next);
    } else {
      db.createTable(n, fields, indexes, next);
    }

  }, function (err) {
    if (err) throw err;
    process.exit();
  });

});


/**
 * 填充模型描述信息
 *
 * @param {Object} info
 * @return {Object}
 */
function fillModelItem (info) {
  info.type = info.type.toLowerCase();
  info.required = ('required' in info) ? !!info.required : false;
  info.null = ('null' in info) ? !!info.null : true;
  info.index = ('index' in info) ? !!info.index : false;
  info.unique = ('unique' in info) ? !!info.unique : false;
  return info;
}

/**
 * 生成lei-mysql模块的字段描述数据结构
 *
 * @param {Object} info
 * @return {Object}
 */
function makeFieldsItem (info) {
  switch (info.type) {
    case 'auto-id':
      var ret = {type: 'int', autoIncrement: true};
      break;
    case 'text':
      if (!(info.length > 0 && info.length <= 255)) info.length = 255;
      var ret = {type: 'varchar', size: info.length, charset: 'utf8'};
      break;
    case 'password':
      var ret = {type: 'varchar', size: 38, charset: 'utf8'};
      break;
    case 'long-text':
      var ret = {type: 'text', charset: 'utf8'};
      break;
    case 'email':
    case 'url':
      var ret = {type: 'varchar', size: 255, charset: 'utf8'};
      break;
    case 'time':
    case 'date':
    case 'datetime':
    case 'integer':
      var ret = {type: 'int'};
      break;
    case 'number':
      var ret = {type: 'double'};
      break;
    case 'range':
      var ret = {type: info.isInteger ? 'int' : 'double'};
      break;
    default:
      throw new Error('Bad format');
  }

  if (info.null) ret.null = true;
  if (info.unique) ret.unique = true;
  if ('default' in info) ret.default = info.default;
  return ret;
}

/**
 * 生成lei-mysql模块的索引描述数据结构
 *
 * @param {String} name
 * @param {Object} info
 * @return {Object}
 */
function makeIndexesItem (name, info) {
  var ret = {fields: name};
  switch (info.type) {
    case 'long-text':
      ret.fullText = true;
      break;
  }
  return ret;
}