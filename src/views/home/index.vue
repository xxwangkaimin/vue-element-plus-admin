<template>
  <div class="app-container">
    <div>Vue3 + Vite + Typescript + Vue-Router + Pinia + Element-plus + Axios</div>
    <el-button type="primary" @click="open = true">打开弹窗</el-button>
    <pagination :total="100" v-model:page="query.pageNum" v-model:limit="query.pageSize" />
    <el-dialog title="弹窗" v-model="open" width="680px" append-to-body @close="cancel(menuFormRef)">
      <el-form ref="menuFormRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单图标" prop="icon">
              <el-popover v-model:visible="showChooseIcon" placement="bottom-start" :width="540" trigger="click">
                <template #reference>
                  <el-input v-model="form.icon" placeholder="点击选择图标" readonly @click="showSelectIcon">
                    <template #prefix>
                      <svg-icon v-if="form.icon" :icon-class="form.icon" class="el-input__icon" style="width: 16px; height: 32px;" />
                      <el-icon v-else style="width: 16px;height: 32px;">
                        <IEpSearch />
                      </el-icon>
                    </template>
                  </el-input>
                </template>
                <icon-select ref="iconSelectRef" @selected="selected" />
              </el-popover>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup name="home">
import { reactive, ref } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import IconSelect from "@/components/IconSelect/index.vue"

interface MenuForm {
  icon?: string
}

const open = ref<boolean>(false)
const showChooseIcon = ref<boolean>(false)
const menuFormRef = ref<FormInstance>()
const form = reactive<MenuForm>({
  icon: ""
})
const rules = reactive<FormRules>({
  icon: [
    { required: true, message: "请选择图标", trigger: "change" }
  ]
})
const iconSelectRef = ref<InstanceType<typeof IconSelect> | null>(null)
const query = reactive({
  pageNum: 1,
  pageSize: 10
})

function showSelectIcon(): void {
  iconSelectRef.value?.reset()
}

function selected(name: string): void {
  form.icon = name
}

function cancel(formEl: FormInstance | undefined): void {
  if (!formEl) {
    return
  }
  formEl.resetFields()
  showChooseIcon.value = false
}
</script>

<style scoped>

</style>
