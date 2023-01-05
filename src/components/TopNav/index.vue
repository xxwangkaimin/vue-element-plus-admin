<template>
  <el-menu :default-active="activeMenu" mode="horizontal" @select="handleSelect">
    <template v-for="(item, index) in topMenus">
      <el-menu-item :style="{'--theme': theme}" :index="item.path" :key="index" v-if="index < visibleNumber">
        <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
        {{ item.meta.title }}
      </el-menu-item>
    </template>
    <el-sub-menu :style="{'--theme': theme}" index="more" v-if="topMenus.length > visibleNumber">
      <template #title>更多菜单</template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item v-if="index >= visibleNumber" :index="item.path" :key="index">
          <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
          {{ item.meta.title }}
        </el-menu-item>
      </template>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { constantRoutes } from "@/router"
import { isHttp } from "@/utils/validate"
import useStore from "@/store"
import { computed, onBeforeUnmount, onMounted, ref } from "vue"
import { useRoute, useRouter } from "vue-router"

const { app, settings, permission } = useStore()
const visibleNumber = ref<number | null>(null)
const currentIndex = ref<number | null>(null)
const hideList: string[] = ["/home", "/user/profile"]
const route: any = useRoute()
const router = useRouter()
const theme = computed(() => settings.theme)
const routers = computed(() => permission.topbarRouters)
const topMenus = computed(() => {
  let topMenus: any[] = []
  routers.value.map((menu) => {
    if (menu.meta?.hidden !== true) {
      if (menu.path === "/") {
        if (menu.children) {
          topMenus.push(menu.children[0])
        }
      } else {
        topMenus.push(menu)
      }
    }
  })
  return topMenus
})
const childrenMenus = computed(() => {
  let childrenMenus: any[] = []
  routers.value.map((router: any) => {
    for (let item in router.children) {
      if (router.children[item].parentPath === undefined) {
        if(router.path === "/") {
          router.children[item].path = "/" + router.children[item].path;
        } else {
          if(!isHttp(router.children[item].path)) {
            router.children[item].path = router.path + "/" + router.children[item].path;
          }
        }
        router.children[item].parentPath = router.path;
      }
      childrenMenus.push(router.children[item]);
    }
  })
  return constantRoutes.concat(childrenMenus)
})
const activeMenu = computed(() => {
  const path = route.path
  let activePath = path
  if (path !== undefined && path.lastIndexOf("/") > 0 && hideList.indexOf(path) === -1) {
    const tmpPath = path.substring(1, path.length)
    activePath = "/" + tmpPath.substring(0, tmpPath.indexOf("/"))
    app.toggleSidebarHide(false)
  } else if (!route.children) {
    activePath = path
    app.toggleSidebarHide(true)
  }
  activeRoutes(activePath)
  return activePath
})

function setVisibleNumber() {
  const width = document.body.getBoundingClientRect().width / 3
  visibleNumber.value = parseInt(String(width / 85))
}
function handleSelect(key: any) {
  currentIndex.value = key
  const route = routers.value.find(item => item.path === key)
  if (isHttp(key)) {
    // http(s):// 路径新窗口打开
    window.open(key, "_blank")
  } else if (!route || !route.children) {
    // 没有子路由路径内部打开
    router.push({ path: key })
    app.toggleSidebarHide(true)
  } else {
    // 显示左侧联动菜单
    activeRoutes(key)
    app.toggleSidebarHide(false)
  }
}

function activeRoutes(key: any): any[] {
  let routes: any[] = []
  if (childrenMenus.value && childrenMenus.value.length > 0) {
    childrenMenus.value.map((item: any) => {
      if (key == item.parentPath || (key === "home" && "" === item.path)) {
        routes.push(item)
      }
    })
  }
  if (routes.length > 0) {
    permission.setSidebarRouters(routes)
  }
  return routes
}

onMounted(() => {
  window.addEventListener("resize", setVisibleNumber)
  setVisibleNumber()
})
onBeforeUnmount(() => {
  window.removeEventListener("resize", setVisibleNumber)
})

// onMounted(() => {
//   setVisibleNumber()
// })
</script>

<style lang="scss">
.topmenu-container.el-menu--horizontal > .el-menu-item {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}

.topmenu-container.el-menu--horizontal > .el-menu-item.is-active, .el-menu--horizontal > .el-sub-menu.is-active .el-submenu__title {
  border-bottom: 2px solid #{'var(--theme)'} !important;
  color: #303133;
}

/* sub-menu item */
.topmenu-container.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  float: left;
  height: 50px !important;
  line-height: 50px !important;
  color: #999093 !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
</style>
