<template>
  <div class="icon-body">
    <el-input v-model="iconName" style="position: relative" clearable placeholder="请输入图标名称" @clear="filterIcons" @input="filterIcons">
      <template #suffix>
        <el-icon>
          <IEpSearch />
        </el-icon>
      </template>
    </el-input>
    <div class="icon-select__list">
      <el-scrollbar>
        <div v-for="(item, index) in iconList" :key="index" @click="selectedIcon(item)" class="svg-item">
          <svg-icon color="#999" :icon-class="item" style="height: 30px;width: 16px;margin-right: 5px" />
          <span>{{ item }}</span>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import icons from "./requireIcons"
import { ref } from "vue"

const iconName = ref<string>("")
const iconList = ref<string[]>(icons)
const emit = defineEmits(["selected"])

function filterIcons() {
  iconList.value = icons
  if (iconName.value) {
    iconList.value = icons.filter(item => item.indexOf(iconName.value) !== -1)
  }
}

function selectedIcon(name: string) {
  emit("selected", name)
  document.body.click()
}

function reset() {
  iconName.value = ""
  iconList.value = icons
}

defineExpose({
  reset
})
</script>

<style lang="scss" scoped>
.icon-body {
  width: 100%;
  padding: 10px;

  .icon-select {
    width: 100%;
    padding: 10px;

    &__list {
      :deep(.el-scrollbar) {
        height: 200px;

        .svg-item {
          height: 30px;
          line-height: 30px;
          margin-bottom: -5px;
          cursor: pointer;
          width: 33%;
          float: left;

          span {
            display: inline-block;
            vertical-align: -0.15em;
            fill: currentColor;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
