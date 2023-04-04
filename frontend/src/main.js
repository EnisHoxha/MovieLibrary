import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import VueCookies from "vue-cookies";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import "./assets/main.css";
import "./style.css";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VueCookies);
app.use(Toast);
app.mount("#app");
