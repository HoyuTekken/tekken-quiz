// src/stores/QuizStore.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";

// Type Definitions
export type QuizType = "four_choice" | "free_input";

export interface QuestionItem {
    id: string;
    quiz_type: QuizType;
    image?: string;
    question: string;
    choices?: string[];
    answer?: string;
    accept_answers?: string[];
    explanation?: string;
}

export interface ChapterData {
    chapter: number;
    questions: QuestionItem[];
}

export interface QuizRawData {
    title: string;
    category: string;
    subject: string;
    level: string;
    thumbnail: string;
    icon: string;
    color: string;
    comingSoon: boolean;
    chapters: ChapterData[];
}

export const useQuizStore = defineStore("quiz", () => {
    const questions = ref<QuestionItem[]>([]);
    const currentIndex = ref(0);
    const score = ref(0);
    const isFinished = ref(false);
    const selectedAnswer = ref<string | null>(null);
    const isCorrect = ref<boolean | null>(null);

    const currentQuestion = computed(
        () => questions.value[currentIndex.value] || null,
    );
    const totalQuestions = computed(() => questions.value.length);
    const progress = computed(() => {
        if (totalQuestions.value === 0) return 0;
        return (currentIndex.value / totalQuestions.value) * 100;
    });

    function shuffleArray<T>(array: T[]): T[] {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    function initQuiz(
        rawData: QuizRawData,
        targetChapter: number,
        limit: number = 0,
        mode: string = "mixed",
    ) {
        const targetData = rawData.chapters?.find(
            (c) => Number(c.chapter) === targetChapter,
        );

        if (
            !targetData ||
            !targetData.questions ||
            !targetData.questions.length
        ) {
            questions.value = [];
            return;
        }

        let filteredQuestions = targetData.questions;
        if (mode === "four_choice") {
            filteredQuestions = targetData.questions.filter(
                (q) => q.quiz_type === "four_choice",
            );
        } else if (mode === "free_input") {
            filteredQuestions = targetData.questions.filter(
                (q) => q.quiz_type === "free_input",
            );
        }

        let finalData = shuffleArray(filteredQuestions);
        if (limit > 0) {
            finalData = finalData.slice(0, limit);
        }

        questions.value = finalData;
        currentIndex.value = 0;
        score.value = 0;
        isFinished.value = false;
        selectedAnswer.value = null;
        isCorrect.value = null;
    }

    function checkAnswer(inputAnswer: string) {
        if (selectedAnswer.value !== null || !currentQuestion.value) return;

        selectedAnswer.value = inputAnswer;
        const q = currentQuestion.value;
        const userAnswer = inputAnswer.trim();

        let correct = false;

        if (q.quiz_type === "four_choice" && q.answer) {
            correct = userAnswer === q.answer.trim();
        } else if (q.quiz_type === "free_input" && q.accept_answers) {
            correct = q.accept_answers.some((ans) => ans.trim() === userAnswer);
        }

        isCorrect.value = correct;

        if (correct) {
            score.value++;
        }
    }

    function nextQuestion() {
        selectedAnswer.value = null;
        isCorrect.value = null;

        if (currentIndex.value + 1 < totalQuestions.value) {
            currentIndex.value++;
        } else {
            isFinished.value = true;
        }
    }

    return {
        questions,
        currentIndex,
        score,
        isFinished,
        selectedAnswer,
        isCorrect,
        currentQuestion,
        totalQuestions,
        progress,
        initQuiz,
        checkAnswer,
        nextQuestion,
    };
});
