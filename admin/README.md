后台界面模块
============

配置导航栏项目

```JSON
"admin": {
    "nav": [
      {
        "name": "首页",
        "url":  "/admin/default"
      },
      {
        "name": "Tomato项目",
        "list": [
          {
            "name": "源码",
            "url":  "https://github.com/node-tomato/tomato"
          },
          {
            "name": "设计思想",
            "url":  "https://github.com/node-tomato/tomato/wiki/System-Design"
          },
          {
            "name": "issues",
            "url":  "https://github.com/node-tomato/tomato/issues"
          },
          {},
          {
            "name": "作者主页",
            "url":  "http://ucdok.com"
          },
          {
            "name": "微博",
            "url":  "http://weibo.com/ucdok"
          }
        ]
      },
      {
        "name": "帮助",
        "url":  "https://github.com/node-tomato/tomato/wiki"
      }
    ]
  }
```