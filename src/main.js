import { createApp } from "vue";
import { initAuth } from "./auth";
import App from "./App.vue";
import router from "./router";
import "./css/global.css";
import "./css/tailwind.css"

(async () => {
  await initAuth();
  createApp(App).use(router).mount("#app");
})();
