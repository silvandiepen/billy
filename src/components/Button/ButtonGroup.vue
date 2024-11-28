<template>
	<div :class="blockClasses">
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { type PropType, computed } from 'vue';

import { useBemm } from 'bemm';
import type {
	ButtonGroupAlign,
	ButtonGroupDirection,
	ButtonGroupType,
} from './ButtonGroup.model';

const bemm = useBemm('button-group');

const props = defineProps({
	align: {
		type: String as PropType<ButtonGroupAlign>,
		default: 'left',
	},
	direction: {
		type: String as PropType<ButtonGroupDirection>,
		default: 'horizontal',
	},
	type: {
		type: String as PropType<ButtonGroupType>,
		default: 'normal',
	},
});

const blockClasses = computed(() => {
	const classes = [bemm()];

	classes.push(bemm('', props.align));
	classes.push(bemm('', props.direction));
	classes.push(bemm('', props.type));

	return classes;
});
</script>

<style lang="scss">
.button-group {
  display: flex;
  gap: calc(var(--space) / 2);
  width: var(--button-group-width, fit-content);

  flex-wrap: wrap;

  &--horizontal {
    flex-direction: var(--button-group-direction, row);
    align-items: center;
    justify-content: flex-start;

    &.button-group--stack {
      gap: 0;

      .button:first-child::before {
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
      }

      .button:last-child::before {
        border-bottom-left-radius: 0;
        border-top-left-radius: 0;
      }
    }
  }

  &--vertical {
    display: flex;
    flex-direction: var(--button-group-direction, column);
    align-items: flex-start;
    justify-content: flex-start;

    &.button-group--stack {
      gap: 0;

      .button {
        width: 100%;
        border-radius: 0;
      }

      .button:first-child {
        border-top-left-radius: var(--space);
        border-top-right-radius: var(--space);
      }

      .button:last-child {
        border-bottom-right-radius: var(--space);
        border-bottom-left-radius: var(--spacel);
      }
    }
  }

  &--left {
    justify-content: flex-start;
  }

  &--center {
    justify-content: center;
  }

  &--right {
    justify-content: flex-end;
  }
}
</style>
