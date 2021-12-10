<template>
  <span class="icon">{{ icon }}</span>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const icon = ref("x");

    return {
      icon,
    };
  },
});
</script>
