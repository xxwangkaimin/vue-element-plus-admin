import { defineStore } from "pinia"
import { SettingsState, StorageSettingsState } from "@/store/types/settings.d"
import { localStorage } from "@/utils/storage"
import defaultSettings from "@/settings"
import { useDynamicTitle } from "@/utils/dynamicTitle"
const storageSettings: StorageSettingsState = localStorage.get("layout-setting") || {}
const { sideTheme, showSettings, topNav, tagsView, fixedHeader, sidebarLogo, dynamicTitle } = defaultSettings
const useSettingsStore = defineStore({
  id: "settings",
  state: (): SettingsState => ({
    title: "",
    theme: storageSettings.theme || "#409eff",
    sideTheme: storageSettings.sideTheme || sideTheme,
    showSettings: showSettings,
    topNav: typeof storageSettings.topNav === "boolean" ? storageSettings.topNav : topNav,
    tagsView: typeof storageSettings.tagsView === "boolean" ? storageSettings.tagsView : tagsView,
    fixedHeader: typeof storageSettings.fixedHeader === "boolean" ? storageSettings.fixedHeader : fixedHeader,
    sidebarLogo: typeof storageSettings.sidebarLogo === "boolean" ? storageSettings.sidebarLogo : sidebarLogo,
    dynamicTitle: typeof storageSettings.dynamicTitle === "boolean" ? storageSettings.dynamicTitle : dynamicTitle
  }),
  actions: {
    changeSetting(data: { key: string, value: any }) {
      const { key, value } = data
      if (key === "theme") {
        this.theme = value
      } else if (key === "sideTheme") {
        this.sideTheme = value
      } else if (key === "showSettings") {
        this.showSettings = value
      } else if (key === "topNav") {
        this.topNav = value
      } else if (key === "tagsView") {
        this.tagsView = value
      } else if (key === "fixedHeader") {
        this.fixedHeader = value
      } else if (key === "sidebarLogo") {
        this.sidebarLogo = value
      } else if (key === "dynamicTitle") {
        this.dynamicTitle = value
      }
    },
    setTitle(title: string) {
      this.title = title
      useDynamicTitle()
    }
  }
})

export default useSettingsStore
