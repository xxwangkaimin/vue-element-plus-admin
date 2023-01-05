<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import { reactive, toRefs } from "vue"
const state = reactive({
  locale: zhCn
})
const { locale } = toRefs(state)
</script>
