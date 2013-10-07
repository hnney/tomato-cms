module.exports = function (tomato, exports) {

  return function (req, res, next) {
    console.log('middleware: hello, world');
    next();
  };

};
