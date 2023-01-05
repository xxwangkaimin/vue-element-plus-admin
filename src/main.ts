import { createApp } from "vue"
import router from "@/router"
import { createPinia } from "pinia"
import "./assets/styles/index.scss"
import App from "./App.vue"
import "virtual:svg-icons-register"
import "./permission"

const app = createApp(App)
const pinia = createPinia()

app
  .use(router)
  .use(pinia)
  .mount("#app")
