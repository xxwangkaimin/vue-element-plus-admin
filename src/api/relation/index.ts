import { AxiosPromise } from "axios"
import request from "@/utils/request"
import { RelationMenu } from "@/api/relation/types"

/**
 * 获取登录用户的权限菜单
 */
export function getMenuListByLogin(): AxiosPromise<RelationMenu[]> {
  return request({
    url: "/relation/getMenuListByLogin",
    method: "get"
  })
}
