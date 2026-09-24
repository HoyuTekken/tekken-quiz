<!-- src/components/QuizPlayInput.vue -->
<template>
    <div class="input-mode-wrapper">
        <v-card
            class="question-card glass-card border-0 my-3 my-sm-6"
            variant="flat"
        >
            <div class="pa-6 pa-sm-8 text-center">
                <h2 class="question-text font-weight-bold leading-relaxed mb-4">
                    {{ quizStore.currentQuestion?.question }}
                </h2>

                <div
                    v-if="quizStore.currentQuestion?.image"
                    class="mb-2 d-flex justify-center"
                >
                    <v-img
                        :src="quizStore.currentQuestion.image"
                        contain
                        class="rounded-lg question-image"
                    ></v-img>
                </div>
            </div>
        </v-card>

        <div v-if="quizStore.selectedAnswer === null" class="input-form-area">
            <v-text-field
                v-model="userInput"
                label="回答を入力..."
                variant="outlined"
                clearable
                autofocus
                class="mb-3"
                @keyup.enter="submitAnswer"
            ></v-text-field>

            <v-btn
                color="primary"
                size="x-large"
                block
                variant="flat"
                class="submit-btn font-weight-bold"
                @click="submitAnswer"
                :disabled="!userInput.trim()"
            >
                回答する
            </v-btn>
        </div>

        <div v-else class="result-feedback-area">
            <v-card
                class="pa-6 mb-4 rounded-xl border-0"
                :class="
                    quizStore.isCorrect ? 'bg-success-light' : 'bg-error-light'
                "
                variant="flat"
            >
                <div class="d-flex align-center mb-2">
                    <v-icon
                        :icon="
                            quizStore.isCorrect
                                ? 'mdi-check-circle'
                                : 'mdi-close-circle'
                        "
                        :color="quizStore.isCorrect ? 'success' : 'error'"
                        size="large"
                        class="mr-2"
                    ></v-icon>
                    <span
                        class="text-h6 font-weight-bold"
                        :class="
                            quizStore.isCorrect ? 'text-success' : 'text-error'
                        "
                    >
                        {{ quizStore.isCorrect ? "Correct!" : "Incorrect" }}
                    </span>
                </div>

                <p class="text-body-1 mb-2">
                    <strong>あなたの回答:</strong>
                    {{ quizStore.selectedAnswer }}
                </p>

                <div
                    v-if="
                        !quizStore.isCorrect &&
                        quizStore.currentQuestion?.accept_answers
                    "
                >
                    <p class="text-body-1 text-medium-emphasis">
                        <strong>回答例:</strong>
                        {{
                            quizStore.currentQuestion.accept_answers.join(", ")
                        }}
                    </p>
                </div>
            </v-card>

            <v-btn
                color="primary"
                size="x-large"
                block
                variant="flat"
                class="next-btn font-weight-bold"
                @click="nextQuestion"
                :append-icon="
                    quizStore.currentIndex + 1 === quizStore.totalQuestions
                        ? 'mdi-check-circle'
                        : 'mdi-arrow-right'
                "
            >
                {{
                    quizStore.currentIndex + 1 === quizStore.totalQuestions
                        ? "終わる"
                        : "次の問題へ"
                }}
            </v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useQuizStore } from "../stores/QuizStore";

const quizStore = useQuizStore();
const userInput = ref("");

watch(
    () => quizStore.currentIndex,
    () => {
        userInput.value = "";
    },
);

function submitAnswer() {
    if (!userInput.value.trim() || quizStore.selectedAnswer !== null) return;
    quizStore.checkAnswer(userInput.value);
}

function nextQuestion() {
    quizStore.nextQuestion();
}
</script>

<style lang="scss" scoped>
.leading-relaxed {
    line-height: 1.4 !important;
}

.question-card {
    border-radius: 16px;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.question-text {
    font-size: clamp(16px, 4vw, 22px);
}

.question-image {
    max-height: 200px;
    width: 100%;
    border-radius: 12px !important;
    overflow: hidden;

    :deep(img) {
        border-radius: 12px !important;
    }
}

.glass-card {
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    box-shadow: 0 8px 32px 0 rgba(var(--v-theme-primary), 0.05) !important;
}

.submit-btn,
.next-btn {
    border-radius: 12px;
    height: 48px !important;
}

.bg-success-light {
    background-color: rgba(76, 175, 80, 0.1) !important;
}

.bg-error-light {
    background-color: rgba(198, 40, 40, 0.1) !important;
}

@media (min-width: 600px) {
    .question-image {
        max-height: 350px;
    }

    .submit-btn,
    .next-btn {
        height: 64px !important;
    }
}
</style>
