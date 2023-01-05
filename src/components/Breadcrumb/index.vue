<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcurmbs" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index === breadcurmbs.length - 1" class="no-redirect">{{  item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { useRoute, useRouter, RouteLocationMatched } from "vue-router"
import { compile } from "path-to-regexp"
import { onBeforeMount, ref, watch } from "vue"

const router = useRouter()
const currentRoute = useRoute()
const pathCompile = (path: string) => {
  const { params } = currentRoute
  const toPath = compile(path)
  return toPath(params)
}
const breadcurmbs = ref([] as Array<RouteLocationMatched>)
function getBreadcurmb() {
  let matched = currentRoute.matched.filter(item => item.meta && item.meta.title)
  const first = matched[0]
  if (!isDashboard(first)) {
    matched = [{ path: "/home", meta: { title: "主页" } } as any].concat(matched)
  }
  breadcurmbs.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}

function isDashboard(route: RouteLocationMatched) {
  const name = route && route.name
  if (!name) {
    return false
  }
  return (name.toString().trim().toLocaleLowerCase() === "Home".toLocaleLowerCase())
}
function handleLink(item: any) {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}
watch(() => currentRoute.path, path => {
  if (path.startsWith("/redirect/")) {
    return
  }
  getBreadcurmb()
})
onBeforeMount(() => {
  getBreadcurmb()
})
</script>

<style lang='scss' scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
