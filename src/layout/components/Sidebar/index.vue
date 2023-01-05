<template>
  <div
    :class="{'has-logo': showLogo}"
    :style="{backgroundColor: sideTheme === 'theme-dark' ? variables.menuBackground: variables.menuLightBackground}"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="sideTheme === 'theme-dark' ? variables.menuBackground : variables.menuLightBackground"
        :text-color="sideTheme === 'theme-dark' ? variables.menuColor: variables.menuLightColor"
        :active-text-color="theme"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in sidebarRouters"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import variables from "@/assets/styles/variables.module.scss"
import useStore from "@/store"
import { computed } from "vue"
import Logo from "./Logo.vue"
import { useRoute } from "vue-router"
import SidebarItem from "@/layout/components/Sidebar/SidebarItem.vue"

const { app, settings, permission } = useStore()
const showLogo = computed(() => settings.sidebarLogo)
const theme = computed(() => settings.theme)
const sideTheme = computed(() => settings.sideTheme)
const isCollapse = computed(() => !app.sidebar.opened)
const route = useRoute()
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return meta.activeMenu as string
  }
  return path
})
const sidebarRouters = computed(() => permission.sidebarRouters)
</script>

<style scoped>

</style>
