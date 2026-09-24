// router/index.ts
import {
    createRouter,
    createWebHistory,
    type RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: () => import("@/pages/Home.vue"),
        meta: { title: "鉄研クイズ" },
    },
    {
        path: "/menu",
        name: "menu",
        component: () => import("../pages/Menu.vue"),
        meta: { title: "鉄研クイズ | メニュー" },
    },
    {
        path: "/setup/:quizname",
        name: "setup",
        component: () => import("../pages/QuizSetup.vue"),
        meta: { title: "鉄研クイズ | クイズ設定" },
    },
    {
        path: "/play/:textname",
        name: "play",
        component: () => import("../pages/QuizPlay.vue"),
        meta: { title: "Squizee | Playing Quiz" },
    },
];

export const router = createRouter({
    history: createWebHistory("/tekken-quiz/"),
    routes,
    scrollBehavior: (to, from, savedPosition) => savedPosition || { top: 0 },
});

router.beforeEach((to, from, next) => {
    let title = (to.meta?.title as string) || "Squizee";

    if (to.name === "play" && to.params.quizname) {
        const formattedName = (to.params.quizname as string)
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        title = `Squizee | ${formattedName}`;
    }

    document.title = title;
    next();
});
