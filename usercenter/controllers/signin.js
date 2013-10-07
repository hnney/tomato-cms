module.exports = function (tomato, exports) {

  var utils = require('../lib/utils');

  exports.get = function (req, res, next) {
    res.render('signin');
  };

  exports.post = function (req, res, next) {
    var data = {
      username: req.body.username,
      password: req.body.password
    };
    tomato.require('user').signin(data, function (err, ok) {
      if (err) return next(err);
      if (ok) {

        var s = utils.encryptData({
          u: data.username,
          p: data.password,
          t: parseInt(Date.now() / 1000, 10)
        }, tomato.config('usercenter.secret'));
        res.cookie('signin', s, {
          path:   '/',
          maxAge: tomato.config('usercenter.maxAge')
        });

        res.redirect(req.query.url || '/');

      } else {
        res.render('signin', {invalid: true});
      }
    });
  };

};