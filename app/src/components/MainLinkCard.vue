<!-- src/components/MainLinkCard.vue -->
<template>
    <v-card
        :to="to"
        :href="href"
        :target="target"
        :color="color"
        variant="flat"
        elevation="0"
        class="mainlink-btn-card w-100 d-flex flex-column cursor-pointer"
        :class="cardThemeClass"
        v-ripple
    >
        <div class="card-media-container position-relative">
            <v-img
                v-if="resolvedThumbnail"
                :src="resolvedThumbnail"
                alt=""
                cover
                class="w-100 h-100"
            ></v-img>

            <div v-else class="w-100 h-100 d-flex align-center justify-center">
                <v-icon :icon="icon" size="48"></v-icon>
            </div>

            <div v-if="thumbnail" class="thumbnail-fade-overlay"></div>
        </div>

        <div
            class="card-content pa-4 d-flex flex-column justify-center flex-grow-1 position-relative"
        >
            <div
                class="text-subtitle-1 font-weight-bold line-height-tight title-text"
            >
                {{ label }}
            </div>
            <div v-if="subject" class="text-caption mt-1 subject-text">
                {{ subject }}
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IconValue } from "vuetify";

interface Props {
    label: string;
    icon?: IconValue;
    thumbnail?: string;
    to?: string;
    href?: string;
    target?: string;
    color?: string;
    subject?: string;
}

const props = withDefaults(defineProps<Props>(), {
    color: "primary",
    icon: "mdi-image",
    thumbnail: undefined,
    target: undefined,
    subject: "",
});

const resolvedThumbnail = computed(() => {
    if (!props.thumbnail) return undefined;
    if (props.thumbnail.startsWith("/tekken-quiz")) {
        return props.thumbnail;
    }
    return `/tekken-quiz${props.thumbnail.startsWith("/") ? "" : "/"}${props.thumbnail}`;
});

const cardThemeClass = computed(() => {
    const lightColors = [
        "surface",
        "white",
        "grey-lighten-4",
        "grey-lighten-5",
        "background",
    ];
    if (
        lightColors.includes(props.color) ||
        props.color.startsWith("#f") ||
        props.color.startsWith("#e") ||
        props.color.startsWith("#fff")
    ) {
        return "card-theme-light";
    }
    return "card-theme-dark";
});
</script>

<style lang="scss" scoped>
.mainlink-btn-card {
    border-radius: 16px;
    overflow: hidden;
    height: 100%;
    transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15) !important;
    }
}

.card-media-container {
    height: 150px;
    width: 100%;
}

.thumbnail-fade-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.15));
    pointer-events: none;
}

.line-height-tight {
    line-height: 1.4;
}

.title-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

.subject-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}

.card-theme-dark {
    .title-text {
        color: rgba(255, 255, 255, 0.95);
    }
    .subject-text {
        color: rgba(255, 255, 255, 0.7);
    }
    .v-icon {
        color: rgba(255, 255, 255, 0.9);
    }
}

.card-theme-light {
    .title-text {
        color: rgba(0, 0, 0, 0.87);
    }
    .subject-text {
        color: rgba(0, 0, 0, 0.6);
    }
    .v-icon {
        color: rgba(0, 0, 0, 0.7);
    }
}
</style>
