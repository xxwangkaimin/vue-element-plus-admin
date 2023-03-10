<template>
  <el-drawer v-model="showSettings" :with-header="false" direction="rtl" size="300px">
    <div class="setting-drawer-title">
      <h3 class="drawer-title">主题风格设置</h3>
    </div>
    <div class="setting-drawer-block checbox">
      <div class="setting-drawer-block-checbox">
        <div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-dark')">
          <img src="@/assets/images/dark.svg" alt="dark" />
          <div v-if="sideTheme === 'theme-dark'" class="setting-drawer-block-checbox-selectIcon" style="display: block;">
            <i aria-label="图标: check" class="anticon anticon-check">
              <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="theme" aria-hidden="true" focusable="false" class>
                <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
              </svg>
            </i>
          </div>
        </div>
        <div class="setting-drawer-block-checbox-item" @click="handleTheme('theme-light')">
          <img src="@/assets/images/light.svg" alt="light" />
          <div v-if="sideTheme === 'theme-light'" class="setting-drawer-block-checbox-selectIcon" style="display: block;">
            <i aria-label="图标: check" class="anticon anticon-check">
              <svg viewBox="64 64 896 896" data-icon="check" width="1em" height="1em" :fill="theme" aria-hidden="true" focusable="false" class>
                <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
              </svg>
            </i>
          </div>
        </div>
      </div>
    </div>
    <div class="drawer-item">
      <span>主题颜色</span>
      <span class="comp-style">
        <el-color-picker v-model="theme" :predefine="predefineColors" @change="themeChange" />
      </span>
    </div>
    <el-divider />
    <h3 class="drawer-title">系统布局配置</h3>
    <div class="drawer-item">
      <span>开启 TopNav</span>
      <span class="comp-style">
        <el-switch v-model="topNav" class="drawer-switch" />
      </span>
    </div>
    <div class="drawer-item">
      <span>开启 Tags-Views</span>
      <span class="comp-style">
        <el-switch v-model="tagsView" class="drawer-switch" />
      </span>
    </div>
    <div class="drawer-item">
      <span>固定 Header</span>
      <span class="comp-style">
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </span>
    </div>
    <div class="drawer-item">
      <span>显示 Logo</span>
      <span class="comp-style">
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </span>
    </div>
    <div class="drawer-item">
      <span>动态标题</span>
      <span class="comp-style">
        <el-switch v-model="dynamicTitle" class="drawer-switch" />
      </span>
    </div>
    <el-divider />
    <el-button type="primary" plain @click="saveSetting"><el-icon class="el-icon--left"><IEpDocumentAdd /></el-icon>保存配置</el-button>
    <el-button plain @click="resetSetting"><el-icon class="el-icon--left"><IEpRefresh /></el-icon>重置配置</el-button>
  </el-drawer>
</template>

<script lang="ts" setup>
import useStore from "@/store"
import { computed, ref } from "vue"
import { useDynamicTitle } from "@/utils/dynamicTitle"
import { handleThemeStyle } from "@/utils/theme"
import { ElLoading } from "element-plus"
import { StorageSettingsState } from "@/store/types/settings"
import { localStorage } from "@/utils/storage"

const showSettings = ref<boolean>(false)
const { app, settings, permission } = useStore()
const theme = ref<string>(settings.theme)
const sideTheme = ref<string>(settings.sideTheme)
const predefineColors = ref<string[]>(["#409EFF", "#ff4500", "#ff8c00", "#ffd700", "#90ee90", "#00ced1", "#1e90ff", "#c71585"])
const topNav = computed({
  get: () => settings.topNav,
  set: (val) => {
    settings.changeSetting({ key: "topNav", value: val })
    if (!val) {
      app.toggleSidebarHide(false)
      permission.setSidebarRouters(permission.defaultRoutes)
    }
  }
})
const tagsView = computed({
  get: () => settings.tagsView,
  set: (val) => {
    settings.changeSetting({ key: "tagsView", value: val })
  }
})
const fixedHeader = computed({
  get: () => settings.fixedHeader,
  set: (val) => {
    settings.changeSetting({ key: "fixedHeader", value: val })
  }
})
const sidebarLogo = computed({
  get: () => settings.sidebarLogo,
  set: (val) => {
    settings.changeSetting({ key: "sidebarLogo", value: val })
  }
})
const dynamicTitle = computed({
  get: () => settings.dynamicTitle,
  set: (val) => {
    settings.changeSetting({ key: "dynamicTitle", value: val })
    useDynamicTitle()
  }
})

function themeChange(val: string) {
  settings.changeSetting({ key: "theme", value: val })
  handleThemeStyle(val)
}

function handleTheme(val: string) {
  settings.changeSetting({ key: "sideTheme", value: val })
  sideTheme.value = val
}
function saveSetting() {
  const saveLoading = ElLoading.service({
    lock: true,
    text: "正在保存到本地，请稍后...",
    background: "rgba(0, 0, 0, 0.7)"
  })
  const layoutSetting: StorageSettingsState = {
    topNav: settings.topNav,
    tagsView: settings.tagsView,
    fixedHeader: settings.fixedHeader,
    sidebarLogo: settings.sidebarLogo,
    dynamicTitle: settings.dynamicTitle,
    sideTheme: settings.sideTheme,
    theme: settings.theme
  }
  localStorage.set("layout-setting", layoutSetting)
  setTimeout(() => {
    saveLoading.close()
  }, 1000)
}
function resetSetting() {
  const resetLoading = ElLoading.service({
    lock: true,
    text: "正在清除设置缓存并刷新，请稍后...",
    background: "rgba(0, 0, 0, 0.7)"
  })
  localStorage.remove("layout-setting")
  setTimeout(() => {
    location.reload()
  }, 1000)
}
function openSetting() {
  showSettings.value = true
}
defineExpose({
  openSetting
})
</script>

<style lang='scss' scoped>
.setting-drawer-title {
  margin-bottom: 12px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  font-weight: bold;

  .drawer-title {
    font-size: 14px;
  }
}

.setting-drawer-block-checbox {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;

  .setting-drawer-block-checbox-item {
    position: relative;
    margin-right: 16px;
    border-radius: 2px;
    cursor: pointer;

    img {
      width: 48px;
      height: 48px;
    }

    .custom-img {
      width: 48px;
      height: 38px;
      border-radius: 5px;
      box-shadow: 1px 1px 2px #898484;
    }

    .setting-drawer-block-checbox-selectIcon {
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      padding-top: 15px;
      padding-left: 24px;
      color: #1890ff;
      font-weight: 700;
      font-size: 14px;
    }
  }
}

.drawer-item {
  color: rgba(0, 0, 0, 0.65);
  padding: 12px 0;
  font-size: 14px;

  .comp-style {
    float: right;
    margin: -3px 8px 0px 0px;
  }
}
</style>
