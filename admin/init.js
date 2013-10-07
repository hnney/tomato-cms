module.exports = function (tomato, exports) {
  
  tomato.rewrite('/admin', '/controller/admin/index');
  tomato.rewrite('/admin/default', '/view/admin/default');

};
