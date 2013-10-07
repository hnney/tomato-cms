module.exports = function (tomato, exports) {

  exports.fn1 = function (v, context) {
    return 'fn1:' + v;
  };

  exports.fn2Async = function (v, callback, context) {
    setTimeout(function () {
      callback(null, 'fn2:' + v);
    }, 50);
  };

};