module.exports = function (tomato, exports) {

  // URL重写
  tomato.rewrite('/admin/user', '$/controller/index');

  // 增加后台菜单
  tomato.config('admin.nav').push({
    name: '用户管理',
    list: [{
      name: '用户列表',
      url:  tomato.path('controller/list')
    }, {
      name: '添加用户',
      url:  tomato.path('controller/add')
    }]
  });

};