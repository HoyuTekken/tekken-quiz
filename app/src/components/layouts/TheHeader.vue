<!-- src/components/layouts/TheHeader.vue -->
<template>
    <v-app-bar
        app
        flat
        :class="{ 'v-app-bar--is-scrolled': isScrolled }"
        color="transparent"
        class="px-0"
    >
        <v-container class="d-flex align-center pa-0" style="max-width: 95%">
            <v-app-bar-title class="cursor-pointer" @click="$router.push('/')">
                <v-img
                    :src="logo"
                    height="40"
                    width="90"
                    alt="logo"
                    class="mr-2"
                />
            </v-app-bar-title>

            <v-spacer></v-spacer>

            <v-btn
                v-if="isNotHome && isNotMenu"
                icon
                variant="text"
                @click="$router.push('/menu')"
                class="mr-1 d-none d-md-flex"
            >
                <v-icon icon="mdi-home"></v-icon>
                <v-tooltip activator="parent" location="bottom"
                    >メニュー</v-tooltip
                >
            </v-btn>

            <div class="d-none d-md-flex align-center">
                <v-btn
                    v-if="isNotHome && isMenu"
                    icon
                    href="https://app.pagescms.org/hoyutekken/tekken-quiz/main/"
                    target="_blank"
                    variant="text"
                    class="mr-1"
                >
                    <v-icon icon="mdi-plus"></v-icon>
                    <v-tooltip activator="parent" location="bottom"
                        >クイズ追加</v-tooltip
                    >
                </v-btn>

                <v-btn icon @click="$emit('toggle-theme')" variant="text">
                    <v-icon
                        :icon="
                            isDark
                                ? 'mdi-white-balance-sunny'
                                : 'mdi-weather-night'
                        "
                    />
                    <v-tooltip activator="parent" location="bottom"
                        >表示切り替え</v-tooltip
                    >
                </v-btn>

                <v-btn
                    icon
                    href="https://github.com/hoyutekken/tekken-quiz"
                    target="_blank"
                    variant="text"
                    class="mr-1"
                >
                    <v-icon icon="mdi-github"></v-icon>
                    <v-tooltip activator="parent" location="bottom"
                        >GitHub</v-tooltip
                    >
                </v-btn>
            </div>

            <v-app-bar-nav-icon
                class="d-md-none"
                @click="$emit('toggle-drawer')"
            />
        </v-container>
    </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import logo from "@/assets/logo.svg";

defineProps<{
    isNotHome: boolean;
    isMenu: boolean;
    isNotMenu: boolean;
    isDark: boolean;
}>();

defineEmits(["toggle-theme", "toggle-drawer"]);

const isScrolled = ref(false);
const handleScroll = () => {
    isScrolled.value = window.scrollY > 0;
};

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<style lang="css" scoped>
:deep(.v-app-bar) {
    transition: all 0.4s ease !important;
}
.v-app-bar--is-scrolled {
    background-color: rgba(var(--v-theme-surface), 0.9) !important;
    backdrop-filter: blur(12px) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
}
.v-theme--dark .v-app-bar--is-scrolled {
    box-shadow: 0 4px 25px rgba(0, 0, 0, 0.3) !important;
}
</style>
