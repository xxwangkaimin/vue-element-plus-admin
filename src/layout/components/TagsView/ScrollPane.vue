<template>
  <el-scrollbar
    ref="scrollbarRef"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
    @scroll="emitScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import useStore from "@/store"
import { computed, onMounted, ref } from "vue"
import { ElScrollbar } from "element-plus"
import { TagViewItem } from "@/store/types/tagsView"

const { tagsView } = useStore()
const visitedViews = computed<TagViewItem[]>(() => tagsView.visitedViews)
const tagAndTagSpacing = ref<number>(4)
const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollWrapper = computed(() => scrollbarRef.value?.wrapRef)

function handleScroll(e: WheelEvent) {
  const eventDelta = (e as any).wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value
  scrollbarRef.value?.setScrollLeft(($scrollWrapper as HTMLDivElement).scrollLeft + eventDelta / 4)
}

function moveToTarget(currentTag: TagViewItem) {
  const $container = scrollbarRef.value?.$el
  const $containerWidth: number = $container.offsetWidth
  const $scrollWrapper: HTMLDivElement| undefined = scrollWrapper.value
  let firstTag: TagViewItem | null = null
  let lastTag: TagViewItem | null = null

  if (visitedViews.value.length > 0) {
    firstTag = visitedViews.value[0]
    lastTag = visitedViews.value[visitedViews.value.length - 1]
  }
  if (firstTag === currentTag) {
    scrollbarRef.value?.setScrollLeft(0)
  } else if (lastTag === currentTag) {
    scrollbarRef.value?.setScrollLeft(($scrollWrapper as HTMLDivElement).scrollWidth - $containerWidth)
  } else {
    const tagListDom = document.getElementsByClassName("tags-view-item")
    const currentIndex = visitedViews.value.findIndex(item => item === currentTag)
    let prevTag: HTMLElement | null = null
    let nextTag: HTMLElement | null = null
    for (const k in tagListDom) {
      if (k !== "length" && Object.hasOwnProperty.call(tagListDom, k)) {
        if ((tagListDom[k] as any).dataset.path === visitedViews.value[currentIndex - 1].path) {
          prevTag = tagListDom[k] as HTMLElement
        }
        if ((tagListDom[k] as any).dataset.path === visitedViews.value[currentIndex + 1].path) {
          nextTag = tagListDom[k] as HTMLElement
        }
      }
    }
    const afterNextTagOffsetLeft = (nextTag as HTMLElement).offsetLeft + (nextTag as HTMLElement).offsetWidth + tagAndTagSpacing.value
    const beforePrevTagOffsetLeft = (prevTag as HTMLElement).offsetLeft - tagAndTagSpacing.value
    if (afterNextTagOffsetLeft > ($scrollWrapper as HTMLDivElement).scrollLeft + $containerWidth) {
      scrollbarRef.value?.setScrollLeft(afterNextTagOffsetLeft - $containerWidth)
    } else if (beforePrevTagOffsetLeft < ($scrollWrapper as HTMLDivElement).scrollLeft) {
      scrollbarRef.value?.setScrollLeft(beforePrevTagOffsetLeft)
    }
  }
}

const emits = defineEmits(["scroll"])

function emitScroll() {
  emits("scroll")
}

defineExpose({
  moveToTarget
})
</script>

<style lang='scss' scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;

  :deep(.el-scrollbar__bar) {
    bottom: 0;
  }

  :deep(.el-scrollbar__wrap) {
    height: 49px;
  }
}
</style>
