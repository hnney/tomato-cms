module.exports = function (tomato, exports) {

  var utils = require('../lib/utils');

  return utils.defineModel(tomato.config('db.type'), tomato.config('db.connection'), 'User', {
    username: {type: String, dataType: 'varchar', limit: 50},
    password: {type: String, dataType: 'varchar', limit: 38}
  });

};