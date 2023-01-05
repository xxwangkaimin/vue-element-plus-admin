import { ConfigEnv, loadEnv, UserConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import ElementPlus from "unplugin-element-plus/vite"
import Icons from "unplugin-icons/vite"
import IconsResolver from "unplugin-icons/resolver"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { viteMockServe } from "vite-plugin-mock"
import path from "path"

export default ({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver(), IconsResolver({ prefix: "Icon" })]
      }),
      Components({
        resolvers: [ElementPlusResolver(), IconsResolver({ enabledCollections: ["ep"]})]
      }),
      ElementPlus(),
      Icons({ autoInstall: true}),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]"
      }),
      viteMockServe({
        ignore: /^\_/,
        mockPath: "src/mock",
        localEnabled: true,
        injectCode: `
          import { setupProdMockServer } from '../src/mock/createProductionServer'
          setupProdMockServer()
          `
      })
    ],
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: "http://127.0.0.1:4000/api",
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), "")
        }
      }
    },
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    // build: {
    //   rollupOptions: {
    //     output: {
    //       chunkFileNames: "static/js/[name]-[hash].js",
    //       entryFileNames: "static/js/[name]-[hash].js",
    //       assetFileNames: "static/[ext]/[name]-[hash].[ext]"
    //     }
    //   }
    // }
  }
}
