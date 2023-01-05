/**
 * 浏览器缓存
 */
export const localStorage = {
  /**
   * 设置缓存数据
   * @param key
   * @param val
   */
  set(key: string, val: any) {
    window.localStorage.setItem(key, JSON.stringify(val))
  },
  /**
   * 获取缓存数据
   * @param key
   */
  get(key: string) {
    try {
      const json: any = window.localStorage.getItem(key)
      return JSON.parse(json)
    }catch (e) {
      return ""
    }
  },
  /**
   * 移除指定缓存数据
   * @param key
   */
  remove(key: string) {
    window.localStorage.removeItem(key)
  },
  /**
   * 移除全部缓存数据
   */
  clear() {
    window.localStorage.clear()
  }
}
