import { createApp } from "vue";

import ElementPlus from "element-plus";

import "element-plus/lib/theme-chalk/index.css";

import App from "./App.vue";

import router from "./router";
import store from "./store";

import videoManager from "./mixins/videoManager";
import i18n from "./i18n";

const app = createApp(App).use(i18n).use(store).use(router);

app.use(ElementPlus);
app.use(store);

app.mixin(videoManager);

app.mount("#app");
