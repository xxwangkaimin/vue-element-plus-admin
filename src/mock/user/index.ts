import { LoginFormData, LoginUserBaseInfoData } from "@/api/user/types"
import { RelationMenu } from "@/api/relation/types"
import { MockMethod } from "vite-plugin-mock"
import { Random } from "mockjs"

const api = "/api"

const List: LoginUserBaseInfoData[] = [
  {
    "avatar": "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
    "loginName": "admin",
    "password": "123456",
    "realname": "AdminWang",
    "introduction": "万幸得以相识，无幸得以相伴。",
    "roleId": "chaojiguanliyuan",
    "roleName": "超级管理员"
  }
]

const MenuList: RelationMenu[] = [
  {
    "id": "d7c613c7dcbb57594058c8b91f845b10",
    "pid": "",
    "sort": 0,
    "path": "/privilegeManage",
    "name": "privilegeManage",
    "redirect": "/privilegeManage/menuList",
    "component": "Layout",
    "meta": {
      "title": "权限管理",
      "icon": "privilege-manage",
      "alwaysShow": true,
      "hidden": false,
      "noCache": false,
      "activeMenu": ""
    },
    "children": [
      {
        "id": "725a285d2a722f2ccd58e57e6cd7a129",
        "pid": "d7c613c7dcbb57594058c8b91f845b10",
        "sort": 0,
        "path": "menuList",
        "name": "menuList",
        "redirect": "",
        "component": "privilegeManage/menuList",
        "meta": {
          "title": "菜单管理",
          "icon": "menu",
          "alwaysShow": false,
          "hidden": false,
          "noCache": true,
          "activeMenu": ""
        }
      },
      {
        "id": "dd0e4c4e54321ea56089fe64700102dd",
        "pid": "d7c613c7dcbb57594058c8b91f845b10",
        "sort": 1,
        "path": "menuCreate",
        "name": "menuCreate",
        "redirect": "",
        "component": "privilegeManage/menuCreate",
        "meta": {
          "title": "添加菜单",
          "icon": null,
          "alwaysShow": false,
          "hidden": true,
          "noCache": false,
          "activeMenu": "/privilegeManage/menuList"
        }
      },
      {
        "id": "3cae9dca1ada40a3c1a1f15c4ccf7825",
        "pid": "d7c613c7dcbb57594058c8b91f845b10",
        "sort": 2,
        "path": "menuUpdate",
        "name": "menuUpdate",
        "redirect": null,
        "component": "privilegeManage/menuUpdate",
        "meta": {
          "title": "修改菜单",
          "icon": null,
          "alwaysShow": false,
          "hidden": true,
          "noCache": false,
          "activeMenu": "/privilegeManage/menuList"
        }
      },
      {
        "id": "124a6bf30d8a66d9cf9a6dc02988d92e",
        "pid": "d7c613c7dcbb57594058c8b91f845b10",
        "sort": 3,
        "path": "roleList",
        "name": "roleList",
        "redirect": null,
        "component": "privilegeManage/roleList",
        "meta": {
          "title": "角色管理",
          "icon": "role-list",
          "alwaysShow": false,
          "hidden": false,
          "noCache": true,
          "activeMenu": ""
        }
      }
    ]
  },
  {
    "id": "80147eb6725c94094b686d504313bc56",
    "pid": "",
    "sort": 1,
    "path": "/userManage",
    "name": "userManage",
    "redirect": "/userManage/userList",
    "component": "Layout",
    "meta": {
      "title": "用户管理",
      "icon": "peoples",
      "alwaysShow": true,
      "hidden": false,
      "noCache": false,
      "activeMenu": ""
    },
    "children": [
      {
        "id": "3d637cd99b8d525d9455fa6e84beedf7",
        "pid": "80147eb6725c94094b686d504313bc56",
        "sort": 0,
        "path": "userList",
        "name": "userList",
        "redirect": null,
        "component": "userManage/userList",
        "meta": {
          "title": "用户列表",
          "icon": "userlist",
          "alwaysShow": false,
          "hidden": false,
          "noCache": false,
          "activeMenu": ""
        }
      }
    ]
  },
  {
    "id": "f95523b631cbb1f9bc7892147f2e441f",
    "pid": "",
    "sort": 2,
    "path": "/accountManage",
    "name": "accountManage",
    "redirect": "/accountManage/accountList",
    "component": "Layout",
    "meta": {
      "title": "账单管理",
      "icon": "accounts",
      "alwaysShow": true,
      "hidden": false,
      "noCache": false,
      "activeMenu": ""
    },
    "children": [
      {
        "id": "fe3f020e9cf67ced515b9b9b965d8a41",
        "pid": "f95523b631cbb1f9bc7892147f2e441f",
        "sort": 0,
        "path": "capitalSourceManage",
        "name": "capitalSourceManage",
        "redirect": "",
        "component": "accountManage/capitalSourceManage",
        "meta": {
          "title": "资金源管理",
          "icon": "capital-manage",
          "alwaysShow": false,
          "hidden": false,
          "noCache": true,
          "activeMenu": ""
        }
      },
      {
        "id": "07233270155ca5bc1dce259bb2337e26",
        "pid": "f95523b631cbb1f9bc7892147f2e441f",
        "sort": 1,
        "path": "accountCategory",
        "name": "accountCategory",
        "redirect": null,
        "component": "accountManage/accountCategory",
        "meta": {
          "title": "分类管理",
          "icon": "classify",
          "alwaysShow": false,
          "hidden": false,
          "noCache": false,
          "activeMenu": ""
        }
      },
      {
        "id": "8b0e14591bb0964817192401b3bfe934",
        "pid": "f95523b631cbb1f9bc7892147f2e441f",
        "sort": 2,
        "path": "accountList",
        "name": "accountList",
        "redirect": null,
        "component": "accountManage/accountList",
        "meta": {
          "title": "账单列表",
          "icon": "capitallist",
          "alwaysShow": false,
          "hidden": false,
          "noCache": false,
          "activeMenu": ""
        }
      },
      {
        "id": "f8548737bacd227bddbc7315a7f65fd0",
        "pid": "f95523b631cbb1f9bc7892147f2e441f",
        "sort": 4,
        "path": "accountCreate",
        "name": "accountCreate",
        "redirect": null,
        "component": "accountManage/accountCreate",
        "meta": {
          "title": "添加账单",
          "icon": null,
          "alwaysShow": false,
          "hidden": true,
          "noCache": false,
          "activeMenu": "/accountManage/accountList"
        }
      },
      {
        "id": "05c7314e2fdfe321117ee8f43e78354e",
        "pid": "f95523b631cbb1f9bc7892147f2e441f",
        "sort": 5,
        "path": "borrowManage",
        "name": "borrowManage",
        "redirect": "",
        "component": "accountManage/borrowManage",
        "meta": {
          "title": "借账管理",
          "icon": "borrowManage",
          "alwaysShow": false,
          "hidden": false,
          "noCache": true,
          "activeMenu": ""
        }
      },
      {
        "id": "0331f02e6f9bacf7d09faa40ae6326e1",
        "pid": "f95523b631cbb1f9bc7892147f2e441f",
        "sort": 6,
        "path": "accountByBorrow",
        "name": "accountByBorrow",
        "redirect": "",
        "component": "accountManage/accountByBorrow",
        "meta": {
          "title": "借账账单",
          "icon": "",
          "alwaysShow": false,
          "hidden": true,
          "noCache": true,
          "activeMenu": "/accountManage/borrowManage"
        }
      }
    ]
  },
  {
    "id": "69ab2c6c6f5b514b5cd665e703ee7854",
    "pid": "",
    "sort": 3,
    "path": "/articleManage",
    "name": "articleManage",
    "redirect": "/articleManage/articleColumnList",
    "component": "Layout",
    "meta": {
      "title": "文章管理",
      "icon": "article",
      "alwaysShow": true,
      "hidden": false,
      "noCache": false,
      "activeMenu": ""
    },
    "children": [
      {
        "id": "d8f20ac434bbffc93cf31ed57f814948",
        "pid": "69ab2c6c6f5b514b5cd665e703ee7854",
        "sort": 0,
        "path": "articleColumnList",
        "name": "articleColumnList",
        "redirect": "",
        "component": "articleManage/articleColumnList",
        "meta": {
          "title": "栏目管理",
          "icon": "column",
          "alwaysShow": false,
          "hidden": false,
          "noCache": true,
          "activeMenu": ""
        }
      },
      {
        "id": "38b455036f5ad8cfe72c9151721f2844",
        "pid": "69ab2c6c6f5b514b5cd665e703ee7854",
        "sort": 1,
        "path": "articleList",
        "name": "articleList",
        "redirect": null,
        "component": "articleManage/articleList",
        "meta": {
          "title": "文章列表",
          "icon": "article-list",
          "alwaysShow": false,
          "hidden": false,
          "noCache": true,
          "activeMenu": ""
        }
      },
      {
        "id": "dd4dd92324d406cf160b7f62f3f52e3c",
        "pid": "69ab2c6c6f5b514b5cd665e703ee7854",
        "sort": 2,
        "path": "articleCreate",
        "name": "articleCreate",
        "redirect": null,
        "component": "articleManage/articleCreate",
        "meta": {
          "title": "添加文章",
          "icon": "",
          "alwaysShow": false,
          "hidden": true,
          "noCache": false,
          "activeMenu": "/articleManage/articleList"
        }
      },
      {
        "id": "3d8417c3220dfda4f90f35b233700ad2",
        "pid": "69ab2c6c6f5b514b5cd665e703ee7854",
        "sort": 3,
        "path": "articleUpdate",
        "name": "articleUpdate",
        "redirect": null,
        "component": "articleManage/articleUpdate",
        "meta": {
          "title": "修改文章",
          "icon": null,
          "alwaysShow": false,
          "hidden": true,
          "noCache": true,
          "activeMenu": "/articleManage/articleList"
        }
      }
    ]
  },
  {
    "id": "9e878ea2ddddf6ce18ab0fcc6d0821e0",
    "pid": "",
    "sort": 5,
    "path": "/mediaManage",
    "name": "mediaManage",
    "redirect": "/mediaManage/musicList",
    "component": "Layout",
    "meta": {
      "title": "媒体管理",
      "icon": "media",
      "alwaysShow": true,
      "hidden": false,
      "noCache": false,
      "activeMenu": ""
    },
    "children": [
      {
        "id": "b1eaba81ecb628c9f7bb3872d624cffa",
        "pid": "9e878ea2ddddf6ce18ab0fcc6d0821e0",
        "sort": 0,
        "path": "musicList",
        "name": "musicList",
        "redirect": null,
        "component": "mediaManage/musicList",
        "meta": {
          "title": "音乐管理",
          "icon": "music",
          "alwaysShow": false,
          "hidden": false,
          "noCache": false,
          "activeMenu": ""
        }
      },
      {
        "id": "7176877cd7af096c38e403d34075186d",
        "pid": "9e878ea2ddddf6ce18ab0fcc6d0821e0",
        "sort": 1,
        "path": "musicCreate",
        "name": "musicCreate",
        "redirect": null,
        "component": "mediaManage/musicCreate",
        "meta": {
          "title": "添加音乐",
          "icon": null,
          "alwaysShow": false,
          "hidden": true,
          "noCache": false,
          "activeMenu": "/mediaManage/musicList"
        }
      },
      {
        "id": "bd76cdb9db3ed9e3f1e615aada800f4b",
        "pid": "9e878ea2ddddf6ce18ab0fcc6d0821e0",
        "sort": 2,
        "path": "musicUpdate",
        "name": "musicUpdate",
        "redirect": null,
        "component": "mediaManage/musicUpdate",
        "meta": {
          "title": "修改音乐",
          "icon": null,
          "alwaysShow": false,
          "hidden": true,
          "noCache": false,
          "activeMenu": "/mediaManage/musicList"
        }
      }
    ]
  },
  {
    "id": "a9cccf805090f8516f10c2b1ec1fb7f4",
    "pid": "",
    "sort": 6,
    "path": "/templateManage",
    "name": "templateManage",
    "redirect": "/templateManage/emailTemplate",
    "component": "Layout",
    "meta": {
      "title": "模板管理",
      "icon": "template",
      "alwaysShow": true,
      "hidden": false,
      "noCache": true,
      "activeMenu": ""
    },
    "children": [
      {
        "id": "b5f8bdfe8a7fd88b1049b4c475edda13",
        "pid": "a9cccf805090f8516f10c2b1ec1fb7f4",
        "sort": 0,
        "path": "emailTemplate",
        "name": "emailTemplate",
        "redirect": "",
        "component": "templateManage/emailTemplate",
        "meta": {
          "title": "邮箱模板",
          "icon": "mail",
          "alwaysShow": false,
          "hidden": false,
          "noCache": false,
          "activeMenu": ""
        }
      },
      {
        "id": "695c045a897fd58d236896359001890b",
        "pid": "a9cccf805090f8516f10c2b1ec1fb7f4",
        "sort": 1,
        "path": "emailTemplateCreate",
        "name": "emailTemplateCreate",
        "redirect": "",
        "component": "templateManage/emailTemplateCreate",
        "meta": {
          "title": "添加邮箱模板",
          "icon": "",
          "alwaysShow": false,
          "hidden": true,
          "noCache": false,
          "activeMenu": "/templateManage/emailTemplate"
        }
      },
      {
        "id": "1641042f0a0f42dcf7755c311bc247fc",
        "pid": "a9cccf805090f8516f10c2b1ec1fb7f4",
        "sort": 2,
        "path": "emailTemplateUpdate",
        "name": "emailTemplateUpdate",
        "redirect": "",
        "component": "templateManage/emailTemplateUpdate",
        "meta": {
          "title": "修改邮箱模板",
          "icon": "",
          "alwaysShow": false,
          "hidden": true,
          "noCache": true,
          "activeMenu": "/templateManage/emailTemplate"
        }
      }
    ]
  },
  {
    "id": "681b8981cbbe210f5e986cd5b418e022",
    "pid": "",
    "sort": 8,
    "path": "/websitManage",
    "name": "websitManage",
    "redirect": "/websitManage/websiteConfig",
    "component": "Layout",
    "meta": {
      "title": "网站管理",
      "icon": "websitmanage",
      "alwaysShow": true,
      "hidden": false,
      "noCache": false,
      "activeMenu": ""
    },
    "children": [
      {
        "id": "84f702ccf7be8f54261f1096d3a558b9",
        "pid": "681b8981cbbe210f5e986cd5b418e022",
        "sort": 0,
        "path": "websiteConfig",
        "name": "websitConfig",
        "redirect": null,
        "component": "websitManage/websiteConfig",
        "meta": {
          "title": "网站配置",
          "icon": "websitconfig",
          "alwaysShow": false,
          "hidden": false,
          "noCache": true,
          "activeMenu": ""
        }
      },
      {
        "id": "f6e87e443b0b10cd4fa8601470fc8e08",
        "pid": "681b8981cbbe210f5e986cd5b418e022",
        "sort": 1,
        "path": "operationLog",
        "name": "operationLog",
        "redirect": null,
        "component": "websitManage/operationLog",
        "meta": {
          "title": "操作日志",
          "icon": "operationlog",
          "alwaysShow": false,
          "hidden": false,
          "noCache": true,
          "activeMenu": ""
        }
      }
    ]
  }
]

export default [
  {
    url: api + "/user/login",
    method: "post",
    timeout: 1000,
    response: (body: any) => {
      const data = body.body as LoginFormData
      if (data.captcha !== "aaaa") {
        return {
          code: 500,
          message: "验证码错误"
        }
      }
      const userItem: LoginUserBaseInfoData | undefined = List.find(item => (item.loginName === data.username && item.password === data.password))
      if (userItem) {
        return {
          code: 200,
          data: {
            token: userItem.loginName
          }
        }
      } else {
        return {
          code: 500,
          message: "账号或者密码错误"
        }
      }
    }
  },
  {
    url: api + "/user/getUserInfoByLogin",
    method: "get",
    timeout: 1000,
    response: (body: any) => {
      const headers = body.headers
      const authorization = headers?.authorization || ""
      const token = authorization.replace("Bearer ", "")
      const userItem: LoginUserBaseInfoData | undefined = List.find(item => token === item.loginName)
      if (userItem) {
        return {
          code: 200,
          data: userItem
        }
      } else {
        return {
          code: 401,
          message: "登录信息过期"
        }
      }
    }
  },
  {
    url: api + "/relation/getMenuListByLogin",
    method: "get",
    timeout: 1000,
    response: (body: any) => {
      const headers = body.headers
      const authorization = headers?.authorization || ""
      const token = authorization.replace("Bearer ", "")
      if (token) {
        return {
          code: 200,
          data: MenuList
        }
      } else {
        return {
          code: 401,
          message: "登录信息过期"
        }
      }
    }
  },
  {
    url: api + "/captcha/getCaptchaByLogin",
    method: "get",
    timeout: 1000,
    response: () => {
      return {
        code: 200,
        image: Random.image("80x31", "#ffcc33", "#FFF", "png", "aaaa")
      }
    }
  }
] as MockMethod[]
