import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer"
import userModules from "./user/index"

export function setupProdMockServer() {
  createProdMockServer([...userModules])
}
