<!-- src/App.vue -->
<template>
    <div class="d-flex flex-column min-vh-100">
        <v-app>
            <header>
                <TheHeader
                    :is-not-home="isNotHome"
                    :is-menu="isMenu"
                    :is-not-menu="isNotMenu"
                    :is-dark="theme.global.current.value.dark"
                    @toggle-theme="toggleTheme"
                    @toggle-drawer="drawer = !drawer"
                />

                <TheDrawer
                    v-model="drawer"
                    :is-not-home="isNotHome"
                    :is-menu="isMenu"
                    :is-not-menu="isNotMenu"
                    :is-dark="theme.global.current.value.dark"
                    @toggle-theme="toggleTheme"
                />
            </header>

            <v-main class="flex-grow-1 d-flex main-view">
                <router-view />
            </v-main>

            <footer>
                <TheFooter />
            </footer>
        </v-app>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useTheme } from "vuetify";

import TheHeader from "@/components/layouts/TheHeader.vue";
import TheDrawer from "@/components/layouts/TheDrawer.vue";
import TheFooter from "@/components/layouts/TheFooter.vue";

const route = useRoute();
const theme = useTheme();
const drawer = ref(false);

const isNotHome = computed(() => ![""].includes(route.path.replace(/^\/|\/$/g, "")));
const isMenu = computed(() => ["menu"].includes(route.path.replace(/^\/|\/$/g, "")));
const isNotMenu = computed(() => !["menu"].includes(route.path.replace(/^\/|\/$/g, "")));

function toggleTheme(targetValue?: boolean) {
    const nextTheme = (targetValue ?? !theme.global.current.value.dark) ? "dark" : "light";
    theme.global.name.value = nextTheme;
    localStorage.setItem("user-theme", nextTheme);
}

const updateThemeFromSystem = (e: MediaQueryList | MediaQueryListEvent) => {
    if (!localStorage.getItem("user-theme")) {
        theme.global.name.value = e.matches ? "dark" : "light";
    }
};

let mediaQuery: MediaQueryList | null = null;

onMounted(() => {
    const savedTheme = localStorage.getItem("user-theme");
    mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    theme.global.name.value = savedTheme || (mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", updateThemeFromSystem);
});

onUnmounted(() => {
    if (mediaQuery) {
        mediaQuery.removeEventListener("change", updateThemeFromSystem);
    }
});
</script>

<style lang="css" scoped>
.main-view {
    width: 90%;
    max-width: 1100px;
    margin: auto;
}
</style>