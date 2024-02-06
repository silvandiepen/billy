

<template>
  <div class="app-container" :class="isMobile ? 'mobile' : 'desktop'">
    <router-view :key="routeKey"></router-view>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { useRoute } from "vue-router";

import { useUI } from "@/composables";

const { initCheckMobile, isMobile } = useUI();
onMounted(() => {
  initCheckMobile();
})

const route = useRoute();
const routeKey = ref();
watch(
  () => route,
  () => {
    routeKey.value = `${route.path}-${route.params.level}`;
  },
  { immediate: true, deep: true }
);



</script>

<style lang="scss">
.container {
  display: flex;
  height: 100vh;
}



</style>

