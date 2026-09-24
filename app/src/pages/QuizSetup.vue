<!-- pages/QuizSetup.vue -->
<template>
    <v-container fluid class="bg-background">
        <tomenu />
        <h1 class="main-title text-high-emphasis mt-4">{{ textbookName }}</h1>

        <!-- Setup section -->
        <div class="setup-section mb-10">
            <h2 class="sub-title text-medium-emphasis">
                クイズ設定
                <v-divider
                    :thickness="1"
                    class="mt-2 border-opacity-25"
                ></v-divider>
            </h2>

            <v-card class="pa-6 mt-6 setup-card bg-surface" elevation="0">
                <div v-if="isLoading" class="d-flex justify-center pa-6">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                </div>

                <v-form v-else @submit.prevent="startQuiz">
                    <v-select
                        v-model="selectedChapter"
                        :items="chapterOptions"
                        item-title="label"
                        item-value="value"
                        label="チャプターを選択..."
                        prepend-inner-icon="mdi-book-open-page-variant"
                        variant="outlined"
                        class="mb-4"
                        color="primary"
                    ></v-select>

                    <v-select
                        v-model="selectedMode"
                        :items="modeOptions"
                        item-title="label"
                        item-value="value"
                        label="出題形式を選択..."
                        prepend-inner-icon="mdi-play-circle-outline"
                        variant="outlined"
                        class="mb-4"
                        color="primary"
                    ></v-select>

                    <div class="mb-6 px-2">
                        <div class="text-caption text-medium-emphasis mb-1">
                            問題数:
                            {{
                                selectedLimit === maxQuestions
                                    ? `全問 (${maxQuestions}問)`
                                    : `${selectedLimit}問`
                            }}
                        </div>
                        <v-slider
                            v-model="selectedLimit"
                            :min="5"
                            :max="maxQuestions"
                            :step="1"
                            thumb-label
                            color="primary"
                            hide-details
                        ></v-slider>
                    </div>

                    <v-btn
                        type="submit"
                        color="primary"
                        size="large"
                        block
                        variant="flat"
                        elevation="0"
                        class="start-btn font-weight-bold"
                        prepend-icon="mdi-play"
                        :disabled="chapterOptions.length === 0"
                    >
                        この条件でクイズを解く
                    </v-btn>
                </v-form>
            </v-card>
        </div>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import tomenu from "../components/ToMenu.vue";

const route = useRoute();
const router = useRouter();

const textbookId = computed(() => (route.params.quizname as string) || "");
const textbookName = ref<string>("読み込み中...");

const selectedChapter = ref<number | null>(null);
const selectedMode = ref<string>("mixed");
const selectedLimit = ref<number>(10);
const quizData = ref<any>(null);

const chapterOptions = ref<{ label: string; value: number }[]>([]);
const isLoading = ref<boolean>(false);

const modeOptions = [
    { label: "すべての形式", value: "mixed" },
    { label: "4択クイズのみ", value: "four_choice" },
    { label: "自由記述のみ", value: "free_input" },
];

const maxQuestions = computed(() => {
    if (!quizData.value || selectedChapter.value === null) return 20;

    const chapterObj = quizData.value.chapters.find(
        (ch: any) => Number(ch.chapter) === selectedChapter.value,
    );

    if (!chapterObj || !chapterObj.questions) return 20;

    const questions = chapterObj.questions;

    if (selectedMode.value === "four_choice") {
        return questions.filter((q: any) => q.quiz_type === "four_choice")
            .length;
    } else if (selectedMode.value === "free_input") {
        return questions.filter((q: any) => q.quiz_type === "free_input")
            .length;
    }

    return questions.length;
});

watch([selectedChapter, selectedMode], () => {
    selectedLimit.value = maxQuestions.value;
});

// Fetch quiz JSON data dynamically based on route parameter
watch(
    textbookId,
    async (newId) => {
        if (!newId) {
            chapterOptions.value = [];
            textbookName.value = "クイズ";
            return;
        }

        isLoading.value = true;
        try {
            const response = await fetch(`/quiz/${newId}.json`);

            if (!response.ok) throw new Error("Network response was not ok");

            const data = await response.json();
            quizData.value = data;
            textbookName.value = data.title || "不明なクイズ";
            const chaptersArray = data.chapters;

            if (Array.isArray(chaptersArray)) {
                const chapters = Array.from(
                    new Set(
                        chaptersArray.map((item: any) => Number(item.chapter)),
                    ),
                ).sort((a, b) => a - b);

                chapterOptions.value = chapters.map((ch) => ({
                    label: `第${ch}章`,
                    value: ch,
                }));

                if (chapters.length > 0) {
                    selectedChapter.value = chapters[0];
                }
            }
        } catch (error) {
            console.error(`Failed to fetch JSON: ${newId}`, error);
            chapterOptions.value = [];
            textbookName.value = "読み込みエラー";
        } finally {
            isLoading.value = false;
        }
    },
    { immediate: true },
);

function startQuiz() {
    if (selectedChapter.value === null) return;

    router.push({
        path: `/play/${textbookId.value}`,
        query: {
            chapter: selectedChapter.value,
            mode: selectedMode.value,
            limit: selectedLimit.value,
        },
    });
}
</script>

<style lang="scss" scoped>
.main-title {
    font-size: clamp(32px, 5vw, 40px);
    margin-bottom: 10px;
    font-weight: 800;
}
.sub-title {
    font-size: clamp(20px, 4vw, 22px);
    margin-bottom: 10px;
}
.setup-card {
    border-radius: 12px;
}
.start-btn {
    border-radius: 8px;
    height: 50px !important;
    font-size: 16px;
    letter-spacing: 0.5px;
    box-shadow: none !important;
}
</style>
