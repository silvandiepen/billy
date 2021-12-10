<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";

import { ButtonAlign } from "./Button.model";

import { bem } from "../../../composables";

export default defineComponent({
  props: {
    align: {
      type: String as PropType<ButtonAlign>,
      default: ButtonAlign.LEFT,
    },
  },
  setup(props) {
    const block = "button-group";

    const classes = computed(() => {
      let classNames = [];

      classNames.push(bem(block));
      classNames.push(bem(block, "", props.align));

      return classNames;
    });

    return { block, bem, classes };
  },
});
</script>

<style lang="scss">
.button-group {
  display: flex;
  gap: 0.5em;

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
