usercenter模块
==============

## 页面

* 登录页面：/controller/usercenter/signin

* 注册页面：/controller/usercenter/signup

* 注销页面：/controller/usercenter/signout

## JSON API

* 登录API：/api/usercenter/signin.json

* 检查用户名：/api/usercenter/check_username.json

* 注册API：/api/usercenter/signup.json

* 注销API：/api/usercenter/signout.json

* 用户信息API：/api/usercenter/info.json

## 中间件

在控制器中使用中间件 `usercenter.signin` 后，及可通过 `req.signinUser` 来获取当前
登录用户信息。如果为非登录用户，会自动跳转到登录页面，待登录成功后再跳转回来。

```JavaScript
module.exports = function (tomato, exports) {

  exports.use = ['usercenter.signin'];

  exports.get = function (req, res, next) {
    console.log('当前登录用户：%s', req.signinUser.username);

    // 获取详细信息
    req.signinUser.info(function (err, info) {
      if (err) throw err;
      console.log(info);
    });

    // 检查用户是否有相关权限
    req.signinUser.acl(['xxxxx', 'yyyyyy'], function (err, ok) {
      if (err) throw err;
      console.log('是否有权限？%s', ok);
    });
  };

};
```

## 输出

* 登录：`signin(data, callback)`

* 用户信息：`info(data, callback)`

* 注册：`signup(data, callback)`
