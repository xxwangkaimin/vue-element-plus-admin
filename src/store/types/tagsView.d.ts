import type { RouteLocationNormalizedLoaded } from 'vue-router'

// export type TagViewItem = RouteLocationNormalizedLoaded

export interface TagViewItem extends RouteLocationNormalizedLoaded{
  title: string;
}

export interface TagsViewState {
  visitedViews: TagViewItem[];
  cachedViews: string[];
  iframeViews: TagViewItem[]
}

export interface CurrentTagsViewState {
  visitedViews: TagViewItem[];
  cachedViews: string[];
}
