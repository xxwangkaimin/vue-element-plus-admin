<template>
  <div ref="tagsViewContainerRef" id="tags-view-container" class="tags-view-container">
    <scroll-pane ref="scrollPaneRef" class="tags-view-wrapper" @scroll="handleScroll">
      <!-- slot模式 -->
      <router-link
        v-for="tag in visitedViews"
        :key="tag.fullPath"
        :to="{path: tag.path, query: tag.query, fullPath: tag.fullPath}"
        custom
        v-slot="{ navigate }"
      >
        <span
          :key="tag.fullPath"
          :data-path="tag.fullPath"
          :class="isActive(tag) ? 'active' : ''"
          class="tags-view-item"
          :style="activeStyle(tag)"
          role="link"
          @click="navigate"
          @click.middle="isAffix(tag)?'':closeSelectedTag(tag)"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          {{ tag.title }}
          <span v-if="!isAffix(tag)" class="el-icon icon-close" @click.prevent.stop="closeSelectedTag(tag)">
            <IEpClose style="width: 1em; height: 1em;vertical-align: -2px" />
          </span>
        </span>
      </router-link>
      <!--默认模式-->
      <!--<router-link-->
      <!--  v-for="tag in visitedViews"-->
      <!--  :key="tag.fullPath"-->
      <!--  :data-path="tag.fullPath"-->
      <!--  :class="isActive(tag) ? 'active' : ''"-->
      <!--  :style="activeStyle(tag)"-->
      <!--  :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"-->
      <!--  class="tags-view-item"-->
      <!--  @click.middle="!isAffix(tag) ? closeSelectedTag(tag) : ''"-->
      <!--  @contextmenu.prevent="openMenu(tag, $event)"-->
      <!--&gt;-->
      <!--  {{ tag.title }}-->
      <!--  <span v-if="!isAffix(tag)" class="el-icon icon-close" @click.prevent.stop="closeSelectedTag(tag)">-->
      <!--    <IEpClose style="width: 1em; height: 1em;vertical-align: -2px" />-->
      <!--  </span>-->
      <!--</router-link>-->
    </scroll-pane>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        <el-icon>
          <IEpRefreshRight style="width: 1em; height: 1em;" />
        </el-icon>
        刷新页面
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <el-icon>
          <IEpClose style="width: 1em; height: 1em;" />
        </el-icon>
        关闭当前
      </li>
      <!--<li @click="closeOthersTags">-->
      <!--  <circle-close style="width: 1em; height: 1em;" /> 关闭其他-->
      <!--</li>-->
      <!--<li v-if="!isFirstView()" @click="closeLeftTags">-->
      <!--  <back style="width: 1em; height: 1em;" /> 关闭左侧-->
      <!--</li>-->
      <!--<li v-if="!isLastView()" @click="closeRightTags">-->
      <!--  <right style="width: 1em; height: 1em;" /> 关闭右侧-->
      <!--</li>-->
      <!--<li @click="closeAllTags(selectedTag)">-->
      <!--  <circle-close style="width: 1em; height: 1em;" /> 全部关闭-->
      <!--</li>-->
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ScrollPane from "@/layout/components/TagsView/ScrollPane.vue"
import { computed, nextTick, onMounted, ref, watch } from "vue"
import { CurrentTagsViewState, TagViewItem } from "@/store/types/tagsView"
import useStore from "@/store"
import type { RouteMeta } from "vue-router"
import { RouteRecordRaw, useRoute, useRouter } from "vue-router"
import { getNormalPath } from "@/utils/run-it"
import { closePage, refreshPage } from "@/plugins/tab"

const visible = ref<boolean>(false)
const top = ref<number>(0)
const left = ref<number>(0)
const selectedTag = ref<TagViewItem>()
const affixTags = ref<TagViewItem[]>([])
const tagsViewContainerRef = ref<InstanceType<typeof HTMLElement> | null>(null)
const scrollPaneRef = ref<InstanceType<typeof ScrollPane> | null>(null)
const { tagsView, permission, settings } = useStore()
const visitedViews = computed<TagViewItem[]>(() => tagsView.visitedViews)
const routes = computed<RouteRecordRaw[]>(() => permission.routes)
const theme = computed(() => settings.theme)
const route = useRoute()
const router = useRouter()

function addTags() {
  const { name } = route
  if (name) {
    tagsView.addView(route as TagViewItem)
    if (route.meta.link) {
      tagsView.addIframeView(route as TagViewItem)
    }
  }
  return false
}

function moveToCurrentTag() {
  nextTick(() => {
    for (const r of visitedViews.value) {
      if (r.path === route.path) {
        if (scrollPaneRef.value) {
          scrollPaneRef.value.moveToTarget(r)
        }
        if (r.fullPath !== route.fullPath) {
          tagsView.updateVisitedView(route as TagViewItem)
        }
      }
    }
  })
}

function closeSelectedTag(view: TagViewItem) {
  closePage(view).then((res) => {
    if (isActive(view)) {
      const visitedViews = (res as CurrentTagsViewState).visitedViews
      toLastView(visitedViews, view)
    }
  })
}

watch(route, () => {
  addTags()
  moveToCurrentTag()
})

watch(visible, value => {
  if (value) {
    document.body.addEventListener("click", closeMenu)
  } else {
    document.body.removeEventListener("click", closeMenu)
  }
})

onMounted(() => {
  initTags()
  addTags()
})

function isActive(tag: TagViewItem) {
  return tag.fullPath === route.fullPath
}

function activeStyle(tag: TagViewItem) {
  if (!isActive(tag)) {
    return {}
  }
  return {
    "background-color": theme.value,
    "border-color": theme.value
  }
}

function isAffix(tag: TagViewItem) {
  return !!(tag?.meta && tag?.meta?.affix)
}

function initTags() {
  affixTags.value = filterAffixTags(routes.value)
  for (const tag of affixTags.value) {
    if (tag.name) {
      tagsView.addVisitedView(tag)
    }
  }
}

function filterAffixTags(routes: RouteRecordRaw[], basePath: string = ""): TagViewItem[] {
  let tags: TagViewItem[] = []
  routes.forEach(route => {
    const meta = route.meta as RouteMeta
    if (meta?.affix) {
      const tagPath = getNormalPath(basePath + "/" + route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      } as TagViewItem)
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

function refreshSelectedTag(view: TagViewItem) {
  refreshPage(view)
  if (route.meta.link) {
    tagsView.delIframeView(route as TagViewItem)
  }
}

function toLastView(visitedViews: TagViewItem[], view: TagViewItem) {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath as string)
  } else {
    // now the default is to redirect to the home page if there is no tags-view,
    // you can adjust it according to your needs.
    if (view.name === "Home") {
      // to reload home page
      router.replace({ path: "/redirect" + view.fullPath })
    } else {
      router.push("/")
    }
  }
}

function openMenu(tag: TagViewItem, e: MouseEvent) {
  const menuMinWidth: number = 105
  const offsetLeft: number | undefined = tagsViewContainerRef.value?.getBoundingClientRect().left
  const offsetWidth: number | undefined = tagsViewContainerRef.value?.offsetWidth
  if (offsetLeft && offsetWidth) {
    const maxLeft = offsetWidth - menuMinWidth
    const l = e.clientX - offsetLeft + 15
    if (l > maxLeft) {
      left.value = maxLeft
    } else {
      left.value = l
    }
    top.value = e.clientY
    visible.value = true
    selectedTag.value = tag
  }
}

function closeMenu() {
  visible.value = false
}

function handleScroll() {
  closeMenu()
}
</script>

<style lang='scss' scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #42b983;
        color: #fff;
        border-color: #42b983;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
.tags-view-wrapper {
  .tags-view-item {
    .icon-close {
      width: 16px;
      height: 16px;
      vertical-align: -2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
