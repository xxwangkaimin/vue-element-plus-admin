<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { isExternal } from "@/utils/validate"

const props = defineProps({
  to: {
    type: [String, Object],
    required: true
  }
})
const isExt = computed(() => isExternal(props.to))
const type = computed(() => {
  if (isExt.value) {
    return "a"
  } else {
    return "router-link"
  }
})
function linkProps() {
  if (isExt.value) {
    return {
      href: props.to,
      target: "_blank",
      rel: "noopener"
    }
  } else {
    return {
      to: props.to
    }
  }
}
</script>

<style scoped>

</style>
