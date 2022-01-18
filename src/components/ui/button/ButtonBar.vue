<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Style } from "@sil/tools";

import { ButtonAlign } from "./Button.model";

export default defineComponent({
  props: {
    align: {
      type: String as PropType<ButtonAlign>,
      default: ButtonAlign.LEFT,
    },
  },
  setup(props) {
    const style = new Style("button-bar");

    const classes = computed(() => {
      let classNames = [];

      classNames.push(style.bem());
      classNames.push(style.bem("", props.align));

      return classNames;
    });

    return { classes };
  },
});
</script>

<style lang="scss">
.button-bar {
  display: flex;
  gap: 0.5em;
  padding: 1em 0;
  &--left {
    justify-content: flex-start;
  }
  &--right {
    justify-content: flex-end;
  }
  &--center {
    justify-content: center;
  }
}
</style>
