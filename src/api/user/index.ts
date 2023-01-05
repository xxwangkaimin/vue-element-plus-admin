import request from "@/utils/request"
import { LoginFormData, LoginResponseData, LoginUserBaseInfoData } from "@/api/user/types.d"
import { AxiosPromise } from "axios"

/**
 * 登录
 * @param data
 */
export function login(data: LoginFormData): AxiosPromise<LoginResponseData> {
  return request({
    url: "/user/login",
    method: "post",
    data
  })
}

/**
 * 获取登录用户基本信息
 */
export function getUserInfoByLogin(): AxiosPromise<LoginUserBaseInfoData> {
  return request({
    url: "/user/getUserInfoByLogin",
    method: "get"
  })
}

/**
 * 获取登录验证码
 */
export function getLoginValiCodeImage(params: any) {
  return request({
    url: "/captcha/getCaptchaByLogin",
    method: "get",
    params
  })
}
