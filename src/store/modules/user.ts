import { defineStore } from "pinia"
import { UserState } from "@/store/types/user.d"
import { localStorage } from "@/utils/storage"
import { LoginFormData } from "@/api/user/types.d"
import { getUserInfoByLogin, login } from "@/api/user"

const useUserStore = defineStore({
  id: "user",
  state: (): UserState => ({
    token: localStorage.get("token") || "",
    loginName: "",
    roleName: "",
    roleId: "",
    realname: "",
    avatar: "",
    roles: [],
    permissions: []
  }),
  actions: {
    RESET_STATE(): void {
      this.$reset()
    },
    login(loginData: LoginFormData): Promise<void> {
      return new Promise(((resolve, reject) => {
        login(loginData).then(res => {
          const { token } = res.data
          localStorage.set("token", token)
          this.token = token
          resolve()
        }).catch(error => {
          reject(error)
        })
      }))
    },
    getUserInfo(): Promise<void> {
      return new Promise((resolve, reject) => {
        getUserInfoByLogin().then(res => {
          const { avatar, loginName, roleName, roleId, realname } = res.data
          this.avatar = avatar
          this.loginName = loginName
          this.roleId = roleId
          this.roleName = roleName
          this.realname = realname
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    logout(): Promise<void> {
      return new Promise(resolve => {
        localStorage.remove("token")
        this.RESET_STATE()
        resolve()
      })
    }
  }
})

export default useUserStore
