module.exports = function (tomato, exports) {

  exports.get = function (req, res, next) {
    res.context.setLocals('nav', tomato.config('admin.nav'));
    res.render('index');
  };

};