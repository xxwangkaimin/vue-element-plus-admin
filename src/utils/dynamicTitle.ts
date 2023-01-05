import defaultSettings from "@/settings"
import useStore from "@/store"

export function useDynamicTitle(): void {
  const { settings } = useStore()
  if (settings.dynamicTitle) {
    document.title = settings.title + "-" + defaultSettings.title
  } else {
    document.title = defaultSettings.title
  }
}
