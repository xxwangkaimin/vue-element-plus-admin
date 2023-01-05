import router from "@/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import useStore from "@/store"
import { ElMessage } from "element-plus"
import { isRelogin } from "@/utils/request"
import { RouteRecordRaw } from "vue-router"
import { isHttp } from "@/utils/validate"

const whiteList: string[] = ["/login"]

router.beforeEach((to, from, next) => {
  NProgress.start()
  const { user, permission, settings } = useStore()
  if (user.token) {
    if (to.meta.title) {
      settings.setTitle(to.meta.title as string)
    }
    if (to.path === "/login") {
      next({ path: "/" })
      NProgress.done()
    } else {
      if (!user.roleId) {
        isRelogin.show = true
        user.getUserInfo().then(() => {
          isRelogin.show = false
          permission.generateRoutes().then((accessRoutes: RouteRecordRaw[]) => {
            accessRoutes.forEach((route) => {
              if (!isHttp(route.path)) {
                router.addRoute(route)
              }
            })
            router.addRoute({
              path: "/:pathMatch(.*)*",
              redirect: "/404",
              meta: { hidden: true }
            })
            next({ ...to, replace: true })
            // return to.fullPath
          })
        }).catch((err: any) => {
          isRelogin.show = false
          user.logout().then(() => {
            ElMessage.error(err)
            next({ path: "/" })
          })
        })
      } else {
        // next()
        if (to.matched.length === 0) {
          next("/401")
        } else {
          next()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next("/login")
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
