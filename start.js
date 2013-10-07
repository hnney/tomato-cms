/**
 * Tomato CMS 启动文件
 */

var connect = require('connect');
var Tomato = require('tomato');

var app = new Tomato();

// 配置
app.config(require('./config'));

// 载入模块
app.load('admin');
app.load('usercenter');

// 中间件
app.use(connect.bodyParser());
app.use(connect.cookieParser('aaaaaaaa'));
app.initRouter();

app.listen(app.config('port'));