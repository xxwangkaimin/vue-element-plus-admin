import { defineStore } from "pinia"
import { CurrentTagsViewState, TagsViewState, TagViewItem } from "@/store/types/tagsView"

const useTagsViewStore = defineStore({
  id: "tagsView",
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: [],
    iframeViews: []
  }),
  actions: {
    addView(view: TagViewItem) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view: TagViewItem) {
      if (this.visitedViews.some(v => v.fullPath === view.fullPath)) {
        return
      }
      this.visitedViews.push(Object.assign({}, view, { title: view.meta?.title || "no-title" }))
    },
    addCachedView(view: TagViewItem) {
      if (this.cachedViews.includes(view.name as string)) {
        return false
      }
      if (!view.meta?.noCache && view.name) {
        this.cachedViews.push(view.name as string)
      }
    },
    addIframeView(view: TagViewItem) {
      if (this.iframeViews.some(v => v.path === view.path)) {
        return
      }
      this.iframeViews.push(Object.assign({}, view, { title: view.meta?.title || "no-title" }))
    },
    delView(view: TagViewItem): Promise<CurrentTagsViewState> {
      return new Promise(resolve => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delVisitedView(view: TagViewItem) {
      return new Promise(resolve => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.fullPath === view.fullPath) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        this.iframeViews = this.iframeViews.filter(item => item.path !== view.path)
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view: TagViewItem) {
      return new Promise(resolve => {
        const index = this.cachedViews.indexOf(view.name as string)
        if (index > -1) {
          this.cachedViews.splice(index, 1)
        }
        resolve([...this.cachedViews])
      })
    },
    delIframeView(view: TagViewItem) {
      return new Promise(resolve => {
        this.iframeViews = this.iframeViews.filter(item => item.path !== view.path)
        resolve([...this.iframeViews])
      })
    },
    delOthersViews(view: TagViewItem) {
      return new Promise(resolve => {
        this.delOthersVisitedViews(view)
        this.delOthersCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delOthersVisitedViews(view: TagViewItem) {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(v => {
          return v.meta?.affix || v.fullPath === view.fullPath
        })
        this.iframeViews = this.iframeViews.filter(item => item.path === view.path)
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view: TagViewItem) {
      return new Promise(resolve => {
        const index = this.cachedViews.indexOf(view.name as string)
        if (index > -1) {
          this.cachedViews = this.cachedViews.slice(index, index + 1)
        } else {
          this.cachedViews = []
        }
        resolve([...this.cachedViews])
      })
    },
    delAllViews() {
      return new Promise(resolve => {
        this.delAllVisitedViews()
        this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews]
        })
      })
    },
    delAllVisitedViews() {
      return new Promise(resolve => {
        this.visitedViews = this.visitedViews.filter(tag => tag.meta?.affix)
        this.iframeViews = []
        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise(resolve => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },
    updateVisitedView(view: TagViewItem) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
    delRightTags(view: TagViewItem) {
      return new Promise(resolve => {
        const index = this.visitedViews.findIndex(v => v.fullPath === view.fullPath)
        if (index === -1) {
          return
        }
        this.visitedViews = this.visitedViews.filter((item, idx) => {
          if (idx <= index || item.meta?.affix) {
            return true
          }
          const i = this.cachedViews.indexOf(item.name as string)
          if (i > -1) {
            this.cachedViews.splice(i, 1)
          }
          if (item.meta?.link) {
            const fi = this.iframeViews.findIndex(v => v.path === item.path)
            this.iframeViews.splice(fi, 1)
          }
          return false
        })
        resolve([...this.visitedViews])
      })
    },
    delLeftTags(view: TagViewItem) {
      return new Promise(resolve => {
        const index = this.visitedViews.findIndex(v => v.fullPath === view.fullPath)
        if (index === -1) {
          return
        }
        this.visitedViews = this.visitedViews.filter((item, idx) => {
          if (idx >= index || item.meta?.affix) {
            return true
          }
          const i = this.cachedViews.indexOf(item.name as string)
          if (i > -1) {
            this.cachedViews.splice(i, 1)
          }
          if (item.meta?.link) {
            const fi = this.iframeViews.findIndex(v => v.path === item.path)
            this.iframeViews.splice(fi, 1)
          }
          return false
        })
        resolve([...this.visitedViews])
      })
    }
  }
})

export default useTagsViewStore
