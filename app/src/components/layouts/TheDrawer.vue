<!-- src/components/layouts/TheDrawer.vue -->
<template>
    <v-navigation-drawer location="right" temporary width="280">
        <v-divider></v-divider>
        <v-list nav>
            <v-list-item v-if="isNotHome && isNotMenu" link to="/menu">
                <template v-slot:prepend>
                    <v-icon icon="mdi-home"></v-icon>
                </template>
                <v-list-item-title class="font-weight-bold"
                    >メニュー</v-list-item-title
                >
            </v-list-item>

            <v-divider v-if="isNotHome && isNotMenu" class="my-2"></v-divider>

            <v-list-item>
                <template v-slot:prepend>
                    <v-icon
                        :icon="
                            isDark
                                ? 'mdi-white-balance-sunny'
                                : 'mdi-weather-night'
                        "
                    />
                </template>
                <v-list-item-title class="font-weight-bold"
                    >ダークモード</v-list-item-title
                >
                <template v-slot:append>
                    <v-switch
                        :model-value="isDark"
                        @update:model-value="
                            (val) => $emit('toggle-theme', val)
                        "
                        color="primary"
                        hide-details
                        density="compact"
                    ></v-switch>
                </template>
            </v-list-item>

            <v-divider v-if="isNotHome && isMenu" class="my-2"></v-divider>

            <v-list-item
                v-if="isNotHome && isMenu"
                link
                href="https://app.pagescms.org/hoyutekken/tekkenquiz/main/"
                target="_blank"
            >
                <template v-slot:prepend>
                    <v-icon icon="mdi-plus"></v-icon>
                </template>
                <v-list-item-title class="font-weight-bold"
                    >クイズ追加</v-list-item-title
                >
            </v-list-item>

            <v-divider class="my-2"></v-divider>

            <v-list-item
                link
                href="https://github.com/hoyutekken/tekken-quiz"
                target="_blank"
            >
                <template v-slot:prepend>
                    <v-icon icon="mdi-github"></v-icon>
                </template>
                <v-list-item-title class="font-weight-bold"
                    >GitHub</v-list-item-title
                >
            </v-list-item>
            <v-divider class="my-2"></v-divider>
        </v-list>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
defineProps<{
    isNotHome: boolean;
    isMenu: boolean;
    isNotMenu: boolean;
    isDark: boolean;
}>();

defineEmits(["toggle-theme"]);
</script>

<style lang="css" scoped>
.v-navigation-drawer {
    border: none !important;
    background-color: rgba(var(--v-theme-surface), 0.8) !important;
    backdrop-filter: blur(15px);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1) !important;
    margin: 12px 0;
    height: calc(100% - 24px) !important;
    border-radius: 24px 0 0 24px !important;
    overflow: hidden !important;
}
.v-theme--dark :deep(.v-navigation-drawer) {
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.4) !important;
}
</style>
