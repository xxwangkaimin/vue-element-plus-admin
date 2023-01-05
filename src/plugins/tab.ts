import useStore from "@/store"
import { CurrentTagsViewState, TagViewItem } from "@/store/types/tagsView"
import router from "@/router"
import { NavigationFailure } from "vue-router"

export function refreshPage(obj: TagViewItem) {
  const { path, query, matched } = router.currentRoute.value
  const { tagsView } = useStore()
  if (obj === undefined) {
    matched.forEach(m => {
      if (m.components && m.components.default && m.components.default.name) {
        if (!["Layout", "ParentView"].includes(m.components.default.name)) {
          obj = { name: m.components.default.name, path: path, query: query }
        }
      }
    })
  }
  return tagsView.delCachedView(obj).then(() => {
    const { path, query } = obj
    router.replace({
      path: "/redirect" + path,
      query
    })
  })
}

export function closePage(obj: TagViewItem):Promise<NavigationFailure | void | undefined | CurrentTagsViewState> {
  const { tagsView } = useStore()
  if (obj === undefined) {
    const view = router.currentRoute.value
    return tagsView.delView(view as TagViewItem).then(() => {
      return router.push("/home")
    })
  }
  return tagsView.delView(obj)
}

