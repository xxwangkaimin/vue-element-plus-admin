<template>
  <div class="login">
    <el-form ref="loginFormRef" :model="loginForm" :rules="rules" class="login-form">
      <h3 class="title">数据管理系统</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="账号" @keyup.enter="handleLogin(loginFormRef)">
          <template #prefix>
            <svg-icon icon-class="user" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" placeholder="密码" @keyup.enter="handleLogin(loginFormRef)">
          <template #prefix>
            <svg-icon icon-class="password" class="el-input__icon input-icon" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="loginForm.captcha" placeholder="验证码" @keyup.enter="handleLogin(loginFormRef)">
          <template #prefix>
            <svg-icon icon-class="valid-code" class="el-input__icon input-icon" />
          </template>
        </el-input>
        <img v-if="captchaUrl" :src="captchaUrl" alt="" class="captcha" @click="getCaptchaUrl">
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="primary" style="width: 100%" @click="handleLogin(loginFormRef)">
          <span v-if="loading">登录中...</span>
          <span v-else>登录</span>
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus"
import { onMounted, onUnmounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import useStore from "@/store"
import request from "@/utils/request"
import { getLoginValiCodeImage } from "@/api/user"

const { user } = useStore()
const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  username: "",
  password: "",
  captcha: ""
})
const captchaUrl = ref<string>("")
const rules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入登录账号", trigger: "blur" }
  ],
  password: [
    { required: true, message: "请输入登录密码", trigger: "blur" }
  ],
  captcha: [
    { required: true, message: "请输入验证码", trigger: "blur" }
  ]
})
const loading = ref(false)

const getCaptchaUrl = () => {
  getLoginValiCodeImage({ v: Date.now()}).then((res: any) => {
    captchaUrl.value = res.image
  })
  // captchaUrl.value = "/api/captcha/getCaptchaByLogin?v=" + Date.now()
}

onMounted(() => {
  getCaptchaUrl()
})

const handleLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl || loading.value) return
  await formEl.validate((valid) => {
    if (valid) {
      loading.value = true
      user.login(loginForm).then(() => {
        router.push({ path: "/" })
      }).catch(() => {
        loading.value = false
        getCaptchaUrl()
      })
    } else {
      return false
    }
  })
}
onUnmounted(() => {
  loading.value = false
})
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/images/infinity-16717567.jpg");
  background-size: cover;

  .title {
    margin: 0 auto 30px auto;
    text-align: center;
    color: #707070;
  }

  .login-form {
    border-radius: 6px;
    background-color: #ffffff;
    width: 400px;
    padding: 25px 25px 5px 25px;

    :deep(.el-input) {
      .el-input__wrapper {
        .el-input__inner {

          &:-webkit-autofill {
            box-shadow: 0 0 0 40px #fff inset !important;
            -webkit-text-fill-color: #606266 !important;
          }
        }
      }

      input {
        height: 40px;
      }
    }

    .captcha {
      position: absolute;
      right: -1px;
      top: 1px;
      width: 33%;
      height: 40px;
      cursor: pointer;
      border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    }
  }
}
</style>
