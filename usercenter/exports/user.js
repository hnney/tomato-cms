/**
 * 输出函数
 */

var check = require('validator').check;
var sanitize = require('validator').sanitize;
var utils = require('../lib/utils');


module.exports = function (tomato, exports) {

  /**
   * 登录
   *
   * @param {Object} data
   *   - {String} username
   *   - {String} password
   * @param {Function} callback
   */
  exports.signin = function (data, callback) {
    var username = data.username;
    var password = data.password;
    var User = tomato.model('User');

    User.findOne({username: username}, function (err, user) {
      if (err) return callback(new Error(tomato.lang('msg.error.userNotExists', username)));

      if (utils.validatePassword(password, user.password)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    });
  };

  /**
   * 注册
   *
   * @param {Object} data
   *   - {String} username
   *   - {String} password
   * @param {Function} callback
   */
  exports.signup = function (data, callback) {
    var username = (data.username || '').toLowerCase();
    var password = data.password || '';
    var User = tomato.model('User');

    if (!(username.length >= 3 && username.length <= 50)) {
      return callback(new Error(tomato.lang('msg.error.invalideUsername')));
    }
    if (!(password.length >= 6)) {
      return callback(new Error(tomato.lang('msg.error.passwordTooShort')));
    }

    User.findOne
  }

};