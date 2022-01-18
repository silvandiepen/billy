<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Style } from "@sil/tools";
import { defineComponent, PropType, computed } from "vue";
import { ButtonAlign, ButtonDirection } from "./Button.model";

export default defineComponent({
  props: {
    align: {
      type: String as PropType<ButtonAlign>,
      default: ButtonAlign.LEFT,
    },
    direction: {
      type: String as PropType<ButtonDirection>,
      default: ButtonDirection.ROW,
    },
  },
  setup(props) {
    const style = new Style("button-group");

    const classes = computed(() => {
      let classNames = [];

      classNames.push(style.bem());
      classNames.push(style.bem("", props.align));
      classNames.push(style.bem("", props.direction));

      return classNames;
    });

    return { classes };
  },
});
</script>

<style lang="scss">
.button-group {
  display: flex;
  gap: 0.5em;

  &--column {
    flex-direction: column;
  }
  &--row {
    flex-direction: row;
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
