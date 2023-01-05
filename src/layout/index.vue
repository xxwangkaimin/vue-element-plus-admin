<template>
  <div :class="classObj" class="app-wrapper" :style="{'--current-color': theme}">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="!sidebar.hide" class="sidebar-container" />
    <div :class="{hasTagsView: needTagsView, sidebarHide: sidebar.hide}" class="main-container">
      <div :class="{'fixed-header': fixedHeader}">
        <navbar @setLayout="setLayout" />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <layout-settings ref="layoutSettingsRef" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from "./components/Sidebar/index.vue"
import AppMain from "./components/AppMain.vue"
import Navbar from "@/layout/components/Navbar.vue"
import TagsView from "./components/TagsView/index.vue"
import LayoutSettings from "@/layout/components/LayoutSettings/index.vue"
import { useWindowSize } from "@vueuse/core"
import { computed, ref, watchEffect } from "vue"
import useStore from "@/store"

const {app, settings} = useStore()
const sidebar = computed(() => app.sidebar)
const device = computed(() => app.device)
const theme = computed(() => settings.theme)
const fixedHeader = computed(() => settings.fixedHeader)
const needTagsView = computed(() => settings.tagsView)
const classObj = computed(() => ({
  hideSidebar: !sidebar.value.opened,
  openSidebar: sidebar.value.opened,
  withoutAnimation: sidebar.value.withoutAnimation,
  mobile: device.value === "mobile"
}))
const layoutSettingsRef = ref<InstanceType<typeof LayoutSettings> | null>(null)

function setLayout() {
  if (layoutSettingsRef.value) {
    layoutSettingsRef.value.openSetting()
  }
}

function handleClickOutside() {
  app.closeSidebar(false)
}
const { width } = useWindowSize()
const WIDTH = 992
watchEffect(() => {
  // if (device.value === "mobile" && sidebar.value.opened) {
  //   app.closeSidebar(true)
  // }
  if (width.value < WIDTH) {
    app.toggleDevice("mobile")
    app.closeSidebar(true)
  } else {
    app.toggleDevice("desktop")

    if (width.value >= 1200) {
      app.openSidebar(true)
    } else {
      app.closeSidebar(true)
    }
  }
})
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  width: 100%;
  height: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$base-sidebar-width});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.sidebarHide .fixed-header {
  width: 100%;
}

.mobile .fixed-header {
  width: 100%;
}
</style>
