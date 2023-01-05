import { defineStore } from "pinia"
import { AppState } from "@/store/types/app.d"
import { localStorage } from "@/utils/storage"

const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({
    device: "desktop",
    sidebar: {
      opened: localStorage.get("sidebarStatus") ? !!+localStorage.get("sidebarStatus") : true,
      withoutAnimation: false,
      hide: false
    }
  }),
  actions: {
    toggleSidebar(withoutAnimation: boolean) {
      if (this.sidebar.hide) {
        return false
      }
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = withoutAnimation
      if (this.sidebar.opened) {
        localStorage.set("sidebarStatus", 1)
      } else {
        localStorage.set("sidebarStatus", 0)
      }
    },
    closeSidebar(withoutAnimation: boolean) {
      localStorage.set("sidebarStatus", 0)
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    openSidebar(withoutAnimation: boolean) {
      localStorage.set("sidebarStatus", 1)
      this.sidebar.opened = true
      this.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleSidebarHide(status: boolean) {
      this.sidebar.hide = status
    }
  }
})
export default useAppStore
