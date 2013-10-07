/**
 * Tomato CMS 配置文件
 */

exports.port = 8080;

exports.db = {
  type:       'mysql',
  connection: {
    host:     '127.0.0.1',
    port:     3306,
    database: 'tomato',
    username: 'root',
    user:     'root',
    password: '',
    pool:     10
  }
};

exports.admin = {
  nav: []
};
