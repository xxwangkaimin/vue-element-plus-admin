<template>
  <div :style="'height:' + height" v-loading="loading" element-loading-text="正在加载页面，请稍候！">
    <iframe
      :id="iframeId"
      style="width: 100%; height: 100%"
      :src="src"
      frameborder="no"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"

const props = defineProps({
  src: {
    type: String,
    default: "/"
  },
  iframeId: {
    type: String
  }
})

const height = ref(document.documentElement.clientHeight - 94.5 + "px")
const loading = ref(false)

onMounted(() => {
  const iframeId = ("#" + props.iframeId).replace(/\//g, "\\/")
  const iframe: HTMLElement | null = document.querySelector(iframeId)
  loading.value = true
  if (iframe) {
    iframe.onload = function () {
      loading.value = false
    }
  }
})
</script>
