// main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

// Vue-router
import { router } from "./router";
// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";

// MDI icon font
import "@mdi/font/css/materialdesignicons.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";

// Vuetify settings
const vuetify = createVuetify({
    theme: {
        defaultTheme: "light",

        themes: {
            light: {
                colors: {
                    primary: "#6f8faf",
                },
            },
            dark: {
                colors: {
                    primary: "#4f8faf",
                },
            },
        },
    },
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
});

const app = createApp(App);

app.use(createPinia()); // Pinia
app.use(router); // Vue-router
app.use(vuetify); // Vuetify

app.mount("#app");
