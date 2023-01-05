<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from "vue"
import { scrollTo } from "@/utils/scroll-to"

const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 30, 50]
    }
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper"
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["update:page", "update:limit", "pagination"])
const currentPage = computed({
  get: () => props.page,
  set: val => {
    emit("update:page", val)
  }
})
const pageSize = computed({
  get: () => props.limit,
  set: val => {
    emit("update:limit", val)
  }
})
function handleSizeChange(val: number) {
  emit("pagination", { page: currentPage, limit: val})
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
function handleCurrentChange(val: number) {
  currentPage.value = val
  emit("pagination", { page: val, limit: props.limit })
  if (props.autoScroll) {
    scrollTo(0, 800)
  }
}
</script>

<style lang="scss" scoped>
.pagination-container {
  background-color: #fff;
  padding: 32px 16px;

  &.hidden {
    display: none;
  }
}
</style>
