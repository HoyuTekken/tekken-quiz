<!-- components/ToMenu.vue -->
<template>
    <div class="top-main-view">
        <v-row justify="start">
            <v-col cols="12" md="6">
                <v-btn
                    variant="flat"
                    rounded="lg"
                    class="main-button font-weight-bold code-style-btn"
                    color="surface"
                    elevation="0"
                    rel="noopener"
                    to="/menu"
                    height="50"
                >
                    <template #prepend>
                        <v-icon
                            icon="mdi-arrow-left-bold"
                            size="large"
                        ></v-icon>
                    </template>
                    戻る
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<style scoped>
.top-main-view {
    margin-top: 45px;
}

.main-button {
    width: 100%;
    max-width: 1000px;

    font-size: 17px;
    font-weight: 600;
    text-align: center;
}

.code-style-btn {
    border-width: 2px !important;
}
</style>
