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
  gap: 1px;

  .button {
    --roundness: calc(#{variable(borderRadius)} * 3);
    --inner-roundness: #{variable(borderRadius)};
    border-radius: var(--inner-roundness);
    &:first-child {
      border-radius: var(--roundness) var(--inner-roundness)
        var(--inner-roundness) var(--roundness);
    }
    &:last-child {
      border-radius: var(--inner-roundness) var(--roundness) var(--roundness)
        var(--inner-roundness);
    }
  }
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
