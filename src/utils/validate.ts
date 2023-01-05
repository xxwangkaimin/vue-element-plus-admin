/**
 * 判断path是否为外链
 * @param path
 */
export function isExternal(path: any): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 判断url是否是http或https
 * @returns {Boolean}
 * @param url
 */
export function isHttp(url: string): boolean {
  return url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1
}
