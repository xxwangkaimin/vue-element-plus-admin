<template>
  <div class="header-search" :class="{'show': show}">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />
    <el-select
      ref="headerSearchSelectRef"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="option in options" :key="option.item.path" :value="option.item.path" :label="option.item.title.join('>')" />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import Fuse from "fuse.js"
import { getNormalPath } from "@/utils/run-it"
import { isHttp } from "@/utils/validate"
import useStore from "@/store"
import { computed, nextTick, onMounted, ref, watch, watchEffect } from "vue"
import { useRouter } from "vue-router"
import { ElSelect } from "element-plus"

const { permission } = useStore()
const search = ref<string>("")
const options = ref<any[]>([])
const searchPool = ref<any[]>([])
const show = ref<boolean>(false)
const fuse = ref<InstanceType<typeof Fuse> | null>(null)
const headerSearchSelectRef = ref<InstanceType<typeof ElSelect> | null>(null)
const router = useRouter()
const routes = computed(() => permission.routes)

function click() {
  show.value = !show.value
  if (show.value) {
    headerSearchSelectRef.value && headerSearchSelectRef.value.focus()
  }
}

function close() {
  headerSearchSelectRef.value && headerSearchSelectRef.value.blur()
  options.value = []
  show.value = false
}

function initFuse(list: any[]) {
  fuse.value = new Fuse(list, {
    shouldSort: true,
    threshold: 0.4,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    keys: [
      { name: "title", weight: 0.7 },
      { name: "path", weight: 0.3 }
    ]
  })
}

function querySearch(query: string) {
  if (query !== "" && fuse.value) {
    options.value = fuse.value.search(query)
    console.log(options.value)
  } else {
    options.value = []
  }
}

function change(path: string) {
  // const path = val.path
  if (isHttp(path)) {
    const pindex = path.indexOf("http")
    window.open(path.substr(pindex, path.length), "_blank")
  } else {
    router.push(path)
  }
  search.value = ""
  options.value = []
  nextTick(() => {
    show.value = false
  })
}

function genarateRoutes(routes: any[], basePath: string = "", prefixTitle: string[] = []): any[] {
  let res: any[] = []
  for (const r of routes) {
    if (r.meta.hidden) {
      continue
    }
    const p = r.path.length > 0 && r.path[0] === "/" ? r.path : "/" + r.path
    const data = {
      path: !isHttp(r.path) ? getNormalPath(basePath + p) : r.path,
      title: [...prefixTitle]
    }
    if (r.meta && r.meta.title) {
      data.title = [...data.title, r.meta.title]
    }
    if (r.redirect !== "noRedirect") {
      res.push(data)
    }
    if (r.children) {
      const tempRoutes = genarateRoutes(r.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        res = [...res, ...tempRoutes]
      }
    }
  }
  return res
}

onMounted(() => {
  searchPool.value = genarateRoutes(routes.value)
  // console.log(searchPool.value)
})

watchEffect(() => {
  searchPool.value = genarateRoutes(routes.value)
})

watch(searchPool, (list: any[]) => {
  initFuse(list)
})

watch(show, value => {
  if (value) {
    document.body.addEventListener("click", close)
  } else {
    document.body.removeEventListener("click", close)
  }
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    :deep(.el-input__wrapper) {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
