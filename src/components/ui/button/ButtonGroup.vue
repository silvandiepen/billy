<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { useClasses } from "bemm";
import { defineComponent, PropType, computed } from "vue";
import { ButtonAlign, ButtonDirection } from "../Button";

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
    const cls = useClasses("button-group");

    const classes = computed(() => {
      return cls("", { m: props.align }, { m: props.direction });
    });

    return { classes };
  },
});
</script>

<style lang="scss">
.button-group {
  display: flex;
  gap: 0.5em;

  .button {
    margin: 0;
  }

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
