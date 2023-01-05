import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { ElMessage, ElMessageBox, ElNotification } from "element-plus"
import useStore from "@/store"

// 是否显示重新登录提示
interface IsReloginData {
  show: boolean
}

export const isRelogin: IsReloginData = { show: false }

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 20000
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  // 是否需要设置token
  const isToken = (config.headers || {}).isToken === false
  const { user } = useStore()
  if (!isToken && user.token) {
    (config.headers || {}).Authorization = "Bearer " + user.token
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use((response: AxiosResponse) => {
  if (response.request.responseType === "blob" || response.request.responseType === "arraybuffer") {
    return response.data
  }
  const { code, message } = response.data
  if (code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true
      ElMessageBox.confirm("登录状态已过期，您可以继续留在该页面，或者重新登录", "系统提示", {
        confirmButtonText: "重新登录",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        isRelogin.show = false
        const { user } = useStore()
        user.logout().then(() => {
          location.reload()
        })
      }).catch(() => {
        isRelogin.show = false
      })
    }
    return Promise.reject("无效的会话，或者会话已过期，请重新登录。")
  } else if (code === 500) {
    ElMessage({
      message,
      type: "error"
    })
    return Promise.reject(new Error(message))
  } else if (code !== 200) {
    ElNotification.error({
      title: message
    })
    return Promise.reject("error")
  } else {
    return response.data
  }
}, error => {
  let { message } = error
  if (message === "Network Error") {
    message = "后端接口连接异常"
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时"
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常"
  }
  ElMessage({
    message: message,
    type: "error",
    duration: 5 * 1000
  })
  return Promise.reject(error)
})

export default service
