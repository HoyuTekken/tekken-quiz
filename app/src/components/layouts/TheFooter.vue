<!-- src/components/layouts/TheFooter.vue -->
<template>
    <v-footer class="text-center d-flex flex-column align-center ga-1 py-6">
        <v-divider class="my-2 mx-auto" thickness="2" width="40"></v-divider>
        <div class="text-caption font-weight-bold opacity-80">鉄研クイズ</div>
        <div class="text-caption opacity-60">
            {{ new Date().getFullYear() }} —
            <strong>朋優学院高等学校鉄道研究部</strong>
        </div>
    </v-footer>
</template>