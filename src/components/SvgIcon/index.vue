<template>
  <svg aria-hidden="true" :class="svgClass" :style="'width:' + size + ';height:' + size">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup name="SvgIcon">
import { computed } from "vue"

const props = defineProps({
  prefix: {
    type: String,
    default: "icon"
  },
  iconClass: {
    type: String,
    required: false
  },
  color: {
    type: String
  },
  size: {
    type: String,
    default: "1em"
  },
  className: {
    type: String,
    default: ""
  }
})
const symbolId = computed(() => `#${ props.prefix }-${ props.iconClass }`)
const svgClass = computed(() => {
  if (props.className) {
    return `svg-icon ${ props.className }`
  } else {
    return "svg-icon"
  }
})
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: -0.15em;
  overflow: hidden;
  fill: currentColor;
}
</style>
