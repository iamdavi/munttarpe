import { createApp } from "vue";
import { createPinia } from "pinia";

import { i18n } from "./plugins/languaje";
import { vuetify } from "./plugins/vuetify";

// Custom css
import "./assets/css/style.css";

import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(createPinia()).use(i18n).use(vuetify).mount("#app");
