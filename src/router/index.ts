import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

export const Layout = () => import("@/layout/index.vue")

// 固定路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/401",
    component: () => import("@/views/error/401.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/error/404.vue'),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    meta: {
      alwaysShow: false
    },
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "主页",
          icon: "home",
          affix: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
