<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useBemm } from "bemm"

import { ButtonAlign } from "../Button";

export default defineComponent({
  props: {
    align: {
      type: String as PropType<ButtonAlign>,
      default: ButtonAlign.LEFT,
    },
  },
  setup(props) {
    const bemm = useBemm("button-bar");

    const classes = computed(() => {
      let classNames = [];

      classNames.push(bemm());
      classNames.push(bemm("", props.align));

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
    --roundness: calc(#{variable(borderRadius)} * 2);
    --inner-roundness: calc(#{variable(borderRadius)} *  0);
    border-radius: var(--inner-roundness);
    &:first-child {
      border-radius: var(--roundness) var(--inner-roundness)
        var(--inner-roundness) var(--roundness);
    }
    &:last-child {
      border-radius: var(--inner-roundness) var(--roundness) var(--roundness)
        var(--inner-roundness);
    }

    &+ .button { margin: 0; }
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
