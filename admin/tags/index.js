module.exports = function (tomato, exports) {

  exports.say_hello = function (context, name, body) {
    var ast = tomato.parseTemplate('Hello, {{' + body.trim() + '}}!');
    context.astStack.push(ast);
  };

};