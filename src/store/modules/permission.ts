import { defineStore } from "pinia"
import { PermissionState } from "@/store/types/permission.d"
import { RouteRecordRaw } from "vue-router"
import { constantRoutes, Layout } from "@/router"
import { getMenuListByLogin } from "@/api/relation"
import ParentView from "@/components/ParentView/index.vue"
import InnerLink from "@/layout/components/InnerLink/index.vue"

const modules = import.meta.glob("../../views/**/**.vue")

const usePermissionStore = defineStore({
  id: "permission",
  state: (): PermissionState => ({
    routes: [],
    addRoutes: [],
    defaultRoutes: [],
    topbarRouters: [],
    sidebarRouters: []
  }),
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },
    setDefaultRoutes(routes: RouteRecordRaw[]) {
      this.defaultRoutes = constantRoutes.concat(routes)
    },
    setTopbarRoutes(routes: RouteRecordRaw[]) {
      this.topbarRouters = routes
    },
    setSidebarRouters(routes: RouteRecordRaw[]) {
      this.sidebarRouters = routes
    },
    generateRoutes(): Promise<RouteRecordRaw[]> {
      return new Promise(resolve => {
        getMenuListByLogin().then(res => {
          const sdata = JSON.parse(JSON.stringify(res.data))
          const rdata = JSON.parse(JSON.stringify(res.data))
          const defaultData = JSON.parse(JSON.stringify(res.data))
          const sidebarRouters = filterAsyncRouter(sdata)
          const rewriteRoutes = filterAsyncRouter(rdata, false, true)
          const defaultRoutes = filterAsyncRouter(defaultData)
          this.setRoutes(rewriteRoutes)
          this.setSidebarRouters(constantRoutes.concat(sidebarRouters))
          this.setDefaultRoutes(sidebarRouters)
          this.setTopbarRoutes(defaultRoutes)
          resolve(rewriteRoutes)
        })
      })
    }
  }
})

function filterChildren(childrenMap: any, lastRouter?: any) {
  if (!lastRouter) {
    lastRouter = false
  }
  let children: any[] = []
  childrenMap.forEach((el: any) => {
    if (el.children && el.children.length) {
      if (el.component === "ParentView" && !lastRouter) {
        el.children.forEach((c: any) => {
          c.path = el.path + "/" + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + "/" + el.path
    }
    children = children.concat(el)
  })
  return children
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: any[], lastRouter?: any, type?: any) {
  if (!lastRouter) {
    lastRouter = false
  }
  if (!type) {
    type = false
  }
  return asyncRouterMap.filter(route => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    route.redirect = route.redirect || "noRedirect"
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout
      } else if (route.component === "ParentView") {
        route.component = ParentView
      } else if (route.component === "InnerLink") {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route["children"]
      delete route["redirect"]
    }
    return true
  })
}

export const loadView = (view: string) => {
  let res
  for (const path in modules) {
    const dir = path.split("views/")[1].split(".vue")[0]
    if (dir === view) {
      res = () => modules[path]()
    }
  }
  return res
}

export default usePermissionStore
