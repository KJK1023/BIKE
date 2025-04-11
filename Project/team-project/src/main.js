import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import VCalandar from "v-calendar";
import "v-calendar/style.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VCalandar, {});

app.mount("#app");
