import useUserStore from "@/store/modules/user"
import useSettingsStore from "@/store/modules/settings"
import useAppStore from "@/store/modules/app"
import usePermissionStore from "@/store/modules/permission"
import useTagsViewStore from "@/store/modules/tagsView"

const useStore = () => ({
  user: useUserStore(),
  settings: useSettingsStore(),
  app: useAppStore(),
  permission: usePermissionStore(),
  tagsView: useTagsViewStore()
})

export default useStore
